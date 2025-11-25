// 统一的音乐生成配置文件
// 整合模型配置和参数配置，避免重复定义

/**
 * 模型定义类型
 */
export type MusicModel = {
  id: string;
  name: string;
  description: string;
  minimumSubscriptionLevel: string;
};

export type ParameterOption = Option;

/**
 * 选项类型 - 用于select和multiselect类型的参数
 */
export type Option = {
  value: string | number;
  label: string;
  free?: boolean;
  description?: string;
  icon?: string;
  bpmRange?: string;
};

/**
 * 参数类型定义 - 支持多种输入控件类型
 */
export type ParameterType = 'string' | 'number' | 'select' | 'textarea' | 'checkbox' | 'multiselect' | 'tags';

/**
 * 参数可见性条件类型 - 灵活控制参数在不同场景下的显示
 */
export type VisibilityCondition = {
  mode?: string | string[];
  subscriptionLevel?: string | string[];
  requiresFeature?: string;
  customCondition?: (values: Record<string, any>) => boolean;
  dependsOn?: {
    paramId: string;
    values: any | any[];
  };
};

/**
 * 单个参数配置类型 - 完整的参数元数据定义
 */
export type ParameterConfig = {
  id: string;
  label: string;
  type: ParameterType;
  group: string;
  required?: boolean;
  defaultValue?: any;
  placeholder?: string;
  options?: Option[];
  visibility?: VisibilityCondition;
  apiKey?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    message?: string;
  };
  description?: string;
  tooltip?: string;
  className?: string;
  height?: string;
  order?: number;
};

/**
 * 工具配置类型 - 用于扩展不同的音乐生成工具
 */
export type ToolConfig = {
  id: string;
  name: string;
  description: string;
  icon?: string;
  allowedModes?: string[];
  customParameters?: ParameterConfig[];
};

export type ModeConfig = {
  id: string;
  name: string;
  description?: string;
  parameterGroups: string[];
  defaultParameters?: Record<string, any>;
};

/**
 * 参数分组配置
 */
export type ParameterGroup = {
  id: string;
  label: string;
  order: number;
  description: string;
  collapsible?: boolean;
};

// ModeConfig type already defined above

/**
 * 音乐生成模型配置
 */
export const AI_MODELS_CONFIG = {
  // 音乐生成模型
  musicGeneration: {
    category: "音乐生成",
    models: [
      {
        id: "Chirp v4.0",
        name: "Chirp v4.0",
        description: "擅长生成流行音乐旋律，适合短视频和社交媒体使用",
        minimumSubscriptionLevel: "free"
      },
      {
        id: "Chirp v4.5", 
        name: "Chirp v4.5",
        description: "专业古典和交响乐生成，适合电影配乐和商业项目",
        minimumSubscriptionLevel: "standard"
      },
      {
        id: "Chirp v5.0",
        name: "Chirp v5.0",
        description: "专业爵士音乐生成，风格纯正，即兴性强",
        minimumSubscriptionLevel: "standard"
      },
      {
        id: "Chirp v5.5",
        name: "Chirp v5.5",
        description: "生成地道的乡村和民谣风格音乐，温暖质朴",
        minimumSubscriptionLevel: "enterprise"
      }
    ],
    // 音乐风格选项
    musicStyles: [
      { value: "pop", label: "流行" },
      { value: "classical", label: "古典" },
      { value: "jazz", label: "爵士" },
      { value: "rock", label: "摇滚" },
      { value: "electronic", label: "电子" },
      { value: "country", label: "乡村" },
      { value: "folk", label: "民谣" },
    ],
    // 音乐情绪选项
    musicMoods: [
      { value: "happy", label: "欢快" },
      { value: "sad", label: "悲伤" },
      { value: "exciting", label: "激动" },
      { value: "calm", label: "平静" },
      { value: "mysterious", label: "神秘" },
      { value: "inspiring", label: "鼓舞人心" },
      { value: "romantic", label: "浪漫" },
    ],
    // 音乐速度选项
    musicTempos: [
      { value: "slow", label: "慢", bpmRange: "60-90" },
      { value: "medium", label: "中等", bpmRange: "90-120" },
      { value: "fast", label: "快", bpmRange: "120-160" }
    ],
    // 音乐时长选项（秒）
    musicDurations: [
      { value: "15", label: "15秒", free: true },
      { value: "30", label: "30秒", free: true },
      { value: "60", label: "60秒", free: false },
      { value: "120", label: "120秒", free: false },
      { value: "180", label: "180秒", free: false }
    ],
    // 人声音选项
    humanVoices: [
      { value: "random", label: "随机" },
      { value: "male", label: "男声" },
      { value: "female", label: "女声" },
    ],
  }
};

