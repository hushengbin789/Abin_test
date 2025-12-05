<script setup lang="ts">
/**
 * 仪表盘页面
 */
import { ref } from 'vue'
import { formatDate } from '@monorepo/shared'

// 统计数据
const stats = ref([
  { label: '今日访问', value: '1,234', icon: '👁', color: '#3b82f6' },
  { label: '新增用户', value: '56', icon: '👤', color: '#10b981' },
  { label: '订单总数', value: '892', icon: '📦', color: '#f59e0b' },
  { label: '总收入', value: '¥12,345', icon: '💰', color: '#ef4444' },
])

// 最近活动
const activities = ref([
  { time: '10:30', content: '用户 张三 完成了订单 #1234', type: 'order' },
  { time: '09:45', content: '新用户 李四 完成注册', type: 'user' },
  { time: '09:15', content: '管理员更新了系统配置', type: 'system' },
  { time: '08:30', content: '用户 王五 提交了工单', type: 'ticket' },
  { time: '08:00', content: '系统自动备份完成', type: 'system' },
])

// 快捷操作
const shortcuts = ref([
  { name: '添加用户', icon: '➕', path: '/users' },
  { name: '查看订单', icon: '📋', path: '/orders' },
  { name: '数据报表', icon: '📊', path: '/reports' },
  { name: '系统设置', icon: '⚙️', path: '/settings' },
])

// 当前日期
const currentDate = formatDate(new Date(), 'YYYY年MM月DD日')
</script>

<template>
  <div class="dashboard">
    <!-- 欢迎区域 -->
    <div class="welcome">
      <div class="welcome__content">
        <h1 class="welcome__title">欢迎回来，管理员 👋</h1>
        <p class="welcome__date">{{ currentDate }}</p>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stats">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <div class="stat-card__icon" :style="{ backgroundColor: stat.color + '20' }">
          <span :style="{ color: stat.color }">{{ stat.icon }}</span>
        </div>
        <div class="stat-card__info">
          <span class="stat-card__value">{{ stat.value }}</span>
          <span class="stat-card__label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <div class="dashboard__grid">
      <!-- 快捷操作 -->
      <div class="panel">
        <h2 class="panel__title">快捷操作</h2>
        <div class="shortcuts">
          <RouterLink
            v-for="shortcut in shortcuts"
            :key="shortcut.name"
            :to="shortcut.path"
            class="shortcut"
          >
            <span class="shortcut__icon">{{ shortcut.icon }}</span>
            <span class="shortcut__name">{{ shortcut.name }}</span>
          </RouterLink>
        </div>
      </div>

      <!-- 最近活动 -->
      <div class="panel">
        <h2 class="panel__title">最近活动</h2>
        <div class="activities">
          <div v-for="(activity, index) in activities" :key="index" class="activity">
            <span class="activity__time">{{ activity.time }}</span>
            <span class="activity__content">{{ activity.content }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;

  &__title {
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
  }

  &__date {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
  }
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 12px;
    font-size: 24px;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__value {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
  }

  &__label {
    font-size: 14px;
    color: #6b7280;
  }
}

.dashboard__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.panel {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &__title {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 20px;
  }
}

.shortcuts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.shortcut {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    transform: translateY(-2px);
  }

  &__icon {
    font-size: 24px;
  }

  &__name {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }
}

.activities {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity {
  display: flex;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &__time {
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 500;
    color: #6b7280;
    width: 50px;
  }

  &__content {
    font-size: 14px;
    color: #374151;
  }
}
</style>
