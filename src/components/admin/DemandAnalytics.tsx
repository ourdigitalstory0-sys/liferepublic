import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, BarChart3, TrendingUp, Users } from 'lucide-react';

interface DemandAnalyticsProps {
    leads: any[];
}

export const DemandAnalytics: React.FC<DemandAnalyticsProps> = ({ leads }) => {
    // Sector Breakdown logic
    const sectorStats = leads.reduce((acc: any, lead: any) => {
        const sectors = lead.metadata?.sectors_viewed || [];
        sectors.forEach((s: string) => {
            acc[s] = (acc[s] || 0) + 1;
        });
        return acc;
    }, {});

    const sortedSectors = Object.entries(sectorStats)
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 5);

    const maxCount = Math.max(...(sortedSectors.map(s => s[1] as number)), 1);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Sector Heatmap */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/10 text-accent rounded-lg">
                            <BarChart3 size={20} />
                        </div>
                        <h3 className="font-serif font-bold text-gray-900">Sector Demand Heatmap</h3>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Top 5 Clusters</span>
                </div>

                <div className="space-y-6">
                    {sortedSectors.length > 0 ? sortedSectors.map(([name, count]: any, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                                <span className="text-gray-600">{name}</span>
                                <span className="text-accent">{count} Synthesis Requests</span>
                            </div>
                            <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(count / maxCount) * 100}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className="h-full bg-accent"
                                />
                            </div>
                        </div>
                    )) : (
                        <div className="py-12 text-center text-gray-400 italic text-sm">
                            Insufficient behavioral data for heatmap.
                        </div>
                    )}
                </div>
            </div>

            {/* Neural Insights */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                        <TrendingUp size={20} />
                    </div>
                    <h3 className="font-serif font-bold text-gray-900">Neural Insights</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: 'Active Sessions', value: '42', icon: Users, trend: '+12%' },
                        { label: 'Conversion Velocity', value: '8.4%', icon: TrendingUp, trend: '+0.5%' },
                        { label: 'Synthesis Volume', value: leads.filter(l => l.metadata?.synthesis_completed).length, icon: PieChart, trend: 'Stable' }
                    ].map((stat, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                            <stat.icon size={18} className="text-gray-400 mb-4" />
                            <div className="text-2xl font-serif font-bold text-gray-900">{stat.value}</div>
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
                                <span className="text-[9px] font-bold text-green-500">{stat.trend}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
