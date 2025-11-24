'use client'

interface ButtonProps {
  text: string;
  className: string;
}

interface CTAConfig {
  title: string;
  titleGradient: string;
  description: string;
  buttons: ButtonProps[];
  className?: string;
}

interface CTAProps {
  config: CTAConfig;
}

const CTA = ({ config }: CTAProps) => {
  const { title, titleGradient, description, buttons, className = '' } = config;
  return (
    <section className={`mb-16 text-center bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/30 shadow-xl relative overflow-hidden opacity-0 translate-y-10 transition-all duration-1000 ease-out scroll-reveal ${className}`}>
      {/* 装饰元素 */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h3 className={`text-xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent ${titleGradient}`}>
          {title}
        </h3>
        <p className="mb-8 md:mb-10 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
          {description}
        </p>
    
        <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center items-center flex-wrap">
          {buttons.map((button, index) => (
            <button key={index} className={button.className}>
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CTA