/**
 * 参数分组配置
 */
export const parameterGroups: ParameterGroup[] = [
  {
    id: 'basic',
    label: '基本信息',
    order: 1,
    description: '基本的音乐生成设置',
  },
  {
    id: 'content',
    label: '内容输入',
    order: 2,
    description: '根据不同模式输入音乐内容',
  },
  {
    id: 'style',
    label: '音乐风格',
    order: 3,
    description: '定义音乐的风格和情感',
  },
  {
    id: 'audio',
    label: '音频设置',
    order: 4,
    description: '控制音乐的时长、速度等属性',
  },
  {
    id: 'advanced',
    label: '高级选项',
    order: 5,
    collapsible: true,
    description: '专业级别的音乐定制选项',
  },
  {
    id: 'instrumentation',
    label: '乐器配置',
    order: 6,
    collapsible: true,
    description: '选择和定制音乐中的乐器',
  },
  {
    id: 'tags',
    label: '音乐标签',
    order: 7,
    description: '添加标签便于分类和搜索',
  },
];

/**
 * 定义支持的音乐生成工具
 */
export const toolConfigs: ToolConfig[] = [
  {
    id: 'standard',
    name: '标准音乐生成器',
    description: '基础的AI音乐创作工具',
    allowedModes: ['inspiration', 'custom', 'instrumental'],
  },
];

/**
 * 定义可用的音乐生成模式
 */
export const inspirationModeParameters = ['inspiration', 'referenceArtist', 'referenceSong'];
export const customModeParameters = ['musicStyle', 'mood', 'tempo', 'duration', 'instrument'];
export const instrumentalModeParameters = ['musicStyle', 'mood', 'tempo', 'duration'];
export const vocalModeParameters = ['musicStyle', 'mood', 'lyrics', 'vocals', 'language'];

export const modeConfigs: ModeConfig[] = [
  {
    id: 'inspiration',
    name: '灵感模式',
    description: '根据给定的灵感生成音乐',
    parameterGroups: ['inspiration'],
  },
  {
    id: 'custom',
    name: '自定义模式',
    description: '完全自定义音乐参数',
    parameterGroups: ['basic', 'advanced'],
  },
  {
    id: 'instrumental',
    name: '纯音乐模式',
    description: '生成不含人声的纯音乐',
    parameterGroups: ['basic', 'advanced'],
  },
  {
    id: 'vocal',
    name: '人声模式',
    description: '生成含有人声的音乐',
    parameterGroups: ['basic', 'vocal', 'advanced'],
  },
];

/**
 * 定义所有参数配置
 */
