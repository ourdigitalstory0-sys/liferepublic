import React, { useState, useRef } from 'react';
import { useScroll, useTransform, AnimatePresence, motion } from 'framer-motion';
import { MapPin, Info, ArrowRight, ExternalLink, Sparkles, Navigation, Target, Zap, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const sectors = [
    {
        id: 'atmos',
        name: 'Sector R22: Atmos',
        type: '2, 2.5 & 3 BHK',
        status: 'Ongoing',
        intensity: 'High',
        pos: { top: '35%', left: '42%' },
        link: '/projects/kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi'
    },
    {
        id: 'aros',
        name: 'Sector R13: Aros',
        type: '2 & 3 BHK',
        status: 'Premium',
        intensity: 'Medium',
        pos: { top: '48%', left: '55%' },
        link: '/projects/kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi'
    },
    {
        id: 'qrious',
        name: 'Sector R1: Qrious',
        type: '2-3 BHK Smarthomes',
        status: 'Ready',
        intensity: 'High',
        pos: { top: '25%', left: '65%' },
        link: '/projects/kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi'
    },
    {
        id: 'espada',
        name: '24K Espada',
        type: '4 BHK Villas',
        status: 'Ultra Luxury',
        intensity: 'High',
        pos: { top: '15%', left: '45%' },
        link: '/projects/kolte-patil-life-republic-24k-espada-luxury-villas-hinjewadi'
    },
    {
        id: 'arezo',
        name: 'Sector R16: Arezo',
        type: '2 BHK Apartments',
        status: 'Value',
        intensity: 'Low',
        pos: { top: '60%', left: '35%' },
        link: '/projects/kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi'
    }
];

const SectorMarker = React.memo(({ sector, activeSector, onSelect }: { sector: any, activeSector: any, onSelect: (s: any) => void }) => (
    <div 
        className="absolute z-20 pointer-events-auto"
        style={{ top: sector.pos.top, left: sector.pos.left }}
    >
        <motion.div className="relative flex items-center justify-center">
            {sector.intensity === 'High' && (
                <motion.div 
                    animate={{ scale: [1, 2.8], opacity: [0.6, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute w-20 h-20 bg-accent rounded-full blur-sm"
                />
            )}
            
            <motion.button
                whileHover={{ scale: 1.4, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onSelect(sector)}
                className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] border-2 ${
                    activeSector?.id === sector.id 
                        ? 'bg-accent text-secondary scale-125 border-white shadow-accent/50' 
                        : 'bg-secondary/40 backdrop-blur-3xl text-white border-white/20 hover:bg-white hover:text-secondary hover:border-white'
                }`}
            >
                {sector.intensity === 'High' ? <Sparkles size={28} /> : <Target size={28} />}
            </motion.button>

            <AnimatePresence>
                {activeSector?.id !== sector.id && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-full mt-6 bg-secondary/90 backdrop-blur-2xl px-6 py-2 rounded-full border border-white/10 shadow-2xl pointer-events-none whitespace-nowrap"
                    >
                        <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">{sector.name.split(':')[1] || sector.name}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    </div>
));

export const MasterPlan: React.FC = () => {
    const [activeSector, setActiveSector] = useState<typeof sectors[0] | null>(null);
    const [imgLoaded, setImgLoaded] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

    return (
        <section ref={containerRef} className="py-48 bg-white overflow-hidden relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-6 px-10 py-4 bg-secondary text-white rounded-full mb-12 shadow-2xl border border-white/10"
                    >
                        <Navigation size={20} className="text-accent animate-pulse" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.6em]">The Master Blueprint v6.0</span>
                    </motion.div>
                    <h2 className="text-6xl md:text-[10rem] font-serif font-bold text-secondary mb-12 tracking-tighter leading-[0.85]">
                        Spatial <br /> <span className="text-accent italic">Sovereignty.</span>
                    </h2>
                    <p className="text-2xl md:text-3xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium">
                        Navigate the 390-acre tectonic landscape. Every sector is programmatically synchronized with the 150ft Spine Road infrastructure.
                    </p>
                </div>

                <div className="relative group max-w-[1400px] mx-auto rounded-[6rem] overflow-hidden shadow-[0_120px_240px_-60px_rgba(0,0,0,0.3)] border-[16px] border-gray-50 bg-gray-200 aspect-video lg:h-[900px]">
                    {!imgLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="w-32 h-32 border-[8px] border-accent/20 border-t-accent rounded-full" />
                        </div>
                    )}
                    
                    <motion.div style={{ scale }} className="h-full w-full">
                        <img loading="lazy" 
                            src="/images/home/master-layout-full.jpg" 
                            alt="Life Republic Master Plan" 
                            onLoad={() => setImgLoaded(true)}
                            className={`w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-2000 ease-out ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />
                    </motion.div>

                    {/* Spine Road Synthesis Effect */}
                    <div className="absolute top-[42%] left-0 w-full h-8 bg-accent/20 blur-[80px] pointer-events-none z-10 overflow-hidden">
                        <motion.div 
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="w-1/3 h-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-60 shadow-[0_0_100px_rgba(197,160,89,1)]"
                        />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-transparent to-black/30 pointer-events-none z-10"></div>

                    {/* Interactive Marker Synthesis */}
                    {imgLoaded && sectors.map((sector) => (
                        <SectorMarker 
                            key={sector.id} 
                            sector={sector} 
                            activeSector={activeSector} 
                            onSelect={setActiveSector} 
                        />
                    ))}

                    {/* Sovereign Info Monograph Overlay v6.0 */}
                    <AnimatePresence>
                        {activeSector && (
                            <motion.div 
                                initial={{ opacity: 0, x: 150, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 150, scale: 0.9 }}
                                className="absolute right-16 bottom-16 w-[550px] bg-white rounded-[5rem] shadow-[0_100px_200px_-50px_rgba(0,0,0,0.5)] p-16 border border-white z-40 overflow-hidden group/hud"
                            >
                                <div className="absolute top-0 right-0 p-12 opacity-5">
                                    <Globe size={150} />
                                </div>
                                <div className="flex justify-between items-start mb-16 relative z-10">
                                    <div className="w-24 h-24 bg-secondary text-accent rounded-[3rem] flex items-center justify-center shadow-2xl group-hover/hud:rotate-12 transition-transform duration-500">
                                        <Info size={48} />
                                    </div>
                                    <button 
                                        onClick={() => setActiveSector(null)}
                                        className="p-6 bg-gray-50 hover:bg-accent hover:text-secondary rounded-full transition-all text-gray-400 group/close"
                                    >
                                        <ArrowRight size={40} className="group-hover/close:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                                <h3 className="text-5xl font-serif font-bold text-secondary mb-4 tracking-tighter leading-none relative z-10">{activeSector.name}</h3>
                                <div className="flex items-center gap-6 mb-12 relative z-10">
                                    <div className="flex items-center gap-3 px-6 py-3 bg-accent text-secondary rounded-full border border-white shadow-xl">
                                        <Shield size={16} />
                                        <span className="text-[12px] font-bold uppercase tracking-[0.4em]">{activeSector.status}</span>
                                    </div>
                                    <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-gray-400">
                                        {activeSector.type}
                                    </span>
                                </div>
                                <p className="text-2xl text-gray-500 font-medium leading-relaxed mb-16 relative z-10">
                                    A curated architectural masterpiece within the 390-acre ecosystem. Designed for high-velocity lifestyle and absolute sovereignty.
                                </p>
                                <Link 
                                    to={activeSector.link}
                                    className="w-full bg-secondary text-white py-10 rounded-full flex items-center justify-center gap-6 font-bold text-2xl hover:bg-accent hover:scale-[1.02] transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] group/btn relative z-10"
                                >
                                    Explore Sector Portfolio <ArrowRight size={28} className="group-hover/btn:translate-x-3 transition-transform" />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                {/* Visual Synthesis Legend */}
                <div className="mt-32 flex flex-wrap justify-center gap-24">
                    {[
                        { color: 'bg-accent shadow-[0_0_30px_rgba(197,160,89,0.5)]', label: 'Sovereign Pulse Clusters' },
                        { color: 'bg-secondary border border-white/20', label: '150ft Spine Road Backbone' },
                        { color: 'bg-white border-2 border-gray-200', label: 'IT Connectivity Radius' }
                    ].map((item, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-6"
                        >
                            <div className={`w-8 h-8 rounded-xl shadow-xl ${item.color}`}></div>
                            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.5em]">{item.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
