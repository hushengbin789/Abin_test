<script setup lang="ts">
/**
 * Hooks 示例页面
 */
import { ref, computed } from 'vue';
import { MButton, MInput } from '@mono/components';
import {
  useLoading,
  useToggle,
  useDebounce,
  useRequest,
} from '@mono/hooks';

// useLoading 示例
const { loading, wrapLoading } = useLoading();
const loadingResult = ref('');

const handleLoadingDemo = async () => {
  await wrapLoading(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    loadingResult.value = `请求完成于 ${new Date().toLocaleTimeString()}`;
  });
};

// useToggle 示例
const { state: toggleState, toggle } = useToggle(false);
const { state: customToggleState, toggle: customToggle } = useToggle('关闭', '开启');

// useDebounce 示例
const searchText = ref('');
const { debouncedValue } = useDebounce(searchText, 500);
const searchCount = ref(0);

// 模拟搜索结果
const searchResult = computed(() => {
  if (!debouncedValue.value) return [];
  searchCount.value++;
  return [`结果1: ${debouncedValue.value}`, `结果2: ${debouncedValue.value}`, `结果3: ${debouncedValue.value}`];
});

// useRequest 示例
interface UserData {
  id: number;
  name: string;
  email: string;
}

const mockFetchUser = async (id: number): Promise<UserData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id,
    name: `用户 ${id}`,
    email: `user${id}@example.com`,
  };
};

const { data: userData, loading: userLoading, run: fetchUser } = useRequest(mockFetchUser, {
  manual: true,
});

const userId = ref(1);
const handleFetchUser = () => {
  fetchUser(userId.value);
  userId.value++;
};
</script>

<template>
  <div class="hooks-view">
    <h1 class="page-title">Hooks 示例</h1>

    <!-- useLoading 示例 -->
    <section class="demo-section">
      <h2 class="section-title">useLoading - 加载状态管理</h2>
      <div class="demo-box">
        <p class="demo-desc">
          <code>useLoading</code> 提供了便捷的加载状态管理，支持手动控制和自动包装异步函数。
        </p>
        <div class="demo-row">
          <MButton type="primary" :loading="loading" @click="handleLoadingDemo">
            {{ loading ? '加载中...' : '执行异步操作' }}
          </MButton>
          <span class="demo-result">{{ loadingResult }}</span>
        </div>
      </div>
    </section>

    <!-- useToggle 示例 -->
    <section class="demo-section">
      <h2 class="section-title">useToggle - 状态切换</h2>
      <div class="demo-box">
        <p class="demo-desc">
          <code>useToggle</code> 提供了简单的布尔值或自定义值的切换功能。
        </p>
        <div class="demo-row">
          <MButton type="primary" @click="toggle()">切换布尔值</MButton>
          <span class="demo-result">当前状态: {{ toggleState ? '开启' : '关闭' }}</span>
        </div>
        <div class="demo-row">
          <MButton type="primary" @click="customToggle()">切换自定义值</MButton>
          <span class="demo-result">当前状态: {{ customToggleState }}</span>
        </div>
      </div>
    </section>

    <!-- useDebounce 示例 -->
    <section class="demo-section">
      <h2 class="section-title">useDebounce - 防抖</h2>
      <div class="demo-box">
        <p class="demo-desc">
          <code>useDebounce</code> 提供了值的防抖功能，适用于搜索输入等场景。
        </p>
        <div class="demo-row">
          <MInput v-model="searchText" placeholder="输入搜索关键词（500ms 防抖）" clearable />
        </div>
        <div class="demo-info">
          <p>原始值: {{ searchText }}</p>
          <p>防抖值: {{ debouncedValue }}</p>
          <p>搜索次数: {{ searchCount }}</p>
        </div>
        <div v-if="searchResult.length" class="demo-results">
          <p>搜索结果:</p>
          <ul>
            <li v-for="(item, index) in searchResult" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- useRequest 示例 -->
    <section class="demo-section">
      <h2 class="section-title">useRequest - 请求管理</h2>
      <div class="demo-box">
        <p class="demo-desc">
          <code>useRequest</code> 提供了完整的请求状态管理，包括加载状态、数据和错误处理。
        </p>
        <div class="demo-row">
          <MButton type="primary" :loading="userLoading" @click="handleFetchUser">
            获取用户信息 (ID: {{ userId }})
          </MButton>
        </div>
        <div v-if="userData" class="demo-info">
          <p>用户ID: {{ userData.id }}</p>
          <p>用户名: {{ userData.name }}</p>
          <p>邮箱: {{ userData.email }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hooks-view {
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

.demo-desc {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

.demo-desc code {
  background-color: #f5f7fa;
  padding: 2px 6px;
  border-radius: 4px;
  color: #409eff;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.demo-result {
  color: #666;
  font-size: 14px;
}

.demo-info {
  background-color: #f5f7fa;
  padding: 16px;
  border-radius: 8px;
}

.demo-info p {
  margin: 4px 0;
  font-size: 14px;
  color: #333;
}

.demo-results {
  background-color: #f5f7fa;
  padding: 16px;
  border-radius: 8px;
}

.demo-results p {
  font-weight: 600;
  margin-bottom: 8px;
}

.demo-results ul {
  margin-left: 20px;
}

.demo-results li {
  list-style: disc;
  margin: 4px 0;
  font-size: 14px;
  color: #666;
}
</style>
