from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class GameScoreCreate(BaseModel):
    score: int = Field(..., ge=0, description="游戏分数")
    play_time: Optional[int] = Field(0, ge=0, description="游戏时长（秒）")


class GameRecordResponse(BaseModel):
    id: int
    user_id: int
    score: int
    play_time: int
    created_at: datetime

    class Config:
        from_attributes = True


class LeaderboardEntry(BaseModel):
    rank: int
    telegram_id: int
    username: Optional[str]
    first_name: str
    score: int

    class Config:
        from_attributes = True

