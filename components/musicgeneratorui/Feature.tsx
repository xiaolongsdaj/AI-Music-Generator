import { Music } from 'lucide-react';

interface CardProps {
  icon: string;
  color: string;
  title: string;
  titleColor: string;
  description: string;
  bgColor: string;
  hoverBorderColor: string;
}

interface FeatureConfig {
  title: string;
  description: string;
  cards: CardProps[];
  className?: string;
}

interface FeatureProps {
  config: FeatureConfig;
}

export default function Feature({ config }: FeatureProps) {
  const { title, description, cards, className = '' } = config;
  return (
    <section className={`mb-16 bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 shadow-lg relative overflow-hidden opacity-0 translate-y-10 transition-all duration-1000 ease-out scroll-reveal ${className}`}>
      {/* 装饰元素 */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <h3 className="text-xl font-semibold mb-6 text-white flex items-center justify-center gap-3 relative z-10">
        <Music className="w-6 h-6 text-indigo-400" />
        {title}
      </h3>
      <p className="mb-8 text-gray-300 text-lg max-w-4xl mx-auto text-center relative z-10">
        {description}
      </p>
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {cards.map((card, index) => (
          <div key={index} className={`${card.bgColor} rounded-xl p-6 border border-gray-700/50 hover:border-${card.hoverBorderColor}/30 transition-all duration-300 transform hover:-translate-y-1`}>
            <div className={`w-10 h-10 mb-4 rounded-full bg-${card.hoverBorderColor.replace('-500', '-900')}/50 flex items-center justify-center`}>
              <Music className={`w-5 h-5 ${card.color}`} />
            </div>
            <h4 className={`text-lg font-medium mb-3 ${card.titleColor}`}>{card.title}</h4>
            <p className="text-gray-300">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}