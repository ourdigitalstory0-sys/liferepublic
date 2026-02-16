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
                title="2 BHK Flats in Hinjewadi | Price Trends & Best Projects 2025"
                description="Comprehensive guide to buying 2 BHK flats in Hinjewadi. Compare prices at Life Republic, check rental yields, and explore floor plans. Best ROI for 2 BHK in Pune."
                keywords="2 BHK in hinjewadi price, 2 BHK flat layout, life republic 2 bhk price, investment in hinjewadi, 2 bhk rental yield pune, kolte patil 2 bhk"
                canonical="/2-bhk-flats-in-hinjewadi"
            />
            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-secondary">
                        Premium 2 BHK Flats in Hinjewadi
                    </h1>
                    <div className="w-24 h-1 bg-accent mx-auto mb-6" />
                    <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                        Discover the perfect balance of comfort and investment. with <strong>Kolte Patil Life Republic</strong> offering the most value-for-money 2 BHK residences in Pune's IT hub.
                    </p>
                </div>

                {/* Project Grid */}
                <div className="mb-20">
                    <h2 className="text-2xl font-serif font-bold text-secondary mb-8">Available 2 BHK Configurations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        ) : (
                            <p className="col-span-3 text-center text-gray-500 py-12 bg-white rounded-lg border border-gray-100">
                                Loading premium 2 BHK options...
                            </p>
                        )}
                    </div>
                </div>

                {/* Market Analysis / Skyscraper Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                    <div className="lg:col-span-2 space-y-12">
                        {/* Why Buy 2 BHK Section */}
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-3xl font-serif font-bold text-secondary mb-6">Why Invest in a 2 BHK in Hinjewadi?</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Hinjewadi is Pune's fastest-growing residential micro-market. For young IT professionals and nuclear families, a **2 BHK flat** represents the ideal entry point into real estate investment.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold shrink-0">01</div>
                                    <div>
                                        <h3 className="font-bold text-lg">High Rental Demand</h3>
                                        <p className="text-gray-600 text-sm">With over 3 Lakh employees in Rajiv Gandhi Infotech Park, 2 BHKs command the highest occupancy rates.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">02</div>
                                    <div>
                                        <h3 className="font-bold text-lg">Appreciation Potential</h3>
                                        <p className="text-gray-600 text-sm">Property prices in Hinjewadi have appreciated by ~25% in the last 3 years, outperforming the Pune average.</p>
                                    </div>
                                </li>
                            </ul>
                        </section>

                        {/* Lifestyle & User Persona */}
                        <section>
                            <h2 className="text-3xl font-serif font-bold text-secondary mb-6">Is a 2 BHK Right for You?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                                    <h3 className="font-bold text-xl mb-3 text-orange-800">For Young Couples</h3>
                                    <p className="text-gray-700 text-sm">Extra room can serve as a Home Office or Guest Room. Perfect for hybrid work models.</p>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                                    <h3 className="font-bold text-xl mb-3 text-purple-800">For Investors</h3>
                                    <p className="text-gray-700 text-sm">Sweet spot for rental yield (3-4%). Easier to liquidate than larger luxury apartments.</p>
                                </div>
                            </div>
                        </section>

                        {/* FAQ Section */}
                        <section>
                            <h2 className="text-3xl font-serif font-bold text-secondary mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-5">
                                    <h4 className="font-bold text-lg mb-2">What is the price of a 2 BHK in Life Republic?</h4>
                                    <p className="text-gray-600">Prices start from ₹72 Lakhs* for premium configurations like Arezo and Duet, offering best-in-class amenities.</p>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-5">
                                    <h4 className="font-bold text-lg mb-2">Are ready possession 2 BHKs available?</h4>
                                    <p className="text-gray-600">Yes, select sectors in Life Republic offer ready-to-move-in options. Contact our sales team for current inventory.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / CTA */}
                    <div className="lg:col-span-1">
                        <div className="bg-secondary text-white p-8 rounded-2xl sticky top-24">
                            <h3 className="text-2xl font-serif font-bold mb-4">Get Detailed Pricing</h3>
                            <p className="text-gray-300 mb-6">Download the complete cost sheet with breakdown of government taxes and other charges.</p>
                            <form className="space-y-4">
                                <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent" />
                                <input type="tel" placeholder="Mobile Number" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent" />
                                <button className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 rounded-lg transition-colors">
                                    Download Cost Sheet
                                </button>
                            </form>
                            <p className="text-xs text-center text-gray-500 mt-4">
                                *Instant download link via WhatsApp
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
