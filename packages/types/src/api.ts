/**
 * API 相关类型定义
 */

/** API 响应状态码 */
export enum ApiCode {
  /** 成功 */
  SUCCESS = 0,
  /** 未授权 */
  UNAUTHORIZED = 401,
  /** 禁止访问 */
  FORBIDDEN = 403,
  /** 资源不存在 */
  NOT_FOUND = 404,
  /** 服务器错误 */
  SERVER_ERROR = 500,
}

/** 通用 API 响应结构 */
export interface ApiResponse<T = unknown> {
  /** 状态码 */
  code: ApiCode
  /** 响应消息 */
  message: string
  /** 响应数据 */
  data: T
  /** 请求时间戳 */
  timestamp: number
}

/** 分页请求参数 */
export interface PaginationParams {
  /** 当前页码 */
  page: number
  /** 每页数量 */
  pageSize: number
  /** 排序字段 */
  sortBy?: string
  /** 排序方向 */
  sortOrder?: 'asc' | 'desc'
}

/** 分页响应数据 */
export interface PaginationResult<T> {
  /** 数据列表 */
  list: T[]
  /** 总数量 */
  total: number
  /** 当前页码 */
  page: number
  /** 每页数量 */
  pageSize: number
  /** 总页数 */
  totalPages: number
}

/** 带分页的 API 响应 */
export type ApiPaginatedResponse<T> = ApiResponse<PaginationResult<T>>
