import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, Briefcase, Plane, GraduationCap, HeartPulse, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import type { Project } from '../lib/types';
import { ProjectCard } from '../components/ui/ProjectCard';
import { HeroSlider } from '../components/sections/HeroSlider';
import { MasterPlan } from '../components/sections/MasterPlan';
import { BrochureEngine } from '../components/ui/BrochureEngine';
import { AmenitiesCarousel } from '../components/sections/AmenitiesCarousel';
import { FAQ } from '../components/sections/FAQ';
import { SEO } from '../components/seo/SEO';
import { ResidentPulse } from '../components/ui/ResidentPulse';
import { generateCollectionSchema, generateGlobalSchema, generateLocalBusinessSchema, generateReviewSchema } from '../utils/schemaGenerator';

import { RecommendedProjects } from '../components/personalization/RecommendedProjects';
import { RecentlyViewed } from '../components/sections/RecentlyViewed';
import { InfraTracker } from '../components/sections/InfraTracker';
import { CommunityCalendar } from '../components/sections/CommunityCalendar';
import { NeuralGallery } from '../components/sections/NeuralGallery';
import { ConstructionUpdates } from '../components/sections/ConstructionUpdates';
import { TestimonialCarousel } from '../components/sections/TestimonialCarousel';
import { PersonalizedDashboard } from '../components/sections/PersonalizedDashboard';
import { AerialTour } from '../components/sections/AerialTour';
import { SectorMesh } from '../components/sections/SectorMesh';
import { NeuralErrorBoundary } from '../components/ui/NeuralErrorBoundary';

