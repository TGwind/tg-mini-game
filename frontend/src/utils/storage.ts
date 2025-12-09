const STORAGE_PREFIX = 'tg_game_'

export const storage = {
  set(key: string, value: any): void {
    try {
      const serialized = JSON.stringify(value)
      localStorage.setItem(STORAGE_PREFIX + key, serialized)
    } catch (error) {
      console.error('Storage set error:', error)
    }
  },

  get<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Storage get error:', error)
      return defaultValue
    }
  },

  remove(key: string): void {
    localStorage.removeItem(STORAGE_PREFIX + key)
  },

  clear(): void {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
  }
}

