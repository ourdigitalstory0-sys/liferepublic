import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const Concierge: React.FC = () => {
    const toggleEnquiry = () => {
        window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
    };

    return (
        <div className="fixed sm:bottom-6 bottom-60 sm:right-28 right-4 z-[100] font-sans h-0 flex items-end justify-end">
            {/* Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleEnquiry}
                className="flex items-center gap-2 px-6 py-4 rounded-full shadow-2xl transition-all relative bg-secondary text-white"
            >
                <Sparkles size={24} />
                <span className="font-bold tracking-wide">ASSIST</span>
                <div className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
                </div>
            </motion.button>
        </div>
    );
};
