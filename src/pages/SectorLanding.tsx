import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Navigation, CheckCircle2, ArrowRight, Building2, Zap } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/ui/ProjectCard';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SectorMesh } from '../components/sections/SectorMesh';
import sectorsData from '../data/sectors.json';
import { api } from '../services/api';
import type { Project } from '../lib/types';
import { generateGlobalSchema, generateSectorSchema } from '../utils/schemaGenerator';

import { SectorLinkMesh } from '../components/sections/SectorLinkMesh';
import { InfraTracker } from '../components/sections/InfraTracker';

export const SectorLanding: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

    // Find the sector/avenue/locality data based on slug
    const allItems = [
        ...sectorsData.sectors,
        ...sectorsData.avenues,
        ...sectorsData.localities
    ];
    
    const data = allItems.find(item => item.slug === slug);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                // Fetch projects to show recommendations
                const projects = await api.projects.getFeatured(3);
                setFeaturedProjects(projects);
            } catch (error) {
                console.error('Failed to load projects for sector:', error);
            }
        };
        loadProjects();
    }, [slug]);

    if (!data) {
        return <Navigate to="/404" replace />;
    }

    const typeIcon = () => {
        switch (data.type) {
            case 'Sector': return <Building2 size={24} />;
            case 'Avenue': return <Navigation size={24} />;
            case 'Locality': return <MapPin size={24} />;
            default: return <Zap size={24} />;
        }
    };

    const isLocality = data.type === 'Locality';
    const sectorData = data as any;
    
    // SEO Logic
    const pageTitle = isLocality 
        ? `Flats in ${data.name} near Life Republic | Hinjewadi Property` 
        : `${sectorData.branding || data.name} | ${sectorData.segment || 'Township Intelligence'} | Kolte Patil Life Republic`;
    
    const pageDesc = isLocality
        ? `Find premium 2 & 3 BHK flats in ${data.name}. Just ${data.distance || 'minutes'} from Hive-tech parks. Choose the Life Republic lifestyle for better ROI and community.`
        : `Explore ${sectorData.branding || data.name} ({sectorData.segment}) at Kolte Patil Life Republic. ${data.usp} Targeting ${sectorData.target} with ${data.infrastructure}.`;

    const metaKeywords = [
        ...(sectorData.keywords || []),
        `${data.name} price`,
        `${data.name} possession date`,
        `Life Republic ${data.name}`,
        "Kolte Patil Life Republic",
        "Hinjewadi real estate",
        "Pune township investment"
    ].join(', ');

    const schema = [
        generateGlobalSchema(),
        generateSectorSchema(data as any)
    ];

    return (
        <div className="pt-20 bg-white">
            <SEO 
                title={pageTitle}
                description={pageDesc}
                keywords={metaKeywords}
                canonical={`/location/${slug}`}
                schema={schema}
            />
            <Breadcrumbs />

            {/* Hero Section */}
            <section className="relative py-24 bg-secondary overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-gold.svg')] opacity-5"></div>
                <div className="container mx-auto px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-3 text-accent mb-6">
                            <div className="p-2 bg-accent/10 rounded-lg">
                                {typeIcon()}
                            </div>
                            <span className="font-bold tracking-widest uppercase text-sm">{data.type} Intelligence — {sectorData.segment || 'Strategic'}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                            {sectorData.branding || data.name} <br />
                            <span className="text-accent underline decoration-accent/30">Life Republic</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
                            {data.usp} Ideally positioned for <strong>{sectorData.target}</strong>, located approximately {data.distance} within the sovereign domain of Hinjewadi.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="primary" size="lg" className="rounded-full shadow-2xl hover:scale-105 transition-all" onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge'))}>
                                Request {sectorData.segment} Price List 2026
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full border-white text-white">Download ROI Roadmap</Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Intelligence Grid */}
            <section className="py-24 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-8">{sectorData.segment} Hub Infrastructure</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-accent border border-gray-100">
                                        <Zap size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-secondary mb-2">Smart Connectivity</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {sectorData.branding || data.name} is strategically positioned {data.distance} from the main IT spine, ensuring effortless daily commutes to Hinjewadi Phase 1, 2, and 3.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-accent border border-gray-100">
                                        <Building2 size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-secondary mb-2">Strategic Deployment</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {data.infrastructure}. {sectorData.branding} benefits from the township's 150ft wide spine roads and professional-grade security.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-accent border border-gray-100">
                                        {isLocality ? <Navigation size={32} /> : <CheckCircle2 size={32} />}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-secondary mb-2">
                                            {isLocality ? 'Proximity Advantage' : 'Segment Excellence'}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {isLocality 
                                                ? `Life Republic offers a superior alternative to standalone projects in ${data.name}, featuring a 400-acre managed ecosystem.`
                                                : `Tailored for ${sectorData.target}, this ${sectorData.segment} cluster is strictly RERA compliant with clear township title.`
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                                <img 
                                    src="/images/home/master-layout-full.jpg" 
                                    alt={`${data.name} Layout`}
                                    className="w-full h-full object-cover opacity-80"
                                />
                            </div>
                            <div className="absolute top-8 right-8 bg-secondary p-6 rounded-2xl shadow-xl border border-white/20 max-w-[200px]">
                                <p className="text-sm font-bold text-accent">{data.distance}</p>
                                <p className="text-xs text-white/40 uppercase tracking-widest mt-1">To Metro Access</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recommendations */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary mb-4">Available Projects in {sectorData.branding || data.name}</h2>
                        <div className="w-24 h-1 bg-accent mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Sovereign Infrastructure Tracker (Phase 5 SEO) */}
            <InfraTracker />

            {/* Deep Web Content Block */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                        <h3 className="text-2xl font-serif font-bold text-secondary mb-6">Sovereign Infrastructure Intelligence: {sectorData.branding || data.name}</h3>
                        <p className="mb-6">
                            Home-seekers evaluating <strong>{data.name}</strong> often compare it to standalone developments in Hinjewadi. However, the <strong>{sectorData.branding}</strong> precinct within Kolte Patil Life Republic offers a distinct "Township Advantage" that is currently driving its high ROI potential.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <h4 className="font-bold text-secondary mb-2">Logistics Metrics</h4>
                                <ul className="text-sm space-y-2">
                                    <li>• <span className="text-gray-500">Distance:</span> {data.distance} from Main Spine</li>
                                    <li>• <span className="text-gray-500">Infrastructure:</span> {data.infrastructure}</li>
                                    <li>• <span className="text-gray-500">Access:</span> Automated Township Entry/Exit</li>
                                </ul>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <h4 className="font-bold text-secondary mb-2">Demand Analysis</h4>
                                <ul className="text-sm space-y-2">
                                    <li>• <span className="text-gray-500">Segment:</span> {sectorData.segment} Sector</li>
                                    <li>• <span className="text-gray-500">Target Group:</span> {sectorData.target}</li>
                                    <li>• <span className="text-gray-500">Occupancy Trend:</span> High multi-generational demand</li>
                                </ul>
                            </div>
                        </div>
                        <p className="mb-6 italic text-sm text-gray-500">
                            *This {sectorData.segment} cluster is strictly RERA compliant and integrated into the 400-acre managed ecosystem of Life Republic.
                        </p>
                    </div>
                    <div className="mt-12 p-8 bg-accent rounded-3xl text-secondary flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                        <div>
                            <h4 className="text-2xl font-bold mb-2">Request {sectorData.segment} Brochure</h4>
                            <p className="text-secondary/60">Get the full technical ledger and availability for {data.name}.</p>
                        </div>
                        <Button 
                            variant="secondary" 
                            size="lg" 
                            className="rounded-full px-12 group"
                            onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge'))}
                        >
                            Get PDF Brochure <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </section>
            {/* Semantic Internal Linking Mesh (Phase 5 SEO) */}
            <SectorLinkMesh />

            <SectorMesh />
        </div>
    );
};
