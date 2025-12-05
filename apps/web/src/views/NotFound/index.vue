<script setup lang="ts">
/**
 * 404 页面
 */
import { useRouter } from 'vue-router'
import { BaseButton } from '@packages/components'

const router = useRouter()

function goHome() {
  router.push('/')
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="not-found">
    <div class="not-found__content">
      <div class="not-found__code">404</div>
      <h1 class="not-found__title">页面不存在</h1>
      <p class="not-found__description">抱歉，您访问的页面不存在或已被移除。</p>
      <div class="not-found__actions">
        <BaseButton type="primary" @click="goHome"> 返回首页 </BaseButton>
        <BaseButton type="text" @click="goBack"> 返回上一页 </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.not-found__content {
  text-align: center;
}

.not-found__code {
  font-size: 120px;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.not-found__title {
  font-size: 32px;
  font-weight: 600;
  margin-top: 16px;
}

.not-found__description {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-top: 8px;
}

.not-found__actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
}
</style>
