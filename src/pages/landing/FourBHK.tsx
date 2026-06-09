import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../../lib/types';
import { api } from '../../services/api';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { SEO } from '../../components/seo/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Sparkles, ShieldCheck, TrendingUp, Target, Crown, Compass, ArrowUpRight, Landmark, Gem, Zap } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const FourBHK: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await api.projects.getAll();
                const filtered = data.filter(p =>
                    p.features.some(f => f.includes('4 BHK') || f.includes('4 Bed')) ||
                    p.title.includes('24K') ||
                    p.description.includes('4 BHK')
                );

                if (filtered.length > 0) {
                    setProjects(filtered);
                } else {
                    const { projectsRegistry: staticProjects } = await import('../../data/projects');
                    const staticFiltered = staticProjects.filter((p: Project) =>
                        p.features.some((f: string) => f.includes('4 BHK') || f.includes('4 Bed')) ||
                        p.title.includes('4 BHK') ||
                        p.description.includes('4 BHK')
                    );
                    setProjects(staticFiltered);
                }
            } catch (error) {
                console.error('Failed to load projects:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProjects();
    }, []);

    return (
        <div className="bg-white">
            <SEO
                title="Sovereign 4BHK Villas & Bungalows | Life Republic Hinjewadi"
                description="Explore ultra-luxury 4BHK Villas and Bungalows in Life Republic Hinjewadi. 24K Espada, Sound of Soul, and premium row houses designed for grand living."
                keywords="4bhk villa in hinjewadi, 4bhk bungalow in hinjewadi, luxury row houses pune, kolte patil life republic 24k espada"
                canonical="/4bhk-flats-hinjewadi"
            />

            {/* Sovereign Hero */}
            <section className="relative pt-48 pb-32 bg-secondary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-secondary z-10"></div>
                <div className="absolute inset-0 bg-[url('/images/aerial-sunset.png')] bg-cover bg-center opacity-30 grayscale blur-[1px]"></div>
                
                <div className="container mx-auto px-4 relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="inline-flex items-center gap-4 px-8 py-3 bg-accent/20 border border-accent/30 rounded-full mb-12 backdrop-blur-xl">
                            <Crown size={16} className="text-accent animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">The 24K Sovereign Monograph v5.5</span>
                        </div>
                        <h1 className="text-6xl md:text-[11rem] font-serif font-bold text-white mb-10 tracking-tighter leading-[0.8]">
                            The 4BHK <br /> <span className="text-accent italic">Authority.</span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-gray-400 font-medium max-w-4xl mx-auto leading-relaxed">
                            Bespoke villas and row houses engineered for those who demand absolute spatial sovereignty within Hinjewadi's premier managed ecosystem.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Spatial Matrix */}
            <section className="py-40 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                        <div className="lg:col-span-8">
                            <div className="mb-24">
                                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.6em] mb-6 block">Structural Synthesis</span>
                                <h2 className="text-5xl md:text-8xl font-serif font-bold text-secondary mb-10 tracking-tighter">Spatial <br /><span className="text-accent italic">Superiority.</span></h2>
                                <p className="text-2xl text-gray-500 font-medium leading-relaxed max-w-3xl">
                                    Owning a 4BHK at Life Republic is a statement of architectural and financial wisdom. Our villas (24K Espada, Sound of Soul) synthesize land ownership with the elite security of a managed township.
                                </p>
                            </div>

                            <AnimatePresence mode="wait">
                                {loading ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        {[1, 2].map(i => (
                                            <div key={i} className="bg-gray-50 rounded-[4rem] h-[600px] animate-pulse" />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        {projects.map((project, idx) => (
                                            <motion.div
                                                key={project.id}
                                                initial={{ opacity: 0, y: 50 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                            >
                                                <ProjectCard project={project} />
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="lg:col-span-4 sticky top-40">
                            <div className="bg-secondary rounded-[4rem] p-16 text-white relative overflow-hidden group shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)] border border-white/5">
                                <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none group-hover:scale-125 transition-transform duration-1000"></div>
                                <Gem size={64} className="text-accent mb-12 group-hover:rotate-12 transition-transform" />
                                <h3 className="text-4xl font-serif font-bold mb-12 tracking-tighter">Bespoke <br />Privileges.</h3>
                                <ul className="space-y-10">
                                    {[
                                        { icon: ShieldCheck, text: "Gated Land Sovereignty" },
                                        { icon: Target, text: "Direct Spine Road Access" },
                                        { icon: TrendingUp, text: "High Yield 24K Standards" },
                                        { icon: Landmark, text: "Managed Villa Protocols" }
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-6 group/item">
                                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-secondary transition-all shadow-inner border border-white/5">
                                                <item.icon size={28} />
                                            </div>
                                            <span className="text-[11px] font-bold text-white/70 uppercase tracking-[0.3em] group-hover/item:text-white transition-colors">{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-16">
                                    <button 
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge', { detail: { project: '4BHK Ultra-Luxury Tour' } }))}
                                        className="w-full bg-white text-secondary py-8 rounded-full font-bold text-xl hover:bg-accent transition-all flex items-center justify-center gap-4 group shadow-2xl"
                                    >
                                        Request Private Tour 
                                        <ArrowUpRight size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            {/* Financial Superiority Matrix */}
                            <div className="mt-16 p-12 bg-gray-50 rounded-[4rem] border border-gray-100 shadow-inner group">
                                <h4 className="text-[11px] font-bold text-secondary uppercase tracking-[0.5em] mb-10 flex items-center gap-3">
                                    <TrendingUp size={20} className="text-accent animate-pulse" /> Financial Scarcity Delta
                                </h4>
                                <div className="space-y-10">
                                    <div className="flex justify-between items-center group/stat">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em]">Villa Appreciation</span>
                                        <span className="text-2xl font-serif font-bold text-accent">+15% YoY</span>
                                    </div>
                                    <div className="flex justify-between items-center group/stat">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em]">Inventory Scarcity</span>
                                        <span className="text-2xl font-serif font-bold text-accent">Tier 1</span>
                                    </div>
                                    <div className="w-full h-px bg-gray-200 opacity-60"></div>
                                    <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                                        <Zap size={16} className="text-accent mt-1 shrink-0" />
                                        <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic">
                                            *4BHK clusters at Life Republic are limited to <span className="text-secondary font-bold">5% of total inventory</span>, ensuring extreme long-term value preservation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
