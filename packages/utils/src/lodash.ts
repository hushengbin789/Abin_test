/**
 * Lodash 工具函数
 * 基于 lodash-es 提供常用的工具函数封装
 */
import * as _ from 'lodash-es'

// ============ 数组工具 ============

/**
 * 将数组分割成指定大小的块
 * @example chunkArray([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  return _.chunk(array, size)
}

/**
 * 移除数组中的假值（false, null, 0, '', undefined, NaN）
 * @example compactArray([0, 1, false, 2, '', 3]) // [1, 2, 3]
 */
export function compactArray<T>(
  array: (T | null | undefined | false | '' | 0)[]
): T[] {
  return _.compact(array) as T[]
}

/**
 * 获取两个数组的差集
 * @example diffArray([1, 2, 3], [2, 3, 4]) // [1]
 */
export function diffArray<T>(array: T[], values: T[]): T[] {
  return _.difference(array, values)
}

/**
 * 根据迭代器获取两个数组的差集
 * @example diffArrayBy([{ x: 1 }, { x: 2 }], [{ x: 1 }], 'x') // [{ x: 2 }]
 */
export function diffArrayBy<T>(
  array: T[],
  values: T[],
  iteratee: keyof T | ((value: T) => unknown)
): T[] {
  return _.differenceBy(array, values, iteratee as string)
}

/**
 * 扁平化数组（一层）
 * @example flattenArray([[1, 2], [3, 4]]) // [1, 2, 3, 4]
 */
export function flattenArray<T>(array: (T | T[])[]): T[] {
  return _.flatten(array) as T[]
}

/**
 * 深度扁平化数组
 * @example flattenArrayDeep([[1, [2, [3]]]]) // [1, 2, 3]
 */
export function flattenArrayDeep<T>(array: unknown[]): T[] {
  return _.flattenDeep(array) as T[]
}

/**
 * 获取两个数组的交集
 * @example intersectArray([1, 2, 3], [2, 3, 4]) // [2, 3]
 */
export function intersectArray<T>(array: T[], values: T[]): T[] {
  return _.intersection(array, values)
}

/**
 * 数组去重
 * @example uniqueArray([1, 2, 2, 3, 3]) // [1, 2, 3]
 */
export function uniqueArray<T>(array: T[]): T[] {
  return _.uniq(array)
}

/**
 * 根据迭代器数组去重
 * @example uniqueArrayBy([{ id: 1 }, { id: 1 }, { id: 2 }], 'id') // [{ id: 1 }, { id: 2 }]
 */
export function uniqueArrayBy<T>(
  array: T[],
  iteratee: keyof T | ((value: T) => unknown)
): T[] {
  return _.uniqBy(array, iteratee as string)
}

/**
 * 数组分组
 * @example groupArrayBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type')
 * // { a: [{ type: 'a' }, { type: 'a' }], b: [{ type: 'b' }] }
 */
export function groupArrayBy<T>(
  array: T[],
  iteratee: keyof T | ((value: T) => unknown)
): Record<string, T[]> {
  return _.groupBy(array, iteratee as string)
}

/**
 * 将数组转换为以指定键为索引的对象
 * @example keyArrayBy([{ id: 1, name: 'a' }, { id: 2, name: 'b' }], 'id')
 * // { 1: { id: 1, name: 'a' }, 2: { id: 2, name: 'b' } }
 */
export function keyArrayBy<T>(
  array: T[],
  iteratee: keyof T | ((value: T) => unknown)
): Record<string, T> {
  return _.keyBy(array, iteratee as string)
}

/**
 * 数组排序
 * @example sortArrayBy([{ age: 30 }, { age: 20 }], 'age') // [{ age: 20 }, { age: 30 }]
 */
export function sortArrayBy<T>(
  array: T[],
  iteratee: keyof T | ((value: T) => unknown)
): T[] {
  return _.sortBy(array, iteratee as string)
}

/**
 * 数组多字段排序
 * @example orderArrayBy([{ a: 1, b: 2 }], ['a', 'b'], ['asc', 'desc'])
 */
export function orderArrayBy<T>(
  array: T[],
  iteratees: (keyof T)[],
  orders: ('asc' | 'desc')[]
): T[] {
  return _.orderBy(array, iteratees as string[], orders)
}

/**
 * 根据条件将数组分成两部分
 * @example partitionArray([1, 2, 3, 4], n => n > 2) // [[3, 4], [1, 2]]
 */
export function partitionArray<T>(
  array: T[],
  predicate: (value: T) => boolean
): [T[], T[]] {
  return _.partition(array, predicate)
}

// ============ 对象工具 ============

/**
 * 从对象中选取指定属性
 * @example pickProps({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
 */
export function pickProps<T extends object, K extends keyof T>(
  object: T,
  keys: K[]
): Pick<T, K> {
  return _.pick(object, keys) as Pick<T, K>
}

