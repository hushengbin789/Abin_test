/**
 * Input 组件类型定义
 */

/** 输入框类型 */
export type InputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'textarea';

/** 输入框大小 */
export type InputSize = 'small' | 'medium' | 'large';

/** 输入框属性 */
export interface InputProps {
  /** 绑定值 */
  modelValue?: string | number;
  /** 输入框类型 */
  type?: InputType;
  /** 输入框大小 */
  size?: InputSize;
  /** 占位符 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否可清空 */
  clearable?: boolean;
  /** 是否显示密码切换 */
  showPassword?: boolean;
  /** 最大长度 */
  maxlength?: number;
  /** 是否显示字数统计 */
  showWordLimit?: boolean;
  /** 前缀图标 */
  prefixIcon?: string;
  /** 后缀图标 */
  suffixIcon?: string;
  /** 原生 name 属性 */
  name?: string;
  /** 原生 autocomplete 属性 */
  autocomplete?: string;
}
