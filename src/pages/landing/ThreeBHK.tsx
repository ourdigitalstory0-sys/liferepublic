import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import type { Project } from '../../lib/types';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { SEO } from '../../components/seo/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { motion } from 'framer-motion';
import { Maximize, Layout, ShieldCheck, Zap, Sparkles, Target, ChevronRight, ArrowUpRight, Wind, Building2 } from 'lucide-react';

export const ThreeBHK: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await api.projects.getAll();
                const filtered = data.filter(p =>
                    p.features.some(f => f.includes('3 BHK')) ||
                    p.category.includes('3 BHK')
                );
                setProjects(filtered);
            } catch (error) {
                console.error('Failed to load projects', error);
            }
        };
        loadProjects();
    }, []);

    return (
        <div className="bg-white">
            <SEO
                title="Sovereign 3 BHK Flats in Hinjewadi | Space Synthesis 2026"
                description="Experience grandeur with Kolte Patil Life Republic's 3 BHK collection. Large carpet areas, 3-side open views, and strategic IT Park proximity in Pune's premium township."
                keywords="3bhk in hinjewadi, life republic 3bhk, kolte patil township hinjewadi, luxury flats pune west, 3 bhk price hinjewadi"
                canonical="/3-bhk-flats-in-hinjewadi"
            />

            {/* Sovereign Hero */}
            <section className="relative pt-48 pb-32 bg-secondary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-secondary z-10"></div>
                <div className="absolute inset-0 bg-[url('https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.8818362083715893.avif')] bg-cover bg-center opacity-30 grayscale blur-[1px]"></div>
                
                <div className="container mx-auto px-4 relative z-20">
                    <div className="max-w-5xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-4 px-6 py-3 bg-accent/20 border border-accent/30 rounded-full mb-12 backdrop-blur-xl"
                        >
                            <Sparkles size={16} className="text-accent animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">The Premium Collection v5.5</span>
                        </motion.div>
                        <h1 className="text-6xl md:text-[10rem] font-serif font-bold text-white mb-10 tracking-tighter leading-[0.8]">
                            Synthesizing <br /> <span className="text-accent italic">Grandeur.</span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-gray-400 max-w-4xl leading-relaxed font-medium">
                            The Life Republic 3 BHK collection is engineered for those who demand uncompromising spatial depth, tectonic integrity, and atmospheric luxury.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-32">
                {/* Spatial Monograph Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
                    {[
                        { title: 'Volumetric Depth', desc: '10.5ft+ floor-to-ceiling heights for enhanced air-flow and natural illumination.', icon: Maximize },
                        { title: 'Tectonic Design', desc: '3-side open corner apartments ensuring 270-degree views across elite clusters.', icon: Layout },
                        { title: 'Sovereign Security', desc: 'Integrated smart-lock systems and 24/7 township QRT response infrastructure.', icon: ShieldCheck }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-12 bg-gray-50 rounded-[3.5rem] border border-gray-100 hover:border-accent transition-all group shadow-sm hover:shadow-2xl hover:shadow-accent/5"
                        >
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-accent mb-10 shadow-md group-hover:scale-110 transition-transform">
                                <item.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-secondary mb-4 tracking-tight">{item.title}</h3>
                            <p className="text-lg text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Project Clusters */}
                <div className="mb-40">
                    <div className="flex items-end justify-between mb-24 border-b border-gray-100 pb-12">
                        <div className="max-w-2xl">
                            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] mb-4 block">Active Synthesis</span>
                            <h2 className="text-5xl md:text-7xl font-serif font-bold text-secondary tracking-tighter">The 3 BHK <span className="text-accent italic">Portfolio.</span></h2>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
                            <Building2 size={14} className="text-accent" /> {projects.length} Active Clusters
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>

                {/* Sovereign Comparison Matrix */}
                <section className="mb-40 bg-secondary rounded-[5rem] p-16 md:p-32 text-white relative overflow-hidden group shadow-[0_80px_160px_-40px_rgba(0,0,0,0.4)]">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[180px] pointer-events-none group-hover:scale-110 transition-all duration-1000"></div>
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                        <div className="lg:col-span-5 space-y-12">
                            <div className="space-y-6">
                                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.6em]">Spatial Intelligence</span>
                                <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter leading-tight">The Space <br /><span className="text-accent italic">Synthesis Delta.</span></h2>
                            </div>
                            <p className="text-2xl text-gray-400 leading-relaxed font-medium">
                                Standalone 3 BHK units in Hinjewadi often compromise on peripheral depth. Life Republic's township infrastructure adds 390-acres of "Extended Living Room" to your private residence.
                            </p>
                            <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 group-hover:bg-white/10 transition-all">
                                <div className="flex items-center gap-4 text-accent mb-3">
                                    <Target size={20} className="animate-pulse" />
                                    <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Growth Multiplier</span>
                                </div>
                                <p className="text-lg font-bold text-white uppercase tracking-[0.1em]">3 BHKs in integrated townships appreciate 18% faster than standalone towers.</p>
                            </div>
                        </div>
                        
                        <div className="lg:col-span-7 bg-white/5 backdrop-blur-3xl rounded-[4rem] p-12 md:p-20 border border-white/10 shadow-2xl">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="pb-10 text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Technical Feature</th>
                                        <th className="pb-10 text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Standalone Tower</th>
                                        <th className="pb-10 text-[11px] font-bold uppercase tracking-[0.4em] text-accent">Sovereign 3 BHK</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[
                                        { f: "Air Integrity", s: "Blocked by Adjacent Wings", l: "3-Side Open Ventilation" },
                                        { f: "Road Width", s: "30-40ft Local Road", l: "150ft Sovereign Spine Road" },
                                        { f: "Security Tier", s: "Gate Guard Only", l: "Integrated Township QRT" },
                                        { f: "Amenity Depth", s: "Rooftop/Basement", l: "390 Acres of Managed Parks" }
                                    ].map((row, i) => (
                                        <tr key={i} className="group/row hover:bg-white/5 transition-colors">
                                            <td className="py-8 font-serif font-bold text-white/80 text-2xl tracking-tighter">{row.f}</td>
                                            <td className="py-8 text-white/30 text-lg font-medium">{row.s}</td>
                                            <td className="py-8 text-accent font-bold italic text-xl flex items-center gap-3">
                                                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div> {row.l}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Final Call to Synthesis */}
                <section className="text-center">
                    <div className="max-w-5xl mx-auto p-20 bg-gray-50 rounded-[5rem] border border-gray-100 shadow-inner relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <Zap size={100} />
                        </div>
                        <Zap size={64} className="text-accent mx-auto mb-10 animate-pulse" />
                        <h2 className="text-4xl md:text-7xl font-serif font-bold text-secondary mb-10 tracking-tighter">Secure Your <br /> <span className="text-accent italic">Sovereign Space.</span></h2>
                        <p className="text-2xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto mb-16">
                            Join the elite collection of homeowners who demand tectonic permanence and global standards.
                        </p>
                        <div className="flex flex-col md:flex-row gap-8 justify-center">
                            <a href="/contact">
                                <button className="bg-secondary text-white px-20 py-10 rounded-full font-bold text-2xl hover:bg-accent hover:text-secondary transition-all shadow-2xl flex items-center justify-center gap-4 group">
                                    Initiate Site Synthesis 
                                    <ArrowUpRight size={32} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                </button>
                            </a>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.6em] mt-16 block">Secure Ledger Access Protocol v5.5</p>
                    </div>
                </section>
            </div>
        </div>
    );
};
