import { ref, watch, type Ref } from 'vue'

/**
 * 防抖值 Hook
 * @param value 需要防抖的值
 * @param delay 延迟时间（毫秒）
 */
export function useDebounce<T>(value: Ref<T>, delay: number = 300) {
  const debouncedValue = ref(value.value) as Ref<T>
  let timer: ReturnType<typeof setTimeout> | null = null

  watch(
    value,
    (newValue) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        debouncedValue.value = newValue
        timer = null
      }, delay)
    },
    { immediate: false }
  )

  return debouncedValue
}

/**
 * 防抖函数 Hook
 * @param fn 需要防抖的函数
 * @param delay 延迟时间（毫秒）
 */
export function useDebounceFn<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number = 300
) {
  let timer: ReturnType<typeof setTimeout> | null = null

  const debouncedFn = (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }

  /**
   * 取消防抖
   */
  const cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  /**
   * 立即执行
   */
  const flush = (...args: Parameters<T>) => {
    cancel()
    fn(...args)
  }

  return {
    run: debouncedFn,
    cancel,
    flush,
  }
}
