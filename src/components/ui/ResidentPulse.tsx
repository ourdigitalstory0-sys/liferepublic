import React from 'react';
import { UserPlus, Home, MapPin, ShieldCheck, Zap, Trees, Activity, Heart, Globe, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const activities = [
    { type: 'Live Pulse', message: '12,452+ Sovereign Families call this home', time: 'ACTIVE', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
    { type: 'Synthesis', message: 'New 3 BHK booking in Echoes Sector R22', time: '2 mins ago', icon: Home, color: 'text-accent', bg: 'bg-accent/10' },
    { type: 'Global Tour', message: 'Digital walkthrough initiated from New Jersey, USA', time: '15 mins ago', icon: Globe, color: 'text-blue-500', bg: 'bg-blue-50' },
    { type: 'Possession', message: 'Authority letter issued for Arezo Tower A', time: '1 hour ago', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { type: 'Infrastructure', message: 'Central Spine Road LED telemetry sync complete', time: '3 hours ago', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
    { type: 'Bio-Sovereignty', message: '15 native trees planted in Urban Park Sector R10', time: 'Today', icon: Trees, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { type: 'Resident ROI', message: '12.4% average appreciation synthesized for Arezo residents', time: '2025 YTD', icon: Activity, color: 'text-accent', bg: 'bg-accent/10' }
];

export const ResidentPulse: React.FC = () => {
    return (
        <div className="bg-white border-y border-gray-100 py-6 overflow-hidden relative group max-w-[100vw]">
            {/* Background Synthesis HUD Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none"></div>
            
            <div className="container mx-auto px-4 relative z-20">
                <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
                    {/* Duplicate for seamless loop synthesis */}
                    {[...activities, ...activities].map((activity, idx) => (
                        <motion.div 
                            key={idx} 
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-6 px-10 border-r border-gray-100 last:border-r-0 group/item cursor-pointer"
                        >
                            <div className={`${activity.bg} ${activity.color} p-4 rounded-2xl shadow-sm group-hover/item:shadow-xl transition-all duration-500 border border-transparent group-hover/item:border-current/20`}>
                                <activity.icon size={24} className="group-hover/item:rotate-12 transition-transform" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-bold ${activity.color} uppercase tracking-[0.3em] leading-none`}>
                                        {activity.type}
                                    </span>
                                    <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{activity.time}</span>
                                </div>
                                <span className="text-sm font-bold text-secondary tracking-tight group-hover/item:text-accent transition-colors">
                                    {activity.message}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: flex;
                    width: fit-content;
                    animation: marquee 60s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}} />
        </div>
    );
};
