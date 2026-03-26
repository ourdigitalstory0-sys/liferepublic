import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { projects } from '../../data/projects';

export const FloatingContact: React.FC = () => {
    const [isLive, setIsLive] = useState(false);
    const [showLabel, setShowLabel] = useState(false);
    const location = useLocation();

    // Context Analysis
    const isProjectPage = location.pathname.startsWith('/projects/');
    const projectSlug = isProjectPage ? location.pathname.split('/').pop() : null;
    const currentProject = projectSlug ? projects.find(p => p.id === projectSlug) : null;

    useEffect(() => {
        const hour = new Date().getHours();
        // Live if between 9 AM and 7 PM
        setIsLive(hour >= 9 && hour < 19);

        const timer = setTimeout(() => setShowLabel(true), 3000);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    const getLabel = () => {
        if (currentProject) return `Expert advice on ${currentProject.title}`;
        if (location.pathname.startsWith('/location/')) return 'Explore Township ROI';
        return isLive ? 'Our experts are Online' : 'Connect on WhatsApp';
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {showLabel && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100 mb-2 relative"
                    >
                        <button 
                            onClick={() => setShowLabel(false)}
                            className="absolute -top-2 -left-2 bg-gray-100 rounded-full p-1 hover:bg-gray-200 transition-colors"
                        >
                            <X size={12} />
                        </button>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-bold text-secondary italic">
                            {getLabel()}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col gap-4">
                <motion.a
                    href="https://wa.me/917744009295"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className={`p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
                        !isLive ? 'bg-green-500 text-white ring-4 ring-green-500/20' : 'bg-white text-green-500 border border-gray-100 hover:bg-green-50'
                    }`}
                >
                    <MessageSquare size={28} />
                    {!isLive && (
                         <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
                    )}
                </motion.a>

                <motion.a
                    href="tel:+917744009295"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ delay: 0.1 }}
                    className={`p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
                        isLive ? 'bg-accent text-white ring-4 ring-accent/20' : 'bg-white text-secondary border border-gray-100 hover:bg-gray-50'
                    }`}
                >
                    <Phone size={28} />
                    {isLive && (
                        <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" />
                    )}
                </motion.a>
            </div>
        </div>
    );
};
