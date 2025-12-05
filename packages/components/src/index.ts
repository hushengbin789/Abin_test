/**
 * 组件库入口
 * 导出所有共享组件
 */

import type { App } from 'vue'

// 导出组件
export { default as BaseButton } from './components/BaseButton/BaseButton.vue'
export { default as BaseInput } from './components/BaseInput/BaseInput.vue'
export { default as BaseModal } from './components/BaseModal/BaseModal.vue'
export { default as BaseLoading } from './components/BaseLoading/BaseLoading.vue'
export { default as BaseCard } from './components/BaseCard/BaseCard.vue'

// 导出类型
export * from './types'

// 导出组合式函数
export * from './composables'

// 组件列表
import BaseButton from './components/BaseButton/BaseButton.vue'
import BaseInput from './components/BaseInput/BaseInput.vue'
import BaseModal from './components/BaseModal/BaseModal.vue'
import BaseLoading from './components/BaseLoading/BaseLoading.vue'
import BaseCard from './components/BaseCard/BaseCard.vue'

const components = {
  BaseButton,
  BaseInput,
  BaseModal,
  BaseLoading,
  BaseCard,
}

/**
 * 插件安装函数
 * 支持全局注册所有组件
 */
export function install(app: App): void {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
  })
}

export default {
  install,
}
