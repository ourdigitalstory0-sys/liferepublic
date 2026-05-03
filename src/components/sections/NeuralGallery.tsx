import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Sunset, Moon, Sparkles } from 'lucide-react';

interface NeuralGalleryProps {
    images: {
        day: string;
        sunset?: string;
        night?: string;
    };
    title: string;
}

const atmosphereStyles: Record<string, React.CSSProperties> = {
    day: {},
    sunset: {
        filter: 'sepia(0.4) saturate(1.5) brightness(0.9) hue-rotate(-10deg)',
    },
    night: {
        filter: 'brightness(0.35) saturate(0.6) contrast(1.2) hue-rotate(200deg)',
    },
};

const overlayStyles: Record<string, string> = {
    day: 'from-black/50 via-transparent to-transparent',
    sunset: 'from-orange-900/60 via-amber-900/20 to-transparent',
    night: 'from-indigo-950/80 via-blue-900/30 to-transparent',
};

export const NeuralGallery: React.FC<NeuralGalleryProps> = ({ images, title }) => {
    const [mode, setMode] = useState<'day' | 'sunset' | 'night'>('day');

    const modes = [
        { id: 'day', icon: Sun, label: 'High Noon' },
        { id: 'sunset', icon: Sunset, label: 'Golden Hour' },
        { id: 'night', icon: Moon, label: 'Ambient Night' }
    ];

    // Use dedicated image if available, otherwise fall back to day image with CSS filter
    const currentSrc = (mode === 'sunset' && images.sunset) ? images.sunset 
                     : (mode === 'night' && images.night) ? images.night 
                     : images.day;
    const useFilter = (mode === 'sunset' && !images.sunset) || (mode === 'night' && !images.night) || mode !== 'day';

    return (
        <div className="relative group">
            {/* Main Display */}
            <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden relative shadow-2xl bg-gray-900 border border-white/10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={currentSrc}
                            alt={`${title} - ${mode} view`}
                            className="w-full h-full object-cover transition-all duration-1000"
                            style={useFilter ? atmosphereStyles[mode] : {}}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Ambient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${overlayStyles[mode]} pointer-events-none transition-all duration-1000`} />

                {/* Atmospheric Controls */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 shadow-xl z-20">
                    {modes.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => setMode(m.id as any)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-500 ${
                                mode === m.id 
                                ? 'bg-white text-secondary shadow-lg' 
                                : 'text-white hover:bg-white/10'
                            }`}
                        >
                            <m.icon size={16} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                {m.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Status Indicator */}
                <div className="absolute top-8 left-8 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <Sparkles size={14} className="text-accent animate-pulse" />
                    <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest italic">
                        Neural Synthesis Active
                    </span>
                </div>
            </div>

            {/* Reflection Layer */}
            <div className="mt-8 text-center">
                <h4 className="text-secondary font-serif font-bold text-2xl mb-2">{title}</h4>
                <p className="text-gray-400 text-xs uppercase tracking-[0.3em]">Experience the Tectonic Flow</p>
            </div>
        </div>
    );
};

