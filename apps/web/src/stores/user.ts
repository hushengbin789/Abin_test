/**
 * 用户状态管理
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInfo, LoginParams, LoginResult } from '@packages/types'
import { setStorage, getStorage, removeStorage } from '@packages/utils'

const TOKEN_KEY = 'access_token'
const USER_KEY = 'user_info'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string>(getStorage(TOKEN_KEY, ''))
  const userInfo = ref<UserInfo | null>(getStorage(USER_KEY, null))

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const username = computed(() => userInfo.value?.username || '')
  const avatar = computed(() => userInfo.value?.avatar || '')

  // 操作方法

  /**
   * 设置令牌
   */
  function setToken(newToken: string) {
    token.value = newToken
    setStorage(TOKEN_KEY, newToken, { expires: 7 * 24 * 60 * 60 * 1000 })
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
    // 模拟登录接口
    console.log('登录参数:', params)

    // TODO: 替换为真实的登录接口
    const mockResult: LoginResult = {
      accessToken: 'mock_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      expiresIn: 7200,
      userInfo: {
        id: '1',
        username: params.account,
        email: `${params.account}@example.com`,
        avatar: '',
        role: 0 as unknown as LoginResult['userInfo']['role'],
        status: 0 as unknown as LoginResult['userInfo']['status'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }

    setToken(mockResult.accessToken)
    setUserInfo(mockResult.userInfo)

    return mockResult
  }

  /**
   * 登出
   */
  function logout() {
    token.value = ''
    userInfo.value = null
    removeStorage(TOKEN_KEY)
    removeStorage(USER_KEY)
  }

  /**
   * 刷新用户信息
   */
  async function refreshUserInfo() {
    // TODO: 实现刷新用户信息逻辑
    console.log('刷新用户信息')
  }

  return {
    // 状态
    token,
    userInfo,
    // 计算属性
    isLoggedIn,
    username,
    avatar,
    // 方法
    setToken,
    setUserInfo,
    login,
    logout,
    refreshUserInfo,
  }
})
