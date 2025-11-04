import { Toaster } from 'react-hot-toast';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { checkAuthenticatedUserRedirect, validateRouteAccess } from '@/utils';

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const pathname = location.pathname;

    // 检查已登录用户访问登录/注册页面的重定向
    checkAuthenticatedUserRedirect(pathname);

    // 检查未登录用户访问受保护路由的权限
    validateRouteAccess(pathname);
  },
  component: RootComponent,
});
