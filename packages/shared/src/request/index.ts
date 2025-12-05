/**
 * 请求工具封装
 */

import type { ApiResponse } from '../types'

/**
 * 请求配置
 */
export interface RequestConfig extends RequestInit {
  baseURL?: string
  timeout?: number
  params?: Record<string, unknown>
}

/**
 * 请求拦截器
 */
export interface RequestInterceptor {
  onRequest?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>
  onResponse?: <T>(response: ApiResponse<T>) => ApiResponse<T> | Promise<ApiResponse<T>>
  onError?: (error: Error) => void
}

/**
 * 创建请求实例
 * @param defaultConfig 默认配置
 */
export function createRequest(defaultConfig: RequestConfig = {}) {
  const interceptors: RequestInterceptor = {}

  /**
   * 合并 URL 和参数
   */
  const buildURL = (url: string, config: RequestConfig): string => {
    const baseURL = config.baseURL || defaultConfig.baseURL || ''
    let fullURL = url.startsWith('http') ? url : `${baseURL}${url}`

    // 处理查询参数
    if (config.params) {
      const params = new URLSearchParams()
      Object.entries(config.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value))
        }
      })
      const queryString = params.toString()
      if (queryString) {
        fullURL += (fullURL.includes('?') ? '&' : '?') + queryString
      }
    }

    return fullURL
  }

  /**
   * 发送请求
   */
  const request = async <T>(url: string, config: RequestConfig = {}): Promise<ApiResponse<T>> => {
    // 合并配置
    let mergedConfig: RequestConfig = {
      ...defaultConfig,
      ...config,
      headers: {
        'Content-Type': 'application/json',
        ...defaultConfig.headers,
        ...config.headers,
      },
    }

    // 请求拦截
    if (interceptors.onRequest) {
      mergedConfig = await interceptors.onRequest(mergedConfig)
    }

    const fullURL = buildURL(url, mergedConfig)
    const timeout = mergedConfig.timeout || 30000

    try {
      // 创建超时控制器
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(fullURL, {
        ...mergedConfig,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
      }

      let result: ApiResponse<T> = await response.json()

      // 响应拦截
      if (interceptors.onResponse) {
        result = await interceptors.onResponse(result)
      }

      return result
    } catch (error) {
      if (interceptors.onError) {
        interceptors.onError(error as Error)
      }
      throw error
    }
  }

  return {
    /**
     * 设置拦截器
     */
    setInterceptors(config: RequestInterceptor) {
      Object.assign(interceptors, config)
    },

    /**
     * GET 请求
     */
    get<T>(url: string, params?: Record<string, unknown>, config?: RequestConfig) {
      return request<T>(url, { ...config, method: 'GET', params })
    },

    /**
     * POST 请求
     */
    post<T>(url: string, data?: unknown, config?: RequestConfig) {
      return request<T>(url, { ...config, method: 'POST', body: JSON.stringify(data) })
    },

    /**
     * PUT 请求
     */
    put<T>(url: string, data?: unknown, config?: RequestConfig) {
      return request<T>(url, { ...config, method: 'PUT', body: JSON.stringify(data) })
    },

    /**
     * PATCH 请求
     */
    patch<T>(url: string, data?: unknown, config?: RequestConfig) {
      return request<T>(url, { ...config, method: 'PATCH', body: JSON.stringify(data) })
    },

    /**
     * DELETE 请求
     */
    delete<T>(url: string, config?: RequestConfig) {
      return request<T>(url, { ...config, method: 'DELETE' })
    },

    /**
     * 原始请求方法
     */
    request,
  }
}

/**
 * 默认请求实例
 */
export const http = createRequest()
