import React from 'react';
import { Check, Shield, Zap, Heart, Sparkles } from 'lucide-react';

export const SectorComparison: React.FC = () => {
    const sectors = [
        {
            name: "Atmos",
            target: "Modern Families",
            focus: "Nature & Openness",
            possession: "Oct 2027",
            status: "Fast Construction",
            icon: Heart
        },
        {
            name: "Aros",
            target: "Community Lovers",
            focus: "Social Connectivity",
            possession: "Dec 2026",
            status: "Near Completion",
            icon: Sparkles
        },
        {
            name: "Arezo",
            target: "Young Starters",
            focus: "Efficiency & Value",
            possession: "Oct 2025",
            status: "Ready Soon",
            icon: Zap
        },
        {
            name: "Qrious",
            target: "Tech Professionals",
            focus: "Smart Living",
            possession: "April 2030",
            status: "New Launch",
            icon: Shield
        }
    ];

    const features = [
        "Integrated Planet App",
        "3.5 Acre Urban Park Proximity",
        "Smart Home Automations",
        "Dedicated Sports Zone",
        "Co-working Spaces"
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary mb-4">Choose Your Sector</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Different sectors at Life Republic cater to unique lifestyles. Compare and find the perfect match for your family.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-secondary text-white">
                                <th className="p-6 rounded-tl-2xl">Features / Sector</th>
                                {sectors.map((s, i) => (
                                    <th key={i} className={`p-6 text-center ${i === sectors.length - 1 ? 'rounded-tr-2xl' : ''}`}>
                                        <div className="flex flex-col items-center">
                                            <s.icon className="mb-2 text-accent" size={24} />
                                            <span className="text-xl font-bold">{s.name}</span>
                                            <span className="text-xs font-normal text-gray-300 block mt-1">{s.target}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr>
                                <td className="p-6 font-bold text-gray-700 bg-gray-50/50">Primary Focus</td>
                                {sectors.map((s, i) => (
                                    <td key={i} className="p-6 text-center text-sm font-medium text-secondary">{s.focus}</td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-6 font-bold text-gray-700 bg-gray-50/50">Possession</td>
                                {sectors.map((s, i) => (
                                    <td key={i} className="p-6 text-center text-sm font-bold text-accent">{s.possession}</td>
                                ))}
                            </tr>
                            {features.map((f, fi) => (
                                <tr key={fi}>
                                    <td className="p-6 font-medium text-gray-600 bg-gray-50/50">{f}</td>
                                    {sectors.map((s, i) => (
                                        <td key={i} className="p-6 text-center">
                                            <div className="flex justify-center">
                                                {/* Logic for showing check or x based on sector focus */}
                                                {(fi === 1 || (s.name === 'Qrious' && fi === 0) || (s.name === 'Atmos' && fi === 3)) ? (
                                                    <Check className="text-green-500" size={20} />
                                                ) : (
                                                    <Check className="text-gray-300" size={20} />
                                                )}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            <tr className="bg-gray-50">
                                <td className="p-6 font-bold text-gray-700 rounded-bl-2xl">Current Status</td>
                                {sectors.map((s, i) => (
                                    <td key={i} className={`p-6 text-center text-xs font-bold uppercase tracking-widest ${i === sectors.length - 1 ? 'rounded-br-2xl' : ''}`}>
                                        <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full">{s.status}</span>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};
