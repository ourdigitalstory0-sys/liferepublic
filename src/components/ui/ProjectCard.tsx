import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Download } from 'lucide-react';
import { Button } from './Button';
import type { Project } from '../../lib/types';
import { BrochureModal } from './BrochureModal';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
            >
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/95 text-secondary px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-sm shadow-sm backdrop-blur-sm">
                            {project.category}
                        </span>
                    </div>
                    {/* Price Tag */}
                    <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="bg-accent text-white px-4 py-1.5 text-sm font-bold rounded-sm shadow-lg">
                            {project.price}
                        </span>
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                        <h3 className="text-2xl font-serif font-bold text-secondary group-hover:text-accent transition-colors mb-2">
                            {project.title}
                        </h3>
                        <div className="flex items-center text-gray-500 text-sm">
                            <MapPin size={16} className="mr-1 text-accent" />
                            {project.location}
                        </div>
                    </div>

                    <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed flex-grow">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.features.slice(0, 2).map((feature, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-primary/50 text-secondary text-xs rounded-full font-medium border border-gray-100"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-auto">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-center group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all"
                            onClick={() => navigate(`/projects/${project.id}`)}
                        >
                            View Details
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-center text-gray-500 hover:text-secondary gap-2"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Download size={16} /> Brochure
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
