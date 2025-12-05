<script setup lang="ts">
/**
 * MInput 输入框组件
 * 提供各种类型的输入框
 */
import { ref, computed } from 'vue';
import type { InputProps } from './types';

defineOptions({
  name: 'MInput',
});

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  size: 'medium',
  placeholder: '请输入',
  disabled: false,
  readonly: false,
  clearable: false,
  showPassword: false,
  showWordLimit: false,
  autocomplete: 'off',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'input', value: string | number): void;
  (e: 'change', value: string | number): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'clear'): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
const passwordVisible = ref(false);

// 实际的输入类型
const inputType = computed(() => {
  if (props.type === 'password' && props.showPassword) {
    return passwordVisible.value ? 'text' : 'password';
  }
  return props.type;
});

// 输入值长度
const valueLength = computed(() => String(props.modelValue).length);

// 是否显示清除按钮
const showClear = computed(
  () => props.clearable && !props.disabled && !props.readonly && String(props.modelValue).length > 0
);

// 处理输入
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  emit('update:modelValue', value);
  emit('input', value);
};

// 处理变化
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('change', target.value);
};

// 处理聚焦
const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit('focus', event);
};

// 处理失焦
const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit('blur', event);
};

// 清空输入
const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');
  inputRef.value?.focus();
};

// 切换密码显示
const togglePassword = () => {
  passwordVisible.value = !passwordVisible.value;
};

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
});
</script>

<template>
  <div
    class="m-input mono-component"
    :class="[
      `m-input--${size}`,
      {
        'is-disabled': disabled,
        'is-focused': isFocused,
      },
    ]"
  >
    <!-- 前缀 -->
    <span v-if="$slots.prefix || prefixIcon" class="m-input__prefix">
      <slot name="prefix">
        <span v-if="prefixIcon" class="m-input__icon">{{ prefixIcon }}</span>
      </slot>
    </span>

    <!-- 输入框 -->
    <input
      ref="inputRef"
      class="m-input__inner"
      :type="inputType"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :name="name"
      :autocomplete="autocomplete"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <!-- 后缀 -->
    <span class="m-input__suffix">
      <!-- 清除按钮 -->
      <span v-if="showClear" class="m-input__clear" @click="handleClear">
        ✕
      </span>

      <!-- 密码切换 -->
      <span
        v-if="type === 'password' && showPassword"
        class="m-input__password"
        @click="togglePassword"
      >
        {{ passwordVisible ? '👁' : '👁‍🗨' }}
      </span>

      <!-- 字数统计 -->
      <span v-if="showWordLimit && maxlength" class="m-input__count">
        {{ valueLength }} / {{ maxlength }}
      </span>

      <!-- 自定义后缀 -->
      <slot name="suffix">
        <span v-if="suffixIcon" class="m-input__icon">{{ suffixIcon }}</span>
      </slot>
    </span>
  </div>
</template>

<style scoped>
.m-input {
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding: 0 12px;
  background-color: var(--mono-bg-color);
  border: 1px solid var(--mono-border-color);
  border-radius: var(--mono-border-radius);
  transition: border-color var(--mono-transition-duration);
}

.m-input:hover:not(.is-disabled) {
  border-color: var(--mono-border-color-light);
}

.m-input.is-focused:not(.is-disabled) {
  border-color: var(--mono-primary-color);
}

.m-input.is-disabled {
  background-color: var(--mono-bg-color-page);
  cursor: not-allowed;
}

.m-input__inner {
  flex: 1;
  width: 100%;
  padding: 8px 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: var(--mono-font-size-base);
  color: var(--mono-text-primary);
}

.m-input__inner::placeholder {
  color: var(--mono-text-placeholder);
}

.m-input__inner:disabled {
  cursor: not-allowed;
}

/* 前缀后缀 */
.m-input__prefix,
.m-input__suffix {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--mono-text-secondary);
}

.m-input__prefix {
  margin-right: 8px;
}

.m-input__suffix {
  margin-left: 8px;
}

.m-input__clear,
.m-input__password {
  cursor: pointer;
  font-size: 12px;
}

.m-input__clear:hover,
.m-input__password:hover {
  color: var(--mono-text-primary);
}

.m-input__count {
  font-size: var(--mono-font-size-small);
  color: var(--mono-text-secondary);
}

/* 尺寸 */
.m-input--small .m-input__inner {
  padding: 6px 0;
  font-size: var(--mono-font-size-small);
}

.m-input--large .m-input__inner {
  padding: 12px 0;
  font-size: var(--mono-font-size-medium);
}
</style>
