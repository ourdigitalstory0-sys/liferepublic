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
                    {/* Hero */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-secondary">
                            Luxury 4BHK Villas & Bungalows in Hinjewadi
                        </h1>
                        <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
                        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                            Experience the epitome of luxury with our exclusive collection of **4BHK Villas and Bungalows** in Kolte Patil Life Republic Township. Designed for those who seek grandeur and privacy.
                        </p>
                    </div>

                    {/* Listings */}
                    <div className="mb-20">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.length > 0 ? (
                                    projects.map((project) => (
                                        <ProjectCard key={project.id} project={project} />
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center py-12 bg-white rounded-xl border border-gray-100">
                                        <p className="text-xl text-gray-500">Exclusive 4 BHK inventory coming soon. Please create an enquiry for early access.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Deep Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                            {/* The Villa Life */}
                            <section>
                                <h2 className="text-3xl font-serif font-bold text-secondary mb-6">The Villa Life: Beyond Ordinary</h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Owning a **Bungalow or Row House in Hinjewadi** is a statement of prestige. At Life Republic, we offer limited-edition residences like **24K Espada** and **Sound of Soul**, where you own the land and the sky.
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <li className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                                        <span className="font-semibold text-gray-700">Private Garden & Terrace</span>
                                    </li>
                                    <li className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                                        <span className="font-semibold text-gray-700">Exclusive Clubhouse Access</span>
                                    </li>
                                    <li className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                                        <span className="font-semibold text-gray-700">Double Height Ceilings</span>
                                    </li>
                                    <li className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                                        <span className="font-semibold text-gray-700">Gated Community Security</span>
                                    </li>
                                </ul>
                            </section>

                            {/* Investment ROI */}
                            <section className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
                                <h2 className="text-2xl font-serif font-bold text-secondary mb-4">A Rare Asset Class</h2>
                                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                    Land is a finite resource. Villas within a township offer the unique dual benefit of **Land Ownership Appreciation** combined with the **Safety & Amenities** of a gated community. This makes them a far superior asset compared to standalone apartments.
                                </p>
                                <div className="flex items-center gap-2 text-accent font-bold">
                                    <span>Typically appreciates 2x faster than flats</span>
                                </div>
                            </section>
                        </div>

                        {/* Exclusive Enquiry */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-900 text-white p-8 rounded-2xl sticky top-24 border border-gray-800 shadow-2xl">
                                <h3 className="text-2xl font-serif font-bold mb-2">The 24K Circle</h3>
                                <p className="text-gray-400 mb-6 text-sm">Join the waiting list for our most exclusive invite-only launches.</p>
                                <form className="space-y-4">
                                    <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors" />
                                    <input type="tel" placeholder="Mobile Number" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors" />
                                    <input type="email" placeholder="Official Email ID" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors" />
                                    <button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg">
                                        Request Invitation
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
