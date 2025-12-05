<script setup lang="ts">
/**
 * 404 页面
 */
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="not-found">
    <div class="not-found__content">
      <h1 class="not-found__code">404</h1>
      <p class="not-found__message">抱歉，您访问的页面不存在</p>
      <MButton type="primary" size="large" @click="goHome"> 返回首页 </MButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px);
  text-align: center;

  &__content {
    padding: 40px;
  }

  &__code {
    font-size: 120px;
    font-weight: 700;
    color: #d1d5db;
    line-height: 1;
    margin-bottom: 16px;
  }

  &__message {
    font-size: 18px;
    color: #6b7280;
    margin-bottom: 32px;
  }
}
</style>
