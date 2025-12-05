import { ref, computed, type Ref, type ComputedRef } from 'vue'

/**
 * 模态框状态管理返回类型
 */
interface UseModalReturn<T> {
  visible: Ref<boolean>
  data: Ref<T | null>
  hasData: ComputedRef<boolean>
  open: (payload?: T) => void
  close: () => void
  toggle: () => void
}

/**
 * 模态框状态管理
 */
export function useModal<T = unknown>(initialValue = false): UseModalReturn<T> {
  const visible = ref(initialValue)
  const data = ref<T | null>(null) as Ref<T | null>

  /** 打开模态框 */
  function open(payload?: T) {
    if (payload !== undefined) {
      data.value = payload
    }
    visible.value = true
  }

  /** 关闭模态框 */
  function close() {
    visible.value = false
    // 延迟清除数据，等待动画完成
    setTimeout(() => {
      data.value = null
    }, 300)
  }

  /** 切换模态框状态 */
  function toggle() {
    if (visible.value) {
      close()
    } else {
      open()
    }
  }

  /** 是否有数据 */
  const hasData = computed(() => data.value !== null)

  return {
    visible,
    data,
    hasData,
    open,
    close,
    toggle,
  }
}
