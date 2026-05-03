import React, { useEffect, useState } from 'react';
import { History, Sparkles, ArrowRight, BrainCircuit, Zap, TrendingUp, Cpu, Network, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { personalizationStore } from '../../lib/personalizationStore';
import { api } from '../../services/api';
import { ID_TO_SLUG } from '../../data/slug-registry';
import type { Project } from '../../lib/types';

export const RecentlyViewed: React.FC = () => {
    const [recentProjects, setRecentProjects] = useState<Project[]>([]);
    const [greeting, setGreeting] = useState("Your Sovereign Journey");
    const [sentimentLabel, setSentimentLabel] = useState<string>("Discovery Path");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNeuralPath = async () => {
            const history = personalizationStore.getHistory();
            
            // 1. Sentiment Synthesis v6.0
            const sentiments: Record<string, string> = {
                'curious': 'Discovery Path Synthesis',
                'intent': 'Investment Synergy Flow',
                'high-intent': 'Sovereign Thesis Active',
                'advocate': 'Township Visionary Protocol'
            };
            setSentimentLabel(sentiments[history.sentiment] || "Discovery Path Synthesis");

            // 2. Greeting Personalization
            if (history.lastSector) {
                setGreeting(`Continuing ${history.lastSector.charAt(0).toUpperCase() + history.lastSector.slice(1)} Synthesis`);
            } else if (history.intentScore > 250) {
                setGreeting("Sovereign Portfolio Continuity");
            }

            if (history.recentlyViewed.length === 0) {
                setLoading(false);
                return;
            }

            try {
                // 3. Sovereign Recency Bias Logic
                const allProjects = await api.projects.getAll();
                const filtered = allProjects
                    .filter(p => history.recentlyViewed.includes(p.id))
                    .sort((a, b) => {
                        const idxA = history.recentlyViewed.indexOf(a.id);
                        const idxB = history.recentlyViewed.indexOf(b.id);
                        return idxA - idxB; // Maintain chronological viewing order
                    });
                
                setRecentProjects(filtered);
            } catch (error) {
                console.error('Neural path synthesis error:', error);
            } finally {
                setLoading(false);
            }
        };

        loadNeuralPath();
    }, []);

    if (loading || recentProjects.length === 0) return null;

    const history = personalizationStore.getHistory();

    return (
        <section className="py-40 bg-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
            
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-4 text-accent mb-8">
                            <BrainCircuit size={24} className="animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.6em]">{sentimentLabel}</span>
                        </div>
                        <h2 className="text-6xl md:text-[9rem] font-serif font-bold text-secondary tracking-tighter leading-[0.85] mb-8">
                            {greeting}
                        </h2>
                        <p className="text-2xl text-gray-400 font-medium tracking-tight leading-relaxed max-w-2xl">
                            A high-fidelity visualization of your neural path through the 390-acre Life Republic ecosystem. 2026 engagement telemetry synchronized.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex gap-10 items-center bg-gray-50/50 backdrop-blur-xl px-12 py-6 rounded-[3rem] border border-gray-100 shadow-inner group"
                    >
                        <div className="text-right">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Intent Multiplier</span>
                            <span className="text-4xl font-serif font-bold text-secondary tracking-tighter group-hover:text-accent transition-colors">{history.intentScore}</span>
                        </div>
                        <div className="w-px h-12 bg-gray-200"></div>
                        <div className="p-4 bg-white rounded-2xl shadow-sm text-accent group-hover:rotate-12 transition-transform">
                            <TrendingUp size={32} />
                        </div>
                    </motion.div>
                </div>

                <div className="relative group">
                    <div className="flex gap-12 overflow-x-auto pb-20 snap-x no-scrollbar scroll-smooth">
                        {recentProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex-none w-[350px] md:w-[500px] snap-start"
                            >
                                <Link to={`/projects/${ID_TO_SLUG[project.id] || project.id}`} className="group block relative">
                                    <div className="relative aspect-[4/5] rounded-[4.5rem] overflow-hidden bg-gray-50 mb-10 shadow-2xl transition-all duration-1000 group-hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)]">
                                        <img 
                                            src={project.image} 
                                            alt={project.title} 
                                            loading="lazy"
                                            className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1.5s] group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-80"></div>
                                        
                                        <div className="absolute bottom-16 left-16 right-16 text-white space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center text-accent">
                                                    <Zap size={14} />
                                                </div>
                                                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">
                                                    {project.category} Synthesis
                                                </span>
                                            </div>
                                            <h3 className="text-4xl md:text-5xl font-serif font-bold leading-[0.9] group-hover:text-accent transition-colors tracking-tighter">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <div className="absolute top-12 right-12 w-20 h-20 rounded-[2rem] bg-white text-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-12 group-hover:translate-x-0 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.5)]">
                                            <ArrowUpRight size={36} />
                                        </div>
                                    </div>
                                    <div className="px-8 space-y-4">
                                        <p className="text-lg font-medium text-gray-400 leading-relaxed line-clamp-2 italic">
                                            "{project.description}"
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="h-px flex-grow bg-gray-100"></div>
                                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Neural Index 0{index + 1}</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                    
                    {/* Atmospheric Fade Edges */}
                    <div className="absolute top-0 right-0 h-full w-60 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none z-10"></div>
                </div>

                <div className="mt-20 flex items-center justify-center gap-6">
                    <div className="px-8 py-3 bg-gray-50 border border-gray-100 rounded-full flex items-center gap-4">
                        <Cpu size={16} className="text-accent" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">Sovereign Memory Active</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
