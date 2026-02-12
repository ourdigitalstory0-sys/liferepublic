import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { MapPin, Train, School, Stethoscope, ShoppingBag, Briefcase } from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export const LocationHighlights: React.FC = () => {
    return (
        <div className="pt-20">
            <Breadcrumbs />
            <SEO
                title="Hinjewadi Real Estate Market & Location | Investment in Life Republic"
                description="Why invest in Hinjewadi Real Estate? Pune's prime IT Hub offers high rental yield and property appreciation. Explore connectivity to Metro, Schools, and Offices from Life Republic."
                keywords="Hinjewadi Real Estate, Property in Hinjewadi, Investment in Hinjewadi, Flats near Hinjewadi IT Park, Real Estate Trends Pune, Life Republic Location Advantage"
                canonical="/location-highlights"
            />

            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center bg-primary-dark text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://liferepublic.in/images/gallery/eros/master-layout.webp')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif font-bold mb-6"
                    >
                        Hinjewadi: The Silicon Valley of Pune
                    </motion.h1>
                    <p className="text-xl max-w-3xl mx-auto text-gray-200 font-light">
                        Located in the strategic IT hub/Real Estate goldmine of Pune, Kolte Patil Life Republic Township offers the perfect blend of work-life balance and high investment returns.
                    </p>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-serif font-bold text-secondary mb-6">Why Invest in Hinjewadi Real Estate?</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Hinjewadi is not just an IT hub; it is a thriving **Real Estate ecosystem**. Home to the Rajiv Gandhi Infotech Park, it hosts global tech giants like Infosys, Wipro, TCS, and Cognizant, driving massive demand for residential property. With the upcoming **Pune Metro Line 3** connecting Hinjewadi to Shivajinagar, property prices are witnessing a steady appreciation, identifying it as one of India's top corridors for **High Rental Yields** and **Capital Appreciation**.
                        </p>
                    </div>
                </div>
            </section>

            {/* Connectivity Grid */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif font-bold text-center text-secondary mb-12">Unmatched Connectivity</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Work */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <Briefcase className="w-10 h-10 text-accent mb-4" />
                            <h3 className="text-xl font-bold mb-4">IT Hubs</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Rajiv Gandhi IT Park Ph 1: 10 mins</li>
                                <li>• Wipro Circle: 15 mins</li>
                                <li>• Embassy Tech Zone: 12 mins</li>
                                <li>• Quadron Business Park: 10 mins</li>
                            </ul>
                        </div>

                        {/* Transport */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <Train className="w-10 h-10 text-accent mb-4" />
                            <h3 className="text-xl font-bold mb-4">Transport & Metro</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Upcoming Metro Station: 5 mins</li>
                                <li>• Mumbai-Pune Expressway: 15 mins</li>
                                <li>• Pune Railway Station: 45 mins</li>
                                <li>• Pune International Airport: 50 mins</li>
                            </ul>
                        </div>

                        {/* Education */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <School className="w-10 h-10 text-accent mb-4" />
                            <h3 className="text-xl font-bold mb-4">Schools & Colleges</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Mahindra International School: 5 mins</li>
                                <li>• Blue Ridge Public School: 10 mins</li>
                                <li>• Symbiosis Institute: 15 mins</li>
                                <li>• Indira College: 15 mins</li>
                            </ul>
                        </div>

                        {/* Healthcare */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <Stethoscope className="w-10 h-10 text-accent mb-4" />
                            <h3 className="text-xl font-bold mb-4">Healthcare</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Ruby Hall Clinic: 10 mins</li>
                                <li>• Sanjeevani Hospital: 12 mins</li>
                                <li>• Aditya Birla Hospital: 20 mins</li>
                                <li>• Life Point Hospital: 15 mins</li>
                            </ul>
                        </div>

                        {/* Entertainment */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <ShoppingBag className="w-10 h-10 text-accent mb-4" />
                            <h3 className="text-xl font-bold mb-4">Malls & Entertainment</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Xion Mall: 10 mins</li>
                                <li>• Grand Highstreet: 12 mins</li>
                                <li>• Phoenix Mall of the Millennium: 20 mins</li>
                                <li>• Balewadi High Street: 20 mins</li>
                            </ul>
                        </div>

                        {/* Nature */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <MapPin className="w-10 h-10 text-accent mb-4" />
                            <h3 className="text-xl font-bold mb-4">Nearby Landmarks</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• MCA Stadium: 15 mins</li>
                                <li>• Balewadi Stadium: 20 mins</li>
                                <li>• Oxford Golf Course: 25 mins</li>
                                <li>• Hyatt Place: 10 mins</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
