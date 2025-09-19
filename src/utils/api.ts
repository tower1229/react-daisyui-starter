// API 请求封装工具
// 使用环境变量 VITE_APP_HOST 作为 baseUrl

import { useAuthStore } from "@/stores/authStore";

export interface ApiRequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export interface ApiResponse<T = unknown> {
  data: T;
  code: number;
  message: string;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    // 从环境变量获取 API 基础 URL，如果没有则使用默认值
    this.baseUrl = import.meta.env.VITE_APP_HOST;

    // 确保 baseUrl 不以斜杠结尾
    if (this.baseUrl.endsWith("/")) {
      this.baseUrl = this.baseUrl.slice(0, -1);
    }
  }

  /**
   * 构建完整的 URL
   */
  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean>
  ): string {
    // 确保 endpoint 以斜杠开头
    const normalizedEndpoint = endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;
    let url = `${this.baseUrl}${normalizedEndpoint}`;

    // 添加查询参数
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });
      url += `?${searchParams.toString()}`;
    }

    return url;
  }

  /**
   * 处理响应
   */
  private async handleResponse<T>(response: Response): Promise<T | null> {
    // 处理 401 未授权错误
    if (response.status === 401) {
      // 清除认证信息
      localStorage.removeItem("auth-storage");

      // 重定向到登录页 (如果不在登录页)
      if (window.location.href.indexOf("/login") === -1) {
        window.location.href = "/";
      }

      throw new Error("Authentication failed");
    }

    // 解析响应体
    const contentType = response.headers.get("content-type") || "";
    let parsedBody: ApiResponse<unknown> | null = null;
    try {
      if (contentType.includes("application/json")) {
        parsedBody = await response.json();
      } else {
        const text = await response.text();
        parsedBody = text ? JSON.parse(text) : null;
      }
    } catch {
      parsedBody = null;
    }

    // HTTP 层错误
    if (!response.ok) {
      const message =
        (parsedBody && parsedBody.message) ||
        `API request failed: ${response.status} ${response.statusText}`;
      throw new Error(message as string);
    }

    // 业务层错误（约定后端返回 { code|status, msg, data }）
    const appCode: number | undefined = parsedBody?.code;
    if (typeof appCode === "number" && appCode !== 200) {
      const message: string = parsedBody?.message || "Request failed";
      throw new Error(message);
    }

    return parsedBody as T;
  }

  /**
   * 通用请求方法
   */
  private async request<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<T | null> {
    const { params, ...fetchOptions } = options;

    const url = this.buildUrl(endpoint, params);

    // 设置默认 headers
    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };

    // 添加认证头 - 直接从 Zustand store 获取，确保实时性
    try {
      const authToken = useAuthStore.getState().authToken;
      if (authToken) {
        defaultHeaders["auth-token"] = `${authToken}`;
      }
    } catch (error) {
      console.warn("Failed to get auth token from store:", error);
    }

    const config: RequestInit = {
      ...fetchOptions,
      headers: {
        ...defaultHeaders,
        ...fetchOptions.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Network error: ${error.message}`);
      }
      throw new Error("Unknown network error occurred");
    }
  }

  /**
   * GET 请求
   */
  async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean>
  ): Promise<T | null> {
    return this.request<T>(endpoint, {
      method: "GET",
      params,
    });
  }

  /**
   * POST 请求
   */
  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, "body">
  ): Promise<T | null> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  /**
   * PUT 请求
   */
  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, "body">
  ): Promise<T | null> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  /**
   * PATCH 请求
   */
  async patch<T>(
    endpoint: string,
    data?: unknown,
    options?: Omit<ApiRequestOptions, "body">
  ): Promise<T | null> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  /**
   * DELETE 请求
   */
  async delete<T>(
    endpoint: string,
    options?: ApiRequestOptions
  ): Promise<T | null> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      ...options,
    });
  }

  /**
   * 获取当前的 baseUrl
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * 动态设置 baseUrl（用于特殊情况）
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url.endsWith("/") ? url.slice(0, -1) : url;
  }
}

// 创建默认的 API 客户端实例
export const apiClient = new ApiClient();

// 导出便捷方法
export const { get, post, put, patch, delete: del } = apiClient;

export default apiClient;
