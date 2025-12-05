<script setup lang="ts">
/**
 * 关于页面
 */
import { ref } from 'vue'

// 项目架构
const architecture = ref([
  {
    name: 'apps/web',
    description: '主应用，包含完整的页面和业务逻辑',
    tech: ['Vue 3', 'Vue Router', 'Pinia', 'Sass'],
  },
  {
    name: 'apps/admin',
    description: '管理后台应用，可独立开发和部署',
    tech: ['Vue 3', 'Vue Router', 'Pinia', 'Sass'],
  },
  {
    name: 'packages/shared',
    description: '共享工具库，包含通用工具函数、类型定义、常量等',
    tech: ['TypeScript', 'Vite'],
  },
  {
    name: 'packages/components',
    description: '共享组件库，包含可复用的 UI 组件',
    tech: ['Vue 3', 'TypeScript', 'Vite'],
  },
  {
    name: 'packages/hooks',
    description: '共享 Hooks 库，包含常用的 Composition API Hooks',
    tech: ['Vue 3', 'TypeScript', 'Vite'],
  },
])

// 技术栈
const techStack = ref([
  { name: 'Vue 3', version: '^3.3.11', icon: '💚' },
  { name: 'TypeScript', version: '^5.3.2', icon: '📘' },
  { name: 'Vite', version: '^5.0.5', icon: '⚡' },
  { name: 'Pinia', version: '^2.1.7', icon: '🍍' },
  { name: 'Vue Router', version: '^4.2.5', icon: '🧭' },
  { name: 'pnpm', version: '>=8.0.0', icon: '📦' },
  { name: 'ESLint', version: '^8.55.0', icon: '🔍' },
  { name: 'Prettier', version: '^3.1.0', icon: '✨' },
])
</script>

<template>
  <div class="about">
    <!-- 介绍 -->
    <section class="intro">
      <h1 class="intro__title">关于项目</h1>
      <p class="intro__desc">
        这是一个基于 <strong>pnpm workspaces</strong> 构建的 Vue 3 Monorepo 全生态项目模板。
        项目采用现代化的前端技术栈，提供了完整的开发工具链和最佳实践。
      </p>
    </section>

    <!-- 项目架构 -->
    <section class="architecture">
      <h2 class="section-title">📁 项目架构</h2>
      <div class="architecture__list">
        <div v-for="item in architecture" :key="item.name" class="architecture__item">
          <div class="architecture__header">
            <span class="architecture__name">{{ item.name }}</span>
            <div class="architecture__tags">
              <span v-for="tech in item.tech" :key="tech" class="architecture__tag">
                {{ tech }}
              </span>
            </div>
          </div>
          <p class="architecture__desc">{{ item.description }}</p>
        </div>
      </div>
    </section>

    <!-- 技术栈 -->
    <section class="tech-stack">
      <h2 class="section-title">🛠 技术栈</h2>
      <div class="tech-stack__grid">
        <div v-for="tech in techStack" :key="tech.name" class="tech-card">
          <span class="tech-card__icon">{{ tech.icon }}</span>
          <div class="tech-card__info">
            <span class="tech-card__name">{{ tech.name }}</span>
            <span class="tech-card__version">{{ tech.version }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 快速开始 -->
    <section class="quickstart">
      <h2 class="section-title">🚀 快速开始</h2>
      <div class="quickstart__code">
        <pre><code># 安装依赖
pnpm install

# 启动所有应用
pnpm dev

# 仅启动主应用
pnpm dev:web

# 构建所有应用
pnpm build</code></pre>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.about {
  max-width: 900px;
  margin: 0 auto;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 24px;
}

.intro {
  text-align: center;
  padding: 40px 20px;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &__title {
    font-size: 36px;
    font-weight: 700;
    color: #303133;
    margin-bottom: 16px;
  }

  &__desc {
    font-size: 16px;
    color: #606266;
    line-height: 1.8;

    strong {
      color: #667eea;
    }
  }
}

.architecture {
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__item {
    padding: 20px;
    background: #f5f7fa;
    border-radius: 8px;
    border-left: 4px solid #667eea;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 8px;
  }

  &__name {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
    font-family: 'Courier New', monospace;
  }

  &__tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  &__tag {
    padding: 2px 8px;
    font-size: 12px;
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
    border-radius: 4px;
  }

  &__desc {
    font-size: 14px;
    color: #606266;
  }
}

.tech-stack {
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }
}

.tech-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #ecf5ff;
  }

  &__icon {
    font-size: 28px;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-size: 14px;
    font-weight: 600;
    color: #303133;
  }

  &__version {
    font-size: 12px;
    color: #909399;
    font-family: 'Courier New', monospace;
  }
}

.quickstart {
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &__code {
    background: #1e1e1e;
    border-radius: 8px;
    overflow: hidden;

    pre {
      margin: 0;
      padding: 20px;
      overflow-x: auto;
    }

    code {
      font-family: 'Courier New', monospace;
      font-size: 14px;
      color: #d4d4d4;
      line-height: 1.6;
    }
  }
}
</style>
