// Auth related hooks
import { useAuthStore } from '@/stores';
import type { loginRequest, registerRequest } from '@/types';

// Auth hook
export const useAuth = () => {
  const authToken = useAuthStore(state => state.authToken);
  const user = useAuthStore(state => state.user);
  const isLoading = useAuthStore(state => state.isLoading);

  const login = useAuthStore(state => state.login);
  const register = useAuthStore(state => state.register);
  const logout = useAuthStore(state => state.logout);

  return {
    // state
    authToken,
    user,
    isAuthenticated: !!authToken,
    isLoading,

    // actions
    login,
    register,
    logout,
  };
};

// Login hook
export const useLogin = () => {
  const login = useAuthStore(state => state.login);
  const isLoading = useAuthStore(state => state.isLoading);

  const handleLogin = async (credentials: loginRequest) => {
    try {
      await login(credentials);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      };
    }
  };

  return {
    login: handleLogin,
    isLoading,
  };
};

// Register hook
export const useRegister = () => {
  const register = useAuthStore(state => state.register);
  const isLoading = useAuthStore(state => state.isLoading);

  const handleRegister = async (data: registerRequest) => {
    try {
      await register(data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      };
    }
  };

  return {
    register: handleRegister,
    isLoading,
  };
};
