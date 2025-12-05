<script setup lang="ts">
/**
 * 登录页面
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from '@monorepo/hooks'

const router = useRouter()
const { loading, wrapAsync } = useLoading()

// 表单数据
const form = ref({
  username: '',
  password: '',
  remember: false,
})

// 登录处理
const handleLogin = wrapAsync(async () => {
  // 模拟登录请求
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('登录成功:', form.value)
  router.push('/')
})
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-card__header">
        <span class="login-card__icon">🛠</span>
        <h1 class="login-card__title">管理后台</h1>
        <p class="login-card__subtitle">请登录您的账户</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="login-form__item">
          <label class="login-form__label">用户名</label>
          <MInput v-model="form.username" placeholder="请输入用户名" clearable />
        </div>

        <div class="login-form__item">
          <label class="login-form__label">密码</label>
          <MInput
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </div>

        <div class="login-form__item login-form__item--inline">
          <label class="login-form__checkbox">
            <input v-model="form.remember" type="checkbox" />
            <span>记住我</span>
          </label>
          <a href="#" class="login-form__link">忘记密码？</a>
        </div>

        <MButton type="primary" :loading="loading" class="login-form__submit">
          {{ loading ? '登录中...' : '登录' }}
        </MButton>
      </form>

      <div class="login-card__footer">
        <p>演示账号: admin / 123456</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.2),
    0 10px 20px rgba(0, 0, 0, 0.1);

  &__header {
    text-align: center;
    margin-bottom: 32px;
  }

  &__icon {
    display: inline-block;
    font-size: 48px;
    margin-bottom: 16px;
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 8px;
  }

  &__subtitle {
    font-size: 14px;
    color: #6b7280;
  }

  &__footer {
    margin-top: 24px;
    text-align: center;
    font-size: 12px;
    color: #9ca3af;
  }
}

.login-form {
  &__item {
    margin-bottom: 20px;

    &--inline {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }

  &__checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #6b7280;
    cursor: pointer;

    input {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }

  &__link {
    font-size: 14px;
    color: #3b82f6;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__submit {
    width: 100%;
    height: 44px;
    font-size: 16px;
    margin-top: 8px;
  }
}
</style>
