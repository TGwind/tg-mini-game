import apiClient from './index'
import type { ApiResponse, LeaderboardEntry, PaginatedResponse } from '@/types/api'

const mockEntries: LeaderboardEntry[] = [
  { rank: 1, telegram_id: 1001, username: 'speedster', first_name: 'Alice', score: 120 },
  { rank: 2, telegram_id: 1002, username: 'pro_player', first_name: 'Bob', score: 98 },
  { rank: 3, telegram_id: 1003, username: 'rookie', first_name: 'Cindy', score: 75 },
  { rank: 4, telegram_id: 1004, username: 'tester', first_name: 'David', score: 60 }
]

export const leaderboardApi = {
  getLeaderboard(page = 1, pageSize = 50): Promise<ApiResponse<PaginatedResponse<LeaderboardEntry>>> {
    if (!import.meta.env.VITE_API_BASE_URL) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            code: 0,
            message: 'ok',
            data: {
              items: mockEntries.slice((page - 1) * pageSize, page * pageSize),
              total: mockEntries.length,
              page,
              page_size: pageSize
            }
          })
        }, 300)
      })
    }

    return apiClient.get('/api/leaderboard', {
      params: { page, page_size: pageSize }
    })
  }
}
