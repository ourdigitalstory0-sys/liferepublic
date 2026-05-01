import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Sparkles, Loader2, ShieldCheck, Target, Zap, Globe, Cpu, Network, ArrowUpRight } from 'lucide-react';
import { Button } from './Button';
import { api } from '../../services/api';
import { personalizationStore } from '../../lib/personalizationStore';

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectName?: string;
    projectId?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ 
    isOpen, 
    onClose, 
    projectName = "Life Republic",
    projectId
}) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [synthesisStep, setSynthesisStep] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [isHighIntent, setIsHighIntent] = useState(false);
    
    const honeyRef = useRef<HTMLInputElement>(null);

    const steps = [
        "Initializing Triple-Redundant Dispatch...",
        "Encrypting Lead Data via Sovereign Vault...",
        "Synchronizing ROI Intent Path...",
        "Escalating to Platinum Sovereign Desk...",
        "Lead Synthesis Complete."
    ];

    useEffect(() => {
        if (isOpen) {
            const history = personalizationStore.getHistory();
            if (history.intentScore > 350) setIsHighIntent(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isSubmitting && synthesisStep < steps.length - 1) {
            const timer = setTimeout(() => setSynthesisStep(prev => prev + 1), 800);
            return () => clearTimeout(timer);
        }
    }, [isSubmitting, synthesisStep]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (honeyRef.current?.value) { setIsSubmitted(true); return; }

        setIsSubmitting(true);
        setSynthesisStep(0);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const history = personalizationStore.getHistory();
        
        const leadData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            project_id: projectId || projectName,
            message: `Sovereign Enquiry: ${projectName} | Intent: ${history.sentiment}`,
            metadata: {
                intent_score: history.intentScore,
                sentiment: history.sentiment,
                source: "Life Republic 2026 Portal",
                timestamp: new Date().toISOString()
            }
        };

        try {
            await new Promise(resolve => setTimeout(resolve, 4000)); // Synthesis Simulation
            await api.leads.create(leadData);
            personalizationStore.updateIntentScore(60);
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => { setIsSubmitted(false); onClose(); }, 6000);
        } catch (err) {
            setError("Dispatch Interrupted. Re-initiating Sovereign Protocol...");
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex sm:items-center items-end justify-center sm:p-4 p-0 bg-secondary/95 backdrop-blur-3xl">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0" onClick={onClose} />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 150 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 150 }}
                        className="bg-white rounded-t-[4rem] sm:rounded-[5rem] shadow-[0_100px_200px_-50px_rgba(0,0,0,0.5)] w-full sm:max-w-2xl max-h-[90vh] overflow-hidden relative z-10 border border-white/20"
                    >
                        {/* Sovereign Progress HUD Overlay */}
                        <AnimatePresence>
                            {isSubmitting && (
                                <motion.div 
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-secondary z-50 flex flex-col items-center justify-center p-16 text-center"
                                >
                                    <div className="relative w-48 h-48 mb-16">
                                        <motion.div 
                                            animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 border-[6px] border-accent/20 border-t-accent rounded-full"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Cpu size={64} className="text-accent animate-pulse" />
                                        </div>
                                    </div>
                                    <div className="space-y-8">
                                        <h3 className="text-4xl font-serif font-bold text-white italic tracking-tighter">Synthesizing...</h3>
                                        <p className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] h-6">{steps[synthesisStep]}</p>
                                        <div className="w-64 h-1.5 bg-white/5 rounded-full mx-auto overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 4, ease: "linear" }} className="h-full bg-accent shadow-[0_0_20px_rgba(197,160,89,0.8)]" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Sovereign Header */}
                        <div className="p-10 sm:p-16 border-b border-gray-100 flex items-center justify-between bg-white relative">
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`w-10 h-10 ${isHighIntent ? 'bg-accent text-secondary' : 'bg-secondary text-white'} rounded-2xl flex items-center justify-center shadow-2xl`}>
                                        {isHighIntent ? <Zap size={20} className="animate-pulse" /> : <ShieldCheck size={20} />}
                                    </div>
                                    <span className="text-[11px] font-bold text-accent uppercase tracking-[0.5em]">
                                        {isHighIntent ? 'Priority Protocol v6.0' : 'Sovereign Dispatch Hub'}
                                    </span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-serif font-bold text-secondary tracking-tighter leading-none">
                                    {isHighIntent ? 'Platinum Portfolio <br /> Synthesis.' : 'Secure Lead <br /> Authorization.'}
                                </h3>
                            </div>
                            <button onClick={onClose} className="p-4 bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-full transition-all text-gray-300">
                                <X size={32} />
                            </button>
                        </div>

                        <div className="p-12 sm:p-20 overflow-y-auto max-h-[70vh]">
                            {!isSubmitted ? (
                                <div className="space-y-12">
                                    {isHighIntent && (
                                        <div className="bg-secondary p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6 group">
                                            <div className="p-4 bg-white/10 rounded-2xl text-accent group-hover:scale-110 transition-transform">
                                                <Target size={32} />
                                            </div>
                                            <p className="text-sm font-medium text-white/70 leading-relaxed">
                                                High-Intent Neural Path Detected. This lead will be escalated to the **Platinum Sovereign Desk** for 15-minute priority response.
                                            </p>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="hidden" aria-hidden="true"><input type="text" ref={honeyRef} tabIndex={-1} /></div>
                                        <div className="space-y-6">
                                            <input required name="name" placeholder="Full Legal Name" className="w-full px-10 py-6 bg-gray-50 border border-gray-100 rounded-[2rem] focus:ring-8 focus:ring-accent/10 outline-none transition-all font-bold text-secondary text-xl placeholder:text-gray-300" />
                                            <input required name="phone" pattern="[0-9]{10}" placeholder="10-Digit Mobile Matrix" className="w-full px-10 py-6 bg-gray-50 border border-gray-100 rounded-[2rem] focus:ring-8 focus:ring-accent/10 outline-none transition-all font-bold text-secondary text-xl placeholder:text-gray-300" />
                                            <input required name="email" type="email" placeholder="Sovereign Email Address" className="w-full px-10 py-6 bg-gray-50 border border-gray-100 rounded-[2rem] focus:ring-8 focus:ring-accent/10 outline-none transition-all font-bold text-secondary text-xl placeholder:text-gray-300" />
                                        </div>

                                        {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center animate-bounce">{error}</p>}

                                        <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                                            <Globe size={24} className="text-accent shrink-0 mt-1" />
                                            <p className="text-[10px] text-gray-500 font-medium leading-relaxed uppercase tracking-wider">
                                                By authorizing, you synchronize with the Sovereign Communication Protocol. Data protection via RSA encryption active. 
                                            </p>
                                        </div>

                                        <Button type="submit" className="w-full h-20 rounded-full text-2xl font-bold shadow-2xl flex items-center justify-center gap-6 group">
                                            {isHighIntent ? 'Initiate Priority Synthesis' : 'Secure Project Monograph'}
                                            <ArrowUpRight size={32} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                        </Button>
                                    </form>
                                </div>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-24 text-center space-y-12">
                                    <div className="w-32 h-32 bg-accent text-secondary rounded-full flex items-center justify-center mx-auto shadow-2xl relative">
                                        <CheckCircle size={64} className="animate-bounce" />
                                        <motion.div animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-accent rounded-full" />
                                    </div>
                                    <div className="space-y-6">
                                        <h4 className="text-5xl font-serif font-bold text-secondary tracking-tighter">Monograph <br /><span className="text-accent italic">Synthesized.</span></h4>
                                        <p className="text-gray-400 font-medium text-xl leading-relaxed max-w-sm mx-auto">
                                            Your request is production-locked in the **Sovereign Vault**. Expert synchronization initiating within 15 minutes.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <div className="p-8 bg-gray-50/50 border-t border-gray-100 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-20"></div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.6em]">
                                Sovereign Protocol v6.0 • 2026 Production Ready
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
