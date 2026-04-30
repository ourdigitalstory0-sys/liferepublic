import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { personalizationStore } from '../../lib/personalizationStore';
import { api } from '../../services/api';
import type { Project } from '../../lib/types';
import { ProjectCard } from '../ui/ProjectCard';

export const RecommendedProjects: React.FC = () => {
    const [recommended, setRecommended] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecommendations = async () => {
            const history = personalizationStore.getHistory();
            if (history.recentlyViewed.length === 0) {
                setLoading(false);
                return;
            }

            try {
                // For now, we fetch the first few recently viewed or similar
                // In a real app, this would be a specialized API call
                const projects = await Promise.all(
                    history.recentlyViewed.slice(0, 3).map(id => api.projects.getById(id))
                );
                setRecommended(projects.filter(Boolean) as Project[]);
            } catch (error) {
                console.error("Failed to load recommendations:", error);
            } finally {
                setLoading(false);
            }
        };

        loadRecommendations();
    }, []);

    if (loading || recommended.length === 0) return null;

    return (
        <section className="py-20 bg-primary/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -mr-48 -mt-48" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-accent text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2 mb-3"
                        >
                            <Sparkles size={14} /> Curated For You
                        </motion.span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary">
                            Tailored Selection
                        </h2>
                    </div>
                    <p className="text-gray-500 max-w-sm text-sm font-medium leading-relaxed">
                        Based on your interest in Life Republic sectors and configurations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recommended.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
