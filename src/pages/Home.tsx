import React from 'react';
import { Button } from '../components/ui/Button';
import { ArrowRight, Briefcase, Plane, GraduationCap, HeartPulse, Dumbbell, Trees, Music, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import type { Project } from '../lib/types';
import { ProjectCard } from '../components/ui/ProjectCard';
import { HeroSlider } from '../components/sections/HeroSlider';
import { AmenitiesCarousel } from '../components/sections/AmenitiesCarousel';

const Home: React.FC = () => {
    const [featuredProjects, setFeaturedProjects] = React.useState<Project[]>([]);

    React.useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await api.projects.getAll();
                // Filter or pick top 3. For now just take first 3.
                // If DB empty, we could fallback to static projects if we imported them, 
                // but let's assume we want to switch to DB.
                // However, to prevent broken UI if DB is empty, let's keep static as fallback or initial.
                if (data && data.length > 0) {
                    setFeaturedProjects(data.slice(0, 3));
                } else {
                    // Fallback to static if needed, or just import them
                    const { projects: staticProjects } = await import('../data/projects');
                    setFeaturedProjects(staticProjects.slice(0, 3));
                }
            } catch (error) {
                console.error('Failed to load projects:', error);
                const { projects: staticProjects } = await import('../data/projects');
                setFeaturedProjects(staticProjects.slice(0, 3));
            }
        };
        loadProjects();
    }, []);

    return (
        <div className="w-full">
            {/* Hero Section */}
            <HeroSlider />

            {/* Featured Projects Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold mb-4 text-secondary">Featured Projects</h2>
                        <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Discover our diverse range of residential projects, each designed to offer a unique lifestyle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <a href="/projects">
                            <Button variant="primary" size="lg" className="gap-2">
                                View All Projects <ArrowRight size={20} />
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Location Advantages Section */}
            <section className="py-20 bg-secondary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://liferepublic.in/images/gallery/eros/master-layout.webp')] bg-cover bg-center opacity-5"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-serif font-bold mb-4">Strategic Location</h2>
                        <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                            Connected to the world, yet a world of its own. Located in the heart of Hinjewadi.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Briefcase, title: 'Work', desc: 'Rajiv Gandhi IT Park', time: '10 Mins' },
                            { icon: Plane, title: 'Connect', desc: 'Mumbai-Pune Expy', time: '15 Mins' },
                            { icon: GraduationCap, title: 'Learn', desc: 'Anisha Global School', time: 'Inside' },
                            { icon: HeartPulse, title: 'Care', desc: 'Ruby Hall Clinic', time: '15 Mins' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:bg-white/20 transition-all group"
                            >
                                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <item.icon className="text-white" size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-300 mb-1">{item.desc}</p>
                                <p className="text-accent font-bold text-sm">{item.time}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Life at Republic (Bento Grid) */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-serif font-bold mb-4 text-secondary">Life at Republic</h2>
                        <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            An ecosystem designed for a holistic lifestyle.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {/* Large Item */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between h-64 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/40 z-10"></div>
                            <img src="https://liferepublic.in/images/gallery/nature-nest.webp" alt="Nature" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="relative z-20 text-white">
                                <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <Trees size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">3.5 Acre Urban Park</h3>
                                <p className="text-gray-200">A sprawling green lung with 7,700+ trees and botanical gardens.</p>
                            </div>
                        </motion.div>

                        {/* Standard Item */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center h-64"
                        >
                            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 text-accent">
                                <Dumbbell size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-2">World-Class Sports</h3>
                            <p className="text-gray-600 text-sm">Cricket pitch, Olympic-size pool, and 4km jogging track.</p>
                        </motion.div>

                        {/* Standard Item */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center h-64"
                        >
                            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 text-accent">
                                <Music size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-2">United Sky Theatre</h3>
                            <p className="text-gray-600 text-sm">Open-air amphitheatre for community events and cultural nights.</p>
                        </motion.div>

                        {/* Large Item */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between h-64 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-accent/40 z-10"></div>
                            <img src="https://liferepublic.in/images/gallery/clubhouse.webp" alt="Clubhouse" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="relative z-20 text-white">
                                <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Smart & Secure</h3>
                                <p className="text-gray-200">Multi-level security, fire station, and 'Planet App' for smart community living.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Amenities Section */}
            <AmenitiesCarousel />

            {/* About Section */}
            <section className="py-20 bg-primary/20">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-serif font-bold mb-6 text-secondary">Welcome to Life Republic</h2>
                        <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                        <p className="max-w-4xl mx-auto text-gray-600 leading-relaxed text-lg mb-8">
                            Situated just 4.5 km from Hinjewadi, the IT Hub of Pune, Kolte Patil Life Republic is a township built for thinking minds.
                            With a 5-acre entrance boulevard and 150ft wide internal spine roads, it offers a life of magnitude.
                            Enjoy a self-sustainable ecosystem with global schools, fire stations, and multi-level security, all amidst 390+ acres of lush greenery.
                        </p>
                        <div className="inline-block p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                            <span className="text-accent font-bold">RERA Registered</span> | Award Winning Township
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
