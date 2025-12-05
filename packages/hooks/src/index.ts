/**
 * @monorepo/hooks
 * 共享 Vue Composition API Hooks 入口文件
 */

// 状态管理相关
export { useLoading } from './useLoading'
export { useBoolean } from './useBoolean'

// 副作用相关
export { useDebounce } from './useDebounce'
export { useThrottle } from './useThrottle'

// DOM 相关
export { useEventListener } from './useEventListener'
export { useClickOutside } from './useClickOutside'

// 异步相关
export { useAsync } from './useAsync'
export { usePagination } from './usePagination'

// 存储相关
export { useLocalStorage } from './useLocalStorage'
