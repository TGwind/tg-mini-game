export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  page_size: number
}

export interface LeaderboardEntry {
  rank: number
  telegram_id: number
  username?: string
  first_name: string
  score: number
}

