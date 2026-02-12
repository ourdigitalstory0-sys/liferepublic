import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { api } from '../../services/api';
import type { Amenity } from '../../lib/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const AmenitiesCarousel: React.FC = () => {
    const [amenities, setAmenities] = useState<Amenity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAmenities = async () => {
            try {
                const data = await api.amenities.getAll();
                // Filter only amenities with images for the carousel
                setAmenities(data.filter(a => a.image_url));
            } catch (error) {
                console.error('Failed to load amenities:', error);
            } finally {
                setLoading(false);
            }
        };
        loadAmenities();
    }, []);

    const displayAmenities = amenities.length > 0 ? amenities : [
        {
            image_url: "https://liferepublic.in/images/gallery/clubhouse.webp",
            title: "Grand Clubhouse",
            description: "A sprawling clubhouse for social gatherings and recreation."
        },
        {
            image_url: "https://liferepublic.in/images/homeaminities/aminities/1714995734Boulevard%201-%20DSC_2081-%20911%20x%20500%20copy.webp",
            title: "Green Boulevards",
            description: "Lush green pathways for peaceful walks and nature connect."
        },
        {
            image_url: "https://liferepublic.in/images/homeaminities/aminities/1714995818Swimming-pool.webp",
            title: "Infinity Pool",
            description: "Relax and rejuvenate in our temperature-controlled swimming pool."
        },
        {
            image_url: "https://liferepublic.in/images/homeaminities/aminities/1714995633Boulevard%202-%20DSC_2109-%20911%20x%20500%20copy.webp",
            title: "Landscaped Gardens",
            description: "Beautifully manicured gardens that soothe your senses."
        },
        {
            image_url: "https://liferepublic.in/images/homeaminities/aminities/1708779581amenities-02.webp",
            title: "Sports Arena",
            description: "World-class facilities for tennis, basketball, and more."
        }
    ];

    if (loading) return null; // Or a spinner

    return (
        <section className="py-24 bg-primary overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl lg:text-5xl font-serif font-bold mb-4 text-secondary"
                    >
                        World-Class Amenities
                    </motion.h2>
                    <div className="w-24 h-1 bg-accent mx-auto mb-6" />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto text-lg"
                    >
                        Discover a lifestyle designed for comfort, luxury, and holistic well-being.
                    </motion.p>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="pb-16"
                >
                    {displayAmenities.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="group relative h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    width="400"
                                    height="400"
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <h3 className="text-2xl font-serif font-bold text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-200 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};
