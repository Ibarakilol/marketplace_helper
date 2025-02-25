#!/bin/bash

# Переход в папку api
cd ./marketplace_helper_api

# Установка uv, пакетный менеджер для Python (аналог npm/yarn для JS)
pip install uv

# Установка зависимостей для api
uv sync

# Запуск сервера
fastapi dev
