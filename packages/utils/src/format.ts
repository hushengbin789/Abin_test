/**
 * 格式化工具
 * 提供常用的数据格式化函数
 */

/**
 * 格式化数字为千分位
 * @param value 数字
 * @param decimals 小数位数
 * @returns 格式化后的字符串
 */
export function formatNumber(value: number, decimals = 0): string {
  if (isNaN(value)) return '0'

  return value.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * 格式化金额
 * @param value 金额
 * @param prefix 货币前缀
 * @returns 格式化后的金额字符串
 */
export function formatMoney(value: number, prefix = '¥'): string {
  return `${prefix}${formatNumber(value, 2)}`
}

/**
 * 格式化百分比
 * @param value 数值（0-1 或实际百分比）
 * @param decimals 小数位数
 * @param multiply 是否需要乘以 100
 * @returns 格式化后的百分比字符串
 */
export function formatPercent(
  value: number,
  decimals = 2,
  multiply = true
): string {
  const percent = multiply ? value * 100 : value
  return `${percent.toFixed(decimals)}%`
}

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @returns 格式化后的文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`
}

/**
 * 格式化手机号（隐藏中间 4 位）
 */
export function formatMobile(mobile: string): string {
  if (!mobile || mobile.length !== 11) return mobile
  return `${mobile.slice(0, 3)}****${mobile.slice(7)}`
}

/**
 * 格式化身份证号（隐藏中间 8 位）
 */
export function formatIdCard(idCard: string): string {
  if (!idCard || idCard.length < 15) return idCard
  return `${idCard.slice(0, 6)}********${idCard.slice(-4)}`
}

/**
 * 格式化银行卡号（每 4 位空格分隔）
 */
export function formatBankCard(cardNo: string): string {
  return cardNo
    .replace(/\s/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim()
}

/**
 * 首字母大写
 */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * 转换为驼峰命名
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^./, (char) => char.toLowerCase())
}

/**
 * 转换为短横线命名
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '-$1')
    .replace(/[-_\s]+/g, '-')
    .toLowerCase()
    .replace(/^-/, '')
}

/**
 * 截断文本
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (str.length <= length) return str
  return str.slice(0, length - suffix.length) + suffix
}
