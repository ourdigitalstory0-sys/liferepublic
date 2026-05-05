import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, CheckCircle } from 'lucide-react';
import { Button } from './Button';

interface BrochureModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectName?: string;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose, projectName = "Life Republic" }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        
        try {
            const { api } = await import('../../services/api');
            await api.leads.create({
                name: formData.get('name') as string,
                phone: formData.get('phone') as string,
                email: formData.get('email') as string,
                project_id: projectName,
                message: `Brochure Download Request: ${projectName}`
            });
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                onClose();
            }, 3000);
        } catch (error) {
            console.error("Failed to submit brochure request:", error);
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                onClose();
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed z-[70] bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="bg-primary/30 p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-serif font-bold text-secondary">
                                Download Brochure
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-secondary transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            {!isSubmitted ? (
                                <>
                                    <p className="text-gray-600 mb-6 text-sm">
                                        Please fill in your details to instantly download the brochure for <span className="font-semibold text-secondary">{projectName}</span>.
                                    </p>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                            <input
                                                name="name"
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                                                placeholder="Your Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                            <input
                                                name="phone"
                                                type="tel"
                                                required
                                                pattern="[0-9]{10}"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                                                placeholder="10-digit Mobile Number"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                                            <input
                                                name="email"
                                                type="email"
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                        <Button type="submit" className="w-full gap-2 mt-2" disabled={isSubmitting}>
                                            {isSubmitting ? 'Processing...' : 'Download Now'} <Download size={18} />
                                        </Button>
                                    </form>
                                </>
                            ) : (
                                <div className="py-12 text-center">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h4 className="text-xl font-bold text-secondary mb-2">Thank You!</h4>
                                    <p className="text-gray-600">The brochure has been sent to your email/phone.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
