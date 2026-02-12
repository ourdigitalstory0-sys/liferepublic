import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Download } from 'lucide-react';
import { Button } from './Button';
import type { Project } from '../../lib/types';
import { BrochureModal } from './BrochureModal';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
    project: Project;
    priority?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, priority = false }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'plans'>('overview');
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const navigate = useNavigate();

    // Default accent color if themeColor is not provided
    const themeColor = project.themeColor || '#C5A059';

    console.log('ProjectCard:', project.title, { masterLayout: project.masterLayout, floorPlans: project.floorPlans });

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative"
                style={{
                    borderColor: 'transparent',
                } as React.CSSProperties}
            >
                {/* Hover Border Effect */}
                <div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-current transition-colors duration-500 pointer-events-none z-10"
                    style={{ color: themeColor }}
                />

                {/* Image Section */}
                <div className="relative h-72 overflow-hidden">
                    <img
                        src={project.image}
                        alt={`Kolte Patil Life Republic Township - ${project.title} - ${project.category}`}
                        loading={priority ? "eager" : "lazy"}
                        // @ts-ignore - fetchPriority is valid but React types might not know it yet
                        fetchpriority={priority ? "high" : "auto"}
                        width="400"
                        height="300"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 z-20">
                        <span
                            className="text-white px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full shadow-lg backdrop-blur-md border border-white/20"
                            style={{ backgroundColor: `${themeColor}CC` }} // 80% opacity
                        >
                            {project.category}
                        </span>
                    </div>
                    <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                        <span
                            className="text-white px-4 py-1.5 text-sm font-bold rounded-lg shadow-lg"
                            style={{ backgroundColor: themeColor }}
                        >
                            {project.price}
                        </span>
                    </div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500" />
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow relative bg-white">
                    <div className="flex items-center justify-between mb-2">
                        <h3
                            className="text-2xl font-serif font-bold transition-colors"
                            style={{ color: '#333' }}
                        >
                            {project.title}
                        </h3>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-5">
                        <MapPin size={16} className="mr-1" style={{ color: themeColor }} />
                        {project.location}
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex border-b border-gray-100 mb-5">
                        {(['overview', 'amenities', 'plans'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 pb-2 text-sm font-medium transition-colors relative capitalize ${activeTab === tab ? '' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                style={{ color: activeTab === tab ? themeColor : undefined }}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId={`activeTab-${project.id}`}
                                        className="absolute bottom-0 left-0 right-0 h-0.5"
                                        style={{ backgroundColor: themeColor }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="flex-grow mb-6 relative min-h-[140px]">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0"
                        >
                            {activeTab === 'overview' && (
                                <div className="space-y-4">
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                                        {project.overview || project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.features.slice(0, 3).map((feature, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] rounded-md border border-gray-100 uppercase tracking-wide font-medium"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'amenities' && (
                                <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                                    {(project.amenities || []).slice(0, 6).map((amenity, index) => (
                                        <div key={index} className="flex items-center text-gray-600 text-xs">
                                            <span
                                                className="w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0"
                                                style={{ backgroundColor: themeColor }}
                                            />
                                            <span className="truncate">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'plans' && (
                                <div className="space-y-3 h-full">
                                    {!previewImage ? (
                                        <div className="overflow-y-auto max-h-[140px] pr-1 custom-scrollbar space-y-3">
                                            {project.masterLayout && (
                                                <button
                                                    onClick={() => setPreviewImage(project.masterLayout!)}
                                                    className="w-full text-left flex items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group/item border border-gray-100"
                                                >
                                                    <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                                                        <img src={project.masterLayout} alt="Master Layout" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-xs font-bold text-gray-700">Master Layout</p>
                                                        <p className="text-[10px]" style={{ color: themeColor }}>Click to view</p>
                                                    </div>
                                                </button>
                                            )}
                                            {project.floorPlans?.map((plan, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setPreviewImage(plan)}
                                                    className="w-full text-left flex items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group/item border border-gray-100"
                                                >
                                                    <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                                                        <img src={plan} alt={`Floor Plan ${idx + 1} - ${project.title}`} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-xs font-bold text-gray-700">Floor Plan {idx + 1}</p>
                                                        <p className="text-[10px]" style={{ color: themeColor }}>Click to view</p>
                                                    </div>
                                                </button>
                                            ))}
                                            {!project.masterLayout && !project.floorPlans?.length && (
                                                <div className="text-center text-gray-400 text-xs py-4">
                                                    Layouts coming soon
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="relative h-full min-h-[140px] bg-gray-50 rounded-lg overflow-hidden group/preview border border-gray-200">
                                            <button
                                                onClick={() => setPreviewImage(null)}
                                                className="absolute top-2 left-2 z-10 p-1.5 bg-white/90 rounded-full shadow-sm hover:bg-white text-gray-600 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <img
                                                src={previewImage}
                                                alt="Plan Preview"
                                                className="w-full h-full object-contain p-2"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Footer Actions */}
                    <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-100">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-center text-white border-transparent transition-all hover:opacity-90 shadow-md transform hover:-translate-y-0.5"
                            style={{ backgroundColor: themeColor }}
                            onClick={() => navigate(`/projects/${project.id}`)}
                        >
                            View Details
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-center text-gray-500 hover:text-gray-800 gap-2 hover:bg-gray-50"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Download size={16} /> Brochure
                        </Button>
                    </div>
                    {project.rera && (
                        <div className="text-[10px] text-gray-400 text-center mt-2 px-2 border-t border-gray-50 pt-2">
                            RERA: {project.rera}
                        </div>
                    )}
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
