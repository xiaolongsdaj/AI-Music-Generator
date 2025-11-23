import { useState } from 'react';
import { ChevronDown, HelpCircle, Music } from 'lucide-react';

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const faqs = [
    {
      id: 'faq1',
      question: 'AI生成的音乐有版权吗？',
      answer: '所有通过我们平台生成的音乐都是完全免版税的，您可以自由用于个人项目、商业用途、内容创作或任何其他应用场景。我们确保生成的音乐不会侵犯现有版权，为您提供创作自由和法律保障。'
    },
    {
      id: 'faq2',
      question: '我可以控制音乐的哪些方面？',
      answer: '您可以控制音乐的情绪、风格、流派、时长、乐器组合以及特定主题或氛围。通过详细描述您的需求，我们的AI系统会尽可能匹配您的创意愿景。您也可以请求特定的音乐元素，如主旋律、节奏模式或和声结构。'
    },
    {
      id: 'faq3',
      question: '生成一首音乐需要多长时间？',
      answer: '音乐生成通常需要30秒到2分钟不等，具体取决于请求的复杂性和当前服务器负载。简单的音乐片段生成较快，而复杂的多轨编曲可能需要更长时间。我们持续优化生成算法，不断提高处理速度。'
    },
    {
      id: 'faq4',
      question: '如果我不喜欢生成的结果怎么办？',
      answer: '如果生成的音乐不符合您的期望，您可以提供更具体的描述重新生成，或者调整您的提示以获得更符合需求的结果。我们的AI学习系统会从用户反馈中不断改进，以提供更准确的创意匹配。'
    },
    {
      id: 'faq5',
      question: 'AI音乐生成技术是如何工作的？',
      answer: '我们的AI音乐生成系统基于深度学习模型，分析了海量音乐数据以学习音乐理论、和声结构、节奏模式和乐器编配规则。系统接收您的文本描述作为输入，将其转换为音乐参数，然后生成符合这些参数的原创音乐作品。整个过程保持了音乐的自然流动和艺术性。'
    },
    {
      id: 'faq6',
      question: '我可以下载什么格式的音乐文件？',
      answer: '目前我们提供高质量MP3格式（320kbps）的音乐下载。未来我们计划添加更多格式选项，包括WAV、FLAC等无损格式，以及分轨混音选项，让您能够进一步自定义和编辑生成的音乐。'
    }
  ];

  return (
    <section style={{ backgroundColor: '#111827' }} className="mb-20 p-6 md:p-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2 text-white">
          <HelpCircle className="w-8 h-8 text-blue-400" />
          常见问题解答
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          查找关于我们AI音乐生成平台的常见问题与解答
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => {
          // 为每个FAQ项分配不同的主题色
          const iconColors = [
            'text-blue-400',
            'text-purple-400',
            'text-pink-400',
            'text-indigo-400',
            'text-teal-400',
            'text-violet-400'
          ];
          const iconColor = iconColors[index % iconColors.length];
          
          return (
            <div 
              key={faq.id} 
              style={{ 
                backgroundColor: '#111827', 
                borderColor: '#374151',
                display: 'block',
                position: 'relative',
                zIndex: 1
              }}
              className="border rounded-xl overflow-hidden shadow-md"
            >
              <button
                style={{ 
                  backgroundColor: '#111827',
                  color: 'white',
                  border: 'none',
                  outline: 'none'
                }}
                className="w-full flex justify-between items-center p-5 text-left"
                onClick={() => toggleQuestion(faq.id)}
              >
                <div className="flex items-center gap-3">
                  <Music className={`w-5 h-5 ${iconColor}`} />
                  <span style={{ color: 'white', fontWeight: '500', fontSize: '1.125rem' }}>
                    {faq.question}
                  </span>
                </div>
                <div style={{ color: openQuestion === faq.id ? '#d1d5db' : '#6b7280', transform: openQuestion === faq.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              
              <div 
                style={{ 
                  maxHeight: openQuestion === faq.id ? '500px' : '0px',
                  opacity: openQuestion === faq.id ? '1' : '0',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                <div style={{ color: '#d1d5db', borderTopColor: '#374151' }} className="p-5 pt-0 border-t">
                  <div className="pl-8">{faq.answer}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}