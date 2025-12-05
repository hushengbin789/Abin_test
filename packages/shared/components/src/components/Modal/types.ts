/**
 * Modal 组件类型定义
 */

/** 模态框属性 */
export interface ModalProps {
  /** 是否显示 */
  modelValue?: boolean;
  /** 标题 */
  title?: string;
  /** 宽度 */
  width?: string | number;
  /** 是否显示关闭按钮 */
  showClose?: boolean;
  /** 是否点击遮罩关闭 */
  closeOnClickOverlay?: boolean;
  /** 是否按 ESC 关闭 */
  closeOnEsc?: boolean;
  /** 是否显示底部 */
  showFooter?: boolean;
  /** 确认按钮文字 */
  confirmText?: string;
  /** 取消按钮文字 */
  cancelText?: string;
  /** 确认按钮加载状态 */
  confirmLoading?: boolean;
  /** z-index */
  zIndex?: number;
}
