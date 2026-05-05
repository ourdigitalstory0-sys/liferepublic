import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { EnquiryModal } from './EnquiryModal';

export const FloatingContact: React.FC = () => {
    const [isLive, setIsLive] = useState(false);
    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
    const [modalContext, setModalContext] = useState("Life Republic");
    const location = useLocation();


    useEffect(() => {
        const hour = new Date().getHours();
        // Live if between 9 AM and 7 PM
        setIsLive(hour >= 9 && hour < 19);
    }, [location.pathname]);

    return (
        <>
            <div className="fixed sm:bottom-6 bottom-4 sm:right-6 right-4 z-50 flex flex-col items-end sm:gap-4 gap-2">
                <div className="flex flex-col sm:gap-4 gap-3">
                    <motion.button
                        onClick={() => {
                            setModalContext("Schedule Live Synthesis");
                            setIsEnquiryOpen(true);
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        className={`sm:p-4 p-3 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
                            !isLive ? 'bg-accent text-white ring-4 ring-accent/20' : 'bg-white text-accent border border-gray-100 hover:bg-gray-50'
                        }`}
                        aria-label="Schedule Live Synthesis"
                    >
                        <MessageSquare className="sm:size-[28px] size-[24px]" />
                        {!isLive && (
                             <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" />
                        )}
                    </motion.button>

                    <motion.button
                        onClick={() => {
                            setModalContext("Request Instant Callback");
                            setIsEnquiryOpen(true);
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ delay: 0.1 }}
                        className={`sm:p-4 p-3 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
                            isLive ? 'bg-accent text-white ring-4 ring-accent/20' : 'bg-white text-secondary border border-gray-100 hover:bg-gray-50'
                        }`}
                        aria-label="Request Instant Callback"
                    >
                        <Phone className="sm:size-[28px] size-[24px]" />
                        {isLive && (
                            <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" />
                        )}
                    </motion.button>
                </div>
            </div>

            <EnquiryModal 
                isOpen={isEnquiryOpen} 
                onClose={() => setIsEnquiryOpen(false)} 
                projectName={modalContext}
            />
        </>
    );
};
