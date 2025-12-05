<script setup lang="ts">
/**
 * 注册页面
 */
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { BaseButton, BaseInput, BaseCard } from '@packages/components'
import { useUserStore } from '@/stores/user'
import { isEmail, getPasswordStrength } from '@packages/utils'

const router = useRouter()
const userStore = useUserStore()

// 表单数据
const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false,
})

// 表单错误
const errors = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: '',
})

// 加载状态
const loading = ref(false)

// 密码强度
const passwordStrength = computed(() => {
  if (!formData.password) return 0
  return getPasswordStrength(formData.password)
})

// 密码强度描述
const strengthText = computed(() => {
  const texts = ['', '弱', '较弱', '中等', '强']
  return texts[passwordStrength.value] || ''
})

// 密码强度颜色
const strengthColor = computed(() => {
  const colors = ['', '#ef4444', '#f59e0b', '#eab308', '#10b981']
  return colors[passwordStrength.value] || ''
})

// 表单是否有效
const isFormValid = computed(() => {
  return (
    formData.username.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.password.trim() !== '' &&
    formData.confirmPassword.trim() !== '' &&
    formData.agree
  )
})

// 验证表单
function validateForm(): boolean {
  let isValid = true

  // 验证用户名
  if (!formData.username.trim()) {
    errors.username = '请输入用户名'
    isValid = false
  } else if (formData.username.length < 3) {
    errors.username = '用户名至少3个字符'
    isValid = false
  } else if (formData.username.length > 20) {
    errors.username = '用户名最多20个字符'
    isValid = false
  } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
    errors.username = '用户名只能包含字母、数字和下划线'
    isValid = false
  } else {
    errors.username = ''
  }

  // 验证邮箱
  if (!formData.email.trim()) {
    errors.email = '请输入邮箱'
    isValid = false
  } else if (!isEmail(formData.email)) {
    errors.email = '请输入有效的邮箱地址'
    isValid = false
  } else {
    errors.email = ''
  }

  // 验证密码
  if (!formData.password) {
    errors.password = '请输入密码'
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = '密码长度不能少于6位'
    isValid = false
  } else if (passwordStrength.value < 2) {
    errors.password = '密码强度太弱，请使用更复杂的密码'
    isValid = false
  } else {
    errors.password = ''
  }

  // 验证确认密码
  if (!formData.confirmPassword) {
    errors.confirmPassword = '请确认密码'
    isValid = false
  } else if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = '两次输入的密码不一致'
    isValid = false
  } else {
    errors.confirmPassword = ''
  }

  // 验证同意协议
  if (!formData.agree) {
    errors.agree = '请阅读并同意用户协议'
    isValid = false
  } else {
    errors.agree = ''
  }

  return isValid
}

// 处理注册
async function handleRegister() {
  if (!validateForm()) return

  loading.value = true

  try {
    await userStore.register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    })

    // 注册成功，跳转首页
    router.push('/')
  } catch (error) {
    const message = error instanceof Error ? error.message : '注册失败'
    // 根据错误信息设置相应的字段错误
    if (message.includes('用户名')) {
      errors.username = message
    } else if (message.includes('邮箱')) {
      errors.email = message
    } else {
      errors.username = message
    }
  } finally {
    loading.value = false
  }
}

// 跳转登录
function goToLogin() {
  router.push('/login')
}
</script>

