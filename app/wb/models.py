from typing import Any

from sqlmodel import Field, SQLModel


class WbFeedback(SQLModel):
    feedback_id: str
    sku: int
    product_name: str
    product_valuation: int = Field(ge=1, le=5)
    name: str
    text: str | None = None
    with_photo: bool


class WbProduct(SQLModel):
    sku: int
    product_name: str
    product_recommendations: list[Any] = []
