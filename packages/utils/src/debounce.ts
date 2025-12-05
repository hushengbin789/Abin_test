/**
 * 防抖节流工具
 */

/**
 * 防抖函数
 * @param fn 要执行的函数
 * @param delay 延迟时间（毫秒）
 * @param immediate 是否立即执行
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay = 300,
  immediate = false
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  let isInvoked = false

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer)
    }

    if (immediate && !isInvoked) {
      fn.apply(this, args)
      isInvoked = true
    }

    timer = setTimeout(() => {
      if (!immediate) {
        fn.apply(this, args)
      }
      isInvoked = false
      timer = null
    }, delay)
  }
}

/**
 * 节流函数
 * @param fn 要执行的函数
 * @param interval 时间间隔（毫秒）
 * @param options 配置选项
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  interval = 300,
  options: { leading?: boolean; trailing?: boolean } = {}
): (...args: Parameters<T>) => void {
  const { leading = true, trailing = true } = options
  let lastTime = 0
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = Date.now()

    if (!lastTime && !leading) {
      lastTime = now
    }

    const remaining = interval - (now - lastTime)

    if (remaining <= 0 || remaining > interval) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      lastTime = now
      fn.apply(this, args)
    } else if (!timer && trailing) {
      timer = setTimeout(() => {
        lastTime = leading ? Date.now() : 0
        timer = null
        fn.apply(this, args)
      }, remaining)
    }
  }
}

/**
 * 创建可取消的 Promise
 */
export function createCancelablePromise<T>(promise: Promise<T>): {
  promise: Promise<T>
  cancel: () => void
} {
  let isCanceled = false

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise
      .then((value) => {
        if (!isCanceled) {
          resolve(value)
        }
      })
      .catch((error) => {
        if (!isCanceled) {
          reject(error)
        }
      })
  })

  return {
    promise: wrappedPromise,
    cancel: () => {
      isCanceled = true
    },
  }
}

/**
 * 只执行一次的函数
 */
export function once<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let called = false
  let result: ReturnType<T>

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (!called) {
      called = true
      result = fn.apply(this, args)
    }
    return result
  }
}

/**
 * 异步锁
 * 防止并发执行同一个异步函数
 */
export function asyncLock<
  T extends (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>,
>(fn: T): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
  let pending: Promise<Awaited<ReturnType<T>>> | null = null

  return async function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): Promise<Awaited<ReturnType<T>>> {
    if (pending) {
      return pending
    }

    pending = fn.apply(this, args)
    try {
      return await pending
    } finally {
      pending = null
    }
  }
}
