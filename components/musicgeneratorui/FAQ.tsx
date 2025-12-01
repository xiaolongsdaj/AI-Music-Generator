import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Music } from 'lucide-react';

interface FAQItemData {
  id: number;
  question: string;
  answer: string;
}

interface FAQConfig {
  title: string;
  description: string;
  items: FAQItemData[];
}

interface FAQProps {
  config: FAQConfig;
}

export default function FAQ({ config }: FAQProps) {
  // 在组件内部进行数据转换
  const transformedItems = config.items.map(item => ({
    ...item,
    id: item.id.toString()
  }));
  
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const iconColors = [
    'text-blue-400',
    'text-purple-400',
    'text-pink-400',
    'text-indigo-400',
    'text-teal-400',
    'text-violet-400'
  ];

  const toggleQuestion = (id: string) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <section className="mb-20 p-6 md:p-10 bg-gray-900/70 backdrop-blur-md rounded-xl border border-gray-700/50">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center justify-center gap-2">
          <HelpCircle className="w-8 h-8 text-blue-400" />
          {config.title}
        </h2>
        <p className="text-gray-300 max-w-4xl mx-auto">{config.description}</p>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {transformedItems.map((item, index) => {
          const iconColor = iconColors[index % iconColors.length];
          const isOpen = openQuestion === item.id;
          
          return (
            <div key={item.id} className="border border-gray-600/50 rounded-lg overflow-hidden bg-gray-900">
              <button
                className="w-full text-left p-4 px-6 bg-gray-800/50 hover:bg-gray-800/80 transition-all duration-300 flex justify-between items-center"
                onClick={() => toggleQuestion(item.id)}
                style={{ border: 'none', outline: 'none' }}
              >
                <div className="flex items-center gap-3">
                  <Music className={`w-5 h-5 ${iconColor}`} />
                  <span className="font-medium text-white text-lg">{item.question}</span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gray-300' : ''}`} 
                />
              </button>
              <div className={`px-6 bg-gray-900/30 text-gray-300 overflow-hidden transition-all duration-300 border-t border-gray-700 ${isOpen ? 'max-h-[60rem] py-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pl-8">{item.answer}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}