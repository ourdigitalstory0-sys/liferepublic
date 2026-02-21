import React, { useMemo } from 'react';
import { Button } from '../components/ui/Button';
import { ArrowRight, Briefcase, Plane, GraduationCap, HeartPulse, Dumbbell, Trees, Music, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import type { Project } from '../lib/types';
import { ProjectCard } from '../components/ui/ProjectCard';
import { HeroSlider } from '../components/sections/HeroSlider';
import { AmenitiesCarousel } from '../components/sections/AmenitiesCarousel';
import { FAQ } from '../components/sections/FAQ';
import { SEO } from '../components/seo/SEO';
import { generateCollectionSchema } from '../utils/schemaGenerator';

const Home: React.FC = () => {
    const [featuredProjects, setFeaturedProjects] = React.useState<Project[]>([]);

    React.useEffect(() => {
        const loadProjects = async () => {
            try {
                // Optimized fetch: only get 3 featured projects with light data
                const data = await api.projects.getFeatured(3);

                if (data && data.length > 0) {
                    setFeaturedProjects(data);
                }
            } catch (error) {
                console.error('Failed to load projects from API:', error);
            }
        };
        loadProjects();
    }, []);

    // Generate dynamic schema based on fetched projects
    const schema = useMemo(() => {
        if (featuredProjects.length > 0) {
            return generateCollectionSchema(featuredProjects);
        }
        // Fallback or initial schema
        return {
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Kolte Patil Life Republic",
            "url": "https://life-republic.in/",
            "description": "Kolte Patil Life Republic is a 390+ acre integrated township in Hinjewadi, Pune offering 1, 2, 3 BHK flats, villas, and row houses."
        };
    }, [featuredProjects]);

    return (
        <div className="w-full">
            <SEO
                description="Official Guide to Life Republic by Kolte Patil. Explore 2, 3, 4 BHK flats and villas in Hinjewadi. Check current pricing, floor plans, possession dates, and latest reviews."
                keywords="Kolte Patil Life Republic Township Hinjewadi, Life Republic Price, Life Republic Hinjewadi Location, 2 BHK in Hinjewadi, 3 BHK in Hinjewadi, 4 BHK Villas in Pune, Life Republic Atmos, Life Republic Aros"
                canonical="/"
                schema={schema}
            />
            {/* Hero Section */}
            <HeroSlider />

            {/* Featured Projects Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold mb-4 text-secondary">Kolte Patil Life Republic Township Hinjewadi</h2>
                        <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Experience the finest living at <strong>Kolte Patil Life Republic Township Hinjewadi</strong>. Discover our diverse range of 2, 3, 4 BHK flats and luxury villas, designed to offer a unique lifestyle in Pune's most integrated township.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} priority={index < 3} />
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
            <section className="py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white relative overflow-hidden">
                {/* Background Blobs for specific color splash */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="absolute inset-0 bg-[url('https://liferepublic.in/images/gallery/eros/master-layout.webp')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Hinjewadi: A Real Estate Investment Hotspot</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
                        <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                            Connected to the world, yet a world of its own. Located in the heart of Hinjewadi, a prime real estate corridor, Kolte Patil Life Republic Township offers unmatched connectivity and property value appreciation.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Briefcase,
                                title: 'Work',
                                desc: 'Rajiv Gandhi IT Park',
                                time: '10 Mins',
                                gradient: 'from-blue-500/20 to-cyan-500/5',
                                border: 'border-blue-500/30',
                                text: 'text-blue-400',
                                bgIcon: 'bg-blue-500/20 text-blue-400',
                                glow: 'bg-blue-500/20',
                                glowHover: 'group-hover:bg-blue-500/30'
                            },
                            {
                                icon: Plane,
                                title: 'Connect',
                                desc: 'Mumbai-Pune Expy',
                                time: '15 Mins',
                                gradient: 'from-orange-500/20 to-amber-500/5',
                                border: 'border-orange-500/30',
                                text: 'text-orange-400',
                                bgIcon: 'bg-orange-500/20 text-orange-400',
                                glow: 'bg-orange-500/20',
                                glowHover: 'group-hover:bg-orange-500/30'
                            },
                            {
                                icon: GraduationCap,
                                title: 'Learn',
                                desc: 'Anisha Global School',
                                time: 'Inside',
                                gradient: 'from-green-500/20 to-emerald-500/5',
                                border: 'border-green-500/30',
                                text: 'text-green-400',
                                bgIcon: 'bg-green-500/20 text-green-400',
                                glow: 'bg-green-500/20',
                                glowHover: 'group-hover:bg-green-500/30'
                            },
                            {
                                icon: HeartPulse,
                                title: 'Care',
                                desc: 'Ruby Hall Clinic',
                                time: '15 Mins',
                                gradient: 'from-rose-500/20 to-pink-500/5',
                                border: 'border-rose-500/30',
                                text: 'text-rose-400',
                                bgIcon: 'bg-rose-500/20 text-rose-400',
                                glow: 'bg-rose-500/20',
                                glowHover: 'group-hover:bg-rose-500/30'
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className={`
                                    relative overflow-hidden p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 group
                                    bg-gradient-to-br ${item.gradient} ${item.border}
                                    hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)]
                                `}
                            >
                                {/* Hover Glow Effect */}
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

            {/* Life at Republic (Bento Grid) */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-serif font-bold mb-4 text-secondary">Life at Kolte Patil Life Republic</h2>
                        <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                            Discover a world beyond just a home. <strong>Life Republic Township</strong> offers an ecosystem designed for a holistic lifestyle, blending <strong>urban luxury</strong> with nature's tranquility in the heart of <strong>Hinjewadi, Pune</strong>.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {/* Large Item */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between h-64 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 to-secondary/50 z-10"></div>
                            <img src="https://liferepublic.in/images/gallery/nature-nest.webp" alt="Nature" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="relative z-20 text-white">
                                <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <Trees size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">3.5 Acre Urban Park</h3>
                                <p className="text-gray-100 font-medium leading-relaxed">
                                    Refresh your senses in our massive <strong>3.5-acre Urban Park</strong>, a green lung featuring over <strong>7,700 trees</strong>, botanical gardens, and jogging tracks. Perfect for morning walks and weekend family picnics within the township.
                                </p>
                            </div>
                        </motion.div>

                        {/* Standard Item */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-secondary text-white rounded-2xl p-8 shadow-md border border-secondary flex flex-col justify-center h-64 group relative overflow-hidden"
                        >
                            {/* Decorative Background Element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 text-accent">
                                <Dumbbell size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">World-Class Sports Arena</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Stay active with our <strong>Olympic-size swimming pool</strong>, professional cricket pitch, tennis courts, and a 4km spine road dedicated to cycling and jogging enthusiasts.
                            </p>
                        </motion.div>

                        {/* Standard Item */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 flex flex-col justify-center h-64 group relative overflow-hidden"
                        >
                            {/* Decorative Background Element */}
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl -ml-5 -mb-5 pointer-events-none"></div>

                            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 text-accent">
                                <Music size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-2">United Sky Theatre</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Experience culture and community at the <strong>Open-Air Amphitheatre</strong>. From festive celebrations to cultural nights, it's the vibrant heart of social life at <strong>Life Republic</strong>.
                            </p>
                        </motion.div>

                        {/* Large Item */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between h-64 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/95 to-accent/50 z-10"></div>
                            <img src="https://liferepublic.in/images/gallery/clubhouse.webp" alt="Clubhouse" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="relative z-20 text-white">
                                <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Smart & Secure Living</h3>
                                <p className="text-gray-100 font-medium leading-relaxed">
                                    Your safety is our priority. With <strong>multi-tier security</strong>, a dedicated fire station, and the smart <strong>'Planet App'</strong> for seamless community management, enjoy peace of mind in a secure <strong>gated community in Hinjewadi</strong>.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Amenities Section */}
            <AmenitiesCarousel />

            {/* FAQ Section */}
            <FAQ />

            {/* About Section */}
            <section className="py-20 bg-primary/20">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-serif font-bold mb-6 text-secondary">About Kolte Patil Life Republic Township</h2>
                        <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                        <div className="max-w-5xl mx-auto text-left space-y-6 text-gray-600 leading-relaxed text-lg">
                            <p>
                                <strong>Kolte Patil Life Republic</strong> is a premium 390+ acre integrated township located in the heart of <strong>Hinjewadi, Pune</strong>. Developed by the renowned Kolte Patil Developers, this township is designed to offer a holistic lifestyle with world-class amenities, smart infrastructure, and lush green surroundings near Rajiv Gandhi Infotech Park.
                            </p>
                            <p>
                                The township offers a wide range of residential options including <strong>2 BHK, 3 BHK, and 4 BHK flats in Hinjewadi</strong>, as well as exclusive villas and row houses. With sectors like <strong>Life Republic Atmos</strong>, <strong>Life Republic Aros</strong>, and <strong>Life Republic Arezo</strong>, homebuyers can choose from under-construction and <strong>ready possession flats in Pune</strong>.
                            </p>

                            <h3 className="text-2xl font-bold text-secondary mt-8">Price Trends & Configuration</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h4 className="font-bold text-accent mb-2">2 BHK Apartments</h4>
                                    <p className="text-sm">Starting from <span className="text-secondary font-bold">₹72 Lakhs*</span></p>
                                    <p className="text-xs text-gray-500 mt-1">Carpet: 629 - 887 sq. ft.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h4 className="font-bold text-accent mb-2">3 BHK Premium</h4>
                                    <p className="text-sm">Starting from <span className="text-secondary font-bold">₹1.05 Cr*</span></p>
                                    <p className="text-xs text-gray-500 mt-1">Carpet: 1000 - 1500+ sq. ft.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h4 className="font-bold text-accent mb-2">4 BHK & Villas</h4>
                                    <p className="text-sm">Starting from <span className="text-secondary font-bold">₹2.0 Cr*</span></p>
                                    <p className="text-xs text-gray-500 mt-1">Carpet: 1700 - 2500+ sq. ft.</p>
                                </div>
                            </div>

                            <p className="mt-6">
                                With possession dates ranging from <strong>December 2025 (Arezo)</strong> to <strong>December 2027 (Atmos)</strong>, Life Republic is the perfect choice for real estate investment in Hinjewadi. The community boasts a 3.5-acre Urban Park, a 150ft wide spine road, and seamless connectivity to the Mumbai-Pune Expressway.
                            </p>
                        </div>
                        <div className="inline-block p-4 bg-white rounded-lg shadow-sm border border-gray-100 mt-8">
                            <span className="text-accent font-bold">RERA Registered</span> | Award Winning Township | <span className="text-secondary font-bold">Call +91 77440 09295</span>
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* Deep Web Data Content Sections (SEO Focused) */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Investment Analysis */}
                        <div>
                            <h3 className="text-2xl font-serif font-bold mb-4 text-secondary">Why Invest in Life Republic Hinjewadi?</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                <strong>Kolte Patil Life Republic</strong> is a prime investment destination. Market analysis for <strong>2025</strong> predicts a property appreciation of <strong>10-12%</strong> in Hinjewadi, driven by the upcoming Metro Line and Ring Road.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Investors can expect a robust <strong>rental yield of 5-7%</strong>, significantly higher than Wakad or Baner. With over 230 IT companies in Rajiv Gandhi Infotech Park, tenant occupancy is consistently near 100%.
                            </p>
                        </div>

                        {/* Township vs Standalone */}
                        <div>
                            <h3 className="text-2xl font-serif font-bold mb-4 text-secondary">Township vs Standalone Buildings</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Choosing a flat in a township like <strong>Life Republic</strong> ensures you are not just buying four walls but a lifestyle. Unlike standalone buildings in <strong>Wakad</strong> or <strong>Marunji</strong>, residents here enjoy:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li><strong>24x7 Security & Surveillance</strong>: A safe haven for families.</li>
                                <li><strong>Walk-to-Work Concept</strong>: Proximity to Rajiv Gandhi Infotech Park reducing commute stress.</li>
                                <li><strong>Social Infrastructure</strong>: Anisha Global School and Fire Station within the campus.</li>
                            </ul>
                        </div>
                    </div>

                    {/* FAQ Schema Expansion Content (Visible) */}
                    <div className="mt-12">
                        <h3 className="text-2xl font-serif font-bold mb-6 text-secondary text-center">Frequently Asked Questions</h3>
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h4 className="font-bold text-lg mb-2">How far is Life Republic from Hinjewadi Phase 1?</h4>
                                <p className="text-gray-600">Life Republic is approximately <strong>4.5 km</strong> from Hinjewadi Phase 1, making it a 10-15 minute drive via the main Marunji road. Connectivity spans Phase 1, 2, and 3 effortlessly.</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h4 className="font-bold text-lg mb-2">Is water supply a problem in Life Republic?</h4>
                                <p className="text-gray-600">No, unlike many standalone societies in Hinjewadi, Life Republic has a robust water management system with PMRDA water connection and dedicated treatment plants, ensuring consistent supply.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Internal Linking / Popular Searches */}
            <section className="py-12 bg-gray-100 border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Popular Searches</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-700">By Configuration</h4>
                            <ul className="space-y-1">
                                <li><a href="/2-bhk-flats-in-hinjewadi" className="text-gray-500 hover:text-accent">2 BHK Flats in Hinjewadi</a></li>
                                <li><a href="/3-bhk-flats-in-hinjewadi" className="text-gray-500 hover:text-accent">3 BHK Flats in Hinjewadi</a></li>
                                <li><a href="/4-bhk-flats-in-hinjewadi" className="text-gray-500 hover:text-accent">4 BHK Villas in Hinjewadi</a></li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-700">By Location</h4>
                            <ul className="space-y-1">
                                <li><a href="/location/flats-near-marunji" className="text-gray-500 hover:text-accent">Flats in Marunji</a></li>
                                <li><a href="/location/flats-near-punawale" className="text-gray-500 hover:text-accent">Flats in Punawale</a></li>
                                <li><a href="/location/flats-near-wakad" className="text-gray-500 hover:text-accent">Flats near Wakad</a></li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-700">Investment</h4>
                            <ul className="space-y-1">
                                <li><a href="/nri-corner" className="text-gray-500 hover:text-accent">NRI Investment Pune</a></li>
                                <li><a href="/location-highlights" className="text-gray-500 hover:text-accent">Hinjewadi Location Analysis</a></li>
                                <li><a href="/amenities" className="text-gray-500 hover:text-accent">Township Amenities</a></li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-700">Projects</h4>
                            <ul className="space-y-1">
                                {featuredProjects.slice(0, 3).map(p => (
                                    <li key={p.id}><a href={`/projects/${p.id}`} className="text-gray-500 hover:text-accent">{p.title}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
