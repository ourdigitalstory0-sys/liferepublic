import React from 'react';
import { motion } from 'framer-motion';
import { Trees, Users, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

const stats = [
    { label: 'Happy Families', value: '12,000+', icon: Users, color: 'text-blue-600' },
    { label: 'Trees Planted', value: '7,700+', icon: Trees, color: 'text-green-600' },
    { label: 'Acre Township', value: '390+', icon: MapPin, color: 'text-amber-600' },
    { label: 'Open Space', value: '70%', icon: Sparkles, color: 'text-purple-600' }
];

export const Lifestyle: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <img 
                    src="/images/home/urban-park.webp" 
                    alt="Life at Life Republic" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif font-bold mb-6"
                    >
                        More Than a Home
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl font-light max-w-2xl mx-auto"
                    >
                        Experience the vibrant community and sustainable living of Kolte Patil Life Republic.
                    </motion.p>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-20 -mt-16 relative z-20 container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center group hover:border-accent transition-all"
                        >
                            <div className={`w-12 h-12 ${stat.color} bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                <stat.icon size={28} />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Core Pillars */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-8">A Sustainable Future for Your Family</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                                        <Trees size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Environmental Stewardship</h3>
                                        <p className="text-gray-600">With 7,700+ native trees and 70% open spaces, we provide a literal breath of fresh air for your children.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Pulsating Community</h3>
                                        <p className="text-gray-600">Join 12,000+ like-minded families. From festival celebrations to hobby clubs, life here is never lonely.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">24/7 Security & Safety</h3>
                                        <p className="text-gray-600">Multi-tier security systems and a dedicated fire station ensure your peace of mind while your loved ones explore the township.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <img 
                                src="/images/home/clubhouse-bg.webp" 
                                alt="Life Republic Community" 
                                className="rounded-[40px] shadow-2xl"
                            />
                            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl max-w-[240px] border border-gray-100">
                                <Sparkles className="text-accent mb-4" size={32} />
                                <p className="text-gray-800 font-medium italic italic">"Moving here was the best decision for our kids' health and social life."</p>
                                <span className="text-sm text-gray-400 mt-2 block">- Resident at Aros</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Township Evolution Timeline */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-secondary mb-4">Township Evolution</h2>
                        <p className="text-gray-500">A journey of vision, scale, and excellence.</p>
                    </div>
                    
                    <div className="relative">
                        {/* Horizontal Line (Desktop) */}
                        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2" />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative">
                            {[
                                { year: '2010', title: 'The Vision', desc: 'Conceptualization of a 390-acre integrated township in Hinjewadi.' },
                                { year: '2014', title: 'First Families', desc: 'Handover of the first residential clusters and commencement of core infra.' },
                                { year: '2020', title: 'The Hub', desc: 'Opening of the Global School and first retail segments within the campus.' },
                                { year: '2025', title: 'The Sovereign Era', desc: 'Launch of ultra-premium clusters and full digital automation.' }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative flex flex-col items-center text-center lg:items-start lg:text-left pt-12 lg:pt-0"
                                >
                                    <div className="w-12 h-12 bg-white rounded-full border-4 border-accent shadow-xl flex items-center justify-center font-bold text-secondary z-20 mb-6 lg:mx-0">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent/20 rounded-full animate-ping" />
                                        {item.year.split('0')[0]}<sup>{item.year.slice(-1)}</sup>
                                    </div>
                                    <div className="lg:pt-8">
                                        <div className="text-xl font-bold text-secondary mb-2">{item.title}</div>
                                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
