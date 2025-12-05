/**
 * 验证工具
 * 提供常用的数据验证函数
 */

/**
 * 验证邮箱格式
 */
export function isEmail(value: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(value)
}

/**
 * 验证手机号格式（中国大陆）
 */
export function isMobile(value: string): boolean {
  const regex = /^1[3-9]\d{9}$/
  return regex.test(value)
}

/**
 * 验证身份证号格式（中国大陆）
 */
export function isIdCard(value: string): boolean {
  const regex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return regex.test(value)
}

/**
 * 验证 URL 格式
 */
export function isUrl(value: string): boolean {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

/**
 * 验证是否为空值
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * 验证是否为非空值
 */
export function isNotEmpty(value: unknown): boolean {
  return !isEmpty(value)
}

/**
 * 验证是否为数字
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * 验证是否为整数
 */
export function isInteger(value: unknown): boolean {
  return isNumber(value) && Number.isInteger(value)
}

/**
 * 验证是否为正整数
 */
export function isPositiveInteger(value: unknown): boolean {
  return isInteger(value) && (value as number) > 0
}

/**
 * 验证字符串长度范围
 */
export function isLengthBetween(
  value: string,
  min: number,
  max: number
): boolean {
  const length = value.length
  return length >= min && length <= max
}

/**
 * 验证密码强度
 * @returns 密码强度等级 0-4
 */
export function getPasswordStrength(password: string): number {
  let strength = 0

  if (password.length >= 8) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++

  return Math.min(strength, 4)
}

/**
 * 验证是否为有效的 JSON 字符串
 */
export function isValidJSON(value: string): boolean {
  try {
    JSON.parse(value)
    return true
  } catch {
    return false
  }
}

/**
 * 验证是否包含中文字符
 */
export function hasChinese(value: string): boolean {
  const regex = /[\u4e00-\u9fa5]/
  return regex.test(value)
}

/**
 * 验证是否为纯数字字符串
 */
export function isNumericString(value: string): boolean {
  const regex = /^\d+$/
  return regex.test(value)
}
