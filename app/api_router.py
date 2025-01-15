from fastapi import APIRouter

from app.user.router import router as user_router
from app.wb.router import router as wb_router

api_router = APIRouter()
api_router.include_router(user_router)
api_router.include_router(wb_router)
