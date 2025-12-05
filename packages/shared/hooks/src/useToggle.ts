import { ref, type Ref } from 'vue';

/** 切换状态返回类型 */
export interface UseToggleReturn<T = boolean> {
  /** 当前状态 */
  state: Ref<T>;
  /** 切换状态 */
  toggle: (value?: T) => void;
  /** 设置为左值 */
  setLeft: () => void;
  /** 设置为右值 */
  setRight: () => void;
}

/**
 * 切换状态 Hook
 * @param defaultValue 默认值
 */
export function useToggle(defaultValue?: boolean): UseToggleReturn<boolean>;

/**
 * 切换状态 Hook（自定义值）
 * @param leftValue 左值
 * @param rightValue 右值
 */
export function useToggle<T>(leftValue: T, rightValue: T): UseToggleReturn<T>;

export function useToggle<T = boolean>(
  defaultValue: T | boolean = false,
  rightValue?: T
): UseToggleReturn<T | boolean> {
  const hasCustomValue = rightValue !== undefined;
  const leftValue = defaultValue;

  const state = ref<T | boolean>(defaultValue) as Ref<T | boolean>;

  const toggle = (value?: T | boolean): void => {
    if (value !== undefined) {
      state.value = value;
      return;
    }

    if (hasCustomValue) {
      state.value = state.value === leftValue ? (rightValue as T) : leftValue;
    } else {
      state.value = !state.value;
    }
  };

  const setLeft = (): void => {
    state.value = leftValue;
  };

  const setRight = (): void => {
    state.value = hasCustomValue ? (rightValue as T) : true;
  };

  return {
    state,
    toggle,
    setLeft,
    setRight,
  };
}
