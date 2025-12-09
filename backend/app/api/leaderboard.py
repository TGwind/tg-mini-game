from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.leaderboard import LeaderboardService

router = APIRouter()


@router.get("", response_model=dict)
async def get_leaderboard(
    page: int = Query(1, ge=1, description="页码"),
    page_size: int = Query(50, ge=1, le=100, description="每页数量"),
    db: Session = Depends(get_db)
):
    """
    获取排行榜
    
    返回按分数排序的用户排行榜
    """
    # TODO: 实现获取排行榜逻辑
    # leaderboard_data = LeaderboardService.get_leaderboard(db, page, page_size)
    # return {
    #     "code": 0,
    #     "message": "success",
    #     "data": leaderboard_data
    # }
    
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="TODO: 实现获取排行榜逻辑"
    )


@router.get("/my-rank", response_model=dict)
async def get_my_rank(
    db: Session = Depends(get_db)
    # TODO: 添加认证依赖
    # current_user: User = Depends(get_current_user)
):
    """
    获取当前用户的排名
    """
    # TODO: 实现获取用户排名逻辑
    # rank = LeaderboardService.get_user_rank(current_user.id, db)
    # return {"rank": rank}
    
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="TODO: 实现获取用户排名逻辑"
    )

