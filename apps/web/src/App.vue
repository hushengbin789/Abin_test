<script setup lang="ts">
/**
 * 根组件
 */
import { RouterView } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<style>
/* 全局样式可以在这里添加 */
</style>
