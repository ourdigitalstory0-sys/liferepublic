import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import type { Project } from '../lib/types';
import { ProjectCard } from '../components/ui/ProjectCard';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

import { SEO } from '../components/seo/SEO';

const Projects: React.FC = () => {
    const [allProjects, setAllProjects] = useState<Project[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const loadProjects = async () => {
            try {
                const data = await api.projects.getAll();
                if (data && data.length > 0) {
                    setAllProjects(data);
                }
            } catch (error) {
                console.error('Failed to load projects from API:', error);
            }
        };
        loadProjects();
    }, []);

    return (
        <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <Breadcrumbs />
            <SEO
                title="Projects in Kolte Patil Life Republic Township Hinjewadi | 1, 2, 3 BHK & Villas"
                description="Explore all residential projects in Kolte Patil Life Republic Township Hinjewadi. Choose from 1, 2, 3 BHK flats, row houses, and luxury villas. Check current pricing, floor plans, and availability."
                keywords="Kolte Patil Life Republic Projects, Kolte Patil Life Republic Township Hinjewadi, Flats in Hinjewadi, 2 BHK in Life Republic, 3 BHK Flats Pune, Row Houses in Hinjewadi, Villas in Pune, New Launch Projects Hinjewadi, Ready Possession Flats"
                canonical="/projects"
            />
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-6">
                        Premium Properties in Hinjewadi
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Explore our wide range of residential projects in Kolte Patil Life Republic Township. From affordable housing to ultra-luxury villas, find your dream property in Hinjewadi's most coveted address.
                    </p>
                </motion.div>

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
