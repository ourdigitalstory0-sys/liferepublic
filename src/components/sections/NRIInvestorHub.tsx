import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Globe, Gavel, Landmark, Info, Zap, Cpu, Network, ShieldCheck, ArrowUpRight, TrendingUp } from 'lucide-react';

const guidelines = [
    {
        title: 'RERA Compliance v6.0',
        desc: 'All Life Republic sectors are 100% RERA synchronized, ensuring absolute transparency in carpet area and structural benchmarks.',
        icon: ShieldCheck,
        color: 'bg-emerald-50 text-emerald-600'
    },
    {
        title: 'Global Capital Flow',
        desc: 'FEMA-synchronized guidelines for repatriation of sale proceeds via NRE/NRO accounts for zero-latency capital mobility.',
        icon: Network,
        color: 'bg-blue-50 text-blue-600'
    },
    {
        title: 'TDS & Tax Synthesis',
        desc: 'Expert synthesis of Section 195 implications for property acquisitions by non-residents in the Hinjewadi corridor.',
        icon: Landmark,
        color: 'bg-amber-50 text-amber-600'
    },
    {
        title: 'Digital Authority (PoA)',
        desc: 'Simplified remote registration protocols for global investors. Secure your asset without physical presence.',
        icon: Gavel,
        color: 'bg-indigo-50 text-indigo-600'
    }
];

export const NRIInvestorHub: React.FC = () => {
    return (
        <section className="py-40 bg-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-24 items-center">
                    <div className="lg:w-1/2">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-4 px-6 py-3 bg-secondary text-white rounded-full mb-10 shadow-xl"
                        >
                            <Globe size={16} className="text-accent animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.6em]">Global Investment Authority v6.0</span>
                        </motion.div>
                        <h2 className="text-6xl md:text-[9rem] font-serif font-bold text-secondary mb-12 tracking-tighter leading-[0.8]">
                            NRI Legal & <br /><span className="text-accent italic">Tax Synthesis.</span>
                        </h2>
                        <p className="text-2xl text-gray-400 font-medium leading-relaxed mb-16 max-w-2xl">
                            Investing in Indian real estate from abroad requires architectural precision. Our dedicated NRI cell provides the legal and financial clarity needed for secure capital placement at Life Republic.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {guidelines.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-10 rounded-[3.5rem] border border-gray-100 hover:border-accent hover:bg-gray-50/50 transition-all group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform">
                                        <item.icon size={60} />
                                    </div>
                                    <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform shadow-sm`}>
                                        <item.icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary mb-3 tracking-tight">{item.title}</h3>
                                    <p className="text-base text-gray-500 font-medium leading-relaxed italic">"{item.desc}"</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="lg:w-1/2 relative group">
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            className="bg-secondary rounded-[5rem] p-16 md:p-24 text-white relative z-10 overflow-hidden shadow-[0_100px_200px_-50px_rgba(0,0,0,0.6)] border border-white/5"
                        >
                            <div className="absolute inset-0 bg-[url('/images/aerial-sunset.png')] bg-cover bg-center opacity-5 grayscale pointer-events-none group-hover:scale-110 transition-transform duration-[3s]"></div>
                            <div className="absolute -top-32 -right-32 w-80 h-80 bg-accent/20 rounded-full blur-[100px]"></div>
                            
                            <div className="flex items-center gap-6 mb-12">
                                <div className="w-16 h-16 bg-accent text-secondary rounded-[2rem] flex items-center justify-center shadow-2xl">
                                    <FileText size={32} />
                                </div>
                                <span className="font-bold tracking-[0.5em] uppercase text-[11px] text-accent">Sovereign Knowledge Base</span>
                            </div>
                            
                            <h3 className="text-4xl md:text-5xl font-serif font-bold mb-10 tracking-tighter">Technical Resources</h3>
                            <div className="space-y-6">
                                {[
                                    'NRI Quick Investment Monograph 2026',
                                    'Repatriation Policy Structural Overview',
                                    'Life Republic RERA Master Registry',
                                    'Hinjewadi Infrastructure ROI Synthesis'
                                ].map((doc, i) => (
                                    <button 
                                        key={i}
                                        className="w-full flex items-center justify-between p-8 rounded-[2.5rem] bg-white/5 hover:bg-white/10 border border-white/10 transition-all group/btn text-left"
                                    >
                                        <span className="text-lg font-bold group-hover/btn:text-accent transition-colors">{doc}</span>
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:text-secondary transition-all shadow-xl">
                                            <ArrowUpRight size={24} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                            
                            <div className="mt-16 flex items-center gap-8 p-10 bg-accent/10 border border-accent/20 rounded-[3rem] relative z-10">
                                <div className="p-5 bg-accent/20 rounded-2xl text-accent animate-pulse">
                                    <Cpu size={36} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-2">Expert Concierge Cell</p>
                                    <p className="text-lg text-white/60 font-medium">Speak to our dedicated Sovereign Global Investment Consultant.</p>
                                </div>
                            </div>
                        </motion.div>
                        
                        {/* Decorative floating stats v6.0 */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="absolute -bottom-12 -right-12 bg-white p-12 rounded-[4rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.3)] z-20 border border-gray-100 group/stat hover:scale-105 transition-transform"
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
                                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Global Synthesis</span>
                            </div>
                            <div className="text-6xl font-serif font-bold text-secondary mb-2 tracking-tighter italic">1,850+</div>
                            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.5em]">Global NRI Families</div>
                            <div className="flex items-center gap-2 mt-6 text-emerald-500 font-bold text-[10px] uppercase tracking-widest">
                                <TrendingUp size={14} /> +12% Growth YOY
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
