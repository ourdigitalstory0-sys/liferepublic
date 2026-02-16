import React from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import type { Amenity } from '../lib/types';
import { ICON_MAP } from '../lib/icons';
import { Star } from 'lucide-react';

import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export const Amenities: React.FC = () => {
    const [amenities, setAmenities] = React.useState<Amenity[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadAmenities = async () => {
            try {
                const data = await api.amenities.getAll();
                setAmenities(data);
            } catch (error) {
                console.error('Failed to load amenities:', error);
            } finally {
                setLoading(false);
            }
        };
        loadAmenities();
    }, []);

    // Fallback static data if DB is empty (for smooth transition)
    const displayAmenities = amenities.length > 0 ? amenities : [
        { icon: 'Trees', title: "3.5 Acre Urban Park", description: "A massive green zone with 7,700+ trees and botanical gardens." },
        { icon: 'Dumbbell', title: "Olympic-size Pool", description: "State-of-the-art swimming facilities and fitness centers." },
        { icon: 'Music', title: "United Sky Theatre", description: "Open-air amphitheatre for community events and cultural nights." },
        { icon: 'ShieldCheck', title: "Multi-level Security", description: "Advanced security systems and fire station within the township." },
    ];

    return (
        <div className="pt-20">
            <Breadcrumbs />
            <SEO
                title="World-Class Amenities at Kolte Patil Life Republic Township Hinjewadi"
                description="Discover the world-class amenities at Kolte Patil Life Republic Township Hinjewadi. 3.5-acre urban park, Olympic-size pool, international school, fire station, and 24x7 security."
                keywords="Life Republic Amenities, Clubhouse in Hinjewadi, School in Life Republic, Integrated Township Amenities, Swimming Pool, Gymnasium, Parks in Hinjewadi, Gated Community Facilities"
                canonical="/amenities"
            />
            <section className="bg-primary-dark text-white py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://liferepublic.in/images/slider/1.webp')] bg-cover bg-center opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-serif font-bold mb-6"
                    >
                        World-Class Amenities
                    </motion.h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-200">
                        Experience a lifestyle designed for holistic well-being and community engagement.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="flex justify-center p-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {displayAmenities.map((item, index) => {
                                const IconComponent = ICON_MAP[item.icon as string] || Star;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 group"
                                    >
                                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                                            <IconComponent size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold font-serif text-secondary mb-3">{item.title}</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};
