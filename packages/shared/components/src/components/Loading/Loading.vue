<script setup lang="ts">
/**
 * MLoading 加载组件
 * 显示加载状态
 */

defineOptions({
  name: 'MLoading',
});

interface LoadingProps {
  /** 是否显示 */
  loading?: boolean;
  /** 加载文字 */
  text?: string;
  /** 大小 */
  size?: 'small' | 'medium' | 'large';
  /** 是否全屏 */
  fullscreen?: boolean;
}

withDefaults(defineProps<LoadingProps>(), {
  loading: true,
  text: '',
  size: 'medium',
  fullscreen: false,
});
</script>

<template>
  <Transition name="m-loading-fade">
    <div
      v-if="loading"
      class="m-loading mono-component"
      :class="[
        `m-loading--${size}`,
        { 'm-loading--fullscreen': fullscreen },
      ]"
    >
      <div class="m-loading__spinner">
        <svg class="m-loading__icon" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-dasharray="80, 200"
            stroke-dashoffset="0"
          />
        </svg>
      </div>
      <span v-if="text" class="m-loading__text">{{ text }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.m-loading {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--mono-primary-color);
}

.m-loading--fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--mono-bg-color-overlay);
  z-index: 9999;
}

.m-loading__spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.m-loading__icon {
  animation: mono-spin 1.5s linear infinite;
}

.m-loading__text {
  font-size: var(--mono-font-size-base);
  color: var(--mono-text-secondary);
}

/* 尺寸 */
.m-loading--small .m-loading__icon {
  width: 24px;
  height: 24px;
}

.m-loading--medium .m-loading__icon {
  width: 40px;
  height: 40px;
}

.m-loading--large .m-loading__icon {
  width: 56px;
  height: 56px;
}

.m-loading--fullscreen .m-loading__icon {
  color: #fff;
}

.m-loading--fullscreen .m-loading__text {
  color: #fff;
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
