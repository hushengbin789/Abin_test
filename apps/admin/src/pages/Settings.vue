<script setup lang="ts">
/**
 * 系统设置页面
 */
import { ref } from 'vue'
import { useBoolean } from '@monorepo/hooks'

// 设置项
const settings = ref({
  siteName: 'Vue3 Monorepo',
  siteDescription: '基于 Vue 3 + TypeScript + Vite 的 Monorepo 项目',
  allowRegistration: true,
  emailNotifications: true,
  maintenanceMode: false,
})

// 保存状态
const { state: saving, setTrue: startSaving, setFalse: stopSaving } = useBoolean()

// 保存设置
const handleSave = async () => {
  startSaving()
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('保存设置:', settings.value)
  stopSaving()
}
</script>

<template>
  <div class="settings-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-header__title">系统设置</h1>
      <p class="page-header__desc">配置系统的全局设置</p>
    </div>

    <!-- 设置表单 -->
    <div class="settings-form">
      <!-- 基本设置 -->
      <div class="settings-section">
        <h2 class="settings-section__title">基本设置</h2>

        <div class="form-item">
          <label class="form-item__label">站点名称</label>
          <MInput v-model="settings.siteName" placeholder="请输入站点名称" />
        </div>

        <div class="form-item">
          <label class="form-item__label">站点描述</label>
          <MInput
            v-model="settings.siteDescription"
            type="textarea"
            placeholder="请输入站点描述"
            :rows="3"
          />
        </div>
      </div>

      <!-- 功能开关 -->
      <div class="settings-section">
        <h2 class="settings-section__title">功能开关</h2>

        <div class="switch-item">
          <div class="switch-item__info">
            <span class="switch-item__label">开放注册</span>
            <span class="switch-item__desc">允许新用户注册账号</span>
          </div>
          <label class="switch">
            <input v-model="settings.allowRegistration" type="checkbox" />
            <span class="switch__slider"></span>
          </label>
        </div>

        <div class="switch-item">
          <div class="switch-item__info">
            <span class="switch-item__label">邮件通知</span>
            <span class="switch-item__desc">发送系统通知到用户邮箱</span>
          </div>
          <label class="switch">
            <input v-model="settings.emailNotifications" type="checkbox" />
            <span class="switch__slider"></span>
          </label>
        </div>

        <div class="switch-item switch-item--danger">
          <div class="switch-item__info">
            <span class="switch-item__label">维护模式</span>
            <span class="switch-item__desc">开启后网站将显示维护页面</span>
          </div>
          <label class="switch switch--danger">
            <input v-model="settings.maintenanceMode" type="checkbox" />
            <span class="switch__slider"></span>
          </label>
        </div>
      </div>

      <!-- 保存按钮 -->
      <div class="settings-footer">
        <MButton type="primary" :loading="saving" @click="handleSave">
          {{ saving ? '保存中...' : '保存设置' }}
        </MButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings-page {
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;

  &__title {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 4px;
  }

  &__desc {
    font-size: 14px;
    color: #6b7280;
  }
}

.settings-form {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.settings-section {
  padding: 24px;
  border-bottom: 1px solid #f3f4f6;

  &:last-of-type {
    border-bottom: none;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 20px;
  }
}

.form-item {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  &__label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }
}

.switch-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }

  &--danger {
    background: #fef2f2;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__label {
    font-size: 14px;
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 4px;
  }

  &__desc {
    font-size: 12px;
    color: #6b7280;
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  cursor: pointer;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  &__slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #d1d5db;
    border-radius: 24px;
    transition: 0.3s;

    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      left: 2px;
      bottom: 2px;
      background: #fff;
      border-radius: 50%;
      transition: 0.3s;
    }
  }

  input:checked + &__slider {
    background: #3b82f6;
  }

  input:checked + &__slider::before {
    transform: translateX(20px);
  }

  &--danger input:checked + .switch__slider {
    background: #ef4444;
  }
}

.settings-footer {
  padding: 24px;
  border-top: 1px solid #f3f4f6;
  display: flex;
  justify-content: flex-end;
}
</style>
