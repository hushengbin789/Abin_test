/**
 * URL 查询字符串处理工具
 * 基于 qs 库提供强大的查询字符串解析和序列化功能
 */
import qs from 'qs'

/** 解析配置选项 */
export interface ParseOptions {
  /** 是否忽略查询字符串开头的 ? */
  ignoreQueryPrefix?: boolean
  /** 数组格式 */
  arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma'
  /** 解析深度限制 */
  depth?: number
  /** 允许点号分隔的嵌套对象 */
  allowDots?: boolean
  /** 解码函数 */
  decoder?: (str: string) => string
}

/** 序列化配置选项 */
export interface StringifyOptions {
  /** 是否添加 ? 前缀 */
  addQueryPrefix?: boolean
  /** 数组格式 */
  arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma'
  /** 是否使用点号分隔嵌套对象 */
  allowDots?: boolean
  /** 是否跳过 null 值 */
  skipNulls?: boolean
  /** 编码函数 */
  encoder?: (str: string) => string
  /** 排序函数 */
  sort?: (a: string, b: string) => number
  /** 过滤函数 */
  filter?: (prefix: string, value: unknown) => unknown
}

/** 默认解析配置 */
const defaultParseOptions: ParseOptions = {
  ignoreQueryPrefix: true,
  allowDots: true,
  depth: 5,
}

/** 默认序列化配置 */
const defaultStringifyOptions: StringifyOptions = {
  addQueryPrefix: false,
  skipNulls: true,
  allowDots: true,
  arrayFormat: 'brackets',
}

/**
 * 解析查询字符串
 * @param query 查询字符串
 * @param options 解析选项
 * @returns 解析后的对象
 *
 * @example
 * // 基础解析
 * parseQuery('name=John&age=30')
 * // { name: 'John', age: '30' }
 *
 * // 带问号的查询字符串
 * parseQuery('?name=John&age=30')
 * // { name: 'John', age: '30' }
 *
 * // 嵌套对象
 * parseQuery('user.name=John&user.age=30')
 * // { user: { name: 'John', age: '30' } }
 *
 * // 数组
 * parseQuery('tags[0]=a&tags[1]=b')
 * // { tags: ['a', 'b'] }
 */
export function parseQuery<T = Record<string, unknown>>(
  query: string,
  options?: ParseOptions
): T {
  return qs.parse(query, {
    ...defaultParseOptions,
    ...options,
  }) as T
}

/**
 * 从 URL 中提取并解析查询字符串
 * @param url URL 字符串
 * @param options 解析选项
 *
 * @example
 * parseQueryFromUrl('https://example.com?name=John&age=30')
 * // { name: 'John', age: '30' }
 */
export function parseQueryFromUrl<T = Record<string, unknown>>(
  url: string,
  options?: ParseOptions
): T {
  const queryString = url.split('?')[1] || ''
  return parseQuery<T>(queryString, options)
}

/**
 * 序列化对象为查询字符串
 * @param params 参数对象
 * @param options 序列化选项
 * @returns 查询字符串
 *
 * @example
 * // 基础序列化
 * stringifyQuery({ name: 'John', age: 30 })
 * // 'name=John&age=30'
 *
 * // 添加问号前缀
 * stringifyQuery({ name: 'John' }, { addQueryPrefix: true })
 * // '?name=John'
 *
 * // 嵌套对象
 * stringifyQuery({ user: { name: 'John', age: 30 } })
 * // 'user.name=John&user.age=30'
 *
 * // 数组
 * stringifyQuery({ tags: ['a', 'b'] })
 * // 'tags[]=a&tags[]=b'
 */
export function stringifyQuery(
  params: Record<string, unknown>,
  options?: StringifyOptions
): string {
  return qs.stringify(params, {
    ...defaultStringifyOptions,
    ...options,
  })
}

/**
 * 获取当前页面的查询参数
 * @returns 查询参数对象
 *
 * @example
 * // 当前 URL: https://example.com?name=John&age=30
 * getCurrentQuery()
 * // { name: 'John', age: '30' }
 */
export function getCurrentQuery<T = Record<string, unknown>>(): T {
  if (typeof window === 'undefined') {
    return {} as T
  }
  return parseQuery<T>(window.location.search)
}

/**
 * 获取当前页面的指定查询参数
 * @param key 参数名
 * @param defaultValue 默认值
 *
 * @example
 * // 当前 URL: https://example.com?page=2
 * getQueryParam('page', '1') // '2'
 * getQueryParam('size', '10') // '10' (使用默认值)
 */
export function getQueryParam<T = string>(
  key: string,
  defaultValue?: T
): T | undefined {
  const query = getCurrentQuery<Record<string, T>>()
  return query[key] ?? defaultValue
}

/**
 * 更新 URL 查询参数（不刷新页面）
 * @param params 要更新的参数
 * @param replace 是否替换历史记录
 *
 * @example
 * // 当前 URL: https://example.com?page=1
 * updateQueryParams({ page: 2, size: 10 })
 * // URL 变为: https://example.com?page=2&size=10
 */
