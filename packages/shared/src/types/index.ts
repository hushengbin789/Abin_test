/**
 * 通用类型定义
 */

/**
 * API 响应基础结构
 */
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
  success: boolean
}

/**
 * 分页请求参数
 */
export interface PaginationParams {
  page: number
  pageSize: number
}

/**
 * 分页响应数据
 */
export interface PaginationResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * 用户信息
 */
export interface UserInfo {
  id: string | number
  username: string
  nickname?: string
  avatar?: string
  email?: string
  phone?: string
  roles?: string[]
  permissions?: string[]
}

/**
 * 菜单项
 */
export interface MenuItem {
  id: string | number
  name: string
  path: string
  icon?: string
  component?: string
  redirect?: string
  hidden?: boolean
  children?: MenuItem[]
  meta?: MenuMeta
}

/**
 * 菜单元数据
 */
export interface MenuMeta {
  title: string
  icon?: string
  hidden?: boolean
  keepAlive?: boolean
  affix?: boolean
  breadcrumb?: boolean
}

/**
 * 表单验证规则
 */
export interface FormRule {
  required?: boolean
  message?: string
  trigger?: 'blur' | 'change' | ('blur' | 'change')[]
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (rule: FormRule, value: unknown) => boolean | Promise<boolean>
}

/**
 * 表格列配置
 */
export interface TableColumn<T = unknown> {
  prop: keyof T | string
  label: string
  width?: number | string
  minWidth?: number | string
  fixed?: boolean | 'left' | 'right'
  sortable?: boolean | 'custom'
  align?: 'left' | 'center' | 'right'
  formatter?: (row: T, column: TableColumn<T>, cellValue: unknown, index: number) => unknown
  slot?: string
}

/**
 * 选项配置（下拉框、单选、多选等）
 */
export interface SelectOption<T = string | number> {
  label: string
  value: T
  disabled?: boolean
  children?: SelectOption<T>[]
}

/**
 * 通用键值对
 */
export type RecordType<T = unknown> = Record<string, T>

/**
 * 可空类型
 */
export type Nullable<T> = T | null

/**
 * 深度只读
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

/**
 * 深度可选
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
