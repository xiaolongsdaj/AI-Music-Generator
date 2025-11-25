'use client'
import { useState, useEffect, useRef } from 'react';
import { MusicData } from '../../app/api/music/types';
import { useAuth } from '../../lib/auth';
import { fetchFromAPI } from '../../lib/api-client';
import MusicPlayerModal from './MusicPlayerModal';
import { useSubscriptionPermissions } from '@/lib/subscription-permissions';
import { getMusicStyles, getMusicMoods, getAvailableDurations, getModelsBySubscriptionLevel, getHumanVoices } from '@/lib/model';

// 导入参数配置系统
import {
  parameterConfigs,
  parameterGroups,
  modeConfigs,
  getVisibleParameters,
  getParameterDefaultValue,
  formatParametersForAPI,
  ParameterConfig,
  ParameterGroup,
} from '../../data/musicgenerator/parameterConfig';

/**
 * 音乐生成器表单组件 - 支持多种音乐生成模式
 * 
 * @description 这是一个可配置的音乐生成器表单组件，支持三种主要模式：
 * 1. 灵感音乐模式 - 根据描述生成音乐
 * 2. 自定义音乐模式 - 根据歌词生成音乐
 * 3. 纯音乐模式 - 生成纯器乐音乐
 * 
 * @component
 * @param {Object} props - 组件属性
 * @param {string} props.mode - 生成模式 ('inspiration' | 'custom' | 'instrumental')
 * @param {Object} [props.initialConfig] - 初始配置参数
 * @param {string} [props.initialConfig.musicName] - 初始音乐名称
 * @param {string} [props.initialConfig.musicDescription] - 初始音乐描述（灵感模式）
 * @param {string} [props.initialConfig.lyrics] - 初始歌词（自定义模式）
 * @param {string} [props.initialConfig.musicStyle] - 初始音乐风格
 * @param {string} [props.initialConfig.mood] - 初始情感氛围
 * @param {string} [props.initialConfig.duration] - 初始音乐时长
 * @param {string} [props.initialConfig.tempo] - 初始音乐速度
 * @param {string} [props.initialConfig.vocalType] - 初始人声类型
 * @param {string} [props.initialConfig.modelId] - 初始模型ID
 * @param {string} [props.generateButtonText] - 生成按钮的自定义文本
 * @param {function} [props.onMusicGenerated] - 音乐生成完成后的回调函数
 * @returns {React.ReactElement} 音乐生成器表单组件
 * 
 * @example
 * // 使用灵感音乐模式
 * <MusicGeneratorForm 
 *   mode="inspiration"
 *   initialConfig={{ musicStyle: 'pop', mood: 'happy' }}
 *   generateButtonText="生成灵感音乐"
 * />
 * 
 * @example
 * // 使用自定义音乐模式
 * <MusicGeneratorForm 
 *   mode="custom"
 *   initialConfig={{ musicStyle: 'rock', lyrics: '这是一段歌词...' }}
 *   onMusicGenerated={(musicData) => console.log('音乐已生成:', musicData)}
 * />
 * 
 * @example
 * // 使用纯音乐模式
 * <MusicGeneratorForm 
 *   mode="instrumental"
 *   generateButtonText="生成纯音乐"
 * />
 */

// 定义组件的Props接口
type MusicGeneratorFormProps = {
  // 音乐生成器模式：'inspiration'（灵感音乐）, 'custom'（自定义音乐）, 'instrumental'（纯音乐）
  mode: 'inspiration' | 'custom' | 'instrumental';
  // 可选的预设配置，用于覆盖默认值
  initialConfig?: Record<string, any>;
  // 自定义生成按钮文本
  generateButtonText?: string;
  // 生成音乐后的自定义回调函数
  onMusicGenerated?: (musicData: MusicData) => void;
};

