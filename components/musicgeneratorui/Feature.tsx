import { Music } from 'lucide-react';

export default function Feature() {
  return (
    <section className="mb-16 bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 shadow-lg relative overflow-hidden opacity-0 translate-y-10 transition-all duration-1000 ease-out scroll-reveal">
      {/* 装饰元素 */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <h3 className="text-xl font-semibold mb-6 text-white flex items-center justify-center gap-3 relative z-10">
        <Music className="w-6 h-6 text-indigo-400" />
        先进创意智能功能
      </h3>
      <p className="mb-8 text-gray-300 text-lg max-w-4xl mx-auto text-center relative z-10">
        专业AI驱动工具套件，旨在将创意灵感转化为专业音乐作品
      </p>
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-10 h-10 mb-4 rounded-full bg-indigo-900/50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h4 className="text-lg font-medium mb-3 text-indigo-400">智能创意提示系统</h4>
          <p className="text-gray-300">
            先进自然语言处理技术理解复杂的音乐意图、情感语境和艺术愿景，生成精准定向的音乐作品。
          </p>
        </div>
      
        <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-10 h-10 mb-4 rounded-full bg-purple-900/50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h4 className="text-lg font-medium mb-3 text-purple-400">多变体音乐生成</h4>
          <p className="text-gray-300">
            为您的创意简介创建多个独特的音乐诠释版本，提供多样化选择以找到完美匹配您特定项目需求的音乐方向。
          </p>
        </div>
      
        <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-10 h-10 mb-4 rounded-full bg-blue-900/50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-medium mb-3 text-blue-400">情感智能作曲系统</h4>
          <p className="text-gray-300">
            基于复杂情感层面、主题概念或特定创意灵感生成音乐，运用理解情感与音乐表达关系的AI系统。
          </p>
        </div>
      
        <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-10 h-10 mb-4 rounded-full bg-pink-900/50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
          <h4 className="text-lg font-medium mb-3 text-pink-400">流派自适应创作</h4>
          <p className="text-gray-300">
            无缝跨越所有音乐流派工作，AI理解特定风格约定，从古典管弦乐编配到电子音乐制作技术。
          </p>
        </div>
      
        <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-10 h-10 mb-4 rounded-full bg-teal-900/50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-medium mb-3 text-teal-400">节拍与结构智能</h4>
          <p className="text-gray-300">
            基于您的创意方向自动优化节拍、节奏模式和歌曲结构，确保专业的节奏感和音乐流畅性。
          </p>
        </div>
      
        <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-10 h-10 mb-4 rounded-full bg-emerald-900/50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <h4 className="text-lg font-medium mb-3 text-emerald-400">专业导出品质</h4>
          <p className="text-gray-300">
            以高品质MP3格式导出作品，达到专业音频标准，适用于商业用途、流媒体和进一步制作工作。
          </p>
        </div>
      </div>
    </section>
  );
}