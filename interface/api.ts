export interface MusicGenerateParams {
  name: string; // 音乐名称
  description: string;
  style: string;
  mood: string;
  duration: string;
  tempo: string;
  vocalType: string;
  modelId: string;
  }
// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}