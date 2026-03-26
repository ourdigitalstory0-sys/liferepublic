import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Globe, ShieldCheck, Landmark, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { InvestmentLedger } from '../components/sections/InvestmentLedger';
import { YieldCalculator } from '../components/tools/YieldCalculator';
import { ProjectComparison } from '../components/sections/ProjectComparison';
import { SectorLinkMesh } from '../components/sections/SectorLinkMesh';
import { generateFAQSchema } from '../utils/schemaGenerator';

const nriFAQs = [
    {
        question: "Can NRIs buy property in Kolte Patil Life Republic?",
        answer: "Yes, NRIs can legally purchase residential property in Life Republic under FEMA guidelines. Repatriation of sale proceeds is allowed for up to two residential properties."
    },
    {
        question: "What are the tax benefits for NRI investors in Pune real estate?",
        answer: "NRIs can claim tax deductions under Section 80C for principal repayment and Section 24 for interest on home loans. 20% TDS applies to long-term capital gains, which can be adjusted via indexation."
    },
    {
        question: "Does Life Republic provide property management for global owners?",
        answer: "Yes, the township offers 'Planet App' integration for remote monitoring and professional property management services for rental pickups and maintenance."
    }
];

export const NRIInvestmentHub: React.FC = () => {
    return (
        <div className="pt-20">
            <SEO 
                title="NRI Real Estate Investment Guide Pune | Life Republic Hinjewadi"
                description="The definitive investment portal for NRIs and global investors at Kolte Patil Life Republic. Access historical appreciation ledgers, yield calculators, and repatriation guides."
                keywords="NRI investment Pune, buy property in Hinjewadi from USA, Life Republic ROI, Pune real estate for NRIs, FEMA repatriation rules property India"
                schema={generateFAQSchema(nriFAQs)}
            />
            <Breadcrumbs />

            {/* Global Authority Hero */}
            <section className="relative py-32 bg-secondary overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-gold.svg')] opacity-5"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="px-6 py-2 bg-accent/20 text-accent rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8 inline-block border border-accent/20">
                            Global Investors Portal
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
                            Invest in Pune's <br />
                            <span className="text-accent underline decoration-white/10 underline-offset-8">Sovereign Growth Corridor</span>
                        </h1>
                        <p className="text-white/60 text-xl max-w-3xl mx-auto leading-relaxed mb-12">
                            Secure your future in India's most resilient integrated township. Professional-grade ROI analytics for the cross-border investor.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="primary" size="lg" className="rounded-full px-12" onClick={() => document.getElementById('ledger')?.scrollIntoView({ behavior: 'smooth' })}>
                                View Performance Ledger
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full px-12 border-white/20 text-white hover:bg-white/10">
                                Download NRI Guide PDF
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Yield Analytics */}
            <YieldCalculator />

            {/* Historical Performance */}
            <div id="ledger">
                <InvestmentLedger />
            </div>

            {/* Comparison Hub */}
            <ProjectComparison />

            {/* NRI Trust Elements */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-secondary">
                                <Landmark size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-secondary">Repatriation Ease</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Seamless capital repatriation as per FEMA guidelines. Our dedicated NRI desk assists with PIS account management and NRE/NRO compliance.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-secondary">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-secondary">Digital Governance</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Monitor your investment from anywhere in the world. Virtual site visits, e-registration, and real-time construction tracking via the Planet App.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-secondary">
                                <Globe size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-secondary">Global Connectivity</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Strategically located for global ease. 15 mins to Mumbai-Pune Expressway and proximity to upcoming Pune Metro nodes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-accent relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-8">Ready to Expand Your Portfolio?</h2>
                    <p className="text-secondary/60 max-w-2xl mx-auto mb-12 text-lg">
                        Schedule a one-on-one virtual consultation with our NRI investment strategists. Available across all time zones.
                    </p>
                    <Button 
                        variant="secondary" 
                        size="lg" 
                        className="rounded-full px-16 h-16 text-lg hover:scale-105 transition-all shadow-2xl"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge'))}
                    >
                        Request Virtual Tour <ArrowRight size={20} className="ml-3" />
                    </Button>
                </div>
            </section>

            <SectorLinkMesh />
        </div>
    );
};
