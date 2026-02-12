import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string | null;
    altText?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageSrc, altText = "Image Preview" }) => {
    if (!imageSrc) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative z-10 max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center pointer-events-none"
                    >
                        <div className="relative pointer-events-auto shadow-2xl rounded-lg overflow-hidden bg-white/5 p-1 backdrop-blur-md border border-white/10">
                            <button
                                onClick={onClose}
                                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors p-2 bg-black/50 rounded-full backdrop-blur-md"
                            >
                                <X size={24} />
                            </button>
                            <img
                                src={imageSrc}
                                alt={altText}
                                className="max-w-full max-h-[85vh] object-contain rounded-md"
                            />
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md pointer-events-none">
                                {altText}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
