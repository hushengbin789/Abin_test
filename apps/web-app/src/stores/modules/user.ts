/**
 * 用户状态管理
 */
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

/** 用户信息 */
export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  email: string;
  roles: string[];
}

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string>('');
  const userInfo = ref<UserInfo | null>(null);

  // 计算属性
  const isLoggedIn = computed(() => !!token.value);
  const username = computed(() => userInfo.value?.username || '');
  const roles = computed(() => userInfo.value?.roles || []);

  // 操作
  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info;
  };

  const logout = () => {
    token.value = '';
    userInfo.value = null;
  };

  return {
    token,
    userInfo,
    isLoggedIn,
    username,
    roles,
    setToken,
    setUserInfo,
    logout,
  };
});
