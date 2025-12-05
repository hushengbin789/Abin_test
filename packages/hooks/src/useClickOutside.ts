import { onMounted, onUnmounted, type Ref, unref } from 'vue'

/**
 * 点击元素外部 Hook
 * @param target 目标元素
 * @param handler 点击外部时的回调
 */
export function useClickOutside(
  target: Ref<HTMLElement | null | undefined>,
  handler: (event: MouseEvent) => void
) {
  const listener = (event: MouseEvent) => {
    const el = unref(target)
    if (!el) return

    // 点击的是目标元素或其子元素，不触发
    if (el === event.target || el.contains(event.target as Node)) {
      return
    }

    handler(event)
  }

  onMounted(() => {
    document.addEventListener('click', listener, true)
  })

  onUnmounted(() => {
    document.removeEventListener('click', listener, true)
  })
}
