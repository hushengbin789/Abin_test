<script setup lang="ts">
/**
 * 个人中心页面
 */
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseModal } from '@packages/components'
import { useUserStore } from '@/stores/user'
import { formatDateTime } from '@packages/utils'

const router = useRouter()
const userStore = useUserStore()

// 用户信息
const userInfo = computed(() => userStore.userInfo)

// 修改密码弹窗
const passwordModalVisible = ref(false)
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const passwordErrors = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const passwordLoading = ref(false)

// 打开修改密码弹窗
function openPasswordModal() {
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
  passwordErrors.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
  passwordModalVisible.value = true
}

// 验证密码表单
function validatePasswordForm(): boolean {
  let isValid = true

  if (!passwordForm.value.oldPassword) {
    passwordErrors.value.oldPassword = '请输入原密码'
    isValid = false
  } else {
    passwordErrors.value.oldPassword = ''
  }

  if (!passwordForm.value.newPassword) {
    passwordErrors.value.newPassword = '请输入新密码'
    isValid = false
  } else if (passwordForm.value.newPassword.length < 6) {
    passwordErrors.value.newPassword = '密码长度不能少于6位'
    isValid = false
  } else {
    passwordErrors.value.newPassword = ''
  }

  if (!passwordForm.value.confirmPassword) {
    passwordErrors.value.confirmPassword = '请确认新密码'
    isValid = false
  } else if (
    passwordForm.value.confirmPassword !== passwordForm.value.newPassword
  ) {
    passwordErrors.value.confirmPassword = '两次输入的密码不一致'
    isValid = false
  } else {
    passwordErrors.value.confirmPassword = ''
  }

  return isValid
}

// 提交修改密码
async function handleChangePassword() {
  if (!validatePasswordForm()) return

  passwordLoading.value = true
  try {
    // TODO: 调用修改密码 API
    console.log('修改密码:', passwordForm.value)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    passwordModalVisible.value = false
    alert('密码修改成功')
  } catch (error) {
    passwordErrors.value.oldPassword = '原密码错误'
  } finally {
    passwordLoading.value = false
  }
}

// 登出
async function handleLogout() {
  if (confirm('确定要退出登录吗？')) {
    await userStore.logout()
    router.push('/login')
  }
}

// 角色标签颜色
const roleColor = computed(() => {
  const colors: Record<string, string> = {
    admin: '#ef4444',
    user: '#3b82f6',
    guest: '#6b7280',
  }
  return colors[userInfo.value?.role || ''] || '#6b7280'
})

// 角色名称
const roleName = computed(() => {
  const names: Record<string, string> = {
    admin: '管理员',
    user: '普通用户',
    guest: '访客',
  }
  return names[userInfo.value?.role || ''] || '未知'
})
</script>

<template>
  <div class="profile-page">
    <h1 class="page-title">个人中心</h1>

    <div class="profile-content">
      <!-- 用户信息卡片 -->
      <BaseCard class="profile-card">
        <div class="user-header">
          <img
            :src="
              userInfo?.avatar ||
              'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
            "
            :alt="userInfo?.username"
            class="user-avatar"
          />
          <div class="user-info">
            <h2 class="user-name">{{ userInfo?.username }}</h2>
            <span class="user-role" :style="{ backgroundColor: roleColor }">
              {{ roleName }}
            </span>
          </div>
        </div>

        <div class="info-list">
          <div class="info-item">
            <span class="info-label">📧 邮箱</span>
            <span class="info-value">{{ userInfo?.email }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">🆔 用户ID</span>
            <span class="info-value">{{ userInfo?.id }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">📅 注册时间</span>
            <span class="info-value">
              {{
                formatDateTime(userInfo?.createdAt || '', 'YYYY-MM-DD HH:mm')
              }}
            </span>
          </div>
          <div class="info-item">
            <span class="info-label">🔄 更新时间</span>
            <span class="info-value">
              {{
                formatDateTime(userInfo?.updatedAt || '', 'YYYY-MM-DD HH:mm')
              }}
            </span>
          </div>
        </div>
      </BaseCard>

      <!-- 账户操作 -->
      <BaseCard title="账户操作" class="actions-card">
        <div class="actions-list">
          <div class="action-item" @click="openPasswordModal">
            <div class="action-icon">🔑</div>
            <div class="action-content">
              <span class="action-title">修改密码</span>
              <span class="action-desc">更新您的登录密码</span>
            </div>
            <span class="action-arrow">→</span>
          </div>

          <div class="action-item">
            <div class="action-icon">📝</div>
            <div class="action-content">
              <span class="action-title">编辑资料</span>
              <span class="action-desc">修改头像和个人信息</span>
            </div>
            <span class="action-arrow">→</span>
          </div>

          <div class="action-item action-item--danger" @click="handleLogout">
            <div class="action-icon">🚪</div>
            <div class="action-content">
              <span class="action-title">退出登录</span>
              <span class="action-desc">安全退出当前账户</span>
            </div>
            <span class="action-arrow">→</span>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- 修改密码弹窗 -->
    <BaseModal
      v-model="passwordModalVisible"
      title="修改密码"
      :confirm-loading="passwordLoading"
      @confirm="handleChangePassword"
    >
      <div class="password-form">
        <div class="form-item">
          <label class="form-label">原密码</label>
          <BaseInput
            v-model="passwordForm.oldPassword"
            type="password"
            placeholder="请输入原密码"
            :error="!!passwordErrors.oldPassword"
            :error-message="passwordErrors.oldPassword"
          />
        </div>
        <div class="form-item">
          <label class="form-label">新密码</label>
          <BaseInput
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="请输入新密码（至少6位）"
            :error="!!passwordErrors.newPassword"
            :error-message="passwordErrors.newPassword"
          />
        </div>
        <div class="form-item">
          <label class="form-label">确认新密码</label>
          <BaseInput
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="请再次输入新密码"
            :error="!!passwordErrors.confirmPassword"
            :error-message="passwordErrors.confirmPassword"
          />
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 32px;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.profile-card {
  overflow: visible;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e5e7eb;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-name {
  font-size: 24px;
  font-weight: 600;
}

.user-role {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  width: fit-content;
}

.info-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-label {
  font-size: 13px;
  color: #6b7280;
}

.info-value {
  font-size: 15px;
  font-weight: 500;
  color: #111827;
}

.actions-list {
  display: flex;
  flex-direction: column;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  margin: -4px -20px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 8px;
}

.action-item:hover {
  background: #f9fafb;
}

.action-item--danger:hover {
  background: #fef2f2;
}

.action-item--danger .action-title {
  color: #ef4444;
}

.action-icon {
  font-size: 24px;
}

.action-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.action-title {
  font-size: 15px;
  font-weight: 500;
  color: #111827;
}

.action-desc {
  font-size: 13px;
  color: #6b7280;
}

.action-arrow {
  font-size: 18px;
  color: #9ca3af;
}

.password-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

@media (max-width: 640px) {
  .info-list {
    grid-template-columns: 1fr;
  }
}
</style>
