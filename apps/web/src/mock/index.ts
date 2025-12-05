/**
 * Mock 数据入口
 * 开发环境下启用 Mock 服务
 */
import { setupUserMock } from './user'

/**
 * 初始化 Mock 服务
 */
export function setupMock(): void {
  // 仅在开发环境启用
  if (import.meta.env.DEV) {
    console.log('🔧 Mock 服务已启用')
    setupUserMock()
  }
}
