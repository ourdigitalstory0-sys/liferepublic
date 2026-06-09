import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { MapPin, Train, School, Stethoscope, ShoppingBag, Briefcase, Zap, Compass, Target, Navigation, ArrowUpRight, BarChart3 } from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

const SovereignMap = React.lazy(() => import('../components/ui/SovereignMap').then(module => ({ default: module.SovereignMap })));

const highlights = [
    {
        category: 'Economic Tectonics',
        icon: Briefcase,
        items: [
            { name: 'Rajiv Gandhi IT Park', time: '10 mins', status: 'Global Hub' },
            { name: 'Embassy Tech Zone', time: '12 mins', status: 'Institutional' },
            { name: 'Quadron Business Park', time: '10 mins', status: 'High Yield' }
        ]
    },
    {
        category: 'Transit Synthesis',
        icon: Train,
        items: [
            { name: 'Metro Ph 3 Station', time: '5 mins', status: '2026 Milestone' },
            { name: 'Spine Road Backbone', time: 'Immediate', status: '150ft Width' },
            { name: 'Mumbai-Pune Exp.', time: '15 mins', status: 'National Link' }
        ]
    },
    {
        category: 'Lifestyle Radius',
        icon: ShoppingBag,
        items: [
            { name: 'Phoenix Millennium', time: '20 mins', status: 'Luxury Retail' },
            { name: 'Anisha Global', time: 'Within Gates', status: 'Top Rated' },
            { name: 'Ruby Hall Clinic', time: '12 mins', status: 'Tertiary Care' }
        ]
    }
];

