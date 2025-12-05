/**
 * 用户相关 Mock 数据
 */
import Mock from 'mockjs'
import type { UserRole, UserStatus } from '@packages/types'

/** Mock 用户数据库 */
const mockUsers: Array<{
  id: string
  username: string
  email: string
  password: string
  avatar: string
  role: UserRole
  status: UserStatus
  createdAt: string
  updatedAt: string
}> = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: '123456',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    role: 'admin' as UserRole,
    status: 'active' as UserStatus,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    password: '123456',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    role: 'user' as UserRole,
    status: 'active' as UserStatus,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
]

/** 生成 Token */
function generateToken(userId: string): string {
  return `mock_token_${userId}_${Date.now()}_${Mock.Random.string('lower', 16)}`
}

/** 设置 Mock 延迟 */
Mock.setup({
  timeout: '300-800',
})

/**
 * 设置用户相关 Mock
 */
export function setupUserMock(): void {
  // 登录接口
  Mock.mock(/\/api\/auth\/login/, 'post', (options: { body: string }) => {
    const { account, password } = JSON.parse(options.body)

    // 查找用户
    const user = mockUsers.find(
      (u) =>
        (u.username === account || u.email === account) &&
        u.password === password
    )

    if (!user) {
      return {
        code: 401,
        message: '用户名或密码错误',
        data: null,
        timestamp: Date.now(),
      }
    }

    if (user.status !== 'active') {
      return {
        code: 403,
        message: '账号已被禁用',
        data: null,
        timestamp: Date.now(),
      }
    }

    // 返回登录成功
    const { password: _pwd, ...userInfo } = user
    return {
      code: 0,
      message: '登录成功',
      data: {
        accessToken: generateToken(user.id),
        refreshToken: generateToken(user.id + '_refresh'),
        expiresIn: 7200,
        userInfo,
      },
      timestamp: Date.now(),
    }
  })

  // 注册接口
  Mock.mock(/\/api\/auth\/register/, 'post', (options: { body: string }) => {
    const { username, email, password } = JSON.parse(options.body)

    // 检查用户名是否已存在
    if (mockUsers.some((u) => u.username === username)) {
      return {
        code: 400,
        message: '用户名已存在',
        data: null,
        timestamp: Date.now(),
      }
    }

    // 检查邮箱是否已存在
    if (mockUsers.some((u) => u.email === email)) {
      return {
        code: 400,
        message: '邮箱已被注册',
        data: null,
        timestamp: Date.now(),
      }
    }

    // 创建新用户
    const newUser = {
      id: Mock.Random.id(),
      username,
      email,
      password,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      role: 'user' as UserRole,
      status: 'active' as UserStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)

    // 返回注册成功
    const { password: _pwd2, ...userInfo } = newUser
    return {
      code: 0,
      message: '注册成功',
      data: {
        accessToken: generateToken(newUser.id),
        refreshToken: generateToken(newUser.id + '_refresh'),
        expiresIn: 7200,
        userInfo,
      },
      timestamp: Date.now(),
    }
  })

  // 获取用户信息
  Mock.mock(/\/api\/user\/info/, 'get', (options: { url: string }) => {
    // 从 URL 获取 token（简化处理）
    const token = options.url.includes('token=')
      ? options.url.split('token=')[1]
      : null

    if (!token) {
      return {
        code: 401,
        message: '未授权',
        data: null,
        timestamp: Date.now(),
      }
    }

    // 模拟解析 token 获取用户 ID
    const userIdMatch = token.match(/mock_token_(\d+)_/)
    if (!userIdMatch) {
      return {
        code: 401,
        message: 'Token 无效',
        data: null,
        timestamp: Date.now(),
      }
    }

    const user = mockUsers.find((u) => u.id === userIdMatch[1])
    if (!user) {
      return {
        code: 401,
        message: '用户不存在',
        data: null,
        timestamp: Date.now(),
      }
    }

    const { password: _pwd3, ...userInfo } = user
    return {
      code: 0,
      message: '获取成功',
      data: userInfo,
      timestamp: Date.now(),
    }
  })

  // 登出接口
  Mock.mock(/\/api\/auth\/logout/, 'post', () => {
    return {
      code: 0,
      message: '登出成功',
      data: null,
      timestamp: Date.now(),
    }
  })

  // 修改密码
  Mock.mock(/\/api\/user\/password/, 'put', (options: { body: string }) => {
    const { oldPassword, newPassword } = JSON.parse(options.body)

    // 简化处理，假设当前用户是 admin
    const user = mockUsers.find((u) => u.username === 'admin')
    if (!user) {
      return {
        code: 404,
        message: '用户不存在',
        data: null,
        timestamp: Date.now(),
      }
    }

    if (user.password !== oldPassword) {
      return {
        code: 400,
        message: '原密码错误',
        data: null,
        timestamp: Date.now(),
      }
    }

    user.password = newPassword
    user.updatedAt = new Date().toISOString()

    return {
      code: 0,
      message: '密码修改成功',
      data: null,
      timestamp: Date.now(),
    }
  })

  // 更新用户信息
  Mock.mock(/\/api\/user\/profile/, 'put', (options: { body: string }) => {
    const updates = JSON.parse(options.body)

    // 简化处理，假设当前用户是 admin
    const user = mockUsers.find((u) => u.username === 'admin')
    if (!user) {
      return {
        code: 404,
        message: '用户不存在',
        data: null,
        timestamp: Date.now(),
      }
    }

    // 更新允许修改的字段
    if (updates.avatar) user.avatar = updates.avatar
    user.updatedAt = new Date().toISOString()

    const { password: _pwd4, ...userInfo } = user
    return {
      code: 0,
      message: '更新成功',
      data: userInfo,
      timestamp: Date.now(),
    }
  })

  console.log('✅ 用户 Mock 接口已注册')
}
