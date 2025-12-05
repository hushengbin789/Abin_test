import { ref, shallowRef, type Ref, type ShallowRef } from 'vue'

/**
 * 异步请求配置
 */
interface UseAsyncOptions<T> {
  /** 初始数据 */
  initialData?: T
  /** 是否立即执行 */
  immediate?: boolean
  /** 成功回调 */
  onSuccess?: (data: T) => void
  /** 失败回调 */
  onError?: (error: Error) => void
  /** 完成回调（无论成功失败） */
  onFinally?: () => void
}

/**
 * 异步请求返回类型
 */
interface UseAsyncReturn<T, P extends unknown[]> {
  data: ShallowRef<T | undefined>
  loading: Ref<boolean>
  error: ShallowRef<Error | null>
  execute: (...args: P) => Promise<T | undefined>
  reset: () => void
  setData: (newData: T) => void
}

/**
 * 异步请求 Hook
 * @param asyncFn 异步函数
 * @param options 配置项
 */
export function useAsync<T, P extends unknown[] = []>(
  asyncFn: (...args: P) => Promise<T>,
  options: UseAsyncOptions<T> = {}
): UseAsyncReturn<T, P> {
  const { initialData, immediate = false, onSuccess, onError, onFinally } = options

  const data = shallowRef<T | undefined>(initialData)
  const loading = ref(false)
  const error = shallowRef<Error | null>(null)

  /**
   * 执行异步请求
   */
  const execute = async (...args: P): Promise<T | undefined> => {
    loading.value = true
    error.value = null

    try {
      const result = await asyncFn(...args)
      data.value = result
      onSuccess?.(result)
      return result
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      error.value = e
      onError?.(e)
      return undefined
    } finally {
      loading.value = false
      onFinally?.()
    }
  }

  /**
   * 重置状态
   */
  const reset = () => {
    data.value = initialData
    loading.value = false
    error.value = null
  }

  /**
   * 手动设置数据
   */
  const setData = (newData: T) => {
    data.value = newData
  }

  // 立即执行
  if (immediate) {
    execute(...([] as unknown as P))
  }

  return {
    data,
    loading,
    error,
    execute,
    reset,
    setData,
  }
}
