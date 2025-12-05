/**
 * 通用业务类型定义
 */

/** 可空类型 */
export type Nullable<T> = T | null

/** 可选类型 */
export type Optional<T> = T | undefined

/** 将对象所有属性变为可选 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/** 将对象所有属性变为只读 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

/** 提取对象的键类型 */
export type Keys<T> = keyof T

/** 提取对象的值类型 */
export type Values<T> = T[keyof T]

/** 选项配置 */
export interface SelectOption<T = string | number> {
  /** 显示标签 */
  label: string
  /** 选项值 */
  value: T
  /** 是否禁用 */
  disabled?: boolean
  /** 子选项（用于级联选择） */
  children?: SelectOption<T>[]
}

/** 树形结构节点 */
export interface TreeNode<T = unknown> {
  /** 节点 ID */
  id: string | number
  /** 节点标签 */
  label: string
  /** 父节点 ID */
  parentId?: string | number | null
  /** 子节点 */
  children?: TreeNode<T>[]
  /** 节点数据 */
  data?: T
}

/** 键值对 */
export interface KeyValue<K = string, V = unknown> {
  key: K
  value: V
}

/** 时间范围 */
export interface TimeRange {
  /** 开始时间 */
  startTime: string | Date
  /** 结束时间 */
  endTime: string | Date
}

/** 坐标位置 */
export interface Position {
  x: number
  y: number
}

/** 尺寸 */
export interface Size {
  width: number
  height: number
}

/** 矩形区域 */
export interface Rect extends Position, Size {}

/** 操作结果 */
export interface OperationResult<T = unknown> {
  /** 是否成功 */
  success: boolean
  /** 结果消息 */
  message?: string
  /** 结果数据 */
  data?: T
}
