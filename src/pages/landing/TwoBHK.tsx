import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import type { Project } from '../../lib/types';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { SEO } from '../../components/seo/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';

export const TwoBHK: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await api.projects.getAll();
                const filtered = data.filter(p =>
                    p.features.some(f => f.includes('2 BHK')) ||
                    p.category.includes('2 BHK') ||
                    p.description.includes('2 BHK')
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
                title="2BHK in Hinjewadi | Kolte Patil Life Republic Township"
                description="Looking for a 2BHK in Hinjewadi? Explore Arezo and Atmos at Kolte Patil Life Republic Township. Perfect homes for families near Hinjewadi IT Park."
                keywords="2BHK in hinjewadi, life republic hinjewadi, kolte patil hinjewadi, hinjewadi properties, kolte patil life republic arezo"
                canonical="/2-bhk-flats-in-hinjewadi"
            />
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-secondary">Spacious 2BHK in Hinjewadi</h1>
                    <div className="w-24 h-1 bg-accent mx-auto mb-6" />
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Spacious homes designed for growing families. Discover the perfect **2BHK in Hinjewadi** in Pune's most integrated township.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-gray-500">Loading premium 2 BHK options...</p>
                    )}
                </div>
            </div>
        </div>
    );
};
