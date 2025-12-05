/**
 * 应用状态管理
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  // 状态
  const sidebarCollapsed = ref(false);
  const theme = ref<'light' | 'dark'>('light');
  const language = ref('zh-CN');

  // 操作
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value;
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme;
  };

  const setLanguage = (newLanguage: string) => {
    language.value = newLanguage;
  };

  return {
    sidebarCollapsed,
    theme,
    language,
    toggleSidebar,
    setTheme,
    setLanguage,
  };
});
