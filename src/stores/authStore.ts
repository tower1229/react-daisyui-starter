import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { getUserInfo as getUserInfoApi, login as loginApi, register as registerApi } from '@/api';
import type { AuthState, loginRequest, registerRequest } from '@/types';

const getUserInfo = async () => {
  const response = await getUserInfoApi();
  if (response && response.code === 200) {
    return response.data;
  } else {
    return null;
  }
};

interface AuthActions {
  login: (credentials: loginRequest) => Promise<void>;
  register: (data: registerRequest) => Promise<void>;
  logout: () => void;
  getUserInfo: () => Promise<void>;
}

// 认证状态管理
export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    immer((set) => ({
      // 初始状态
      authToken: null,
      user: null,
      isLoading: false,

      // 获取用户信息
      getUserInfo: async () => {
        // 检查是否有 token，没有 token 则直接返回
        const currentState = useAuthStore.getState();
        if (!currentState.authToken) {
          return;
        }

        const response = await getUserInfo();
        if (response) {
          set((state) => {
            state.user = response;
          });
        } else {
          throw new Error('Failed to get user information');
        }
      },

      // 登录
      login: async (credentials: loginRequest) => {
        set((state) => {
          state.isLoading = true;
        });

        try {
          const response = await loginApi(credentials);

          if (response && response.code === 200) {
            const { authToken } = response.data;

            // 更新 token 状态
            set((state) => {
              state.authToken = authToken;
            });

            // 从后端获取完整用户信息
            const user = await getUserInfo();

            set((state) => {
              state.user = user;
              state.isLoading = false;
            });
          } else {
            throw new Error(response?.msg || 'Login failed');
          }
        } catch (error) {
          set((state) => {
            state.isLoading = false;
          });
          throw error;
        }
      },

      // 注册
      register: async (data: registerRequest) => {
        set((state) => {
          state.isLoading = true;
        });

        try {
          const response = await registerApi(data);

          if (response && response.code === 200) {
            // 注册成功
            set((state) => {
              state.isLoading = false;
            });
          } else {
            throw new Error(response?.msg || 'Registration failed');
          }
        } catch (error) {
          set((state) => {
            state.isLoading = false;
          });
          throw error;
        }
      },

      // 登出
      logout: () => {
        set((state) => {
          state.authToken = null;
          state.user = null;
          state.isLoading = false;
        });
      },
    })),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        authToken: state.authToken,
        user: state.user,
      }),
    }
  )
);

// 选择器函数（用于性能优化）
export const useAuthToken = () => useAuthStore((state) => state.authToken);
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => !!state.authToken);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);

// 操作选择器
export const useAuthActions = () => ({
  login: useAuthStore.getState().login,
  register: useAuthStore.getState().register,
  logout: useAuthStore.getState().logout,
});
