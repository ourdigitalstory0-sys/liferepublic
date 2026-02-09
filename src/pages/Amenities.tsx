import React from 'react';
import { motion } from 'framer-motion';
import { Trees, Dumbbell, Music, ShieldCheck, Gamepad2, Coffee, BookOpen, Users } from 'lucide-react';

export const Amenities: React.FC = () => {
    const amenities = [
        { icon: Trees, title: "3.5 Acre Urban Park", desc: "A massive green zone with 7,700+ trees and botanical gardens." },
        { icon: Dumbbell, title: "Olympic-size Pool", desc: "State-of-the-art swimming facilities and fitness centers." },
        { icon: Music, title: "United Sky Theatre", desc: "Open-air amphitheatre for community events and cultural nights." },
        { icon: ShieldCheck, title: "Multi-level Security", desc: "Advanced security systems and fire station within the township." },
        { icon: Gamepad2, title: "Indoor Games", desc: "Dedicated zones for table tennis, carrom, and board games." },
        { icon: Coffee, title: "Clubhouse & Cafe", desc: "Luxurious clubhouse with cafe for social gatherings." },
        { icon: BookOpen, title: "Library & Study", desc: "Quiet spaces for reading and focused work." },
        { icon: Users, title: "Community Hall", desc: "Spacious multipurpose hall for celebrations and events." }
    ];

    return (
        <div className="pt-20">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {amenities.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 group"
                            >
                                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold font-serif text-secondary mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
