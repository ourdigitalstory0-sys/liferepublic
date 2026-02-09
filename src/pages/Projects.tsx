import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Project } from '../lib/types';
import { ProjectCard } from '../components/ui/ProjectCard';

const Projects: React.FC = () => {
    const [allProjects, setAllProjects] = useState<Project[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const loadProjects = async () => {
            try {
                const data = await api.projects.getAll();
                if (data && data.length > 0) {
                    setAllProjects(data);
                } else {
                    // Fallback
                    const { projects: staticProjects } = await import('../data/projects');
                    setAllProjects(staticProjects);
                }
            } catch (error) {
                console.error('Failed to load projects:', error);
                const { projects: staticProjects } = await import('../data/projects');
                setAllProjects(staticProjects);
            }
        };
        loadProjects();
    }, []);

    return (
        <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-secondary">Our Projects</h1>
                    <div className="w-24 h-1 bg-accent mx-auto mb-6" />
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Discover a life of luxury, comfort, and innovation at Life Republic.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
