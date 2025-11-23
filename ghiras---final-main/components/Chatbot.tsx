import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { createChatSession } from '../services/geminiService';
import { Language } from '../types';
import { Chat } from '@google/genai';

interface ChatbotProps {
  language: Language;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: language === 'ar' ? 'مرحباً! أنا مساعدك الزراعي الذكي. كيف يمكنني مساعدتك اليوم؟' : 'Hello! I am your smart agricultural assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
     // Initialize session on mount (lazy or eager)
     chatSessionRef.current = createChatSession();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      let responseText = "Sorry, I'm having trouble connecting to the AI right now.";
      
      if (chatSessionRef.current) {
        const result = await chatSessionRef.current.sendMessage({ message: userMsg });
        responseText = result.text || "";
      } else {
        // Mock fallback if API key missing
         await new Promise(r => setTimeout(r, 1000));
         responseText = language === 'ar' 
          ? "عذراً، لا يمكنني الاتصال بالخادم حالياً. يرجى التحقق من مفتاح API." 
          : "Sorry, I cannot connect to the server right now. Please check the API key.";
      }

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat Error", error);
      setMessages(prev => [...prev, { role: 'model', text: language === 'ar' ? "حدث خطأ ما." : "Something went wrong." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 ${language === 'ar' ? 'left-6' : 'right-6'} z-50 p-4 bg-agri-600 hover:bg-agri-700 text-white rounded-full shadow-lg transition-transform hover:scale-110`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 ${language === 'ar' ? 'left-6' : 'right-6'} w-80 md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200 dark:border-gray-700 transition-all animate-fade-in-up h-[500px]`}>
          
          {/* Header */}
          <div className="bg-agri-600 p-4 flex items-center justify-between">
             <h3 className="text-white font-bold flex items-center gap-2">
               <MessageCircle className="w-5 h-5" />
               {language === 'ar' ? 'المساعد الذكي' : 'Smart Assistant'}
             </h3>
             <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
               <X className="w-5 h-5" />
             </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-agri-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 dark:border-gray-600">
                  <Loader2 className="w-5 h-5 animate-spin text-agri-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-agri-500"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-agri-600 text-white p-2 rounded-full hover:bg-agri-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
