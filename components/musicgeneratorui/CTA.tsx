'use client'

const CTA = () => {
  return (
    <section className="mb-16 text-center bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/30 shadow-xl relative overflow-hidden opacity-0 translate-y-10 transition-all duration-1000 ease-out scroll-reveal">
      {/* 装饰元素 */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h3 className="text-xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          准备将您的创意转化为音乐了吗？
        </h3>
        <p className="mb-8 md:mb-10 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
          加入数千名艺术家、创作者和制作人的行列，使用AI驱动的灵感系统将简单想法转化为专业音乐作品。今天就开始您的创作之旅。
        </p>
    
        <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center items-center flex-wrap">
          <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 md:py-4 px-8 md:px-10 rounded-full transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30 min-w-[200px] sm:min-w-0">
            开始您的音乐创作之旅
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 md:py-4 px-8 md:px-10 rounded-full transition duration-300 transform hover:scale-105 min-w-[200px] sm:min-w-0">
            免费试用
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 md:py-4 px-8 md:px-10 rounded-full transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30 min-w-[200px] sm:min-w-0">
            即时开始
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTA