import { auth, currentUser } from '@clerk/nextjs/server';

/**
 * 服务端认证工具模块
 * 用于 API 路由和服务端组件
 */

/**
 * 验证当前用户是否已登录
 * @returns { userId: string | null, isAuthenticated: boolean }
 */
export async function verifyAuth() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return {
        userId: null,
        isAuthenticated: false,
        error: '未授权：请先登录',
      };
    }

    return {
      userId,
      isAuthenticated: true,
      error: null,
    };
  } catch (error) {
    console.error('验证身份失败:', error);
    return {
      userId: null,
      isAuthenticated: false,
      error: '验证身份时发生错误',
    };
  }
}

/**
 * 获取当前用户信息（服务端）
 * @returns 用户信息或 null
 */
export async function getCurrentUser() {
  try {
    const user = await currentUser();
    return user;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return null;
  }
}

/**
 * 获取当前用户的完整认证信息
 * @returns { user, userId, isAuthenticated, error }
 */
export async function getAuthSession() {
  const authResult = await verifyAuth();
  
  if (!authResult.isAuthenticated) {
    return {
      user: null,
      userId: null,
      isAuthenticated: false,
      error: authResult.error,
    };
  }

  const user = await getCurrentUser();
  
  return {
    user,
    userId: authResult.userId,
    isAuthenticated: true,
    error: null,
  };
}

/**
 * 保护 API 路由（中间件函数）
 * 如果用户未登录，返回 401 错误
 */
export async function protectApiRoute() {
  const authResult = await verifyAuth();
  
  if (!authResult.isAuthenticated) {
    throw new Error(authResult.error || '未授权：请先登录');
  }

  return {
    userId: authResult.userId!,
  };
}

