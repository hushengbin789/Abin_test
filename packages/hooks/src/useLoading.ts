import { ref } from 'vue'

/**
 * 加载状态管理 Hook
 */
export function useLoading(initialValue = false) {
  const loading = ref(initialValue)

  /**
   * 开始加载
   */
  const startLoading = () => {
    loading.value = true
  }

  /**
   * 结束加载
   */
  const stopLoading = () => {
    loading.value = false
  }

  /**
   * 切换加载状态
   */
  const toggleLoading = () => {
    loading.value = !loading.value
  }

  /**
   * 包装异步函数，自动管理加载状态
   * @param fn 异步函数
   */
  const wrapAsync = <T extends unknown[], R>(fn: (...args: T) => Promise<R>) => {
    return async (...args: T): Promise<R> => {
      startLoading()
      try {
        return await fn(...args)
      } finally {
        stopLoading()
      }
    }
  }

  return {
    loading,
    startLoading,
    stopLoading,
    toggleLoading,
    wrapAsync,
  }
}
