<script setup lang="ts">
/**
 * 基础按钮组件
 */
import { computed } from 'vue'
import type { ButtonType, ButtonSize } from '../../types'

interface Props {
  /** 按钮类型 */
  type?: ButtonType
  /** 按钮尺寸 */
  size?: ButtonSize
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 是否为块级按钮 */
  block?: boolean
  /** 是否为圆形按钮 */
  round?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  block: false,
  round: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// 计算按钮类名
const buttonClass = computed(() => [
  'base-button',
  `base-button--${props.type}`,
  `base-button--${props.size}`,
  {
    'base-button--disabled': props.disabled || props.loading,
    'base-button--loading': props.loading,
    'base-button--block': props.block,
    'base-button--round': props.round,
  },
])

// 处理点击事件
function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<template>
  <button
    :class="buttonClass"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="base-button__loading">
      <svg class="base-button__spinner" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        />
      </svg>
    </span>
    <span class="base-button__content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

/* 尺寸 */
.base-button--small {
  padding: 6px 12px;
  font-size: 12px;
}

.base-button--medium {
  padding: 10px 20px;
  font-size: 14px;
}

.base-button--large {
  padding: 14px 28px;
  font-size: 16px;
}

/* 类型 */
.base-button--primary {
  background: #3b82f6;
  color: white;
}

.base-button--primary:hover:not(:disabled) {
  background: #2563eb;
}

.base-button--secondary {
  background: #6b7280;
  color: white;
}

.base-button--secondary:hover:not(:disabled) {
  background: #4b5563;
}

.base-button--success {
  background: #10b981;
  color: white;
}

.base-button--success:hover:not(:disabled) {
  background: #059669;
}

.base-button--warning {
  background: #f59e0b;
  color: white;
}

.base-button--warning:hover:not(:disabled) {
  background: #d97706;
}

.base-button--danger {
  background: #ef4444;
  color: white;
}

.base-button--danger:hover:not(:disabled) {
  background: #dc2626;
}

.base-button--text {
  background: transparent;
  color: #3b82f6;
}

.base-button--text:hover:not(:disabled) {
  background: #eff6ff;
}

/* 状态 */
.base-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.base-button--block {
  width: 100%;
}

.base-button--round {
  border-radius: 9999px;
}

/* 加载动画 */
.base-button__loading {
  display: flex;
  align-items: center;
}

.base-button__spinner {
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

.base-button__spinner circle {
  stroke-dasharray: 31.4;
  stroke-dashoffset: 10;
  stroke-linecap: round;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
