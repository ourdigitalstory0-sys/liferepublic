import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Info, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const sectors = [
    {
        id: 'atmos',
        name: 'Sector R22: Atmos',
        type: '2, 2.5 & 3 BHK',
        status: 'Ongoing',
        pos: { top: '35%', left: '42%' },
        link: '/projects/kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi'
    },
    {
        id: 'aros',
        name: 'Sector R13: Aros',
        type: '2 & 3 BHK',
        status: 'Premium',
        pos: { top: '48%', left: '55%' },
        link: '/projects/kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi'
    },
    {
        id: 'qrious',
        name: 'Sector R1: Qrious',
        type: '2-3 BHK Smarthomes',
        status: 'Ready',
        pos: { top: '25%', left: '65%' },
        link: '/projects/kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi'
    },
    {
        id: 'arezo',
        name: 'Sector R1: Arezo',
        type: '2 BHK Apartments',
        status: 'Value',
        pos: { top: '60%', left: '35%' },
        link: '/projects/kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi'
    },
    {
        id: 'echoes',
        name: 'New Launch: Echoes',
        type: '2 & 2.5 BHK Eco-Chic',
        status: 'New Launch',
        pos: { top: '20%', left: '30%' },
        link: '/projects/kolte-patil-life-republic-echoes-new-launch-2-2-5-bhk-hinjewadi'
    }
];

export const MasterPlan: React.FC = () => {
    const [activeSector, setActiveSector] = useState<typeof sectors[0] | null>(null);
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <section className="py-24 bg-white overflow-hidden relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-accent font-bold tracking-widest uppercase text-sm block mb-4"
                    >
                        Township Intelligence
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6"
                    >
                        Interactive Master Plan
                    </motion.h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Explore the vast 390+ acre landscape of Life Republic. Click on the sectors below to discover unique living experiences.
                    </p>
                </div>

                <div className="relative group max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-50 bg-gray-100 min-h-[400px]">
                    {!imgLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
                            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    <img 
                        src="/images/home/master-layout-full.jpg" 
                        alt="Life Republic Master Plan" 
                        onLoad={() => setImgLoaded(true)}
                        className={`w-full h-auto grayscale-30 contrast-110 group-hover:grayscale-0 transition-all duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                    
                    {/* Dark Overlay for better contrast on markers */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>

                    {/* Interactive Markers */}
                    {imgLoaded && sectors.map((sector) => (
                        <div 
                            key={sector.id}
                            className="absolute pointer-events-auto"
                            style={{ top: sector.pos.top, left: sector.pos.left }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                onClick={() => setActiveSector(sector)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                    activeSector?.id === sector.id ? 'bg-accent text-white scale-125 shadow-accent/50 shadow-lg' : 'bg-white text-secondary shadow-md'
                                }`}
                            >
                                <MapPin size={18} />
                            </motion.button>

                            {/* Tooltip (Desktop Only) */}
                            <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <div className="bg-white px-4 py-2 rounded-lg shadow-xl border border-gray-100 whitespace-nowrap">
                                    <span className="text-xs font-bold text-gray-900">{sector.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Info Card Overlay */}
                    <AnimatePresence>
                        {activeSector && (
                            <motion.div 
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                className="absolute right-4 bottom-4 md:right-8 md:bottom-8 w-[280px] md:w-[320px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 z-10"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                                        <Info size={24} />
                                    </div>
                                    <button 
                                        onClick={() => setActiveSector(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{activeSector.name}</h3>
                                <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-accent bg-accent/5 w-fit px-2 py-1 rounded">
                                    {activeSector.status} Portfolio
                                </div>
                                <p className="text-gray-600 text-sm mb-6">
                                    Offering premium {activeSector.type} in the heart of Life Republic Hinjewadi.
                                </p>
                                <Link 
                                    to={activeSector.link}
                                    className="w-full bg-secondary text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-secondary/90 transition-all text-sm group"
                                >
                                    View Sector Details <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                {/* Visual Legend */}
                <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-accent rounded-full"></div>
                        <span className="text-sm font-medium text-gray-500 italic">Ongoing Development</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-secondary rounded-full"></div>
                        <span className="text-sm font-medium text-gray-500 italic">Township Backbone (Spine Road)</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-500 italic">Future Expansion</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
