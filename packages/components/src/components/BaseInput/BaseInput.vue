<script setup lang="ts">
/**
 * 基础输入框组件
 */
import { computed, ref } from 'vue'
import type { InputType } from '../../types'

interface Props {
  /** 绑定值 */
  modelValue?: string | number
  /** 输入框类型 */
  type?: InputType
  /** 占位符 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 是否显示清除按钮 */
  clearable?: boolean
  /** 前缀图标 */
  prefix?: string
  /** 后缀图标 */
  suffix?: string
  /** 最大长度 */
  maxlength?: number
  /** 是否显示字数统计 */
  showCount?: boolean
  /** 输入框尺寸 */
  size?: 'small' | 'medium' | 'large'
  /** 错误状态 */
  error?: boolean
  /** 错误提示信息 */
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '请输入',
  disabled: false,
  readonly: false,
  clearable: false,
  showCount: false,
  size: 'medium',
  error: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'input', value: string | number): void
  (e: 'change', value: string | number): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
}>()

const isFocused = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

// 计算容器类名
const wrapperClass = computed(() => [
  'base-input',
  `base-input--${props.size}`,
  {
    'base-input--disabled': props.disabled,
    'base-input--focused': isFocused.value,
    'base-input--error': props.error,
  },
])

// 计算当前字数
const currentLength = computed(() => String(props.modelValue).length)

// 处理输入
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
  emit('input', value)
}

// 处理变化
function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('change', value)
}

// 处理聚焦
function handleFocus(event: FocusEvent) {
  isFocused.value = true
  emit('focus', event)
}

// 处理失焦
function handleBlur(event: FocusEvent) {
  isFocused.value = false
  emit('blur', event)
}

// 清空输入
function handleClear() {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<template>
  <div :class="wrapperClass">
    <div class="base-input__wrapper">
      <!-- 前缀插槽 -->
      <span v-if="$slots.prefix || prefix" class="base-input__prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>

      <!-- 输入框 -->
      <input
        v-if="type !== 'textarea'"
        ref="inputRef"
        class="base-input__inner"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- 文本域 -->
      <textarea
        v-else
        ref="inputRef"
        class="base-input__inner base-input__textarea"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- 清除按钮 -->
      <span
        v-if="clearable && modelValue && !disabled"
        class="base-input__clear"
        @click="handleClear"
      >
        ✕
      </span>

      <!-- 后缀插槽 -->
      <span v-if="$slots.suffix || suffix" class="base-input__suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>

    <!-- 字数统计 -->
    <div v-if="showCount && maxlength" class="base-input__count">
      {{ currentLength }} / {{ maxlength }}
    </div>

    <!-- 错误信息 -->
    <div v-if="error && errorMessage" class="base-input__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.base-input__wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.base-input--small .base-input__wrapper {
  padding: 6px 10px;
}

.base-input--medium .base-input__wrapper {
  padding: 10px 14px;
}

.base-input--large .base-input__wrapper {
  padding: 14px 18px;
}

.base-input--focused .base-input__wrapper {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.base-input--error .base-input__wrapper {
  border-color: #ef4444;
}

.base-input--error.base-input--focused .base-input__wrapper {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.base-input--disabled .base-input__wrapper {
  background: #f3f4f6;
  cursor: not-allowed;
}

.base-input__inner {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #111827;
  width: 100%;
}

.base-input__inner::placeholder {
  color: #9ca3af;
}

.base-input__inner:disabled {
  cursor: not-allowed;
  color: #9ca3af;
}

.base-input__textarea {
  min-height: 80px;
  resize: vertical;
}

.base-input__prefix,
.base-input__suffix {
  color: #6b7280;
  font-size: 14px;
  flex-shrink: 0;
}

.base-input__clear {
  color: #9ca3af;
  cursor: pointer;
  font-size: 12px;
  flex-shrink: 0;
  padding: 2px;
}

.base-input__clear:hover {
  color: #6b7280;
}

.base-input__count {
  font-size: 12px;
  color: #9ca3af;
  text-align: right;
}

.base-input__error {
  font-size: 12px;
  color: #ef4444;
}
</style>