<template>
  <div class="register-page">
    <div class="register-container">
      <!-- Logo 和标题 -->
      <div class="register-header">
        <div class="register-logo">⚡</div>
        <h1 class="register-title">Vue3 Monorepo</h1>
        <p class="register-subtitle">创建您的账户</p>
      </div>

      <!-- 注册表单 -->
      <BaseCard class="register-card">
        <form class="register-form" @submit.prevent="handleRegister">
          <!-- 用户名输入 -->
          <div class="form-item">
            <label class="form-label">用户名</label>
            <BaseInput
              v-model="formData.username"
              placeholder="请输入用户名（3-20个字符）"
              :error="!!errors.username"
              :error-message="errors.username"
              :maxlength="20"
              clearable
              @input="errors.username = ''"
            >
              <template #prefix>👤</template>
            </BaseInput>
          </div>

          <!-- 邮箱输入 -->
          <div class="form-item">
            <label class="form-label">邮箱</label>
            <BaseInput
              v-model="formData.email"
              type="email"
              placeholder="请输入邮箱"
              :error="!!errors.email"
              :error-message="errors.email"
              clearable
              @input="errors.email = ''"
            >
              <template #prefix>📧</template>
            </BaseInput>
          </div>

          <!-- 密码输入 -->
          <div class="form-item">
            <label class="form-label">密码</label>
            <BaseInput
              v-model="formData.password"
              type="password"
              placeholder="请输入密码（至少6位）"
              :error="!!errors.password"
              :error-message="errors.password"
              @input="errors.password = ''"
            >
              <template #prefix>🔒</template>
            </BaseInput>
            <!-- 密码强度指示器 -->
            <div v-if="formData.password" class="password-strength">
              <div class="strength-bar">
                <div
                  v-for="i in 4"
                  :key="i"
                  class="strength-segment"
                  :class="{ active: i <= passwordStrength }"
                  :style="{
                    backgroundColor: i <= passwordStrength ? strengthColor : '',
                  }"
                />
              </div>
              <span class="strength-text" :style="{ color: strengthColor }">
                {{ strengthText }}
              </span>
            </div>
          </div>

          <!-- 确认密码 -->
          <div class="form-item">
            <label class="form-label">确认密码</label>
            <BaseInput
              v-model="formData.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              :error="!!errors.confirmPassword"
              :error-message="errors.confirmPassword"
              @input="errors.confirmPassword = ''"
            >
              <template #prefix>🔒</template>
            </BaseInput>
          </div>

          <!-- 同意协议 -->
          <div class="form-item">
            <label class="checkbox-label" :class="{ error: !!errors.agree }">
              <input v-model="formData.agree" type="checkbox" />
              <span>
                我已阅读并同意
                <a href="#" class="link">用户协议</a>
                和
                <a href="#" class="link">隐私政策</a>
              </span>
            </label>
            <span v-if="errors.agree" class="error-text">{{
              errors.agree
            }}</span>
          </div>

          <!-- 注册按钮 -->
          <div class="form-item">
            <BaseButton
              type="primary"
              block
              :loading="loading"
              :disabled="!isFormValid"
              @click="handleRegister"
            >
              注册
            </BaseButton>
          </div>

          <!-- 登录链接 -->
          <div class="form-footer">
            <span>已有账号?</span>
            <a class="login-link" @click="goToLogin">立即登录</a>
          </div>
        </form>
      </BaseCard>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-container {
  width: 100%;
  max-width: 420px;
}

.register-header {
  text-align: center;
  margin-bottom: 32px;
}

.register-logo {
  font-size: 48px;
  margin-bottom: 16px;
}

.register-title {
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.register-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}

.register-card {
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;
}

.checkbox-label.error {
  color: #ef4444;
}

.checkbox-label input {
  width: 16px;
  height: 16px;
  cursor: pointer;
  margin-top: 2px;
}

.checkbox-label .link {
  color: var(--color-primary);
}

.checkbox-label .link:hover {
  text-decoration: underline;
}

.error-text {
  font-size: 12px;
  color: #ef4444;
}

.password-strength {
  display: flex;
  align-items: center;
  gap: 12px;
}

.strength-bar {
  display: flex;
  gap: 4px;
  flex: 1;
}

.strength-segment {
  height: 4px;
  flex: 1;
  background: #e5e7eb;
  border-radius: 2px;
  transition: background-color 0.2s;
}

.strength-segment.active {
  background: var(--color-primary);
}

.strength-text {
  font-size: 12px;
  font-weight: 500;
  min-width: 32px;
}

.form-footer {
  text-align: center;
  font-size: 14px;
  color: #6b7280;
}

.login-link {
  color: var(--color-primary);
  font-weight: 500;
  cursor: pointer;
  margin-left: 4px;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
