import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Sun, Wind, Trees } from 'lucide-react';
import { SEO } from '../components/seo/SEO';

const metrics = [
    { label: 'Native Trees', value: '7,700+', icon: Trees, color: 'text-green-600', description: 'Planted across the 390-acre ecosystem.' },
    { label: 'Water Recycled', value: '1.2 MLD', icon: Droplets, color: 'text-blue-500', description: 'Advanced STP for zero liquid discharge.' },
    { label: 'Solar Power', value: '450 kW', icon: Sun, color: 'text-orange-500', description: 'Off-setting common area energy consumption.' },
    { label: 'Open Spaces', value: '70%', icon: Leaf, color: 'text-emerald-500', description: 'Dedicated to nature and landscaping.' }
];

export const Sustainability: React.FC = () => {
    return (
        <div className="bg-white pt-24 pb-20">
            <SEO 
                title="Sustainability & Green Initiatives | Kolte Patil Life Republic"
                description="Explore the sustainable future at Kolte Patil Life Republic. 7,700+ trees, 1.2 MLD water recycling, and 70% open spaces in Pune's leading integrated township."
            />
            
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mb-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest mb-4"
                    >
                        <Wind size={16} />
                        <span>Future-Ready Living</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-secondary mb-6 italic">Sustainable Ecosystem</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        At Life Republic, sustainability isn't just a feature—it's the foundation. We are building a regenerative ecosystem where modern luxury coexists with environmental stewardship.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {metrics.map((metric, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:bg-white transition-all group"
                        >
                            <div className={`${metric.color} mb-6 transform group-hover:scale-110 transition-transform`}>
                                <metric.icon size={40} strokeWidth={1.5} />
                            </div>
                            <div className="text-3xl font-bold text-secondary mb-2">{metric.value}</div>
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{metric.label}</div>
                            <p className="text-gray-600 text-sm leading-relaxed">{metric.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-secondary rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-20"></div>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">The 150ft Oxygen Corridor</h2>
                            <p className="text-lg text-white/70 mb-8 leading-relaxed">
                                Our central spine road isn't just for transit; it's a massive green filter. Lined with thousands of oxygen-rich trees, it creates a micro-climate that reduces temperatures by up to 3°C across the township.
                            </p>
                            <div className="flex gap-4">
                                <div className="bg-white/10 px-6 py-4 rounded-2xl border border-white/10">
                                    <div className="text-2xl font-bold text-accent">3.5 Acres</div>
                                    <div className="text-xs text-white/50 uppercase font-bold tracking-tighter">Urban Park</div>
                                </div>
                                <div className="bg-white/10 px-6 py-4 rounded-2xl border border-white/10">
                                    <div className="text-2xl font-bold text-accent">Zero</div>
                                    <div className="text-xs text-white/50 uppercase font-bold tracking-tighter">Waste Discharge</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                            <img 
                                src="/images/gallery/nature-nest.webp" 
                                alt="Life Republic Greenery" 
                                className="w-full h-full object-cover opacity-60"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white/10 backdrop-blur-md p-8 rounded-full border border-white/20">
                                    <Leaf size={48} className="text-accent animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
