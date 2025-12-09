from sqlalchemy.orm import Session
from app.models.game_record import GameRecord
from app.models.user import User
from app.schemas.game import GameScoreCreate
from typing import List, Optional


class GameService:
    @staticmethod
    def save_score(user_id: int, score_data: GameScoreCreate, db: Session) -> GameRecord:
        """
        保存游戏分数
        
        Args:
            user_id: 用户 ID
            score_data: 游戏分数数据
            db: 数据库会话
            
        Returns:
            创建的游戏记录
        """
        # TODO: 实现保存分数逻辑
        # 1. 创建游戏记录
        # game_record = GameRecord(
        #     user_id=user_id,
        #     score=score_data.score,
        #     play_time=score_data.play_time
        # )
        # db.add(game_record)
        
        # 2. 更新用户最高分
        # user = db.query(User).filter(User.id == user_id).first()
        # if user and score_data.score > user.score:
        #     user.score = score_data.score
        
        # db.commit()
        # db.refresh(game_record)
        # return game_record
        pass

    @staticmethod
    def get_user_records(user_id: int, db: Session, limit: int = 10) -> List[GameRecord]:
        """
        获取用户的游戏记录
        """
        # TODO: 实现获取记录逻辑
        # return db.query(GameRecord).filter(
        #     GameRecord.user_id == user_id
        # ).order_by(GameRecord.created_at.desc()).limit(limit).all()
        pass

