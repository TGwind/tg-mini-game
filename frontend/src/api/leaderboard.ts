import apiClient from './index'
import type { ApiResponse, LeaderboardEntry, PaginatedResponse } from '@/types/api'

export const leaderboardApi = {
  // 获取排行榜
  getLeaderboard(page = 1, pageSize = 50): Promise<ApiResponse<PaginatedResponse<LeaderboardEntry>>> {
    // TODO: 实现获取排行榜逻辑
    return apiClient.get('/api/leaderboard', {
      params: { page, page_size: pageSize }
    })
  }
}

