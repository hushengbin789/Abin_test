/**
 * 路由配置
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 路由元信息类型扩展
declare module 'vue-router' {
  interface RouteMeta {
    /** 页面标题 */
    title?: string
    /** 是否需要登录 */
    requiresAuth?: boolean
    /** 是否在已登录时隐藏（如登录页） */
    hideWhenAuth?: boolean
    /** 需要的角色 */
    roles?: string[]
  }
}

// 路由配置
const routes: RouteRecordRaw[] = [
  // ===== 公开页面 =====
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About/index.vue'),
    meta: {
      title: '关于',
    },
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('@/views/Demo/index.vue'),
    meta: {
      title: '组件演示',
    },
  },
  {
    path: '/library',
    name: 'LibraryDemo',
    component: () => import('@/views/LibraryDemo/index.vue'),
    meta: {
      title: '工具库演示',
    },
  },

  // ===== 认证页面 =====
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      title: '登录',
      hideWhenAuth: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register/index.vue'),
    meta: {
      title: '注册',
      hideWhenAuth: true,
    },
  },

  // ===== 需要登录的页面 =====
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile/index.vue'),
    meta: {
      title: '个人中心',
      requiresAuth: true,
    },
  },

  // ===== 404 页面 =====
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound/index.vue'),
    meta: {
      title: '页面不存在',
    },
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

// 路由守卫
router.beforeEach((to, _from, next) => {
  // 设置页面标题
  const title = to.meta.title as string
  if (title) {
    document.title = `${title} - Vue 3 Monorepo`
  }

  // 获取用户状态（延迟导入避免循环依赖）
  const userStore = useUserStore()
  const isLoggedIn = userStore.isLoggedIn

  // 需要登录但未登录
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
    return
  }

  // 已登录访问登录/注册页，重定向到首页
  if (to.meta.hideWhenAuth && isLoggedIn) {
    next({ path: '/' })
    return
  }

  // 检查角色权限
  if (to.meta.roles && to.meta.roles.length > 0) {
    const userRole = userStore.userRole
    if (!to.meta.roles.includes(userRole)) {
      // 没有权限，跳转到 403 页面或首页
      next({ path: '/' })
      return
    }
  }

  next()
})

export default router
