'use client'
// 引入音乐生成器表单组件 - 支持多种模式配置
import MusicGeneratorForm from '@/components/musicgeneratorui/MusicGeneratorForm';
import Hero from '@/components/musicgeneratorui/Hero';
import Description from '@/components/musicgeneratorui/Description';
import Feature from '@/components/musicgeneratorui/Feature';
import Howto from '@/components/musicgeneratorui/Howto';
import FAQ from '@/components/musicgeneratorui/FAQ';
import CTA from '@/components/musicgeneratorui/CTA';
import { Music } from 'lucide-react';
import { useEffect } from 'react';
import musicGeneratorConfig from '@/data/musicgenerator/config.json';


export default function MusicGenerator() {
  useEffect(() => {
    // 页面加载动画效果
    const handleScroll = () => {
      const sections = document.querySelectorAll('.scroll-reveal');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // 当元素的顶部进入视口底部85%或底部进入视口顶部时触发
        if (sectionTop < windowHeight * 0.85 || sectionBottom > 0) {
          section.classList.add('animate-in');
        }
      });
    };
    
    // 使用setTimeout确保DOM完全加载后再执行初始检查
    const initialCheck = setTimeout(() => {
      handleScroll();
    }, 100);
    
    // 监听滚动事件，使用throttle优化性能
    const throttledScroll = () => {
      let waiting = false;
      return () => {
        if (!waiting) {
          handleScroll();
          waiting = true;
          setTimeout(() => {
            waiting = false;
          }, 100);
        }
      };
    };
    
    const throttledHandler = throttledScroll();
    window.addEventListener('scroll', throttledHandler);
    
    // 监听resize事件以适应窗口大小变化
    window.addEventListener('resize', handleScroll);
    
    return () => {
      clearTimeout(initialCheck);
      window.removeEventListener('scroll', throttledHandler);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
  
  return (
    <>
      {/* 内联CSS样式 */}
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
        
        .scroll-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* 微妙的悬停效果增强 */
        button:hover {
          transform: translateY(-2px) !important;
        }
        
        /* 卡片悬停效果增强 */
        [class*="bg-gray-800"]:hover {
          transition: all 0.3s ease;
        }
        
        /* 平滑滚动 */
        html {
          scroll-behavior: smooth;
        }
        
        /* 音符图标微小动画 */
        [class*="Music"] {
          transition: transform 0.3s ease;
        }
        
        [class*="Music"]:hover {
          transform: rotate(15deg) scale(1.1);
        }
        
        /* 按钮脉动效果 */
        button:nth-child(1), button:nth-child(3) {
          position: relative;
          overflow: hidden;
        }
        
        button:nth-child(1)::after, button:nth-child(3)::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        button:nth-child(1):active::after, button:nth-child(3):active::after {
          width: 300px;
          height: 300px;
        }
      `}</style>
      
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-900 via-purple-900/20 to-indigo-900/10 bg-[length:400%_400%]" style={{animation: 'gradientAnimation 15s ease infinite'}}>
      <div className="mx-auto max-w-7xl">
        {/* 页面标题区域 */}
        <header className="mb-12 text-center animate-fade-in">
          <div className="inline-block mb-4 p-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-white/10">
            <Music className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            创建你的音乐
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            使用AI生成独特的音乐作品，探索无限可能
          </p>
        </header>
        
        {/* 内容区域 */}
        <div className="mt-8">
          {/* 使用灵感音乐模式的表单组件 */}
          <MusicGeneratorForm 
            mode="inspiration"
            generateButtonText="开始创作音乐"
          />
          {/* 将完整配置对象传递给组件，在组件内部解构 */}
          <Hero 
            config={{...musicGeneratorConfig.hero, className: `${musicGeneratorConfig.hero.className} scroll-reveal`}}
          />
          <Description 
            config={{...musicGeneratorConfig.description, className: `${musicGeneratorConfig.description.className} scroll-reveal`}}
          />
          <Feature 
            config={musicGeneratorConfig.feature}
          />
          <Howto 
            config={{...musicGeneratorConfig.howto, 
              steps: musicGeneratorConfig.howto.steps.map(step => ({
                ...step,
                gradientBg: step.gradientColor,
                hoverBorderColor: step.titleColor.replace('text-', 'border-'),
                shadowColor: step.titleColor.replace('text-', '')
              }))
            }}
          />
          <FAQ 
            config={{
              ...musicGeneratorConfig.faq, 
              subtitle: musicGeneratorConfig.faq.description, // 将description重命名为subtitle以匹配组件Props
              items: musicGeneratorConfig.faq.items.map(item => ({
                ...item,
                id: item.id.toString()
              }))
            }}
          />
          <CTA 
            config={{
              ...musicGeneratorConfig.cta,
              title: musicGeneratorConfig.cta.title.text,
              titleGradient: `bg-gradient-to-r ${musicGeneratorConfig.cta.title.gradientStart} ${musicGeneratorConfig.cta.title.gradientEnd}`,
              buttons: musicGeneratorConfig.cta.buttons.map(button => ({
                text: button.text,
                className: button.gradientStart 
                  ? `px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r ${button.gradientStart} ${button.gradientEnd} hover:from-${button.hoverGradientStart} hover:to-${button.hoverGradientEnd} transition-all duration-300 shadow-lg`
                  : `px-6 py-3 rounded-lg font-medium ${button.textColor} ${button.bgColor} ${button.borderColor} hover:${button.hoverBgColor} transition-all duration-300`
              }))
            }}
          />
        </div>
       </div>
      </div>
    </>
  )}