<script setup lang="ts">
/**
 * 组件示例页面
 */
import { ref } from 'vue';
import { MButton, MInput, MModal, MLoading, MMessage } from '@mono/components';

// 按钮示例
const buttonLoading = ref(false);
const handleButtonClick = () => {
  buttonLoading.value = true;
  setTimeout(() => {
    buttonLoading.value = false;
  }, 2000);
};

// 输入框示例
const inputValue = ref('');
const passwordValue = ref('');

// 模态框示例
const modalVisible = ref(false);
const confirmLoading = ref(false);

const handleConfirm = () => {
  confirmLoading.value = true;
  setTimeout(() => {
    confirmLoading.value = false;
    modalVisible.value = false;
  }, 1500);
};

// 消息提示示例
const showMessage = ref(false);
const messageType = ref<'success' | 'warning' | 'error' | 'info'>('success');

const handleShowMessage = (type: typeof messageType.value) => {
  messageType.value = type;
  showMessage.value = true;
  setTimeout(() => {
    showMessage.value = false;
  }, 3000);
};

// 加载示例
const showLoading = ref(false);
const handleShowLoading = () => {
  showLoading.value = true;
  setTimeout(() => {
    showLoading.value = false;
  }, 2000);
};
</script>

<template>
  <div class="components-view">
    <h1 class="page-title">组件示例</h1>

    <!-- 按钮组件 -->
    <section class="demo-section">
      <h2 class="section-title">Button 按钮</h2>
      <div class="demo-box">
        <div class="demo-row">
          <MButton>默认按钮</MButton>
          <MButton type="primary">主要按钮</MButton>
          <MButton type="success">成功按钮</MButton>
          <MButton type="warning">警告按钮</MButton>
          <MButton type="danger">危险按钮</MButton>
          <MButton type="info">信息按钮</MButton>
        </div>
        <div class="demo-row">
          <MButton size="small">小型按钮</MButton>
          <MButton size="medium">中型按钮</MButton>
          <MButton size="large">大型按钮</MButton>
        </div>
        <div class="demo-row">
          <MButton type="primary" round>圆角按钮</MButton>
          <MButton type="primary" plain>朴素按钮</MButton>
          <MButton type="primary" disabled>禁用按钮</MButton>
          <MButton type="primary" :loading="buttonLoading" @click="handleButtonClick">
            加载按钮
          </MButton>
        </div>
      </div>
    </section>

    <!-- 输入框组件 -->
    <section class="demo-section">
      <h2 class="section-title">Input 输入框</h2>
      <div class="demo-box">
        <div class="demo-row">
          <MInput v-model="inputValue" placeholder="请输入内容" />
        </div>
        <div class="demo-row">
          <MInput v-model="inputValue" placeholder="可清空" clearable />
        </div>
        <div class="demo-row">
          <MInput
            v-model="passwordValue"
            type="password"
            placeholder="密码输入框"
            show-password
          />
        </div>
        <div class="demo-row">
          <MInput
            v-model="inputValue"
            placeholder="字数限制"
            :maxlength="20"
            show-word-limit
          />
        </div>
        <div class="demo-row">
          <MInput size="small" placeholder="小型输入框" />
          <MInput size="medium" placeholder="中型输入框" />
          <MInput size="large" placeholder="大型输入框" />
        </div>
      </div>
    </section>

    <!-- 模态框组件 -->
    <section class="demo-section">
      <h2 class="section-title">Modal 模态框</h2>
      <div class="demo-box">
        <MButton type="primary" @click="modalVisible = true">打开模态框</MButton>
        <MModal
          v-model="modalVisible"
          title="模态框标题"
          :confirm-loading="confirmLoading"
          @confirm="handleConfirm"
        >
          <p>这是模态框的内容区域。</p>
          <p>支持自定义内容和操作。</p>
        </MModal>
      </div>
    </section>

    <!-- 加载组件 -->
    <section class="demo-section">
      <h2 class="section-title">Loading 加载</h2>
      <div class="demo-box">
        <div class="demo-row">
          <MLoading size="small" />
          <MLoading size="medium" />
          <MLoading size="large" />
        </div>
        <div class="demo-row">
          <MLoading text="加载中..." />
        </div>
        <div class="demo-row">
          <MButton type="primary" @click="handleShowLoading">显示全屏加载</MButton>
          <MLoading :loading="showLoading" fullscreen text="加载中，请稍候..." />
        </div>
      </div>
    </section>

    <!-- 消息提示组件 -->
    <section class="demo-section">
      <h2 class="section-title">Message 消息提示</h2>
      <div class="demo-box">
        <div class="demo-row">
          <MButton type="success" @click="handleShowMessage('success')">成功消息</MButton>
          <MButton type="warning" @click="handleShowMessage('warning')">警告消息</MButton>
          <MButton type="danger" @click="handleShowMessage('error')">错误消息</MButton>
          <MButton type="info" @click="handleShowMessage('info')">信息消息</MButton>
        </div>
        <div v-if="showMessage" class="message-container">
          <MMessage
            :type="messageType"
            :message="`这是一条${messageType}类型的消息提示`"
            :visible="showMessage"
            closable
            @close="showMessage = false"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.components-view {
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 32px;
}

.demo-section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.demo-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.message-container {
  margin-top: 16px;
}
</style>
