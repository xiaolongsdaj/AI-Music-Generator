import { useState } from 'react';
import { ChevronDown, HelpCircle, Music } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQConfig {
  title: string;
  subtitle: string;
  items: FAQItem[];
  iconColors?: string[];
  className?: string;
}

interface FAQProps {
  config: FAQConfig;
}

export default function FAQ({ config }: FAQProps) {
  const { 
    title, 
    subtitle, 
    items, 
    iconColors = [
      'text-blue-400',
      'text-purple-400',
      'text-pink-400',
      'text-indigo-400',
      'text-teal-400',
      'text-violet-400'
    ],
    className = '' 
  } = config;
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <section style={{ backgroundColor: '#111827' }} className={`mb-20 p-6 md:p-10 opacity-0 translate-y-10 transition-all duration-1000 ease-out scroll-reveal ${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2 text-white">
          <HelpCircle className="w-8 h-8 text-blue-400" />
          {title}
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {items.map((faq, index) => {
          // 为每个FAQ项分配不同的主题色
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