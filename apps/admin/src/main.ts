/**
 * 管理后台入口文件
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 导入组件库
import MonorepoComponents from '@monorepo/components'

// 导入全局样式
import './styles/index.scss'

// 创建应用实例
const app = createApp(App)

// 注册插件
app.use(createPinia())
app.use(router)
app.use(MonorepoComponents)

// 挂载应用
app.mount('#app')
