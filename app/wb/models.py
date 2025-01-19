from typing import Any

from sqlmodel import Field, SQLModel


class WbFeedback(SQLModel):
    feedback_id: str = Field(unique=True, index=True)
    sku: int
    product_name: str = Field(max_length=255)
    product_valuation: int = Field(ge=1, le=5)
    name: str
    text: str | None = None
    with_photo: bool


class WbProduct(SQLModel):
    sku: int = Field(index=True)
    product_name: str = Field(index=True)
    product_recommendations: list[Any] = []
