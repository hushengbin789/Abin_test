<script setup lang="ts">
/**
 * 基础模态框组件
 */
import { computed, watch, onMounted, onUnmounted } from 'vue'
import type { ModalPlacement } from '../../types'

interface Props {
  /** 是否显示 */
  modelValue?: boolean
  /** 标题 */
  title?: string
  /** 宽度 */
  width?: string
  /** 位置 */
  placement?: ModalPlacement
  /** 是否显示关闭按钮 */
  closable?: boolean
  /** 是否点击遮罩关闭 */
  maskClosable?: boolean
  /** 是否显示底部 */
  showFooter?: boolean
  /** 确认按钮文字 */
  confirmText?: string
  /** 取消按钮文字 */
  cancelText?: string
  /** 确认按钮加载状态 */
  confirmLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '标题',
  width: '500px',
  placement: 'center',
  closable: true,
  maskClosable: true,
  showFooter: true,
  confirmText: '确认',
  cancelText: '取消',
  confirmLoading: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'close'): void
}>()

// 计算内容类名
const contentClass = computed(() => [
  'base-modal__content',
  `base-modal__content--${props.placement}`,
])

// 计算内容样式
const contentStyle = computed(() => ({
  width: props.width,
}))

// 关闭模态框
function close() {
  emit('update:modelValue', false)
  emit('close')
}

// 点击遮罩
function handleMaskClick() {
  if (props.maskClosable) {
    close()
  }
}

// 确认
function handleConfirm() {
  emit('confirm')
}

// 取消
function handleCancel() {
  emit('cancel')
  close()
}

// 处理 ESC 键
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.closable) {
    close()
  }
}

// 监听显示状态，控制滚动
watch(
  () => props.modelValue,
  (visible) => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="base-modal-fade">
      <div v-if="modelValue" class="base-modal">
        <!-- 遮罩 -->
        <div class="base-modal__mask" @click="handleMaskClick" />

        <!-- 内容 -->
        <div :class="contentClass" :style="contentStyle">
          <!-- 头部 -->
          <div class="base-modal__header">
            <span class="base-modal__title">
              <slot name="title">{{ title }}</slot>
            </span>
            <button v-if="closable" class="base-modal__close" @click="close">
              ✕
            </button>
          </div>

          <!-- 主体 -->
          <div class="base-modal__body">
            <slot />
          </div>

          <!-- 底部 -->
          <div v-if="showFooter" class="base-modal__footer">
            <slot name="footer">
              <button
                class="base-modal__btn base-modal__btn--cancel"
                @click="handleCancel"
              >
                {{ cancelText }}
              </button>
              <button
                class="base-modal__btn base-modal__btn--confirm"
                :disabled="confirmLoading"
                @click="handleConfirm"
              >
                <span v-if="confirmLoading" class="base-modal__loading">
                  加载中...
                </span>
                <span v-else>{{ confirmText }}</span>
              </button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.base-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.base-modal__mask {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.base-modal__content {
  position: relative;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.base-modal__content--center {
  margin: auto;
}

.base-modal__content--top {
  margin-top: 80px;
  margin-bottom: auto;
}

.base-modal__content--bottom {
  margin-top: auto;
  margin-bottom: 0;
  border-radius: 12px 12px 0 0;
}

.base-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.base-modal__title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.base-modal__close {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  font-size: 16px;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.base-modal__close:hover {
  background: #f3f4f6;
  color: #111827;
}

.base-modal__body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.base-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
}

.base-modal__btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.base-modal__btn--cancel {
  background: #fff;
  border: 1px solid #d1d5db;
  color: #374151;
}

.base-modal__btn--cancel:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.base-modal__btn--confirm {
  background: #3b82f6;
  border: none;
  color: #fff;
}

.base-modal__btn--confirm:hover:not(:disabled) {
  background: #2563eb;
}

.base-modal__btn--confirm:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 过渡动画 */
.base-modal-fade-enter-active,
.base-modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.base-modal-fade-enter-active .base-modal__content,
.base-modal-fade-leave-active .base-modal__content {
  transition: transform 0.3s ease;
}

.base-modal-fade-enter-from,
.base-modal-fade-leave-to {
  opacity: 0;
}

.base-modal-fade-enter-from .base-modal__content,
.base-modal-fade-leave-to .base-modal__content {
  transform: scale(0.95);
}
</style>
