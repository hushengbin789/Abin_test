<script setup lang="ts">
/**
 * 应用头部组件
 */

const emit = defineEmits<{
  (e: 'toggle-sidebar'): void;
}>();

const handleToggle = () => {
  emit('toggle-sidebar');
};
</script>

<template>
  <header class="app-header">
    <div class="app-header__left">
      <button class="app-header__menu-btn" @click="handleToggle">
        ☰
      </button>
      <h1 class="app-header__title">Vue3 Monorepo 应用</h1>
    </div>
    <div class="app-header__right">
      <div class="app-header__user">
        <span class="app-header__avatar">👤</span>
        <span class="app-header__username">管理员</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 24px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  z-index: 100;
}

.app-header__left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.app-header__menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.app-header__menu-btn:hover {
  background-color: #f5f7fa;
}

.app-header__title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.app-header__right {
  display: flex;
  align-items: center;
}

.app-header__user {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.app-header__user:hover {
  background-color: #f5f7fa;
}

.app-header__avatar {
  font-size: 20px;
}

.app-header__username {
  font-size: 14px;
  color: #666;
}
</style>
