/**
 * Button 组件类型定义
 */

/** 按钮类型 */
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';

/** 按钮大小 */
export type ButtonSize = 'small' | 'medium' | 'large';

/** 按钮属性 */
export interface ButtonProps {
  /** 按钮类型 */
  type?: ButtonType;
  /** 按钮大小 */
  size?: ButtonSize;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 是否为朴素按钮 */
  plain?: boolean;
  /** 是否为圆形按钮 */
  round?: boolean;
  /** 是否为圆角按钮 */
  circle?: boolean;
  /** 原生 type 属性 */
  nativeType?: 'button' | 'submit' | 'reset';
}
