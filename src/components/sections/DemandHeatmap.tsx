import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, TrendingUp, ShieldAlert } from 'lucide-react';

export const DemandHeatmap: React.FC = () => {
    const [stats, setStats] = useState({
        visits: 42,
        unitsLeft: 12,
        lastBooking: '4 mins ago'
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                visits: prev.visits + Math.floor(Math.random() * 2)
            }));
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-accent/10 transition-colors" />
            
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-secondary text-white rounded-2xl flex items-center justify-center">
                    <Zap size={20} className="animate-pulse" />
                </div>
                <div>
                    <h3 className="font-serif font-bold text-xl text-secondary">Live Velocity Hub</h3>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Sector R7 Status</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Visits Counter */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Users size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">Active Discovery</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                        <span className="font-bold text-secondary">{stats.visits} Browsing Now</span>
                    </div>
                </div>

                {/* Scarcity Meter */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                        <span className="text-gray-400">Inventory Status</span>
                        <span className="text-accent">{stats.unitsLeft} Units Remaining</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: '100%' }}
                            animate={{ width: '15%' }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="h-full bg-accent"
                        />
                    </div>
                </div>

                {/* Last Booking */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <TrendingUp size={16} className="text-secondary" />
                        <span className="text-xs font-medium text-gray-600">Last Token Confirmed</span>
                    </div>
                    <span className="text-xs font-bold text-secondary">{stats.lastBooking}</span>
                </div>

                <div className="pt-4 flex items-center gap-3 text-red-500">
                    <ShieldAlert size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">High Demand: Price Revision Expected Q3 2026</span>
                </div>
            </div>
        </div>
    );
};
