import React from 'react';
import { Check, Shield, Zap, Heart, Sparkles, TrendingUp, Target, User, Star, Activity, Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import sectorsData from '../../data/sectors.json';

export const SectorComparison: React.FC = () => {
    // Strategic Selection of high-velocity clusters for comparison
    const comparisonSectors = sectorsData.sectors.filter(s => 
        ['r22', 'r9', 'r13', 'r16', 'r10', 'r31'].includes(s.id)
    ).slice(0, 4);

    const valueAnchors = [
        { label: "150ft Spine Road Sync", icon: Target },
        { label: "Metro Line 3 Proximity", icon: TrendingUp },
        { label: "Smart Home Framework", icon: Zap },
        { label: "High Yield Velocity", icon: Activity },
        { label: "Occupancy Stability", icon: Timer }
    ];

    return (
        <section className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-3xl">
                        <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] mb-4 block">Product Intelligence v6.5</span>
                        <h2 className="text-4xl md:text-7xl font-serif font-bold text-secondary mb-8 tracking-tighter leading-tight">
                            The Sector <br /> <span className="text-accent italic">Sovereign Matrix.</span>
                        </h2>
                        <p className="text-xl text-gray-500 font-medium leading-relaxed">
                            A mathematically validated comparison of township clusters. Use the matrix to align your investment objective with the correct structural phase of the 390-acre monograph.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-secondary/5 border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-secondary text-white">
                                    <th className="p-10 font-bold text-[10px] uppercase tracking-[0.4em] border-r border-white/5">Synthesis / Cluster</th>
                                    {comparisonSectors.map((s, i) => (
                                        <th key={i} className="p-10 text-center border-r border-white/5 last:border-r-0">
                                            <div className="flex flex-col items-center">
                                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-accent mb-4">
                                                    <Zap size={24} />
                                                </div>
                                                <span className="text-2xl font-serif font-bold">{s.name.split(' (')[0]}</span>
                                                <div className="flex gap-1 mt-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={10} className="fill-accent text-accent" />
                                                    ))}
                                                </div>
                                                <span className="text-[9px] font-bold text-accent/60 uppercase tracking-[0.2em] mt-3 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                                    {s.segment}
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                <tr>
                                    <td className="p-10 font-bold text-secondary text-sm bg-gray-50/50 border-r border-gray-100">Investment Velocity</td>
                                    {comparisonSectors.map((s, i) => (
                                        <td key={i} className="p-10 text-center border-r border-gray-50 last:border-r-0">
                                            <span className="text-2xl font-bold text-secondary">{(s.investment_velocity * 10).toFixed(1)}/10</span>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-10 font-bold text-secondary text-sm bg-gray-50/50 border-r border-gray-100">Metro Proximity</td>
                                    {comparisonSectors.map((s, i) => (
                                        <td key={i} className="p-10 text-center border-r border-gray-50 last:border-r-0">
                                            <span className="text-sm font-bold text-gray-500">{s.distance}</span>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-10 font-bold text-secondary text-sm bg-gray-50/50 border-r border-gray-100">RERA Possession</td>
                                    {comparisonSectors.map((s, i) => (
                                        <td key={i} className="p-10 text-center border-r border-gray-50 last:border-r-0">
                                            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{s.rera_possession}</span>
                                        </td>
                                    ))}
                                </tr>
                                {valueAnchors.map((anchor, ai) => (
                                    <tr key={ai}>
                                        <td className="p-10 font-bold text-secondary text-sm bg-gray-50/50 border-r border-gray-100 flex items-center gap-3">
                                            <anchor.icon size={16} className="text-accent" />
                                            {anchor.label}
                                        </td>
                                        {comparisonSectors.map((s, i) => (
                                            <td key={i} className="p-10 text-center border-r border-gray-50 last:border-r-0">
                                                <div className="flex justify-center">
                                                    {/* Strategic check logic based on data v6.5 */}
                                                    {(ai === 0 || (s.investment_velocity > 0.9 && ai === 3) || (s.occupancy !== 'Under Construction' && ai === 4)) ? (
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
                                    <td className="p-10 font-bold text-secondary text-sm border-r border-gray-100">Occupancy Status</td>
                                    {comparisonSectors.map((s, i) => (
                                        <td key={i} className="p-10 text-center border-r border-gray-50 last:border-r-0">
                                            <span className="text-[9px] font-bold text-secondary uppercase tracking-widest bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm">
                                                {s.occupancy}
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

