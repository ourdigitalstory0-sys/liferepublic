import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle2, MessageSquare, Phone, User, Mail, Send, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface SovereignConciergeProps {
    isOpen: boolean;
    onClose: () => void;
    projectName?: string;
}

type Step = 'intent' | 'config' | 'budget' | 'contact' | 'success';

export const SovereignConcierge: React.FC<SovereignConciergeProps> = ({ isOpen, onClose, projectName }) => {
    const [step, setStep] = useState<Step>('intent');
    const [formData, setFormData] = useState({
        intent: '',
        config: '',
        budget: '',
        name: '',
        phone: '',
        email: '',
        whatsapp: true
    });

    const reset = () => {
        setStep('intent');
        setFormData({
            intent: '',
            config: '',
            budget: '',
            name: '',
            phone: '',
            email: '',
            whatsapp: true
        });
    };

    useEffect(() => {
        if (isOpen) reset();
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Lead submitted:', { ...formData, project: projectName });
        setStep('success');
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden relative"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div>
                            <span className="text-accent text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <Sparkles size={14} /> Township Intelligence
                            </span>
                            <h3 className="text-xl font-serif font-bold text-secondary">Sovereign Concierge</h3>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={20} className="text-gray-400" />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1 bg-gray-100">
                        <motion.div 
                            className="h-full bg-accent transition-all duration-500"
                            style={{ width: 
                                step === 'intent' ? '25%' : 
                                step === 'config' ? '50%' : 
                                step === 'budget' ? '75%' : '100%' 
                            }}
                        />
                    </div>

                    <div className="p-8">
                        {step === 'intent' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <h4 className="text-2xl font-serif font-bold text-secondary mb-6">What is your primary goal {projectName ? `for ${projectName}` : ''}?</h4>
                                <div className="grid grid-cols-1 gap-4 font-bold">
                                    <button 
                                        onClick={() => { setFormData({...formData, intent: 'investment'}); setStep('config'); }}
                                        className="p-6 text-left border-2 border-gray-100 rounded-2xl hover:border-accent hover:bg-accent/5 transition-all group"
                                    >
                                        <div className="text-accent mb-2 group-hover:scale-110 transition-transform"><Sparkles size={24} /></div>
                                        <p className="text-secondary">High ROI Investment</p>
                                        <p className="text-gray-500 text-sm font-normal">I'm looking for capital appreciation and rental yield.</p>
                                    </button>
                                    <button 
                                        onClick={() => { setFormData({...formData, intent: 'self-use'}); setStep('config'); }}
                                        className="p-6 text-left border-2 border-gray-100 rounded-2xl hover:border-accent hover:bg-accent/5 transition-all group"
                                    >
                                        <div className="text-accent mb-2 group-hover:scale-110 transition-transform"><User size={24} /></div>
                                        <p className="text-secondary">Self-Use (End User)</p>
                                        <p className="text-gray-500 text-sm font-normal">I'm looking for a home to live in with my family.</p>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 'config' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <h4 className="text-2xl font-serif font-bold text-secondary mb-6">Preferred Configuration?</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Villa/Plot'].map(item => (
                                        <button 
                                            key={item}
                                            onClick={() => { setFormData({...formData, config: item}); setStep('budget'); }}
                                            className="p-4 border-2 border-gray-100 rounded-xl hover:border-accent hover:bg-accent/5 font-bold text-secondary transition-all"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 'budget' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <h4 className="text-2xl font-serif font-bold text-secondary mb-6">What is your budget range?</h4>
                                <div className="grid grid-cols-1 gap-3">
                                    {['45 - 65 Lacs', '65 - 85 Lacs', '85 Lacs - 1.2 Cr', '1.2 Cr - 2 Cr', 'Above 2 Cr'].map(item => (
                                        <button 
                                            key={item}
                                            onClick={() => { setFormData({...formData, budget: item}); setStep('contact'); }}
                                            className="p-4 text-left border-2 border-gray-100 rounded-xl hover:border-accent hover:bg-accent/5 font-bold text-secondary transition-all flex items-center justify-between group"
                                        >
                                            {item}
                                            <ChevronRight size={18} className="text-gray-300 group-hover:text-accent transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 'contact' && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <h4 className="text-2xl font-serif font-bold text-secondary mb-6">Almost there! Your details:</h4>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input 
                                        type="text" required placeholder="Full Name"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none"
                                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input 
                                        type="tel" required placeholder="Phone Number"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none"
                                        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input 
                                        type="email" required placeholder="Email Address"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none"
                                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                                <label className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100 cursor-pointer">
                                    <input 
                                        type="checkbox" checked={formData.whatsapp} 
                                        onChange={e => setFormData({...formData, whatsapp: e.target.checked})}
                                        className="w-5 h-5 accent-green-500 rounded"
                                    />
                                    <div className="flex items-center gap-2 text-green-700 text-sm font-bold">
                                        <MessageSquare size={16} /> Enable WhatsApp Updates
                                    </div>
                                </label>
                                <Button type="submit" variant="primary" size="lg" className="w-full rounded-xl py-4 flex items-center justify-center gap-2 group">
                                    Get Township Analysis <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                            </form>
                        )}

                        {step === 'success' && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }} 
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h4 className="text-3xl font-serif font-bold text-secondary mb-4">You're on the list!</h4>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Our Sovereign Concierge team has received your request. You'll receive a detailed township analysis for <strong>{projectName || 'Life Republic'}</strong> shortly.
                                </p>
                                <Button variant="secondary" onClick={onClose} className="rounded-full px-12">Close Concierge</Button>
                            </motion.div>
                        )}
                    </div>

                    <div className="p-4 bg-gray-50 text-center">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                            Official Life Republic Sovereignty Desk • Powered by Kolte Patil
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
