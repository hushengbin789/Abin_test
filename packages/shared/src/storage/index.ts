/**
 * 本地存储工具
 */

/**
 * 存储类型
 */
type StorageType = 'localStorage' | 'sessionStorage'

/**
 * 存储值的包装类型
 */
interface StorageValue<T> {
  value: T
  expire?: number
}

/**
 * 创建存储实例
 * @param type 存储类型
 */
function createStorage(type: StorageType) {
  const storage = type === 'localStorage' ? localStorage : sessionStorage

  return {
    /**
     * 设置存储项
     * @param key 键名
     * @param value 值
     * @param expire 过期时间（毫秒），不传则永不过期
     */
    set<T>(key: string, value: T, expire?: number): void {
      const data: StorageValue<T> = {
        value,
        expire: expire ? Date.now() + expire : undefined,
      }
      storage.setItem(key, JSON.stringify(data))
    },

    /**
     * 获取存储项
     * @param key 键名
     * @param defaultValue 默认值
     */
    get<T>(key: string, defaultValue?: T): T | undefined {
      const item = storage.getItem(key)
      if (!item) {
        return defaultValue
      }
      try {
        const data = JSON.parse(item) as StorageValue<T>
        // 检查是否过期
        if (data.expire && Date.now() > data.expire) {
          storage.removeItem(key)
          return defaultValue
        }
        return data.value
      } catch {
        return defaultValue
      }
    },

    /**
     * 移除存储项
     * @param key 键名
     */
    remove(key: string): void {
      storage.removeItem(key)
    },

    /**
     * 清空所有存储
     */
    clear(): void {
      storage.clear()
    },

    /**
     * 检查键是否存在
     * @param key 键名
     */
    has(key: string): boolean {
      return storage.getItem(key) !== null
    },

    /**
     * 获取所有键名
     */
    keys(): string[] {
      return Object.keys(storage)
    },
  }
}

/**
 * localStorage 操作实例
 */
export const localCache = createStorage('localStorage')

/**
 * sessionStorage 操作实例
 */
export const sessionCache = createStorage('sessionStorage')

/**
 * Cookie 操作工具
 */
export const cookieCache = {
  /**
   * 设置 Cookie
   * @param key 键名
   * @param value 值
   * @param days 过期天数
   * @param path 路径
   */
  set(key: string, value: string, days?: number, path: string = '/'): void {
    let expires = ''
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = `; expires=${date.toUTCString()}`
    }
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}${expires}; path=${path}`
  },

  /**
   * 获取 Cookie
   * @param key 键名
   */
  get(key: string): string | undefined {
    const nameEQ = `${encodeURIComponent(key)}=`
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      let c = cookie.trim()
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length))
      }
    }
    return undefined
  },

  /**
   * 删除 Cookie
   * @param key 键名
   * @param path 路径
   */
  remove(key: string, path: string = '/'): void {
    this.set(key, '', -1, path)
  },
}
