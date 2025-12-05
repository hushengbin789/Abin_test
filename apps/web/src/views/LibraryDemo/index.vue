<script setup lang="ts">
/**
 * 第三方库演示页面
 */
import { ref, computed, onMounted } from 'vue'
import { BaseCard, BaseButton, BaseInput } from '@packages/components'

// dayjs 相关
import {
  dayjs,
  formatDateTime,
  formatDateOnly,
  getRelativeTimeFromNow,
  getDateDiff,
  addTime,
  startOf,
  endOf,
  isDateToday,
  isDateThisWeek,
  formatDuration,
  getFriendlyDate,
  dateRangePresets,
} from '@packages/utils'

// js-cookie 相关
import {
  setCookie,
  removeCookie,
  getAllCookies,
  setCookieJSON,
  tokenManager,
} from '@packages/utils'

// lodash 相关
import {
  chunkArray,
  uniqueArray,
  groupArrayBy,
  deepCloneObject,
  pickProps,
  omitProps,
  getProperty,
  isDeepEqual,
  debounceFn,
  throttleFn,
  randomNumber,
  clampNumber,
  toCamelCaseStr,
  toKebabCaseStr,
  truncateStr,
  treeUtils,
} from '@packages/utils'

// qs 相关
import {
  parseQuery,
  stringifyQuery,
  buildUrl,
  createQueryManager,
  paginationQuery,
} from '@packages/utils'

// ============ dayjs 演示 ============
const now = ref(new Date())
const dayjsDemo = computed(() => ({
  formatted: formatDateTime(now.value),
  dateOnly: formatDateOnly(now.value),
  relative: getRelativeTimeFromNow(dayjs().subtract(2, 'hour').toDate()),
  diff: getDateDiff('2024-01-01', now.value, 'day'),
  addDays: addTime(now.value, 7, 'day').format('YYYY-MM-DD'),
  startOfMonth: startOf(now.value, 'month').format('YYYY-MM-DD'),
  endOfMonth: endOf(now.value, 'month').format('YYYY-MM-DD'),
  isToday: isDateToday(now.value),
  isThisWeek: isDateThisWeek(now.value),
  duration: formatDuration(3661),
  friendly: getFriendlyDate(dayjs().subtract(1, 'day').toDate()),
}))

const dateRange = computed(() => {
  const [start, end] = dateRangePresets.last7Days()
  return `${start.format('YYYY-MM-DD')} ~ ${end.format('YYYY-MM-DD')}`
})

// ============ js-cookie 演示 ============
const cookieKey = ref('demo_cookie')
const cookieValue = ref('Hello Cookie!')
const currentCookies = ref<Record<string, string>>({})
const jsonCookieData = ref({ name: 'John', age: 30 })

function handleSetCookie() {
  setCookie(cookieKey.value, cookieValue.value, { expires: 7 })
  refreshCookies()
}

function handleSetJsonCookie() {
  setCookieJSON('user_data', jsonCookieData.value, { expires: 7 })
  refreshCookies()
}

function handleRemoveCookie(key: string) {
  removeCookie(key)
  refreshCookies()
}

function refreshCookies() {
  currentCookies.value = getAllCookies()
}

// Token 管理演示
function handleSetToken() {
  tokenManager.setAccessToken('demo_access_token_' + Date.now())
  tokenManager.setRefreshToken('demo_refresh_token_' + Date.now())
  refreshCookies()
}

function handleClearTokens() {
  tokenManager.clearTokens()
  refreshCookies()
}

// ============ lodash 演示 ============
const lodashDemo = computed(() => {
  // 数组操作
  const arr = [1, 2, 2, 3, 3, 4, 5, 6, 7, 8]
  const objects = [
    { id: 1, type: 'a', name: 'Item 1' },
    { id: 2, type: 'b', name: 'Item 2' },
    { id: 3, type: 'a', name: 'Item 3' },
  ]

  // 对象操作
  const user = {
    id: 1,
    name: 'John',
    email: 'john@example.com',
    password: 'secret',
    profile: {
      age: 30,
      city: 'Beijing',
    },
  }

  return {
    chunk: chunkArray(arr, 3),
    unique: uniqueArray(arr),
    grouped: groupArrayBy(objects, 'type'),
    cloned: deepCloneObject(user),
    picked: pickProps(user, ['id', 'name', 'email']),
    omitted: omitProps(user, ['password']),
    deepGet: getProperty(user, 'profile.city', '未知'),
    isEqual: isDeepEqual({ a: 1 }, { a: 1 }),
    random: randomNumber(1, 100),
    clamped: clampNumber(150, 0, 100),
    camelCase: toCamelCaseStr('hello-world'),
    kebabCase: toKebabCaseStr('helloWorld'),
    truncated: truncateStr('这是一段很长的文字需要截断显示', { length: 15 }),
  }
})

