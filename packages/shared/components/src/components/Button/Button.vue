<script setup lang="ts">
/**
 * MButton 按钮组件
 * 提供不同样式和状态的按钮
 */
import type { ButtonProps } from './types';

defineOptions({
  name: 'MButton',
});

withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'medium',
  disabled: false,
  loading: false,
  plain: false,
  round: false,
  circle: false,
  nativeType: 'button',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>

<template>
  <button
    class="m-button mono-component"
    :class="[
      `m-button--${type}`,
      `m-button--${size}`,
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
      },
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="m-button__loading">
      <svg class="m-button__loading-icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="31.4 31.4" />
      </svg>
    </span>
    <span class="m-button__content">
      <slot></slot>
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
  font-size: var(--mono-font-size-base);
  font-weight: 500;
  line-height: 1;
  border: 1px solid var(--mono-border-color);
  border-radius: var(--mono-border-radius);
  background-color: var(--mono-bg-color);
  color: var(--mono-text-regular);
  cursor: pointer;
  transition: all var(--mono-transition-duration);
  outline: none;
  user-select: none;
}

.m-button:hover:not(.is-disabled) {
  border-color: var(--mono-primary-color-light);
  color: var(--mono-primary-color);
}

.m-button:active:not(.is-disabled) {
  border-color: var(--mono-primary-color-dark);
  color: var(--mono-primary-color-dark);
}

/* 类型样式 */
.m-button--primary {
  background-color: var(--mono-primary-color);
  border-color: var(--mono-primary-color);
  color: #fff;
}

.m-button--primary:hover:not(.is-disabled) {
  background-color: var(--mono-primary-color-light);
  border-color: var(--mono-primary-color-light);
  color: #fff;
}

.m-button--success {
  background-color: var(--mono-success-color);
  border-color: var(--mono-success-color);
  color: #fff;
}

.m-button--warning {
  background-color: var(--mono-warning-color);
  border-color: var(--mono-warning-color);
  color: #fff;
}

.m-button--danger {
  background-color: var(--mono-danger-color);
  border-color: var(--mono-danger-color);
  color: #fff;
}

.m-button--info {
  background-color: var(--mono-info-color);
  border-color: var(--mono-info-color);
  color: #fff;
}

/* 尺寸 */
.m-button--small {
  padding: 6px 12px;
  font-size: var(--mono-font-size-small);
}

.m-button--large {
  padding: 12px 24px;
  font-size: var(--mono-font-size-medium);
}

/* 状态 */
.m-button.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.m-button.is-plain {
  background-color: transparent;
}

.m-button.is-round {
  border-radius: 20px;
}

.m-button.is-circle {
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 50%;
}

/* 加载 */
.m-button__loading {
  display: inline-flex;
}

.m-button__loading-icon {
  width: 14px;
  height: 14px;
  animation: mono-spin 1s linear infinite;
}

.m-button__content {
  display: inline-flex;
  align-items: center;
}
</style>
