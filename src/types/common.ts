// 通用类型定义

// API 响应类型
export interface ApiResponse<T = Record<string, never>> {
  data: T;
  msg?: string;
  code: number;
}