const MusicGeneratorForm = ({ 
  mode = 'inspiration',
  initialConfig = {},
  generateButtonText = '开始创作',
  onMusicGenerated
}: MusicGeneratorFormProps) => {
  // 使用统一的认证 Hook
  const { getToken, checkAuth } = useAuth();
  // 使用订阅权限 Hook
  const { canUseFeature, getSubscriptionDisplayInfo } = useSubscriptionPermissions();//检查用户是否有使用某个功能的权限
  
  // 根据权限判断订阅级别
  const determineSubscriptionLevel = () => {
    if (canUseFeature('high-quality')) return 'premium';
    if (canUseFeature('custom-parameters')) return 'standard';
    return 'free';
  };
  
  // 获取配置数据
  const styleOptions = getMusicStyles();
  const moodOptions = getMusicMoods();
  const humanVoiceOptions = getHumanVoices();
  const subscriptionLevel = determineSubscriptionLevel();
  const availableDurations = getAvailableDurations(subscriptionLevel);
  const availableModels = getModelsBySubscriptionLevel(subscriptionLevel);
  
  // 初始化参数状态 - 使用统一的参数对象管理所有参数
  const initializeParameters = () => {
    const params: Record<string, any> = {};
    
    // 遍历所有参数配置，设置默认值
    parameterConfigs.forEach(param => {
      // 优先使用initialConfig中的值
      if (param.id in initialConfig) {
        params[param.id] = initialConfig[param.id];
      } else {
        // 使用模式特定的默认值或全局默认值
        params[param.id] = getParameterDefaultValue(param.id, mode);
      }
    });
    
    return params;
  };
  
  // 统一的参数状态管理
  const [parameters, setParameters] = useState<Record<string, any>>(initializeParameters);
  
  // UI相关状态
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMusic, setGeneratedMusic] = useState<MusicData | null>(null);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  
  // 引用
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modelSelectorRef = useRef<HTMLDivElement>(null);
  
  // 处理参数变化的通用函数
  const handleParameterChange = (paramId: string, value: any) => {
    setParameters(prev => ({
      ...prev,
      [paramId]: value
    }));
    
    // 特殊处理时长选择（权限控制）
    if (paramId === 'duration') {
      const durationSeconds = parseInt(value);
      if (durationSeconds > 30 && !canUseFeature('custom-parameters')) {
        setShowUpgradePrompt(true);
        // 不更新值，保持当前有效值
        return;
      }
    }
  };
  
  // 确保选中的模型在可用模型范围内
  useEffect(() => {
    const modelExists = availableModels.some(model => model.id === parameters.modelId);
    if (!modelExists && availableModels.length > 0) {
      handleParameterChange('modelId', availableModels[0].id);
    }
  }, [parameters.modelId, availableModels]);
  
  // 获取当前可见的参数（重复定义已删除）
  
  // 获取指定分组的参数
  const getParametersByGroup = (group: ParameterGroup) => {
    const visibleParams = getCurrentVisibleParameters();
    return visibleParams.filter(param => param.group === group.id);
  };
  
  // 获取参数的选项（将在后面统一定义）
  
  // 渲染单个参数（将在后面统一定义）
  
  // 渲染模型选择器已移至组件底部统一实现
    
    // 生成音乐处理函数
    const handleGenerateMusic = async () => {
      // 检查是否已登录（使用统一的认证检查）
      if (!checkAuth()) {
        setError('请先登录后再生成音乐');
        setTimeout(() => setError(null), 3000);
        return;
      }

      // 获取当前模式下可见的参数
      const visibleParams = getVisibleParameters(mode, subscriptionLevel, parameters);
      
      // 验证必填参数
      for (const param of visibleParams) {
        if (param.required) {
          const value = parameters[param.id];
          if (!value || (typeof value === 'string' && !value.trim())) {
            setError(`请填写${param.label}`);
            setTimeout(() => setError(null), 3000);
            return;
          }
        }
        
        // 执行自定义验证
        if (param.validation) {
          const value = parameters[param.id];
          if (param.validation.minLength && (typeof value === 'string' && value.length < param.validation.minLength)) {
            setError(param.validation.message || `请输入至少${param.validation.minLength}个字符`);
            setTimeout(() => setError(null), 3000);
            return;
          }
        }
      }

      // 权限检查：检查是否尝试使用高级功能
      const requestedDuration = parseInt(parameters.duration);
      const isUsingAdvancedFeatures = requestedDuration > 30;
      
      if (isUsingAdvancedFeatures && !canUseFeature('custom-parameters')) {
        setShowUpgradePrompt(true);
        return;
      }

      setIsGenerating(true);
      setError(null);
      
      try {
        // 使用参数配置系统格式化API请求参数
        const requestParams = formatParametersForAPI(parameters, mode);
        
        const result = await fetchFromAPI('/api/music/generate', 
          requestParams,
          getToken,
          'POST'
        );
      
      if (!result.success) {
        throw new Error(result.error || '生成音乐失败');
      }
      
      // 保存生成的音乐数据
      setGeneratedMusic(result.data as MusicData);
      
      // 如果提供了自定义回调，则调用
      if (onMusicGenerated) {
        onMusicGenerated(result.data as MusicData);
      }
      
      setIsPlayerModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成音乐时出现错误');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // 全局点击事件监听器 - 点击下拉菜单外的区域时关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showModelDropdown && 
          dropdownRef.current && 
          modelSelectorRef.current &&
          !dropdownRef.current.contains(event.target as Node) && 
          !modelSelectorRef.current.contains(event.target as Node)) {
        setShowModelDropdown(false);
      }
    };

    // 添加事件监听器
    document.addEventListener('mousedown', handleClickOutside);
    
    // 清理函数
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModelDropdown]);
  
  // 获取当前模式下可见的参数
  const getCurrentVisibleParameters = () => {
    return getVisibleParameters(mode, subscriptionLevel, parameters);
  };
  
  // 根据分组获取参数（重复定义已删除）
  
  // 获取参数的选项（如果是select类型）
  const getParameterOptions = (param: ParameterConfig) => {
    if (param.options) return param.options;
    
    // 根据参数ID返回对应的选项
    switch (param.id) {
      case 'musicStyle':
        return styleOptions;
      case 'mood':
        return moodOptions;
      case 'vocalType':
        return humanVoiceOptions;
      case 'duration':
        return availableDurations;
      case 'modelId':
        return availableModels.map(model => ({
          value: model.id,
          label: model.name,
          free: true // 假设所有模型都可在基础级别使用
        }));
      default:
        return [];
    }
  };
  
  // 渲染单个参数（重复定义已删除）

  
  // 特殊处理模型选择器（下拉菜单）
  const renderModelSelector = () => {
    const modelParam = parameterConfigs.find(p => p.id === 'modelId');
    if (!modelParam) return null;
    
    return (
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          {modelParam.label}
        </label>
        <div className="relative">
          <div 
            ref={modelSelectorRef}
            className="w-full p-3 bg-gray-700/40 border border-gray-600/60 rounded-xl flex justify-between items-center cursor-pointer hover:border-indigo-500/50 transition-all"
            onClick={() => setShowModelDropdown(!showModelDropdown)}
          >
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⚡</span>
              <span>{availableModels.find(m => m.id === parameters.modelId)?.name || '选择模型'}</span>
            </div>
            <span className={`text-gray-400 transition-transform duration-300 ${showModelDropdown ? 'rotate-180' : ''}`}>▼</span>
          </div>
            
          {/* 模型选择列表 - 仅在showModelDropdown为true时显示 */}
          {showModelDropdown && (
            <div ref={dropdownRef} className="absolute top-full left-0 right-0 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl z-10 mt-1 overflow-hidden">
              {availableModels.map((model) => {
                // 提取版本号用于显示
                const versionMatch = model.name.match(/v\d+(?:\.\d+)?(?:\+)?/);
                const version = versionMatch ? versionMatch[0] : '';
                
                return (
                  <div 
                    key={model.id}
                    className={`p-3 border-b border-gray-700/50 cursor-pointer hover:bg-gray-700/30 transition-all flex justify-between items-center ${parameters.modelId === model.id ? 'bg-gray-700/40' : ''}`}
                    onClick={() => {
                      handleParameterChange('modelId', model.id);
                      setShowModelDropdown(false); // 选择后关闭下拉菜单
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {parameters.modelId === model.id && (
                        <span className="text-green-400 font-bold">✓</span>
                      )}
                      <span className="text-yellow-400">⚡</span>
                      <div>
                        <div className="text-white font-medium">
              {model.name}
            </div>
                      </div>
                    </div>
                    <span className="text-green-400">●</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-4">
        {/* 模型选择 */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            模型选择
          </label>
          <div className="relative">
            {/* 当前选中的模型显示 */}
          <div 
            ref={modelSelectorRef}
            className="w-full p-3 bg-gray-700/40 border border-gray-600/60 rounded-xl flex justify-between items-center cursor-pointer hover:border-indigo-500/50 transition-all"
            onClick={() => setShowModelDropdown(!showModelDropdown)}
          >
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⚡</span>
              <span>{availableModels.find(m => m.id === parameters.modelId)?.name || '选择模型'}</span>
            </div>
            <span className={`text-gray-400 transition-transform duration-300 ${showModelDropdown ? 'rotate-180' : ''}`}>▼</span>
          </div>
            
            {/* 模型选择列表 - 仅在showModelDropdown为true时显示 */}
            {showModelDropdown && (
              <div ref={dropdownRef} className="absolute top-full left-0 right-0 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl z-10 mt-1 overflow-hidden">
                {availableModels.map((model) => {
                  // 提取版本号用于显示
                  const versionMatch = model.name.match(/v\d+(?:\.\d+)?(?:\+)?/);
                  const version = versionMatch ? versionMatch[0] : '';
                   
                  return (
                    <div 
                      key={model.id}
                      className={`p-3 border-b border-gray-700/50 cursor-pointer hover:bg-gray-700/30 transition-all flex justify-between items-center ${parameters.modelId === model.id ? 'bg-gray-700/40' : ''}`}
                      onClick={() => {
                        handleParameterChange('modelId', model.id);
                        setShowModelDropdown(false); // 选择后关闭下拉菜单
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {parameters.modelId === model.id && (
                          <span className="text-green-400 font-bold">✓</span>
                        )}
                        <span className="text-yellow-400">⚡</span>
                        <div>
                          <div className="text-white font-medium">
                {model.name}
              </div>
                        </div>
                      </div>
                      <span className="text-green-400">●</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>


        {/* 音乐名称输入 */}
        <div>
          <label htmlFor="musicName" className="block text-sm font-medium text-white mb-1">
            歌曲名称
          </label>
          <input
            id="musicName"
              type="text"
              className="w-full p-3 bg-gray-700/40 border border-gray-600/60 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="输入音乐名称"
              value={parameters.musicName}
              onChange={(e) => handleParameterChange('musicName', e.target.value)}
          />
        </div>

        {/* 音乐描述输入 - 仅在灵感音乐模式显示 */}
        {mode === 'inspiration' && (
          <div>
            <label htmlFor="musicDescription" className="block text-sm font-medium text-white mb-1">
              音乐描述 *
            </label>
            <textarea
              id="musicDescription"
              className="w-full p-4 bg-gray-700/40 border border-gray-600/60 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-y h-32"
              placeholder="描述你想要的音乐风格、情感等"
              value={parameters.musicDescription}
              onChange={(e) => handleParameterChange('musicDescription', e.target.value)}
            />
          </div>
        )}
        
        {/* 歌词输入 - 仅在自定义音乐模式显示 */}
        {mode === 'custom' && (
          <div>
            <label htmlFor="lyrics" className="block text-sm font-medium text-white mb-1">
              歌词 *
            </label>
            <textarea
              id="lyrics"
              className="w-full p-4 bg-gray-700/40 border border-gray-600/60 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-y h-48"
              placeholder="输入歌词"
              value={parameters.lyrics}
              onChange={(e) => handleParameterChange('lyrics', e.target.value)}
            />
          </div>
        )}

        

        {/* 三个选择器并排显示 */}
        <div className="grid grid-cols-3 gap-4">
          {/* 音乐风格 */}
          <div>
            <label htmlFor="musicStyle" className="block text-sm font-medium text-white mb-1">
              音乐风格
            </label>
            <div className="relative">
              <select
                  id="musicStyle"
                  className="w-full p-3 bg-gray-800/60 border border-gray-600/80 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 transition-all duration-300 appearance-none cursor-pointer hover:border-indigo-400/30 bg-opacity-80"
                  value={parameters.musicStyle}
                  onChange={(e) => handleParameterChange('musicStyle', e.target.value)}
              >
                <option value="" className="bg-gray-800 text-white">选择音乐风格</option>
                {styleOptions.map((style) => (
                  <option key={style.value} value={style.value} className="bg-gray-800 text-white hover:bg-gray-700">{style.label}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
          </div>

          {/* 情感氛围 */}
          <div>
            <label htmlFor="mood" className="block text-sm font-medium text-white mb-1">
              情感氛围
            </label>
            <div className="relative">
              <select
                  id="mood"
                  className="w-full p-3 bg-gray-800/60 border border-gray-600/80 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 transition-all duration-300 appearance-none cursor-pointer hover:border-indigo-400/30 bg-opacity-80"
                  value={parameters.mood}
                  onChange={(e) => handleParameterChange('mood', e.target.value)}
              >
                <option value="" className="bg-gray-800 text-white">选择情感氛围</option>
                {moodOptions.map((moodOption) => (
                  <option key={moodOption.value} value={moodOption.value} className="bg-gray-800 text-white hover:bg-gray-700">{moodOption.label}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
          </div>

          {/* 人声类型 - 不在纯音乐模式显示 */}
          {mode !== 'instrumental' && (
            <div>
              <label htmlFor="vocalType" className="block text-sm font-medium text-white mb-1">
                人声类型
              </label>
              <div className="relative">
                <select
                      id="vocalType"
                      className="w-full p-3 bg-gray-800/60 border border-gray-600/80 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 transition-all duration-300 appearance-none cursor-pointer hover:border-indigo-400/30 bg-opacity-80"
                      value={parameters.vocalType}
                      onChange={(e) => handleParameterChange('vocalType', e.target.value)}
                >
                  <option value="" className="bg-gray-800 text-white">选择人声类型</option>
                  {humanVoiceOptions.map((voice) => (
                    <option key={voice.value} value={voice.value} className="bg-gray-800 text-white hover:bg-gray-700">{voice.label}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 音乐时长和速度选择 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 时长选择 - 带权限控制 */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-white mb-1">
              音乐时长
            </label>
            <div className="relative">
              <select
                id="duration"
                className={`w-full p-3 bg-gray-800/60 border border-gray-600/80 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 transition-all duration-300 appearance-none cursor-pointer hover:border-indigo-400/30 bg-opacity-80 ${!canUseFeature('custom-parameters') ? 'opacity-70 cursor-not-allowed' : ''}`}
                value={parameters.duration}
                onChange={(e) => handleParameterChange('duration', e.target.value)}
              >
                {availableDurations.map((durationOption) => (
                  <option 
                    key={durationOption.value} 
                    value={durationOption.value}
                    disabled={('free' in durationOption && !durationOption.free) && !canUseFeature('custom-parameters')}
                    className={`bg-gray-800 ${('free' in durationOption && !durationOption.free) && !canUseFeature('custom-parameters') ? 'text-gray-500' : 'text-white'}`}
                  >
                    {durationOption.label}{('free' in durationOption && !durationOption.free) && !canUseFeature('custom-parameters') ? ' (高级用户)' : ''}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
          </div>

          {/* 音乐速度 */}
          <div>
            <label htmlFor="tempo" className="block text-sm font-medium text-white mb-1">
              音乐速度
            </label>
            <div className="relative">
              <select
                  id="tempo"
                  className="w-full p-3 bg-gray-800/60 border border-gray-600/80 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 transition-all duration-300 appearance-none cursor-pointer hover:border-indigo-400/30 bg-opacity-80"
                  value={parameters.tempo}
                  onChange={(e) => handleParameterChange('tempo', e.target.value)}
              >
                <option value="slow" className="bg-gray-800 text-white hover:bg-gray-700">慢</option>
                <option value="medium" className="bg-gray-800 text-white hover:bg-gray-700">中等</option>
                <option value="fast" className="bg-gray-800 text-white hover:bg-gray-700">快</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <button
          className={`w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-bold transition-all hover:shadow-lg hover:shadow-purple-600/20 ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
          onClick={handleGenerateMusic}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {generateButtonText || '开始创作'}
            </div>
          ) : generateButtonText || '开始创作'}
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
                className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl text-white font-bold transition-colors"
                onClick={() => {
                  setShowUpgradePrompt(false);
                  window.location.href = 'musicGenerator/pricing';
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