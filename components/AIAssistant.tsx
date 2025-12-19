
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../App';
import { Send, Bot, User, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import { getAIAdvice } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const { tasks, jobs } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hi there! I am your DevPlanner AI Assistant. How can I help you optimize your routine or career today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const advice = await getAIAdvice(tasks, jobs, input);
    
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: advice || '', timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-12rem)] animate-in fade-in duration-500">
      <div className="flex-1 overflow-y-auto space-y-6 mb-4 pr-2" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center ${
              msg.role === 'assistant' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'
            }`}>
              {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'assistant' 
              ? 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none' 
              : 'bg-indigo-600 text-white rounded-tr-none'
            }`}>
              {msg.content}
              <div className={`mt-2 text-[10px] ${msg.role === 'assistant' ? 'text-slate-500' : 'text-indigo-200'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
              <span className="text-sm text-slate-400">DevPlanner is thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto pt-4">
        <div className="relative flex items-center bg-slate-800 border border-slate-700 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me to summarize your tasks or suggest study topics..."
            className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-slate-200 placeholder:text-slate-500 text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-xl transition-all ${
              input.trim() && !isLoading ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['Summarize my day', 'Help with job follow-ups', 'What should I study?'].map((suggestion) => (
            <button 
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="whitespace-nowrap px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 text-xs text-slate-400 hover:text-slate-200 rounded-full border border-slate-700 transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
