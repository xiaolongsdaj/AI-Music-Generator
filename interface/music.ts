export interface MusicData {
  id: string;
  userId?: string; // 用户ID（可选，用于向后兼容）
  name: string; // 音乐名称
  description: string;
  style: string;
  mood: string;
  duration: number;
  tempo: string;
  vocalType?: string; // 人声类型
  audioUrl: string;
  createdAt: string;
}