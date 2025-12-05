<script setup lang="ts">
/**
 * 按钮组件
 */
import { computed } from 'vue'
import type { ButtonProps } from '../types'

defineOptions({
  name: 'MButton',
})

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'default',
  disabled: false,
  loading: false,
  plain: false,
  round: false,
  circle: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// 计算按钮类名
const buttonClass = computed(() => {
  return [
    'm-button',
    `m-button--${props.type}`,
    `m-button--${props.size}`,
    {
      'is-plain': props.plain,
      'is-round': props.round,
      'is-circle': props.circle,
      'is-disabled': props.disabled,
      'is-loading': props.loading,
    },
  ]
})

// 处理点击事件
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    return
  }
  emit('click', event)
}
</script>

<template>
  <button :class="buttonClass" :disabled="disabled || loading" @click="handleClick">
    <span v-if="loading" class="m-button__loading">
      <svg class="m-button__loading-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248L783.552 195.2a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
        />
      </svg>
    </span>
    <span class="m-button__content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.m-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  white-space: nowrap;
}

/* 尺寸 */
.m-button--large {
  padding: 12px 20px;
  font-size: 16px;
}

.m-button--small {
  padding: 5px 11px;
  font-size: 12px;
}

/* 类型 */
.m-button--default {
  background-color: #fff;
  border-color: #dcdfe6;
  color: #606266;
}

.m-button--default:hover {
  background-color: #ecf5ff;
  border-color: #409eff;
  color: #409eff;
}

.m-button--primary {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
}

.m-button--primary:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.m-button--success {
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
}

.m-button--success:hover {
  background-color: #85ce61;
  border-color: #85ce61;
}

.m-button--warning {
  background-color: #e6a23c;
  border-color: #e6a23c;
  color: #fff;
}

.m-button--warning:hover {
  background-color: #ebb563;
  border-color: #ebb563;
}

.m-button--danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
}

.m-button--danger:hover {
  background-color: #f78989;
  border-color: #f78989;
}

.m-button--info {
  background-color: #909399;
  border-color: #909399;
  color: #fff;
}

.m-button--info:hover {
  background-color: #a6a9ad;
  border-color: #a6a9ad;
}

/* 朴素按钮 */
.m-button--primary.is-plain {
  background-color: #ecf5ff;
  border-color: #b3d8ff;
  color: #409eff;
}

.m-button--success.is-plain {
  background-color: #f0f9eb;
  border-color: #c2e7b0;
  color: #67c23a;
}

.m-button--warning.is-plain {
  background-color: #fdf6ec;
  border-color: #f5dab1;
  color: #e6a23c;
}

.m-button--danger.is-plain {
  background-color: #fef0f0;
  border-color: #fbc4c4;
  color: #f56c6c;
}

.m-button--info.is-plain {
  background-color: #f4f4f5;
  border-color: #d3d4d6;
  color: #909399;
}

/* 圆角按钮 */
.m-button.is-round {
  border-radius: 20px;
}

/* 圆形按钮 */
.m-button.is-circle {
  border-radius: 50%;
  padding: 8px;
}

/* 禁用状态 */
.m-button.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 加载状态 */
.m-button.is-loading {
  pointer-events: none;
}

.m-button__loading-icon {
  width: 14px;
  height: 14px;
  animation: rotate 1.5s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
