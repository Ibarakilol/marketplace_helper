import uuid

from fastapi import APIRouter

from app.core.database import SessionDep
from app.user.service import CurrentUser
from app.wb.models import WbFeedback

router = APIRouter(prefix="/wb", tags=["Wildberries"])


@router.get("/", response_model=list[WbFeedback])
async def get_wb_feedbacks(session: SessionDep, current_user: CurrentUser):
    pass


@router.get("/{id}", response_model=WbFeedback)
async def get_wb_feedback(session: SessionDep, current_user: CurrentUser, id: uuid.UUID):
    pass
