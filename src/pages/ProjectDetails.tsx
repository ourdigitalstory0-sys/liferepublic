import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MapPin, Sparkles, ShieldCheck, Download, ArrowRight, 
    CheckCircle2, HelpCircle, Layout, Layers, FileText, 
    ChevronLeft, Share2, Phone, Building2, ZoomIn, Navigation, X
} from 'lucide-react';
import { api } from '../services/api';
import type { Project } from '../lib/types';
import { Button } from '../components/ui/Button';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SEO } from '../components/seo/SEO';
import { RecentlyViewed } from '../components/sections/RecentlyViewed';
import { SectorMesh } from '../components/sections/SectorMesh';
import { ID_TO_SLUG } from '../data/slug-registry';
import { projectsRegistry } from '../data/projects';

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(() => {
        if (!id) return null;
        const rawId = id.trim().replace(/\/$/, '');
        const p = projectsRegistry.find((p: Project) => p.id === rawId) || 
                  projectsRegistry.find((p: Project) => ID_TO_SLUG[p.id] === rawId);
        return p || null;
    });
    const [loading, setLoading] = useState(!project);
    const [activeTab, setActiveTab] = useState<'overview' | 'layouts' | 'amenities' | 'specifications' | 'faqs'>('overview');
    const [selectedFloorPlan, setSelectedFloorPlan] = useState<any>(null);
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        const loadProject = async () => {
            if (!id) return;
            try {
                const projectData = await api.projects.getById(id);
                if (projectData) {
                    setProject(projectData);
                    // Default to first floor plan if available
                    if (projectData.floorPlans && projectData.floorPlans.length > 0) {
                        setSelectedFloorPlan(projectData.floorPlans[0]);
                    }
                }
            } catch (error) {
                console.error('Failed to load project:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProject();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">Synthesizing Project Monograph</span>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
                <div className="text-center space-y-8 max-w-md">
                    <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center mx-auto text-accent">
                        <FileText size={48} />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-serif font-bold text-secondary">Monograph Not Found</h1>
                        <p className="text-gray-500 leading-relaxed font-medium">The requested project cluster could not be identified within the Sovereign Registry.</p>
                    </div>
                    <Button variant="primary" size="lg" className="w-full rounded-2xl py-6 font-bold" onClick={() => navigate('/projects')}>Return to Registry</Button>
                </div>
            </div>
        );
    }

    const openEnquiry = () => {
        window.dispatchEvent(new CustomEvent('open-enquiry-modal', { 
            detail: { projectName: project.title } 
        }));
    };

    const projectSlug = ID_TO_SLUG[project.id] || project.id;

    return (
        <div className="min-h-screen bg-white">
            <SEO 
                title={`${project.title} | Kolte Patil Life Republic Hinjewadi`}
                description={project.description}
                canonical={`/projects/${projectSlug}`}
            />
            <Breadcrumbs />

            {/* Sovereign Hero Header */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
                    <img loading="lazy" src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-white" />
                </motion.div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-6 py-2 bg-accent text-secondary text-[10px] font-bold uppercase tracking-[0.5em] rounded-full mb-8 shadow-2xl">
                        {project.category} Monograph
                    </motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tighter drop-shadow-2xl">
                        {project.title.split('|')[0]}
                    </motion.h1>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap justify-center gap-8 text-white/80">
                        <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                            <MapPin size={16} className="text-accent" /> {project.location}
                        </div>
                        <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                            <Sparkles size={16} className="text-accent" /> {project.price}
                        </div>
                        <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                            <ShieldCheck size={16} className="text-accent" /> Sovereign Verified
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12 flex justify-center gap-6">
                        <Button variant="primary" size="lg" className="rounded-full px-12 py-6 font-bold text-sm tracking-[0.3em] uppercase shadow-2xl" onClick={openEnquiry}>
                            Enquire Now <ArrowRight size={20} className="ml-2" />
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full px-12 py-6 font-bold text-sm tracking-[0.3em] uppercase border-white/20 text-white hover:bg-white hover:text-secondary shadow-2xl" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                            Explore Monograph
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Architectural Monograph Content */}
            <section className="py-24 container mx-auto px-6 max-w-7xl">
                <div className="space-y-32">
                    
                    {/* Section 1: Tectonic Overview */}
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2 space-y-12">
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-3 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
                                <Sparkles size={14} className="text-accent" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Strategic Synthesis</span>
                            </motion.div>
                            <h2 className="text-5xl md:text-7xl font-serif font-bold text-secondary tracking-tighter leading-none">The <br /><span className="text-accent italic">Architecture.</span></h2>
                            <p className="text-xl text-gray-600 leading-relaxed font-medium">{project.overview}</p>
                            <div className="grid grid-cols-2 gap-6">
                                {project.features.map((f, i) => (
                                    <div key={i} className="flex items-center gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                                        <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-150 transition-transform" />
                                        <span className="text-[11px] font-bold text-secondary uppercase tracking-widest">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl relative group">
                                <img loading="lazy" src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                                <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end">
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em]">Volume Value</span>
                                        <p className="text-4xl font-serif font-bold text-white tracking-tighter">{project.price}</p>
                                    </div>
                                    <Button variant="primary" size="lg" className="rounded-2xl px-10 py-5 font-bold uppercase tracking-widest text-xs" onClick={openEnquiry}>Enquire Now</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Spatial Synthesis (Floor Plans) */}
                    <div className="space-y-16">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-100 pb-16">
                            <div className="max-w-2xl">
                                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] block mb-4">Precision Blueprints</span>
                                <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary tracking-tighter">Spatial <br /><span className="text-accent italic">Synthesis.</span></h2>
                            </div>
                            <p className="text-gray-500 font-medium max-w-sm italic">"Designing the void between the walls to maximize community flow and individual tranquility."</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {project.floorPlans?.map((plan, i) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ y: -10 }}
                                    className={`p-8 rounded-[3rem] border transition-all duration-500 cursor-pointer ${selectedFloorPlan === plan ? 'bg-secondary border-secondary shadow-2xl scale-105' : 'bg-white border-gray-100 hover:shadow-xl'}`}
                                    onClick={() => setSelectedFloorPlan(plan)}
                                >
                                    <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 p-6 mb-8 group">
                                        <img loading="lazy" src={plan.image} alt={plan.type} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className={`text-xl font-serif font-bold ${selectedFloorPlan === plan ? 'text-white' : 'text-secondary'}`}>{plan.type}</h3>
                                            <Layers size={18} className="text-accent" />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Carpet Area</span>
                                            <span className={`text-lg font-mono font-bold ${selectedFloorPlan === plan ? 'text-white/60' : 'text-secondary/40'}`}>{plan.size}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {selectedFloorPlan && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-gray-50 rounded-[4rem] p-12 md:p-20 border border-gray-200">
                                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                                        <div className="lg:w-1/2 p-10 bg-white rounded-[3rem] shadow-2xl border border-gray-100 group relative">
                                            <img loading="lazy" src={selectedFloorPlan.image} className="w-full h-auto mix-blend-multiply cursor-zoom-in" alt="Detailed Floor Plan" onClick={() => setIsZoomed(true)} />
                                            <div className="absolute top-10 right-10 p-3 bg-accent text-secondary rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"><ZoomIn size={20} /></div>
                                        </div>
                                        <div className="lg:w-1/2 space-y-12">
                                            <div>
                                                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] block mb-4">Unit Analysis</span>
                                                <h3 className="text-4xl md:text-6xl font-serif font-bold text-secondary tracking-tighter mb-6">{selectedFloorPlan.type}</h3>
                                                <div className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100">
                                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Validated Carpet Area</span>
                                                    <span className="text-2xl font-mono font-bold text-secondary">{selectedFloorPlan.size}</span>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-4">
                                                {selectedFloorPlan.details?.map((d: string, idx: number) => (
                                                    <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                                                        <CheckCircle2 size={16} className="text-accent" />
                                                        <span className="text-[11px] font-bold text-secondary uppercase tracking-widest">{d}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <Button variant="primary" size="lg" className="w-full rounded-2xl py-8 font-bold text-xs uppercase tracking-[0.5em] shadow-2xl" onClick={openEnquiry}>Enquire Now</Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Section 3: Tectonic Specifications */}
                    <div className="space-y-16">
                        <div className="text-center max-w-3xl mx-auto">
                            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] block mb-4">Material Monograph</span>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary tracking-tighter">Tectonic <br /><span className="text-accent italic">Specifications.</span></h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {project.specifications?.map((spec, i) => (
                                <div key={i} className="group p-10 bg-white rounded-[3.5rem] border border-gray-100 hover:border-accent/20 hover:shadow-2xl transition-all duration-500">
                                    <div className="flex items-center gap-6 mb-10">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                            <ShieldCheck size={28} />
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-secondary tracking-tight">{spec.title}</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {spec.items.map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50/50 rounded-2xl group-hover:bg-white transition-all">
                                                <div className="mt-1.5 w-1.5 h-1.5 bg-accent/40 rounded-full" />
                                                <span className="text-[11px] font-bold text-secondary/70 uppercase tracking-widest leading-relaxed">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 4: Master Spatial Hub */}
                    <div className="space-y-16 bg-secondary rounded-[5rem] p-16 md:p-32 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
                        <div className="relative z-10 flex flex-col lg:flex-row gap-20 items-center">
                            <div className="lg:w-1/2 space-y-10">
                                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em]">Township Mesh</span>
                                <h2 className="text-4xl md:text-7xl font-serif font-bold text-white tracking-tighter leading-[0.85]">The <br /><span className="text-accent italic">Master Layout.</span></h2>
                                <p className="text-xl text-white/40 font-medium leading-relaxed">A strategic blueprint of the 390-acre Life Republic ecosystem. Every cluster is a node in our vision for the future of community living.</p>
                                <div className="flex flex-wrap gap-4 pt-8">
                                    <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3"><MapPin size={14} className="text-accent" /> Prime Hinjewadi Ph 2</div>
                                    <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3"><Navigation size={14} className="text-accent" /> Near Town Center</div>
                                </div>
                            </div>
                            <div className="lg:w-1/2">
                                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 group cursor-zoom-in">
                                    <img loading="lazy" src={project.masterLayout} className="w-full h-auto opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" alt="Sovereign Master Plan" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="p-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20"><ZoomIn size={48} className="text-white" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Community Synthesis */}
                    <div className="space-y-16">
                        <div className="flex justify-between items-end">
                            <div>
                                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] block mb-4">Lifestyle Fabric</span>
                                <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary tracking-tighter">Cluster <br /><span className="text-accent italic">Amenities.</span></h2>
                            </div>
                            <Button variant="outline" size="lg" className="rounded-2xl px-10 py-5 font-bold uppercase tracking-widest text-[10px]" onClick={openEnquiry}>Full Amenities List</Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {project.amenities?.map((a, i) => (
                                <div key={i} className="p-10 bg-gray-50 rounded-[3rem] border border-gray-100 text-center space-y-6 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                                    <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center text-accent shadow-lg group-hover:bg-accent group-hover:text-secondary transition-all"><Sparkles size={28} /></div>
                                    <span className="block text-[11px] font-bold text-secondary uppercase tracking-[0.2em]">{a}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <RecentlyViewed />
            </section>
            
            <section className="py-24 bg-white">
                <SectorMesh />
            </section>

            {/* Lightbox for zooming floor plans */}
            <AnimatePresence>
                {isZoomed && selectedFloorPlan && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-secondary/95 backdrop-blur-3xl flex items-center justify-center p-10">
                        <button onClick={() => setIsZoomed(false)} className="absolute top-10 right-10 p-4 bg-white/10 text-white rounded-full hover:bg-white hover:text-secondary transition-all"><X size={32} /></button>
                        <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} src={selectedFloorPlan.image} className="max-w-full max-h-full object-contain mix-blend-screen" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectDetails;
