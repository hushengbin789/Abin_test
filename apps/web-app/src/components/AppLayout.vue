<script setup lang="ts">
/**
 * 应用布局组件
 */
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';

const router = useRouter();
const sidebarCollapsed = ref(false);

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

const handleNavigate = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="app-layout">
    <AppHeader @toggle-sidebar="toggleSidebar" />
    <div class="app-layout__container">
      <AppSidebar :collapsed="sidebarCollapsed" @navigate="handleNavigate" />
      <main class="app-layout__main">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-layout__container {
  display: flex;
  flex: 1;
}

.app-layout__main {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background-color: #f5f7fa;
}
</style>
