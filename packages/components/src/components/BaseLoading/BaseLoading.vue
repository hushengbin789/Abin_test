<script setup lang="ts">
/**
 * 基础加载组件
 */
import { computed } from 'vue'
import type { LoadingSize } from '../../types'

interface Props {
  /** 是否显示 */
  loading?: boolean
  /** 尺寸 */
  size?: LoadingSize
  /** 加载提示文字 */
  text?: string
  /** 是否全屏 */
  fullscreen?: boolean
  /** 背景色 */
  background?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  size: 'medium',
  text: '',
  fullscreen: false,
  background: 'rgba(255, 255, 255, 0.9)',
})

// 计算容器类名
const containerClass = computed(() => [
  'base-loading',
  `base-loading--${props.size}`,
  {
    'base-loading--fullscreen': props.fullscreen,
  },
])

// 计算容器样式
const containerStyle = computed(() => ({
  background: props.background,
}))

// 计算 spinner 尺寸
const spinnerSize = computed(() => {
  const sizes = {
    small: 24,
    medium: 40,
    large: 56,
  }
  return sizes[props.size]
})
</script>

<template>
  <Transition name="base-loading-fade">
    <div v-if="loading" :class="containerClass" :style="containerStyle">
      <div class="base-loading__content">
        <!-- 加载动画 -->
        <svg
          class="base-loading__spinner"
          :width="spinnerSize"
          :height="spinnerSize"
          viewBox="0 0 50 50"
        >
          <circle
            class="base-loading__circle"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="4"
          />
        </svg>

        <!-- 加载文字 -->
        <span v-if="text" class="base-loading__text">
          {{ text }}
        </span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.base-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.base-loading--fullscreen {
  position: fixed;
  z-index: 2000;
}

.base-loading__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.base-loading__spinner {
  animation: rotate 2s linear infinite;
}

.base-loading__circle {
  stroke: #3b82f6;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

.base-loading__text {
  font-size: 14px;
  color: #6b7280;
}

.base-loading--small .base-loading__text {
  font-size: 12px;
}

.base-loading--large .base-loading__text {
  font-size: 16px;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

/* 过渡动画 */
.base-loading-fade-enter-active,
.base-loading-fade-leave-active {
  transition: opacity 0.3s ease;
}

.base-loading-fade-enter-from,
.base-loading-fade-leave-to {
  opacity: 0;
}
</style>
