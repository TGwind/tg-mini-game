import apiClient from './index'
import type { ApiResponse } from '@/types/api'
import type { GameScore, GameRecord } from '@/types/game'

export const gameApi = {
  // 保存游戏分数
  saveScore(score: GameScore): Promise<ApiResponse<GameRecord>> {
    // TODO: 实现保存分数逻辑
    return apiClient.post('/api/game/save-score', score)
  },

  // 获取用户游戏记录
  getRecords(): Promise<ApiResponse<GameRecord[]>> {
    // TODO: 实现获取记录逻辑
    return apiClient.get('/api/game/records')
  }
}

