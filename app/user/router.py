from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.core.config import settings
from app.core.database import SessionDep
from app.user.models import Token, UserPublic, UserRegister
from app.user.security import create_access_token
from app.user.service import UserService

router = APIRouter(prefix="/user", tags=["User"])


@router.post("/register", response_model=UserPublic)
async def register_user(session: SessionDep, user_in: UserRegister):
    user = await UserService.get_user_by_email(session=session, email=user_in.email)

    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="The user with this email already exists in the system"
        )

    new_user = UserRegister.model_validate(user_in)
    user = await UserService.create_user(session=session, new_user=new_user)
    return user


@router.post("/login", response_model=Token)
async def login_user(session: SessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = await UserService.authenticate_user(session=session, email=form_data.username, password=form_data.password)

    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(access_token=create_access_token(user.id, expires_delta=access_token_expires))
