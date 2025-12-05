<script setup lang="ts">
/**
 * 关于页面
 */
import { BaseCard } from '@packages/components'

// 包信息
const packages = [
  {
    name: '@packages/types',
    description: '共享类型定义，包含用户、API、通用业务类型',
    features: ['用户类型', 'API 响应类型', '通用工具类型'],
  },
  {
    name: '@packages/utils',
    description: '工具函数库，集成 dayjs、js-cookie、lodash、qs 等常用库',
    features: [
      'dayjs 日期处理',
      'js-cookie Cookie 操作',
      'lodash 工具函数',
      'qs 查询字符串',
      '存储/验证/格式化',
    ],
  },
  {
    name: '@packages/components',
    description: 'Vue 3 组件库，提供常用的 UI 组件',
    features: [
      'BaseButton',
      'BaseInput',
      'BaseModal',
      'BaseLoading',
      'BaseCard',
    ],
  },
]
</script>

<template>
  <div class="about-page">
    <h1 class="page-title">关于项目</h1>
    <p class="page-description">
      这是一个基于 Monorepo 架构的 Vue 3
      全生态项目，旨在提供一个现代化、可扩展的前端开发模板。
    </p>

    <section class="packages">
      <h2 class="section-title">包结构</h2>
      <div class="packages__grid">
        <BaseCard v-for="pkg in packages" :key="pkg.name" :title="pkg.name">
          <p class="package__description">{{ pkg.description }}</p>
          <ul class="package__features">
            <li
              v-for="feature in pkg.features"
              :key="feature"
              class="package__feature"
            >
              {{ feature }}
            </li>
          </ul>
        </BaseCard>
      </div>
    </section>

    <section class="usage">
      <h2 class="section-title">使用方式</h2>
      <BaseCard>
        <div class="code-block">
          <h3 class="code-block__title">安装依赖</h3>
          <pre class="code-block__code">pnpm install</pre>
        </div>
        <div class="code-block">
          <h3 class="code-block__title">启动开发服务器</h3>
          <pre class="code-block__code">pnpm dev</pre>
        </div>
        <div class="code-block">
          <h3 class="code-block__title">构建生产版本</h3>
          <pre class="code-block__code">pnpm build</pre>
        </div>
      </BaseCard>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
}

.page-description {
  font-size: 18px;
  color: var(--color-text-secondary);
  max-width: 800px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
}

.packages__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.package__description {
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.package__features {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.package__feature {
  padding: 4px 12px;
  background: #eff6ff;
  color: var(--color-primary);
  border-radius: 4px;
  font-size: 13px;
}

.code-block {
  margin-bottom: 24px;
}

.code-block:last-child {
  margin-bottom: 0;
}

.code-block__title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
}

.code-block__code {
  background: #f3f4f6;
  padding: 12px 16px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
}
</style>
