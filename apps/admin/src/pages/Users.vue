<script setup lang="ts">
/**
 * 用户管理页面
 */
import { ref } from 'vue'
import { useBoolean } from '@monorepo/hooks'

// 模态框状态
const { state: modalVisible, setTrue: openModal, setFalse: closeModal } = useBoolean()

// 用户列表
const users = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: 'active' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑', status: 'active' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户', status: 'inactive' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '用户', status: 'active' },
  { id: 5, name: '钱七', email: 'qianqi@example.com', role: '编辑', status: 'active' },
])

// 新用户表单
const newUser = ref({
  name: '',
  email: '',
  role: '用户',
})

// 添加用户
const handleAddUser = () => {
  if (!newUser.value.name || !newUser.value.email) {
    return
  }
  users.value.push({
    id: Date.now(),
    name: newUser.value.name,
    email: newUser.value.email,
    role: newUser.value.role,
    status: 'active',
  })
  newUser.value = { name: '', email: '', role: '用户' }
  closeModal()
}

// 删除用户
const handleDeleteUser = (id: number) => {
  users.value = users.value.filter((user) => user.id !== id)
}

// 角色颜色
const getRoleColor = (role: string) => {
  const colors: Record<string, string> = {
    管理员: '#ef4444',
    编辑: '#3b82f6',
    用户: '#10b981',
  }
  return colors[role] || '#6b7280'
}
</script>

<template>
  <div class="users-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <div>
        <h1 class="page-header__title">用户管理</h1>
        <p class="page-header__desc">管理系统中的所有用户</p>
      </div>
      <MButton type="primary" @click="openModal">添加用户</MButton>
    </div>

    <!-- 用户表格 -->
    <div class="users-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>邮箱</th>
            <th>角色</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span class="role-tag" :style="{ backgroundColor: getRoleColor(user.role) + '20', color: getRoleColor(user.role) }">
                {{ user.role }}
              </span>
            </td>
            <td>
              <span class="status" :class="[`status--${user.status}`]">
                {{ user.status === 'active' ? '正常' : '禁用' }}
              </span>
            </td>
            <td>
              <div class="actions">
                <button class="action-btn action-btn--edit">编辑</button>
                <button class="action-btn action-btn--delete" @click="handleDeleteUser(user.id)">
                  删除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 添加用户模态框 -->
    <MModal v-model="modalVisible" title="添加用户" @confirm="handleAddUser" @cancel="closeModal">
      <div class="form">
        <div class="form__item">
          <label class="form__label">姓名</label>
          <MInput v-model="newUser.name" placeholder="请输入姓名" />
        </div>
        <div class="form__item">
          <label class="form__label">邮箱</label>
          <MInput v-model="newUser.email" placeholder="请输入邮箱" />
        </div>
        <div class="form__item">
          <label class="form__label">角色</label>
          <select v-model="newUser.role" class="form__select">
            <option value="用户">用户</option>
            <option value="编辑">编辑</option>
            <option value="管理员">管理员</option>
          </select>
        </div>
      </div>
    </MModal>
  </div>
</template>

<style lang="scss" scoped>
.users-page {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.users-table {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 16px;
    text-align: left;
  }

  th {
    background: #f9fafb;
    font-weight: 600;
    font-size: 14px;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
  }

  td {
    font-size: 14px;
    color: #1f2937;
    border-bottom: 1px solid #f3f4f6;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background: #f9fafb;
  }
}

.role-tag {
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 9999px;
}

.status {
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 9999px;

  &--active {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
  }

  &--inactive {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
}

.actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  &--edit {
    background: #ecfdf5;
    color: #10b981;

    &:hover {
      background: #d1fae5;
    }
  }

  &--delete {
    background: #fef2f2;
    color: #ef4444;

    &:hover {
      background: #fee2e2;
    }
  }
}

.form {
  &__item {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }

  &__select {
    width: 100%;
    height: 32px;
    padding: 0 12px;
    font-size: 14px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: #3b82f6;
    }
  }
}
</style>
