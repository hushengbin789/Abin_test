/**
 * 应用全局状态
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { localCache } from '@monorepo/shared'
import { STORAGE_KEYS, THEME_MODE } from '@monorepo/shared'

export const useAppStore = defineStore('app', () => {
  // 主题
  const theme = ref<string>(localCache.get(STORAGE_KEYS.THEME, THEME_MODE.LIGHT) as string)

  // 侧边栏折叠状态
  const sidebarCollapsed = ref<boolean>(localCache.get(STORAGE_KEYS.SIDEBAR_COLLAPSED, false) as boolean)

  /**
   * 设置主题
   */
  const setTheme = (newTheme: string) => {
    theme.value = newTheme
    localCache.set(STORAGE_KEYS.THEME, newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  /**
   * 切换侧边栏折叠状态
   */
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
    localCache.set(STORAGE_KEYS.SIDEBAR_COLLAPSED, sidebarCollapsed.value)
  }

  return {
    theme,
    sidebarCollapsed,
    setTheme,
    toggleSidebar,
  }
})
