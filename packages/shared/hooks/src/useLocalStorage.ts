import { ref, watch, type Ref } from 'vue';

/**
 * 安全的 JSON 解析
 */
function safeJsonParse<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str) as T;
  } catch {
    return fallback;
  }
}

/** 本地存储选项 */
export interface UseLocalStorageOptions<T> {
  /** 默认值 */
  defaultValue?: T;
  /** 序列化函数 */
  serializer?: (value: T) => string;
  /** 反序列化函数 */
  deserializer?: (value: string) => T;
}

/** 本地存储返回类型 */
export interface UseLocalStorageReturn<T> {
  /** 存储的值 */
  state: Ref<T>;
  /** 设置值 */
  set: (value: T) => void;
  /** 移除值 */
  remove: () => void;
}

/**
 * 本地存储 Hook
 * @param key 存储键名
 * @param options 选项
 */
export function useLocalStorage<T>(
  key: string,
  options: UseLocalStorageOptions<T> = {}
): UseLocalStorageReturn<T> {
  const {
    defaultValue = null as T,
    serializer = JSON.stringify,
    deserializer = (value: string) => safeJsonParse(value, defaultValue),
  } = options;

  // 从 localStorage 读取初始值
  const getStoredValue = (): T => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) {
        return defaultValue;
      }
      return deserializer(raw);
    } catch {
      return defaultValue;
    }
  };

  const state = ref<T>(getStoredValue()) as Ref<T>;

  // 监听变化并同步到 localStorage
  watch(
    state,
    (newValue) => {
      try {
        if (newValue === null || newValue === undefined) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, serializer(newValue));
        }
      } catch (error) {
        console.error('localStorage 写入失败:', error);
      }
    },
    { deep: true }
  );

  const set = (value: T): void => {
    state.value = value;
  };

  const remove = (): void => {
    state.value = defaultValue;
    localStorage.removeItem(key);
  };

  return {
    state,
    set,
    remove,
  };
}
