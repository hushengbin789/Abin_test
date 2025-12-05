import { ref } from 'vue'

/**
 * 加载状态管理
 */
export function useLoading(initialValue = false) {
  const loading = ref(initialValue)

  /** 开始加载 */
  function startLoading() {
    loading.value = true
  }

  /** 结束加载 */
  function stopLoading() {
    loading.value = false
  }

  /** 切换加载状态 */
  function toggleLoading() {
    loading.value = !loading.value
  }

  /**
   * 包装异步函数，自动管理加载状态
   */
  async function withLoading<T>(fn: () => Promise<T>): Promise<T> {
    startLoading()
    try {
      return await fn()
    } finally {
      stopLoading()
    }
  }

  return {
    loading,
    startLoading,
    stopLoading,
    toggleLoading,
    withLoading,
  }
}
