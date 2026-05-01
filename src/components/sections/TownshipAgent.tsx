import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Map, Phone, BrainCircuit } from 'lucide-react';
import { aiService } from '../../services/ai';
import { usePersonalizationStore } from '../../lib/personalizationStore';

export const TownshipAgent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'agent'; content: string }[]>([
        { role: 'agent', content: "I am the Neural Architect. How may I synthesize the 390-acre Life Republic ecosystem for you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { updateIntentScore } = usePersonalizationStore();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (forcedQuery?: string) => {
        const query = forcedQuery || input.trim();
        if (!query || isTyping) return;

        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: query }]);
        setIsTyping(true);
        updateIntentScore(5); // Increment intent for interacting with AI

        // Prepare history for Gemini
        const history = messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model' as 'user' | 'model',
            parts: [{ text: m.content }]
        }));

        const response = await aiService.askTownshipAgent(query, history);
        
        setIsTyping(false);
        setMessages(prev => [...prev, { role: 'agent', content: response }]);

        // Intent Handoff Logic: If AI suggests 'Concierge' or user asks for price/visit
        if (response.toLowerCase().includes('concierge') || response.toLowerCase().includes('synthesis tour')) {
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('open-sovereign-concierge'));
            }, 1500);
        }
    };

    return (
        <>
            {/* Floating Trigger with Neural Pulse */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center border border-white/20 backdrop-blur-xl group overflow-hidden"
            >
                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <BrainCircuit className="relative z-10" size={24} />
                <motion.div 
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute w-full h-full bg-accent rounded-full -z-0"
                />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 100 }}
                        className="fixed bottom-28 right-8 z-[60] w-[calc(100vw-2rem)] md:w-[400px] bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden flex flex-col h-[650px]"
                    >
                        {/* Premium Header */}
                        <div className="p-8 bg-secondary text-white relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                                        <Sparkles size={24} className="text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-serif font-bold text-xl">Neural Architect</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold">Life Republic v5.0</p>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-3 hover:bg-white/10 rounded-2xl transition-colors">
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth bg-gray-50/30">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[90%] p-5 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                                        msg.role === 'user' 
                                        ? 'bg-secondary text-white rounded-tr-none' 
                                        : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                                    }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-5 rounded-[1.5rem] rounded-tl-none border border-gray-100 flex gap-2">
                                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-2 h-2 bg-accent/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Intelligent Suggestions */}
                        <div className="px-8 py-4 flex gap-3 overflow-x-auto no-scrollbar bg-white">
                            {[
                                { icon: Map, label: "Connectivity", q: "Synthesize the connectivity to Hinjewadi Phase 1" },
                                { icon: Phone, label: "Site Visit", q: "How do I book a Spatial Synthesis tour?" },
                                { icon: BrainCircuit, label: "Investment ROI", q: "What is the historical price trend of Life Republic?" }
                            ].map((s, i) => (
                                <button 
                                    key={i}
                                    onClick={() => handleSend(s.q)}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:bg-accent/10 hover:border-accent hover:text-accent transition-all whitespace-nowrap group"
                                >
                                    <s.icon size={12} className="group-hover:scale-125 transition-transform" /> {s.label}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-8 border-t border-gray-100 bg-white">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about ROI, connectivity, or sectors..."
                                    className="w-full pl-6 pr-14 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all text-sm font-medium"
                                />
                                <button 
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-2 top-2 bottom-2 w-12 bg-secondary text-white rounded-xl flex items-center justify-center hover:bg-accent hover:scale-[1.05] transition-all disabled:opacity-50 shadow-lg"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                            <div className="mt-6 flex items-center justify-center gap-3">
                                <div className="w-1 h-1 bg-accent rounded-full animate-ping"></div>
                                <p className="text-[9px] text-gray-400 uppercase tracking-[0.3em] font-bold">
                                    Neural Brain Grounded in Life Republic KB
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
