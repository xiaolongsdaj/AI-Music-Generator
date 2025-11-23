'use client'
import MusicGeneratorForm from '@/components/musicgeneratorui/MusicGeneratorForm';
import Hero from '@/components/musicgeneratorui/Hero';
import Description from '@/components/musicgeneratorui/Description';
import Feature from '@/components/musicgeneratorui/Feature';
import Howto from '@/components/musicgeneratorui/Howto';
import FAQ from '@/components/musicgeneratorui/FAQ';
import CTA from '@/components/musicgeneratorui/CTA';
import { Music } from 'lucide-react';
import { useEffect } from 'react';


export default function MusicGenerator() {
  useEffect(() => {
    // 页面加载动画效果
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.85) {
          section.classList.add('animate-in');
        }
      });
    };
    
    // 初始加载时执行一次
    handleScroll();
    
    // 监听滚动事件
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          <MusicGeneratorForm />
          <Hero />
          <Description />
          <Feature />
          <Howto />
          <FAQ />
          <CTA />
        </div>
       </div>
      </div>
    </>
  )}