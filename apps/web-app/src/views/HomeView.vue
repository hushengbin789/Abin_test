<script setup lang="ts">
/**
 * 首页视图
 */
import { ref } from 'vue';
import { formatDate, generateId } from '@mono/utils';
import { useLoading } from '@mono/hooks';
import { MButton } from '@mono/components';

const currentTime = ref(formatDate(new Date()));
const uniqueId = ref(generateId('home-'));
const { loading, wrapLoading } = useLoading();

// 刷新时间
const refreshTime = async () => {
  await wrapLoading(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    currentTime.value = formatDate(new Date());
    uniqueId.value = generateId('home-');
  });
};
</script>

<template>
  <div class="home-view">
    <div class="home-view__welcome">
      <h1 class="home-view__title">欢迎使用 Vue3 Monorepo 项目</h1>
      <p class="home-view__desc">
        这是一个基于 Vue 3 + TypeScript + Vite 的 Monorepo 项目模板，
        包含了组件库、工具函数库、Hooks 库等多个共享包。
      </p>
    </div>

    <div class="home-view__cards">
      <div class="home-view__card">
        <h3 class="card-title">📦 @mono/utils</h3>
        <p class="card-desc">共享工具函数库，包含常用的工具函数。</p>
        <div class="card-demo">
          <p>当前时间：{{ currentTime }}</p>
          <p>唯一ID：{{ uniqueId }}</p>
          <MButton type="primary" :loading="loading" @click="refreshTime">
            刷新
          </MButton>
        </div>
      </div>

      <div class="home-view__card">
        <h3 class="card-title">🧩 @mono/components</h3>
        <p class="card-desc">Vue 3 组件库，包含常用的 UI 组件。</p>
        <div class="card-demo">
          <MButton>默认按钮</MButton>
          <MButton type="primary">主要按钮</MButton>
          <MButton type="success">成功按钮</MButton>
        </div>
      </div>

      <div class="home-view__card">
        <h3 class="card-title">🪝 @mono/hooks</h3>
        <p class="card-desc">Vue 3 组合式函数库，提供常用的 Hooks。</p>
        <div class="card-demo">
          <p>加载状态：{{ loading ? '加载中...' : '空闲' }}</p>
        </div>
      </div>

      <div class="home-view__card">
        <h3 class="card-title">⚡ Vite</h3>
        <p class="card-desc">下一代前端构建工具，快速的冷启动和热更新。</p>
      </div>

      <div class="home-view__card">
        <h3 class="card-title">🔷 TypeScript</h3>
        <p class="card-desc">JavaScript 的超集，提供类型安全。</p>
      </div>

      <div class="home-view__card">
        <h3 class="card-title">📁 Monorepo</h3>
        <p class="card-desc">使用 pnpm workspaces 管理多包仓库。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
}

.home-view__welcome {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: #fff;
  margin-bottom: 32px;
}

.home-view__title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
}

.home-view__desc {
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.home-view__cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.home-view__card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.home-view__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.card-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 16px;
}

.card-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid #eee;
}

.card-demo p {
  width: 100%;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}
</style>
