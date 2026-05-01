import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Sun, Wind, Trees, ShieldCheck, Cpu, Zap, Network, Globe, ArrowUpRight, Sparkles } from 'lucide-react';
import { SEO } from '../components/seo/SEO';

const metrics = [
    { label: 'Bio-Sovereign Trees', value: '15,000+', icon: Trees, color: 'text-emerald-500', description: 'Massive afforestation across the 400-acre structural mesh.' },
    { label: 'Water Synthesis', value: '2.5 MLD', icon: Droplets, color: 'text-blue-500', description: 'Advanced STP with zero-liquid discharge and aquifer recharge.' },
    { label: 'Solar Matrix', value: '750 kW', icon: Sun, color: 'text-orange-500', description: 'Synchronized solar grid offsetting 40% of public infrastructure load.' },
    { label: 'Open Bio-Mesh', value: '70%', icon: Leaf, color: 'text-green-500', description: 'Dedicated to nature, architectural landscaping, and Urban Parks.' }
];

export const Sustainability: React.FC = () => {
    return (
        <div className="bg-white pt-32 pb-40 relative overflow-hidden">
            <SEO 
                title="Sovereign ESG & Sustainability Monograph | Life Republic"
                description="Explore the environmental structuralism at Kolte Patil Life Republic. 15,000+ trees, 2.5 MLD water recycling, and 750kW solar sync in Hinjewadi's premier green township."
            />
            
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[200px] pointer-events-none -mr-48 -mt-48"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-end justify-between mb-32 gap-16">
                    <div className="max-w-4xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-4 px-6 py-3 bg-secondary text-white rounded-full mb-10 shadow-xl"
                        >
                            <ShieldCheck size={16} className="text-emerald-400 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.6em]">Sovereign ESG Protocol v6.0</span>
                        </motion.div>
                        <h1 className="text-7xl md:text-[10rem] font-serif font-bold text-secondary mb-10 tracking-tighter leading-[0.8]">
                            Environmental <br /><span className="text-emerald-500 italic">Structuralism.</span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-gray-400 leading-relaxed font-medium max-w-3xl">
                            At Life Republic, sustainability is a structural imperative. We are building a regenerative ecosystem where modern luxury coexists with high-fidelity environmental stewardship.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-6 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-inner group">
                        <div className="p-4 bg-white rounded-2xl shadow-sm text-emerald-500 group-hover:rotate-12 transition-transform">
                            <Zap size={28} />
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">ESG Benchmark</span>
                            <span className="text-xl font-bold text-secondary tracking-tight">2026 Net-Positive Ready</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
                    {metrics.map((metric, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-12 rounded-[3.5rem] border border-gray-100 hover:shadow-[0_40px_80px_-20px_rgba(16,185,129,0.1)] hover:border-emerald-500/20 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform">
                                <metric.icon size={80} />
                            </div>
                            <div className={`${metric.color} mb-10 transform group-hover:scale-110 transition-transform`}>
                                <metric.icon size={48} strokeWidth={1.5} />
                            </div>
                            <div className="text-5xl font-bold text-secondary mb-3 tracking-tighter italic">{metric.value}</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-6">{metric.label}</div>
                            <p className="text-gray-500 text-base font-medium leading-relaxed italic">"{metric.description}"</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-secondary rounded-[5rem] p-16 md:p-28 text-white relative overflow-hidden shadow-[0_80px_160px_-40px_rgba(0,0,0,0.5)] group"
                >
                    <div className="absolute inset-0 bg-[url('https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.8122513965070959.avif')] bg-cover bg-center opacity-5 grayscale pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 skew-x-12 transform translate-x-32 group-hover:translate-x-24 transition-transform duration-[2s]"></div>
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 text-emerald-400 font-bold mb-4">
                                <Network size={24} />
                                <span className="text-[11px] uppercase tracking-[0.6em]">Infrastructure Backbone Sync</span>
                            </div>
                            <h2 className="text-5xl md:text-8xl font-serif font-bold tracking-tighter leading-[0.85]">The 150ft <br /> <span className="text-emerald-400 italic">Oxygen Corridor.</span></h2>
                            <p className="text-2xl text-white/60 leading-relaxed font-medium">
                                Our central spine road is a massive 400-acre green filter. Lined with thousands of native trees, it creates a micro-climate that reduces ambient temperatures by up to 3°C across all residential clusters.
                            </p>
                            <div className="flex flex-wrap gap-8">
                                <div className="bg-white/5 backdrop-blur-xl px-10 py-6 rounded-[2.5rem] border border-white/10 group/stat">
                                    <div className="text-4xl font-bold text-emerald-400 group-hover:scale-110 transition-transform">3.5 Acres</div>
                                    <div className="text-[10px] text-white/30 uppercase font-bold tracking-[0.4em] mt-2">Sovereign Urban Park</div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-xl px-10 py-6 rounded-[2.5rem] border border-white/10 group/stat">
                                    <div className="text-4xl font-bold text-emerald-400 group-hover:scale-110 transition-transform">Zero</div>
                                    <div className="text-[10px] text-white/30 uppercase font-bold tracking-[0.4em] mt-2">Liquid Discharge</div>
                                </div>
                            </div>
                            <button className="flex items-center gap-4 px-10 py-5 bg-white text-secondary rounded-full font-bold text-xl hover:bg-emerald-400 transition-all shadow-2xl group/btn">
                                Download ESG Manifesto <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                        
                        <div className="relative aspect-square rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                            <img 
                                src="https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.8818362083715893.avif" 
                                alt="Sovereign Greenery" 
                                className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[3s]"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white/10 backdrop-blur-2xl p-16 rounded-full border border-white/20 shadow-[0_0_80px_rgba(16,185,129,0.3)]">
                                    <Globe size={80} className="text-emerald-400 animate-spin-slow" />
                                </div>
                            </div>
                            <div className="absolute bottom-10 left-10 right-10 p-8 bg-secondary/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10">
                                <p className="text-xs text-white font-bold leading-relaxed italic">"Verified 2026 Bio-Sovereignty Index: Top 1% of Integrated Townships in India."</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 12s linear infinite;
                }
            `}} />
        </div>
    );
};
