/**
 * 认证相关 API
 */
import { post } from './request'
import type {
  LoginParams,
  LoginResult,
  RegisterParams,
  ApiResponse,
} from '@packages/types'

/**
 * 用户登录
 * @param params 登录参数
 */
export function login(params: LoginParams): Promise<ApiResponse<LoginResult>> {
  return post<LoginResult>('/auth/login', params)
}

/**
 * 用户注册
 * @param params 注册参数
 */
export function register(
  params: RegisterParams
): Promise<ApiResponse<LoginResult>> {
  return post<LoginResult>('/auth/register', params)
}

/**
 * 用户登出
 */
export function logout(): Promise<ApiResponse<null>> {
  return post<null>('/auth/logout')
}

/**
 * 刷新 Token
 * @param refreshToken 刷新令牌
 */
export function refreshToken(
  refreshToken: string
): Promise<ApiResponse<{ accessToken: string; expiresIn: number }>> {
  return post<{ accessToken: string; expiresIn: number }>('/auth/refresh', {
    refreshToken,
  })
}
