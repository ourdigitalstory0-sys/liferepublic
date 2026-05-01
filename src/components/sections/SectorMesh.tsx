import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import sectorsData from '../../data/sectors.json';
import { Globe, Map, Zap, Route, Target, Compass, Timer, Network, Cpu, ShieldCheck, Sparkles, Activity, Layers, Navigation } from 'lucide-react';

export const SectorMesh: React.FC = () => {
    const [hoveredSectorId, setHoveredSectorId] = useState<string | null>(null);
    
    const activeSector = sectorsData.sectors.find(s => s.id === hoveredSectorId);

    return (
        <section className="py-48 bg-secondary overflow-hidden relative">
            {/* Background Neural Matrix Synthesis v6.5 */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" className="w-full h-full">
                    <defs>
                        <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <AnimatePresence>
                        {hoveredSectorId && (
                            <motion.path 
                                d={`M ${Math.random() * 200 + 100} ${Math.random() * 400 + 200} Q 600 400 ${Math.random() * 200 + 1000} ${Math.random() * 400 + 200}`}
                                fill="none" 
                                stroke="var(--accent)" 
                                strokeWidth="2"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                exit={{ pathLength: 0, opacity: 0 }}
                                transition={{ duration: 0.8 }}
                            />
                        )}
                    </AnimatePresence>
                    <motion.circle 
                        cx="50%" cy="50%" r="40%" 
                        fill="url(#glow)" 
                        className="animate-pulse"
                    />
                </svg>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-end justify-between gap-16 mb-32">
                    <div className="max-w-4xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-4 px-6 py-3 bg-accent/20 border border-accent/30 rounded-full mb-10 backdrop-blur-2xl"
                        >
                            <Cpu size={16} className="text-accent animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-accent">Tectonic Velocity Lab v6.5</span>
                        </motion.div>
                        <h2 className="text-6xl md:text-[9rem] font-serif font-bold text-white mb-10 tracking-tighter leading-[0.85]">
                            Neural <br /> <span className="text-accent italic">Velocity Mesh.</span>
                        </h2>
                        <p className="text-2xl text-gray-400 font-medium leading-relaxed max-w-3xl">
                            Synchronizing the 390-acre residential monograph with Hinjewadi's infrastructure catalysts. Verified 2026 connectivity active for <span className="text-white italic">Strategic Sovereignty.</span>
                        </p>
                    </div>

                    {/* Global Proximity HUD v6.5 */}
                    <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/10 w-full lg:w-[450px] relative group overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-10">
                                <Navigation size={24} className="text-accent animate-spin-slow" />
                                <span className="text-[11px] font-bold text-accent uppercase tracking-[0.4em]">Infrastructure Proximity</span>
                            </div>
                            <div className="space-y-6">
                                {sectorsData.avenues.map((a, i) => (
                                    <div key={i} className="flex justify-between items-center group/item">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover/item:text-white transition-colors">{a.name}</span>
                                        </div>
                                        <span className="text-lg font-mono font-bold text-white tracking-tighter">{a.distance}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Residential Node Matrix */}
                    <div className="lg:col-span-1 space-y-12 h-[700px] overflow-y-auto pr-4 custom-scrollbar">
                        <div className="bg-white/5 backdrop-blur-3xl rounded-[3.5rem] p-10 border border-white/10 shadow-2xl">
                            <div className="flex items-center gap-4 mb-12">
                                <Target size={24} className="text-accent" />
                                <h3 className="font-bold text-white uppercase tracking-[0.4em] text-[11px]">Residential Nodes</h3>
                            </div>
                            <ul className="space-y-6">
                                {sectorsData.sectors.map((s) => (
                                    <li 
                                        key={s.id}
                                        onMouseEnter={() => setHoveredSectorId(s.id)}
                                        onMouseLeave={() => setHoveredSectorId(null)}
                                    >
                                        <Link to={`/projects/${s.slug}`} className="flex items-center justify-between group">
                                            <div className="flex flex-col">
                                                <span className="text-gray-400 group-hover:text-accent text-base font-bold transition-all tracking-tight leading-none mb-1">{s.name.split('(')[0]}</span>
                                                <span className="text-[9px] text-white/10 font-bold uppercase tracking-widest">{s.segment}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full transition-all duration-500 ${hoveredSectorId === s.id ? 'bg-accent scale-150 shadow-[0_0_15px_var(--accent)]' : 'bg-white/10 group-hover:bg-accent/40'}`}></div>
                                                <span className="text-[10px] text-white/20 font-bold uppercase tracking-tighter">{s.id.toUpperCase()}</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Spatial Synthesis HUD v6.5 */}
                    <div className="md:col-span-1 lg:col-span-2 relative min-h-[700px]">
                        <AnimatePresence mode="wait">
                            {activeSector ? (
                                <motion.div
                                    key={activeSector.id}
                                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 30 }}
                                    className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-accent/20 p-16 flex flex-col items-center justify-center text-center overflow-hidden shadow-2xl"
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-20 animate-pulse"></div>
                                    
                                    <div className="relative z-10 space-y-12 w-full">
                                        <div className="flex items-center justify-center gap-12">
                                            <div className="w-24 h-24 bg-accent/20 rounded-3xl flex items-center justify-center text-accent relative group">
                                                <div className="absolute inset-0 border-2 border-accent/30 rounded-3xl animate-ping"></div>
                                                <Layers size={40} />
                                            </div>
                                            <div className="h-16 w-px bg-white/10"></div>
                                            <div className="text-left">
                                                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] block mb-2">Investment Velocity</span>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
                                                        <motion.div 
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${activeSector.investment_velocity * 100}%` }}
                                                            className="h-full bg-accent"
                                                        />
                                                    </div>
                                                    <span className="text-xl font-mono font-bold text-white">{(activeSector.investment_velocity * 100).toFixed(0)}%</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <h3 className="text-5xl md:text-8xl font-serif font-bold text-white tracking-tighter leading-none">
                                                {activeSector.name.split(' (')[0]} <br />
                                                <span className="italic text-accent">{activeSector.id.toUpperCase()} Synthesis.</span>
                                            </h3>
                                            <p className="text-2xl text-gray-400 font-medium max-w-xl mx-auto leading-relaxed italic">
                                                "{activeSector.usp}"
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-3 gap-6 w-full max-w-2xl mx-auto">
                                            {[
                                                { label: 'RERA Possession', val: activeSector.rera_possession, icon: Timer },
                                                { label: 'Occupancy', val: activeSector.occupancy, icon: Activity },
                                                { label: 'Infrastructure', val: activeSector.distance, icon: Route }
                                            ].map((m, i) => (
                                                <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5 flex flex-col items-center gap-3">
                                                    <m.icon size={20} className="text-accent/60" />
                                                    <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{m.label}</span>
                                                    <span className="text-sm font-bold text-white text-center">{m.val}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Link to={`/projects/${activeSector.slug}`} className="inline-flex items-center gap-4 bg-accent text-secondary px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
                                            Access Project Monograph <Zap size={18} />
                                        </Link>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-center border-[4px] border-dashed border-white/5 rounded-[4rem]"
                                >
                                    <div className="relative">
                                        <Sparkles size={80} className="text-white/10 mb-12 animate-pulse" />
                                        <motion.div 
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 border-2 border-white/5 rounded-full scale-150"
                                        />
                                    </div>
                                    <p className="text-white/20 font-bold uppercase tracking-[0.6em] text-[11px] max-w-xs leading-relaxed">Select a Residential Node to Calibrate Infrastructure Synthesis</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Infrastructure Spines v6.5 */}
                    <div className="lg:col-span-1 space-y-12">
                        <div className="bg-white/5 backdrop-blur-3xl rounded-[3.5rem] p-10 border border-white/10 shadow-2xl group">
                            <div className="flex items-center gap-4 mb-12">
                                <Zap size={24} className="text-blue-400 animate-pulse" />
                                <h3 className="font-bold text-white uppercase tracking-[0.4em] text-[11px]">Infrastructure Backbones</h3>
                            </div>
                            <ul className="space-y-6">
                                {sectorsData.avenues.map((a) => (
                                    <li key={a.id}>
                                        <Link to={`/location/${a.slug}`} className="flex items-center justify-between group/link">
                                            <span className="text-gray-400 group-hover/link:text-blue-400 text-lg font-bold transition-all tracking-tight">{a.name}</span>
                                            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/20 group-hover/link:text-blue-400 group-hover/link:border-blue-400/50 transition-all">
                                                <Route size={18} />
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="bg-secondary p-10 rounded-[3rem] border border-accent/20 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                <ShieldCheck size={80} />
                            </div>
                            <h4 className="text-xs font-bold text-accent uppercase tracking-[0.4em] mb-4">Sovereign Protocol Active</h4>
                            <p className="text-sm text-gray-400 leading-relaxed font-medium">
                                Cross-referencing all 390-acre development milestones with the 2026 Master Plan.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-32 pt-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex flex-col gap-2">
                        <p className="text-[12px] text-gray-400 uppercase tracking-[0.6em] font-bold">Neural Mesh Protocol v6.5</p>
                        <p className="text-[11px] text-gray-600 font-medium tracking-widest flex items-center gap-3">
                            <Network size={14} className="text-accent" /> Fully Synchronized to Hinjewadi Tectonic Growth.
                        </p>
                    </div>
                    <div className="flex gap-16">
                        <div className="flex items-center gap-4 group cursor-help">
                            <div className="w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_20px_var(--accent)]"></div>
                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">Sector Velocity</span>
                        </div>
                        <div className="flex items-center gap-4 group cursor-help">
                            <div className="w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_20px_rgba(96,165,250,0.5)]"></div>
                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">Infrastructure Sync</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

