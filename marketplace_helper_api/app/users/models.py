import uuid

from pydantic import EmailStr
from sqlmodel import Field, SQLModel


class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    wb_supplier_name: str | None = Field(default=None, index=True, max_length=255)


class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    wb_api_key: str | None = None


class UserPublic(UserBase):
    id: uuid.UUID


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)


class UserUpdate(SQLModel):
    wb_supplier_name: str | None = Field(default=None, index=True, max_length=255)
    wb_api_key: str | None = None


class Token(SQLModel):
    access_token: str
    token_type: str = "Bearer"


class TokenPayload(SQLModel):
    sub: str | None = None
