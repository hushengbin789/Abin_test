<script setup lang="ts">
/**
 * 基础卡片组件
 */
import { computed } from 'vue'

interface Props {
  /** 卡片标题 */
  title?: string
  /** 是否有边框 */
  bordered?: boolean
  /** 是否有阴影 */
  shadow?: 'always' | 'hover' | 'never'
  /** 是否可悬停 */
  hoverable?: boolean
  /** 内边距 */
  padding?: string
  /** 自定义类名 */
  bodyClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  bordered: true,
  shadow: 'always',
  hoverable: false,
  padding: '20px',
})

// 计算卡片类名
const cardClass = computed(() => [
  'base-card',
  `base-card--shadow-${props.shadow}`,
  {
    'base-card--bordered': props.bordered,
    'base-card--hoverable': props.hoverable,
  },
])

// 计算主体样式
const bodyStyle = computed(() => ({
  padding: props.padding,
}))
</script>

<template>
  <div :class="cardClass">
    <!-- 头部 -->
    <div
      v-if="title || $slots.header || $slots.extra"
      class="base-card__header"
    >
      <div class="base-card__title">
        <slot name="header">{{ title }}</slot>
      </div>
      <div v-if="$slots.extra" class="base-card__extra">
        <slot name="extra" />
      </div>
    </div>

    <!-- 封面 -->
    <div v-if="$slots.cover" class="base-card__cover">
      <slot name="cover" />
    </div>

    <!-- 主体 -->
    <div class="base-card__body" :class="bodyClass" :style="bodyStyle">
      <slot />
    </div>

    <!-- 底部 -->
    <div v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.base-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.base-card--bordered {
  border: 1px solid #e5e7eb;
}

.base-card--shadow-always {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.base-card--shadow-hover:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.base-card--hoverable {
  cursor: pointer;
}

.base-card--hoverable:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.base-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
}

.base-card__title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.base-card__extra {
  color: #6b7280;
  font-size: 14px;
}

.base-card__cover {
  line-height: 0;
}

.base-card__cover :deep(img) {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.base-card__body {
  color: #374151;
  font-size: 14px;
  line-height: 1.6;
}

.base-card__footer {
  padding: 12px 20px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}
</style>
