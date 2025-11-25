'use client'
import React, { useState } from 'react';
import { MusicData, styleOptions, moodOptions } from '../../app/api/music/types';
import { useAuth } from '../../lib/auth';
import { fetchFromAPI } from '../../lib/api-client';
import MusicPlayerModal from './MusicPlayerModal';
import { useSubscriptionPermissions } from '@/lib/subscription-permissions';

const MusicGeneratorForm = () => {
  // 使用统一的认证 Hook
  const { getToken, checkAuth } = useAuth();
  // 使用订阅权限 Hook
  const { canUseFeature, getSubscriptionDisplayInfo } = useSubscriptionPermissions();//检查用户是否有使用某个功能的权限
  
  // 音乐生成相关状态
  const [musicDescription, setMusicDescription] = useState('');//音乐描述
  const [musicStyle, setMusicStyle] = useState('');//音乐风格
  const [mood, setMood] = useState('');//音乐情感
  const [duration, setDuration] = useState('30');//音乐时长
  const [tempo, setTempo] = useState('medium');//音乐速度
  const [isGenerating, setIsGenerating] = useState(false);//是否正在生成音乐
  const [generatedMusic, setGeneratedMusic] = useState<MusicData | null>(null);//生成的音乐数据
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);//是否打开音乐播放器弹窗
  const [error, setError] = useState<string | null>(null);//错误信息
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);//是否显示升级提示弹窗
  
  // 生成音乐处理函数
  const handleGenerateMusic = async () => {
    // 检查是否已登录（使用统一的认证检查）
    if (!checkAuth()) {
      setError('请先登录后再生成音乐');
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (!musicDescription || !musicStyle || !mood) {
      setError('请填写完整的音乐描述和选择参数');
      setTimeout(() => setError(null), 3000);
      return;
    }

    // 权限检查：检查是否尝试使用高级功能
    const requestedDuration = parseInt(duration);
    const isUsingAdvancedFeatures = requestedDuration > 30;
    
    if (isUsingAdvancedFeatures && !canUseFeature('custom-parameters')) {
      setShowUpgradePrompt(true);
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await fetchFromAPI('/api/music/generate', {
        description: musicDescription,
        style: musicStyle,
        mood: mood,
        duration: duration,
        tempo: tempo,
      },
      getToken,
      'POST'
      );
      
      if (!result.success) {
        throw new Error(result.error || '生成音乐失败');
      }
      
      // 保存生成的音乐数据
      setGeneratedMusic(result.data as MusicData);
      
      setIsPlayerModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成音乐时出现错误');
    } finally {
      setIsGenerating(false);
    }
  };

  // 处理时长选择（根据权限控制）
  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDuration = e.target.value;
    const durationSeconds = parseInt(newDuration);
    
    // 检查是否选择了高级功能但没有权限
    if (durationSeconds > 30 && !canUseFeature('custom-parameters')) {
      setShowUpgradePrompt(true);
      return;
    }
    
    setDuration(newDuration);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* 音乐描述输入 */}
        <div>
          <label htmlFor="musicDescription" className="block text-sm font-medium text-white mb-1">
            音乐描述
          </label>
          <textarea
            id="musicDescription"
            className="w-full p-4 bg-gray-700/40 border border-gray-600/60 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all h-32 resize-y"
            placeholder="描述您想要生成的音乐风格、情感和氛围..."
            value={musicDescription}
            onChange={(e) => setMusicDescription(e.target.value)}
          />
        </div>

        {/* 风格选择 */}
        <div>
          <label htmlFor="musicStyle" className="block text-sm font-medium text-white mb-1">
            音乐风格
          </label>
          <select
            id="musicStyle"
            className="w-full p-3 bg-gray-700/40 border border-gray-600/60 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            value={musicStyle}
            onChange={(e) => setMusicStyle(e.target.value)}
          >
            <option value="">选择音乐风格</option>
            {styleOptions.map((style) => (
              <option key={style.value} value={style.value}>{style.label}</option>
            ))}
          </select>
        </div>

        {/* 情绪选择 */}
        <div>
          <label htmlFor="mood" className="block text-sm font-medium text-white mb-1">
            音乐情绪
          </label>
          <select
            id="mood"
            className="w-full p-3 bg-gray-700/40 border border-gray-600/60 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="">选择音乐情绪</option>
            {moodOptions.map((moodOption) => (
              <option key={moodOption.value} value={moodOption.value}>{moodOption.label}</option>
            ))}
          </select>
        </div>

        {/* 时长选择 - 带权限控制 */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="duration" className="block text-sm font-medium text-white">
              音乐时长
            </label>
            {!canUseFeature('custom-parameters') && (
              <span className="text-xs text-blue-400">高级用户可用更长时长</span>
            )}
          </div>
          <select
            id="duration"
            className={`w-full p-3 bg-gray-700/40 border border-gray-600/60 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${!canUseFeature('custom-parameters') ? 'cursor-not-allowed' : ''}`}
            value={duration}
            onChange={handleDurationChange}
          >
            <option value="15">15秒</option>
            <option value="30">30秒</option>
            {canUseFeature('custom-parameters') ? (
              <>
                <option value="60">60秒</option>
                <option value="120">120秒</option>
              </>
            ) : (
              <>
                <option value="60" disabled>60秒 (高级用户)</option>
                <option value="120" disabled>120秒 (高级用户)</option>
              </>
            )}
          </select>
        </div>

        {/* 速度选择 */}
        <div>
          <label htmlFor="tempo" className="block text-sm font-medium text-white mb-1">
            音乐速度
          </label>
          <select
            id="tempo"
            className="w-full p-3 bg-gray-700/40 border border-gray-600/60 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
          >
            <option value="slow">慢</option>
            <option value="medium">中等</option>
            <option value="fast">快</option>
          </select>
        </div>
        
        <button
          className={`w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl text-white font-bold transition-all hover:shadow-lg hover:shadow-indigo-600/20 ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
          onClick={handleGenerateMusic}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              正在生成...
            </div>
          ) : '生成音乐'}
        </button>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="mt-4 p-3 bg-red-900/30 border border-red-700/30 rounded-lg text-red-300">
          {error}
        </div>
      )}

      {/* 订阅计划提示 - 显示当前订阅状态 */}
      <div className="mt-4 text-center text-sm text-gray-400">
        <p>当前订阅: <span className="text-blue-400 font-medium">{getSubscriptionDisplayInfo().planName}</span></p>
        <a href="/musicGenerator/pricing" className="text-blue-400 hover:underline mt-1 inline-block">升级订阅以解锁更多功能</a>
      </div>

      {/* 音乐播放器模态框 */}
      {isPlayerModalOpen && (
        <MusicPlayerModal 
          isOpen={isPlayerModalOpen}
          music={generatedMusic!}
          onClose={() => setIsPlayerModalOpen(false)}
        />
      )}

      {/* 升级提示弹窗 */}
      {showUpgradePrompt && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700/50 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-3">需要升级订阅</h3>
            <p className="text-gray-300 mb-5">
              您正在尝试使用高级功能，这需要升级到标准版或企业版订阅。
            </p>
            <div className="space-y-3">
              <button
                className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl text-white font-bold transition-all"
                onClick={() => {
                  setShowUpgradePrompt(false);
                  window.location.href = '/pricing';
                }}
              >
                查看订阅计划
              </button>
              <button
                className="w-full py-3 px-6 bg-gray-700/50 hover:bg-gray-700 rounded-xl text-white font-medium transition-all"
                onClick={() => setShowUpgradePrompt(false)}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicGeneratorForm;