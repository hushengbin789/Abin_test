<script setup lang="ts">
/**
 * 输入框组件
 */
import { ref, computed, watch } from 'vue'
import type { InputProps } from '../types'

defineOptions({
  name: 'MInput',
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  clearable: false,
  showPassword: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [value: string | number]
  change: [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}>()

// 内部值
const innerValue = ref(props.modelValue ?? '')

// 监听外部值变化
watch(
  () => props.modelValue,
  (val) => {
    innerValue.value = val ?? ''
  }
)

// 是否显示密码
const passwordVisible = ref(false)

// 是否聚焦
const isFocused = ref(false)

// 计算输入类型
const inputType = computed(() => {
  if (props.type === 'password') {
    return passwordVisible.value ? 'text' : 'password'
  }
  return props.type
})

// 是否显示清除按钮
const showClear = computed(() => {
  return props.clearable && !props.disabled && !props.readonly && innerValue.value
})

// 是否显示密码切换按钮
const showPasswordToggle = computed(() => {
  return props.showPassword && props.type === 'password' && !props.disabled && !props.readonly
})

// 容器类名
const wrapperClass = computed(() => {
  return [
    'm-input',
    {
      'is-disabled': props.disabled,
      'is-focused': isFocused.value,
    },
  ]
})

// 处理输入
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  innerValue.value = value
  emit('update:modelValue', value)
  emit('input', value)
}

// 处理变更
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}

// 处理聚焦
const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

// 处理失焦
const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

// 清除内容
const handleClear = () => {
  innerValue.value = ''
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
}

// 切换密码显示
const togglePassword = () => {
  passwordVisible.value = !passwordVisible.value
}
</script>

<template>
  <div :class="wrapperClass">
    <!-- 文本域 -->
    <textarea
      v-if="type === 'textarea'"
      class="m-input__inner m-input__textarea"
      :value="innerValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      :rows="rows || 3"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <!-- 输入框 -->
    <template v-else>
      <input
        class="m-input__inner"
        :type="inputType"
        :value="innerValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :minlength="minlength"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <!-- 后缀区域 -->
      <span v-if="showClear || showPasswordToggle" class="m-input__suffix">
        <!-- 清除按钮 -->
        <span v-if="showClear" class="m-input__clear" @click="handleClear">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
            />
          </svg>
        </span>
        <!-- 密码切换按钮 -->
        <span v-if="showPasswordToggle" class="m-input__password" @click="togglePassword">
          <svg v-if="passwordVisible" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160 160 0 1 0 0 320 160 160 0 0 0 0-320z"
            />
          </svg>
          <svg v-else viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              d="m644.8 505.6 76.8 76.8c6.4-22.4 9.6-44.8 9.6-70.4 0-121.6-99.2-220.8-220.8-220.8-25.6 0-48 3.2-70.4 9.6l76.8 76.8c96 6.4 121.6 32 128 128zM96 256l51.2 51.2c-64 48-115.2 108.8-147.2 172.8l-3.2 6.4c0 3.2 3.2 6.4 3.2 9.6 54.4 108.8 160 198.4 288 243.2L352 803.2c-153.6-54.4-275.2-163.2-336-304 44.8-89.6 115.2-160 176-211.2L160 256H96zM512 160c339.2 0 512 352 512 352s-57.6 118.4-163.2 220.8l-44.8-44.8c83.2-76.8 134.4-163.2 150.4-185.6-51.2-76.8-211.2-281.6-454.4-281.6-54.4 0-105.6 9.6-150.4 25.6L320 288c60.8-22.4 124.8-32 192-32zM512 288a224 224 0 0 1 224 224c0 28.8-6.4 57.6-16 83.2L512 387.2c25.6-9.6 54.4-16 83.2-16H512zm-224 224c0-28.8 6.4-57.6 16-83.2l208 208c-25.6 9.6-51.2 16-80 16-121.6 0-220.8-99.2-220.8-220.8h76.8z"
            />
          </svg>
        </span>
      </span>
    </template>
  </div>
</template>

<style scoped>
.m-input {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.m-input__inner {
  flex: 1;
  width: 100%;
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
  color: #606266;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
}

.m-input__inner::placeholder {
  color: #c0c4cc;
}

.m-input__inner:focus {
  border-color: #409eff;
}

.m-input__textarea {
  height: auto;
  padding: 8px 12px;
  line-height: 1.5;
  resize: vertical;
}

.m-input.is-disabled .m-input__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}

.m-input__suffix {
  position: absolute;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.m-input__clear,
.m-input__password {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: #c0c4cc;
  cursor: pointer;
  transition: color 0.2s;
}

.m-input__clear:hover,
.m-input__password:hover {
  color: #909399;
}

.m-input__clear svg,
.m-input__password svg {
  width: 100%;
  height: 100%;
}

.m-input:has(.m-input__suffix) .m-input__inner {
  padding-right: 36px;
}
</style>
