import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Sparkles, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { api } from '../../services/api';

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
    const [error, setError] = useState<string | null>(null);
    
    // Honeypot ref
    const honeyRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // 1. Honeypot Check
        if (honeyRef.current?.value) {
            console.warn("Honeypot triggered");
            setIsSubmitted(true); // Silent fail
            return;
        }

        // 2. Client-side Rate Limiting
        const lastSubmission = localStorage.getItem('lr_last_submission');
        const now = Date.now();
        if (lastSubmission && now - parseInt(lastSubmission) < 30000) { // 30 second limit
            setError("Please wait a moment before submitting again.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const leadData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            project_id: projectId || projectName,
            message: `Enquiry for ${projectName} via Digital Sales Desk`,
            source: window.location.hostname
        };

        try {
            await api.leads.create(leadData);
            localStorage.setItem('lr_last_submission', now.toString());
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                onClose();
            }, 4000);
        } catch (err) {
            console.error("Submission error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex sm:items-center items-end justify-center sm:p-4 p-0 bg-secondary/80 backdrop-blur-sm">
                    {/* Backdrop click to close */}
                    <div className="absolute inset-0" onClick={onClose} />
                    
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="bg-white rounded-t-[40px] sm:rounded-3xl shadow-2xl w-full sm:max-w-xl max-h-[95vh] overflow-hidden relative z-10"
                    >
                        {/* Header */}
                        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                            <div>
                                <span className="text-accent text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Sparkles size={14} /> Official Enquiry
                                </span>
                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-secondary mt-1">
                                    Digital Sales Desk
                                </h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-secondary"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="sm:p-8 p-6 overflow-y-auto">
                            {!isSubmitted ? (
                                <>
                                    <div className="mb-6">
                                        <p className="text-secondary font-medium mb-1">Requesting details for:</p>
                                        <p className="text-accent font-bold text-lg">{projectName}</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Honeypot Field - Hidden from humans */}
                                        <div className="hidden" aria-hidden="true">
                                            <input 
                                                type="text" 
                                                name="website_url" 
                                                ref={honeyRef} 
                                                tabIndex={-1} 
                                                autoComplete="off" 
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    placeholder="Enter your name"
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all outline-none text-secondary"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Mobile Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    pattern="[0-9]{10}"
                                                    placeholder="10-digit mobile"
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all outline-none text-secondary"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="your@email.com"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all outline-none text-secondary"
                                            />
                                        </div>

                                        {error && (
                                            <p className="text-red-500 text-sm font-medium px-1">{error}</p>
                                        )}

                                        <div className="bg-accent/5 p-4 rounded-xl border border-accent/10 mb-6">
                                            <p className="text-xs text-secondary/70 leading-relaxed">
                                                By submitting, you agree to receive official project updates, pricing, and availability details via WhatsApp and Call from Life Republic Digital Sales Desk.
                                            </p>
                                        </div>

                                        <Button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="w-full h-14 rounded-xl text-lg font-bold shadow-xl shadow-accent/20 flex items-center justify-center gap-2 group"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 size={20} className="animate-spin" />
                                            ) : (
                                                <>
                                                    Unlock Official Pricing 
                                                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 text-center"
                                >
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-secondary mb-3">Enquiry Received!</h4>
                                    <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                                        Our Township Experts will connect with you shortly with the official price list and brochure.
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
