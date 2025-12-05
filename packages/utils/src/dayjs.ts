/**
 * dayjs 日期处理工具
 * 基于 dayjs 提供完整的日期处理功能
 */
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import 'dayjs/locale/zh-cn'

// 注册插件
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(weekOfYear)
dayjs.extend(quarterOfYear)

// 设置中文语言
dayjs.locale('zh-cn')

/** 日期类型 */
type DateLike = string | number | Date | dayjs.Dayjs

/**
 * 导出 dayjs 实例
 */
export { dayjs }

/**
 * 创建 dayjs 实例
 */
export function createDayjs(date?: DateLike): dayjs.Dayjs {
  return dayjs(date)
}

/**
 * 格式化日期
 * @param date 日期
 * @param format 格式化模板
 * @returns 格式化后的日期字符串
 *
 * @example
 * formatDateTime(new Date()) // '2024-01-15 14:30:00'
 * formatDateTime('2024-01-15', 'YYYY年MM月DD日') // '2024年01月15日'
 */
export function formatDateTime(
  date: DateLike,
  format = 'YYYY-MM-DD HH:mm:ss'
): string {
  return dayjs(date).format(format)
}

/**
 * 格式化日期（不含时间）
 * @example formatDateOnly('2024-01-15T14:30:00') // '2024-01-15'
 */
export function formatDateOnly(date: DateLike): string {
  return dayjs(date).format('YYYY-MM-DD')
}

/**
 * 格式化时间（不含日期）
 * @example formatTimeOnly('2024-01-15T14:30:00') // '14:30:00'
 */
export function formatTimeOnly(date: DateLike): string {
  return dayjs(date).format('HH:mm:ss')
}

/**
 * 获取相对时间描述
 * @example getRelativeTimeFromNow('2024-01-10') // '5 天前'
 */
export function getRelativeTimeFromNow(date: DateLike): string {
  return dayjs(date).fromNow()
}

/**
 * 获取两个日期之间的相对时间
 * @example getRelativeTimeTo('2024-01-10', '2024-01-15') // '5 天内'
 */
export function getRelativeTimeTo(from: DateLike, to: DateLike): string {
  return dayjs(from).to(dayjs(to))
}

/**
 * 获取时间差
 * @param from 开始时间
 * @param to 结束时间
 * @param unit 单位
 * @example getDateDiff('2024-01-10', '2024-01-15', 'day') // 5
 */
export function getDateDiff(
  from: DateLike,
  to: DateLike,
  unit: dayjs.ManipulateType = 'day'
): number {
  return dayjs(to).diff(dayjs(from), unit)
}

/**
 * 日期加减操作
 * @example addTime('2024-01-15', 7, 'day') // 2024-01-22 的 dayjs 对象
 */
export function addTime(
  date: DateLike,
  value: number,
  unit: dayjs.ManipulateType
): dayjs.Dayjs {
  return dayjs(date).add(value, unit)
}

/**
 * 日期减法
 * @example subtractTime('2024-01-15', 7, 'day') // 2024-01-08 的 dayjs 对象
 */
export function subtractTime(
  date: DateLike,
  value: number,
  unit: dayjs.ManipulateType
): dayjs.Dayjs {
  return dayjs(date).subtract(value, unit)
}

/**
 * 获取某个时间单位的开始
 * @example startOf('2024-01-15 14:30:00', 'day') // '2024-01-15 00:00:00'
 */
export function startOf(
  date: DateLike,
  unit: dayjs.ManipulateType
): dayjs.Dayjs {
  return dayjs(date).startOf(unit)
}

/**
 * 获取某个时间单位的结束
 * @example endOf('2024-01-15 14:30:00', 'day') // '2024-01-15 23:59:59'
 */
export function endOf(date: DateLike, unit: dayjs.ManipulateType): dayjs.Dayjs {
  return dayjs(date).endOf(unit)
}

/**
 * 判断日期是否在范围内
 * @example isDateBetween('2024-01-15', '2024-01-10', '2024-01-20') // true
 */
export function isDateBetween(
  date: DateLike,
  start: DateLike,
  end: DateLike,
  unit?: dayjs.ManipulateType,
  inclusivity?: '()' | '[]' | '[)' | '(]'
): boolean {
  return dayjs(date).isBetween(start, end, unit, inclusivity)
}

/**
 * 判断是否是同一天
 */
export function isSameDay(date1: DateLike, date2: DateLike): boolean {
  return dayjs(date1).isSame(dayjs(date2), 'day')
}

/**
 * 判断是否是今天
 */
