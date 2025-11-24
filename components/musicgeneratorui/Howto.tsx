import { Music } from 'lucide-react';

interface StepProps {
  icon: string;
  gradientBg: string;
  title: string;
  titleColor: string;
  description: string;
  hoverBorderColor: string;
  shadowColor: string;
}

interface HowtoConfig {
  title: string;
  subtitle: string;
  description: string;
  steps: StepProps[];
  className?: string;
}

interface HowtoProps {
  config: HowtoConfig;
}

export default function Howto({ config }: HowtoProps) {
  const { title, subtitle, description, steps, className = '' } = config;
  return (  
    <section className={`mb-16 bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 shadow-lg relative overflow-hidden opacity-0 translate-y-10 transition-all duration-1000 ease-out scroll-reveal ${className}`}>
      {/* 装饰元素 */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <h3 className="text-xl font-semibold mb-6 text-white flex items-center justify-center gap-3 relative z-10">
        <Music className="w-6 h-6 text-pink-400" />
        {title}
      </h3>
      <p className="mb-2 text-gray-300 text-lg relative z-10 text-center">
        {subtitle}
      </p>
      <p className="mb-10 text-gray-300 text-lg max-w-3xl mx-auto text-center relative z-10">
        {description}
      </p>
    
      <div className="relative z-10">
        <div className="hidden md:flex absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500/80 via-purple-500/80 to-pink-500/80 transform -translate-y-1/2 -z-10"></div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {steps.map((step, index) => (
            <div key={index} className={`flex-1 bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 hover:border-${step.hoverBorderColor}/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-${step.shadowColor}/10 relative`}>
              <div className={`absolute -top-6 left-1/2 w-12 h-12 rounded-full ${step.gradientBg} flex items-center justify-center shadow-lg transform -translate-x-1/2`}>
                <span className="text-2xl font-bold text-white">{step.icon}</span>
              </div>
              <div className="mt-4">
                <h4 className={`text-xl font-semibold mb-4 ${step.titleColor}`}>{step.title}</h4>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}