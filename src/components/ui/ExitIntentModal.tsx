import React, { useEffect, useState } from 'react';
import { X, Download, Phone } from 'lucide-react';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';

export const ExitIntentModal: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        // Check if already shown in this session
        const sessionTriggered = sessionStorage.getItem('exitIntentTriggered');
        if (sessionTriggered) {
            setHasTriggered(true);
            return;
        }

        const handleMouseLeave = (e: MouseEvent) => {
            // Trigger only if mouse leaves the top of the viewport
            if (e.clientY <= 0 && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
                sessionStorage.setItem('exitIntentTriggered', 'true');
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [hasTriggered]);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                        >
                            <X size={20} className="text-gray-500" />
                        </button>

                        <div className="flex flex-col md:flex-row">
                            {/* Image Side (Hidden on mobile) */}
                            <div className="hidden md:block w-1/3 bg-gray-100 relative">
                                <img
                                    src="/images/local/images/gallery/eros/master-layout.webp"
                                    alt="Life Republic"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback if local image not yet ready
                                        e.currentTarget.src = "https://liferepublic.in/images/gallery/eros/master-layout.webp";
                                    }}
                                />
                                <div className="absolute inset-0 bg-secondary/20 mix-blend-multiply" />
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-2/3 p-8">
                                <div className="mb-2 text-accent font-bold tracking-wider text-xs uppercase">Wait! Don't Miss Out</div>
                                <h3 className="text-2xl font-serif font-bold text-secondary mb-3">
                                    Get the Exclusive <br /> Project Brochure
                                </h3>
                                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                    Unlock detailed floor plans, latest pricing sheet, and exclusive launch offers before you go.
                                </p>

                                <div className="space-y-3">
                                    <Button
                                        variant="primary"
                                        className="w-full gap-2 justify-center py-6 text-lg"
                                        onClick={() => {
                                            // Trigger brochure download logic or open modal
                                            // For now, redirect to contact or just close
                                            window.location.href = '/contact';
                                        }}
                                    >
                                        <Download size={20} />
                                        Download Now
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="w-full gap-2 justify-center border-gray-200 hover:bg-gray-50 text-gray-600"
                                        onClick={() => {
                                            window.location.href = 'tel:+917744009295';
                                        }}
                                    >
                                        <Phone size={18} />
                                        Speak to Expert
                                    </Button>
                                </div>

                                <p className="text-center mt-4 text-xs text-gray-400">
                                    No spam. Unsubscribe anytime.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
