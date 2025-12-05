/**
 * @monorepo/components
 * 共享组件库入口文件
 */

import type { App } from 'vue'

// 导入组件
import MButton from './Button/Button.vue'
import MInput from './Input/Input.vue'
import MModal from './Modal/Modal.vue'
import MLoading from './Loading/Loading.vue'

// 导出组件
export { MButton, MInput, MModal, MLoading }

// 组件列表
const components = [MButton, MInput, MModal, MLoading]

// 全局安装方法
export function install(app: App): void {
  components.forEach((component) => {
    if (component.name) {
      app.component(component.name, component)
    }
  })
}

// 默认导出
export default {
  install,
}

// 导出类型
export * from './types'
