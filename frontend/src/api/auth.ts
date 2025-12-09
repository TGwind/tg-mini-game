import apiClient from './index'
import type { ApiResponse } from '@/types/api'
import type { User } from '@/types/user'

export const authApi = {
  // 验证 Telegram 用户
  verify(initData: string): Promise<ApiResponse<{ user: User; token: string }>> {
    // TODO: 实现 Telegram 用户验证
    return apiClient.post('/api/auth/verify', { init_data: initData })
  }
}

