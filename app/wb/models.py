import uuid

from sqlmodel import Field, SQLModel


class WbFeedback(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    feedback_id: str = Field(unique=True, index=True)
    sku: int = Field(index=True)
    product: str = Field(index=True)
    product_valuation: int
    with_photo: bool
    text: str | None = None
    reply: str | None = None
