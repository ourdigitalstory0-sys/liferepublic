import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Globe, TrendingUp, Landmark, ShieldCheck } from 'lucide-react';

export const NRICorner: React.FC = () => {
    return (
        <div className="pt-20">
            <SEO
                title="NRI Property Investment in Pune | Kolte Patil Life Republic Hinjewadi"
                description="Ultimate guide for NRI investors looking to buy property in Hinjewadi, Pune. High rental yield, capital appreciation, and hassle-free documentation at Life Republic."
                keywords="NRI Investment Pune, Buy Property in India from USA, Expat Housing Pune, Kolte Patil NRI Services, Invest in Hinjewadi"
                canonical="/nri-corner"
            />
            <Breadcrumbs />

            {/* Hero */}
            <section className="relative h-[40vh] flex items-center justify-center bg-primary-dark text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                {/* Placeholder for a global/map themed image */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-black opacity-80"></div>
                <div className="container mx-auto px-4 relative z-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif font-bold mb-4"
                    >
                        NRI Investment Corner
                    </motion.h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-300">
                        Secure your roots in India with Pune's most trusted township.
                    </p>
                </div>
            </section>

            {/* Why Invest */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif font-bold text-secondary mb-4">Why NRIs Choose Life Republic?</h2>
                        <div className="w-24 h-1 bg-accent mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <TrendingUp className="w-12 h-12 text-accent mb-6" />
                            <h3 className="text-xl font-bold mb-3">High Capital Appreciation</h3>
                            <p className="text-gray-600 text-sm">Hinjewadi has seen a consistent 8-10% annual appreciation due to the IT boom and Metro connectivity.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <Landmark className="w-12 h-12 text-accent mb-6" />
                            <h3 className="text-xl font-bold mb-3">Rental Yield</h3>
                            <p className="text-gray-600 text-sm">With thousands of IT professionals nearby, rental demand is perennial, offering 4-5% rental fields.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <ShieldCheck className="w-12 h-12 text-accent mb-6" />
                            <h3 className="text-xl font-bold mb-3">Trusted Developer</h3>
                            <p className="text-gray-600 text-sm">Kolte Patil Developers is a listed entity (NSE/BSE) ensuring transparency and timely delivery.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <Globe className="w-12 h-12 text-accent mb-6" />
                            <h3 className="text-xl font-bold mb-3">Remote Management</h3>
                            <p className="text-gray-600 text-sm">Our dedicated NRI desk helps with documentation, home loans, and property management from abroad.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-serif font-bold text-secondary mb-12 text-center">NRI FAQ</h2>
                    <div className="space-y-6">
                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-lg mb-2">Can NRIs buy property in India?</h3>
                            <p className="text-gray-600">Yes, NRIs holding a valid Indian passport or PIO/OCI card can buy both residential and commercial properties in India.</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-lg mb-2">Do I need a power of attorney (POA)?</h3>
                            <p className="text-gray-600">While not mandatory for purchase, a special POA allows someone to complete formalities on your behalf if you cannot be physically present.</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-lg mb-2">Can I get a home loan?</h3>
                            <p className="text-gray-600">Yes, most Indian banks provide home loans to NRIs for up to 80% of the property value, subject to eligibility.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
