import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Trees, Users, ShieldCheck, Sparkles, MapPin, School, Heart, Coffee, ArrowRight, Compass, Timer, Music, Play, Wind, Zap, Globe, Cpu, ArrowUpRight } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { Link } from 'react-router-dom';

const volumes = [
    {
        id: 'education',
        title: 'Volume I: Academic Genesis',
        subtitle: 'The 400m Learning Radius',
        desc: 'Within the Sovereign Republic, education is not a commute, but a tectonic stroll. The Anisha Global School sits at the heart of the township, fostering intellectual growth in a secure, zero-transit environment.',
        metrics: ['400m to Anisha Global', 'CBSE / IGCSE Curriculum', '5-Acre Sports Matrix'],
        icon: School,
        img: 'https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.8122513965070959.avif',
        color: 'from-blue-500/30 to-transparent'
    },
    {
        id: 'leisure',
        title: 'Volume II: Atmospheric Leisure',
        subtitle: 'The 7,700-Tree Bio-Filter',
        desc: 'Escape the IT corridor’s density. Our 3.5-acre Urban Park and the surrounding 70% open spaces provide an atmospheric retreat for residents to disconnect and rejuvenate within nature.',
        metrics: ['7,700+ Native Trees', '12+ Theme Gardens', '3.5 Acre Urban Park Hub'],
        icon: Trees,
        img: 'https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.05260177764445035.png',
        color: 'from-emerald-500/30 to-transparent'
    },
    {
        id: 'community',
        title: 'Volume III: Social Synthesis',
        subtitle: '12,000+ Converging Stories',
        desc: 'Life Republic is a living organism. With over 12,000 families in residence, the community pulse is felt in every festival, club meeting, and evening gathering at the 150ft Spine Road Hub.',
        metrics: ['12,000+ Verified Families', '25+ Resident Interests', 'Weekly Community Marquee'],
        icon: Users,
        img: 'https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.1777644472589.png',
        color: 'from-accent/30 to-transparent'
    }
];

