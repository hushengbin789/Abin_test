/**
 * 应用全局状态管理
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 状态
  const sidebarCollapsed = ref(false)
  const theme = ref<'light' | 'dark'>('light')
  const locale = ref('zh-CN')
  const loading = ref(false)

  // 计算属性
  const isDark = computed(() => theme.value === 'dark')

  // 操作方法

  /**
   * 切换侧边栏折叠状态
   */
  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  /**
   * 设置侧边栏折叠状态
   */
  function setSidebarCollapsed(collapsed: boolean) {
    sidebarCollapsed.value = collapsed
  }

  /**
   * 切换主题
   */
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    updateThemeClass()
  }

  /**
   * 设置主题
   */
  function setTheme(newTheme: 'light' | 'dark') {
    theme.value = newTheme
    updateThemeClass()
  }

  /**
   * 更新主题类名
   */
  function updateThemeClass() {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  /**
   * 设置语言
   */
  function setLocale(newLocale: string) {
    locale.value = newLocale
  }

  /**
   * 设置加载状态
   */
  function setLoading(isLoading: boolean) {
    loading.value = isLoading
  }

  return {
    // 状态
    sidebarCollapsed,
    theme,
    locale,
    loading,
    // 计算属性
    isDark,
    // 方法
    toggleSidebar,
    setSidebarCollapsed,
    toggleTheme,
    setTheme,
    setLocale,
    setLoading,
  }
})
