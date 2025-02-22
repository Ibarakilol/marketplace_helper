import json

import aiohttp
from fastapi import HTTPException, status

from app.users.models import User
from app.wb.models import WbFeedback


class WbService:
    @staticmethod
    def parse_feedback(feedback: dict) -> WbFeedback:
        return {
            "feedback_id": feedback["id"],
            "sku": feedback["productDetails"]["nmId"],
            "product_name": feedback["productDetails"]["productName"],
            "product_valuation": feedback["productValuation"],
            "name": feedback["userName"] if feedback["userName"] != "Пользователь" else "",
            "text": feedback["text"],
            "with_photo": isinstance(feedback["photoLinks"], list),
            "reply_text": feedback["answer"]["text"] if feedback["answer"] else None,
        }

    @staticmethod
    async def get_feedbacks(current_user: User, skip: int = 0, limit: int = 100) -> list[WbFeedback]:
        async with aiohttp.ClientSession() as client_session:
            try:
                async with client_session.get(
                    f"https://feedbacks-api.wildberries.ru/api/v1/feedbacks?isAnswered=false&take={limit}&skip={skip}",
                    headers={"Authorization": current_user.wb_api_key},
                ) as response:
                    response.raise_for_status()
                    data = await response.json()
                    return [WbService.parse_feedback(feedback) for feedback in data["data"]["feedbacks"]]
            except aiohttp.ClientError:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Ошибка получения отзывов"
                )

    @staticmethod
    async def get_feedback(current_user: User, feedback_id: str) -> WbFeedback:
        async with aiohttp.ClientSession() as client_session:
            try:
                async with client_session.get(
                    f"https://feedbacks-api.wildberries.ru/api/v1/feedback?id={feedback_id}",
                    headers={"Authorization": current_user.wb_api_key},
                ) as response:
                    response.raise_for_status()
                    data = await response.json()
                    return WbService.parse_feedback(data["data"])
            except aiohttp.ClientError:
                raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Ошибка получения отзыва")

    @staticmethod
    async def process_feedback(current_user: User, feedback_id: str, reply: str) -> None:
        async with aiohttp.ClientSession() as client_session:
            try:
                data = {"id": feedback_id, "text": reply}
                async with client_session.post(
                    "https://feedbacks-api.wildberries.ru/api/v1/feedbacks/answer",
                    data=json.dumps(data),
                    headers={"Authorization": current_user.wb_api_key},
                ) as response:
                    response.raise_for_status()
            except aiohttp.ClientError:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Ошибка отправки ответа на отзыв"
                )
