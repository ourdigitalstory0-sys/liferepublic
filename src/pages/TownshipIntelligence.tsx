import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { MapPin, Zap, Train, Car, Building2, TrendingUp, ShieldCheck, Waves } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SectorMesh } from '../components/sections/SectorMesh';
import { InfraTracker } from '../components/sections/InfraTracker';

const stats = [
    { label: 'Township Area', value: '390+ Acres', icon: MapPin },
    { label: 'Smart Infrastructure', value: 'Ready', icon: Zap },
    { label: 'Metro Connectivity', value: 'Proximity', icon: Train },
    { label: 'Project Status', value: 'Expansion', icon: TrendingUp },
];

const connectivityPoints = [
    { title: 'Hinjewadi Phase 1, 2, 3', distance: '5-10 Mins', icon: MapPin },
    { title: 'Pune-Mumbai Expressway', distance: '15 Mins', icon: Car },
    { title: 'Upcoming Metro Line 3', distance: 'Walking Distance', icon: Train },
    { title: 'Elite Schools', distance: 'On-site', icon: Building2 },
];

export const TownshipIntelligence: React.FC = () => {
    return (
        <div className="pt-20">
            <SEO 
                title="Hinjewadi Infrastructure & Township Intelligence | Kolte Patil Life Republic"
                description="Explore the advanced infrastructure and strategic connectivity of Kolte Patil Life Republic, the definitive 390-acre township in Hinjewadi, Pune. Expert data on metro, ROI, and growth."
                keywords="Hinjewadi infrastructure, Life Republic connectivity, Pune township growth, real estate ROI Hinjewadi, Hinjewadi Metro Line 3"
            />
            <Breadcrumbs />
            
            {/* Hero Section */}
            <section className="relative py-24 bg-secondary overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-gold.svg')] opacity-5"></div>
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-accent font-bold tracking-widest uppercase text-sm block mb-4"
                        >
                            The Definitive Powerhouse
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight"
                        >
                            Township Intelligence & <br />
                            <span className="text-accent">Hinjewadi Infrastructure</span>
                        </motion.h1>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
                            Kolte Patil Life Republic is more than a residential project; it's a strategically architected ecosystem designed for the future of Pune.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100"
                            >
                                <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                    <stat.icon size={24} />
                                </div>
                                <div className="text-2xl font-bold text-secondary mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sovereign Growth Infrastructure Tracker (Phase 5 SEO) */}
            <InfraTracker />

            {/* Intelligence Clusters */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-8">Infrastructure That Redefines Living</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center flex-shrink-0 text-accent border border-gray-100">
                                        <Waves size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-secondary mb-2">Sustainable Ecosystem</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Large-scale water management, solar lighting, and waste treatment plants ensure the township remains ecologically viable for generations.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center flex-shrink-0 text-accent border border-gray-100">
                                        <ShieldCheck size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-secondary mb-2">Multi-Tier Security</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Integrated command center monitoring 24/7, app-controlled access, and rapid response teams across the 400-acre domain.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center flex-shrink-0 text-accent border border-gray-100">
                                        <Zap size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-secondary mb-2">Fiber-to-Home Ready</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Ultra-high-speed connectivity pre-installed throughout the township, supporting the modern remote-work evolution.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <img 
                                src="/images/home/township-overview.webp" 
                                alt="Life Republic Infrastructure Overview" 
                                className="w-full h-auto rounded-3xl shadow-2xl"
                            />
                            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-xs md:block hidden">
                                <p className="text-gray-500 italic text-sm mb-4">"Life Republic is the definitive answer to Pune's explosive growth in the West."</p>
                                <span className="font-bold text-secondary">Urban Planning Analysis</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sovereign Comparison Engine */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-accent font-bold tracking-widest uppercase text-sm block mb-4">Strategic Benchmarking</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary mb-4">Life Republic vs. The Market</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            A data-driven comparison of Hinjewadi's leading residential destinations.
                        </p>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-3xl overflow-hidden shadow-xl border-collapse">
                            <thead>
                                <tr className="bg-secondary text-white">
                                    <th className="p-8 text-left text-lg font-serif">Key Parameter</th>
                                    <th className="p-8 text-center text-lg font-serif bg-accent/20 text-accent">Life Republic</th>
                                    <th className="p-8 text-center text-lg font-serif opacity-60">Megapolis</th>
                                    <th className="p-8 text-center text-lg font-serif opacity-60">Godrej Hinjewadi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="p-8 font-bold text-secondary">Township Size</td>
                                    <td className="p-8 text-center bg-accent/5 font-bold text-secondary font-serif">400+ Acres</td>
                                    <td className="p-8 text-center text-gray-500">150 Acres</td>
                                    <td className="p-8 text-center text-gray-500">Standalone Clusters</td>
                                </tr>
                                <tr>
                                    <td className="p-8 font-bold text-secondary">Infrastructure Type</td>
                                    <td className="p-8 text-center bg-accent/5 font-bold text-secondary">Integrated (Self-Sustaining)</td>
                                    <td className="p-8 text-center text-gray-500">Residential Focused</td>
                                    <td className="p-8 text-center text-gray-500">Luxury High-rise</td>
                                </tr>
                                <tr>
                                    <td className="p-8 font-bold text-secondary">Open Space %</td>
                                    <td className="p-8 text-center bg-accent/5 font-bold text-secondary">70% (Greens & Reserves)</td>
                                    <td className="p-8 text-center text-gray-500">40%</td>
                                    <td className="p-8 text-center text-gray-500">30%</td>
                                </tr>
                                <tr>
                                    <td className="p-8 font-bold text-secondary">Governance</td>
                                    <td className="p-8 text-center bg-accent/5 font-bold text-secondary">Professional Township Management</td>
                                    <td className="p-8 text-center text-gray-500">Society Based</td>
                                    <td className="p-8 text-center text-gray-500">Cluster Based</td>
                                </tr>
                                <tr>
                                    <td className="p-8 font-bold text-secondary">ROI Potential (Est.)</td>
                                    <td className="p-8 text-center bg-accent/5 font-bold text-secondary text-lg">High (Sovereign Advantage)</td>
                                    <td className="p-8 text-center text-gray-500">Moderate</td>
                                    <td className="p-8 text-center text-gray-500">Moderate</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Connectivity Matrix */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">The Strategic Advantage</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Located at the junction of Hinjewadi and Marunji, offering unrivaled accessibility to IT hubs and expressways.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {connectivityPoints.map((point, idx) => (
                            <div key={idx} className="p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all group bg-white">
                                <div className="w-12 h-12 bg-gray-50 text-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                                    <point.icon size={24} />
                                </div>
                                <h3 className="font-bold text-lg text-secondary mb-2">{point.title}</h3>
                                <div className="text-accent font-bold">{point.distance}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-accent relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary mb-8">Experience Township Living</h2>
                    <p className="text-secondary/80 max-w-2xl mx-auto mb-12 text-lg">
                        Connect with our experts for a guided township tour and detailed infrastructure analysis.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="secondary" size="lg" className="rounded-full px-12">Book a Site Visit</Button>
                        <Button variant="outline" size="lg" className="rounded-full px-12 border-secondary text-secondary">Download Master Plan</Button>
                    </div>
                </div>
            </section>
            {/* Sector Mesh for SEO */}
            <SectorMesh />
        </div>
    );
};
