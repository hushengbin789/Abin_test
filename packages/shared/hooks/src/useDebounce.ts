import { ref, watch, type Ref } from 'vue';

/** 防抖值返回类型 */
export interface UseDebounceReturn<T> {
  /** 防抖后的值 */
  debouncedValue: Ref<T>;
}

/**
 * 防抖值 Hook
 * @param value 原始值
 * @param delay 延迟时间（毫秒）
 */
export function useDebounce<T>(value: Ref<T>, delay = 300): UseDebounceReturn<T> {
  const debouncedValue = ref<T>(value.value) as Ref<T>;
  let timer: ReturnType<typeof setTimeout> | null = null;

  watch(value, (newValue) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      debouncedValue.value = newValue;
      timer = null;
    }, delay);
  });

  return {
    debouncedValue,
  };
}

/** 防抖函数返回类型 */
export interface UseDebounceFnReturn<T extends (...args: unknown[]) => unknown> {
  /** 防抖后的函数 */
  run: T;
  /** 取消执行 */
  cancel: () => void;
}

/**
 * 防抖函数 Hook
 * @param fn 原始函数
 * @param delay 延迟时间（毫秒）
 */
export function useDebounceFn<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay = 300
): UseDebounceFnReturn<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const cancel = (): void => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const run = ((...args: Parameters<T>) => {
    cancel();
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  }) as T;

  return {
    run,
    cancel,
  };
}
