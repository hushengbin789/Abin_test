<script setup lang="ts">
/**
 * 模态框组件
 */
import { computed, watch, onMounted, onUnmounted } from 'vue'
import type { ModalProps } from '../types'

defineOptions({
  name: 'MModal',
})

const props = withDefaults(defineProps<ModalProps>(), {
  modelValue: false,
  title: '',
  width: '500px',
  showClose: true,
  closeOnClickMask: true,
  closeOnPressEscape: true,
  confirmText: '确定',
  cancelText: '取消',
  showFooter: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
  confirm: []
  cancel: []
}>()

// 计算宽度样式
const widthStyle = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})

// 关闭模态框
const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

// 点击遮罩层
const handleMaskClick = () => {
  if (props.closeOnClickMask) {
    close()
  }
}

// 确认
const handleConfirm = () => {
  emit('confirm')
}

// 取消
const handleCancel = () => {
  emit('cancel')
  close()
}

// 键盘事件处理
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnPressEscape && props.modelValue) {
    close()
  }
}

// 监听打开状态
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      emit('open')
      // 禁止背景滚动
      document.body.style.overflow = 'hidden'
    } else {
      // 恢复背景滚动
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
    <Transition name="m-modal-fade">
      <div v-if="modelValue" class="m-modal">
        <!-- 遮罩层 -->
        <div class="m-modal__mask" @click="handleMaskClick" />
        <!-- 模态框主体 -->
        <Transition name="m-modal-zoom">
          <div v-if="modelValue" class="m-modal__wrapper" :style="{ width: widthStyle }">
            <!-- 头部 -->
            <div class="m-modal__header">
              <slot name="header">
                <span class="m-modal__title">{{ title }}</span>
              </slot>
              <button v-if="showClose" class="m-modal__close" @click="close">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="currentColor"
                    d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                  />
                </svg>
              </button>
            </div>
            <!-- 内容 -->
            <div class="m-modal__body">
              <slot />
            </div>
            <!-- 底部 -->
            <div v-if="showFooter" class="m-modal__footer">
              <slot name="footer">
                <button class="m-modal__btn m-modal__btn--default" @click="handleCancel">
                  {{ cancelText }}
                </button>
                <button class="m-modal__btn m-modal__btn--primary" @click="handleConfirm">
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
.m-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.m-modal__mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.m-modal__wrapper {
  position: relative;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 32px);
  background-color: #fff;
  border-radius: 8px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
}

.m-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #ebeef5;
}

.m-modal__title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.m-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #909399;
  transition: color 0.2s;
}

.m-modal__close:hover {
  color: #409eff;
}

.m-modal__close svg {
  width: 16px;
  height: 16px;
}

.m-modal__body {
  flex: 1;
  padding: 20px;
  overflow: auto;
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
}

.m-modal__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px 20px;
  border-top: 1px solid #ebeef5;
}

.m-modal__btn {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.m-modal__btn--default {
  background-color: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
}

.m-modal__btn--default:hover {
  background-color: #ecf5ff;
  border-color: #409eff;
  color: #409eff;
}

.m-modal__btn--primary {
  background-color: #409eff;
  border: 1px solid #409eff;
  color: #fff;
}

.m-modal__btn--primary:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
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

.m-modal-zoom-enter-active,
.m-modal-zoom-leave-active {
  transition: all 0.3s ease;
}

.m-modal-zoom-enter-from,
.m-modal-zoom-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
