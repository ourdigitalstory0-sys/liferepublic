import React, { useEffect, useState } from 'react';
import type { Project } from '../../lib/types';
import { api } from '../../services/api';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { SEO } from '../../components/seo/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';

export const FourBHK: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await api.projects.getAll();
                // Filter specifically for "4 BHK" or "4 Bed" or "4 & 5 Bed" in features or category
                const filtered = data.filter(p =>
                    p.features.some(f => f.includes('4 BHK') || f.includes('4 Bed')) ||
                    p.title.includes('24K') || // Explicitly include 24K projects as they are usually 4BHK+
                    p.description.includes('4 BHK')
                );

                if (filtered.length > 0) {
                    setProjects(filtered);
                } else {
                    const { projects: staticProjects } = await import('../../data/projects');
                    const staticFiltered = staticProjects.filter(p =>
                        p.features.some(f => f.includes('4 BHK') || f.includes('4 Bed')) ||
                        p.title.includes('24K') || // Explicitly include 24K projects
                        p.description.includes('4 BHK')
                    );
                    setProjects(staticFiltered);
                }
            } catch (error) {
                console.error('Failed to load projects:', error);
                const { projects: staticProjects } = await import('../../data/projects');
                const staticFiltered = staticProjects.filter(p =>
                    p.features.some(f => f.includes('4 BHK') || f.includes('4 Bed')) ||
                    p.title.includes('24K') ||
                    p.description.includes('4 BHK')
                );
                setProjects(staticFiltered);
            } finally {
                setLoading(false);
            }
        };
        loadProjects();
    }, []);

    return (
        <div className="pt-20">
            <SEO
                title="4BHK Villa & Bungalow in Hinjewadi | Kolte Patil Life Republic"
                description="Looking for a 4BHK Villa in Hinjewadi? Explore ultra-luxury 4BHK Bungalows and Row Houses in Kolte Patil Life Republic Township Hinjewadi. Exclusive 24K Espada & Atmos."
                keywords="4bhk villa in hinjewadi, 4bhk bungalow in hinjewadi, luxury properties in hinjewadi, kolte patil life republic 24k espada, row houses in hinjewadi"
                canonical="/4-bhk-flats-in-hinjewadi"
            />
            <Breadcrumbs />

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-secondary">Luxury 4BHK Villas & Bungalows in Hinjewadi</h1>
                    <div className="w-24 h-1 bg-accent mb-8"></div>
                    <p className="text-gray-600 max-w-3xl text-lg mb-12">
                        Experience the epitome of luxury with our exclusive collection of **4BHK Villas and Bungalows** in Kolte Patil Life Republic Township. Designed for those who seek grandeur and privacy.
                    </p>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2].map((i) => (
                                <div key={i} className="bg-white rounded-2xl h-96 animate-pulse">
                                    <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                                    <div className="p-6 space-y-4">
                                        <div className="h-6 bg-gray-200 w-3/4 rounded"></div>
                                        <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {projects.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {projects.map((project) => (
                                        <ProjectCard key={project.id} project={project} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xl text-gray-500">Exclusive 4 BHK inventory coming soon. Please create an enquiry for early access.</p>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};
