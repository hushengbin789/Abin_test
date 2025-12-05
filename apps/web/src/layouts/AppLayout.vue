<script setup lang="ts">
/**
 * 应用布局组件
 */
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

// 导航菜单
const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/demo', label: '组件演示', icon: '🎨' },
  { path: '/about', label: '关于', icon: 'ℹ️' },
]

// 判断是否为当前路由
function isActive(path: string): boolean {
  return route.path === path
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
          <a href="https://github.com" target="_blank" class="app-header__link">
            GitHub
          </a>
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
  gap: 16px;
}

.app-header__link {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
}

.app-header__link:hover {
  background: #f3f4f6;
  color: var(--color-text);
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
</style>
