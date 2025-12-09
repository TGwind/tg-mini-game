from sqlalchemy import Column, Integer, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base


class GameRecord(Base):
    __tablename__ = "game_records"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    score = Column(Integer, nullable=False)
    play_time = Column(Integer, default=0)  # 游戏时长（秒）
    created_at = Column(DateTime, default=datetime.utcnow)

    # TODO: 添加关系
    # user = relationship("User", back_populates="game_records")

