from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.game import GameScoreCreate, GameRecordResponse
from app.services.game import GameService

router = APIRouter()


@router.post("/save-score", response_model=GameRecordResponse)
async def save_game_score(
    score_data: GameScoreCreate,
    db: Session = Depends(get_db)
    # TODO: 添加认证依赖
    # current_user: User = Depends(get_current_user)
):
    """
    保存游戏分数
    
    记录用户的游戏分数，如果分数更高则更新用户的最高分
    """
    # TODO: 实现保存分数逻辑
    # game_record = GameService.save_score(current_user.id, score_data, db)
    # return game_record
    
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="TODO: 实现保存分数逻辑"
    )


@router.get("/records", response_model=List[GameRecordResponse])
async def get_game_records(
    limit: int = 10,
    db: Session = Depends(get_db)
    # TODO: 添加认证依赖
    # current_user: User = Depends(get_current_user)
):
    """
    获取用户的游戏记录
    """
    # TODO: 实现获取记录逻辑
    # records = GameService.get_user_records(current_user.id, db, limit)
    # return records
    
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="TODO: 实现获取记录逻辑"
    )

