export interface GameScore {
  score: number
  play_time?: number
}

export interface GameRecord {
  id: number
  user_id: number
  score: number
  play_time: number
  created_at: string
}

export interface GameState {
  isPlaying: boolean
  currentScore: number
  // TODO: 添加其他游戏状态
}