/**
 * 从对象中排除指定属性
 * @example omitProps({ a: 1, b: 2, c: 3 }, ['b']) // { a: 1, c: 3 }
 */
export function omitProps<T extends object, K extends keyof T>(
  object: T,
  keys: K[]
): Omit<T, K> {
  return _.omit(object, keys) as Omit<T, K>
}

/**
 * 安全获取对象深层属性
 * @example getProperty({ a: { b: { c: 1 } } }, 'a.b.c') // 1
 * @example getProperty({ a: 1 }, 'b.c', 'default') // 'default'
 */
export function getProperty<T = unknown>(
  object: unknown,
  path: string,
  defaultValue?: T
): T {
  return _.get(object, path, defaultValue) as T
}

/**
 * 安全设置对象深层属性
 * @example setProperty({}, 'a.b.c', 1) // { a: { b: { c: 1 } } }
 */
export function setProperty<T extends object>(
  object: T,
  path: string,
  value: unknown
): T {
  return _.set(object, path, value)
}

/**
 * 检查对象是否有指定路径的属性
 * @example hasProperty({ a: { b: 1 } }, 'a.b') // true
 */
export function hasProperty(object: unknown, path: string): boolean {
  return _.has(object, path)
}

/**
 * 深度合并对象
 * @example mergeObjects({ a: 1 }, { b: 2 }, { c: 3 }) // { a: 1, b: 2, c: 3 }
 */
export function mergeObjects<T extends object>(...objects: Partial<T>[]): T {
  return _.merge({}, ...objects) as T
}

/**
 * 深拷贝对象
 * @example deepCloneObject({ a: { b: 1 } }) // 完全独立的副本
 */
export function deepCloneObject<T>(value: T): T {
  return _.cloneDeep(value)
}

/**
 * 检查值是否为空（null, undefined, 空字符串, 空数组, 空对象）
 * @example isEmptyValue({}) // true
 * @example isEmptyValue([]) // true
 * @example isEmptyValue('') // true
 */
export function isEmptyValue(value: unknown): boolean {
  return _.isEmpty(value)
}

/**
 * 深度比较两个值是否相等
 * @example isDeepEqual({ a: 1 }, { a: 1 }) // true
 */
export function isDeepEqual(value: unknown, other: unknown): boolean {
  return _.isEqual(value, other)
}

/**
 * 检查值是否为 null 或 undefined
 * @example isNullOrUndefined(null) // true
 * @example isNullOrUndefined(0) // false
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return _.isNil(value)
}

// ============ 函数工具 ============

/** 防抖/节流函数返回类型 */
interface DebouncedFunction<T extends (...args: unknown[]) => unknown> {
  (...args: Parameters<T>): ReturnType<T> | undefined
  cancel: () => void
  flush: () => ReturnType<T> | undefined
}

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间（毫秒）
 * @param options 配置选项
 *
 * @example
 * const debouncedSearch = debounceFn(search, 300)
 * input.addEventListener('input', debouncedSearch)
 */
export function debounceFn<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait = 300,
  options?: { leading?: boolean; trailing?: boolean; maxWait?: number }
): DebouncedFunction<T> {
  return _.debounce(func, wait, options) as unknown as DebouncedFunction<T>
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param wait 等待时间（毫秒）
 * @param options 配置选项
 *
 * @example
 * const throttledScroll = throttleFn(handleScroll, 100)
 * window.addEventListener('scroll', throttledScroll)
 */
export function throttleFn<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait = 300,
  options?: { leading?: boolean; trailing?: boolean }
): DebouncedFunction<T> {
  return _.throttle(func, wait, options) as unknown as DebouncedFunction<T>
}

/**
 * 只执行一次的函数
 * @example
 * const initialize = onceFn(() => console.log('初始化'))
 * initialize() // 输出: 初始化
 * initialize() // 不再执行
 */
export function onceFn<T extends (...args: unknown[]) => unknown>(func: T): T {
  return _.once(func) as T
}

/**
 * 缓存函数结果
 * @example
 * const cachedFetch = memoizeFn(expensiveCalculation)
 * cachedFetch(1) // 计算
 * cachedFetch(1) // 返回缓存
 */
export function memoizeFn<T extends (...args: unknown[]) => unknown>(
  func: T
): T {
  return _.memoize(func) as T
}

// ============ 字符串工具 ============

/**
 * 转换为驼峰命名
 * @example toCamelCaseStr('hello-world') // 'helloWorld'
 */
export function toCamelCaseStr(str: string): string {
  return _.camelCase(str)
}

/**
 * 转换为短横线命名
 * @example toKebabCaseStr('helloWorld') // 'hello-world'
 */
export function toKebabCaseStr(str: string): string {
  return _.kebabCase(str)
}

/**
 * 转换为下划线命名
 * @example toSnakeCaseStr('helloWorld') // 'hello_world'
 */
export function toSnakeCaseStr(str: string): string {
  return _.snakeCase(str)
}

/**
 * 首字母大写
 * @example capitalizeStr('hello') // 'Hello'
 */
