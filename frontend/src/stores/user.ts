import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const token = ref<string>('')
  const isAuthenticated = ref(false)

  // TODO: 实现用户认证逻辑
  async function authenticate(initData: string) {
    // TODO: 调用认证 API
  }

  // TODO: 实现获取用户信息
  async function fetchUserProfile() {
    // TODO: 调用获取用户信息 API
  }

  // TODO: 实现登出逻辑
  function logout() {
    user.value = null
    token.value = ''
    isAuthenticated.value = false
  }

  return {
    user,
    token,
    isAuthenticated,
    authenticate,
    fetchUserProfile,
    logout
  }
})

