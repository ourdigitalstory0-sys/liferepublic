import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from './Button';

export const ExitIntentOffer: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Check if shown in this session
        const shown = sessionStorage.getItem('lr_exit_intent_shown');
        if (shown) setHasShown(true);

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem('lr_exit_intent_shown', 'true');
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasShown]);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-secondary/80 backdrop-blur-md"
                    onClick={() => setIsVisible(false)}
                />
                
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                >
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="absolute top-6 right-6 z-20 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-secondary transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Image/Visual Side */}
                    <div className="md:w-1/2 relative bg-secondary p-12 flex flex-col justify-between overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[url('/images/gallery/eros/master-layout.webp')] bg-cover bg-center"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white mb-8">
                                <Lock size={24} />
                            </div>
                            <h3 className="text-4xl font-serif font-bold text-white mb-6">Access <br />Private Beta <br />Price List</h3>
                            <p className="text-white/60 text-lg leading-relaxed font-light">
                                Unlock the <strong>2026 pricing</strong> and inventory availability before the next market surge.
                            </p>
                        </div>
                        <div className="relative z-10 flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest">
                            <ShieldCheck size={16} /> Sales Desk Verified
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="md:w-1/2 p-12 md:p-16">
                        <h4 className="text-2xl font-serif font-bold text-secondary mb-2">Wait! Don't Leave.</h4>
                        <p className="text-gray-500 mb-10">Enter your details to receive the digital brochure and current price list directly on WhatsApp.</p>
                        
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="John Doe" 
                                    className="w-full bg-gray-50 border-none rounded-xl p-4 text-secondary focus:ring-2 focus:ring-accent outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Mobile Number</label>
                                <input 
                                    type="tel" 
                                    placeholder="+91 99999 99999" 
                                    className="w-full bg-gray-50 border-none rounded-xl p-4 text-secondary focus:ring-2 focus:ring-accent outline-none transition-all"
                                />
                            </div>
                            <Button variant="primary" className="w-full rounded-xl py-6 flex items-center justify-center gap-3 group">
                                <Download size={18} /> Download Price List <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </form>
                        
                        <p className="text-center text-[10px] text-gray-400 mt-8">
                            Your privacy is our priority. No spam, only the price list.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
