export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
}

export interface User {
  telegram_id: number
  username?: string
  first_name: string
  last_name?: string
  score: number
  created_at: string
}

