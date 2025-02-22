from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.core.config import settings
from app.core.database import SessionDep
from app.users.models import Token, UserPublic, UserRegister, UserUpdate
from app.users.security import create_access_token
from app.users.service import CurrentUser, UsersService

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/register", response_model=Token)
async def register_user(session: SessionDep, user_in: UserRegister):
    user = await UsersService.get_user_by_email(session=session, email=user_in.email)

    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Пользователь с этой электронной почтой уже существует"
        )

    new_user = UserRegister.model_validate(user_in)
    user = await UsersService.create_user(session=session, new_user=new_user)
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(access_token=create_access_token(user.id, expires_delta=access_token_expires))


@router.post("/login", response_model=Token)
async def login_user(session: SessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = await UsersService.authenticate_user(session=session, email=form_data.username, password=form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Неверный адрес электронной почты или пароль"
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(access_token=create_access_token(user.id, expires_delta=access_token_expires))


@router.get("/profile", response_model=UserPublic)
async def get_user(session: SessionDep, current_user: CurrentUser):
    user = await UsersService.get_user_by_email(session=session, email=current_user.email)
    return user


@router.patch("/profile", response_model=UserPublic)
async def update_user(session: SessionDep, current_user: CurrentUser, user_in: UserUpdate):
    user_data = user_in.model_dump(exclude_unset=True)
    current_user.sqlmodel_update(user_data)
    session.add(current_user)
    await session.commit()
    await session.refresh(current_user)
    return current_user
