import axios, { AxiosInstance, AxiosError } from 'axios'
import type { ApiResponse } from '@/types/api'
import { useUserStore } from '@/stores/user'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  error => Promise.reject(error)
)

apiClient.interceptors.response.use(
  response => response.data as ApiResponse,
  (error: AxiosError) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default apiClient
