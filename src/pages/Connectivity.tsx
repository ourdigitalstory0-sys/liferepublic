import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Train, Milestone, School, ShieldCheck, HeartPulse, Trees } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { SectorComparison } from '../components/sections/SectorComparison';

export const Connectivity: React.FC = () => {
    const [isPeakHour, setIsPeakHour] = React.useState(false);

    const landmarks = [
        { name: "Phase 1 IT Park", distance: "4.5 km", offPeak: "10 mins", peak: "18 mins", type: "Work" },
        { name: "Phase 2 IT Park", distance: "6.2 km", offPeak: "15 mins", peak: "25 mins", type: "Work" },
        { name: "Blue Ridge School", distance: "3.8 km", offPeak: "8 mins", peak: "12 mins", type: "Education" },
        { name: "Pheonix Marketcity (Upcoming)", distance: "5.5 km", offPeak: "12 mins", peak: "20 mins", type: "Retail" },
        { name: "Mumbai-Pune Expressway", distance: "7.0 km", offPeak: "12 mins", peak: "15 mins", type: "Transit" },
        { name: "Hinjewadi Metro Station", distance: "2.5 km", offPeak: "5 mins", peak: "8 mins", type: "Transit" }
    ];

    const connectivityData = [
        {
            icon: Milestone,
            title: "150ft Wide Spine Road",
            description: "The backbone of Life Republic, connecting the township directly to the Mumbai-Pune Expressway and Hinjewadi IT Park.",
            detail: "Self-sufficient internal road network."
        },
        {
            icon: Train,
            title: "Pune Metro Line 3",
            description: "The upcoming Hinjewadi-Shivajinagar Metro Line 3 will have a station just minutes away, ensuring rapid city-wide access.",
            detail: "Connectivity to 23 metro stations."
        },
        {
            icon: MapPin,
            title: "Rajiv Gandhi IT Park",
            description: "Strategically located within minutes of Hinjewadi Phase 1, 2, and 3, reducing commute time to the world's leading IT hubs.",
            detail: "Walking distance for many sectors."
        }
    ];

    const infrastructureData = [
        {
            icon: School,
            title: "Anisha Global School",
            description: "A world-class educational institution located right within the township, offering premium education for your children.",
            category: "Education"
        },
        {
            icon: ShieldCheck,
            title: "Dedicated Fire Station",
            description: "A fully functional fire station within the township ensures maximum safety and rapid emergency response 24/7.",
            category: "Safety"
        },
        {
            icon: HeartPulse,
            title: "Healthcare Proximity",
            description: "Leading hospitals like Ruby Hall Clinic and Sanjeevani Hospital are within a 15-minute radius of the township.",
            category: "Healthcare"
        },
        {
            icon: Trees,
            title: "3.5 Acre Urban Park",
            description: "One of Pune's largest township parks with 7,700+ trees, promoting a healthy and green living environment.",
            category: "Environment"
        }
    ];

    return (
        <div className="bg-white">
            <SEO 
                title="Connectivity & Infrastructure | Kolte Patil Life Republic Township Hinjewadi"
                description="Explore the world-class connectivity of Kolte Patil Life Republic. 150ft wide spine road, proximity to Hinjewadi Metro Line 3, and integrated township infrastructure."
                keywords="Life Republic Connectivity, Hinjewadi Metro Line 3, Life Republic Spine Road, Flats near IT Park Hinjewadi, Hinjewadi Infrastructure"
            />

            {/* Hero Section */}
            <section className="relative py-20 bg-secondary overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/gallery/nature-nest.webp')] bg-cover bg-center opacity-20"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
                    >
                        Connected to the Future
                    </motion.h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Kolte Patil Life Republic Township Hinjewadi is built on a foundation of smart connectivity and world-class infrastructure. Experience seamless travel and modern facilities within a 390+ acre ecosystem.
                    </p>
                </div>
            </section>

            {/* Landmark Proximity Matrix (Phase 12) */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                        <div className="max-w-xl">
                            <h2 className="text-3xl font-serif font-bold text-secondary mb-4">Landmark Proximity Matrix</h2>
                            <p className="text-gray-600">Real-time travel estimates from the 390-acre township entrance to Hinjewadi's core hubs.</p>
                        </div>
                        <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                            <span className={`text-sm font-bold ${!isPeakHour ? 'text-accent' : 'text-gray-400'}`}>Off-Peak</span>
                            <button 
                                onClick={() => setIsPeakHour(!isPeakHour)}
                                className={`w-14 h-7 rounded-full relative transition-colors ${isPeakHour ? 'bg-orange-500' : 'bg-green-500'}`}
                            >
                                <motion.div 
                                    animate={{ x: isPeakHour ? 28 : 4 }}
                                    className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
                                />
                            </button>
                            <span className={`text-sm font-bold ${isPeakHour ? 'text-orange-500' : 'text-gray-400'}`}>Peak Hour</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {landmarks.map((landmark, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-bold text-accent uppercase tracking-widest">{landmark.type}</span>
                                    <span className="text-sm font-bold text-secondary">{landmark.distance}</span>
                                </div>
                                <h4 className="text-lg font-bold text-secondary mb-4 group-hover:text-accent transition-colors">{landmark.name}</h4>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-sm text-gray-500">Est. Travel Time</span>
                                    <span className={`text-lg font-bold ${isPeakHour ? 'text-orange-500' : 'text-green-600'}`}>
                                        {isPeakHour ? landmark.peak : landmark.offPeak}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Ecosystem Mapping (Phase 13) */}
            <section className="py-20 bg-gray-50/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-secondary mb-4">Strategic Ecosystem Mapping</h2>
                        <p className="text-gray-600">Spatial visualization of Life Republic's dominance in the Hinjewadi IT corridor.</p>
                    </div>

                    <div className="relative max-w-4xl mx-auto aspect-video bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden p-8 flex items-center justify-center">
                        <svg viewBox="0 0 800 450" className="w-full h-full">
                            {/* Connection Lines */}
                            <motion.path 
                                d="M 400 225 L 150 100" stroke="#C5A059" strokeWidth="1" strokeDasharray="4 4" 
                                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                            />
                            <motion.path 
                                d="M 400 225 L 650 100" stroke="#C5A059" strokeWidth="1" strokeDasharray="4 4"
                                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                            />
                            <motion.path 
                                d="M 400 225 L 150 350" stroke="#C5A059" strokeWidth="1" strokeDasharray="4 4"
                                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                            />
                            <motion.path 
                                d="M 400 225 L 650 350" stroke="#C5A059" strokeWidth="1" strokeDasharray="4 4"
                                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                            />

                            {/* Center Point - Life Republic */}
                            <g className="cursor-pointer">
                                <motion.circle 
                                    cx="400" cy="225" r="40" fill="#2c3e50" 
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} 
                                />
                                <motion.circle 
                                    cx="400" cy="225" r="50" stroke="#C5A059" strokeWidth="2" fill="none"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                <text x="400" y="275" textAnchor="middle" className="text-[12px] font-bold fill-secondary uppercase tracking-widest">Life Republic</text>
                            </g>

                            {/* Landmark Points */}
                            <g>
                                <circle cx="150" cy="100" r="8" fill="#C5A059" />
                                <text x="150" y="80" textAnchor="middle" className="text-[10px] font-bold fill-gray-500 uppercase">Phase 1 IT Park (10m)</text>
                            </g>
                            <g>
                                <circle cx="650" cy="100" r="8" fill="#C5A059" />
                                <text x="650" y="80" textAnchor="middle" className="text-[10px] font-bold fill-gray-500 uppercase">Metro Station (5m)</text>
                            </g>
                            <g>
                                <circle cx="150" cy="350" r="8" fill="#C5A059" />
                                <text x="150" y="380" textAnchor="middle" className="text-[10px] font-bold fill-gray-500 uppercase">Phase 2 IT Park (15m)</text>
                            </g>
                            <g>
                                <circle cx="650" cy="350" r="8" fill="#C5A059" />
                                <text x="650" y="380" textAnchor="middle" className="text-[10px] font-bold fill-gray-500 uppercase">Expressway (12m)</text>
                            </g>
                        </svg>
                        
                        <div className="absolute top-6 right-6 bg-secondary text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-xl">
                            Interactive Network
                        </div>
                    </div>
                </div>
            </section>

            {/* Connectivity Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {connectivityData.map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-4">{item.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                                <div className="text-sm font-bold text-accent uppercase tracking-wider">{item.detail}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Infrastructure Details */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary mb-4">Integrated Infrastructure</h2>
                        <p className="text-gray-600">A township designed for a self-sufficient and sustainable lifestyle.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {infrastructureData.map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex gap-6 p-6 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex-shrink-0 w-14 h-14 bg-secondary/5 rounded-full flex items-center justify-center text-secondary">
                                    <item.icon size={28} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-accent uppercase tracking-widest mb-1">{item.category}</div>
                                    <h3 className="text-xl font-bold text-secondary mb-2">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sector Comparison */}
            <SectorComparison />

            {/* CTA Section */}
            <section className="py-20 bg-primary/20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-serif font-bold text-secondary mb-6">Experience the Township Lifestyle</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join 12,000+ happy families living in Pune's most celebrated integrated township.
                    </p>
                    <a 
                        href="/contact" 
                        className="inline-block bg-secondary text-white px-10 py-4 rounded-full font-bold hover:bg-secondary/90 transition-colors"
                    >
                        Book a Site Visit
                    </a>
                </div>
            </section>
        </div>
    );
};
