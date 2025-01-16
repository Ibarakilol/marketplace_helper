import random
import re

from fastapi import HTTPException, status
from g4f.client import Client
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.users.models import User
from app.wb.models import WbFeedback, WbProduct

client = Client()


class ReplyGeneratorService:
    @staticmethod
    def parse_recommendations(product_recommendations: list[WbProduct]) -> list[str]:
        recommendations = []

        for product_recommendation in product_recommendations:
            recommendations.append(f"{product_recommendation.product_name} (артикул {product_recommendation.sku})")

        return recommendations

    @staticmethod
    async def generate_reply(session: AsyncSession, current_user: User, feedback: WbFeedback) -> str | None:
        reply = f"Здравствуйте{f' {feedback.name}! ' if feedback.name else '! '}"
        recommendations = []
        random_recommendations = []

        # statement = select(WbProduct).where(WbProduct.sku == feedback.sku)
        # statement_result = await session.exec(statement)
        # product = statement_result.first()

        # if product and len(product.product_recommendations):
        #     recommendations = ReplyGeneratorService.parse_recommendations(product.product_recommendations)

        #     if len(recommendations) > 2:
        #         while len(random_recommendations) != 2:
        #             random_recommendation = random.choice(recommendations)

        #             if random_recommendation not in random_recommendations:
        #                 random_recommendations.append(random_recommendation)
        #     else:
        #         random_recommendations = recommendations

        prompt = f"Напиши ответ на положительный отзыв {f'{feedback.text}' if feedback.text else ''} на товар {feedback.product_name}, без приветствия,"

        if len(random_recommendations) >= 2:
            prompt += f" порекомендуй товары {random_recommendations[0]} и {random_recommendations[1]},"
        elif len(random_recommendations) == 1:
            prompt += f" порекомендуй товар {random_recommendations[0]},"

        prompt += (
            f" c пожеланиями в конце от команды {current_user.wb_supplier_name} и длиной текста не более 800 знаков."
        )

        try:
            response = client.chat.completions.create(model="gpt-4", messages=[{"role": "user", "content": prompt}])
            chat_response = response.choices[0].message.content

            if chat_response:
                reply += chat_response
        except Exception:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Ошибка генерации ответа на отзыв")

        reply = re.sub(r"\r?\n|\r", " ", reply).strip()
        return re.sub(r"\s\s+", " ", reply)
