/**
 * 通用工具函数
 */

/**
 * 深拷贝对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as unknown as T
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T
  }

  const cloned = {} as T
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key])
    }
  }
  return cloned
}

/**
 * 深度合并对象
 */
export function deepMerge<T extends object>(
  target: T,
  ...sources: Partial<T>[]
): T {
  if (!sources.length) return target

  const source = sources.shift()
  if (source === undefined) return target

  if (isPlainObject(target) && isPlainObject(source)) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key]
        if (isPlainObject(sourceValue)) {
          if (!target[key as keyof T]) {
            Object.assign(target, { [key]: {} })
          }
          deepMerge(target[key as keyof T] as object, sourceValue as object)
        } else {
          Object.assign(target, { [key]: sourceValue })
        }
      }
    }
  }

  return deepMerge(target, ...sources)
}

/**
 * 判断是否为普通对象
 */
export function isPlainObject(
  value: unknown
): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 生成唯一 ID
 */
export function generateId(prefix = ''): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}${timestamp}${random}`
}

/**
 * 生成 UUID v4
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 延迟执行
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 重试函数
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: { times?: number; delay?: number } = {}
): Promise<T> {
  const { times = 3, delay = 1000 } = options
  let lastError: Error | undefined

  for (let i = 0; i < times; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (i < times - 1) {
        await sleep(delay)
      }
    }
  }

  throw lastError
}

/**
 * 将扁平数组转换为树形结构
 */
export function arrayToTree<
  T extends { id: string | number; parentId?: string | number | null },
>(
  items: T[],
  parentId: string | number | null = null
): (T & { children?: T[] })[] {
  return items
    .filter((item) => item.parentId === parentId)
    .map((item) => ({
      ...item,
      children: arrayToTree(items, item.id),
    }))
}

/**
 * 将树形结构扁平化
 */
export function treeToArray<T extends { children?: T[] }>(
  tree: T[],
  childrenKey = 'children'
): Omit<T, 'children'>[] {
  const result: Omit<T, 'children'>[] = []

  const flatten = (nodes: T[]) => {
    nodes.forEach((node) => {
      const { [childrenKey]: children, ...rest } = node as T &
        Record<string, unknown>
      result.push(rest as Omit<T, 'children'>)
      if (children && Array.isArray(children)) {
        flatten(children as T[])
      }
    })
  }

  flatten(tree)
  return result
}

/**
 * 获取 URL 查询参数
 */
export function getQueryParams(url?: string): Record<string, string> {
  const search = url ? new URL(url).search : window.location.search
  const params = new URLSearchParams(search)
  const result: Record<string, string> = {}

  params.forEach((value, key) => {
    result[key] = value
  })

  return result
}

/**
 * 构建 URL 查询字符串
 */
export function buildQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value))
    }
  })

  return searchParams.toString()
}
