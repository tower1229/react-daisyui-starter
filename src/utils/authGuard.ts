import toast from 'react-hot-toast';
import { redirect } from '@tanstack/react-router';

import { PUBLIC_ROUTES } from '@/constants';

export type PublicRoute = (typeof PUBLIC_ROUTES)[number];

/**
 * 检查路由是否在白名单中
 * @param pathname 当前路由路径
 * @returns 是否在白名单中
 */
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => {
    // 精确匹配
    if (pathname === route) {
      return true;
    }
    // 路径前缀匹配（排除根路径）
    if (route !== '/' && pathname.startsWith(route + '/')) {
      return true;
    }
    return false;
  });
}

/**
 * 检查用户是否已认证
 * @returns 认证状态和用户信息
 */
export function checkAuthStatus() {
  const authStorage = localStorage.getItem('auth-storage');

  if (!authStorage) {
    return { isAuthenticated: false, authToken: null, user: null };
  }

  try {
    const authData = JSON.parse(authStorage);

    // 检查数据格式是否正确
    if (authData && typeof authData === 'object' && authData.state) {
      const authToken = authData.state.authToken;
      const user = authData.state.user;

      return {
        isAuthenticated: !!authToken,
        authToken,
        user,
      };
    }

    return { isAuthenticated: false, authToken: null, user: null };
  } catch (error) {
    console.error('Failed to parse auth-storage:', error);
    return { isAuthenticated: false, authToken: null, user: null };
  }
}

/**
 * 全局路由权限校验
 * @param pathname 当前路由路径
 * @returns 如果需要重定向则抛出 redirect，否则返回 void
 */
export function validateRouteAccess(pathname: string): void {
  // 如果是白名单路由，直接通过
  if (isPublicRoute(pathname)) {
    return;
  }

  // 检查认证状态
  const { isAuthenticated } = checkAuthStatus();

  if (!isAuthenticated) {
    toast.error('Please login first');
    throw redirect({ to: '/login' });
  }
}

/**
 * 检查已登录用户访问登录/注册页面时的重定向
 * @param pathname 当前路由路径
 * @returns 如果需要重定向则抛出 redirect，否则返回 void
 */
export function checkAuthenticatedUserRedirect(pathname: string): void {
  // 只对登录和注册页面进行检查
  if (pathname === '/login' || pathname === '/register') {
    const { isAuthenticated } = checkAuthStatus();

    if (isAuthenticated) {
      toast.success('Already logged in, redirecting...');
      throw redirect({ to: '/dashboard' });
    }
  }
}
