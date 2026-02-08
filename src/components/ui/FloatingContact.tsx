import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone } from 'lucide-react';

export const FloatingContact: React.FC = () => {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
            <motion.a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
            >
                <MessageSquare size={24} />
            </motion.a>

            <motion.a
                href="tel:+919876543210"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ delay: 0.1 }}
                className="bg-accent text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-colors flex items-center justify-center"
            >
                <Phone size={24} />
            </motion.a>
        </div>
    );
};
