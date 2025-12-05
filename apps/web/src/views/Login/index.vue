<script setup lang="ts">
/**
 * 登录页面
 */
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseButton, BaseInput, BaseCard } from '@packages/components'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 表单数据
const formData = reactive({
  account: '',
  password: '',
  remember: false,
})

// 表单错误
const errors = reactive({
  account: '',
  password: '',
})

// 加载状态
const loading = ref(false)

// 表单是否有效
const isFormValid = computed(() => {
  return formData.account.trim() !== '' && formData.password.trim() !== ''
})

// 验证表单
function validateForm(): boolean {
  let isValid = true

  // 验证账号
  if (!formData.account.trim()) {
    errors.account = '请输入用户名或邮箱'
    isValid = false
  } else {
    errors.account = ''
  }

  // 验证密码
  if (!formData.password) {
    errors.password = '请输入密码'
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = '密码长度不能少于6位'
    isValid = false
  } else {
    errors.password = ''
  }

  return isValid
}

// 处理登录
async function handleLogin() {
  if (!validateForm()) return

  loading.value = true

  try {
    await userStore.login({
      account: formData.account,
      password: formData.password,
      remember: formData.remember,
    })

    // 登录成功，跳转到目标页面或首页
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (error) {
    const message = error instanceof Error ? error.message : '登录失败'
    errors.account = message
  } finally {
    loading.value = false
  }
}

// 跳转注册
function goToRegister() {
  router.push('/register')
}

// 测试账号提示
const testAccounts = [
  { account: 'admin', password: '123456', role: '管理员' },
  { account: 'user', password: '123456', role: '普通用户' },
]

// 快速填充测试账号
function fillTestAccount(account: string, password: string) {
  formData.account = account
  formData.password = password
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Logo 和标题 -->
      <div class="login-header">
        <div class="login-logo">⚡</div>
        <h1 class="login-title">Vue3 Monorepo</h1>
        <p class="login-subtitle">登录到您的账户</p>
      </div>

      <!-- 登录表单 -->
      <BaseCard class="login-card">
        <form class="login-form" @submit.prevent="handleLogin">
          <!-- 账号输入 -->
          <div class="form-item">
            <label class="form-label">用户名 / 邮箱</label>
            <BaseInput
              v-model="formData.account"
              placeholder="请输入用户名或邮箱"
              :error="!!errors.account"
              :error-message="errors.account"
              clearable
              @input="errors.account = ''"
            >
              <template #prefix>👤</template>
            </BaseInput>
          </div>

          <!-- 密码输入 -->
          <div class="form-item">
            <label class="form-label">密码</label>
            <BaseInput
              v-model="formData.password"
              type="password"
              placeholder="请输入密码"
              :error="!!errors.password"
              :error-message="errors.password"
              @input="errors.password = ''"
            >
              <template #prefix>🔒</template>
            </BaseInput>
          </div>

          <!-- 记住登录 -->
          <div class="form-item form-item--inline">
            <label class="checkbox-label">
              <input v-model="formData.remember" type="checkbox" />
              <span>记住登录状态</span>
            </label>
            <a href="#" class="forgot-link">忘记密码?</a>
          </div>

          <!-- 登录按钮 -->
          <div class="form-item">
            <BaseButton
              type="primary"
              block
              :loading="loading"
              :disabled="!isFormValid"
              @click="handleLogin"
            >
              登录
            </BaseButton>
          </div>

          <!-- 注册链接 -->
          <div class="form-footer">
            <span>还没有账号?</span>
            <a class="register-link" @click="goToRegister">立即注册</a>
          </div>
        </form>
      </BaseCard>

      <!-- 测试账号提示 -->
      <div class="test-accounts">
        <p class="test-accounts__title">📋 测试账号</p>
        <div class="test-accounts__list">
          <div
            v-for="item in testAccounts"
            :key="item.account"
            class="test-account"
            @click="fillTestAccount(item.account, item.password)"
          >
            <span class="test-account__info">
              {{ item.account }} / {{ item.password }}
            </span>
            <span class="test-account__role">{{ item.role }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 420px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-logo {
  font-size: 48px;
  margin-bottom: 16px;
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.login-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}

.login-card {
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item--inline {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;
}

.checkbox-label input {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.forgot-link {
  font-size: 14px;
  color: var(--color-primary);
  cursor: pointer;
}

.forgot-link:hover {
  text-decoration: underline;
}

.form-footer {
  text-align: center;
  font-size: 14px;
  color: #6b7280;
}

.register-link {
  color: var(--color-primary);
  font-weight: 500;
  cursor: pointer;
  margin-left: 4px;
}

.register-link:hover {
  text-decoration: underline;
}

.test-accounts {
  margin-top: 24px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.test-accounts__title {
  font-size: 14px;
  color: white;
  margin-bottom: 12px;
  font-weight: 500;
}

.test-accounts__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.test-account {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.test-account:hover {
  background: rgba(255, 255, 255, 0.25);
}

.test-account__info {
  font-size: 13px;
  color: white;
  font-family: 'Fira Code', monospace;
}

.test-account__role {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}
</style>
