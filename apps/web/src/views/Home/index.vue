<script setup lang="ts">
/**
 * 首页
 */
import { BaseButton, BaseCard } from '@packages/components'

// 功能特性
const features = [
  {
    icon: '📦',
    title: 'Monorepo 架构',
    description: '使用 pnpm workspaces 实现代码共享和依赖管理',
  },
  {
    icon: '⚡',
    title: 'Vite 构建',
    description: '极速的开发服务器和构建工具，提升开发体验',
  },
  {
    icon: '🔷',
    title: 'TypeScript',
    description: '全面的类型支持，提供更好的代码提示和错误检查',
  },
  {
    icon: '🎨',
    title: 'Vue 3',
    description: '使用 Composition API 和 script setup 语法',
  },
  {
    icon: '🧩',
    title: '组件库',
    description: '内置可复用的 UI 组件库，支持主题定制',
  },
  {
    icon: '🛠️',
    title: '工具库',
    description: '常用的工具函数集合，提升开发效率',
  },
]

// 技术栈
const techStack = [
  'Vue 3.4',
  'TypeScript 5.3',
  'Vite 5',
  'Pinia',
  'Vue Router',
  'Tailwind CSS',
  'ESLint',
  'Prettier',
]
</script>

<template>
  <div class="home-page">
    <!-- 英雄区 -->
    <section class="hero">
      <h1 class="hero__title">
        Vue 3 + TypeScript + Vite
        <span class="hero__highlight">Monorepo</span>
      </h1>
      <p class="hero__description">
        一个现代化的前端项目脚手架，采用 Monorepo 架构， 集成了 Vue
        3、TypeScript、Vite 等主流技术栈
      </p>
      <div class="hero__actions">
        <BaseButton type="primary" size="large" round> 🚀 开始使用 </BaseButton>
        <BaseButton type="text" size="large"> 📖 查看文档 </BaseButton>
      </div>
    </section>

    <!-- 技术栈 -->
    <section class="tech-stack">
      <div class="tech-stack__list">
        <span v-for="tech in techStack" :key="tech" class="tech-stack__item">
          {{ tech }}
        </span>
      </div>
    </section>

    <!-- 功能特性 -->
    <section class="features">
      <h2 class="features__title">功能特性</h2>
      <div class="features__grid">
        <BaseCard
          v-for="feature in features"
          :key="feature.title"
          hoverable
          class="feature-card"
        >
          <div class="feature-card__icon">{{ feature.icon }}</div>
          <h3 class="feature-card__title">{{ feature.title }}</h3>
          <p class="feature-card__description">{{ feature.description }}</p>
        </BaseCard>
      </div>
    </section>

    <!-- 项目结构 -->
    <section class="structure">
      <h2 class="structure__title">项目结构</h2>
      <BaseCard>
        <pre class="structure__code"><code>vue3-monorepo/
├── apps/
│   └── web/                # 主应用
├── packages/
│   ├── components/         # 共享组件库
│   ├── utils/              # 工具函数库
│   └── types/              # 类型定义
├── pnpm-workspace.yaml     # 工作空间配置
├── package.json
└── tsconfig.json</code></pre>
      </BaseCard>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 64px;
}

/* 英雄区 */
.hero {
  text-align: center;
  padding: 48px 0;
}

.hero__title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
}

.hero__highlight {
  display: block;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__description {
  margin-top: 24px;
  font-size: 18px;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero__actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
}

/* 技术栈 */
.tech-stack {
  display: flex;
  justify-content: center;
}

.tech-stack__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.tech-stack__item {
  padding: 6px 16px;
  background: #f3f4f6;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

/* 功能特性 */
.features {
  text-align: center;
}

.features__title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 32px;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.feature-card {
  text-align: left;
}

.feature-card__icon {
  font-size: 32px;
  margin-bottom: 16px;
}

.feature-card__title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.feature-card__description {
  color: var(--color-text-secondary);
  font-size: 14px;
}

/* 项目结构 */
.structure {
  text-align: center;
}

.structure__title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 32px;
}

.structure__code {
  text-align: left;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
  overflow-x: auto;
}
</style>