export function isDateToday(date: DateLike): boolean {
  return dayjs(date).isSame(dayjs(), 'day')
}

/**
 * 判断是否是昨天
 */
export function isDateYesterday(date: DateLike): boolean {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day')
}

/**
 * 判断是否是本周
 */
export function isDateThisWeek(date: DateLike): boolean {
  return dayjs(date).isSame(dayjs(), 'week')
}

/**
 * 判断是否是本月
 */
export function isDateThisMonth(date: DateLike): boolean {
  return dayjs(date).isSame(dayjs(), 'month')
}

/**
 * 判断是否是本年
 */
export function isDateThisYear(date: DateLike): boolean {
  return dayjs(date).isSame(dayjs(), 'year')
}

/**
 * 获取日期所在的周数
 */
export function getWeekOfYear(date: DateLike): number {
  return dayjs(date).week()
}

/**
 * 获取日期所在的季度
 */
export function getQuarterOfYear(date: DateLike): number {
  return dayjs(date).quarter()
}

/**
 * 格式化时间持续时间
 * @param seconds 秒数
 * @returns 格式化的持续时间
 * @example formatDuration(3661) // '1小时1分钟1秒'
 */
export function formatDuration(seconds: number): string {
  const dur = dayjs.duration(seconds, 'seconds')
  const hours = dur.hours()
  const minutes = dur.minutes()
  const secs = dur.seconds()

  const parts: string[] = []
  if (hours > 0) parts.push(`${hours}小时`)
  if (minutes > 0) parts.push(`${minutes}分钟`)
  if (secs > 0 || parts.length === 0) parts.push(`${secs}秒`)

  return parts.join('')
}

/**
 * 获取友好的日期显示
 * 今天显示时间，昨天显示"昨天 HH:mm"，本周显示星期，更早显示完整日期
 */
export function getFriendlyDate(date: DateLike): string {
  const d = dayjs(date)
  const now = dayjs()

  if (d.isSame(now, 'day')) {
    return d.format('HH:mm')
  }

  if (d.isSame(now.subtract(1, 'day'), 'day')) {
    return `昨天 ${d.format('HH:mm')}`
  }

  if (d.isSame(now, 'week')) {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return `${weekdays[d.day()]} ${d.format('HH:mm')}`
  }

  if (d.isSame(now, 'year')) {
    return d.format('MM月DD日 HH:mm')
  }

  return d.format('YYYY年MM月DD日 HH:mm')
}

/**
 * 获取日期范围快捷方式
 */
export const dateRangePresets = {
  /** 今天 */
  today: (): [dayjs.Dayjs, dayjs.Dayjs] => [
    dayjs().startOf('day'),
    dayjs().endOf('day'),
  ],
  /** 昨天 */
  yesterday: (): [dayjs.Dayjs, dayjs.Dayjs] => [
    dayjs().subtract(1, 'day').startOf('day'),
    dayjs().subtract(1, 'day').endOf('day'),
  ],
  /** 本周 */
  thisWeek: (): [dayjs.Dayjs, dayjs.Dayjs] => [
    dayjs().startOf('week'),
    dayjs().endOf('week'),
  ],
  /** 上周 */
  lastWeek: (): [dayjs.Dayjs, dayjs.Dayjs] => [
    dayjs().subtract(1, 'week').startOf('week'),
    dayjs().subtract(1, 'week').endOf('week'),
  ],
  /** 本月 */
  thisMonth: (): [dayjs.Dayjs, dayjs.Dayjs] => [
    dayjs().startOf('month'),
    dayjs().endOf('month'),
  ],
  /** 上月 */
  lastMonth: (): [dayjs.Dayjs, dayjs.Dayjs] => [
    dayjs().subtract(1, 'month').startOf('month'),
    dayjs().subtract(1, 'month').endOf('month'),
  ],
  /** 最近7天 */
  last7Days: (): [dayjs.Dayjs, dayjs.Dayjs] => [
    dayjs().subtract(6, 'day').startOf('day'),
    dayjs().endOf('day'),
  ],
  /** 最近30天 */
  last30Days: (): [dayjs.Dayjs, dayjs.Dayjs] => [
    dayjs().subtract(29, 'day').startOf('day'),
    dayjs().endOf('day'),
  ],
  /** 本季度 */
  thisQuarter: (): [dayjs.Dayjs, dayjs.Dayjs] => [
    dayjs().startOf('quarter'),
    dayjs().endOf('quarter'),
  ],
  /** 本年 */
  thisYear: (): [dayjs.Dayjs, dayjs.Dayjs] => [
    dayjs().startOf('year'),
    dayjs().endOf('year'),
  ],
}
