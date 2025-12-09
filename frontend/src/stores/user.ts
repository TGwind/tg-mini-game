import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/user'
import { useTelegram } from '@/utils/telegram'

const fallbackUser: User = {
  telegram_id: 1,
  username: 'demo_player',
  first_name: 'Demo',
  score: 0,
  created_at: new Date().toISOString()
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const token = ref<string>('')
  const isAuthenticated = ref(false)

  function ensureUser() {
    const { user: tgUser } = useTelegram()
    if (tgUser) {
      user.value = {
        telegram_id: tgUser.id,
        username: tgUser.username,
        first_name: tgUser.first_name,
        last_name: tgUser.last_name,
        score: fallbackUser.score,
        created_at: new Date().toISOString()
      }
      isAuthenticated.value = true
      return
    }

    // fallback data for local development
    user.value = fallbackUser
    isAuthenticated.value = true
  }

  async function authenticate(initData: string) {
    token.value = initData
    ensureUser()
  }

  async function fetchUserProfile() {
    if (!user.value) {
      ensureUser()
    }
    return user.value
  }

  function logout() {
    user.value = null
    token.value = ''
    isAuthenticated.value = false
  }

  return {
    user,
    token,
    isAuthenticated,
    ensureUser,
    authenticate,
    fetchUserProfile,
    logout
  }
})