// 树形数据演示
const treeData = [
  {
    id: 1,
    name: '节点1',
    children: [
      { id: 11, name: '节点1-1', children: [] },
      {
        id: 12,
        name: '节点1-2',
        children: [{ id: 121, name: '节点1-2-1', children: [] }],
      },
    ],
  },
  {
    id: 2,
    name: '节点2',
    children: [{ id: 21, name: '节点2-1', children: [] }],
  },
]

const treeDemo = computed(() => ({
  flattened: treeUtils.flatten(treeData),
  found: treeUtils.find(treeData, (n) => n.id === 121),
  path: treeUtils.getPath(treeData, (n) => n.id === 121).map((n) => n.name),
}))

// 防抖演示
const debounceCount = ref(0)
const throttleCount = ref(0)

const debouncedIncrement = debounceFn(() => {
  debounceCount.value++
}, 500)

const throttledIncrement = throttleFn(() => {
  throttleCount.value++
}, 500)

// ============ qs 演示 ============
const qsDemo = computed(() => {
  const queryString =
    'name=John&age=30&tags[]=vue&tags[]=react&user.city=Beijing'
  const params = {
    page: 1,
    pageSize: 10,
    filter: { status: 'active' },
    tags: ['a', 'b'],
  }

  return {
    parsed: parseQuery(queryString),
    stringified: stringifyQuery(params),
    builtUrl: buildUrl('https://api.example.com/users', params),
    pagination: paginationQuery.stringify(2, 20, { keyword: 'test' }),
  }
})

const queryManager = createQueryManager({
  page: 1,
  pageSize: 10,
  keyword: '',
})

const currentParams = ref(queryManager.get())

function handleUpdateQuery() {
  queryManager.set({ page: queryManager.getParam('page') + 1 })
  currentParams.value = queryManager.get()
}

function handleResetQuery() {
  queryManager.reset()
  currentParams.value = queryManager.get()
}

onMounted(() => {
  refreshCookies()
})
</script>

