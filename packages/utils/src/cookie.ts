/**
 * Cookie 操作工具
 * 基于 js-cookie 提供类型安全的 Cookie 操作
 */
import Cookies from 'js-cookie'

/** Cookie 配置选项 */
export interface CookieOptions {
  /** 过期时间（天数或 Date 对象） */
  expires?: number | Date
  /** 路径 */
  path?: string
  /** 域名 */
  domain?: string
  /** 是否仅 HTTPS */
  secure?: boolean
  /** SameSite 策略 */
  sameSite?: 'strict' | 'lax' | 'none'
}

/** 默认 Cookie 配置 */
const defaultOptions: CookieOptions = {
  path: '/',
  sameSite: 'lax',
}

/**
 * 设置 Cookie
 * @param name Cookie 名称
 * @param value Cookie 值
 * @param options 配置选项
 *
 * @example
 * // 设置简单 Cookie
 * setCookie('token', 'abc123')
 *
 * // 设置带过期时间的 Cookie（7天后过期）
 * setCookie('token', 'abc123', { expires: 7 })
 *
 * // 设置安全 Cookie
 * setCookie('token', 'abc123', { secure: true, sameSite: 'strict' })
 */
export function setCookie(
  name: string,
  value: string,
  options?: CookieOptions
): void {
  Cookies.set(name, value, { ...defaultOptions, ...options })
}

/**
 * 获取 Cookie
 * @param name Cookie 名称
 * @returns Cookie 值，不存在则返回 undefined
 *
 * @example
 * const token = getCookie('token')
 * if (token) {
 *   console.log('Token:', token)
 * }
 */
export function getCookie(name: string): string | undefined {
  return Cookies.get(name)
}

/**
 * 获取所有 Cookie
 * @returns 所有 Cookie 的键值对对象
 *
 * @example
 * const allCookies = getAllCookies()
 * console.log(allCookies) // { token: 'abc123', user: 'john' }
 */
export function getAllCookies(): Record<string, string> {
  return Cookies.get()
}

/**
 * 删除 Cookie
 * @param name Cookie 名称
 * @param options 配置选项（需要与设置时相同的 path 和 domain）
 *
 * @example
 * removeCookie('token')
 * removeCookie('token', { path: '/admin' })
 */
export function removeCookie(name: string, options?: CookieOptions): void {
  Cookies.remove(name, { ...defaultOptions, ...options })
}

/**
 * 检查 Cookie 是否存在
 * @param name Cookie 名称
 *
 * @example
 * if (hasCookie('token')) {
 *   console.log('用户已登录')
 * }
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== undefined
}

/**
 * 设置 JSON 对象到 Cookie
 * @param name Cookie 名称
 * @param value 对象值
 * @param options 配置选项
 *
 * @example
 * setCookieJSON('user', { id: 1, name: 'John' }, { expires: 7 })
 */
export function setCookieJSON<T>(
  name: string,
  value: T,
  options?: CookieOptions
): void {
  try {
    const jsonString = JSON.stringify(value)
    setCookie(name, jsonString, options)
  } catch (error) {
    console.error(`设置 Cookie JSON 失败: ${name}`, error)
  }
}

/**
 * 从 Cookie 获取 JSON 对象
 * @param name Cookie 名称
 * @param defaultValue 默认值
 *
 * @example
 * const user = getCookieJSON<{ id: number; name: string }>('user')
 * if (user) {
 *   console.log('用户名:', user.name)
 * }
 */
export function getCookieJSON<T>(
  name: string,
  defaultValue?: T
): T | undefined {
  const value = getCookie(name)
  if (!value) return defaultValue

  try {
    return JSON.parse(value) as T
  } catch (error) {
    console.error(`解析 Cookie JSON 失败: ${name}`, error)
    return defaultValue
  }
}

/**
 * Token 管理工具
 * 提供便捷的 Token 存取方法
 */
export const tokenManager = {
  /** Token 在 Cookie 中的键名 */
  TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',

  /**
   * 设置访问令牌
   * @param token 访问令牌
   * @param expiresInDays 过期天数，默认7天
   */
  setAccessToken(token: string, expiresInDays = 7): void {
    setCookie(this.TOKEN_KEY, token, {
      expires: expiresInDays,
      secure: true,
      sameSite: 'strict',
    })
  },

  /**
   * 获取访问令牌
   */
  getAccessToken(): string | undefined {
    return getCookie(this.TOKEN_KEY)
  },

  /**
   * 设置刷新令牌
   * @param token 刷新令牌
   * @param expiresInDays 过期天数，默认30天
   */
  setRefreshToken(token: string, expiresInDays = 30): void {
    setCookie(this.REFRESH_TOKEN_KEY, token, {
      expires: expiresInDays,
      secure: true,
      sameSite: 'strict',
    })
  },

  /**
   * 获取刷新令牌
   */
  getRefreshToken(): string | undefined {
    return getCookie(this.REFRESH_TOKEN_KEY)
  },

  /**
   * 清除所有令牌
   */
  clearTokens(): void {
    removeCookie(this.TOKEN_KEY)
    removeCookie(this.REFRESH_TOKEN_KEY)
  },

  /**
   * 检查是否有有效的访问令牌
   */
  hasValidToken(): boolean {
    return hasCookie(this.TOKEN_KEY)
  },
}

/**
 * 用户偏好设置管理
 */
export const preferencesManager = {
  /** 偏好设置在 Cookie 中的键名 */
  PREFERENCES_KEY: 'user_preferences',

  /**
   * 获取用户偏好设置
   */
  get<T extends Record<string, unknown>>(): T | undefined {
    return getCookieJSON<T>(this.PREFERENCES_KEY)
  },

  /**
   * 保存用户偏好设置
   * @param preferences 偏好设置对象
   */
  set<T extends Record<string, unknown>>(preferences: T): void {
    setCookieJSON(this.PREFERENCES_KEY, preferences, { expires: 365 })
  },

  /**
   * 更新部分偏好设置
   * @param partial 部分偏好设置
   */
  update<T extends Record<string, unknown>>(partial: Partial<T>): void {
    const current = this.get<T>() || ({} as T)
    this.set({ ...current, ...partial })
  },

  /**
   * 清除偏好设置
   */
  clear(): void {
    removeCookie(this.PREFERENCES_KEY)
  },
}
