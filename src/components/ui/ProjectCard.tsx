import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MapPin, Download, Layout as LayoutIcon, 
    Layers, Sparkles, ShieldCheck, ChevronRight,
    ZoomIn, Info, CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import type { Project } from '../../lib/types';
import { BrochureModal } from './BrochureModal';
import { personalizationStore } from '../../lib/personalizationStore';
import { ID_TO_SLUG } from '../../data/slug-registry';

interface ProjectCardProps {
    project: Project;
    priority?: boolean;
}

type TabType = 'overview' | 'amenities' | 'layout' | 'plans' | 'specs';

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, priority = false }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const navigate = useNavigate();

    const themeColor = project.themeColor || '#C5A059';

    const handleProjectClick = () => {
        personalizationStore.trackProjectView(project.id);
        const slug = ID_TO_SLUG[project.id] || project.id;
        navigate(`/projects/${slug}`);
    };

    const openEnquiry = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.dispatchEvent(new CustomEvent('open-enquiry-modal', { 
            detail: { projectName: project.title } 
        }));
    };

    const tabs: { id: TabType; icon: any; label: string }[] = [
        { id: 'overview', icon: Info, label: 'Info' },
        { id: 'amenities', icon: Sparkles, label: 'Luxe' },
        { id: 'layout', icon: LayoutIcon, label: 'Map' },
        { id: 'plans', icon: Layers, label: 'Plans' },
        { id: 'specs', icon: ShieldCheck, label: 'Tech' },
    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 border border-gray-100 flex flex-col h-full relative"
            >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden cursor-pointer" onClick={handleProjectClick}>
                    <img loading="lazy"
                        src={project.image || 'https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.8122513965070959.avif'}
                        alt={`Kolte Patil Life Republic Township - ${project.title}`}
                        loading={priority ? "eager" : "lazy"}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 z-20">
                        <span
                            className="text-white px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full shadow-2xl backdrop-blur-md border border-white/20"
                            style={{ backgroundColor: `${themeColor}E6` }}
                        >
                            {project.category}
                        </span>
                    </div>
                    <div className="absolute bottom-6 right-6 z-20 flex flex-col items-end gap-2">
                        <span
                            className="text-white px-5 py-2 text-sm font-bold rounded-2xl shadow-2xl backdrop-blur-md"
                            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                        >
                            {project.price}
                        </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                </div>

                <div className="p-8 flex flex-col flex-grow relative">
                    <div className="mb-6">
                        <h3
                            className="text-2xl font-serif font-bold text-secondary mb-2 line-clamp-1 hover:text-accent transition-colors cursor-pointer"
                            onClick={handleProjectClick}
                        >
                            {project.title.split('|')[0]}
                        </h3>
                        <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                            <MapPin size={12} className="mr-1.5 text-accent" />
                            {project.location}
                        </div>
                    </div>

                    {/* Sovereign Tab System */}
                    <div className="flex items-center justify-between p-1 bg-gray-50 rounded-2xl mb-8 border border-gray-100">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex flex-col items-center justify-center py-2.5 rounded-xl transition-all relative flex-1 ${
                                    activeTab === tab.id ? 'bg-white shadow-lg text-accent' : 'text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                <tab.icon size={16} className={activeTab === tab.id ? 'animate-pulse' : ''} />
                                <span className="text-[8px] font-bold uppercase tracking-tighter mt-1">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex-grow mb-8 relative min-h-[160px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0"
                            >
                                {activeTab === 'overview' && (
                                    <div className="space-y-5">
                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 font-medium italic">
                                            {project.overview || project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.features.slice(0, 3).map((feature, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-accent/5 text-accent text-[9px] rounded-lg border border-accent/10 font-bold uppercase tracking-wider"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'amenities' && (
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                                        {(project.amenities || []).slice(0, 6).map((amenity, index) => (
                                            <div key={index} className="flex items-center gap-2 group/item">
                                                <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-white transition-all">
                                                    <Sparkles size={10} />
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight truncate">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'layout' && (
                                    <div className="h-full flex flex-col gap-4">
                                        {project.masterLayout ? (
                                            <div className="relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group/img cursor-pointer flex-grow h-32" onClick={handleProjectClick}>
                                                <img loading="lazy" src={project.masterLayout} className="w-full h-full object-cover opacity-80 group-hover/img:scale-105 transition-transform" />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                    <ZoomIn size={24} className="text-white" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex-grow h-32 rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-3 p-4">
                                                <LayoutIcon size={24} className="text-gray-200" />
                                                <Button variant="ghost" size="sm" className="text-[8px] font-bold" onClick={openEnquiry}>Request Map</Button>
                                            </div>
                                        )}
                                        <span className="text-[10px] text-gray-400 font-bold uppercase text-center tracking-widest">Master Spatial Hub</span>
                                    </div>
                                )}

                                {activeTab === 'plans' && (
                                    <div className="h-full flex flex-col gap-4">
                                        {project.floorPlans && project.floorPlans.length > 0 ? (
                                            <div className="flex-grow h-32 overflow-hidden flex gap-2">
                                                {project.floorPlans.slice(0, 2).map((fp, i) => (
                                                    <div key={i} className="flex-1 rounded-2xl bg-gray-50 border border-gray-100 p-2 flex flex-col items-center justify-center relative group/fp cursor-pointer" onClick={handleProjectClick}>
                                                        <img loading="lazy" src={fp.image} className="w-full h-12 object-contain mb-2" />
                                                        <span className="text-[8px] font-bold text-secondary uppercase tracking-tighter">{fp.type}</span>
                                                        <div className="absolute inset-0 bg-accent/80 opacity-0 group-hover/fp:opacity-100 flex items-center justify-center transition-opacity rounded-2xl text-white">
                                                            <Layers size={16} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex-grow h-32 rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-3 p-4">
                                                <Layers size={24} className="text-gray-200" />
                                                <Button variant="ghost" size="sm" className="text-[8px] font-bold" onClick={openEnquiry}>Request Plans</Button>
                                            </div>
                                        )}
                                        <span className="text-[10px] text-gray-400 font-bold uppercase text-center tracking-widest">Precision Blueprints</span>
                                    </div>
                                )}

                                {activeTab === 'specs' && (
                                    <div className="space-y-4">
                                        {project.specifications ? (
                                            <div className="grid grid-cols-1 gap-2">
                                                {project.specifications.slice(0, 3).map((spec, i) => (
                                                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                                        <span className="text-[10px] font-bold text-secondary uppercase">{spec.title}</span>
                                                        <CheckCircle2 size={12} className="text-accent" />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="h-32 rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-3 p-4">
                                                <ShieldCheck size={24} className="text-gray-200" />
                                                <Button variant="ghost" size="sm" className="text-[8px] font-bold" onClick={openEnquiry}>Request Technicals</Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-auto">
                        <Button
                            variant="primary"
                            size="lg"
                            className="w-full justify-center rounded-2xl py-6 font-bold shadow-2xl uppercase tracking-widest text-[10px]"
                            onClick={handleProjectClick}
                        >
                            Details <ChevronRight size={14} className="ml-1" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full justify-center rounded-2xl py-6 font-bold uppercase tracking-widest text-[10px] border-accent/20 text-accent hover:bg-accent hover:text-white shadow-xl transition-all"
                            onClick={openEnquiry}
                        >
                            Enquire Now
                        </Button>
                    </div>
                </div>
            </motion.div>

            <BrochureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                projectName={project.title}
            />
        </>
    );
};
