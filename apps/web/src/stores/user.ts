/**
 * 用户状态管理
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  UserInfo,
  LoginParams,
  RegisterParams,
  LoginResult,
} from '@packages/types'
import { setStorage, getStorage, removeStorage } from '@packages/utils'
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
} from '@/api/auth'

const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'user_info'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string>(getStorage(TOKEN_KEY, ''))
  const refreshToken = ref<string>(getStorage(REFRESH_TOKEN_KEY, ''))
  const userInfo = ref<UserInfo | null>(getStorage(USER_KEY, null))

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const username = computed(() => userInfo.value?.username || '')
  const avatar = computed(() => userInfo.value?.avatar || '')
  const userRole = computed(() => userInfo.value?.role || '')

  /**
   * 设置令牌
   */
  function setToken(accessToken: string, refresh?: string) {
    token.value = accessToken
    setStorage(TOKEN_KEY, accessToken, { expires: 7 * 24 * 60 * 60 * 1000 })

    if (refresh) {
      refreshToken.value = refresh
      setStorage(REFRESH_TOKEN_KEY, refresh, {
        expires: 30 * 24 * 60 * 60 * 1000,
      })
    }
  }

  /**
   * 设置用户信息
   */
  function setUserInfo(info: UserInfo) {
    userInfo.value = info
    setStorage(USER_KEY, info)
  }

  /**
   * 登录
   */
  async function login(params: LoginParams): Promise<LoginResult> {
    const response = await loginApi(params)

    if (response.code !== 0) {
      throw new Error(response.message || '登录失败')
    }

    const result = response.data
    setToken(result.accessToken, result.refreshToken)
    setUserInfo(result.userInfo)

    return result
  }

  /**
   * 注册
   */
  async function register(params: RegisterParams): Promise<LoginResult> {
    const response = await registerApi(params)

    if (response.code !== 0) {
      throw new Error(response.message || '注册失败')
    }

    const result = response.data
    setToken(result.accessToken, result.refreshToken)
    setUserInfo(result.userInfo)

    return result
  }

  /**
   * 登出
   */
  async function logout() {
    try {
      // 调用登出接口
      await logoutApi()
    } catch (error) {
      console.error('登出接口调用失败:', error)
    } finally {
      // 无论接口是否成功，都清除本地状态
      clearUserState()
    }
  }

  /**
   * 清除用户状态
   */
  function clearUserState() {
    token.value = ''
    refreshToken.value = ''
    userInfo.value = null
    removeStorage(TOKEN_KEY)
    removeStorage(REFRESH_TOKEN_KEY)
    removeStorage(USER_KEY)
  }

  /**
   * 刷新用户信息
   */
  async function refreshUserInfo() {
    // TODO: 实现刷新用户信息逻辑
    console.log('刷新用户信息')
  }

  /**
   * 检查登录状态
   */
  function checkLoginStatus(): boolean {
    return !!token.value && !!userInfo.value
  }

  return {
    // 状态
    token,
    refreshToken,
    userInfo,
    // 计算属性
    isLoggedIn,
    username,
    avatar,
    userRole,
    // 方法
    setToken,
    setUserInfo,
    login,
    register,
    logout,
    clearUserState,
    refreshUserInfo,
    checkLoginStatus,
  }
})
