<script setup lang="ts">
/**
 * MModal 模态框组件
 * 提供弹窗功能
 */
import { computed, watch, onMounted, onUnmounted } from 'vue';
import type { ModalProps } from './types';

defineOptions({
  name: 'MModal',
});

const props = withDefaults(defineProps<ModalProps>(), {
  modelValue: false,
  title: '',
  width: '500px',
  showClose: true,
  closeOnClickOverlay: true,
  closeOnEsc: true,
  showFooter: true,
  confirmText: '确定',
  cancelText: '取消',
  confirmLoading: false,
  zIndex: 1000,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm'): void;
  (e: 'cancel'): void;
  (e: 'close'): void;
}>();

// 计算样式
const modalStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  zIndex: props.zIndex + 1,
}));

const overlayStyle = computed(() => ({
  zIndex: props.zIndex,
}));

// 关闭模态框
const close = () => {
  emit('update:modelValue', false);
  emit('close');
};

// 点击遮罩
const handleOverlayClick = () => {
  if (props.closeOnClickOverlay) {
    close();
  }
};

// 确认
const handleConfirm = () => {
  emit('confirm');
};

// 取消
const handleCancel = () => {
  emit('cancel');
  close();
};

// ESC 关闭
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEsc && props.modelValue) {
    close();
  }
};

// 监听 ESC 按键
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

// 控制 body 滚动
watch(
  () => props.modelValue,
  (visible) => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
);
</script>

<template>
  <Teleport to="body">
    <Transition name="m-modal-fade">
      <div v-if="modelValue" class="m-modal-overlay mono-component" :style="overlayStyle" @click.self="handleOverlayClick">
        <Transition name="m-modal-slide">
          <div v-if="modelValue" class="m-modal" :style="modalStyle">
            <!-- 头部 -->
            <div class="m-modal__header">
              <slot name="header">
                <span class="m-modal__title">{{ title }}</span>
              </slot>
              <button v-if="showClose" class="m-modal__close" @click="close">
                ✕
              </button>
            </div>

            <!-- 内容 -->
            <div class="m-modal__body">
              <slot></slot>
            </div>

            <!-- 底部 -->
            <div v-if="showFooter" class="m-modal__footer">
              <slot name="footer">
                <button class="m-modal__btn m-modal__btn--cancel" @click="handleCancel">
                  {{ cancelText }}
                </button>
                <button
                  class="m-modal__btn m-modal__btn--confirm"
                  :disabled="confirmLoading"
                  @click="handleConfirm"
                >
                  <span v-if="confirmLoading" class="m-modal__loading"></span>
                  {{ confirmText }}
                </button>
              </slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.m-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--mono-bg-color-overlay);
}

.m-modal {
  position: relative;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  background-color: var(--mono-bg-color);
  border-radius: var(--mono-border-radius-large);
  box-shadow: var(--mono-box-shadow);
}

.m-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--mono-border-color-lighter);
}

.m-modal__title {
  font-size: var(--mono-font-size-medium);
  font-weight: 600;
  color: var(--mono-text-primary);
}

.m-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  color: var(--mono-text-secondary);
  cursor: pointer;
  border-radius: 4px;
  transition: all var(--mono-transition-duration);
}

.m-modal__close:hover {
  background-color: var(--mono-bg-color-page);
  color: var(--mono-text-primary);
}

.m-modal__body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.m-modal__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid var(--mono-border-color-lighter);
}

.m-modal__btn {
  padding: 8px 16px;
  border-radius: var(--mono-border-radius);
  font-size: var(--mono-font-size-base);
  cursor: pointer;
  transition: all var(--mono-transition-duration);
}

.m-modal__btn--cancel {
  background-color: transparent;
  border: 1px solid var(--mono-border-color);
  color: var(--mono-text-regular);
}

.m-modal__btn--cancel:hover {
  border-color: var(--mono-primary-color);
  color: var(--mono-primary-color);
}

.m-modal__btn--confirm {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: var(--mono-primary-color);
  border: 1px solid var(--mono-primary-color);
  color: #fff;
}

.m-modal__btn--confirm:hover:not(:disabled) {
  background-color: var(--mono-primary-color-light);
  border-color: var(--mono-primary-color-light);
}

.m-modal__btn--confirm:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.m-modal__loading {
  width: 14px;
  height: 14px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: mono-spin 0.8s linear infinite;
}

/* 动画 */
.m-modal-fade-enter-active,
.m-modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.m-modal-fade-enter-from,
.m-modal-fade-leave-to {
  opacity: 0;
}

.m-modal-slide-enter-active,
.m-modal-slide-leave-active {
  transition: all 0.3s ease;
}

.m-modal-slide-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.m-modal-slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
