<script setup lang="ts">
/**
 * 默认布局组件
 */
import { ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

// 导航菜单
const navItems = ref([
  { path: '/home', name: '首页', icon: '🏠' },
  { path: '/components', name: '组件', icon: '🧩' },
  { path: '/about', name: '关于', icon: '📖' },
])
</script>

<template>
  <div class="layout">
    <!-- 头部 -->
    <header class="header">
      <div class="header__logo">
        <span class="header__logo-icon">⚡</span>
        <span class="header__logo-text">Vue3 Monorepo</span>
      </div>
      <nav class="header__nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="header__nav-item"
          :class="{ 'header__nav-item--active': route.path === item.path }"
        >
          <span class="header__nav-icon">{{ item.icon }}</span>
          {{ item.name }}
        </RouterLink>
      </nav>
    </header>

    <!-- 主体内容 -->
    <main class="main">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <!-- 底部 -->
    <footer class="footer">
      <p>© 2024 Vue3 + TypeScript + Vite Monorepo 项目</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;

  &__logo {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #fff;
    font-size: 20px;
    font-weight: 600;

    &-icon {
      font-size: 24px;
    }
  }

  &__nav {
    display: flex;
    gap: 8px;

    &-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      color: rgba(255, 255, 255, 0.85);
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.15);
        color: #fff;
      }

      &--active {
        background: rgba(255, 255, 255, 0.25);
        color: #fff;
      }
    }

    &-icon {
      font-size: 16px;
    }
  }
}

.main {
  flex: 1;
  padding: 24px;
  background: #f5f7fa;
}

.footer {
  padding: 16px 24px;
  background: #303133;
  color: rgba(255, 255, 255, 0.65);
  text-align: center;
  font-size: 14px;
}

// 页面切换动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
