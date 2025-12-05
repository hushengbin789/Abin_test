<script setup lang="ts">
/**
 * MMessage 消息提示组件
 * 用于显示消息提示
 */

defineOptions({
  name: 'MMessage',
});

/** 消息类型 */
type MessageType = 'success' | 'warning' | 'error' | 'info';

interface MessageProps {
  /** 消息类型 */
  type?: MessageType;
  /** 消息内容 */
  message?: string;
  /** 是否显示 */
  visible?: boolean;
  /** 持续时间（毫秒） */
  duration?: number;
  /** 是否可关闭 */
  closable?: boolean;
}

withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  message: '',
  visible: true,
  duration: 3000,
  closable: false,
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleClose = () => {
  emit('close');
};

// 图标映射
const iconMap: Record<MessageType, string> = {
  success: '✓',
  warning: '⚠',
  error: '✕',
  info: 'ℹ',
};
</script>

<template>
  <Transition name="m-message-fade">
    <div
      v-if="visible"
      class="m-message mono-component"
      :class="[`m-message--${type}`]"
    >
      <span class="m-message__icon">{{ iconMap[type] }}</span>
      <span class="m-message__content">{{ message }}</span>
      <button v-if="closable" class="m-message__close" @click="handleClose">
        ✕
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.m-message {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background-color: var(--mono-bg-color);
  border-radius: var(--mono-border-radius);
  box-shadow: var(--mono-box-shadow);
  min-width: 200px;
  max-width: 400px;
}

.m-message__icon {
  font-size: 16px;
  font-weight: bold;
}

.m-message__content {
  flex: 1;
  font-size: var(--mono-font-size-base);
  color: var(--mono-text-primary);
}

.m-message__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: var(--mono-text-secondary);
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
}

.m-message__close:hover {
  background-color: var(--mono-bg-color-page);
  color: var(--mono-text-primary);
}

/* 类型样式 */
.m-message--success {
  background-color: #f0f9eb;
  border: 1px solid #e1f3d8;
}

.m-message--success .m-message__icon {
  color: var(--mono-success-color);
}

.m-message--warning {
  background-color: #fdf6ec;
  border: 1px solid #faecd8;
}

.m-message--warning .m-message__icon {
  color: var(--mono-warning-color);
}

.m-message--error {
  background-color: #fef0f0;
  border: 1px solid #fde2e2;
}

.m-message--error .m-message__icon {
  color: var(--mono-danger-color);
}

.m-message--info {
  background-color: #f4f4f5;
  border: 1px solid #e9e9eb;
}

.m-message--info .m-message__icon {
  color: var(--mono-info-color);
}

/* 动画 */
.m-message-fade-enter-active,
.m-message-fade-leave-active {
  transition: all 0.3s ease;
}

.m-message-fade-enter-from,
.m-message-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
