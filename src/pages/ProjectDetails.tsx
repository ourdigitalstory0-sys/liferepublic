import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MapPin, Sparkles, ShieldCheck, Download, ArrowRight, 
    CheckCircle2, HelpCircle, Layout, Layers, FileText, 
    ChevronLeft, Share2, Phone, Building2 
} from 'lucide-react';
import { api } from '../services/api';
import type { Project } from '../lib/types';
import { Button } from '../components/ui/Button';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SEO } from '../components/seo/SEO';
import { RecentlyViewed } from '../components/sections/RecentlyViewed';
import { SectorMesh } from '../components/sections/SectorMesh';

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'layouts' | 'amenities' | 'specifications' | 'faqs'>('overview');
    const [selectedFloorPlan, setSelectedFloorPlan] = useState<any>(null);

    useEffect(() => {
        const loadProject = async () => {
            if (!id) return;
            try {
                const projectData = await api.projects.getById(id);
                if (projectData) {
                    setProject(projectData);
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
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">Synthesizing Project Data</span>
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
                        <h1 className="text-4xl font-serif font-bold text-secondary">Project Not Found</h1>
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

    return (
        <div className="min-h-screen bg-white">
            <SEO 
                title={`${project.title} | Kolte Patil Life Republic Hinjewadi`}
                description={project.description}
                canonical={`/projects/${project.id}`}
            />
            <Breadcrumbs />

            {/* Sovereign Hero Header */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <motion.div 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-white" />
                </motion.div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-6 py-2 bg-accent text-secondary text-[10px] font-bold uppercase tracking-[0.5em] rounded-full mb-8 shadow-2xl"
                    >
                        {project.category} Cluster
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tighter drop-shadow-2xl"
                    >
                        {project.title.split('|')[0]}
                    </motion.h1>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-8 text-white/80"
                    >
                        <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                            <MapPin size={16} className="text-accent" /> {project.location}
                        </div>
                        <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                            <Sparkles size={16} className="text-accent" /> {project.price}
                        </div>
                        {project.rera && (
                            <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                                <ShieldCheck size={16} className="text-accent" /> RERA: {project.rera}
                            </div>
                        )}
                    </motion.div>
                </div>

                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-4">
                    <Button variant="primary" size="lg" className="px-12 py-5 rounded-full shadow-2xl font-bold uppercase tracking-widest text-[11px]" onClick={openEnquiry}>
                        Secure Possession <ArrowRight size={18} />
                    </Button>
                </div>
            </section>

            {/* Intelligent Tabs Navigation */}
            <section className="sticky top-[88px] z-50 bg-white/80 backdrop-blur-3xl border-y border-gray-100 shadow-xl overflow-x-auto">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center items-center h-20 gap-16 min-w-max">
                        {['overview', 'layouts', 'amenities', 'specifications', 'faqs'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative py-8 ${activeTab === tab ? 'text-accent' : 'text-gray-400 hover:text-secondary'}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 py-24 max-w-7xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                                <div className="space-y-10">
                                    <h2 className="text-4xl font-serif font-bold text-secondary tracking-tight">Tectonic Synthesis of Modern Living</h2>
                                    <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                        {project.overview || project.description}
                                    </p>
                                    <div className="grid grid-cols-2 gap-8">
                                        {project.features.map((f, i) => (
                                            <div key={i} className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-accent transition-all duration-500">
                                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-accent shadow-lg group-hover:scale-110 transition-transform"><CheckCircle2 size={24} /></div>
                                                <span className="text-sm font-bold text-secondary uppercase tracking-wider">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-12">
                                    <div className="p-10 bg-secondary rounded-[3rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
                                        <h3 className="text-3xl font-serif font-bold tracking-tight">Sovereign Investment Logic</h3>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                                <span className="text-white/60 font-bold uppercase tracking-widest text-[10px]">Possession Velocity</span>
                                                <span className="text-accent font-bold">{project.features.find(f => f.includes('Possession'))?.split(':')[1] || 'TBA'}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                                <span className="text-white/60 font-bold uppercase tracking-widest text-[10px]">Strategic Sector</span>
                                                <span className="text-white font-bold">{project.location}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-white/60 font-bold uppercase tracking-widest text-[10px]">Capital Appreciation</span>
                                                <span className="text-green-400 font-bold">+18.4% Est.</span>
                                            </div>
                                        </div>
                                        <Button variant="primary" size="lg" className="w-full rounded-2xl py-6 font-bold shadow-2xl" onClick={openEnquiry}>Download Investment Ledger</Button>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        {project.gallery?.slice(0, 3).map((img, i) => (
                                            <img 
                                                key={i} 
                                                src={typeof img === 'string' ? img : img.url} 
                                                className="w-full h-32 object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform" 
                                                alt={typeof img === 'string' ? `${project.title} Gallery ${i}` : img.alt || project.title}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'layouts' && (
                            <div className="space-y-24">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                                    <div className="space-y-8">
                                        <h2 className="text-4xl font-serif font-bold text-secondary">Master Spatial Layout</h2>
                                        <p className="text-gray-600 font-medium">Strategic cluster orientation within the 390-acre Life Republic ecosystem. Optimized for flow, privacy, and social synthesis.</p>
                                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-gray-100 group">
                                            {project.masterLayout ? (
                                                <img src={project.masterLayout} className="w-full h-auto" alt="Master Layout" />
                                            ) : (
                                                <div className="h-[400px] bg-gray-50 flex items-center justify-center flex-col gap-6">
                                                    <Layout size={64} className="text-gray-200" />
                                                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">Layout Synthesis in Progress</span>
                                                    <Button variant="outline" size="sm" onClick={openEnquiry}>Request Blueprint</Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-8">
                                        <h2 className="text-4xl font-serif font-bold text-secondary">Unit Blueprints</h2>
                                        <div className="space-y-6">
                                            {(project.floorPlans && project.floorPlans.length > 0) ? project.floorPlans.map((fp, i) => (
                                                <div key={i} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all flex items-center justify-between group">
                                                    <div className="space-y-2">
                                                        <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{fp.type}</span>
                                                        <h4 className="text-2xl font-serif font-bold text-secondary">{fp.size}</h4>
                                                    </div>
                                                    <Button variant="outline" size="sm" className="rounded-xl group-hover:bg-accent group-hover:text-secondary group-hover:border-accent transition-all" onClick={() => setSelectedFloorPlan(fp)}>Analyze Flow</Button>
                                                </div>
                                            )) : (
                                                <div className="space-y-6">
                                                    {[1, 2].map(i => (
                                                        <div key={i} className="p-10 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center gap-4 text-center">
                                                            <Layers size={32} className="text-gray-200" />
                                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Floor Plan Cluster {i} - Encrypted</p>
                                                            <Button variant="ghost" size="sm" onClick={openEnquiry}>Secure Access</Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'amenities' && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {(project.amenities || []).map((a, i) => (
                                    <div key={i} className="p-10 bg-gray-50 rounded-3xl border border-gray-100 text-center space-y-6 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                                        <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center text-accent shadow-lg group-hover:bg-accent group-hover:text-secondary transition-all"><Sparkles size={28} /></div>
                                        <span className="block text-[11px] font-bold text-secondary uppercase tracking-[0.2em]">{a}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'specifications' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                {project.specifications ? project.specifications.map((s, i) => (
                                    <div key={i} className="space-y-8 p-10 bg-white border border-gray-100 rounded-[3rem] shadow-xl">
                                        <h3 className="text-2xl font-serif font-bold text-accent border-b border-gray-100 pb-4 tracking-tight">{s.title}</h3>
                                        <ul className="space-y-4">
                                            {s.items.map((item, idx) => (
                                                <li key={idx} className="flex gap-4 items-start text-sm text-gray-600 leading-relaxed">
                                                    <div className="mt-1.5 w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )) : (
                                    <div className="col-span-3 py-24 text-center space-y-6">
                                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto"><FileText size={32} className="text-gray-200" /></div>
                                        <h4 className="text-xl font-serif font-bold text-gray-400">Technical Specifications Vaulted</h4>
                                        <Button variant="primary" size="lg" className="px-12 rounded-full font-bold uppercase tracking-widest text-[10px]" onClick={openEnquiry}>Request Technical Monograph</Button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'faqs' && (
                            <div className="max-w-4xl mx-auto space-y-8">
                                {project.faqs?.map((f, i) => (
                                    <div key={i} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
                                        <h4 className="text-lg font-serif font-bold text-secondary flex items-center gap-3"><HelpCircle size={20} className="text-accent" /> {f.question}</h4>
                                        <p className="text-gray-600 leading-relaxed font-medium pl-8">{f.answer}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Floor Plan Analysis Modal (Spatial Synthesis) */}
            <AnimatePresence>
                {selectedFloorPlan && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedFloorPlan(null)} className="absolute inset-0 bg-secondary/95 backdrop-blur-3xl" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} className="relative bg-white w-full max-w-6xl rounded-[4rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh]">
                            <div className="flex-1 bg-gray-50 p-12 flex items-center justify-center relative overflow-hidden">
                                <img src={selectedFloorPlan.image} className="max-w-full max-h-full object-contain drop-shadow-2xl" />
                                <button onClick={() => setSelectedFloorPlan(null)} className="absolute top-10 left-10 p-4 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-all"><ChevronLeft size={24} /></button>
                            </div>
                            <div className="w-full md:w-[400px] p-12 space-y-10 overflow-y-auto">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{selectedFloorPlan.type} Synthesis</span>
                                    <h3 className="text-4xl font-serif font-bold text-secondary">{selectedFloorPlan.size}</h3>
                                </div>
                                <div className="space-y-6">
                                    <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Blueprint Analysis</h5>
                                    <div className="space-y-4">
                                        {selectedFloorPlan.details?.map((d: string, i: number) => (
                                            <div key={i} className="flex items-center gap-4 text-sm font-bold text-secondary uppercase tracking-tight"><div className="w-1.5 h-1.5 bg-accent rounded-full" /> {d}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-10 border-t border-gray-100">
                                    <Button variant="primary" size="lg" className="w-full rounded-2xl py-6 font-bold shadow-2xl uppercase tracking-widest text-[11px]" onClick={openEnquiry}>Get Precision Quote</Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Sovereign Context Sections */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <RecentlyViewed />
            </section>
            
            <section className="py-24 bg-white">
                <SectorMesh />
            </section>
        </div>
    );
};

export default ProjectDetails;
