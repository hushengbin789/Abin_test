import { ref, watch, type Ref } from 'vue'

/**
 * 节流值 Hook
 * @param value 需要节流的值
 * @param delay 间隔时间（毫秒）
 */
export function useThrottle<T>(value: Ref<T>, delay: number = 300) {
  const throttledValue = ref(value.value) as Ref<T>
  let lastTime = 0

  watch(
    value,
    (newValue) => {
      const now = Date.now()
      if (now - lastTime >= delay) {
        throttledValue.value = newValue
        lastTime = now
      }
    },
    { immediate: false }
  )

  return throttledValue
}

/**
 * 节流函数 Hook
 * @param fn 需要节流的函数
 * @param delay 间隔时间（毫秒）
 */
export function useThrottleFn<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number = 300
) {
  let lastTime = 0
  let timer: ReturnType<typeof setTimeout> | null = null

  const throttledFn = (...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = delay - (now - lastTime)

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn(...args)
      lastTime = now
    } else if (!timer) {
      timer = setTimeout(() => {
        fn(...args)
        lastTime = Date.now()
        timer = null
      }, remaining)
    }
  }

  /**
   * 取消节流
   */
  const cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return {
    run: throttledFn,
    cancel,
  }
}
