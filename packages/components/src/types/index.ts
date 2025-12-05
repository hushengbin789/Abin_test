/**
 * 组件类型定义
 */

/**
 * 按钮类型
 */
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'

/**
 * 按钮尺寸
 */
export type ButtonSize = 'large' | 'default' | 'small'

/**
 * 按钮属性
 */
export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  plain?: boolean
  round?: boolean
  circle?: boolean
  icon?: string
}

/**
 * 输入框类型
 */
export type InputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'textarea'

/**
 * 输入框属性
 */
export interface InputProps {
  modelValue?: string | number
  type?: InputType
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  showPassword?: boolean
  maxlength?: number
  minlength?: number
  rows?: number
}

/**
 * 模态框属性
 */
export interface ModalProps {
  modelValue?: boolean
  title?: string
  width?: string | number
  showClose?: boolean
  closeOnClickMask?: boolean
  closeOnPressEscape?: boolean
  confirmText?: string
  cancelText?: string
  showFooter?: boolean
}

/**
 * Loading 属性
 */
export interface LoadingProps {
  visible?: boolean
  text?: string
  fullscreen?: boolean
  background?: string
}
