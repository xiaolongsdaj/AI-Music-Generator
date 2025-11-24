import React from 'react';

interface TitleConfig {
  text: string;
  gradientStart: string;
  gradientEnd: string;
}

interface HeroConfig {
  title: TitleConfig;
  description: string;
  className?: string;
}

interface HeroProps {
  config: HeroConfig;
}

const Hero: React.FC<HeroProps> = ({ config }) => {
  const { title, description, className = '' } = config;
  return (
    <section className={`mb-16 bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 shadow-lg opacity-0 translate-y-10 transition-all duration-1000 ease-out scroll-reveal ${className}`}>
      <h2 className={`text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${title.gradientStart} ${title.gradientEnd} text-center`}>
        {title.text}
      </h2>
      <p className="mb-8 text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto text-center">
        {description}
      </p>
    </section>
  );
};

export default Hero;