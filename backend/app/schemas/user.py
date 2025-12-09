from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    telegram_id: int
    username: Optional[str] = None
    first_name: str
    last_name: Optional[str] = None


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class UserResponse(UserBase):
    id: int
    score: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TelegramAuthRequest(BaseModel):
    init_data: str = Field(..., description="Telegram WebApp initData")

