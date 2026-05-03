import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { TrendingUp, Clock, Shield, ArrowRight, Zap, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/ui/ProjectCard';
import { api } from '../services/api';
import type { Project } from '../lib/types';

import { pseoRegistry } from '../data/pseo-registry';

export const HyperLocalLanding: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [projects, setProjects] = React.useState<Project[]>([]);
    
    const config = useMemo(() => {
        return slug ? pseoRegistry[slug] : null;
    }, [slug]);

    React.useEffect(() => {
        const loadProjects = async () => {
            const allProjects = await api.projects.getAll();
            setProjects(allProjects.slice(0, 3)); // Show top 3 for context
        };
        loadProjects();
    }, []);

    if (!config) return <div className="pt-40 text-center">Loading Authority Data...</div>;

    return (
        <div className="pt-32 pb-20 bg-white">
            <SEO 
                title={config.title}
                description={config.description}
                keywords={config.keywords}
                canonical={`/location/${slug}`}
            />

            <div className="container mx-auto px-4">
                {/* Authority Header */}
                <div className="flex flex-col lg:flex-row gap-16 items-start mb-32">
                    <div className="lg:w-2/3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-8"
                        >
                            <Target size={14} /> Market Intelligence Report 2026
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-secondary mb-10 leading-[1.1]">
                            {config.title.split('|')[0]}
                        </h1>
                        <p className="text-gray-500 text-xl font-light leading-relaxed max-w-2xl mb-12">
                            A deep-dive analysis of real estate dynamics, infrastructure velocity, and investment potential for <strong>{slug?.replace(/-/g, ' ')}</strong>.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="primary" className="rounded-full px-8 h-14" onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}>Enquire Now for Price List</Button>
                            <Button variant="outline" className="rounded-full px-8 h-14" onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}>Download Area Report</Button>
                        </div>
                    </div>

                    <div className="lg:w-1/3 grid grid-cols-1 gap-6">
                        <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Infra Score</span>
                                <Zap size={16} className="text-accent" />
                            </div>
                            <div className="text-4xl font-serif font-bold text-secondary">{config.infraScore}/100</div>
                            <div className="w-full h-1 bg-gray-200 mt-4 rounded-full overflow-hidden">
                                <div className="h-full bg-accent" style={{ width: `${config.infraScore}%` }}></div>
                            </div>
                        </div>
                        <div className="bg-secondary p-8 rounded-[2rem] text-white">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Rental Yield</span>
                                <TrendingUp size={16} className="text-accent" />
                            </div>
                            <div className="text-4xl font-serif font-bold">{config.rentalYield}</div>
                            <p className="text-white/40 text-[10px] mt-4 uppercase tracking-widest">Projected for Hinjewadi West</p>
                        </div>
                    </div>
                </div>

                {/* Intelligence Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
                    <div className="space-y-6">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-accent">
                            <Clock size={20} />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-secondary">Velocity Matrix</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500 text-sm">Hinjewadi Phase 1</span>
                                <span className="font-bold text-secondary">{config.commutePhase1}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500 text-sm">Mumbai-Pune Expy</span>
                                <span className="font-bold text-secondary">12 mins</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-accent">
                            <Shield size={20} />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-secondary">Sovereign Safety</h3>
                        <ul className="space-y-3">
                            {config.highlights.map((h, i) => (
                                <li key={i} className="flex gap-2 text-sm text-gray-500">
                                    <span className="text-accent">•</span> {h}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gray-900 rounded-[2rem] p-10 text-white flex flex-col justify-between">
                        <div>
                            <h4 className="text-xl font-bold mb-4">Market View</h4>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Demand for premium housing near {slug?.split('-')[0]} has spiked by 18% in the last quarter due to the Hinjewadi-Shivajinagar Metro progress.
                            </p>
                        </div>
                        <Link to="/township-intelligence" className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest group">
                            Explore Stats <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Relevant Projects Section */}
                <div className="mb-32">
                    <div className="flex items-end justify-between mb-16">
                        <h2 className="text-4xl font-serif font-bold text-secondary">Matching Inventory</h2>
                        <Link to="/projects" className="text-accent font-bold border-b border-accent/20 pb-1">View All Sectors</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((p) => (
                            <ProjectCard key={p.id} project={p} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HyperLocalLanding;
