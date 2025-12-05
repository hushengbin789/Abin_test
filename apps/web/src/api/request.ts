/**
 * Axios 请求封装
 */
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import type { ApiResponse } from '@packages/types'
import { useUserStore } from '@/stores/user'
import router from '@/router'

/** 请求配置 */
const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
}

/** 创建 Axios 实例 */
const service: AxiosInstance = axios.create(config)

/** 请求拦截器 */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 获取 token
    const userStore = useUserStore()
    const token = userStore.token

    // 添加 token 到请求头
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

/** 响应拦截器 */
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response

    // 业务状态码判断
    if (data.code === 0) {
      return response
    }

    // 处理业务错误
    const errorMessage = data.message || '请求失败'

    // 未授权，跳转登录
    if (data.code === 401) {
      const userStore = useUserStore()
      userStore.logout()
      router.push({
        path: '/login',
        query: { redirect: router.currentRoute.value.fullPath },
      })
    }

    return Promise.reject(new Error(errorMessage))
  },
  (error) => {
    // HTTP 错误处理
    let message = '网络错误，请稍后重试'

    if (error.response) {
      const { status } = error.response
      switch (status) {
        case 400:
          message = '请求参数错误'
          break
        case 401: {
          message = '未授权，请重新登录'
          const userStore = useUserStore()
          userStore.logout()
          router.push('/login')
          break
        }
        case 403:
          message = '没有权限访问'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = `请求失败 (${status})`
      }
    } else if (error.code === 'ECONNABORTED') {
      message = '请求超时，请稍后重试'
    }

    console.error('响应错误:', message)
    return Promise.reject(new Error(message))
  }
)

/**
 * 封装 GET 请求
 */
export function get<T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return service
    .get<ApiResponse<T>>(url, { params, ...config })
    .then((res) => res.data)
}

/**
 * 封装 POST 请求
 */
export function post<T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return service.post<ApiResponse<T>>(url, data, config).then((res) => res.data)
}

/**
 * 封装 PUT 请求
 */
export function put<T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return service.put<ApiResponse<T>>(url, data, config).then((res) => res.data)
}

/**
 * 封装 DELETE 请求
 */
export function del<T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return service
    .delete<ApiResponse<T>>(url, { params, ...config })
    .then((res) => res.data)
}

export default service
