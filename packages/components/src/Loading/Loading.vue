<script setup lang="ts">
/**
 * 加载组件
 */
import { computed } from 'vue'
import type { LoadingProps } from '../types'

defineOptions({
  name: 'MLoading',
})

const props = withDefaults(defineProps<LoadingProps>(), {
  visible: false,
  text: '加载中...',
  fullscreen: false,
  background: 'rgba(255, 255, 255, 0.9)',
})

// 计算类名
const loadingClass = computed(() => {
  return [
    'm-loading',
    {
      'm-loading--fullscreen': props.fullscreen,
    },
  ]
})

// 计算样式
const loadingStyle = computed(() => {
  return {
    backgroundColor: props.background,
  }
})
</script>

<template>
  <Transition name="m-loading-fade">
    <div v-if="visible" :class="loadingClass" :style="loadingStyle">
      <div class="m-loading__spinner">
        <svg class="m-loading__circular" viewBox="0 0 50 50">
          <circle class="m-loading__path" cx="25" cy="25" r="20" fill="none" stroke-width="3" />
        </svg>
        <span v-if="text" class="m-loading__text">{{ text }}</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.m-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.m-loading--fullscreen {
  position: fixed;
  z-index: 9999;
}

.m-loading__spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.m-loading__circular {
  width: 42px;
  height: 42px;
  animation: rotate 2s linear infinite;
}

.m-loading__path {
  stroke: #409eff;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

.m-loading__text {
  font-size: 14px;
  color: #409eff;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 126;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 126;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 126;
    stroke-dashoffset: -124;
  }
}

/* 动画 */
.m-loading-fade-enter-active,
.m-loading-fade-leave-active {
  transition: opacity 0.3s ease;
}

.m-loading-fade-enter-from,
.m-loading-fade-leave-to {
  opacity: 0;
}
</style>
