import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, User, Send, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { api } from '../../services/api';

export const Concierge: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: '', phone: '', interest: '', budget: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isNRI, setIsNRI] = useState(false);

    // Dynamic Pre-selection & NRI Detection (Phase 12)
    React.useEffect(() => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (!timezone.includes('Asia/Calcutta') && !timezone.includes('Asia/Kolkata')) {
            setIsNRI(true);
        }

        const path = window.location.pathname;
        if (path.includes('/projects/atmos')) setFormData(prev => ({ ...prev, interest: 'Atmos Selection' }));
        else if (path.includes('/projects/aros')) setFormData(prev => ({ ...prev, interest: 'Aros Selection' }));
        else if (path.includes('/projects/echoes')) setFormData(prev => ({ ...prev, interest: 'Echoes Portfolio' }));
        else if (path.includes('/projects/ivana')) setFormData(prev => ({ ...prev, interest: 'Ivana Portfolio' }));
    }, []);

    const interests = [
        ...(isNRI ? ["NRI Investment Portfolio", "Schedule International Call"] : []),
        "2 BHK Selection",
        "3 BHK Selection",
        "Luxury Villas",
        "Ready Possession",
        "Investment ROI"
    ];

    const budgets = [
        "₹45L - ₹75L",
        "₹75L - ₹1.2Cr",
        "₹1.2Cr - ₹2.5Cr",
        "Above ₹2.5Cr"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const projectMatch = window.location.pathname.match(/\/projects\/([^\/]+)/);
            const projectId = projectMatch ? projectMatch[1] : undefined;

            await api.leads.create({
                name: formData.name,
                phone: formData.phone,
                email: 'direct@concierge.io',
                message: `Interests: ${formData.interest} | Budget: ${formData.budget} | Phase: 8 CRO`,
                project_id: projectId
            });

            setIsSubmitted(true);
            setTimeout(() => {
                setIsOpen(false);
                setStep(1);
                setIsSubmitted(false);
                setFormData({ name: '', phone: '', interest: '', budget: '' });
            }, 3000);
        } catch (error) {
            console.error("Concierge Submission Error:", error);
            alert("Failed to connect to concierge. Please try again or call +91-7744009295.");
        }
    };

    return (
        <div className="fixed bottom-6 right-28 z-[100] font-sans h-0 flex items-end justify-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white w-[350px] rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-20 origin-bottom-right"
                    >
                        {/* Header */}
                        <div className="bg-secondary p-6 text-white relative">
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                                    <Sparkles size={20} className="text-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Sovereign Concierge</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        <span className="text-xs text-white/80">Online | Priority Support</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {step === 1 && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Step 1: Configuration</p>
                                            <div className="space-y-2">
                                                {interests.map((item, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => { setFormData({...formData, interest: item}); setStep(2); }}
                                                        className="w-full text-left p-3 rounded-xl border border-gray-100 hover:border-accent hover:bg-accent/5 transition-all group flex items-center justify-between"
                                                    >
                                                        <span className="text-sm font-medium text-gray-700">{item}</span>
                                                        <ChevronRight size={16} className="text-gray-300 group-hover:text-accent" />
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Step 2: Expected Budget</p>
                                            <div className="space-y-2">
                                                {budgets.map((item, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => { setFormData({...formData, budget: item}); setStep(3); }}
                                                        className="w-full text-left p-3 rounded-xl border border-gray-100 hover:border-accent hover:bg-accent/5 transition-all group flex items-center justify-between"
                                                    >
                                                        <span className="text-sm font-medium text-gray-700">{item}</span>
                                                        <ChevronRight size={16} className="text-gray-300 group-hover:text-accent" />
                                                    </button>
                                                ))}
                                            </div>
                                            <button type="button" onClick={() => setStep(1)} className="mt-4 text-xs text-gray-400 hover:text-accent">Back</button>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Step 3: Contact Details</p>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Your Name"
                                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                                                    value={formData.name}
                                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                                />
                                            </div>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                                                <input
                                                    required
                                                    type="tel"
                                                    placeholder="Phone Number"
                                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                                                    value={formData.phone}
                                                    onChange={e => setFormData({...formData, phone: e.target.value})}
                                                />
                                            </div>
                                            <Button type="submit" className="w-full py-4 rounded-xl gap-2 shadow-lg shadow-accent/20">
                                                <Send size={18} /> Get Personalized Offer
                                            </Button>
                                            <button 
                                                type="button" 
                                                onClick={() => setStep(2)}
                                                className="w-full text-center text-xs text-gray-400 hover:text-gray-600"
                                            >
                                                Go Back
                                            </button>
                                        </motion.div>
                                    )}
                                </form>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }} 
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send size={30} />
                                    </div>
                                    <h4 className="font-bold text-gray-800 mb-2">{isNRI ? 'Request Acknowledged' : 'Offer Requested'}</h4>
                                    <p className="text-sm text-gray-500">
                                        {isNRI 
                                            ? `An international property specialist will contact you via WhatsApp for your ${formData.interest} enquiry.` 
                                            : `Our concierge for ${formData.interest} (${formData.budget}) will contact you within 2 minutes.`}
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-6 py-4 rounded-full shadow-2xl transition-all relative ${
                    isOpen ? 'bg-white text-secondary' : 'bg-secondary text-white'
                }`}
            >
                {isOpen ? <X size={24} /> : <Sparkles size={24} />}
                <span className="font-bold tracking-wide">ASSIST</span>
                {!isOpen && (
                    <div className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
                    </div>
                )}
            </motion.button>
        </div>
    );
};
