<script setup lang="ts">
/**
 * 应用布局组件
 */
import { ref, computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 用户菜单显示状态
const showUserMenu = ref(false)

// 导航菜单
const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/demo', label: '组件演示', icon: '🎨' },
  { path: '/library', label: '工具库演示', icon: '📦' },
  { path: '/about', label: '关于', icon: 'ℹ️' },
]

// 判断是否为当前路由
function isActive(path: string): boolean {
  return route.path === path
}

// 是否已登录
const isLoggedIn = computed(() => userStore.isLoggedIn)
const username = computed(() => userStore.username)
const avatar = computed(() => userStore.avatar)

// 跳转登录
function goToLogin() {
  router.push('/login')
}

// 跳转注册
function goToRegister() {
  router.push('/register')
}

// 跳转个人中心
function goToProfile() {
  showUserMenu.value = false
  router.push('/profile')
}

// 登出
async function handleLogout() {
  showUserMenu.value = false
  await userStore.logout()
  router.push('/')
}

// 切换用户菜单
function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value
}

// 点击外部关闭菜单
function handleClickOutside() {
  showUserMenu.value = false
}
</script>

<template>
  <div class="app-layout">
    <!-- 头部导航 -->
    <header class="app-header">
      <div class="app-header__container">
        <!-- Logo -->
        <RouterLink to="/" class="app-logo">
          <span class="app-logo__icon">⚡</span>
          <span class="app-logo__text">Vue3 Monorepo</span>
        </RouterLink>

        <!-- 导航菜单 -->
        <nav class="app-nav">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="app-nav__item"
            :class="{ 'app-nav__item--active': isActive(item.path) }"
          >
            <span class="app-nav__icon">{{ item.icon }}</span>
            <span class="app-nav__label">{{ item.label }}</span>
          </RouterLink>
        </nav>

        <!-- 右侧操作区 -->
        <div class="app-header__actions">
          <!-- 未登录状态 -->
          <template v-if="!isLoggedIn">
            <button class="auth-btn auth-btn--login" @click="goToLogin">
              登录
            </button>
            <button class="auth-btn auth-btn--register" @click="goToRegister">
              注册
            </button>
          </template>

          <!-- 已登录状态 -->
          <template v-else>
            <div class="user-dropdown" @click="toggleUserMenu">
              <img
                :src="
                  avatar ||
                  'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
                "
                :alt="username"
                class="user-avatar"
              />
              <span class="user-name">{{ username }}</span>
              <span
                class="dropdown-arrow"
                :class="{ 'dropdown-arrow--open': showUserMenu }"
              >
                ▼
              </span>

              <!-- 下拉菜单 -->
              <Transition name="dropdown">
                <div v-if="showUserMenu" class="user-menu">
                  <div class="user-menu__item" @click="goToProfile">
                    <span class="user-menu__icon">👤</span>
                    <span>个人中心</span>
                  </div>
                  <div class="user-menu__divider"></div>
                  <div
                    class="user-menu__item user-menu__item--danger"
                    @click="handleLogout"
                  >
                    <span class="user-menu__icon">🚪</span>
                    <span>退出登录</span>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- 点击外部关闭遮罩 -->
            <div
              v-if="showUserMenu"
              class="user-menu-overlay"
              @click="handleClickOutside"
            ></div>
          </template>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="app-main">
      <slot />
    </main>

    <!-- 底部 -->
    <footer class="app-footer">
      <p>© 2024 Vue3 Monorepo. Built with Vue 3 + TypeScript + Vite.</p>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
}

.app-header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
}

.app-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--color-text);
}

.app-logo__icon {
  font-size: 24px;
}

.app-logo__text {
  font-size: 18px;
}

.app-nav {
  display: flex;
  gap: 8px;
}

.app-nav__item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.app-nav__item:hover {
  background: #f3f4f6;
  color: var(--color-text);
}

.app-nav__item--active {
  background: #eff6ff;
  color: var(--color-primary);
}

.app-nav__icon {
  font-size: 16px;
}

.app-header__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.auth-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.auth-btn--login {
  background: transparent;
  color: var(--color-text-secondary);
}

.auth-btn--login:hover {
  background: #f3f4f6;
  color: var(--color-text);
}

.auth-btn--register {
  background: var(--color-primary);
  color: white;
}

.auth-btn--register:hover {
  background: var(--color-primary-hover);
}

.user-dropdown {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-dropdown:hover {
  background: #f3f4f6;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

.dropdown-arrow {
  font-size: 10px;
  color: #9ca3af;
  transition: transform 0.2s;
}

.dropdown-arrow--open {
  transform: rotate(180deg);
}

.user-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 160px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 200;
}

.user-menu__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  font-size: 14px;
  color: var(--color-text);
  transition: background-color 0.2s;
}

.user-menu__item:hover {
  background: #f9fafb;
}

.user-menu__item--danger {
  color: #ef4444;
}

.user-menu__item--danger:hover {
  background: #fef2f2;
}

.user-menu__icon {
  font-size: 16px;
}

.user-menu__divider {
  height: 1px;
  background: #e5e7eb;
  margin: 4px 0;
}

.user-menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 150;
}

/* 下拉动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.app-main {
  flex: 1;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px;
}

.app-footer {
  border-top: 1px solid var(--color-border);
  padding: 24px;
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 14px;
}

@media (max-width: 768px) {
  .app-nav {
    display: none;
  }

  .user-name {
    display: none;
  }
}
</style>
