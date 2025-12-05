<script setup lang="ts">
/**
 * 首页
 */
import { ref } from 'vue'
import { useLoading } from '@monorepo/hooks'
import { formatDate, generateUUID } from '@monorepo/shared'

// 使用 loading hook
const { loading, wrapAsync } = useLoading()

// 功能特性
const features = ref([
  {
    icon: '📦',
    title: 'Monorepo 架构',
    description: '使用 pnpm workspaces 管理多包项目，共享代码更便捷',
  },
  {
    icon: '⚡',
    title: 'Vite 构建',
    description: '极速的开发服务器启动，闪电般的热更新体验',
  },
  {
    icon: '🎨',
    title: 'Vue 3',
    description: '使用 Composition API 和 <script setup> 语法',
  },
  {
    icon: '📘',
    title: 'TypeScript',
    description: '完整的类型支持，提升开发体验和代码质量',
  },
  {
    icon: '🧩',
    title: '组件库',
    description: '内置共享组件库，可跨应用复用',
  },
  {
    icon: '🪝',
    title: 'Hooks',
    description: '丰富的 Composition API Hooks，提升开发效率',
  },
])

// 演示共享工具函数
const currentTime = ref(formatDate(new Date()))
const uuid = ref(generateUUID())

// 刷新 UUID
const refreshUUID = wrapAsync(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  uuid.value = generateUUID()
})
</script>

<template>
  <div class="home">
    <!-- 欢迎区域 -->
    <section class="hero">
      <h1 class="hero__title">
        Vue 3 + TypeScript + Vite
        <br />
        <span class="hero__highlight">Monorepo 全生态项目</span>
      </h1>
      <p class="hero__desc">
        基于 pnpm workspaces 构建的现代化前端 Monorepo 项目模板，
        <br />
        包含共享组件库、工具库、Hooks 等完整生态
      </p>
      <div class="hero__actions">
        <RouterLink to="/components" class="hero__btn hero__btn--primary"> 查看组件 </RouterLink>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener"
          class="hero__btn hero__btn--outline"
        >
          GitHub
        </a>
      </div>
    </section>

    <!-- 工具演示 -->
    <section class="demo">
      <h2 class="demo__title">📚 共享工具演示</h2>
      <div class="demo__cards">
        <div class="demo__card">
          <h3>当前时间</h3>
          <p class="demo__value">{{ currentTime }}</p>
          <small>使用 @monorepo/shared 的 formatDate</small>
        </div>
        <div class="demo__card">
          <h3>UUID 生成</h3>
          <p class="demo__value demo__value--small">{{ uuid }}</p>
          <MButton type="primary" size="small" :loading="loading" @click="refreshUUID">
            刷新
          </MButton>
          <small>使用 @monorepo/shared 的 generateUUID</small>
        </div>
      </div>
    </section>

    <!-- 功能特性 -->
    <section class="features">
      <h2 class="features__title">✨ 项目特性</h2>
      <div class="features__grid">
        <div v-for="feature in features" :key="feature.title" class="feature-card">
          <span class="feature-card__icon">{{ feature.icon }}</span>
          <h3 class="feature-card__title">{{ feature.title }}</h3>
          <p class="feature-card__desc">{{ feature.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 60px 20px;

  &__title {
    font-size: 48px;
    font-weight: 700;
    color: #303133;
    line-height: 1.3;
    margin-bottom: 24px;
  }

  &__highlight {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__desc {
    font-size: 18px;
    color: #606266;
    line-height: 1.8;
    margin-bottom: 32px;
  }

  &__actions {
    display: flex;
    justify-content: center;
    gap: 16px;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    padding: 12px 28px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s ease;

    &--primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      border: none;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
      }
    }

    &--outline {
      background: transparent;
      color: #667eea;
      border: 2px solid #667eea;

      &:hover {
        background: #667eea;
        color: #fff;
      }
    }
  }
}

.demo {
  padding: 40px 20px;

  &__title {
    font-size: 28px;
    font-weight: 600;
    color: #303133;
    text-align: center;
    margin-bottom: 32px;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }

  &__card {
    background: #fff;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    text-align: center;

    h3 {
      font-size: 16px;
      color: #909399;
      margin-bottom: 12px;
    }

    small {
      display: block;
      margin-top: 12px;
      color: #c0c4cc;
      font-size: 12px;
    }
  }

  &__value {
    font-size: 24px;
    font-weight: 600;
    color: #303133;
    font-family: 'Courier New', monospace;

    &--small {
      font-size: 14px;
      word-break: break-all;
    }
  }
}

.features {
  padding: 40px 20px 60px;

  &__title {
    font-size: 28px;
    font-weight: 600;
    color: #303133;
    text-align: center;
    margin-bottom: 32px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }
}

.feature-card {
  background: #fff;
  padding: 28px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }

  &__icon {
    display: inline-block;
    font-size: 36px;
    margin-bottom: 16px;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 8px;
  }

  &__desc {
    font-size: 14px;
    color: #606266;
    line-height: 1.6;
  }
}
</style>
