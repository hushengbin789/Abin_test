/**
 * 应用入口文件
 */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import MonoComponents from '@mono/components';
import '@mono/components/style.css';

import App from './App.vue';
import router from './router';

import './styles/index.css';

// 创建应用实例
const app = createApp(App);

// 使用插件
app.use(createPinia());
app.use(router);
app.use(MonoComponents);

// 挂载应用
app.mount('#app');
