// Format utility functions

/**
 * Format currency
 * @param amount 金额
 * @param currency Currency code, default is 'CNY'
 * @param locale Locale code, default is 'en-US'
 */
export function formatCurrency(
  amount: number,
  currency: string = 'CNY',
  locale: string = 'zh-CN'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format number
 * @param num 数字
 * @param locale Locale code, default is 'en-US'
 */
export function formatNumber(num: number, locale: string = 'zh-CN'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Format date
 * @param date 日期
 * @param format Format type
 * @param locale Locale code, default is 'en-US'
 */
export function formatDate(
  date: string | Date,
  format: 'date' | 'datetime' | 'time' = 'date',
  locale: string = 'zh-CN'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const optionsMap: Record<string, Intl.DateTimeFormatOptions> = {
    date: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
    datetime: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    },
    time: {
      hour: '2-digit',
      minute: '2-digit',
    },
  };

  const options = optionsMap[format];

  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Format relative time
 * @param date 日期
 * @param locale Locale code, default is 'en-US'
 */
export function formatRelativeTime(date: string | Date, locale: string = 'zh-CN'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }
}

/**
 * Format file size
 * @param bytes 字节数
 * @param decimals Decimal places, default is 2
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format percentage
 * @param value 数值（0-1 之间）
 * @param decimals Decimal places, default is 2
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return (value * 100).toFixed(decimals) + '%';
}

/**
 * Truncate text
 * @param text 文本
 * @param maxLength Maximum length
 * @param suffix Suffix, default is '...'
 */
export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Capitalize first letter
 * @param str 字符串
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Camel case to kebab case
 * @param str 驼峰字符串
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Kebab case to camel case
 * @param str 短横线字符串
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}
