/**
 * 验证工具函数
 */

/**
 * 验证手机号
 * @param phone 手机号
 */
export function isPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone);
}

/**
 * 验证邮箱
 * @param email 邮箱
 */
export function isEmail(email: string): boolean {
  return /^[\w.-]+@[\w.-]+\.\w+$/.test(email);
}

/**
 * 验证身份证号
 * @param idCard 身份证号
 */
export function isIdCard(idCard: string): boolean {
  // 简化的身份证验证
  return /^\d{15}|\d{17}[\dXx]$/.test(idCard);
}

/**
 * 验证URL
 * @param url URL地址
 */
export function isUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 验证是否为数字
 * @param value 值
 */
export function isNumeric(value: string): boolean {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
}

/**
 * 验证密码强度
 * @param password 密码
 * @returns 强度等级 0-4
 */
export function checkPasswordStrength(password: string): number {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  return Math.min(strength, 4);
}

/**
 * 验证银行卡号
 * @param cardNo 银行卡号
 */
export function isBankCard(cardNo: string): boolean {
  return /^\d{16,19}$/.test(cardNo);
}

/**
 * 验证中文姓名
 * @param name 姓名
 */
export function isChineseName(name: string): boolean {
  return /^[\u4e00-\u9fa5]{2,10}$/.test(name);
}

/** 验证规则类型 */
export interface ValidationRule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  validator?: (value: unknown) => boolean | Promise<boolean>;
}

/**
 * 创建验证器
 * @param rules 验证规则
 */
export function createValidator(rules: ValidationRule[]) {
  return async (value: unknown): Promise<{ valid: boolean; message?: string }> => {
    for (const rule of rules) {
      // 必填验证
      if (rule.required && (value === undefined || value === null || value === '')) {
        return { valid: false, message: rule.message || '此项为必填项' };
      }

      // 字符串验证
      if (typeof value === 'string') {
        if (rule.minLength && value.length < rule.minLength) {
          return { valid: false, message: rule.message || `最少输入${rule.minLength}个字符` };
        }
        if (rule.maxLength && value.length > rule.maxLength) {
          return { valid: false, message: rule.message || `最多输入${rule.maxLength}个字符` };
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          return { valid: false, message: rule.message || '格式不正确' };
        }
      }

      // 自定义验证
      if (rule.validator) {
        const result = await rule.validator(value);
        if (!result) {
          return { valid: false, message: rule.message || '验证失败' };
        }
      }
    }

    return { valid: true };
  };
}
