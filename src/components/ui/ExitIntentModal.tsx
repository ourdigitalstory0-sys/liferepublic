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

    const isTownshipGuide = typeof window !== 'undefined' && window.location.pathname === '/township-guide';

    const content = isTownshipGuide ? {
        tag: "Digital Concierge",
        title: "Download the 390-Acre \r\n Masterplan Roadmap",
        desc: "Get the high-fidelity PDF featuring possession timelines for all 73+ sectors and the 2026 infrastructure roadmap.",
        btn: "Download Masterplan",
        img: "https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.8122513965070959.avif"
    } : {
        tag: "Wait! Don't Miss Out",
        title: "Get the Exclusive \r\n Project Portfolio",
        desc: "Unlock detailed floor plans, latest pricing sheet, and exclusive launch offers for Life Republic clusters.",
        btn: "Download Brochure",
        img: "/images/local/images/gallery/eros/master-layout.webp"
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
+
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
+
                        <div className="flex flex-col md:flex-row">
                            {/* Image Side (Hidden on mobile) */}
                            <div className="hidden md:block w-1/3 bg-gray-100 relative">
                                <img
                                    src={content.img}
                                    alt="Life Republic"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://life-republic.in/images/gallery/eros/master-layout.webp";
                                    }}
                                />
                                <div className="absolute inset-0 bg-secondary/20 mix-blend-multiply" />
                            </div>
+
                            {/* Content Side */}
                            <div className="w-full md:w-2/3 p-8">
                                <div className="mb-2 text-accent font-bold tracking-wider text-xs uppercase">{content.tag}</div>
                                <h3 className="text-2xl font-serif font-bold text-secondary mb-3 whitespace-pre-line">
                                    {content.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                    {content.desc}
                                </p>
+
                                <div className="space-y-3">
                                    <Button
                                        variant="primary"
                                        className="w-full gap-2 justify-center py-6 text-lg"
                                        onClick={() => {
                                            window.location.href = '/contact?source=exit-intent';
                                        }}
                                    >
                                        <Download size={20} />
                                        {content.btn}
                                    </Button>

                                </div>
+
                                <p className="text-center mt-4 text-xs text-gray-400">
                                    Secure & Confidential. Direct from Developer.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
