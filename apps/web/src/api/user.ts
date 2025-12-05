/**
 * 用户相关 API
 */
import { get, put } from './request'
import type { UserInfo, ApiResponse } from '@packages/types'

/**
 * 获取当前用户信息
 */
export function getUserInfo(): Promise<ApiResponse<UserInfo>> {
  return get<UserInfo>('/user/info')
}

/**
 * 更新用户资料
 * @param data 用户资料
 */
export function updateProfile(
  data: Partial<Pick<UserInfo, 'avatar'>>
): Promise<ApiResponse<UserInfo>> {
  return put<UserInfo>('/user/profile', data)
}

/**
 * 修改密码
 * @param data 密码信息
 */
export function changePassword(data: {
  oldPassword: string
  newPassword: string
}): Promise<ApiResponse<null>> {
  return put<null>('/user/password', data)
}
