import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { Zap, School, Shield, Car } from 'lucide-react';
import townshipData from '../data/township_kb.json';
import { Button } from '../components/ui/Button';

export const TownshipIntelligence: React.FC = () => {
    const { township } = townshipData;

    return (
        <div className="pt-32 pb-20 bg-white">
            <SEO 
                title="Township Intelligence | Kolte Patil Life Republic"
                description="Explore the infrastructure, connectivity, and community intelligence of Kolte Patil Life Republic, Hinjewadi. The definitive guide to Pune's most integrated township."
                canonical="/township-intelligence"
            />

            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="max-w-4xl mb-24">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-accent text-[10px] font-bold uppercase tracking-[0.5em] block mb-6"
                    >
                        The Masterplan Intelligence
                    </motion.span>
                    <h1 className="text-6xl md:text-7xl font-serif font-bold text-secondary mb-10 leading-[1.1]">
                        Integrated <br />Ecosystem
                    </h1>
                    <p className="text-gray-500 text-xl font-light leading-relaxed max-w-2xl">
                        A systemic breakdown of Life Republic's 390-acre digital and physical infrastructure. Designed for high-velocity urban life with tranquil ecological buffers.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
                    {[
                        { label: 'Total Area', value: township.total_area },
                        { label: 'Residents', value: township.total_residents },
                        { label: 'Connectivity', value: '150ft Spine' },
                        { label: 'Ecological', value: '3.5A Park' }
                    ].map((stat, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="border-l border-gray-100 pl-8"
                        >
                            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest block mb-2">{stat.label}</span>
                            <span className="text-3xl font-serif font-bold text-secondary">{stat.value}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Intelligence Modules */}
                <div className="space-y-40">
                    {/* Module 1: Infrastructure */}
                    <section className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <div className="aspect-video bg-gray-100 rounded-[2rem] overflow-hidden relative shadow-2xl">
                                <img loading="lazy" src="/images/gallery/eros/master-layout.webp" alt="Infrastructure" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-secondary/20 mix-blend-multiply"></div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl font-serif font-bold text-secondary mb-8">Infrastructure <br />Neural Network</h2>
                            <div className="space-y-8">
                                {township.key_infrastructure.map((infra, idx) => (
                                    <div key={idx} className="flex gap-6 items-start">
                                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0 text-accent">
                                            {infra.type === 'School' && <School size={20} />}
                                            {infra.type === 'Emergency' && <Shield size={20} />}
                                            {infra.type === 'Infrastructure' && <Zap size={20} />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-secondary text-lg mb-1">{infra.name}</h4>
                                            <p className="text-gray-500 text-sm leading-relaxed">{infra.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Module 2: Connectivity Distance Matrix */}
                    <section className="bg-secondary rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[50%] h-full bg-white/5 skew-x-12 translate-x-20"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-4xl font-serif font-bold mb-16">Velocity Matrix</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                <div>
                                    <h3 className="text-accent text-[10px] font-bold uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Major Nodes</h3>
                                    <div className="space-y-6">
                                        {Object.entries(township.connectivity).map(([key, val], idx) => (
                                            <div key={idx} className="flex justify-between items-center group">
                                                <span className="text-white/60 capitalize group-hover:text-white transition-colors">{key.replace(/_/g, ' ')}</span>
                                                <span className="font-bold text-accent">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-accent text-[10px] font-bold uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Medical Response</h3>
                                    <div className="space-y-6">
                                        {township.hospitals_nearby.map((hosp, idx) => (
                                            <div key={idx} className="flex justify-between items-center group">
                                                <span className="text-white/60 group-hover:text-white transition-colors">{hosp.name}</span>
                                                <span className="font-bold text-accent">{hosp.distance}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                                    <Car size={32} className="text-accent mb-6" />
                                    <h4 className="text-xl font-bold mb-4">Upcoming Mobility</h4>
                                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                                        Integration with the upcoming Hinjewadi-Shivajinagar Metro Line will slash commute times to the city center by 60%.
                                    </p>
                                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white hover:text-secondary">
                                        View Road Network
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TownshipIntelligence;
