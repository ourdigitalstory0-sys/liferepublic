import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { ArrowRight, Navigation, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../components/ui/ProjectCard';
import { SEO } from '../components/seo/SEO';
import { generateLocationKeywords } from '../lib/seo-utils';
import { api } from '../services/api';
import type { Project } from '../lib/types';

interface LocationLandingProps {
    locationName: string;
    distance?: string;
    commuteTime?: string;
    slug: string;
}

export const LocationLanding: React.FC<LocationLandingProps> = ({ locationName, distance = '10-15 mins', commuteTime = '15 mins', slug }) => {
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await api.projects.getFeatured(3);
                if (data && data.length > 0) {
                    setFeaturedProjects(data);
                }
            } catch (error) {
                console.error('Failed to load projects for location landing:', error);
            }
        };
        loadProjects();
    }, []);

    // SEO Logic
    const title = `Flats in ${locationName} near Life Republic | Premium Homes`;
    const description = `Looking for flats in ${locationName}? Choose Kolte Patil Life Republic. Just ${commuteTime} drive. Premium 2 & 3 BHK homes with better amenities and ROI.`;
    const keywords = generateLocationKeywords(locationName);

    const schema = {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": `Life Republic near ${locationName}`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Hinjewadi",
            "addressRegion": "Maharashtra"
        },
        "containsPlace": {
            "@type": "ApartmentComplex",
            "name": "Life Republic Township"
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <SEO
                title={title}
                description={description}
                keywords={keywords}
                canonical={`/location/${slug}`}
                schema={schema}
            />

            {/* Hero Section */}
            <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://liferepublic.in/images/gallery/eros/master-layout.webp')] bg-cover bg-center opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 mb-4 text-sm font-semibold tracking-wider">
                            BETTER THAN {locationName.toUpperCase()}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                            Looking for Flats in <span className="text-accent">{locationName}</span>?
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                            Discover <strong>Kolte Patil Life Republic</strong>. Just {distance} from {locationName}, offering a superior lifestyle, world-class amenities, and higher appreciation potential.
                        </p>
                        <div className="flex justify-center gap-4">
                            <a href="/contact">
                                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                                    Schedule Site Visit
                                </Button>
                            </a>
                            <a href="#projects">
                                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                                    View Projects <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Comparison / Why Choose Us */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-serif font-bold mb-6 text-secondary">
                                Why choose Life Republic over {locationName}?
                            </h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 p-1 rounded-full">
                                        <CheckCircle2 size={20} className="text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">Integrated Township Living</h4>
                                        <p className="text-gray-600 text-sm">Unlike standalone buildings in {locationName}, live in a 390+ acre managed city.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 p-1 rounded-full">
                                        <CheckCircle2 size={20} className="text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">Better Connectivity</h4>
                                        <p className="text-gray-600 text-sm">Direct access to Spine Road and Ring Road, avoiding {locationName}'s traffic bottlenecks.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 p-1 rounded-full">
                                        <CheckCircle2 size={20} className="text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">World-Class Amenities</h4>
                                        <p className="text-gray-600 text-sm">Schools, Hospitals, Gyms, and Sports Clubs all within the township gates.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <div className="flex items-center gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
                                <Navigation size={32} className="text-blue-600" />
                                <div>
                                    <h4 className="font-bold text-blue-900">Commute to {locationName}</h4>
                                    <p className="text-blue-700">{commuteTime} via Main Road</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="text-gray-600">Distance</span>
                                    <span className="font-bold">{distance}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="text-gray-600">Road Width</span>
                                    <span className="font-bold">150ft Spine Road</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Water Supply</span>
                                    <span className="font-bold text-green-600">24x7 Township Supply</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section id="projects" className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif font-bold mb-10 text-center text-secondary">Recommended Projects for you</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Content Block */}
            <section className="py-12 bg-white text-gray-600 text-sm leading-relaxed">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Properties in {locationName} vs Life Republic</h3>
                    <p className="mb-4">
                        Many homebuyers searching for <strong>2 BHK flats in {locationName}</strong> or <strong>3 BHK in {locationName}</strong> eventually choose Kolte Patil Life Republic due to its superior infrastructure. While {locationName} offers proximity to the highway, Life Republic offers a holistic ecosystem that standalone buildings cannot match.
                    </p>
                    <p>
                        With the new Ring Road connectivity, travelling from {locationName} to Hinjewadi Phase 1 takes longer than travelling from Life Republic. Choose smart, choose the integrated township life.
                    </p>
                </div>
            </section>
        </div>
    );
};
