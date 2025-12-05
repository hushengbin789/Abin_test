import { ref } from 'vue'

/**
 * 布尔值状态管理 Hook
 * @param initialValue 初始值
 */
export function useBoolean(initialValue = false) {
  const state = ref(initialValue)

  /**
   * 设置为 true
   */
  const setTrue = () => {
    state.value = true
  }

  /**
   * 设置为 false
   */
  const setFalse = () => {
    state.value = false
  }

  /**
   * 切换状态
   */
  const toggle = () => {
    state.value = !state.value
  }

  /**
   * 设置值
   */
  const set = (value: boolean) => {
    state.value = value
  }

  return {
    state,
    setTrue,
    setFalse,
    toggle,
    set,
  }
}