export const LocationHighlights: React.FC = () => {
    return (
        <div className="bg-white">
            <SEO
                title="Sovereign Location Highlights | Hinjewadi 2026 Roadmap"
                description="Explore the Hinjewadi 2026 Infrastructure Roadmap. 5 mins to Metro, 150ft Spine Road connectivity, and 10 mins to Global IT Hubs. Discover the strategic epicenter of Pune West."
                keywords="Hinjewadi Infrastructure 2026, Life Republic Location, Hinjewadi Metro Connectivity, Pune Real Estate Investment 2026"
                canonical="/location-highlights"
            />

            {/* Sovereign Nexus Hero */}
            <section className="relative pt-40 pb-32 bg-secondary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-secondary z-10"></div>
                <div className="absolute inset-0 bg-[url('/images/aerial-sunset.png')] bg-cover bg-center opacity-30 grayscale blur-[1px]"></div>
                
                <div className="container mx-auto px-4 relative z-20">
                    <div className="max-w-5xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-4 px-6 py-3 bg-accent/20 border border-accent/30 rounded-full mb-12 backdrop-blur-xl"
                        >
                            <Compass size={16} className="text-accent animate-spin-slow" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">Infrastructure Synthesis 2026</span>
                        </motion.div>
                        <h1 className="text-6xl md:text-9xl font-serif font-bold text-white mb-10 tracking-tighter leading-none">
                            The Strategic <br /> <span className="text-accent italic">Epicenter.</span>
                        </h1>
                        <p className="text-2xl text-gray-400 font-medium max-w-3xl leading-relaxed mb-12">
                            Synthesizing the Rajiv Gandhi Infotech Park's economic velocity with the 2026 Metro expansion. A 390-acre structural masterclass.
                        </p>
                        
                        <div className="flex gap-8">
                            <div className="flex flex-col">
                                <span className="text-4xl font-serif font-bold text-white">1.2km</span>
                                <span className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1">To Metro Ph 3</span>
                            </div>
                            <div className="w-px h-12 bg-white/10"></div>
                            <div className="flex flex-col">
                                <span className="text-4xl font-serif font-bold text-white">0 min</span>
                                <span className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1">To Spine Road</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Map Ledger */}
            <section className="py-32 bg-white relative">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                        <div className="lg:col-span-4 space-y-16">
                            <div className="space-y-6">
                                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em]">Spatial Metrics</span>
                                <h2 className="text-5xl font-serif font-bold text-secondary tracking-tighter">The Sector <br />Mesh Analysis.</h2>
                                <p className="text-xl text-gray-500 font-medium leading-relaxed">
                                    Our 390-acre master plan is mathematically positioned to leverage the Hinjewadi Phase 3 expansion.
                                </p>
                            </div>
                            
                            <div className="space-y-8">
                                {[
                                    { label: 'IT Hub Velocity', val: '10 mins', icon: Briefcase },
                                    { label: 'Expressway Sync', val: '15 mins', icon: Navigation },
                                    { label: 'Retail Proximity', val: '20 mins', icon: ShoppingBag }
                                ].map((m, i) => (
                                    <div key={i} className="flex items-center justify-between p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:border-accent transition-all shadow-sm">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm group-hover:scale-110 transition-transform">
                                                <m.icon size={20} />
                                            </div>
                                            <span className="text-[11px] font-bold text-secondary uppercase tracking-[0.2em]">{m.label}</span>
                                        </div>
                                        <span className="text-xl font-bold text-secondary">{m.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-8 relative group">
                            <div className="absolute -inset-8 border border-accent/10 rounded-[4.5rem] pointer-events-none"></div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="relative rounded-[3.5rem] overflow-hidden shadow-2xl border border-gray-100 h-[750px] group-hover:border-accent/20 transition-all duration-1000"
                            >
                                <React.Suspense fallback={<div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center font-serif text-2xl text-gray-400">Synthesizing Location Nexus...</div>}>
                                    <SovereignMap />
                                </React.Suspense>
                                
                                {/* HUD Overlay */}
                                <div className="absolute top-12 left-12 z-20 pointer-events-none">
                                    <div className="bg-secondary/90 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                                        <div className="flex items-center gap-4 text-accent mb-4">
                                            <Target size={20} className="animate-pulse" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Target Nexus Lock</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-2xl font-serif font-bold text-white tracking-tighter">HINJEWADI_PH3</div>
                                            <div className="text-[9px] text-white/40 font-mono tracking-widest uppercase">Coordinates: 18.5915° N, 73.7191° E</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-12 right-12 z-20 p-8 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 text-white flex items-center gap-6 group">
                                    <BarChart3 size={32} className="text-accent group-hover:rotate-12 transition-transform" />
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">ROI Catalyst</p>
                                        <p className="text-xl font-serif font-bold">15-Min Radius</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Infrastructure Roadmap Matrix */}
            <section className="py-40 bg-gray-50/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-20 opacity-5">
                    <Train size={300} className="text-secondary" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-24">
                        <span className="text-[10px] font-bold text-accent uppercase tracking-[0.6em] mb-4 block">The 2026 Forecast</span>
                        <h2 className="text-5xl md:text-8xl font-serif font-bold text-secondary tracking-tighter">Infrastructure <span className="text-accent italic">Hardening.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {highlights.map((group, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-16 rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-gray-100 group hover:border-accent transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-20 h-20 bg-secondary text-accent rounded-[1.5rem] flex items-center justify-center mb-12 group-hover:bg-accent group-hover:text-secondary transition-all shadow-xl shadow-secondary/10">
                                        <group.icon size={32} />
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-secondary mb-12 tracking-tight">{group.category}</h3>
                                    <div className="space-y-10">
                                        {group.items.map((item, i) => (
                                            <div key={i} className="flex items-center justify-between group/item">
                                                <div>
                                                    <p className="text-lg font-bold text-secondary group-hover/item:text-accent transition-colors">{item.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1">{item.status}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-accent">{item.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    <span>Verified 2026</span>
                                    <ArrowUpRight size={16} className="text-accent" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sovereign Verdict */}
            <section className="py-40 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto p-20 md:p-32 bg-secondary rounded-[5rem] text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('/images/aerial-sunset.png')] bg-cover bg-center grayscale opacity-5"></div>
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]"></div>
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative z-10"
                        >
                            <Zap size={72} className="text-accent mx-auto mb-12 animate-pulse" />
                            <h2 className="text-5xl md:text-8xl font-serif font-bold text-white mb-12 tracking-tighter leading-tight">The Investment <br /><span className="text-accent italic text-7xl md:text-9xl">Conclusion.</span></h2>
                            <p className="text-2xl text-gray-400 leading-relaxed font-medium mb-16 max-w-3xl mx-auto">
                                Hinjewadi Phase 3 is the fastest-growing real estate cluster in Pune West. Life Republic's 390-acre scale ensures that your asset is not just a home, but a sovereign stake in the city's IT future.
                            </p>
                            <div className="flex flex-col md:flex-row gap-8 justify-center">
                                <a href="/roi-calculator">
                                    <button className="bg-white text-secondary px-16 py-7 rounded-full font-bold text-lg hover:bg-accent hover:text-secondary transition-all shadow-2xl flex items-center gap-4">
                                        Synthesize ROI <ArrowUpRight size={24} />
                                    </button>
                                </a>
                                <a href="/contact">
                                    <button className="bg-transparent border-2 border-white/20 text-white px-16 py-7 rounded-full font-bold text-lg hover:bg-white/5 transition-all">
                                        Secure Site Visit
                                    </button>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};
