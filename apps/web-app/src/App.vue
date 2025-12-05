<script setup lang="ts">
/**
 * 应用根组件
 */
import { RouterView } from 'vue-router';
import AppLayout from './components/AppLayout.vue';
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<style>
#app {
  width: 100%;
  min-height: 100vh;
}
</style>