const VolumeItem = ({ vol, idx }: { vol: any, idx: number }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    return (
        <motion.div ref={ref} style={{ opacity, scale }} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-32 items-center py-32`}>
            <div className="lg:w-1/2 relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${vol.color} rounded-[5rem] blur-[120px] opacity-0 group-hover:opacity-100 transition-all duration-1000`}></div>
                <div className="relative aspect-[16/10] rounded-[5rem] overflow-hidden shadow-[0_80px_160px_-40px_rgba(0,0,0,0.4)] border-8 border-gray-50/50 backdrop-blur-xl">
                    <motion.img style={{ y }} src={vol.img} alt={vol.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent"></div>
                </div>
            </div>
            <div className="lg:w-1/2 space-y-16">
                <div className="flex items-center gap-10">
                    <div className="p-8 bg-secondary text-accent rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 group-hover:rotate-12 transition-transform">
                        <vol.icon size={48} strokeWidth={1.5} />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                            <h4 className="text-[12px] font-bold text-accent uppercase tracking-[0.6em]">{vol.subtitle}</h4>
                        </div>
                        <h3 className="text-6xl md:text-7xl font-serif font-bold text-secondary tracking-tighter leading-none">{vol.title}</h3>
                    </div>
                </div>
                <p className="text-2xl md:text-3xl text-gray-500 font-medium leading-relaxed italic max-w-2xl">"{vol.desc}"</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {vol.metrics.map((m: string, i: number) => (
                        <div key={i} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group/metric hover:bg-white hover:shadow-2xl transition-all">
                            <div className="flex items-center gap-4">
                                <Zap size={20} className="text-accent opacity-20 group-hover/metric:opacity-100 transition-opacity" />
                                <p className="text-sm font-bold text-secondary uppercase tracking-widest leading-relaxed">{m}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export const Lifestyle: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <div ref={containerRef} className="bg-white">
            <SEO title="Sovereign Lifestyle & Community Monograph | Life Republic 2026" description="Experience the 15-Minute City at Life Republic. Integrated schooling, 7,700+ trees, and a community of 12,000+ families in Hinjewadi's premier township." />
            
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-secondary">
                <motion.div style={{ scale: useTransform(smoothScroll, [0, 0.2], [1, 1.3]), y: useTransform(smoothScroll, [0, 0.2], [0, 100]) }} className="absolute inset-0">
                    <img loading="lazy" src={volumes[0].img} alt="Sovereign Life" className="w-full h-full object-cover grayscale opacity-20" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/40 to-white"></div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.8, ease: "circOut" }}>
                        <div className="inline-flex items-center gap-8 px-12 py-5 bg-accent/10 border border-accent/20 rounded-full mb-16 backdrop-blur-3xl shadow-2xl">
                            <Wind size={24} className="text-accent animate-pulse" />
                            <span className="text-[12px] font-bold uppercase tracking-[0.7em] text-accent">The Lifestyle Monograph v6.5</span>
                        </div>
                        <h1 className="text-7xl md:text-[18rem] font-serif font-bold text-white mb-16 tracking-tighter leading-[0.75]">
                            Atmospheric <br /> <span className="italic text-accent">Sovereignty.</span>
                        </h1>
                        <p className="text-3xl md:text-4xl text-white/40 max-w-6xl mx-auto leading-relaxed font-medium italic">
                            Synthesizing nature, infrastructure, and community into a high-fidelity resident experience. Welcome to the **15-Minute Sovereign City**.
                        </p>
                    </motion.div>
                </div>
                
                <div className="absolute bottom-24 left-24 hidden lg:flex items-center gap-16 text-white/30">
                    <div className="flex items-center gap-6"><Zap size={24} className="text-accent" /><span className="text-[11px] font-bold uppercase tracking-[0.6em]">Atmosphere Sync Active</span></div>
                    <div className="flex items-center gap-6"><Globe size={24} /><span className="text-[11px] font-bold uppercase tracking-[0.6em]">400-Acre structural mesh</span></div>
                </div>
                <div className="absolute bottom-24 right-24 animate-bounce">
                    <div className="w-px h-32 bg-gradient-to-b from-accent to-transparent"></div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-64 space-y-96">
                {volumes.map((vol, idx) => (
                    <VolumeItem key={vol.id} vol={vol} idx={idx} />
                ))}
            </section>

            <section className="py-72 bg-secondary relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 bg-[url('https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.8122513965070959.avif')] bg-cover bg-center grayscale blur-[2px] group-hover:scale-110 transition-transform duration-[3s]"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px] pointer-events-none -mr-48 -mt-48"></div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="max-w-7xl mx-auto">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
                            <div className="inline-flex items-center gap-6 px-10 py-4 bg-accent/20 border border-accent/30 rounded-full mb-20 shadow-2xl">
                                <Cpu size={24} className="text-accent" />
                                <span className="text-[12px] font-bold text-accent uppercase tracking-[0.7em]">Citizenship Synthesis v6.5</span>
                            </div>
                            <h2 className="text-7xl md:text-[15rem] font-serif font-bold text-white mb-48 tracking-tighter leading-[0.75]">Join the <br /> <span className="text-accent italic">Republic.</span></h2>
                        </motion.div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
                            {[
                                { label: 'Active Citizens', val: '12,500+', icon: Users, color: 'text-blue-400' },
                                { label: 'Parks & Avenues', val: '45+', icon: Trees, color: 'text-emerald-400' },
                                { label: 'Native Trees', val: '7,700+', icon: Wind, color: 'text-accent' },
                                { label: 'Infrastructure', val: '2026', icon: Zap, color: 'text-orange-400' }
                            ].map((stat, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="space-y-12 group/stat">
                                    <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center text-white/40 mx-auto group-hover/stat:bg-accent group-hover/stat:text-secondary group-hover/stat:rotate-12 transition-all shadow-2xl">
                                        <stat.icon size={48} strokeWidth={1} />
                                    </div>
                                    <div className={`text-9xl md:text-[10rem] font-serif font-bold tracking-tighter group-hover/stat:scale-110 transition-transform ${stat.color}`}>{stat.val}</div>
                                    <div className="text-[14px] font-bold text-white/30 uppercase tracking-[0.8em]">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="mt-64 text-center">
                            <button 
                                onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge'))}
                                className="bg-white text-secondary px-28 py-14 rounded-full font-bold text-3xl md:text-4xl hover:bg-accent transition-all shadow-[0_60px_120px_-30px_rgba(0,0,0,0.6)] flex items-center gap-10 mx-auto group hover:scale-[1.05]"
                            >
                                Initiate Citizenship Synthesis <ArrowUpRight size={54} className="group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform" />
                            </button>
                            <div className="mt-24 space-y-4">
                                <p className="text-[12px] font-bold text-white/20 uppercase tracking-[0.8em] block">Secure Residency Protocol v6.5</p>
                                <div className="flex items-center justify-center gap-3 text-[10px] text-accent/40 font-bold uppercase tracking-widest">
                                    <ShieldCheck size={14} /> Encrypted Session Active
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
