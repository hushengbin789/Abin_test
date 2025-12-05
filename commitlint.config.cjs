/**
 * Commitlint 配置
 * 规范 Git 提交信息格式
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 类型枚举
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 Bug
        'docs', // 文档更新
        'style', // 样式调整（不影响代码逻辑）
        'refactor', // 代码重构
        'perf', // 性能优化
        'test', // 测试相关
        'build', // 构建相关
        'ci', // CI 配置
        'chore', // 其他更改
        'revert', // 回滚
      ],
    ],
    // 类型不能为空
    'type-empty': [2, 'never'],
    // 主题不能为空
    'subject-empty': [2, 'never'],
    // 主题最大长度
    'subject-max-length': [2, 'always', 100],
  },
};
