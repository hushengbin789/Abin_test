/**
 * 应用入口文件
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 导入共享组件库
import MonorepoComponents from '@packages/components'

// 导入全局样式
import './styles/index.css'

// 初始化 Mock 服务（开发环境）
import { setupMock } from './mock'
setupMock()

// 创建应用实例
const app = createApp(App)

// 注册状态管理
app.use(createPinia())

// 注册路由
app.use(router)

// 注册共享组件库
app.use(MonorepoComponents)

// 挂载应用
app.mount('#app')
