'use client'
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

// 定义定价计划类型
interface PricingFeature {
  text: string;
  color: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  featuresTitle: string;
  features: PricingFeature[];
  buttonText: string;
  buttonVariant: 'outline' | 'default' | 'secondary' | 'custom';
  isHighlighted?: boolean;
  cardClassName?: string;
  buttonClassName?: string;
}

// 定价计划数据
const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: '免费版',
    price: '$0',
    description: '适合个人用户入门使用',
    featuresTitle: '基础功能',
    features: [
      { text: '每日10次音乐生成', color: 'text-green-500' },
      { text: '基础音乐风格选择', color: 'text-green-500' },
      { text: '基础功能支持', color: 'text-green-500' }
    ],
    buttonText: '免费开始',
    buttonVariant: 'outline'
  },
  {
    id: 'standard',
    name: '标准版',
    price: '定制',
    description: '适合中小企业',
    featuresTitle: '进阶功能',
    features: [
      { text: '自定义音乐参数调节', color: 'text-blue-500' },
      { text: '累计使用量统计', color: 'text-blue-500' },
      { text: '高级功能支持', color: 'text-blue-500' }
    ],
    buttonText: '联系销售',
    buttonVariant: 'default'
  },
  {
    id: 'professional',
    name: '专业版',
    price: '$8.33',
    period: '每月',
    description: '适合专业用户和团队',
    featuresTitle: '专业功能',
    features: [
      { text: '每月1000套配额', color: 'text-yellow-400' },
      { text: '歌词自动生成', color: 'text-yellow-400' },
      { text: '多轨道混音编辑', color: 'text-yellow-400' },
      { text: '高清音频导出', color: 'text-yellow-400' }
    ],
    buttonText: '立即订阅',
    buttonVariant: 'custom',
    isHighlighted: true,
    cardClassName: 'bg-gradient-to-br from-purple-600 to-pink-600 text-white',
    buttonClassName: 'bg-white text-purple-600 hover:bg-gray-100 font-bold'
  },
  {
    id: 'enterprise',
    name: '企业版',
    price: '$20.83+',
    description: '适合大型企业',
    featuresTitle: '企业专属功能',
    features: [
      { text: '每月5000+套配额', color: 'text-green-500' },
      { text: '专属客户支持', color: 'text-green-500' },
      { text: '企业API接入', color: 'text-green-500' }
    ],
    buttonText: '定制方案',
    buttonVariant: 'secondary'
  }
];

// 渲染单个定价计划的组件
function PricingPlanCard({ plan }: { plan: PricingPlan }) {
  const isHighlighted = plan.isHighlighted || false;
  const cardBaseClasses = 'rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300';
  const cardClasses = isHighlighted 
    ? `${cardBaseClasses} ${plan.cardClassName} transform hover:scale-105 relative` 
    : `${cardBaseClasses} bg-white border border-gray-200`;
  
  const featuresBaseClasses = 'rounded-xl p-6 mb-6';
  const featuresClasses = isHighlighted 
    ? `${featuresBaseClasses} bg-white bg-opacity-10 backdrop-blur-sm` 
    : `${featuresBaseClasses} bg-gray-50`;
  
  const featureTextClasses = isHighlighted ? 'text-white' : 'text-gray-700';
  const titleTextClasses = isHighlighted ? 'text-white' : 'text-gray-900';
  const descTextClasses = isHighlighted ? 'text-white opacity-90' : 'text-gray-600';
  const featuresTitleClasses = isHighlighted ? 'text-white' : 'text-gray-900';
  
  return (
    <div className={cardClasses}>
      {isHighlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-yellow-500 text-white text-sm font-bold px-4 py-2 rounded-full">
            最受欢迎
          </span>
        </div>
      )}
      
      <div className={`text-center mb-8 ${isHighlighted ? 'pt-4' : ''}`}>
        <h2 className={`text-2xl font-bold ${titleTextClasses} mb-2`}>{plan.name}</h2>
        <div className={`text-4xl font-bold ${titleTextClasses} mb-2`}>{plan.price}</div>
        {plan.period && <div className={`${descTextClasses} mb-4`}>{plan.period}</div>}
        <p className={descTextClasses}>{plan.description}</p>
      </div>
      
      <div className={featuresClasses}>
        <h3 className={`text-lg font-semibold ${featuresTitleClasses} mb-4`}>{plan.featuresTitle}</h3>
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className={`flex items-center ${featureTextClasses}`}>
              <Check className={`w-5 h-5 ${feature.color} mr-3`} />
              {feature.text}
            </li>
          ))}
        </ul>
      </div>
      
      <Button 
        className={`w-full ${plan.buttonVariant === 'custom' ? plan.buttonClassName : ''}`}
        variant={plan.buttonVariant !== 'custom' ? plan.buttonVariant : 'default'}
      >
        {plan.buttonText}
      </Button>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            选择适合您的方案
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            从免费开始，按需升级，享受更多高级功能
          </p>
        </div>

        {/* 定价方案网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {/* 渲染所有定价计划 */}
          {pricingPlans.map((plan) => (
            <PricingPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}