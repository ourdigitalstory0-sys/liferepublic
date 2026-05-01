import React, { useEffect, useState } from 'react';
import { X, Sparkles, MessageSquare, Zap, ArrowRight, ShieldCheck, TrendingUp, Target, Cpu, Network, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalizationStore } from '../../lib/personalizationStore';

export const ExitIntentModal: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    
    const history = personalizationStore.getHistory();
    const lastSector = history.lastSector ? history.lastSector.charAt(0).toUpperCase() + history.lastSector.slice(1) : 'Township';
    const intentScore = history.intentScore;
    const uniqueSectors = history.recentlyViewed.length;
    
    // Neural Completeness Calibration: Logic based on sector depth and interaction history
    const completeness = Math.min(25 + (uniqueSectors * 12) + (Math.floor(intentScore / 20)), 98);

    useEffect(() => {
        const sessionTriggered = sessionStorage.getItem('lr_sovereign_exit_triggered');
        if (sessionTriggered) {
            setHasTriggered(true);
            return;
        }

        const handleMouseLeave = (e: MouseEvent) => {
            // Trigger Protocol: Only for high-intent users (Score > 150)
            if (e.clientY <= 0 && !hasTriggered && intentScore > 150) {
                setIsVisible(true);
                setHasTriggered(true);
                sessionStorage.setItem('lr_sovereign_exit_triggered', 'true');
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasTriggered, intentScore]);

    const handleClose = () => setIsVisible(false);

    const handleWhatsAppRedirect = () => {
        const priorityCode = `SOVEREIGN-ZENITH-${intentScore}-${Math.random().toString(36).substring(7).toUpperCase()}`;
        const msg = encodeURIComponent(`Greetings. I have synthesized my ${lastSector} portfolio journey. Neural Score: ${intentScore}. Priority Code: ${priorityCode}. Please dispatch the 2026 Infrastructure Monograph and schedule a Sovereign Site Visit.`);
        window.open(`https://wa.me/918010101010?text=${msg}`, '_blank');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-secondary/98 backdrop-blur-3xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 100 }}
                        className="relative bg-white rounded-t-[4rem] sm:rounded-[5rem] shadow-[0_100px_200px_-50px_rgba(0,0,0,0.6)] w-full max-w-5xl overflow-hidden border border-white/10"
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-12 right-12 p-5 bg-gray-100 hover:bg-accent rounded-full transition-all z-20 group hover:rotate-90"
                        >
                            <X size={28} className="text-secondary" />
                        </button>

                        <div className="flex flex-col lg:flex-row min-h-[650px]">
                            {/* Visual Tectonic Side */}
                            <div className="w-full lg:w-[40%] bg-secondary p-16 md:p-20 text-white relative overflow-hidden flex flex-col justify-center">
                                <div className="absolute inset-0 bg-[url('https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.8122513965070959.avif')] bg-cover bg-center grayscale opacity-10 scale-110 group-hover:scale-125 transition-transform duration-[2s]"></div>
                                <div className="relative z-10 space-y-16">
                                    <div className="w-28 h-28 bg-accent/20 rounded-[3rem] flex items-center justify-center text-accent border border-accent/30 shadow-2xl relative">
                                        <div className="absolute inset-0 bg-accent/20 blur-2xl animate-pulse rounded-full"></div>
                                        <Target size={54} className="relative z-10" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
                                            <p className="text-[11px] font-bold uppercase tracking-[0.6em] text-accent">Neural Calibration v6.0</p>
                                        </div>
                                        <h3 className="text-6xl md:text-7xl font-serif font-bold leading-[0.9] tracking-tighter">
                                            Synthesis <br />Locked.
                                        </h3>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end text-[12px] font-bold uppercase tracking-[0.5em] text-white/40">
                                            <span>Portfolio Completeness</span>
                                            <span className="text-accent text-3xl font-serif">{completeness}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }} 
                                                animate={{ width: `${completeness}%` }} 
                                                transition={{ duration: 2, ease: "circOut" }}
                                                className="h-full bg-accent shadow-[0_0_30px_var(--accent)]" 
                                            />
                                        </div>
                                        <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.4em] text-center">Protocol LR-2026-ZENITH Active</p>
                                    </div>
                                </div>
                            </div>

                            {/* Conversion Context Side */}
                            <div className="w-full lg:w-[60%] p-16 md:p-24 flex flex-col justify-center bg-white relative">
                                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                    <Sparkles size={200} className="text-secondary" />
                                </div>
                                <div className="flex items-center gap-4 text-accent mb-12">
                                    <Cpu size={24} className="animate-pulse" />
                                    <span className="text-[12px] font-bold uppercase tracking-[0.7em]">Behavioral Anchor Protocol</span>
                                </div>
                                <h2 className="text-6xl md:text-8xl font-serif font-bold text-secondary mb-10 tracking-tighter leading-[0.8] italic">
                                    Secure the <br /> <span className="text-accent">Thesis.</span>
                                </h2>
                                <p className="text-2xl text-gray-400 font-medium leading-relaxed mb-16 max-w-2xl">
                                    Our engine has synthesized your {lastSector} journey across {uniqueSectors} sectors. Exiting now will interrupt the final 2026 ROI calibration for your portfolio journey.
                                </p>

                                <div className="space-y-8">
                                    <button 
                                        onClick={handleWhatsAppRedirect}
                                        className="w-full py-10 bg-secondary text-white rounded-full font-bold text-2xl flex items-center justify-center gap-6 hover:bg-accent hover:text-secondary transition-all shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)] group hover:scale-[1.02]"
                                    >
                                        <MessageSquare size={32} />
                                        Fast-Track via WhatsApp
                                        <ArrowUpRight size={32} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                    </button>
                                    
                                    <div className="flex items-center gap-6 justify-center pt-8">
                                        <div className="flex items-center gap-3 px-6 py-2 bg-green-50 rounded-full border border-green-100">
                                            <ShieldCheck size={20} className="text-green-500" />
                                            <span className="text-[11px] font-bold text-green-600 uppercase tracking-[0.5em]">Vault Protection Active</span>
                                        </div>
                                        <div className="flex items-center gap-3 px-6 py-2 bg-blue-50 rounded-full border border-blue-100">
                                            <Network size={20} className="text-blue-500" />
                                            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.5em]">Neural Handover Ready</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={handleClose}
                                    className="mt-20 text-center text-[11px] font-bold text-gray-300 uppercase tracking-[0.6em] hover:text-accent transition-colors block w-full"
                                >
                                    Dismiss & Preserve Current Synthesis Session
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
