import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Map, Phone } from 'lucide-react';
import { aiService } from '../../services/ai';

export const TownshipAgent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'agent'; content: string }[]>([
        { role: 'agent', content: "Welcome to the Sovereign Intelligence Hub. How can I assist your discovery of Life Republic today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsTyping(true);

        const response = await aiService.askTownshipAgent(userMsg);
        
        setIsTyping(false);
        setMessages(prev => [...prev, { role: 'agent', content: response }]);
    };

    return (
        <>
            {/* Floating Trigger */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center border border-white/20 backdrop-blur-xl group overflow-hidden"
            >
                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Sparkles className="relative z-10" size={24} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 100 }}
                        className="fixed bottom-28 right-8 z-[60] w-full max-w-[400px] bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[600px]"
                    >
                        {/* Header */}
                        <div className="p-6 bg-secondary text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-accent/20 rounded-xl">
                                    <Sparkles size={20} className="text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-lg">Sovereign Concierge</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-white/50">Township Intelligence Hub</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                                        msg.role === 'user' 
                                        ? 'bg-secondary text-white rounded-tr-none' 
                                        : 'bg-gray-50 text-gray-700 border border-gray-100 rounded-tl-none'
                                    }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none border border-gray-100 flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Suggestions */}
                        <div className="px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar">
                            {[
                                { icon: Map, label: "Connectivity", q: "Tell me about connectivity to Hinjewadi Phase 1" },
                                { icon: Phone, label: "Visit", q: "How can I book a site visit?" }
                            ].map((s, i) => (
                                <button 
                                    key={i}
                                    onClick={() => {
                                        setInput(s.q);
                                        // Auto-send could be implemented here
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:bg-accent/10 hover:border-accent hover:text-accent transition-all whitespace-nowrap"
                                >
                                    <s.icon size={12} /> {s.label}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-gray-100 bg-white">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about ROI, connectivity, or projects..."
                                    className="w-full pl-6 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm"
                                />
                                <button 
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-2 top-2 w-10 h-10 bg-secondary text-white rounded-xl flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-50"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <p className="mt-4 text-[8px] text-center text-gray-400 uppercase tracking-widest">
                                Neural Insights Powered by Gemini Pro
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
