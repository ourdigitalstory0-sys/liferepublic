import React, { useEffect, useState } from 'react';
import { History } from 'lucide-react';
import { personalizationStore } from '../../lib/personalizationStore';
import { ProjectCard } from '../ui/ProjectCard';
import { api } from '../../services/api';
import type { Project } from '../../lib/types';

export const RecentlyViewed: React.FC = () => {
    const [recentProjects, setRecentProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecent = async () => {
            const history = personalizationStore.getHistory();
            if (history.recentlyViewed.length === 0) {
                setLoading(false);
                return;
            }

            try {
                // Fetch all projects and filter by recently viewed slugs
                const allProjects = await api.projects.getAll();
                const filtered = allProjects.filter(p => history.recentlyViewed.includes(p.id))
                    .sort((a, b) => history.recentlyViewed.indexOf(a.id) - history.recentlyViewed.indexOf(b.id));
                
                setRecentProjects(filtered);
            } catch (error) {
                console.error('Failed to load recent projects:', error);
            } finally {
                setLoading(false);
            }
        };

        loadRecent();
    }, []);

    if (loading || recentProjects.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-10">
                    <div className="p-2 bg-accent/10 rounded-lg text-accent">
                        <History size={24} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-secondary">Continue Exploring</h2>
                        <p className="text-gray-500 text-sm">Projects you recently interacted with</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};
