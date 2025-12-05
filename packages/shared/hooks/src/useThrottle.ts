import { ref, watch, type Ref } from 'vue';

/** 节流值返回类型 */
export interface UseThrottleReturn<T> {
  /** 节流后的值 */
  throttledValue: Ref<T>;
}

/**
 * 节流值 Hook
 * @param value 原始值
 * @param limit 时间间隔（毫秒）
 */
export function useThrottle<T>(value: Ref<T>, limit = 300): UseThrottleReturn<T> {
  const throttledValue = ref<T>(value.value) as Ref<T>;
  let inThrottle = false;

  watch(value, (newValue) => {
    if (!inThrottle) {
      throttledValue.value = newValue;
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  });

  return {
    throttledValue,
  };
}

/** 节流函数返回类型 */
export interface UseThrottleFnReturn<T extends (...args: unknown[]) => unknown> {
  /** 节流后的函数 */
  run: T;
}

/**
 * 节流函数 Hook
 * @param fn 原始函数
 * @param limit 时间间隔（毫秒）
 */
export function useThrottleFn<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit = 300
): UseThrottleFnReturn<T> {
  let lastRun = 0;

  const run = ((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastRun >= limit) {
      fn(...args);
      lastRun = now;
    }
  }) as T;

  return {
    run,
  };
}