const Home: React.FC = () => {
    const [featuredProjects, setFeaturedProjects] = React.useState<Project[]>([]);

    React.useEffect(() => {
        const loadData = async () => {
            try {
                const data = await api.projects.getFeatured(3);
                if (data && data.length > 0) {
                    setFeaturedProjects(data);
                }
            } catch (error) {
                console.error('Failed to load projects from API:', error);
            }
        };
        loadData();
    }, []);

    const schema = useMemo(() => {
        const globalSchema = generateGlobalSchema();
        const localBusinessSchema = generateLocalBusinessSchema();
        const reviewSchema = generateReviewSchema();
        const baseSchemas = [globalSchema, localBusinessSchema, reviewSchema];
        
        if (featuredProjects.length > 0) {
            return [...baseSchemas, generateCollectionSchema(featuredProjects)];
        }
        return baseSchemas;
    }, [featuredProjects]);

    return (
        <div className="w-full">
            <SEO
                description="Discover Kolte Patil Life Republic in Hinjewadi, Pune. A 400-acre premium township offering luxury 1, 2, 3, and 4 BHK flats, villas, and commercial spaces. Thriving Community Living Hinjewadi."
                keywords="Kolte Patil Life Republic, Life Republic Hinjewadi, Life Republic Township Pune, 2 BHK flats in Hinjewadi, 3 BHK flats in Hinjewadi, 4 BHK flats in Hinjewadi, Premium homes in Hinjewadi Pune, Best township project in Pune, 400 Acres of Community Living, Integrated Townships in Pune, Real Estate Developer Company in Pune"
                canonical="/"
                schema={schema}
            />
            
            {/* Phase 1: Identity & Entry */}
            <HeroSlider />
            <PersonalizedDashboard />
            <ResidentPulse />

            {/* Phase 2: Immersive Exploration (Protected) */}
            <NeuralErrorBoundary>
                <MasterPlan />
            </NeuralErrorBoundary>

            <NeuralErrorBoundary>
                <AerialTour />
            </NeuralErrorBoundary>

            <NeuralErrorBoundary>
                <SectorMesh />
            </NeuralErrorBoundary>

            {/* Phase 3: Product & Conversion */}
            <section className="py-12 md:py-20 bg-gray-50" aria-label="Featured Township Projects">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-secondary">Kolte Patil Life Republic Township Hinjewadi</h2>
                        <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-6">
                            Experience the finest living at <strong>Kolte Patil Life Republic Township Hinjewadi</strong>. Discover our diverse range of 2, 3, 4 BHK flats and luxury villas, designed to offer a unique lifestyle in Pune's most integrated township.
                        </p>
                        <div className="mb-10 flex justify-center">
                            <Link to="/township-guide" className="inline-flex items-center gap-2 text-accent font-bold border-b-2 border-accent/20 hover:border-accent pb-1 transition-all group">
                                Read the Ultimate Township Guide 2026 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} priority={index < 3} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/projects">
                            <Button variant="primary" size="lg" className="gap-2">
                                View All Projects <ArrowRight size={20} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Phase 4: Market Authority */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white relative overflow-hidden" aria-label="Hinjewadi Investment Location Advantage">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[100px]"></div>
                </div>
                <div className="absolute inset-0 bg-[url('/images/gallery/eros/master-layout.webp')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Hinjewadi: A Real Estate Investment Hotspot</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
                        <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                            Connected to the world, yet a world of its own. Located in the heart of Hinjewadi, a prime real estate corridor, Kolte Patil Life Republic Township offers unmatched connectivity and property value appreciation. Request the <strong>Price List 2026</strong> today.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Briefcase, title: 'Work', desc: 'Rajiv Gandhi IT Park', time: '10 Mins', gradient: 'from-blue-500/20 to-cyan-500/5', border: 'border-blue-500/30', text: 'text-blue-400', bgIcon: 'bg-blue-500/20 text-blue-400', glow: 'bg-blue-500/20', glowHover: 'group-hover:bg-blue-500/30' },
                            { icon: Plane, title: 'Connect', desc: 'Mumbai-Pune Expy', time: '15 Mins', gradient: 'from-orange-500/20 to-amber-500/5', border: 'border-orange-500/30', text: 'text-orange-400', bgIcon: 'bg-orange-500/20 text-orange-400', glow: 'bg-orange-500/20', glowHover: 'group-hover:bg-orange-500/30' },
                            { icon: GraduationCap, title: 'Learn', desc: 'Anisha Global School', time: 'Inside', gradient: 'from-green-500/20 to-emerald-500/5', border: 'border-green-500/30', text: 'text-green-400', bgIcon: 'bg-green-500/20 text-green-400', glow: 'bg-green-500/20', glowHover: 'group-hover:bg-green-500/30' },
                            { icon: HeartPulse, title: 'Care', desc: 'Ruby Hall Clinic', time: '15 Mins', gradient: 'from-rose-500/20 to-pink-500/5', border: 'border-rose-500/30', text: 'text-rose-400', bgIcon: 'bg-rose-500/20 text-rose-400', glow: 'bg-rose-500/20', glowHover: 'group-hover:bg-rose-500/30' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className={`relative overflow-hidden p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 group bg-gradient-to-br ${item.gradient} ${item.border} hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)]`}
                            >
                                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[50px] transition-all duration-500 ${item.glow} ${item.glowHover}`}></div>
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${item.bgIcon}`}>
                                    <item.icon size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-white transition-colors">{item.title}</h3>
                                <p className="text-gray-400 mb-4 font-light text-sm">{item.desc}</p>
                                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-black/30 border border-white/10 ${item.text}`}>
                                    {item.time}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <InfraTracker />
            <RecommendedProjects />

            {/* Phase 5: Architectural Monograph */}
            <section className="py-16 md:py-32 bg-white overflow-hidden" aria-label="Township Architecture and Volumes">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-20 items-start">
                        <div className="lg:w-1/3 lg:sticky lg:top-32">
                            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-accent text-[10px] font-bold uppercase tracking-[0.5em] block mb-6">Foundation & Flow</motion.span>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary leading-[1.1] mb-8">Township <br />Volumes</h2>
                            <p className="text-gray-500 text-lg font-light leading-relaxed mb-10">A 390-acre masterplan designed around the principles of <strong>spatial harmony</strong>, <strong>tectonic integrity</strong>, and <strong>sustainable community flow</strong>.</p>
                            <div className="flex flex-col gap-8">
                                {[
                                    { label: '01', title: 'Macro Infrastructure', desc: 'A 150ft wide spine road connecting the entire ecosystem.' },
                                    { label: '02', title: 'Micro Habitats', desc: 'Lush green clusters designed for intimate community living.' },
                                    { label: '03', title: 'Neural Connectivity', desc: 'Seamless integration with Pune Metro and Mumbai-Pune Expressway.' }
                                ].map((vol, idx) => (
                                    <div key={idx} className="group cursor-pointer">
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className="text-accent font-bold text-xs font-sans tracking-tighter">{vol.label}</span>
                                            <h4 className="text-secondary font-bold uppercase text-xs tracking-widest group-hover:text-accent transition-colors">{vol.title}</h4>
                                        </div>
                                        <div className="w-full h-[1px] bg-gray-100 group-hover:bg-accent transition-colors"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden relative group">
                                <img loading="lazy" src="/images/gallery/nature-nest.webp" alt="Infrastructure" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
                                <div className="absolute bottom-10 left-10 text-white z-10"><h3 className="text-3xl font-serif font-bold mb-2">The Park</h3><p className="text-xs uppercase tracking-widest text-white/70">3.5 Acre Urban Lung</p></div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} className="aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden relative group md:mt-20">
                                <img loading="lazy" src="/images/gallery/clubhouse.webp" alt="Community" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
                                <div className="absolute bottom-10 left-10 text-white z-10"><h3 className="text-3xl font-serif font-bold mb-2">The Club</h3><p className="text-xs uppercase tracking-widest text-white/70">Social Synthesis</p></div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <ConstructionUpdates />
            <RecentlyViewed />
            <AmenitiesCarousel />
            <FAQ />
            <TestimonialCarousel />

            {/* Phase 6: Deep Content & SEO */}
            <section className="py-12 md:py-20 bg-primary/20" aria-label="About Kolte Patil Life Republic">
                <div className="container mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-secondary">About Kolte Patil Life Republic Township</h2>
                        <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                        <div className="max-w-5xl mx-auto text-left space-y-6 text-gray-600 leading-relaxed text-lg">
                            <p><strong>Kolte Patil Life Republic</strong> is a premium 390+ acre integrated township located in the heart of <strong>Hinjewadi, Pune</strong>. Developed by the renowned Kolte Patil Developers, this township is designed to offer a holistic lifestyle with world-class amenities, smart infrastructure, and lush green surroundings near Rajiv Gandhi Infotech Park.</p>
                            <p>The township offers a wide range of residential options including <strong>2 BHK, 3 BHK, and 4 BHK flats in Hinjewadi</strong>, as well as exclusive villas and row houses. With sectors like <strong>Life Republic Atmos</strong>, <strong>Life Republic Aros</strong>, and <strong>Life Republic Arezo</strong>, homebuyers can choose from under-construction and <strong>ready possession flats in Pune</strong>.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-12 md:py-20 bg-secondary overflow-hidden relative" aria-label="Community Hub">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl md:rounded-[3rem] p-6 md:p-16 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Join Pune's Most Vibrant Township Community</h2>
                            <p className="text-lg text-white/60 mb-8 max-w-xl">From weekend organic markets to sunrise yoga in the 3.5-acre Urban Park, life at Life Republic is more than just a home—it's a movement.</p>
                            <Link to="/community-hub" className="inline-flex items-center gap-2 bg-white text-secondary px-8 py-4 rounded-full font-bold hover:bg-accent transition-all">Explore Resident Hub <ArrowRight size={18} /></Link>
                        </div>
                    </div>
                </div>
            </section>

            <BrochureEngine />

            <section className="py-16 md:py-32 bg-gray-50 overflow-hidden" aria-label="Neural Architecture Gallery">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <NeuralGallery 
                            title="The Living Volume"
                            images={{
                                day: '/images/aerial-night.png'
                            }}
                        />
                    </div>
                </div>
            </section>

            <CommunityCalendar />

            {/* Popular Searches Footer */}
            <section className="py-12 bg-gray-100 border-t border-gray-200" aria-label="Popular Real Estate Searches">
                <div className="container mx-auto px-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Popular Searches</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-700">By Configuration</h4>
                            <ul className="space-y-1 text-gray-500">
                                <li><Link to="/2-bhk-flats-in-hinjewadi" className="hover:text-accent">2 BHK Flats in Hinjewadi</Link></li>
                                <li><Link to="/3-bhk-flats-in-hinjewadi" className="hover:text-accent">3 BHK Flats in Hinjewadi</Link></li>
                                <li><Link to="/4-bhk-flats-in-hinjewadi" className="hover:text-accent">4 BHK Villas in Hinjewadi</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-700">By Location</h4>
                            <ul className="space-y-1 text-gray-500">
                                <li><Link to="/location/flats-near-marunji" className="hover:text-accent">Flats in Marunji</Link></li>
                                <li><Link to="/location/flats-near-wakad" className="hover:text-accent">Flats near Wakad</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
