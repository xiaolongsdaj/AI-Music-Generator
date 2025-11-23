'use client'

import { useAuth as useClerkAuth, useUser } from '@clerk/nextjs';

/**
 * 认证管理工具模块
 * 统一管理 Clerk 认证和会话
 */

// 客户端使用的认证 Hook
export function useAuth() {
  const {
    userId,
    sessionId,
    getToken,
    isSignedIn,
    isLoaded,
  } = useClerkAuth();

  // 获取用户信息
  const { user } = useUser();

  /**
   * 获取当前会话的 token
   */
  const getSessionToken = async (): Promise<string | null> => {
    if (!isSignedIn) {
      return null;
    }
    try {
      const token = await getToken();
      return token;
    } catch (error) {
      console.error('获取 token 失败:', error);
      return null;
    }
  };

  /**
   * 获取用户信息
   */
  const getUserInfo = () => {
    if (!isSignedIn || !user) {
      return null;
    }
    return {
      id: userId,
      email: user.emailAddresses[0]?.emailAddress || '',
      name: user.fullName || user.firstName || '',
      image: user.imageUrl || '',
      sessionId,
    };
  };

  /**
   * 检查是否已登录
   */
  const checkAuth = (): boolean => {
    return isSignedIn === true && isLoaded === true;
  };

  return {
    userId,
    sessionId,
    getToken: getSessionToken,
    isSignedIn,
    isLoaded,
    user,
    getUserInfo,
    checkAuth,
  };
}

/**
 * 获取认证头（用于 API 请求）
 * 在客户端组件中使用
 */
export async function getAuthHeaders(getToken?: () => Promise<string | null>): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (getToken) {
    try {
      const token = await getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('获取 token 失败:', error);
    }
  }

  return headers;
}

