import { Music } from 'lucide-react';

export default function Howto() {
  return (  
    <section className="mb-16 bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 shadow-lg relative overflow-hidden opacity-0 translate-y-10 transition-all duration-1000 ease-out scroll-reveal">
      {/* 装饰元素 */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <h3 className="text-xl font-semibold mb-6 text-white flex items-center justify-center gap-3 relative z-10">
        <Music className="w-6 h-6 text-pink-400" />
        <h1>创作流程</h1>
      </h3>
      <p className="mb-2 text-gray-300 text-lg relative z-10 text-center">
        将创意转化为专业音乐
      </p>
      <p className="mb-10 text-gray-300 text-lg max-w-3xl mx-auto text-center relative z-10">
        通过我们直观的三步工作流程，将您的创意灵感转化为完整的专业音乐作品
      </p>
    
      <div className="relative z-10">
        <div className="hidden md:flex absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500/80 via-purple-500/80 to-pink-500/80 transform -translate-y-1/2 -z-10"></div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-indigo-500/10 relative">
            <div className="absolute -top-6 left-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg transform -translate-x-1/2">
              <span className="text-2xl font-bold text-white">♪</span>
            </div>
            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-4 text-indigo-300">表达您的创意愿景</h4>
              <p className="text-gray-300">
                描述您想要探索的情绪、情感基调、流派偏好或特定主题。使用自然语言传达您的艺术意图和创作目标。越详细的描述将帮助AI生成越符合您期望的音乐。
              </p>
            </div>
          </div>
        
          <div className="flex-1 bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-500/10 relative">
            <div className="absolute -top-6 left-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg transform -translate-x-1/2">
              <span className="text-2xl font-bold text-white">♫</span>
            </div>
            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-4 text-purple-300">AI作曲引擎</h4>
              <p className="text-gray-300">
                先进算法解读您的创意简介，生成符合您愿景的原创作品，包含专业编配、乐器配置和制作品质。我们的AI系统能够捕捉微妙的情感细微差别和音乐表达。
              </p>
            </div>
          </div>
        
          <div className="flex-1 bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 hover:border-pink-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-pink-500/10 relative">
            <div className="absolute -top-6 left-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center shadow-lg transform -translate-x-1/2">
              <span className="text-2xl font-bold text-white">♬</span>
            </div>
            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-4 text-pink-300">下载与创作</h4>
              <p className="text-gray-300">
                接收高品质MP3格式的专业制作音乐作品，可立即用于项目、分享或进一步创意开发。所有音乐都是免版税的，可用于商业用途。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}