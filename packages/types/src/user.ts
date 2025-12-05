/**
 * 用户相关类型定义
 */

/** 用户角色枚举 */
export enum UserRole {
  /** 管理员 */
  ADMIN = 'admin',
  /** 普通用户 */
  USER = 'user',
  /** 访客 */
  GUEST = 'guest',
}

/** 用户状态枚举 */
export enum UserStatus {
  /** 激活 */
  ACTIVE = 'active',
  /** 禁用 */
  INACTIVE = 'inactive',
  /** 待验证 */
  PENDING = 'pending',
}

/** 用户基础信息 */
export interface UserInfo {
  /** 用户 ID */
  id: string
  /** 用户名 */
  username: string
  /** 邮箱 */
  email: string
  /** 头像 URL */
  avatar?: string
  /** 用户角色 */
  role: UserRole
  /** 用户状态 */
  status: UserStatus
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

/** 用户登录请求参数 */
export interface LoginParams {
  /** 用户名或邮箱 */
  account: string
  /** 密码 */
  password: string
  /** 记住登录 */
  remember?: boolean
}

/** 用户登录响应 */
export interface LoginResult {
  /** 访问令牌 */
  accessToken: string
  /** 刷新令牌 */
  refreshToken: string
  /** 过期时间（秒） */
  expiresIn: number
  /** 用户信息 */
  userInfo: UserInfo
}

/** 用户注册请求参数 */
export interface RegisterParams {
  /** 用户名 */
  username: string
  /** 邮箱 */
  email: string
  /** 密码 */
  password: string
  /** 确认密码 */
  confirmPassword: string
}
