from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter(tags=["Pages"])

templates = Jinja2Templates(directory="app/templates")


@router.get("/", response_class=HTMLResponse)
async def get_index_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