<template>
  <div class="library-demo">
    <h1 class="page-title">第三方库使用演示</h1>
    <p class="page-description">
      展示 dayjs、js-cookie、lodash、qs 等库的封装和使用示例
    </p>

    <!-- dayjs 演示 -->
    <section class="demo-section">
      <h2 class="section-title">📅 dayjs - 日期处理</h2>
      <BaseCard>
        <div class="demo-grid">
          <div class="demo-item">
            <span class="demo-label">格式化日期时间</span>
            <code class="demo-value">{{ dayjsDemo.formatted }}</code>
          </div>
          <div class="demo-item">
            <span class="demo-label">仅日期</span>
            <code class="demo-value">{{ dayjsDemo.dateOnly }}</code>
          </div>
          <div class="demo-item">
            <span class="demo-label">相对时间（2小时前）</span>
            <code class="demo-value">{{ dayjsDemo.relative }}</code>
          </div>
          <div class="demo-item">
            <span class="demo-label">距离2024-01-01的天数</span>
            <code class="demo-value">{{ dayjsDemo.diff }} 天</code>
          </div>
          <div class="demo-item">
            <span class="demo-label">7天后</span>
            <code class="demo-value">{{ dayjsDemo.addDays }}</code>
          </div>
          <div class="demo-item">
            <span class="demo-label">月初</span>
            <code class="demo-value">{{ dayjsDemo.startOfMonth }}</code>
          </div>
          <div class="demo-item">
            <span class="demo-label">月末</span>
            <code class="demo-value">{{ dayjsDemo.endOfMonth }}</code>
          </div>
          <div class="demo-item">
            <span class="demo-label">是否今天</span>
            <code class="demo-value">{{ dayjsDemo.isToday }}</code>
          </div>
          <div class="demo-item">
            <span class="demo-label">持续时间 (3661秒)</span>
            <code class="demo-value">{{ dayjsDemo.duration }}</code>
          </div>
          <div class="demo-item">
            <span class="demo-label">友好日期（昨天）</span>
            <code class="demo-value">{{ dayjsDemo.friendly }}</code>
          </div>
          <div class="demo-item">
            <span class="demo-label">最近7天范围</span>
            <code class="demo-value">{{ dateRange }}</code>
          </div>
        </div>
      </BaseCard>
    </section>

    <!-- js-cookie 演示 -->
    <section class="demo-section">
      <h2 class="section-title">🍪 js-cookie - Cookie 操作</h2>
      <BaseCard>
        <div class="demo-group">
          <h3 class="demo-group-title">基础 Cookie 操作</h3>
          <div class="demo-row">
            <BaseInput v-model="cookieKey" placeholder="Cookie 键" />
            <BaseInput v-model="cookieValue" placeholder="Cookie 值" />
            <BaseButton type="primary" @click="handleSetCookie">
              设置 Cookie
            </BaseButton>
          </div>
        </div>

        <div class="demo-group">
          <h3 class="demo-group-title">JSON Cookie</h3>
          <div class="demo-row">
            <code>{{ JSON.stringify(jsonCookieData) }}</code>
            <BaseButton type="success" @click="handleSetJsonCookie">
              设置 JSON Cookie
            </BaseButton>
          </div>
        </div>

        <div class="demo-group">
          <h3 class="demo-group-title">Token 管理</h3>
          <div class="demo-row">
            <BaseButton @click="handleSetToken">设置 Token</BaseButton>
            <BaseButton type="danger" @click="handleClearTokens">
              清除 Token
            </BaseButton>
            <span class="demo-tip">
              有效 Token: {{ tokenManager.hasValidToken() ? '是' : '否' }}
            </span>
          </div>
        </div>

        <div class="demo-group">
          <h3 class="demo-group-title">当前所有 Cookie</h3>
          <div class="cookie-list">
            <div
              v-for="(value, key) in currentCookies"
              :key="key"
              class="cookie-item"
            >
              <span class="cookie-key">{{ key }}</span>
              <span class="cookie-value">{{
                truncateStr(value, { length: 30 })
              }}</span>
              <BaseButton
                type="danger"
                size="small"
                @click="handleRemoveCookie(String(key))"
              >
                删除
              </BaseButton>
            </div>
            <p
              v-if="Object.keys(currentCookies).length === 0"
              class="empty-tip"
            >
              暂无 Cookie
            </p>
          </div>
        </div>
      </BaseCard>
    </section>

    <!-- lodash 演示 -->
    <section class="demo-section">
      <h2 class="section-title">🛠️ lodash - 工具函数</h2>
      <BaseCard>
        <div class="demo-group">
          <h3 class="demo-group-title">数组操作</h3>
          <div class="demo-grid">
            <div class="demo-item">
              <span class="demo-label">分块 (chunk)</span>
              <code class="demo-value">{{
                JSON.stringify(lodashDemo.chunk)
              }}</code>
            </div>
            <div class="demo-item">
              <span class="demo-label">去重 (unique)</span>
              <code class="demo-value">{{
                JSON.stringify(lodashDemo.unique)
              }}</code>
            </div>
            <div class="demo-item full-width">
              <span class="demo-label">分组 (groupBy)</span>
              <code class="demo-value">{{
                JSON.stringify(lodashDemo.grouped)
              }}</code>
            </div>
          </div>
        </div>

        <div class="demo-group">
          <h3 class="demo-group-title">对象操作</h3>
          <div class="demo-grid">
            <div class="demo-item">
              <span class="demo-label">选取属性 (pick)</span>
              <code class="demo-value">{{
                JSON.stringify(lodashDemo.picked)
              }}</code>
            </div>
            <div class="demo-item">
              <span class="demo-label">排除属性 (omit)</span>
              <code class="demo-value">{{
                JSON.stringify(lodashDemo.omitted)
              }}</code>
            </div>
            <div class="demo-item">
              <span class="demo-label">深层获取 (get)</span>
              <code class="demo-value">{{ lodashDemo.deepGet }}</code>
            </div>
            <div class="demo-item">
              <span class="demo-label">深度比较 (isEqual)</span>
              <code class="demo-value">{{ lodashDemo.isEqual }}</code>
            </div>
          </div>
        </div>

        <div class="demo-group">
          <h3 class="demo-group-title">数字与字符串</h3>
          <div class="demo-grid">
            <div class="demo-item">
              <span class="demo-label">随机数 (1-100)</span>
              <code class="demo-value">{{ lodashDemo.random }}</code>
            </div>
            <div class="demo-item">
              <span class="demo-label">限制范围 (150 → 0-100)</span>
              <code class="demo-value">{{ lodashDemo.clamped }}</code>
            </div>
            <div class="demo-item">
              <span class="demo-label">驼峰命名</span>
              <code class="demo-value">{{ lodashDemo.camelCase }}</code>
            </div>
            <div class="demo-item">
              <span class="demo-label">短横线命名</span>
              <code class="demo-value">{{ lodashDemo.kebabCase }}</code>
            </div>
            <div class="demo-item">
              <span class="demo-label">截断文字</span>
              <code class="demo-value">{{ lodashDemo.truncated }}</code>
            </div>
          </div>
        </div>

        <div class="demo-group">
          <h3 class="demo-group-title">树形数据处理</h3>
          <div class="demo-grid">
            <div class="demo-item full-width">
              <span class="demo-label">扁平化</span>
              <code class="demo-value">{{
                JSON.stringify(treeDemo.flattened.map((n) => n.name))
              }}</code>
            </div>
            <div class="demo-item">
              <span class="demo-label">查找节点 (id=121)</span>
              <code class="demo-value">{{ treeDemo.found?.name }}</code>
            </div>
            <div class="demo-item">
              <span class="demo-label">节点路径 (id=121)</span>
              <code class="demo-value">{{ treeDemo.path.join(' → ') }}</code>
            </div>
          </div>
        </div>

        <div class="demo-group">
          <h3 class="demo-group-title">防抖与节流</h3>
          <div class="demo-row">
            <BaseButton @click="debouncedIncrement">
              防抖点击 ({{ debounceCount }})
            </BaseButton>
            <BaseButton @click="throttledIncrement">
              节流点击 ({{ throttleCount }})
            </BaseButton>
            <span class="demo-tip">快速点击测试，防抖500ms，节流500ms</span>
          </div>
        </div>
      </BaseCard>
    </section>

    <!-- qs 演示 -->
    <section class="demo-section">
      <h2 class="section-title">🔗 qs - 查询字符串处理</h2>
      <BaseCard>
        <div class="demo-grid">
          <div class="demo-item full-width">
            <span class="demo-label">解析查询字符串</span>
            <code class="demo-value">{{ JSON.stringify(qsDemo.parsed) }}</code>
          </div>
          <div class="demo-item full-width">
            <span class="demo-label">序列化对象</span>
            <code class="demo-value">{{ qsDemo.stringified }}</code>
          </div>
          <div class="demo-item full-width">
            <span class="demo-label">构建完整 URL</span>
            <code class="demo-value url-value">{{ qsDemo.builtUrl }}</code>
          </div>
          <div class="demo-item full-width">
            <span class="demo-label">分页查询字符串</span>
            <code class="demo-value">{{ qsDemo.pagination }}</code>
          </div>
        </div>

        <div class="demo-group">
          <h3 class="demo-group-title">查询参数管理器</h3>
          <div class="demo-row">
            <code>{{ JSON.stringify(currentParams) }}</code>
            <BaseButton @click="handleUpdateQuery">page + 1</BaseButton>
            <BaseButton type="secondary" @click="handleResetQuery">
              重置
            </BaseButton>
          </div>
          <p class="demo-tip">查询字符串: {{ queryManager.toString() }}</p>
        </div>
      </BaseCard>
    </section>
  </div>
</template>

<style scoped>
.library-demo {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
}

.page-description {
  font-size: 18px;
  color: var(--color-text-secondary);
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
}

.demo-group {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.demo-group:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.demo-group-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.demo-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.demo-item.full-width {
  grid-column: 1 / -1;
}

.demo-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.demo-value {
  font-family: 'Fira Code', monospace;
  font-size: 13px;
  background: #f3f4f6;
  padding: 8px 12px;
  border-radius: 6px;
  word-break: break-all;
}

.url-value {
  font-size: 12px;
  word-break: break-all;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.demo-tip {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.cookie-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cookie-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: #f9fafb;
  border-radius: 6px;
}

.cookie-key {
  font-weight: 500;
  min-width: 120px;
}

.cookie-value {
  flex: 1;
  font-family: 'Fira Code', monospace;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.empty-tip {
  text-align: center;
  color: var(--color-text-secondary);
  padding: 20px;
}
</style>
