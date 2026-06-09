import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { personalizationStore } from '../../lib/personalizationStore';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { api } from '../../services/api';
import type { Banner } from '../../lib/types';

// Fallback slides if DB is empty
const defaultSlides = [
    {
        id: 1,
        image_url: '/images/slider/1.jpg',
        title: 'Kolte Patil Life Republic Township Hinjewadi',
        subtitle: 'Experience 400+ acres of integrated community living near Rajiv Gandhi IT Park in Hinjewadi',
        description: 'A 390+ acre integrated township in Hinjewadi that offers a world of its own.',
        order: 1
    },
    {
        id: 2,
        image_url: '/images/slider/2.webp',
        title: 'Luxury 1, 2 & 3 BHK Flats in Pune West',
        subtitle: 'Homes designed for those who dream big. Ready possession apartments available.',
        description: 'From smart homes to luxury villas, find your perfect space.',
        order: 2
    },
    {
        id: 3,
        image_url: '/images/slider/3.webp',
        title: 'World-Class Amenities & Infrastructure',
        subtitle: 'Global schools, 150ft wide roads, and multi-level security',
        description: 'Join a vibrant community of over 10,000 happy families.',
        order: 3
    },
];

export const HeroSlider: React.FC = () => {
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const [slides, setSlides] = React.useState<Banner[]>(defaultSlides);

    React.useEffect(() => {
        const loadBanners = async () => {
            try {
                const data = await api.banners.getAll();
                if (data && data.length > 0) {
                    setSlides(data);
                }
            } catch (error) {
                console.error('Failed to load banners:', error);
            }
        };
        loadBanners();
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
                <Swiper
                    modules={[Autoplay, EffectFade, Navigation, Pagination]}
                    effect="fade"
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{
                        clickable: true,
                        renderBullet: function (_index, className) {
                            return '<span class="' + className + ' !bg-white !opacity-50 hover:!opacity-100 transition-opacity"></span>';
                        },
                    }}
                    className="h-full w-full"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative h-full w-full">
                                <div className="absolute inset-0 bg-black/40 z-10" />
                                <img
                                    src={slide.image_url}
                                    alt={slide.title}
                                    loading={index === 0 ? "eager" : "lazy"}
                                    fetchPriority={index === 0 ? "high" : "low"}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className="mb-8 w-24 h-24 bg-white/10 backdrop-blur-xl rounded-3xl p-3 border border-white/20 shadow-2xl overflow-hidden"
                                    >
                                        <img loading="lazy" src="/images/life-republic-logo-color.png" alt="Life Republic" className="w-full h-full object-contain brightness-110" />
                                    </motion.div>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={index === 0 ? { opacity: 1, y: 0 } : {}}
                                        whileInView={index !== 0 ? { opacity: 1, y: 0 } : {}}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.1 }}
                                        className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg tracking-tight"
                                    >
                                        {slide.title}
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                        className="text-lg md:text-2xl text-gray-100 font-light tracking-wide max-w-3xl drop-shadow-md mb-8"
                                    >
                                        {slide.subtitle}
                                    </motion.p>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.6 }}
                                        className="flex flex-col sm:flex-row gap-4 justify-center"
                                    >
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="gap-2 bg-accent hover:bg-white hover:text-accent border-2 border-transparent px-10 py-4 font-bold rounded-full shadow-2xl"
                                            onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                                        >
                                            Enquire Now <Sparkles size={20} />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="gap-2 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white hover:text-accent px-10 py-4 font-bold rounded-full transition-all"
                                            onClick={() => navigate('/projects')}
                                        >
                                            Explore Portfolio <ArrowRight size={20} />
                                        </Button>

                                        {/* Intelligence Nudge */}
                                        {personalizationStore.getHistory().searchQueries.length > 0 && (
                                            <motion.button
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                onClick={() => window.dispatchEvent(new CustomEvent('open-neural-search'))}
                                                className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-bold hover:bg-white hover:text-secondary transition-all group"
                                            >
                                                <Sparkles size={16} className="text-accent" />
                                                Resume Search: "{personalizationStore.getHistory().searchQueries[0]}"
                                            </motion.button>
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer pointer-events-none"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <span className="text-white/80 text-xs tracking-[0.2em] mb-2 uppercase">Scroll to Explore</span>
                <ChevronDown className="text-white/80" size={24} />
            </motion.div>

            <style>{`
                .swiper-pagination-bullet {
                  width: 10px;
                  height: 10px;
                  transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active {
                  background: #C5A059 !important;
                  width: 30px;
                  border-radius: 5px;
                  opacity: 1 !important;
                }
              `}</style>
        </section>
    );
};
