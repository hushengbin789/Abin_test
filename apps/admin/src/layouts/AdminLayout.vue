<script setup lang="ts">
/**
 * 管理后台布局组件
 */
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useBoolean } from '@monorepo/hooks'

const route = useRoute()
const router = useRouter()

// 侧边栏折叠状态
const { state: collapsed, toggle: toggleCollapsed } = useBoolean(false)

// 导航菜单
const menuItems = ref([
  { path: '/dashboard', name: '仪表盘', icon: '📊' },
  { path: '/users', name: '用户管理', icon: '👥' },
  { path: '/settings', name: '系统设置', icon: '⚙️' },
])

// 用户信息
const userInfo = ref({
  name: '管理员',
  avatar: '👤',
})

// 侧边栏宽度
const sidebarWidth = computed(() => (collapsed.value ? '64px' : '220px'))

// 退出登录
const handleLogout = () => {
  router.push('/login')
}
</script>

<template>
  <div class="admin-layout">
    <!-- 侧边栏 -->
    <aside class="sidebar" :style="{ width: sidebarWidth }">
      <div class="sidebar__logo">
        <span class="sidebar__logo-icon">🛠</span>
        <span v-show="!collapsed" class="sidebar__logo-text">管理后台</span>
      </div>
      <nav class="sidebar__menu">
        <RouterLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="sidebar__menu-item"
          :class="{ 'sidebar__menu-item--active': route.path === item.path }"
        >
          <span class="sidebar__menu-icon">{{ item.icon }}</span>
          <span v-show="!collapsed" class="sidebar__menu-text">{{ item.name }}</span>
        </RouterLink>
      </nav>
    </aside>

    <!-- 主内容区 -->
    <div class="main-area" :style="{ marginLeft: sidebarWidth }">
      <!-- 头部 -->
      <header class="header">
        <div class="header__left">
          <button class="header__toggle" @click="toggleCollapsed">
            {{ collapsed ? '☰' : '✕' }}
          </button>
          <span class="header__breadcrumb">
            {{ route.meta?.title || '首页' }}
          </span>
        </div>
        <div class="header__right">
          <div class="header__user">
            <span class="header__avatar">{{ userInfo.avatar }}</span>
            <span class="header__username">{{ userInfo.name }}</span>
          </div>
          <button class="header__logout" @click="handleLogout">退出</button>
        </div>
      </header>

      <!-- 内容区 -->
      <main class="content">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-layout {
  min-height: 100vh;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: #1f2937;
  transition: width 0.3s ease;
  z-index: 100;
  overflow: hidden;

  &__logo {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 64px;
    padding: 0 16px;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;

    &-icon {
      font-size: 24px;
    }
  }

  &__menu {
    padding: 8px;

    &-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      margin-bottom: 4px;
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.2s ease;
      white-space: nowrap;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
      }

      &--active {
        background: #3b82f6;
        color: #fff;

        &:hover {
          background: #3b82f6;
        }
      }
    }

    &-icon {
      font-size: 18px;
    }

    &-text {
      font-size: 14px;
    }
  }
}

.main-area {
  min-height: 100vh;
  transition: margin-left 0.3s ease;
  background: #f3f4f6;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 24px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &__left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: #f3f4f6;
    }
  }

  &__breadcrumb {
    font-size: 16px;
    font-weight: 500;
    color: #374151;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__avatar {
    font-size: 24px;
  }

  &__username {
    font-size: 14px;
    color: #374151;
  }

  &__logout {
    padding: 6px 12px;
    font-size: 14px;
    color: #6b7280;
    background: transparent;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #f3f4f6;
      color: #374151;
    }
  }
}

.content {
  padding: 24px;
  min-height: calc(100vh - 64px);
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
