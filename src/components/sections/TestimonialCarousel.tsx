import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Quote, Star, CheckCircle2 } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const testimonials = [
    {
        name: "Rahul Deshpande",
        role: "IT Professional, Infosys",
        text: "Living in Life Republic is like living in a resort. My commute to Hinjewadi Phase 1 is just 10 mins, and my kids love the school within the campus.",
        location: "Echoes Resident",
        image: "/images/home/arezo-thumb.jpg"
    },
    {
        name: "Priya Sharma",
        role: "Healthcare Professional",
        text: "The security and community feel here is unmatched. As a working mother, I feel safe knowing my parents are comfortable in this township.",
        location: "Aros Resident",
        image: "/images/home/aros-thumb.jpg"
    },
    {
        name: "Sandeep Varma",
        role: "Senior Architect",
        text: "The attention to detail in the master planning is evident. 150ft wide roads and the abundance of green spaces make it world-class.",
        location: "Atmos Resident",
        image: "/images/home/canvas-thumb.jpg"
    }
];

export const TestimonialCarousel: React.FC = () => {
    return (
        <section className="py-32 bg-secondary text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em] block mb-4 italic">Social Synthesis</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Resident Stories</h2>
                    <div className="w-24 h-1 bg-accent mx-auto"></div>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 6000 }}
                    loop={true}
                    pagination={{ clickable: true }}
                    className="max-w-5xl"
                >
                    {testimonials.map((t, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-12">
                                <div className="relative order-2 lg:order-1">
                                    <div className="absolute -left-8 -top-8 text-accent/20">
                                        <Quote size={120} />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex gap-1 text-accent mb-8">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={18} fill="currentColor" />
                                            ))}
                                        </div>
                                        <p className="text-2xl md:text-4xl font-serif font-light leading-relaxed mb-12 italic text-gray-200">
                                            "{t.text}"
                                        </p>
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center font-serif text-2xl text-accent font-bold">
                                                {t.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold tracking-wider">{t.name}</h4>
                                                <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mt-1">
                                                    <CheckCircle2 size={12} />
                                                    {t.location}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-1 lg:order-2">
                                    <motion.div 
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
                                    >
                                        <img loading="lazy" src={t.image} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-60"></div>
                                    </motion.div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .swiper-pagination-bullet {
                    background: white !important;
                    opacity: 0.2;
                }
                .swiper-pagination-bullet-active {
                    background: #C5A059 !important;
                    opacity: 1;
                    width: 20px;
                    border-radius: 4px;
                }
            `}} />
        </section>
    );
};
