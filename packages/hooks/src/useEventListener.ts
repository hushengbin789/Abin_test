import { onMounted, onUnmounted, type Ref, unref, watch } from 'vue'

type Target = HTMLElement | Window | Document | Ref<HTMLElement | null | undefined>

/**
 * 事件监听 Hook
 * @param target 目标元素
 * @param event 事件名称
 * @param handler 事件处理函数
 * @param options 事件选项
 */
export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: Target,
  event: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void
export function useEventListener<K extends keyof WindowEventMap>(
  target: Window,
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void
export function useEventListener<K extends keyof DocumentEventMap>(
  target: Document,
  event: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void
export function useEventListener(
  target: Target,
  event: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
) {
  const getElement = (): HTMLElement | Window | Document | null => {
    const el = unref(target)
    if (!el) return null
    return el
  }

  let cleanup: (() => void) | null = null

  const bindEvent = () => {
    const el = getElement()
    if (!el) return

    el.addEventListener(event, handler, options)
    cleanup = () => {
      el.removeEventListener(event, handler, options)
    }
  }

  const unbindEvent = () => {
    if (cleanup) {
      cleanup()
      cleanup = null
    }
  }

  // 如果 target 是响应式的，监听变化
  if (typeof target === 'object' && 'value' in target) {
    watch(
      () => unref(target),
      () => {
        unbindEvent()
        bindEvent()
      },
      { immediate: false }
    )
  }

  onMounted(() => {
    bindEvent()
  })

  onUnmounted(() => {
    unbindEvent()
  })
}
