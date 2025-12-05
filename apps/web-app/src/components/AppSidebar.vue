<script setup lang="ts">
/**
 * 应用侧边栏组件
 */
import { computed } from 'vue';
import { useRoute } from 'vue-router';

interface MenuItem {
  path: string;
  title: string;
  icon: string;
}

interface Props {
  collapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
});

const emit = defineEmits<{
  (e: 'navigate', path: string): void;
}>();

const route = useRoute();

// 菜单项
const menuItems: MenuItem[] = [
  { path: '/', title: '首页', icon: '🏠' },
  { path: '/components', title: '组件示例', icon: '🧩' },
  { path: '/hooks', title: 'Hooks 示例', icon: '🪝' },
  { path: '/about', title: '关于', icon: 'ℹ️' },
];

const sidebarWidth = computed(() => (props.collapsed ? '64px' : '220px'));

const isActive = (path: string) => route.path === path;

const handleClick = (path: string) => {
  emit('navigate', path);
};
</script>

<template>
  <aside class="app-sidebar" :style="{ width: sidebarWidth }">
    <nav class="app-sidebar__nav">
      <ul class="app-sidebar__menu">
        <li
          v-for="item in menuItems"
          :key="item.path"
          class="app-sidebar__item"
          :class="{ 'is-active': isActive(item.path) }"
          @click="handleClick(item.path)"
        >
          <span class="app-sidebar__icon">{{ item.icon }}</span>
          <span v-if="!collapsed" class="app-sidebar__title">{{ item.title }}</span>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.app-sidebar {
  background-color: #fff;
  border-right: 1px solid #e8e8e8;
  transition: width 0.3s ease;
  overflow: hidden;
}

.app-sidebar__nav {
  padding: 16px 0;
}

.app-sidebar__menu {
  list-style: none;
}

.app-sidebar__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s;
  color: #666;
}

.app-sidebar__item:hover {
  background-color: #f5f7fa;
  color: #409eff;
}

.app-sidebar__item.is-active {
  background-color: #ecf5ff;
  color: #409eff;
  border-right: 3px solid #409eff;
}

.app-sidebar__icon {
  font-size: 18px;
}

.app-sidebar__title {
  font-size: 14px;
  white-space: nowrap;
}
</style>
