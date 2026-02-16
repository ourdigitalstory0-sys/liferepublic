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
                title="3 BHK Flats in Hinjewadi | Luxury Living & Price Trends 2025"
                description="Find your dream 3 BHK in Hinjewadi at Kolte Patil Life Republic. Spacious luxury apartments with world-class amenities near IT Parks. Check floor plans and pricing."
                keywords="3bhk in hinjewadi, life republic hinjewadi, kolte patil township hinjewadi, luxury properties in hinjewadi, kolte patil life republic atmos, 3 bhk price pune"
                canonical="/3-bhk-flats-in-hinjewadi"
            />
            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-secondary">
                        Premium 3 BHK Flats in Hinjewadi
                    </h1>
                    <div className="w-24 h-1 bg-accent mx-auto mb-6" />
                    <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                        Experience grandeur and exclusivity with our **3 BHK in Hinjewadi**. Premium residences designed for those who have arrived in life.
                    </p>
                </div>

                {/* Project Grid */}
                <div className="mb-20">
                    <h2 className="text-2xl font-serif font-bold text-secondary mb-8">Exclusive 3 BHK Collections</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        ) : (
                            <p className="col-span-3 text-center text-gray-500 py-12 bg-white rounded-lg border border-gray-100">
                                Loading luxury options...
                            </p>
                        )}
                    </div>
                </div>

                {/* Market Analysis / Skyscraper Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                    <div className="lg:col-span-2 space-y-12">
                        {/* Why Upgrade to 3 BHK */}
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-3xl font-serif font-bold text-secondary mb-6">Why Upgrade to a 3 BHK in Life Republic?</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                As families grow and work-from-home becomes permanent, the need for space has never been greater. A **3 BHK flat in Hinjewadi** offers the future-proofing your family needs.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <h3 className="font-bold text-lg text-secondary border-l-4 border-accent pl-3">Space for Everyone</h3>
                                    <p className="text-gray-600 text-sm">Dedicated rooms for kids, parents, and a guest room or home office ensures privacy for all family members.</p>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="font-bold text-lg text-secondary border-l-4 border-accent pl-3">Premium Lifestyle</h3>
                                    <p className="text-gray-600 text-sm">3 BHK owners in Life Republic enjoy access to exclusive zones, larger balconies, and premium specifications.</p>
                                </div>
                            </div>
                        </section>

                        {/* Financial Perspective */}
                        <section>
                            <h2 className="text-3xl font-serif font-bold text-secondary mb-6">The Financial Logic</h2>
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex gap-6 items-start">
                                <div className="bg-white p-3 rounded-full shadow-sm text-blue-600 font-bold text-xl shrink-0">
                                    %
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2 text-blue-900">Higher Capital Appreciation</h3>
                                    <p className="text-blue-800/80 text-sm leading-relaxed">
                                        Data from the last 5 years shows that **3 BHK units in integrated townships** appreciate 15-20% faster than smaller units due to limited supply and high desirability among upgraders.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* FAQ Section */}
                        <section>
                            <h2 className="text-3xl font-serif font-bold text-secondary mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-5">
                                    <h4 className="font-bold text-lg mb-2">What is the carpet area of 3 BHK flats?</h4>
                                    <p className="text-gray-600">Our 3 BHKs range from efficient 850 sq.ft. to expansive 1200+ sq.ft. carpet areas, catering to different space needs.</p>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-5">
                                    <h4 className="font-bold text-lg mb-2">Are there corner apartments available?</h4>
                                    <p className="text-gray-600">Yes, sectors like Atmos and Canvas feature 3-side open corner apartments for maximum cross-ventilation and privacy.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / CTA */}
                    <div className="lg:col-span-1">
                        <div className="bg-secondary text-white p-8 rounded-2xl sticky top-24">
                            <h3 className="text-2xl font-serif font-bold mb-4">Book a VIP Tour</h3>
                            <p className="text-gray-300 mb-6">Experience the luxury firsthand. Schedule a private site visit with our senior relationship managers.</p>
                            <form className="space-y-4">
                                <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent" />
                                <input type="tel" placeholder="Mobile Number" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent" />
                                <input type="date" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent" />
                                <button className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 rounded-lg transition-colors">
                                    Schedule Visit
                                </button>
                            </form>
                            <p className="text-xs text-center text-gray-500 mt-4">
                                *Free pick-up and drop available
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
