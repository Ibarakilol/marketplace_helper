from fastapi import APIRouter, HTTPException, status

from app.core.database import SessionDep
from app.users.service import CurrentUser
from app.wb.models import WbFeedback
from app.wb.service import WbService

router = APIRouter(prefix="/wb", tags=["Wildberries"])


@router.get("/", response_model=list[WbFeedback])
async def get_wb_feedbacks(session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100):
    if not current_user.wb_api_key:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Отсутствует ключ авторизации")

    feedbacks = await WbService.get_feedbacks(current_user=current_user, skip=skip, limit=limit)
    return feedbacks


@router.get("/{feedback_id}", response_model=WbFeedback)
async def get_wb_feedback(session: SessionDep, current_user: CurrentUser, feedback_id: str):
    if not current_user.wb_api_key:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Отсутствует ключ авторизации")

    feedback = await WbService.get_feedback(current_user=current_user, feedback_id=feedback_id)
    return feedback
