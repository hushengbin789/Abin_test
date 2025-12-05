<script setup lang="ts">
/**
 * 组件展示页面
 */
import { ref } from 'vue'
import { MButton, MInput, MModal, MLoading } from '@monorepo/components'
import { useBoolean } from '@monorepo/hooks'

// 按钮类型
const buttonTypes = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const

// 输入框演示
const inputValue = ref('')
const passwordValue = ref('')
const textareaValue = ref('')

// 模态框演示
const { state: modalVisible, setTrue: openModal, setFalse: closeModal } = useBoolean(false)

// Loading 演示
const { state: loadingVisible, toggle: toggleLoading } = useBoolean(false)

// 模态框确认
const handleConfirm = () => {
  console.log('确认')
  closeModal()
}
</script>

<template>
  <div class="components-page">
    <h1 class="page-title">🧩 组件库示例</h1>
    <p class="page-desc">以下是 @monorepo/components 中的共享组件展示</p>

    <!-- 按钮组件 -->
    <section class="section">
      <h2 class="section__title">Button 按钮</h2>

      <div class="demo-block">
        <h3 class="demo-block__subtitle">基础用法</h3>
        <div class="demo-block__content">
          <MButton v-for="type in buttonTypes" :key="type" :type="type">
            {{ type }}
          </MButton>
        </div>
      </div>

      <div class="demo-block">
        <h3 class="demo-block__subtitle">朴素按钮</h3>
        <div class="demo-block__content">
          <MButton v-for="type in buttonTypes" :key="type" :type="type" plain>
            {{ type }}
          </MButton>
        </div>
      </div>

      <div class="demo-block">
        <h3 class="demo-block__subtitle">按钮尺寸</h3>
        <div class="demo-block__content">
          <MButton type="primary" size="large">大型按钮</MButton>
          <MButton type="primary">默认按钮</MButton>
          <MButton type="primary" size="small">小型按钮</MButton>
        </div>
      </div>

      <div class="demo-block">
        <h3 class="demo-block__subtitle">加载状态</h3>
        <div class="demo-block__content">
          <MButton type="primary" loading>加载中</MButton>
          <MButton type="success" loading>提交中</MButton>
        </div>
      </div>

      <div class="demo-block">
        <h3 class="demo-block__subtitle">禁用状态</h3>
        <div class="demo-block__content">
          <MButton type="primary" disabled>禁用按钮</MButton>
          <MButton type="info" disabled>禁用按钮</MButton>
        </div>
      </div>

      <div class="demo-block">
        <h3 class="demo-block__subtitle">圆角按钮</h3>
        <div class="demo-block__content">
          <MButton type="primary" round>圆角按钮</MButton>
          <MButton type="success" round>圆角按钮</MButton>
        </div>
      </div>
    </section>

    <!-- 输入框组件 -->
    <section class="section">
      <h2 class="section__title">Input 输入框</h2>

      <div class="demo-block">
        <h3 class="demo-block__subtitle">基础用法</h3>
        <div class="demo-block__content demo-block__content--vertical">
          <MInput v-model="inputValue" placeholder="请输入内容" />
          <span class="demo-block__hint">当前值：{{ inputValue || '(空)' }}</span>
        </div>
      </div>

      <div class="demo-block">
        <h3 class="demo-block__subtitle">可清空</h3>
        <div class="demo-block__content demo-block__content--vertical">
          <MInput v-model="inputValue" placeholder="输入后可清空" clearable />
        </div>
      </div>

      <div class="demo-block">
        <h3 class="demo-block__subtitle">密码框</h3>
        <div class="demo-block__content demo-block__content--vertical">
          <MInput
            v-model="passwordValue"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </div>
      </div>

      <div class="demo-block">
        <h3 class="demo-block__subtitle">文本域</h3>
        <div class="demo-block__content demo-block__content--vertical">
          <MInput v-model="textareaValue" type="textarea" placeholder="请输入内容" :rows="4" />
        </div>
      </div>

      <div class="demo-block">
        <h3 class="demo-block__subtitle">禁用状态</h3>
        <div class="demo-block__content demo-block__content--vertical">
          <MInput model-value="禁用状态" disabled />
        </div>
      </div>
    </section>

    <!-- 模态框组件 -->
    <section class="section">
      <h2 class="section__title">Modal 模态框</h2>

      <div class="demo-block">
        <h3 class="demo-block__subtitle">基础用法</h3>
        <div class="demo-block__content">
          <MButton type="primary" @click="openModal">打开模态框</MButton>
        </div>
      </div>

      <MModal v-model="modalVisible" title="提示" @confirm="handleConfirm" @cancel="closeModal">
        <p>这是一段内容，模态框支持按 ESC 键或点击遮罩层关闭。</p>
        <p>你可以在这里放置任何内容。</p>
      </MModal>
    </section>

    <!-- Loading 组件 -->
    <section class="section">
      <h2 class="section__title">Loading 加载</h2>

      <div class="demo-block">
        <h3 class="demo-block__subtitle">区域加载</h3>
        <div class="demo-block__content">
          <MButton type="primary" @click="toggleLoading">
            {{ loadingVisible ? '隐藏' : '显示' }} Loading
          </MButton>
        </div>
        <div class="demo-block__loading-area">
          <p>这是一个加载区域，点击按钮切换加载状态</p>
          <MLoading :visible="loadingVisible" text="加载中..." />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.components-page {
  max-width: 900px;
  margin: 0 auto;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #303133;
  margin-bottom: 8px;
}

.page-desc {
  font-size: 16px;
  color: #606266;
  margin-bottom: 32px;
}

.section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #ebeef5;
  }
}

.demo-block {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  &__subtitle {
    font-size: 14px;
    font-weight: 500;
    color: #606266;
    margin-bottom: 12px;
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;

    &--vertical {
      flex-direction: column;
      align-items: stretch;
      max-width: 400px;
    }
  }

  &__hint {
    font-size: 12px;
    color: #909399;
  }

  &__loading-area {
    position: relative;
    margin-top: 12px;
    padding: 40px;
    background: #f5f7fa;
    border-radius: 8px;
    text-align: center;
    min-height: 120px;
  }
}
</style>
