import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileCheck, Mail, Phone, ChevronRight, X, Sparkles } from 'lucide-react';

export const BrochureEngine: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selections, setSelections] = useState<string[]>([]);
    
    const options = [
        { id: 'master', label: 'Township Master Plan', icon: '🗺️' },
        { id: 'floor', label: 'Sector Floor Plans', icon: '📐' },
        { id: 'legal', label: 'Technical & RERA Documents', icon: '⚖️' },
        { id: 'pricing', label: 'Detailed Pricing Sheet', icon: '💰' }
    ];

    const toggleSelection = (id: string) => {
        setSelections(prev => 
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto rounded-[40px] bg-gradient-to-br from-gray-900 to-slate-900 p-8 md:p-16 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>
                    
                    <div className="relative z-10 text-center">
                        <div className="w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-accent/30 shadow-2xl">
                            <Download className="text-accent" size={40} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Craft Your Digital Portfolio</h2>
                        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
                            Don't download generic files. Select exactly what you need and we'll assemble a personalized information pack for you.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {options.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => toggleSelection(opt.id)}
                                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all ${
                                        selections.includes(opt.id) 
                                        ? 'bg-accent text-secondary border-accent font-bold scale-105 shadow-xl' 
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                    }`}
                                >
                                    <span className="text-xl">{opt.icon}</span>
                                    <span className="text-sm">{opt.label}</span>
                                </button>
                            ))}
                        </div>

                        <button 
                            disabled={selections.length === 0}
                            onClick={() => setIsOpen(true)}
                            className={`px-12 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 mx-auto transition-all ${
                                selections.length > 0 
                                ? 'bg-white text-secondary hover:bg-accent' 
                                : 'bg-white/10 text-white/30 cursor-not-allowed'
                            }`}
                        >
                            <Sparkles size={20} /> Generate My Portfolio
                        </button>
                    </div>

                    {/* Fullscreen Overlay Form */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4"
                            >
                                <motion.div 
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl text-gray-900 overflow-hidden"
                                >
                                    <div className="bg-secondary p-8 text-white relative">
                                        <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white/60 hover:text-white">
                                            <X size={24} />
                                        </button>
                                        <h3 className="text-2xl font-bold mb-2">Almost There!</h3>
                                        <p className="text-white/60 text-sm">Where should we send your {selections.length} selected documents?</p>
                                    </div>

                                    <div className="p-10 space-y-6">
                                        <div className="space-y-4">
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input 
                                                    type="email" 
                                                    placeholder="Email Address"
                                                    className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-accent outline-none border-none"
                                                />
                                            </div>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input 
                                                    type="tel" 
                                                    placeholder="WhatsApp Number"
                                                    className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-accent outline-none border-none"
                                                />
                                            </div>
                                        </div>

                                        <button className="w-full py-5 bg-secondary text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-accent hover:text-secondary transition-all">
                                            <FileCheck size={20} /> Deploy Information Pack <ChevronRight size={18} />
                                        </button>

                                        <div className="flex items-center gap-2 justify-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                                            <ShieldCheck size={12} className="text-green-500" /> Secure Transmission | Privacy Protected
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

const ShieldCheck = ({ size, className }: { size: number, className: string }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);
