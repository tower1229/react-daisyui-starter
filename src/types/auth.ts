// 认证相关类型定义

// 认证用户信息
export interface AuthUser {
  email: string;
  id: number;
  phone: null;
}

// 认证状态
export interface AuthState {
  authToken: string | null;
  user: AuthUser | null;
  isLoading: boolean;
}

// 重新导出 API 类型
export type { loginRequest, loginResponse, registerRequest } from '@/api';
