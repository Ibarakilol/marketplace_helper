from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware

from app.api_router import api_router
from app.core.config import settings
from app.pages.router import router as pages_router

app = FastAPI(title=settings.PROJECT_NAME, openapi_url=f"{settings.PREFIX}/openapi.json")

app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "PUT", "POST", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

app.include_router(api_router, prefix=settings.PREFIX)
app.include_router(pages_router)
