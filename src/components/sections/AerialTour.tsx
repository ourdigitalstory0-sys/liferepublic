import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plane, Sparkles, Navigation } from 'lucide-react';

export const AerialTour: React.FC = () => {
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const blur = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [10, 0, 0, 10]);

    return (
        <section ref={containerRef} className="h-[300vh] relative bg-secondary">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <motion.div 
                    style={{ scale, filter: `blur(${blur}px)` }}
                    className="absolute inset-0"
                >
                    <img loading="lazy" 
                        src="/images/aerial-sunset.png" 
                        alt="Life Republic Aerial Tour" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-transparent to-secondary/60"></div>
                </motion.div>

                {/* UI Overlays */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                    <motion.div 
                        style={{ opacity }}
                        className="text-center text-white px-4"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full mb-8 backdrop-blur-xl">
                            <Plane size={16} className="text-accent" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Cinematic Aerial Sequence</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-serif font-bold mb-6 drop-shadow-2xl">
                            The Horizon of <br /> <span className="text-accent italic">Sovereignty.</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-medium">
                            Scroll to descend into the 390-acre master plan.
                        </p>
                    </motion.div>
                </div>

                {/* Metadata HUD */}
                <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end z-20">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-white/60">
                            <Navigation size={20} className="text-accent" />
                            <span className="text-xs font-bold uppercase tracking-widest">Altitude: 1200ft MSL</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/60">
                            <Sparkles size={20} className="text-accent" />
                            <span className="text-xs font-bold uppercase tracking-widest">Visual Index: 98.4%</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] mb-2">Live Rendering</div>
                        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                                className="h-full bg-accent"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
