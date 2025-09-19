// 验证工具函数

/**
 * 验证邮箱格式
 * @param email 邮箱地址
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 验证手机号格式（中国大陆）
 * @param phone 手机号
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * 验证身份证号格式（中国大陆）
 * @param idCard 身份证号
 */
export function isValidIdCard(idCard: string): boolean {
  const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return idCardRegex.test(idCard);
}

/**
 * 验证密码强度
 * @param password 密码
 * @param minLength 最小长度，默认为 8
 */
export function validatePasswordStrength(
  password: string,
  minLength: number = 8
): {
  isValid: boolean;
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  // 长度检查
  if (password.length < minLength) {
    feedback.push(`Password must be at least ${minLength} characters long`);
  } else {
    score += 1;
  }

  // 包含小写字母
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Password should contain lowercase letters");
  }

  // 包含大写字母
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Password should contain uppercase letters");
  }

  // 包含数字
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push("Password should contain numbers");
  }

  // 包含特殊字符
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Password should contain special characters");
  }

  return {
    isValid: score >= 4,
    score,
    feedback,
  };
}

/**
 * 验证 URL 格式
 * @param url URL 地址
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 验证 IP 地址格式
 * @param ip IP 地址
 */
export function isValidIP(ip: string): boolean {
  const ipRegex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ip);
}

/**
 * 验证数字范围
 * @param value 数值
 * @param min 最小值
 * @param max 最大值
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * 验证字符串长度
 * @param str 字符串
 * @param minLength 最小长度
 * @param maxLength 最大长度
 */
export function isValidLength(
  str: string,
  minLength: number,
  maxLength: number
): boolean {
  return str.length >= minLength && str.length <= maxLength;
}

/**
 * 验证是否为空值
 * @param value 值
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

/**
 * 验证是否为正整数
 * @param value 值
 */
export function isPositiveInteger(value: unknown): boolean {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

/**
 * 验证文件类型
 * @param file 文件
 * @param allowedTypes 允许的文件类型
 */
export function isValidFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

/**
 * 验证文件大小
 * @param file 文件
 * @param maxSize 最大大小（字节）
 */
export function isValidFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize;
}

/**
 * 表单验证规则类型
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => boolean | string;
}

/**
 * 验证表单字段
 * @param value 字段值
 * @param rules 验证规则
 */
export function validateField(
  value: unknown,
  rules: ValidationRule
): string | null {
  // 必填验证
  if (rules.required && isEmpty(value)) {
    return "This field is required";
  }

  // 如果值为空且非必填，跳过其他验证
  if (isEmpty(value) && !rules.required) {
    return null;
  }

  // 最小长度验证
  if (
    rules.minLength &&
    typeof value === "string" &&
    value.length < rules.minLength
  ) {
    return `At least ${rules.minLength} characters required`;
  }

  // 最大长度验证
  if (
    rules.maxLength &&
    typeof value === "string" &&
    value.length > rules.maxLength
  ) {
    return `Maximum ${rules.maxLength} characters allowed`;
  }

  // 正则表达式验证
  if (
    rules.pattern &&
    typeof value === "string" &&
    !rules.pattern.test(value)
  ) {
    return "Invalid format";
  }

  // 自定义验证
  if (rules.custom) {
    const result = rules.custom(value);
    if (typeof result === "string") {
      return result;
    }
    if (!result) {
      return "Validation failed";
    }
  }

  return null;
}

/**
 * 检查密码是否满足特定要求
 * @param password 密码字符串
 * @param requirement 要求类型：'uppercase' | 'lowercase' | 'number' | 'special' | 'length'
 * @returns 是否满足要求
 */
export function checkPasswordRequirement(
  password: string,
  requirement: string
): boolean {
  switch (requirement) {
    case "uppercase":
      return /[A-Z]/.test(password);
    case "lowercase":
      return /[a-z]/.test(password);
    case "number":
      return /\d/.test(password);
    case "special":
      return /[!@#$%^&*(),.?":{}|<>]/.test(password);
    case "length":
      return password.length >= 8;
    default:
      return false;
  }
}
