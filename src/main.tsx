import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createRouter,
  createHashHistory,
} from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// 导入生成的路由树
import { routeTree } from "./routeTree.gen";
import { initializeTheme } from "./stores/themeStore";
import { useAuthStore } from "./stores/authStore";

// 创建查询客户端
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

// 创建路由器
const router = createRouter({
  routeTree,
  history: createHashHistory(),
});

// 注册路由器类型
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// 初始化主题
initializeTheme();

// 初始化认证状态
const initializeApp = async () => {
  try {
    // 检查是否有已保存的 token，如果有则获取用户信息
    const authStore = useAuthStore.getState();
    if (authStore.authToken) {
      try {
        await authStore.getUserInfo();
      } catch (error) {
        // 如果获取用户信息失败，可能是 token 过期，清除认证状态
        console.warn("Failed to get user info, clearing auth state:", error);
        authStore.logout();
      }
    }
  } catch (error) {
    console.warn("Failed to initialize app data:", error);
  }
};

// 执行初始化
initializeApp();

// 创建根元素
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// 渲染应用
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
