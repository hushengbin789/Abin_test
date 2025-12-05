<script setup lang="ts">
/**
 * 404 页面
 */
import { useRouter } from 'vue-router';
import { MButton } from '@mono/components';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="not-found-view">
    <div class="not-found-content">
      <h1 class="not-found-code">404</h1>
      <p class="not-found-text">抱歉，您访问的页面不存在</p>
      <MButton type="primary" @click="goHome">返回首页</MButton>
    </div>
  </div>
</template>

<style scoped>
.not-found-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.not-found-content {
  text-align: center;
}

.not-found-code {
  font-size: 120px;
  font-weight: 700;
  color: #ddd;
  line-height: 1;
  margin-bottom: 16px;
}

.not-found-text {
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
}
</style>
