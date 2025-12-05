/**
 * 本地存储工具
 * 提供类型安全的 localStorage 和 sessionStorage 操作
 */

/** 存储选项 */
interface StorageOptions {
  /** 过期时间（毫秒） */
  expires?: number
  /** 是否使用 sessionStorage */
  session?: boolean
}

/** 存储数据结构 */
interface StorageData<T> {
  /** 存储的值 */
  value: T
  /** 过期时间戳 */
  expires?: number
  /** 存储时间戳 */
  timestamp: number
}

/**
 * 获取存储实例
 */
function getStorageInstance(session = false): Storage {
  return session ? sessionStorage : localStorage
}

/**
 * 设置存储数据
 * @param key 存储键
 * @param value 存储值
 * @param options 存储选项
 */
export function setStorage<T>(
  key: string,
  value: T,
  options: StorageOptions = {}
): void {
  const { expires, session = false } = options
  const storage = getStorageInstance(session)

  const data: StorageData<T> = {
    value,
    timestamp: Date.now(),
    ...(expires && { expires: Date.now() + expires }),
  }

  try {
    storage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`存储数据失败: ${key}`, error)
  }
}

/**
 * 获取存储数据
 * @param key 存储键
 * @param defaultValue 默认值
 * @param session 是否使用 sessionStorage
 * @returns 存储的值或默认值
 */
export function getStorage<T>(
  key: string,
  defaultValue: T,
  session = false
): T {
  const storage = getStorageInstance(session)

  try {
    const item = storage.getItem(key)
    if (!item) return defaultValue

    const data: StorageData<T> = JSON.parse(item)

    // 检查是否过期
    if (data.expires && Date.now() > data.expires) {
      storage.removeItem(key)
      return defaultValue
    }

    return data.value
  } catch (error) {
    console.error(`读取存储数据失败: ${key}`, error)
    return defaultValue
  }
}

/**
 * 移除存储数据
 * @param key 存储键
 * @param session 是否使用 sessionStorage
 */
export function removeStorage(key: string, session = false): void {
  const storage = getStorageInstance(session)
  storage.removeItem(key)
}

/**
 * 清空存储
 * @param session 是否使用 sessionStorage
 */
export function clearStorage(session = false): void {
  const storage = getStorageInstance(session)
  storage.clear()
}

/**
 * 获取存储键列表
 * @param session 是否使用 sessionStorage
 * @returns 键列表
 */
export function getStorageKeys(session = false): string[] {
  const storage = getStorageInstance(session)
  return Object.keys(storage)
}
