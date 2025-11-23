import { getAuthHeaders } from './auth';

/**
 * 带身份验证的内部 API 请求工具函数
 * 
 * @param url - API 端点 URL（如 '/api/music/generate'）
 * @param params - 请求参数对象
 * @param getToken - Clerk 的 getToken 函数（从 useAuth() 获取），可选
 * @param method - HTTP 方法，默认为 'POST'
 * @returns { success: boolean, data: any, error: string }
 */
export async function fetchFromAPI(
  url: string, 
  params: any = {}, 
  getToken?: () => Promise<string | null>, 
  method: 'GET' | 'POST' = 'POST'
) {
  try {
    // 构建请求 URL
    const fullUrl = url.startsWith('/') ? url : `/${url}`;
    let requestUrl = fullUrl;
    
    // 获取认证头（自动添加 token）
    const headers = await getAuthHeaders(getToken);

    // 构建请求选项
    const requestOptions: RequestInit = {
      method,
      headers,
      credentials: 'include', // 包含 cookies，Clerk 可能会使用
    };

    // POST 请求添加 body，GET 请求将参数添加到 URL
    if (method === 'POST' && params && Object.keys(params).length > 0) {
      requestOptions.body = JSON.stringify(params);
    } else if (method === 'GET' && params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams(params);
      requestUrl = `${fullUrl}?${searchParams.toString()}`;
    }

    const response = await fetch(requestUrl, requestOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 401) {
        return { success: false, data: null, error: '未授权：请先登录' };
      }
      
      return { success: false, data: null, error: errorData.error || errorData.message || `请求失败: ${response.status}` };
    }

    const data = await response.json();
    
    // 直接返回数据（API 路由返回的格式）
    return { success: true, data, error: '' };
  } catch (error: any) {
    return { success: false, data: null, error: error.message || '网络错误，请稍后重试' };
  }
}

