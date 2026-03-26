import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Plane, Globe, DollarSign, PieChart, ShieldCheck, Users, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';

const investmentStats = [
    { label: 'Annual Appreciation', value: '12%+', icon: TrendingUp },
    { label: 'Rental Demand', value: 'High', icon: Users },
    { label: 'Township Community', value: 'Global', icon: Globe },
    { label: 'RERA Compliance', value: '100%', icon: ShieldCheck },
];

export const NRIInvestment: React.FC = () => {
    return (
        <div className="pt-20">
            <SEO 
                title="NRI Investment Guide: Kolte Patil Life Republic Hinjewadi"
                description="The definitive guide for NRI investors looking to capitalize on Pune's real estate growth. Deep analysis of ROI, taxation, and community living at Life Republic Hinjewadi."
                keywords="NRI investment Pune, Hinjewadi real estate for NRIs, Kolte Patil NRI guide, Life Republic ROI, Pune property appreciation"
            />
            <Breadcrumbs />
            
            {/* Hero Section */}
            <section className="relative py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-secondary font-bold tracking-widest uppercase text-sm flex items-center gap-2 mb-4"
                            >
                                <Plane size={16} /> Global Investor Portfolio
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-serif font-bold text-secondary mb-6 leading-tight"
                            >
                                The NRI Gateway to <br />
                                <span className="text-accent underline-offset-8 underline decoration-double">Pune Real Estate</span>
                            </motion.h1>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Secure your future in India's most resilient real estate market. Kolte Patil Life Republic offers a premium township experience for the global Indian.
                            </p>
                            <div className="flex gap-4">
                                <Button size="lg" className="rounded-full px-12">Download Investor Kit</Button>
                                <Button variant="outline" size="lg" className="rounded-full px-12 border-gray-200">Talk to NRI Desk</Button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
                            <img 
                                src="/images/home/nri-hero.webp" 
                                alt="NRI Investment Opportunities at Life Republic" 
                                className="w-full h-auto rounded-3xl shadow-2xl grayscale-20 hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Summary from investmentStats */}
            <section className="py-12 bg-gray-50 border-y border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {investmentStats.map((stat, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-accent">
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-secondary">{stat.value}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Invest Section */}
            <section className="py-24 bg-secondary">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Why Choice Life Republic?</h2>
                        <div className="w-24 h-1 bg-accent mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                                <DollarSign size={32} className="text-accent group-hover:text-secondary transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Capital Appreciation</h3>
                            <p className="text-gray-400">Hinjewadi real estate has consistently outperformed other Pune micro-markets over the last decade.</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                                <PieChart size={32} className="text-accent group-hover:text-secondary transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Rental Yield</h3>
                            <p className="text-gray-400">Proximity to IT Phase 1, 2, and 3 ensures a robust tenant pool from top-tier tech firms.</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                                <ShieldCheck size={32} className="text-accent group-hover:text-secondary transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">RERA Verification</h3>
                            <p className="text-gray-400">Every cluster at Life Republic is RERA certified, giving global investors peace of mind and total transparency.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NRI Services Desk */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row">
                        <div className="p-12 md:w-1/2">
                            <h2 className="text-3xl font-serif font-bold text-secondary mb-6">Dedicated NRI Support</h2>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-gray-600">
                                    <div className="w-2 h-2 bg-accent rounded-full"></div> Virtual Site Tours
                                </li>
                                <li className="flex items-center gap-3 text-gray-600">
                                    <div className="w-2 h-2 bg-accent rounded-full"></div> Documentation & Legal Support
                                </li>
                                <li className="flex items-center gap-3 text-gray-600">
                                    <div className="w-2 h-2 bg-accent rounded-full"></div> Rental Management Program
                                </li>
                                <li className="flex items-center gap-3 text-gray-600">
                                    <div className="w-2 h-2 bg-accent rounded-full"></div> Zero-Visit Booking Process
                                </li>
                            </ul>
                            <Button className="w-full rounded-full">Contact NRI Specialist</Button>
                        </div>
                        <div className="md:w-1/2 bg-accent/10 p-12 flex items-center justify-center">
                            <div className="text-center">
                                <Globe size={80} className="text-accent mx-auto mb-6 opacity-50" />
                                <div className="text-4xl font-serif font-bold text-secondary mb-2">2500+</div>
                                <div className="text-secondary/60 uppercase tracking-widest text-sm font-bold">NRI Families Onboarded</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
