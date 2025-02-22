from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.config import settings
from app.core.database import SessionDep
from app.users.models import TokenPayload, User, UserRegister
from app.users.security import get_password_hash, verify_password

reusable_oauth2 = OAuth2PasswordBearer(tokenUrl=f"{settings.PREFIX}/users/login")
TokenDep = Annotated[str, Depends(reusable_oauth2)]


class UsersService:
    @staticmethod
    async def create_user(session: AsyncSession, new_user: UserRegister) -> User:
        db_obj = User.model_validate(new_user, update={"hashed_password": get_password_hash(new_user.password)})
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return db_obj

    @staticmethod
    async def get_user_by_email(session: AsyncSession, email: str) -> User | None:
        statement = select(User).where(User.email == email)
        statement_result = await session.exec(statement)
        return statement_result.first()

    @staticmethod
    async def authenticate_user(session: AsyncSession, email: str, password: str) -> User | None:
        db_user = await UsersService.get_user_by_email(session=session, email=email)

        if not db_user or not verify_password(password, db_user.hashed_password):
            return None

        return db_user

    @staticmethod
    async def get_current_user(session: SessionDep, token: TokenDep) -> User:
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            token_data = TokenPayload(**payload)
        except (InvalidTokenError, ValidationError):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Не удалось подтвердить учетные данные"
            )

        user = await session.get(User, token_data.sub)

        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Пользователь не найден")

        return user


CurrentUser = Annotated[User, Depends(UsersService.get_current_user)]
