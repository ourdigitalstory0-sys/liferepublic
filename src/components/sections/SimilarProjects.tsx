import React, { useEffect, useState } from 'react';
import type { Project } from '../../lib/types';
import { ProjectCard } from '../ui/ProjectCard';
import { api } from '../../services/api';

interface SimilarProjectsProps {
    currentId: string;
}

export const SimilarProjects: React.FC<SimilarProjectsProps> = ({ currentId }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                // Try API first
                let allProjects = await api.projects.getAll();

                if (!allProjects || allProjects.length === 0) {
                    // Fallback to static data
                    const { projects: staticProjects } = await import('../../data/projects');
                    allProjects = staticProjects;
                }

                if (allProjects) {
                    // Filter out current project and pick random 3
                    const filtered = allProjects.filter(p => p.id !== currentId);

                    // Simple shuffle
                    const shuffled = filtered.sort(() => 0.5 - Math.random());

                    setProjects(shuffled.slice(0, 3));
                }

            } catch (error) {
                console.error("Failed to load similar projects", error);
                const { projects: staticProjects } = await import('../../data/projects');
                const filtered = staticProjects.filter(p => p.id !== currentId);
                setProjects(filtered.slice(0, 3));
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, [currentId]);

    if (loading || projects.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif font-bold text-secondary mb-4">You May Also Like</h2>
                    <div className="w-16 h-1 bg-gray-300 mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};
