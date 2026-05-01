import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { ArrowRight, Navigation, CheckCircle2, Map, Zap, Target, BarChart3, Compass, ShieldCheck, Cpu, Network, ArrowUpRight, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '../components/ui/ProjectCard';
import { SEO } from '../components/seo/SEO';
import { generateLocationKeywords } from '../lib/seo-utils';
import { api } from '../services/api';
import type { Project } from '../lib/types';

interface LocationLandingProps {
    locationName: string;
    distance?: string;
    commuteTime?: string;
    slug: string;
}

export const LocationLanding: React.FC<LocationLandingProps> = ({ locationName, distance = '10-15 mins', commuteTime = '15 mins', slug }) => {
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await api.projects.getFeatured(4);
                if (data && data.length > 0) {
                    setFeaturedProjects(data);
                }
            } catch (error) {
                console.error('Failed to load projects for location landing:', error);
            }
        };
        loadProjects();
    }, []);

    // SEO Synthesis v6.5
    const title = `Premium Residential Flats in ${locationName} | Life Republic 2026 Hub`;
    const description = `Seeking premium 2 & 3 BHK flats in ${locationName}? Explore Kolte Patil Life Republic. Just ${commuteTime} drive via the 150ft Spine Road. Superior ROI delta and 2026 Metro connectivity.`;
    const keywords = `${generateLocationKeywords(locationName)}, flats near Hinjewadi Phase 3, life republic vs ${locationName}, Hinjewadi Phase 3 growth 2026`;

    return (
        <div className="bg-white selection:bg-accent selection:text-secondary">
            <SEO
                title={title}
                description={description}
                keywords={keywords}
                canonical={`/location/${slug}`}
            />

            {/* Sovereign Location Hero v6.5 */}
            <section className="relative h-[80vh] flex items-center bg-secondary text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/60 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-[url('https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.8122513965070959.avif')] bg-cover bg-center opacity-30 grayscale blur-[2px] scale-110"></div>
                <div className="absolute top-0 right-0 w-[1000px] h-full bg-accent/5 rounded-full blur-[200px] pointer-events-none -mr-96"></div>
                
                <div className="container mx-auto px-4 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="max-w-6xl"
                    >
                        <div className="inline-flex items-center gap-6 px-10 py-4 bg-accent/10 border border-accent/20 rounded-full mb-16 backdrop-blur-3xl shadow-2xl">
                            <Target size={24} className="text-accent animate-pulse" />
                            <span className="text-[12px] font-bold uppercase tracking-[0.7em] text-accent">Strategic Epicenter Sync 2026</span>
                        </div>
                        <h1 className="text-7xl md:text-[14rem] font-serif font-bold mb-16 leading-[0.75] tracking-tighter">
                            Beyond <br /> <span className="text-accent italic">{locationName}.</span>
                        </h1>
                        <p className="text-3xl md:text-4xl text-gray-400 max-w-4xl mb-20 leading-relaxed font-medium italic">
                            Standalone constraints belong to the past. Life Republic offers a 400-acre sovereign ecosystem just {distance} from {locationName}. Experience the **Spine Road Advantage**.
                        </p>
                        <div className="flex flex-wrap gap-10">
                            <button 
                                onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge'))}
                                className="bg-white text-secondary px-20 py-10 rounded-full font-bold text-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] hover:bg-accent hover:text-secondary transition-all flex items-center gap-6 group hover:scale-[1.05]"
                            >
                                Secure Site Synthesis <ArrowUpRight size={32} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                            </button>
                            <a href="#matrix" className="bg-transparent border-2 border-white/20 text-white hover:bg-white/5 rounded-full px-20 py-10 font-bold text-2xl flex items-center gap-6 transition-all group">
                                View Transit Matrix <BarChart3 size={32} className="group-hover:rotate-12 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                </div>
                
                <div className="absolute bottom-20 left-20 hidden lg:flex items-center gap-12 text-white/30">
                    <div className="flex items-center gap-4"><Network size={20} className="text-accent" /><span className="text-[11px] font-bold uppercase tracking-[0.5em]">2026 Metro Sync Active</span></div>
                    <div className="flex items-center gap-4"><Globe size={20} /><span className="text-[11px] font-bold uppercase tracking-[0.5em]">Hinjewadi ph 3 Hub</span></div>
                </div>
            </section>

            {/* Commute Delta Matrix v6.5 */}
            <section id="matrix" className="py-64 bg-gray-50/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-40 opacity-5 pointer-events-none">
                    <Compass size={400} className="text-secondary animate-spin-slow" />
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
                        <div className="lg:col-span-5 space-y-16">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-4 text-accent font-bold mb-4">
                                    <Cpu size={24} />
                                    <span className="text-[12px] uppercase tracking-[0.6em]">The Transit Synthesis</span>
                                </div>
                                <h2 className="text-6xl md:text-[8rem] font-serif font-bold text-secondary tracking-tighter leading-[0.85]">The Superior <br /><span className="text-accent italic">Commute Delta.</span></h2>
                            </div>
                            <p className="text-2xl md:text-3xl text-gray-500 leading-relaxed font-medium italic">
                                standalone properties in {locationName} often lack dedicated infrastructure. Life Republic residents enjoy the 150ft Spine Road advantage, bypassing all local bottlenecks.
                            </p>
                            <div className="grid grid-cols-1 gap-8">
                                {[
                                    { icon: Map, title: "150ft Spine Road", desc: "Private high-velocity artery to Hinjewadi Phase 1 & 2." },
                                    { icon: Zap, title: "2026 Metro Sync", desc: "Immediate proximity to the upcoming Phase 3 station hub." },
                                    { icon: ShieldCheck, title: "Managed Infrastructure", desc: "Zero-latency private water and power grids for the 400-acre republic." }
                                ].map((item, i) => (
                                    <motion.div 
                                        key={i} 
                                        whileHover={{ x: 20 }}
                                        className="flex gap-8 p-10 bg-white rounded-[3.5rem] border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] group hover:border-accent transition-all"
                                    >
                                        <div className="w-20 h-20 bg-accent/10 text-accent rounded-[2rem] flex items-center justify-center group-hover:bg-accent group-hover:text-secondary transition-all shadow-inner">
                                            <item.icon size={36} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-secondary text-2xl tracking-tight mb-2 italic">{item.title}</h4>
                                            <p className="text-base text-gray-400 font-medium leading-relaxed italic">"{item.desc}"</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="lg:col-span-7 bg-white rounded-[5rem] p-16 md:p-24 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full -mr-40 -mt-40 blur-[100px] group-hover:scale-150 transition-transform duration-[3s]"></div>
                            <div className="flex items-center justify-between mb-24">
                                <h3 className="text-5xl font-serif font-bold text-secondary tracking-tighter italic">Sovereign Proximity Analysis</h3>
                                <div className="flex items-center gap-4 text-[11px] font-bold text-accent uppercase tracking-[0.5em] bg-accent/10 px-8 py-4 rounded-full border border-accent/20">
                                    <Navigation size={16} className="animate-pulse" /> Live Sync Active
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="pb-12 text-[12px] font-bold uppercase tracking-[0.6em] text-gray-300">Destination Hub</th>
                                            <th className="pb-12 text-[12px] font-bold uppercase tracking-[0.6em] text-gray-300">Standalone {locationName}</th>
                                            <th className="pb-12 text-[12px] font-bold uppercase tracking-[0.6em] text-accent">Sovereign Sync</th>
                                            <th className="pb-12 text-[12px] font-bold uppercase tracking-[0.6em] text-gray-300">ROI Delta</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {[
                                            { dest: "Hinjewadi Ph 1", fromLoc: "25 mins", fromLR: "10 mins", delta: "60% Velocity" },
                                            { dest: "Metro Ph 3 Station", fromLoc: "15 mins", fromLR: "3 mins", delta: "High-Priority" },
                                            { dest: "Anisha Global School", fromLoc: "20 mins", fromLR: "1 min", delta: "Integrated" },
                                            { dest: "Embassy Tech Zone", fromLoc: "30 mins", fromLR: "12 mins", delta: "Zero Bottleneck" }
                                        ].map((row, i) => (
                                            <tr key={i} className="group/row hover:bg-gray-50/80 transition-all">
                                                <td className="py-12 font-serif font-bold text-secondary text-4xl tracking-tighter italic">{row.dest}</td>
                                                <td className="py-12 text-gray-300 font-bold text-xl">{row.fromLoc}</td>
                                                <td className="py-12 text-secondary font-bold text-2xl flex items-center gap-4">
                                                    <div className="w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_15px_var(--accent)]"></div> {row.fromLR}
                                                </td>
                                                <td className="py-12 text-accent font-bold italic text-xl tracking-tight">{row.delta}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Clusters Grid v6.5 */}
            <section id="projects" className="py-64 bg-white relative">
                <div className="container mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}>
                        <span className="text-[11px] font-bold text-accent uppercase tracking-[0.8em] mb-6 block">Personalized Synthesis</span>
                        <h2 className="text-7xl md:text-[12rem] font-serif font-bold text-secondary mb-32 tracking-tighter leading-none italic">The Sovereign <span className="text-accent">Clusters.</span></h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Hyper-Local SEO Content v6.5 */}
            <section className="py-64 bg-secondary text-white/40 text-2xl leading-[1.6] border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.8818362083715893.avif')] bg-cover bg-center opacity-5 grayscale pointer-events-none"></div>
                <div className="container mx-auto px-4 max-w-6xl text-center relative z-10 space-y-16">
                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tighter italic">Property Market Synthesis: {locationName} vs Hinjewadi 2026</h3>
                    <p className="font-medium italic">
                        Discerning homebuyers seeking <strong>2 BHK flats in {locationName}</strong> or <strong>luxury 3 BHK apartments in {locationName}</strong> are increasingly gravitating towards the Hinjewadi Phase 3 structural hub. While {locationName} serves as a gateway corridor, the Life Republic township provides the **Architectural Permanence** and "Quiet Luxury" that standalone projects cannot synthesize.
                    </p>
                    <p className="font-medium italic">
                        With the 2026 Metro expansion centered around the Phase 3 epicenter, investing near Life Republic offers a superior appreciation delta compared to the saturated localities of {locationName}. Experience the difference of a 400-acre managed ecosystem anchored by the **150ft Spine Road Backbone**.
                    </p>
                    <div className="pt-24 flex justify-center gap-8 items-center">
                        <div className="w-3 h-3 bg-accent rounded-full shadow-[0_0_15px_var(--accent)]"></div>
                        <div className="w-3 h-3 bg-accent/40 rounded-full"></div>
                        <div className="w-3 h-3 bg-accent/20 rounded-full"></div>
                        <div className="text-[11px] font-bold text-white/20 uppercase tracking-[0.8em] ml-4">Registry Authenticated 2026</div>
                    </div>
                </div>
            </section>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 15s linear infinite;
                }
            `}} />
        </div>
    );
};
