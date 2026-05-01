import React from 'react';
import { Check, Shield, Zap, Heart, Sparkles, TrendingUp, Target, User, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const SectorComparison: React.FC = () => {
    const sectors = [
        {
            name: "Atmos",
            type: "End-User",
            stars: 5,
            yield: "7.2%",
            metro: "1.2km",
            spine: "Direct",
            status: "Fast Construction",
            icon: Heart
        },
        {
            name: "Qrious",
            type: "Investor",
            stars: 5,
            yield: "8.5%",
            metro: "0.8km",
            spine: "Premium",
            status: "New Launch",
            icon: Shield
        },
        {
            name: "Canvas",
            type: "End-User",
            stars: 4,
            yield: "6.8%",
            metro: "1.5km",
            spine: "Integrated",
            status: "Phase 1 Complete",
            icon: Sparkles
        },
        {
            name: "Arezo",
            type: "Strategic",
            stars: 4,
            yield: "7.8%",
            metro: "1.1km",
            spine: "Sync",
            status: "Ready Soon",
            icon: Zap
        }
    ];

    const valueAnchors = [
        { label: "150ft Spine Road Sync", icon: Target },
        { label: "Metro Line 3 Connectivity", icon: TrendingUp },
        { label: "Smart Home Framework", icon: Zap },
        { label: "Rental Velocity Projection", icon: TrendingUp },
        { label: "15-Minute City Access", icon: User }
    ];

    return (
        <section className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-3xl">
                        <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] mb-4 block">Product Intelligence</span>
                        <h2 className="text-4xl md:text-7xl font-serif font-bold text-secondary mb-8 tracking-tighter leading-tight">
                            The Sector <br /> <span className="text-accent italic">Sovereign Matrix.</span>
                        </h2>
                        <p className="text-xl text-gray-500 font-medium leading-relaxed">
                            A mathematically validated comparison of township clusters. Use the matrix to align your investment objective with the correct structural phase.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-secondary/5 border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-secondary text-white">
                                    <th className="p-10 font-bold text-[10px] uppercase tracking-[0.4em] border-r border-white/5">Synthesis / Cluster</th>
                                    {sectors.map((s, i) => (
                                        <th key={i} className="p-10 text-center border-r border-white/5 last:border-r-0">
                                            <div className="flex flex-col items-center">
                                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-accent mb-4">
                                                    <s.icon size={24} />
                                                </div>
                                                <span className="text-2xl font-serif font-bold">{s.name}</span>
                                                <div className="flex gap-1 mt-2">
                                                    {[...Array(s.stars)].map((_, i) => (
                                                        <Star key={i} size={10} className="fill-accent text-accent" />
                                                    ))}
                                                </div>
                                                <span className="text-[9px] font-bold text-accent/60 uppercase tracking-[0.2em] mt-3 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                                    {s.type}
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                <tr>
                                    <td className="p-10 font-bold text-secondary text-sm bg-gray-50/50 border-r border-gray-100">Projected Yield</td>
                                    {sectors.map((s, i) => (
                                        <td key={i} className="p-10 text-center border-r border-gray-50 last:border-r-0">
                                            <span className="text-2xl font-bold text-secondary">{s.yield}</span>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-10 font-bold text-secondary text-sm bg-gray-50/50 border-r border-gray-100">Metro Proximity</td>
                                    {sectors.map((s, i) => (
                                        <td key={i} className="p-10 text-center border-r border-gray-50 last:border-r-0">
                                            <span className="text-sm font-bold text-gray-500">{s.metro}</span>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-10 font-bold text-secondary text-sm bg-gray-50/50 border-r border-gray-100">Spine Road Sync</td>
                                    {sectors.map((s, i) => (
                                        <td key={i} className="p-10 text-center border-r border-gray-50 last:border-r-0">
                                            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{s.spine}</span>
                                        </td>
                                    ))}
                                </tr>
                                {valueAnchors.map((anchor, ai) => (
                                    <tr key={ai}>
                                        <td className="p-10 font-bold text-secondary text-sm bg-gray-50/50 border-r border-gray-100 flex items-center gap-3">
                                            <anchor.icon size={16} className="text-accent" />
                                            {anchor.label}
                                        </td>
                                        {sectors.map((s, i) => (
                                            <td key={i} className="p-10 text-center border-r border-gray-50 last:border-r-0">
                                                <div className="flex justify-center">
                                                    {/* Strategic check logic */}
                                                    {(ai === 0 || (s.name === 'Qrious' && ai === 2) || (s.name === 'Atmos' && ai === 4)) ? (
                                                        <Check className="text-green-500" size={24} />
                                                    ) : (
                                                        <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                                                    )}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                <tr className="bg-secondary/5">
                                    <td className="p-10 font-bold text-secondary text-sm border-r border-gray-100">Cluster Status</td>
                                    {sectors.map((s, i) => (
                                        <td key={i} className="p-10 text-center border-r border-gray-50 last:border-r-0">
                                            <span className="text-[9px] font-bold text-secondary uppercase tracking-widest bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm">
                                                {s.status}
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};
