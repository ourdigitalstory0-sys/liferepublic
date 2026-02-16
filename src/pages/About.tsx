import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export const About: React.FC = () => {
    return (
        <div className="pt-20">
            <Breadcrumbs />
            <SEO
                title="About Kolte Patil Life Republic | 390+ Acre Township in Hinjewadi"
                description="Learn about Life Republic, a 390-acre integrated township by Kolte Patil in Hinjewadi, Pune. Committed to sustainable living with world-class amenities like 150ft wide roads, schools, and fire stations."
                keywords="Kolte Patil Developers, Life Republic Township Details, About Life Republic Hinjewadi, Integrated Township Pune, Kolte Patil History, Township in West Pune"
                canonical="/about"
            />
            <section className="bg-primary pt-20 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-6"
                    >
                        About Life Republic
                    </motion.h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        A township that thinks about you.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-8 text-gray-700 leading-relaxed text-lg">
                        <p>
                            <strong>Kolte Patil Life Republic Township Hinjewadi</strong> is a 390+ acre integrated township located in the heart of Pune's IT hub. It is a community being built for thinking minds. It is built with the core values of creativity, sensitivity, and sustainability.
                        </p>
                        <p>
                            <strong>Transforming Hinjewadi Real Estate:</strong> Life Republic has redefined the property landscape in West Pune. By offering a mix of affordable luxury and premium residences, it has become a preferred choice for IT professionals and investors looking for long-term asset appreciation.
                        </p>
                        <p>
                            As one of the most sought-after addresses, <strong>Kolte Patil Life Republic Township Hinjewadi</strong> offers a wide range of residential options including 1, 2, 3 BHK flats, villas, and row houses.
                        </p>
                        <p>
                            Kolte Patil Life Republic Township is a project by Kolte-Patil Developers Ltd., one of the foremost real estate developer in Pune.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};
