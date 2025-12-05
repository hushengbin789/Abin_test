import { ref, shallowRef, type Ref, type ShallowRef } from 'vue';

/** 请求选项 */
export interface UseRequestOptions<TParams extends unknown[], TData> {
  /** 是否手动触发 */
  manual?: boolean;
  /** 默认参数 */
  defaultParams?: TParams;
  /** 成功回调 */
  onSuccess?: (data: TData, params: TParams) => void;
  /** 失败回调 */
  onError?: (error: Error, params: TParams) => void;
  /** 请求前回调 */
  onBefore?: (params: TParams) => void;
  /** 请求后回调 */
  onFinally?: (params: TParams, data: TData | undefined, error: Error | undefined) => void;
}

/** 请求返回类型 */
export interface UseRequestReturn<TParams extends unknown[], TData> {
  /** 请求数据 */
  data: ShallowRef<TData | undefined>;
  /** 加载状态 */
  loading: Ref<boolean>;
  /** 错误信息 */
  error: ShallowRef<Error | undefined>;
  /** 执行请求 */
  run: (...params: TParams) => Promise<TData>;
  /** 刷新请求 */
  refresh: () => Promise<TData>;
  /** 修改数据 */
  mutate: (newData: TData | ((oldData: TData | undefined) => TData)) => void;
}

/**
 * 请求管理 Hook
 * @param service 请求函数
 * @param options 选项
 */
export function useRequest<TParams extends unknown[], TData>(
  service: (...args: TParams) => Promise<TData>,
  options: UseRequestOptions<TParams, TData> = {}
): UseRequestReturn<TParams, TData> {
  const { manual = false, defaultParams, onSuccess, onError, onBefore, onFinally } = options;

  const data = shallowRef<TData | undefined>(undefined);
  const loading = ref(false);
  const error = shallowRef<Error | undefined>(undefined);
  const paramsRef = ref<TParams | undefined>(defaultParams);

  const run = async (...params: TParams): Promise<TData> => {
    paramsRef.value = params as TParams;
    loading.value = true;
    error.value = undefined;

    onBefore?.(params);

    try {
      const result = await service(...params);
      data.value = result;
      onSuccess?.(result, params);
      return result;
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      error.value = e;
      onError?.(e, params);
      throw e;
    } finally {
      loading.value = false;
      onFinally?.(params, data.value, error.value);
    }
  };

  const refresh = async (): Promise<TData> => {
    if (!paramsRef.value) {
      throw new Error('没有可刷新的请求参数');
    }
    return run(...paramsRef.value);
  };

  const mutate = (newData: TData | ((oldData: TData | undefined) => TData)): void => {
    if (typeof newData === 'function') {
      data.value = (newData as (oldData: TData | undefined) => TData)(data.value);
    } else {
      data.value = newData;
    }
  };

  // 非手动模式自动请求
  if (!manual && defaultParams) {
    run(...defaultParams);
  }

  return {
    data,
    loading,
    error,
    run,
    refresh,
    mutate,
  };
}
