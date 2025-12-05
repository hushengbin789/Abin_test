/**
 * 日期处理工具
 * 提供常用的日期格式化和计算函数
 */

/** 日期格式化模式 */
type DatePattern =
  | 'YYYY-MM-DD'
  | 'YYYY-MM-DD HH:mm:ss'
  | 'YYYY/MM/DD'
  | 'YYYY年MM月DD日'
  | 'MM-DD HH:mm'
  | 'HH:mm:ss'
  | string

/**
 * 将数字补零
 */
function padZero(num: number, length = 2): string {
  return String(num).padStart(length, '0')
}

/**
 * 解析日期
 * @param date 日期值
 * @returns Date 对象
 */
export function parseDate(date: Date | string | number): Date {
  if (date instanceof Date) return date
  if (typeof date === 'number') return new Date(date)
  return new Date(date)
}

/**
 * 格式化日期
 * @param date 日期值
 * @param pattern 格式化模式
 * @returns 格式化后的日期字符串
 */
export function formatDate(
  date: Date | string | number,
  pattern: DatePattern = 'YYYY-MM-DD'
): string {
  const d = parseDate(date)

  if (isNaN(d.getTime())) {
    return ''
  }

  const year = d.getFullYear()
  const month = padZero(d.getMonth() + 1)
  const day = padZero(d.getDate())
  const hours = padZero(d.getHours())
  const minutes = padZero(d.getMinutes())
  const seconds = padZero(d.getSeconds())

  return pattern
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 获取相对时间描述
 * @param date 日期值
 * @returns 相对时间描述
 */
export function getRelativeTime(date: Date | string | number): string {
  const d = parseDate(date)
  const now = Date.now()
  const diff = now - d.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (seconds < 60) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 30) return `${days}天前`
  if (months < 12) return `${months}个月前`
  return `${years}年前`
}

/**
 * 判断是否为今天
 */
export function isToday(date: Date | string | number): boolean {
  const d = parseDate(date)
  const today = new Date()
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  )
}

/**
 * 判断是否为本周
 */
export function isThisWeek(date: Date | string | number): boolean {
  const d = parseDate(date)
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 7)

  return d >= startOfWeek && d < endOfWeek
}

/**
 * 获取日期范围
 * @param type 范围类型
 * @returns [开始日期, 结束日期]
 */
export function getDateRange(
  type: 'today' | 'week' | 'month' | 'year'
): [Date, Date] {
  const now = new Date()
  const start = new Date(now)
  const end = new Date(now)

  switch (type) {
    case 'today':
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      break
    case 'week':
      start.setDate(now.getDate() - now.getDay())
      start.setHours(0, 0, 0, 0)
      end.setDate(start.getDate() + 6)
      end.setHours(23, 59, 59, 999)
      break
    case 'month':
      start.setDate(1)
      start.setHours(0, 0, 0, 0)
      end.setMonth(now.getMonth() + 1, 0)
      end.setHours(23, 59, 59, 999)
      break
    case 'year':
      start.setMonth(0, 1)
      start.setHours(0, 0, 0, 0)
      end.setMonth(11, 31)
      end.setHours(23, 59, 59, 999)
      break
  }

  return [start, end]
}

/**
 * 计算两个日期之间的天数
 */
export function daysBetween(
  date1: Date | string | number,
  date2: Date | string | number
): number {
  const d1 = parseDate(date1)
  const d2 = parseDate(date2)
  const diffTime = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
