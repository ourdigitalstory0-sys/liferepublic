import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Globe, MapPin, Building2, Zap, ArrowUpRight, Cpu, Network, ShieldCheck } from 'lucide-react';
import sectorsData from '../../data/sectors.json';
import { motion } from 'framer-motion';

export const SectorLinkMesh: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const relatedSectors = sectorsData.sectors
        .filter(s => !currentPath.includes(s.slug))
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    const relatedAvenues = sectorsData.avenues
        .filter(a => !currentPath.includes(a.slug))
        .slice(0, 3);

    const relatedLocalities = sectorsData.localities
        .filter(l => !currentPath.includes(l.slug))
        .slice(0, 3);

    return (
        <section className="py-32 bg-white border-t border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -mr-48 -mt-48"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-20">
                    <div className="max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-2 bg-secondary text-white rounded-full mb-6 shadow-xl"
                        >
                            <Network size={14} className="text-accent animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Sovereign Connectivity Matrix v6.0</span>
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-serif font-bold text-secondary tracking-tighter leading-none mb-6">
                            Infrastructure <br /><span className="text-accent italic">Synergy.</span>
                        </h2>
                        <p className="text-xl text-gray-500 font-medium leading-relaxed">
                            Navigate the structural mesh of Life Republic. Every cluster is programmatically linked to the 150ft Spine Road backbone.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-[2rem] border border-gray-100 shadow-inner group">
                        <div className="p-4 bg-white rounded-2xl shadow-sm text-accent group-hover:rotate-12 transition-transform">
                            <ShieldCheck size={28} />
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Transit Benchmark</span>
                            <span className="text-lg font-bold text-secondary tracking-tight">2026 Deployment Ready</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {/* Residential Cluster Matrix */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-4 text-accent font-bold uppercase tracking-[0.3em] text-[10px]">
                            <Building2 size={16} /> Residential Cluster Mesh
                        </div>
                        <div className="flex flex-col gap-6">
                            {relatedSectors.map((sector, i) => (
                                <motion.div key={sector.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                    <Link 
                                        to={`/projects/${sector.slug}`}
                                        className="group flex items-center justify-between p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:border-accent hover:shadow-2xl transition-all"
                                    >
                                        <div className="space-y-1">
                                            <span className="text-lg font-bold text-secondary group-hover:text-accent tracking-tight">{sector.name.split('(')[0]}</span>
                                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest block">{sector.id} Portfolio</span>
                                        </div>
                                        <ArrowUpRight size={24} className="text-gray-200 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Infrastructure Spine Matrix */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-4 text-accent font-bold uppercase tracking-[0.3em] text-[10px]">
                            <Zap size={16} /> Infrastructure Backbones
                        </div>
                        <div className="flex flex-col gap-6">
                            {relatedAvenues.map((ave, i) => (
                                <motion.div key={ave.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                    <Link 
                                        to={`/location/${ave.slug}`}
                                        className="group flex items-center justify-between p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:border-accent hover:shadow-2xl transition-all"
                                    >
                                        <div className="space-y-2">
                                            <span className="text-lg font-bold text-secondary group-hover:text-accent tracking-tight">{ave.name}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{ave.infrastructure}</span>
                                            </div>
                                        </div>
                                        <ArrowUpRight size={24} className="text-gray-200 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Regional Connectivity Matrix */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-4 text-accent font-bold uppercase tracking-[0.3em] text-[10px]">
                            <Globe size={16} /> Regional Macro-Hubs
                        </div>
                        <div className="flex flex-col gap-6">
                            {relatedLocalities.map((loc, i) => (
                                <motion.div key={loc.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                    <Link 
                                        to={`/location/${loc.slug}`}
                                        className="group flex items-center justify-between p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:border-accent hover:shadow-2xl transition-all"
                                    >
                                        <div className="space-y-2">
                                            <span className="text-lg font-bold text-secondary group-hover:text-accent tracking-tight">{loc.name} Hub</span>
                                            <div className="flex items-center gap-3">
                                                <MapPin size={12} className="text-accent" />
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{loc.distance} Synthesis</span>
                                            </div>
                                        </div>
                                        <ArrowUpRight size={24} className="text-gray-200 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-24 p-12 bg-secondary rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)] relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                        <Cpu size={150} />
                    </div>
                    <div className="space-y-4 relative z-10 text-center lg:text-left">
                        <h4 className="text-3xl md:text-5xl font-serif font-bold tracking-tighter leading-tight italic">Secure Your <br /> <span className="text-accent">Sovereign Thesis.</span></h4>
                        <p className="text-white/50 text-xl font-medium tracking-tight">Download the 2026 Hinjewadi Infrastructure & ROI appreciation monograph.</p>
                    </div>
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-brochure-engine'))}
                        className="px-16 py-8 bg-accent text-secondary rounded-full font-bold text-2xl hover:bg-white transition-all shadow-2xl flex items-center gap-6 group/btn relative z-10"
                    >
                        Initiate Synthesis <ArrowUpRight size={32} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};