export function updateQueryParams(
  params: Record<string, unknown>,
  replace = false
): void {
  if (typeof window === 'undefined') return

  const currentQuery = getCurrentQuery()
  const newQuery = { ...currentQuery, ...params }

  // 移除值为 null 或 undefined 的参数
  Object.keys(newQuery).forEach((key) => {
    if (newQuery[key] === null || newQuery[key] === undefined) {
      delete newQuery[key]
    }
  })

  const queryString = stringifyQuery(newQuery, { addQueryPrefix: true })
  const newUrl = `${window.location.pathname}${queryString}`

  if (replace) {
    window.history.replaceState(null, '', newUrl)
  } else {
    window.history.pushState(null, '', newUrl)
  }
}

/**
 * 移除指定的查询参数
 * @param keys 要移除的参数键
 *
 * @example
 * // 当前 URL: https://example.com?page=1&size=10&filter=active
 * removeQueryParams(['filter'])
 * // URL 变为: https://example.com?page=1&size=10
 */
export function removeQueryParams(keys: string[]): void {
  const currentQuery = getCurrentQuery()
  keys.forEach((key) => {
    delete currentQuery[key]
  })
  updateQueryParams(currentQuery, true)
}

/**
 * 清空所有查询参数
 *
 * @example
 * // 当前 URL: https://example.com?page=1&size=10
 * clearQueryParams()
 * // URL 变为: https://example.com
 */
export function clearQueryParams(): void {
  if (typeof window === 'undefined') return
  window.history.replaceState(null, '', window.location.pathname)
}

/**
 * 构建完整的 URL
 * @param baseUrl 基础 URL
 * @param params 查询参数
 *
 * @example
 * buildUrl('https://api.example.com/users', { page: 1, size: 10 })
 * // 'https://api.example.com/users?page=1&size=10'
 */
export function buildUrl(
  baseUrl: string,
  params?: Record<string, unknown>
): string {
  if (!params || Object.keys(params).length === 0) {
    return baseUrl
  }

  const queryString = stringifyQuery(params)
  const separator = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${separator}${queryString}`
}

/**
 * 合并多个查询参数对象
 * @param queries 查询参数对象数组
 *
 * @example
 * mergeQueries({ page: 1 }, { size: 10 }, { filter: 'active' })
 * // { page: 1, size: 10, filter: 'active' }
 */
export function mergeQueries(
  ...queries: Record<string, unknown>[]
): Record<string, unknown> {
  return queries.reduce((acc, query) => ({ ...acc, ...query }), {})
}

/**
 * 创建带状态的查询参数管理器
 * 适用于需要管理分页、筛选等场景
 *
 * @example
 * const queryManager = createQueryManager({
 *   page: 1,
 *   pageSize: 10,
 *   keyword: '',
 *   status: undefined
 * })
 *
 * // 更新参数
 * queryManager.set({ page: 2 })
 *
 * // 获取查询字符串
 * queryManager.toString() // 'page=2&pageSize=10'
 *
 * // 重置到初始状态
 * queryManager.reset()
 */
export function createQueryManager<T extends Record<string, unknown>>(
  initialParams: T
) {
  let params = { ...initialParams }

  return {
    /**
     * 获取当前参数
     */
    get(): T {
      return { ...params }
    },

    /**
     * 获取指定参数
     */
    getParam<K extends keyof T>(key: K): T[K] {
      return params[key]
    },

    /**
     * 设置参数
     */
    set(newParams: Partial<T>): void {
      params = { ...params, ...newParams }
    },

    /**
     * 重置到初始状态
     */
    reset(): void {
      params = { ...initialParams }
    },

    /**
     * 清除指定参数
     */
    clear(keys: (keyof T)[]): void {
      keys.forEach((key) => {
        params[key] = initialParams[key]
      })
    },

    /**
     * 转换为查询字符串
     */
    toString(options?: StringifyOptions): string {
      return stringifyQuery(params as Record<string, unknown>, options)
    },

    /**
     * 同步到 URL
     */
    syncToUrl(replace = false): void {
      updateQueryParams(params as Record<string, unknown>, replace)
    },

    /**
     * 从 URL 同步
     */
    syncFromUrl(): void {
      const urlParams = getCurrentQuery<Partial<T>>()
      params = { ...initialParams, ...urlParams }
    },
  }
}

/**
 * 分页查询参数工具
 */
export const paginationQuery = {
  /** 默认分页参数 */
  defaults: {
    page: 1,
    pageSize: 10,
  },

  /**
   * 创建分页查询字符串
   */
  stringify(
    page: number,
    pageSize: number,
    extra?: Record<string, unknown>
  ): string {
    return stringifyQuery({
      page,
      pageSize,
      ...extra,
    })
  },

  /**
   * 解析分页参数
   */
  parse(query: string): { page: number; pageSize: number } {
    const parsed = parseQuery<{ page?: string; pageSize?: string }>(query)
    return {
      page: parseInt(parsed.page || '1', 10),
      pageSize: parseInt(parsed.pageSize || '10', 10),
    }
  },
}
