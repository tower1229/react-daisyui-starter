// 定义API请求函数
import { apiClient } from '@/utils';
import type { AuthUser, ApiResponse } from '@/types/';

export type registerRequest = {
  email: string;
  password: string;
  verifyCode: string;
};

// 注册
export const register = async (params: registerRequest): Promise<ApiResponse | null> => {
  return apiClient.post<ApiResponse>('/login/register', params);
};

export type loginRequest = {
  email: string;
  password: string;
};

export type loginResponse = {
  code: number;
  data: {
    authToken: string;
  };
  msg: string;
};

// 登录
export const login = async (params: loginRequest): Promise<loginResponse | null> => {
  return apiClient.post<loginResponse>('/login', params);
};

export type sendVerifyCodeRequest = {
  email: string;
};

// 发送验证码 (模拟实现)
export const sendVerifyCode = async (
  _params: sendVerifyCodeRequest
): Promise<ApiResponse | null> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 模拟成功响应
  return {
    code: 200,
    data: {},
    msg: 'Verification code has been sent to your email',
  };
};

// 获取用户信息
export const getUserInfo = async (): Promise<getUserInfoResponse | null> => {
  return apiClient.get<getUserInfoResponse>('/user');
};

export type getUserInfoResponse = {
  code: number;
  data: AuthUser;
  msg: string;
};

// 修改密码
export const updatePassword = async (
  params: updatePasswordRequest
): Promise<ApiResponse | null> => {
  return apiClient.post<ApiResponse>('/user/password/update', params);
};

export type updatePasswordRequest = {
  newPassword: string;
  oldPassword: string;
};
