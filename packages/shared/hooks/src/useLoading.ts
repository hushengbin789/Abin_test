import { ref, type Ref } from 'vue';

/** 加载状态返回类型 */
export interface UseLoadingReturn {
  /** 是否正在加载 */
  loading: Ref<boolean>;
  /** 开始加载 */
  startLoading: () => void;
  /** 结束加载 */
  stopLoading: () => void;
  /** 包装异步函数，自动管理加载状态 */
  wrapLoading: <T>(fn: () => Promise<T>) => Promise<T>;
}

/**
 * 加载状态管理 Hook
 * @param initialValue 初始值
 */
export function useLoading(initialValue = false): UseLoadingReturn {
  const loading = ref(initialValue);

  const startLoading = () => {
    loading.value = true;
  };

  const stopLoading = () => {
    loading.value = false;
  };

  const wrapLoading = async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      startLoading();
      return await fn();
    } finally {
      stopLoading();
    }
  };

  return {
    loading,
    startLoading,
    stopLoading,
    wrapLoading,
  };
}
