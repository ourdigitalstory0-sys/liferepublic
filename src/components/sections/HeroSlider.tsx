import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const heroSlides = [
    {
        image: "https://liferepublic.in/images/home/slider-1.webp",
        title: "Life Republic",
        subtitle: "A Township for the Thinking Minds",
        description: "Experience a holistic lifestyle nestled amidst nature."
    },
    {
        image: "https://liferepublic.in/images/home/slider-2.webp",
        title: "Premium Living",
        subtitle: "World-Class Amenities",
        description: "Designed to offer the perfect blend of luxury and comfort."
    },
    {
        image: "https://liferepublic.in/images/home/slider-3.webp",
        title: "Smart Homes",
        subtitle: "Future-Ready Infrastructure",
        description: "Live in a community that is secure, smart, and sustainable."
    }
];

export const HeroSlider: React.FC = () => {
    return (
        <section className="relative h-screen w-full">
            <Swiper
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                effect="fade"
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                loop={true}
                className="h-full w-full"
            >
                {heroSlides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-full w-full">
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                <div className="absolute inset-0 bg-black/40" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
                                <div className="max-w-4xl mx-auto">
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8 }}
                                        className="inline-block bg-accent px-4 py-1 text-sm font-semibold tracking-wider uppercase mb-4 rounded-sm"
                                    >
                                        {slide.subtitle}
                                    </motion.span>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight"
                                    >
                                        {slide.title}
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                        className="text-xl md:text-2xl mb-10 font-light max-w-2xl mx-auto"
                                    >
                                        {slide.description}
                                    </motion.p>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.6 }}
                                        className="flex flex-col sm:flex-row gap-4 justify-center"
                                    >
                                        <Button variant="primary" size="lg" className="gap-2 bg-accent hover:bg-white hover:text-accent border-2 border-transparent">
                                            Explore Projects <ArrowRight size={20} />
                                        </Button>
                                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary">
                                            Download Brochure
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Styles for Swiper Pagination */}
            <style>{`
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #C5A059;
          width: 30px;
          border-radius: 5px;
        }
      `}</style>
        </section>
    );
};
