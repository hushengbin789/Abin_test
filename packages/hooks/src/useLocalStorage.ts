import { ref, watch, type Ref } from 'vue'

/**
 * localStorage Hook
 * @param key 存储键名
 * @param initialValue 初始值
 */
export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  // 从 localStorage 读取初始值
  const readFromStorage = (): T => {
    try {
      const item = localStorage.getItem(key)
      if (item) {
        return JSON.parse(item)
      }
    } catch (error) {
      console.warn(`读取 localStorage[${key}] 失败:`, error)
    }
    return initialValue
  }

  // 写入 localStorage
  const writeToStorage = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`写入 localStorage[${key}] 失败:`, error)
    }
  }

  // 创建响应式引用
  const state = ref<T>(readFromStorage()) as Ref<T>

  // 监听变化并同步到 localStorage
  watch(
    state,
    (newValue) => {
      writeToStorage(newValue)
    },
    { deep: true }
  )

  return state
}

/**
 * sessionStorage Hook
 * @param key 存储键名
 * @param initialValue 初始值
 */
export function useSessionStorage<T>(key: string, initialValue: T): Ref<T> {
  // 从 sessionStorage 读取初始值
  const readFromStorage = (): T => {
    try {
      const item = sessionStorage.getItem(key)
      if (item) {
        return JSON.parse(item)
      }
    } catch (error) {
      console.warn(`读取 sessionStorage[${key}] 失败:`, error)
    }
    return initialValue
  }

  // 写入 sessionStorage
  const writeToStorage = (value: T) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`写入 sessionStorage[${key}] 失败:`, error)
    }
  }

  // 创建响应式引用
  const state = ref<T>(readFromStorage()) as Ref<T>

  // 监听变化并同步到 sessionStorage
  watch(
    state,
    (newValue) => {
      writeToStorage(newValue)
    },
    { deep: true }
  )

  return state
}
