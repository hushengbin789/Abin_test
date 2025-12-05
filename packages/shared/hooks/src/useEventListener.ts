import { onMounted, onUnmounted, type Ref, unref, watch } from 'vue';

/** 事件目标类型 */
type TargetType = HTMLElement | Window | Document | null | undefined;

/** 事件监听选项 */
export interface UseEventListenerOptions {
  /** 事件捕获 */
  capture?: boolean;
  /** 是否只执行一次 */
  once?: boolean;
  /** 是否为被动事件 */
  passive?: boolean;
}

/**
 * 事件监听 Hook
 * @param target 目标元素
 * @param event 事件名
 * @param handler 事件处理函数
 * @param options 选项
 */
export function useEventListener<K extends keyof WindowEventMap>(
  target: Window | Ref<Window | null | undefined>,
  event: K,
  handler: (evt: WindowEventMap[K]) => void,
  options?: UseEventListenerOptions
): void;

export function useEventListener<K extends keyof DocumentEventMap>(
  target: Document | Ref<Document | null | undefined>,
  event: K,
  handler: (evt: DocumentEventMap[K]) => void,
  options?: UseEventListenerOptions
): void;

export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement | Ref<HTMLElement | null | undefined>,
  event: K,
  handler: (evt: HTMLElementEventMap[K]) => void,
  options?: UseEventListenerOptions
): void;

export function useEventListener(
  target: TargetType | Ref<TargetType>,
  event: string,
  handler: (evt: Event) => void,
  options: UseEventListenerOptions = {}
): void {
  const { capture = false, once = false, passive = false } = options;

  let cleanup: (() => void) | undefined;

  const register = (el: TargetType): void => {
    if (!el) return;

    el.addEventListener(event, handler, { capture, once, passive });
    cleanup = () => {
      el.removeEventListener(event, handler, { capture });
    };
  };

  const unregister = (): void => {
    cleanup?.();
    cleanup = undefined;
  };

  onMounted(() => {
    const el = unref(target);
    register(el);
  });

  // 如果 target 是 ref，则监听变化
  if (typeof target === 'object' && target !== null && 'value' in target) {
    watch(
      () => unref(target),
      (newTarget, oldTarget) => {
        if (newTarget !== oldTarget) {
          unregister();
          register(newTarget);
        }
      }
    );
  }

  onUnmounted(() => {
    unregister();
  });
}
