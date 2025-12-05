import { onMounted, onUnmounted, type Ref, unref } from 'vue';

/**
 * 点击外部区域 Hook
 * @param target 目标元素
 * @param handler 点击外部时的回调
 */
export function useClickOutside(
  target: HTMLElement | Ref<HTMLElement | null | undefined>,
  handler: (event: MouseEvent) => void
): void {
  const listener = (event: MouseEvent): void => {
    const el = unref(target);
    if (!el) return;

    // 点击的是目标元素或其子元素，不触发
    if (el === event.target || event.composedPath().includes(el)) {
      return;
    }

    handler(event);
  };

  onMounted(() => {
    document.addEventListener('click', listener, true);
  });

  onUnmounted(() => {
    document.removeEventListener('click', listener, true);
  });
}
