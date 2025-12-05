<script setup lang="ts">
/**
 * 组件演示页面
 */
import { ref } from 'vue'
import {
  BaseButton,
  BaseInput,
  BaseModal,
  BaseLoading,
  BaseCard,
  useModal,
  useLoading,
} from '@packages/components'
import { formatDate, formatMoney, debounce } from '@packages/utils'

// 模态框状态
const { visible: modalVisible, open: openModal, close: closeModal } = useModal()

// 加载状态
const { loading, withLoading } = useLoading()

// 输入框值
const inputValue = ref('')
const inputError = ref(false)

// 处理按钮点击
function handleButtonClick(type: string) {
  console.log(`点击了 ${type} 按钮`)
}

// 模拟异步加载
async function handleLoadData() {
  await withLoading(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('数据加载完成')
  })
}

// 防抖搜索
const handleSearch = debounce((value: string) => {
  console.log('搜索:', value)
}, 300)

// 处理输入变化
function handleInputChange(value: string | number) {
  handleSearch(String(value))
}

// 切换错误状态
function toggleError() {
  inputError.value = !inputError.value
}

// 格式化示例
const now = new Date()
const formattedDate = formatDate(now, 'YYYY-MM-DD HH:mm:ss')
const formattedMoney = formatMoney(12345.67)
</script>

<template>
  <div class="demo-page">
    <h1 class="page-title">组件演示</h1>

    <!-- 按钮组件 -->
    <section class="demo-section">
      <h2 class="section-title">按钮 BaseButton</h2>
      <BaseCard>
        <div class="demo-group">
          <h3 class="demo-group__title">按钮类型</h3>
          <div class="demo-row">
            <BaseButton type="primary" @click="handleButtonClick('primary')">
              主要按钮
            </BaseButton>
            <BaseButton
              type="secondary"
              @click="handleButtonClick('secondary')"
            >
              次要按钮
            </BaseButton>
            <BaseButton type="success" @click="handleButtonClick('success')">
              成功按钮
            </BaseButton>
            <BaseButton type="warning" @click="handleButtonClick('warning')">
              警告按钮
            </BaseButton>
            <BaseButton type="danger" @click="handleButtonClick('danger')">
              危险按钮
            </BaseButton>
            <BaseButton type="text" @click="handleButtonClick('text')">
              文本按钮
            </BaseButton>
          </div>
        </div>

        <div class="demo-group">
          <h3 class="demo-group__title">按钮尺寸</h3>
          <div class="demo-row">
            <BaseButton size="small">小号按钮</BaseButton>
            <BaseButton size="medium">中号按钮</BaseButton>
            <BaseButton size="large">大号按钮</BaseButton>
          </div>
        </div>

        <div class="demo-group">
          <h3 class="demo-group__title">按钮状态</h3>
          <div class="demo-row">
            <BaseButton disabled>禁用按钮</BaseButton>
            <BaseButton loading>加载中</BaseButton>
            <BaseButton round>圆角按钮</BaseButton>
            <BaseButton block>块级按钮</BaseButton>
          </div>
        </div>
      </BaseCard>
    </section>

    <!-- 输入框组件 -->
    <section class="demo-section">
      <h2 class="section-title">输入框 BaseInput</h2>
      <BaseCard>
        <div class="demo-group">
          <h3 class="demo-group__title">基础用法</h3>
          <div class="demo-col">
            <BaseInput
              v-model="inputValue"
              placeholder="请输入内容"
              clearable
              @input="handleInputChange"
            />
            <p class="demo-tip">当前值: {{ inputValue || '(空)' }}</p>
          </div>
        </div>

        <div class="demo-group">
          <h3 class="demo-group__title">不同状态</h3>
          <div class="demo-col">
            <BaseInput placeholder="禁用状态" disabled />
            <BaseInput placeholder="只读状态" readonly model-value="只读内容" />
            <BaseInput
              placeholder="错误状态"
              :error="inputError"
              error-message="请输入正确的内容"
            />
            <BaseButton size="small" @click="toggleError">
              切换错误状态
            </BaseButton>
          </div>
        </div>

        <div class="demo-group">
          <h3 class="demo-group__title">字数统计</h3>
          <BaseInput
            placeholder="最多输入 50 个字符"
            :maxlength="50"
            show-count
            clearable
          />
        </div>
      </BaseCard>
    </section>

    <!-- 模态框组件 -->
    <section class="demo-section">
      <h2 class="section-title">模态框 BaseModal</h2>
      <BaseCard>
        <div class="demo-row">
          <BaseButton @click="openModal()">打开模态框</BaseButton>
        </div>

        <BaseModal
          v-model="modalVisible"
          title="模态框标题"
          @confirm="closeModal()"
          @cancel="closeModal()"
        >
          <p>这是模态框的内容区域。</p>
          <p>点击确认或取消按钮关闭模态框。</p>
        </BaseModal>
      </BaseCard>
    </section>

    <!-- 加载组件 -->
    <section class="demo-section">
      <h2 class="section-title">加载 BaseLoading</h2>
      <BaseCard>
        <div class="demo-row">
          <BaseButton @click="handleLoadData"> 点击加载数据 (2秒) </BaseButton>
        </div>
        <div class="loading-container">
          <BaseLoading :loading="loading" text="加载中..." />
          <p v-if="!loading">内容区域</p>
        </div>
      </BaseCard>
    </section>

    <!-- 工具函数示例 -->
    <section class="demo-section">
      <h2 class="section-title">工具函数 @packages/utils</h2>
      <BaseCard>
        <div class="demo-group">
          <h3 class="demo-group__title">日期格式化</h3>
          <p class="demo-value">{{ formattedDate }}</p>
        </div>
        <div class="demo-group">
          <h3 class="demo-group__title">金额格式化</h3>
          <p class="demo-value">{{ formattedMoney }}</p>
        </div>
      </BaseCard>
    </section>
  </div>
</template>

<style scoped>
.demo-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
}

.demo-group {
  margin-bottom: 24px;
}

.demo-group:last-child {
  margin-bottom: 0;
}

.demo-group__title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 12px;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.demo-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}

.demo-tip {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.demo-value {
  font-family: 'Fira Code', monospace;
  background: #f3f4f6;
  padding: 8px 12px;
  border-radius: 6px;
  display: inline-block;
}

.loading-container {
  position: relative;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  border-radius: 8px;
  margin-top: 16px;
}
</style>
