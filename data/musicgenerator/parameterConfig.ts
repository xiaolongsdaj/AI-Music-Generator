// 音乐生成器参数配置文件
// 定义所有可能的音乐生成参数及其在不同模式下的行为

/**
 * 参数类型定义 - 支持多种输入控件类型
 */
export type ParameterType = 'string' | 'number' | 'select' | 'textarea' | 'checkbox' | 'multiselect' | 'tags';

/**
 * 参数可见性条件类型 - 灵活控制参数在不同场景下的显示
 */
export type VisibilityCondition = {
  mode?: string | string[]; // 适用的生成模式
  subscriptionLevel?: string | string[]; // 适用的订阅级别
  requiresFeature?: string; // 需要的特定功能权限
  customCondition?: (values: Record<string, any>) => boolean; // 自定义条件函数
  dependsOn?: {
    paramId: string;
    values: any | any[];
  }; // 依赖其他参数的值
};

/**
 * 参数选项类型 - 用于select和multiselect类型的参数
 */
export type ParameterOption = {
  value: string | number;
  label: string;
  free?: boolean; // 是否免费用户可用
  description?: string; // 选项描述
  icon?: string; // 选项图标
};

/**
 * 单个参数配置类型 - 完整的参数元数据定义
 */
export interface ParameterConfig {
  id: string; // 参数唯一标识符
  label: string; // 显示标签
  type: ParameterType; // 参数类型
  group: string; // 参数分组
  required?: boolean; // 是否必填
  defaultValue?: any; // 默认值
  placeholder?: string; // 占位文本
  options?: ParameterOption[]; // 选择类型的选项
  visibility?: VisibilityCondition; // 可见性条件
  apiKey?: string; // API请求中使用的键名（如果与id不同）
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    message?: string;
  };
  description?: string; // 参数描述（可选）
  tooltip?: string; // 提示文本
  className?: string; // 自定义CSS类名
  height?: string; // 文本区域高度
  order?: number; // 参数在分组内的显示顺序
}

/**
 * 工具配置类型 - 用于扩展不同的音乐生成工具
 */
export interface ToolConfig {
  id: string; // 工具ID
  name: string; // 工具名称
  description: string; // 工具描述
  icon?: string; // 工具图标
  allowedModes?: string[]; // 支持的模式
  customParameters?: ParameterConfig[]; // 工具专属参数
}

// 参数分组配置
export interface ParameterGroup {
  id: string; // 分组ID
  label: string; // 分组标签
  order: number; // 显示顺序
  description:string;
  collapsible?: boolean; // 是否可折叠
}

// 模式配置类型
export interface ModeConfig {
  id: string; // 模式ID
  label: string; // 模式标签
  description: string; // 模式描述
  defaultParameters?: Record<string, any>; // 该模式下的默认参数值
}

// 定义所有参数分组
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

// 定义支持的音乐生成工具
export const toolConfigs: ToolConfig[] = [
  {
    id: 'standard',
    name: '标准音乐生成器',
    description: '基础的AI音乐创作工具',
    allowedModes: ['inspiration', 'custom', 'instrumental'],
  },
  // 未来可以添加更多工具
  // {
  //   id: 'vocalizer',
  //   name: '人声转换工具',
  //   description: '将文本转换为专业人声演唱',
  //   allowedModes: ['custom'],
  //   customParameters: [/* 工具专属参数 */],
  // },
];

// 定义不同模式下的专属参数
export const inspirationModeParameters: ParameterConfig[] = [
  // 灵感模式专属参数可以在这里添加
];

export const customModeParameters: ParameterConfig[] = [
  // 自定义模式专属参数可以在这里添加
];

export const instrumentalModeParameters: ParameterConfig[] = [
  // 纯音乐模式专属参数可以在这里添加
];

// 定义所有可用的音乐生成模式
export const modeConfigs: ModeConfig[] = [
  {
    id: 'inspiration',
    label: '灵感音乐',
    description: '根据描述生成音乐',
    defaultParameters: {
      vocalType: 'random',
    },
  },
  {
    id: 'custom',
    label: '自定义音乐',
    description: '根据歌词生成音乐',
    defaultParameters: {
      vocalType: 'random',
    },
  },
  {
    id: 'instrumental',
    label: '纯音乐',
    description: '生成纯器乐音乐',
    defaultParameters: {
      vocalType: null, // 纯音乐模式不需要人声
    },
  },
];

// 定义所有参数配置
export const parameterConfigs: ParameterConfig[] = [
  // 基本信息组
  {
    id: 'modelId',
    label: '模型选择',
    type: 'select',
    group: 'basic',
    required: true,
    defaultValue: 'model-music-gen-1',
    apiKey: 'modelId',
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
    defaultValue: 'pop',
    apiKey: 'style',
  },
  {
    id: 'mood',
    label: '情感氛围',
    type: 'select',
    group: 'style',
    required: true,
    defaultValue: 'happy',
    apiKey: 'mood',
  },
  {
    id: 'vocalType',
    label: '人声类型',
    type: 'select',
    group: 'style',
    required: false,
    defaultValue: 'random',
    apiKey: 'vocalType',
    visibility: {
      mode: ['inspiration', 'custom'], // 不在纯音乐模式显示
    },
  },

  // 音频设置组
  {
    id: 'duration',
    label: '音乐时长',
    type: 'select',
    group: 'audio',
    required: true,
    defaultValue: '15',
    apiKey: 'duration',
  },
  {
    id: 'tempo',
    label: '音乐速度',
    type: 'select',
    group: 'audio',
    required: true,
    defaultValue: 'medium',
    apiKey: 'tempo',
    options: [
      { value: 'slow', label: '慢' },
      { value: 'medium', label: '中等' },
      { value: 'fast', label: '快' },
    ],
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
 * @param mode 当前生成模式
 * @param subscriptionLevel 用户订阅级别
 * @param currentValues 当前参数值
 * @param featureAccess 可用功能权限列表
 * @param toolId 当前使用的工具ID
 * @returns 可见的参数配置列表
 */
function getVisibleParameters(
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

// 获取参数的默认值（考虑模式特定默认值）
function getParameterDefaultValue(paramId: string, mode: string): any {
  const param = parameterConfigs.find(p => p.id === paramId);
  if (!param) return undefined;

  // 优先使用模式特定的默认值
  const modeConfig = modeConfigs.find(m => m.id === mode);
  if (modeConfig && modeConfig.defaultParameters && paramId in modeConfig.defaultParameters) {
    return modeConfig.defaultParameters[paramId];
  }

  return param.defaultValue;
}

// 将参数值转换为API请求格式
function formatParametersForAPI(params: Record<string, any>, mode: string): Record<string, any> {
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

export {
  getVisibleParameters,
  getParameterDefaultValue,
  formatParametersForAPI,
};