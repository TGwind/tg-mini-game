import axios, { AxiosInstance, AxiosError } from 'axios'
import type { ApiResponse } from '@/types/api'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
apiClient.interceptors.request.use(
  config => {
    // TODO: 添加认证 token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  response => {
    // TODO: 处理响应数据
    return response.data
  },
  (error: AxiosError) => {
    // TODO: 统一错误处理
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default apiClient

