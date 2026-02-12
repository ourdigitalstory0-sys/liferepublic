import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import type { Project } from '../../lib/types';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { SEO } from '../../components/seo/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';

export const ThreeBHK: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await api.projects.getAll();
                const filtered = data.filter(p =>
                    p.features.some(f => f.includes('3 BHK')) ||
                    p.category.includes('3 BHK') ||
                    p.description.includes('3 BHK')
                );
                setProjects(filtered);
            } catch (error) {
                console.error('Failed to load projects', error);
            }
        };
        loadProjects();
    }, []);

    return (
        <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <Breadcrumbs />
            <SEO
                title="3BHK in Hinjewadi | Kolte Patil Life Republic Township"
                description="Find your dream 3BHK in Hinjewadi at Kolte Patil Life Republic Township. Spacious luxury apartments with world-class amenities near IT Park."
                keywords="3bhk in hinjewadi, life republic hinjewadi, kolte patil township hinjewadi, luxury properties in hinjewadi, kolte patil life republic atmos"
                canonical="/3-bhk-flats-in-hinjewadi"
            />
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-secondary">Premium 3BHK in Hinjewadi</h1>
                    <div className="w-24 h-1 bg-accent mx-auto mb-6" />
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Experience grandeur and exclusivity with our **3BHK in Hinjewadi**. Premium residences for those who have arrived in life.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-gray-500">Loading luxury options...</p>
                    )}
                </div>
            </div>
        </div>
    );
};
