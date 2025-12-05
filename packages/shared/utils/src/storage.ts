/**
 * 本地存储工具
 * 提供类型安全的 localStorage 和 sessionStorage 操作
 */

import { safeJsonParse } from './common';

/** 存储选项 */
interface StorageOptions {
  /** 过期时间（毫秒） */
  expires?: number;
  /** 存储类型 */
  type?: 'local' | 'session';
}

/** 存储数据结构 */
interface StorageData<T> {
  value: T;
  expires: number | null;
  timestamp: number;
}

/**
 * 获取存储对象
 */
function getStorageInstance(type: 'local' | 'session'): Storage {
  return type === 'local' ? localStorage : sessionStorage;
}

/**
 * 设置存储数据
 * @param key 键名
 * @param value 值
 * @param options 选项
 */
export function setStorage<T>(key: string, value: T, options: StorageOptions = {}): void {
  const { expires, type = 'local' } = options;
  const storage = getStorageInstance(type);

  const data: StorageData<T> = {
    value,
    expires: expires ? Date.now() + expires : null,
    timestamp: Date.now(),
  };

  storage.setItem(key, JSON.stringify(data));
}

/**
 * 获取存储数据
 * @param key 键名
 * @param defaultValue 默认值
 * @param type 存储类型
 */
export function getStorage<T>(
  key: string,
  defaultValue: T,
  type: 'local' | 'session' = 'local'
): T {
  const storage = getStorageInstance(type);
  const raw = storage.getItem(key);

  if (!raw) {
    return defaultValue;
  }

  const data = safeJsonParse<StorageData<T> | null>(raw, null);

  if (!data) {
    return defaultValue;
  }

  // 检查是否过期
  if (data.expires && Date.now() > data.expires) {
    storage.removeItem(key);
    return defaultValue;
  }

  return data.value;
}

/**
 * 移除存储数据
 * @param key 键名
 * @param type 存储类型
 */
export function removeStorage(key: string, type: 'local' | 'session' = 'local'): void {
  const storage = getStorageInstance(type);
  storage.removeItem(key);
}

/**
 * 清空存储
 * @param type 存储类型
 */
export function clearStorage(type: 'local' | 'session' = 'local'): void {
  const storage = getStorageInstance(type);
  storage.clear();
}

/**
 * 创建带命名空间的存储实例
 * @param namespace 命名空间
 */
export function createStorage(namespace: string) {
  const prefix = `${namespace}:`;

  return {
    set<T>(key: string, value: T, options?: StorageOptions): void {
      setStorage(`${prefix}${key}`, value, options);
    },

    get<T>(key: string, defaultValue: T, type?: 'local' | 'session'): T {
      return getStorage(`${prefix}${key}`, defaultValue, type);
    },

    remove(key: string, type?: 'local' | 'session'): void {
      removeStorage(`${prefix}${key}`, type);
    },
  };
}