export function capitalizeStr(str: string): string {
  return _.capitalize(str)
}

/**
 * 首字母大写（保留其他字符）
 */
export function upperFirstStr(str: string): string {
  return _.upperFirst(str)
}

/**
 * 首字母小写
 */
export function lowerFirstStr(str: string): string {
  return _.lowerFirst(str)
}

/**
 * 截断字符串
 * @example truncateStr('hello world', { length: 8 }) // 'hello...'
 */
export function truncateStr(
  str: string,
  options?: { length?: number; omission?: string; separator?: string | RegExp }
): string {
  return _.truncate(str, options)
}

/**
 * 转义 HTML 特殊字符
 * @example escapeHtml('<div>') // '&lt;div&gt;'
 */
export function escapeHtml(str: string): string {
  return _.escape(str)
}

/**
 * 反转义 HTML 特殊字符
 * @example unescapeHtml('&lt;div&gt;') // '<div>'
 */
export function unescapeHtml(str: string): string {
  return _.unescape(str)
}

// ============ 数字工具 ============

/**
 * 生成随机数
 * @example randomNumber(1, 10) // 1-10 之间的随机整数
 * @example randomNumber(1.5, 5.5, true) // 1.5-5.5 之间的随机浮点数
 */
export function randomNumber(
  lower: number,
  upper: number,
  floating = false
): number {
  return _.random(lower, upper, floating)
}

/**
 * 将数字限制在指定范围内
 * @example clampNumber(10, 0, 5) // 5
 * @example clampNumber(-5, 0, 10) // 0
 */
export function clampNumber(
  value: number,
  lower: number,
  upper: number
): number {
  return _.clamp(value, lower, upper)
}

/**
 * 检查数字是否在范围内
 * @example isInRange(3, 2, 4) // true
 */
export function isInRange(value: number, start: number, end?: number): boolean {
  return _.inRange(value, start, end as number)
}

/**
 * 四舍五入到指定精度
 * @example roundNumber(4.567, 2) // 4.57
 */
export function roundNumber(value: number, precision = 0): number {
  return _.round(value, precision)
}

/**
 * 向下取整到指定精度
 * @example floorNumber(4.567, 2) // 4.56
 */
export function floorNumber(value: number, precision = 0): number {
  return _.floor(value, precision)
}

/**
 * 向上取整到指定精度
 * @example ceilNumber(4.561, 2) // 4.57
 */
export function ceilNumber(value: number, precision = 0): number {
  return _.ceil(value, precision)
}

// ============ 其他工具 ============

/**
 * 生成唯一 ID
 * @example generateUniqueId('user_') // 'user_1', 'user_2', ...
 */
export function generateUniqueId(prefix = ''): string {
  return _.uniqueId(prefix)
}

/**
 * 树形数据处理工具
 */
export const treeUtils = {
  /**
   * 扁平化树形数据
   */
  flatten<T extends { children?: T[] }>(
    tree: T[],
    childrenKey = 'children'
  ): Omit<T, 'children'>[] {
    const result: Omit<T, 'children'>[] = []

    const walk = (nodes: T[]) => {
      nodes.forEach((node) => {
        const { [childrenKey as keyof T]: children, ...rest } = node
        result.push(rest as Omit<T, 'children'>)
        if (Array.isArray(children) && children.length > 0) {
          walk(children as T[])
        }
      })
    }

    walk(tree)
    return result
  },

  /**
   * 过滤树形数据
   */
  filter<T extends { children?: T[] }>(
    tree: T[],
    predicate: (node: T) => boolean,
    childrenKey = 'children'
  ): T[] {
    return tree.filter(predicate).map((node) => {
      const children = node[childrenKey as keyof T] as T[] | undefined
      if (children && children.length > 0) {
        return {
          ...node,
          [childrenKey]: this.filter(children, predicate, childrenKey),
        }
      }
      return node
    })
  },

  /**
   * 在树中查找节点
   */
  find<T extends { children?: T[] }>(
    tree: T[],
    predicate: (node: T) => boolean,
    childrenKey = 'children'
  ): T | undefined {
    for (const node of tree) {
      if (predicate(node)) return node
      const children = node[childrenKey as keyof T] as T[] | undefined
      if (children && children.length > 0) {
        const found = this.find(children, predicate, childrenKey)
        if (found) return found
      }
    }
    return undefined
  },

  /**
   * 获取节点路径
   */
  getPath<T extends { children?: T[] }>(
    tree: T[],
    predicate: (node: T) => boolean,
    childrenKey = 'children'
  ): T[] {
    const path: T[] = []

    const walk = (nodes: T[]): boolean => {
      for (const node of nodes) {
        path.push(node)
        if (predicate(node)) return true
        const children = node[childrenKey as keyof T] as T[] | undefined
        if (children && children.length > 0 && walk(children)) {
          return true
        }
        path.pop()
      }
      return false
    }

    walk(tree)
    return path
  },
}
