import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { projects } from '../../data/projects';

export const FloatingContact: React.FC = () => {
    const [isLive, setIsLive] = useState(false);
    const location = useLocation();

    // Context Analysis
    const isProjectPage = location.pathname.startsWith('/projects/');
    const projectSlug = isProjectPage ? location.pathname.split('/').pop() : null;
    const currentProject = projectSlug ? projects.find(p => p.id === projectSlug) : null;

    useEffect(() => {
        const hour = new Date().getHours();
        // Live if between 9 AM and 7 PM
        setIsLive(hour >= 9 && hour < 19);
    }, [location.pathname]);

    return (
        <div className="fixed sm:bottom-6 bottom-4 sm:right-6 right-4 z-50 flex flex-col items-end sm:gap-4 gap-2">

            <div className="flex flex-col sm:gap-4 gap-3">
                <motion.a
                    href="https://wa.me/917744009295"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className={`sm:p-4 p-3 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
                        !isLive ? 'bg-green-500 text-white ring-4 ring-green-500/20' : 'bg-white text-green-500 border border-gray-100 hover:bg-green-50'
                    }`}
                >
                    <MessageSquare className="sm:size-[28px] size-[24px]" />
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
                    className={`sm:p-4 p-3 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
                        isLive ? 'bg-accent text-white ring-4 ring-accent/20' : 'bg-white text-secondary border border-gray-100 hover:bg-gray-50'
                    }`}
                >
                    <Phone className="sm:size-[28px] size-[24px]" />
                    {isLive && (
                        <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" />
                    )}
                </motion.a>
            </div>
        </div>
    );
};