export const parameterConfigs: ParameterConfig[] = [
  // 基本信息组
  {
    id: 'modelId',
    label: '模型选择',
    type: 'select',
    group: 'basic',
    required: true,
    defaultValue: AI_MODELS_CONFIG.musicGeneration.models[0]?.id || 'model-music-gen-1',
    apiKey: 'modelId',
    options: AI_MODELS_CONFIG.musicGeneration.models.map(model => ({
      value: model.id,
      label: model.name,
      description: model.description,
      free: model.minimumSubscriptionLevel === 'free'
    })),
  },
  {
    id: 'musicName',
    label: '歌曲名称',
    type: 'string',
    group: 'basic',
    required: true,
    defaultValue: '',
    placeholder: '给你的音乐起个名字...',
    apiKey: 'name',
    validation: {
      minLength: 1,
      maxLength: 100,
      message: '请输入有效的歌曲名称',
    },
  },

  // 内容输入组
  {
    id: 'musicDescription',
    label: '音乐描述',
    type: 'textarea',
    group: 'content',
    required: true,
    defaultValue: '',
    placeholder: '描述您想要的音乐风格、情感或场景...',
    apiKey: 'description',
    visibility: {
      mode: 'inspiration',
    },
    validation: {
      minLength: 10,
      message: '请提供详细的音乐描述',
    },
  },
  {
    id: 'lyrics',
    label: '歌词',
    type: 'textarea',
    group: 'content',
    required: true,
    defaultValue: '',
    placeholder: '请输入您的歌词内容...',
    apiKey: 'lyrics',
    visibility: {
      mode: 'custom',
    },
    validation: {
      minLength: 10,
      message: '请输入有效的歌词内容',
    },
  },

  // 音乐风格组
  {
    id: 'musicStyle',
    label: '音乐风格',
    type: 'select',
    group: 'style',
    required: true,
    defaultValue: AI_MODELS_CONFIG.musicGeneration.musicStyles[0]?.value || 'pop',
    apiKey: 'style',
    options: AI_MODELS_CONFIG.musicGeneration.musicStyles,
  },
  {
    id: 'mood',
    label: '情感氛围',
    type: 'select',
    group: 'style',
    required: true,
    defaultValue: AI_MODELS_CONFIG.musicGeneration.musicMoods[0]?.value || 'happy',
    apiKey: 'mood',
    options: AI_MODELS_CONFIG.musicGeneration.musicMoods,
  },
  {
    id: 'vocalType',
    label: '人声类型',
    type: 'select',
    group: 'style',
    required: false,
    defaultValue: AI_MODELS_CONFIG.musicGeneration.humanVoices[0]?.value || 'random',
    apiKey: 'vocalType',
    visibility: {
      mode: ['inspiration', 'custom'], // 不在纯音乐模式显示
    },
    options: AI_MODELS_CONFIG.musicGeneration.humanVoices,
  },

  // 音频设置组
  {
    id: 'duration',
    label: '音乐时长',
    type: 'select',
    group: 'audio',
    required: true,
    defaultValue: AI_MODELS_CONFIG.musicGeneration.musicDurations[0]?.value || '15',
    apiKey: 'duration',
    options: AI_MODELS_CONFIG.musicGeneration.musicDurations,
  },
  {
    id: 'tempo',
    label: '音乐速度',
    type: 'select',
    group: 'audio',
    required: true,
    defaultValue: AI_MODELS_CONFIG.musicGeneration.musicTempos[0]?.value || 'medium',
    apiKey: 'tempo',
    options: AI_MODELS_CONFIG.musicGeneration.musicTempos,
  },

  // 高级选项组
  {
    id: 'complexity',
    label: '复杂程度',
    type: 'select',
    group: 'advanced',
    required: false,
    defaultValue: 'medium',
    apiKey: 'complexity',
    visibility: {
      subscriptionLevel: ['premium', 'standard'], // 标准和高级用户可见
    },
    options: [
      { value: 'simple', label: '简单', description: '适合短视频和广告的简洁旋律' },
      { value: 'medium', label: '中等', description: '平衡的结构和复杂度' },
      { value: 'complex', label: '复杂', description: '丰富的编曲和变化' },
    ],
    description: '控制音乐的整体复杂度和编曲密度',
  },
  
  // 乐器配置组
  {
    id: 'mainInstrument',
    label: '主奏乐器',
    type: 'select',
    group: 'instrumentation',
    required: false,
    defaultValue: 'default',
    apiKey: 'mainInstrument',
    visibility: {
      subscriptionLevel: ['premium', 'standard'], // 标准和高级用户可见
    },
    description: '选择音乐中的主要演奏乐器',
  },
  {
    id: 'secondaryInstruments',
    label: '辅助乐器',
    type: 'multiselect',
    group: 'instrumentation',
    required: false,
    defaultValue: [],
    apiKey: 'secondaryInstruments',
    visibility: {
      subscriptionLevel: 'premium', // 仅高级用户可见
    },
    description: '选择音乐中的辅助乐器',
  },
  {
    id: 'hasDrums',
    label: '包含鼓点',
    type: 'checkbox',
    group: 'instrumentation',
    required: false,
    defaultValue: true,
    apiKey: 'hasDrums',
    visibility: {
      mode: ['inspiration', 'custom'],
    },
    description: '是否在音乐中包含鼓点节奏',
  },
  
  // 标签组
  {
    id: 'tags',
    label: '音乐标签',
    type: 'tags',
    group: 'tags',
    required: false,
    defaultValue: [],
    placeholder: '添加标签...',
    apiKey: 'tags',
    visibility: {
      subscriptionLevel: ['premium', 'standard'], // 标准和高级用户可见
    },
    description: '添加标签便于分类和搜索您的音乐',
  },
  {
    id: 'genreTags',
    label: '风格标签',
    type: 'multiselect',
    group: 'tags',
    required: false,
    defaultValue: [],
    apiKey: 'genreTags',
    visibility: {
      subscriptionLevel: 'premium',
    },
    options: [
      { value: 'modern', label: '现代' },
      { value: 'classic', label: '经典' },
      { value: 'electronic', label: '电子' },
      { value: 'organic', label: '有机' },
      { value: 'upbeat', label: '欢快' },
      { value: 'melancholic', label: '忧郁' },
    ],
    description: '选择额外的风格标签',
  },
];

/**
 * 获取指定模式和条件下的可见参数
 */
