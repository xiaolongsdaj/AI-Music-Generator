import { Music } from 'lucide-react';

export default function Description() {
  return (
    <section className="relative py-16 px-4 overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
      {/* 背景装饰元素 */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-600/20 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl opacity-50 animate-pulse-slow-delay"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 relative z-10">
      <div className="col-span-full">
        <h3 className="text-xl font-semibold mb-6 text-white flex items-center justify-center gap-3">
          <Music className="w-6 h-6 text-indigo-400" />
          创意突破技术
        </h3>
        <p className="mb-8 text-gray-300 text-lg max-w-4xl mx-auto text-center">
          通过智能AI驱动的灵感和创作辅助系统，克服创作障碍，释放无限音乐创作潜能
        </p>
      </div>
      <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 transform hover:-translate-y-1">
        <div className="w-12 h-12 mb-4 rounded-full bg-indigo-900/50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h4 className="text-lg font-medium mb-3 text-indigo-400">瞬间创意激发</h4>
        <p className="text-gray-300">
          在几秒钟内生成完整的音乐作品，而不是花费数小时构思。通过AI驱动的创意激发系统，立即突破创作瓶颈，将抽象概念转化为具体的音乐编曲。
        </p>
      </div>
    
      <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 transform hover:-translate-y-1">
        <div className="w-12 h-12 mb-4 rounded-full bg-purple-900/50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>
        <h4 className="text-lg font-medium mb-3 text-purple-400">无界流派探索</h4>
        <p className="text-gray-300">
          探索超越您惯常创作边界的音乐流派和风格。通过尝试融合风格、世界音乐元素和创新声音组合，发现您可能从未考虑过的新创意领域。
        </p>
      </div>
    
      <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 transform hover:-translate-y-1">
        <div className="w-12 h-12 mb-4 rounded-full bg-pink-900/50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h4 className="text-lg font-medium mb-3 text-pink-400">专业级制作品质</h4>
        <p className="text-gray-300">
          生成达到广播级别标准的音乐作品，具备专业混音和母带处理质量。每一首创作都达到商业发行品质，完美适用于流媒体平台、影视配乐和专业音乐项目。
        </p>
      </div>
    </div>
  </section>
  );
}