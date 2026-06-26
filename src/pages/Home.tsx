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
            
            {/* Phase 1: Captivation */}
            <HeroSlider />
            <ResidentPulse />

            {/* Phase 2: Introduction & Scale */}
            <section className="py-16 md:py-32 bg-gray-50 overflow-hidden relative" aria-label="Township Architecture and Volumes">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-accent/5 rounded-bl-[100%] pointer-events-none"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-accent text-xs font-bold uppercase tracking-[0.5em] block mb-6">The Masterplan</motion.span>
                            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-serif font-bold text-secondary leading-[1.1] mb-8">A 390-Acre <br /><span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Vision</span></motion.h2>
                            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-gray-500 text-lg font-light leading-relaxed mb-10"><strong>Kolte Patil Life Republic</strong> is a premium integrated township located in the heart of <strong>Hinjewadi, Pune</strong>. Designed around the principles of spatial harmony and sustainable community flow, it offers an unparalleled holistic lifestyle near Rajiv Gandhi Infotech Park.</motion.p>
                            
                            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col gap-8">
                                {[
                                    { label: '01', title: 'Macro Infrastructure', desc: 'A 150ft wide spine road connecting the entire ecosystem.' },
                                    { label: '02', title: 'Micro Habitats', desc: 'Lush green clusters designed for intimate community living.' },
                                    { label: '03', title: 'Neural Connectivity', desc: 'Seamless integration with Pune Metro and Mumbai-Pune Expressway.' }
                                ].map((vol, idx) => (
                                    <div key={idx} className="group cursor-pointer hover:pl-2 transition-all duration-300">
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className="text-accent font-bold text-xs font-sans tracking-tighter opacity-50 group-hover:opacity-100 transition-opacity">{vol.label}</span>
                                            <h4 className="text-secondary font-bold uppercase text-xs tracking-widest">{vol.title}</h4>
                                        </div>
                                        <p className="text-gray-400 text-sm pl-8 group-hover:text-gray-600 transition-colors">{vol.desc}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-2 gap-4 md:gap-8">
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="aspect-[4/5] rounded-3xl overflow-hidden relative group shadow-2xl">
                                <img loading="lazy" src="/images/gallery/nature-nest.webp" alt="Infrastructure" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors duration-500"></div>
                                <div className="absolute bottom-6 left-6 text-white transform group-hover:-translate-y-2 transition-transform duration-500">
                                    <h3 className="text-2xl font-serif font-bold">The Park</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-white/70 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">3.5 Acre Urban Lung</p>
                                </div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="aspect-[4/5] rounded-3xl overflow-hidden relative group shadow-2xl md:mt-16">
                                <img loading="lazy" src="/images/gallery/clubhouse.webp" alt="Community" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors duration-500"></div>
                                <div className="absolute bottom-6 left-6 text-white transform group-hover:-translate-y-2 transition-transform duration-500">
                                    <h3 className="text-2xl font-serif font-bold">The Club</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-white/70 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Social Synthesis</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Phase 3: The Core Offering (Projects) */}
            <section className="py-16 md:py-32 bg-white" aria-label="Featured Township Projects">
                <div className="container mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <span className="text-accent text-xs font-bold uppercase tracking-[0.5em] block mb-4">The Collection</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-secondary">
                            Life Republic <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Properties</span>
                        </h2>
                        <div className="w-16 h-1 bg-accent mx-auto mb-8 rounded-full"></div>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-10 font-light">
                            Discover our diverse range of premium properties, from ultra-luxury villas and bespoke bungalow plots to state-of-the-art smart apartments.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map((project, index) => (
                            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="hover:-translate-y-2 transition-transform duration-500">
                                <ProjectCard project={project} priority={index < 3} />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-20">
                        <Link to="/projects">
                            <Button variant="outline" size="lg" className="gap-2 px-10 py-4 text-sm tracking-[0.2em] border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300">
                                View Entire Collection <ArrowRight size={18} />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Phase 4: Lifestyle */}
            <AmenitiesCarousel />

            {/* Phase 5: Location Authority */}
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
                            Connected to the world, yet a world of its own. Located in the heart of Hinjewadi, a prime real estate corridor, Kolte Patil Life Republic Township offers unmatched connectivity and property value appreciation.
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

            {/* Phase 6: Interactive Depth */}
            <NeuralErrorBoundary>
                <MasterPlan />
            </NeuralErrorBoundary>

            {/* Phase 7: Social Proof & Trust */}
            <TestimonialCarousel />

            {/* Phase 8: Conversion & Info */}
            <FAQ />
            <BrochureEngine />

            {/* Phase 9: SEO & Discovery */}
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