export function getVisibleParameters(
  mode: string, 
  subscriptionLevel: string, 
  currentValues: Record<string, any> = {},
  featureAccess: string[] = [],
  toolId: string = 'standard'
): ParameterConfig[] {
  return parameterConfigs.filter(param => {
    // 默认可见
    if (!param.visibility) return true;

    // 检查模式条件
    if (param.visibility.mode) {
      const modes = Array.isArray(param.visibility.mode) ? param.visibility.mode : [param.visibility.mode];
      if (!modes.includes(mode)) return false;
    }

    // 检查订阅级别条件
    if (param.visibility.subscriptionLevel) {
      const requiredLevels = Array.isArray(param.visibility.subscriptionLevel) 
        ? param.visibility.subscriptionLevel 
        : [param.visibility.subscriptionLevel];
      
      // 实现订阅级别权限判断逻辑
      const hasAccess = requiredLevels.some(level => {
        if (level === 'free') return true; // 免费用户只有在明确指定时才能访问
        if (level === 'standard' && ['standard', 'premium'].includes(subscriptionLevel)) return true;
        if (level === 'premium' && subscriptionLevel === 'premium') return true;
        return false;
      });
      
      if (!hasAccess) return false;
    }

    // 检查功能权限条件
    if (param.visibility.requiresFeature && !featureAccess.includes(param.visibility.requiresFeature)) {
      return false;
    }

    // 检查依赖条件
    if (param.visibility.dependsOn) {
      const { paramId, values } = param.visibility.dependsOn;
      const currentValue = currentValues[paramId];
      
      if (Array.isArray(values)) {
        if (!values.includes(currentValue)) return false;
      } else {
        if (currentValue !== values) return false;
      }
    }

    // 检查自定义条件
    if (param.visibility.customCondition && typeof param.visibility.customCondition === 'function') {
      return param.visibility.customCondition(currentValues);
    }

    return true;
  }).sort((a, b) => (a.order || 0) - (b.order || 0)); // 按order排序
}

/**
 * 获取参数的默认值（考虑模式特定默认值）
 */
export function getParameterDefaultValue(paramId: string, mode: string): any {
  const param = parameterConfigs.find(p => p.id === paramId);
  if (!param) return undefined;

  // 优先使用模式特定的默认值
  const modeConfig = modeConfigs.find(m => m.id === mode);
  if (modeConfig && modeConfig.defaultParameters && paramId in modeConfig.defaultParameters) {
    return modeConfig.defaultParameters[paramId];
  }

  return param.defaultValue;
}

/**
 * 将参数值转换为API请求格式
 */
export function formatParametersForAPI(params: Record<string, any>, mode: string): Record<string, any> {
  const apiParams: Record<string, any> = {};
  const visibleParams = getVisibleParameters(mode, 'standard', params); // 简化处理，实际应传入正确的订阅级别

  visibleParams.forEach(param => {
    const value = params[param.id];
    if (value !== undefined && value !== null) {
      // 使用apiKey或默认使用id作为API参数名
      const key = param.apiKey || param.id;
      apiParams[key] = value;
    }
  });

  // 确保参数格式与后端期望一致
  // 在custom模式下，确保lyrics也映射到description（后端必需）
  if (mode === 'custom' && params.lyrics && !apiParams.description) {
    apiParams.description = params.lyrics;
  }

  return apiParams;
}

/**
 * 根据订阅级别获取可用的模型
 */
export function getModelsBySubscriptionLevel(subscriptionLevel: string) {
  const models = AI_MODELS_CONFIG.musicGeneration.models;
  return models.filter(model => {
    const modelLevel = model.minimumSubscriptionLevel;
    if (subscriptionLevel === "premium") return true;
    if (subscriptionLevel === "standard") return modelLevel !== "premium";
    return modelLevel === "free";
  });
}

/**
 * 根据ID获取特定模型
 */
export function getModelById(modelId: string) {
  const models = AI_MODELS_CONFIG.musicGeneration.models;
  return models.find(model => model.id === modelId);
}

/**
 * 获取所有音乐风格选项
 */
export function getMusicStyles() {
  return AI_MODELS_CONFIG.musicGeneration.musicStyles;
}

/**
 * 获取所有音乐情绪选项
 */
export function getMusicMoods() {
  return AI_MODELS_CONFIG.musicGeneration.musicMoods;
}

/**
 * 根据订阅级别获取可用的时长选项
 */
export function getAvailableDurations(subscriptionLevel: string) {
  const durations = AI_MODELS_CONFIG.musicGeneration.musicDurations;
  if (subscriptionLevel === "premium" || subscriptionLevel === "standard") {
    return durations;
  }
  return durations.filter(duration => duration.free);
}

/**
 * 获取所有人声类型选项
 */
export function getHumanVoices() {
  return AI_MODELS_CONFIG.musicGeneration.humanVoices;
}