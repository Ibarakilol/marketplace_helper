from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from sqlmodel import Session, select

from app.core.config import settings
from app.core.database import SessionDep
from app.user.models import TokenPayload, User, UserRegister
from app.user.security import get_password_hash, verify_password

reusable_oauth2 = OAuth2PasswordBearer(tokenUrl=f"{settings.PREFIX}/login")
TokenDep = Annotated[str, Depends(reusable_oauth2)]


class UserService:
    @staticmethod
    def create_user(*, session: Session, new_user: UserRegister) -> User:
        db_obj = User.model_validate(new_user, update={"hashed_password": get_password_hash(new_user.password)})
        session.add(db_obj)
        session.commit()
        session.refresh(db_obj)
        return db_obj

    @staticmethod
    def get_user_by_email(*, session: Session, email: str) -> User | None:
        statement = select(User).where(User.email == email)
        user = session.exec(statement).first()
        return user

    @staticmethod
    def authenticate_user(*, session: Session, email: str, password: str) -> User | None:
        db_user = UserService.get_user_by_email(session=session, email=email)

        if not db_user or not verify_password(password, db_user.hashed_password):
            return None

        return db_user

    @staticmethod
    def get_current_user(session: SessionDep, token: TokenDep) -> User:
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            token_data = TokenPayload(**payload)
        except (InvalidTokenError, ValidationError):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Could not validate credentials")

        user = session.get(User, token_data.sub)

        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

        return user


CurrentUser = Annotated[User, Depends(UserService.get_current_user)]
