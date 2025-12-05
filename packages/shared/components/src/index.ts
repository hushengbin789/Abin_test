/**
 * @mono/components - Vue 3 组件库
 * 导出所有组件
 */

import type { App, Plugin } from 'vue';

// 导入样式
import './styles/index.css';

// 导入组件
import MButton from './components/Button/Button.vue';
import MInput from './components/Input/Input.vue';
import MModal from './components/Modal/Modal.vue';
import MLoading from './components/Loading/Loading.vue';
import MMessage from './components/Message/Message.vue';

// 导出组件
export { MButton, MInput, MModal, MLoading, MMessage };

// 组件列表
const components = [MButton, MInput, MModal, MLoading, MMessage];

// 安装函数
const install: Plugin = {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name || component.__name || '', component);
    });
  },
};

export default install;

// 导出类型
export type { ButtonProps } from './components/Button/types';
export type { InputProps } from './components/Input/types';
export type { ModalProps } from './components/Modal/types';
