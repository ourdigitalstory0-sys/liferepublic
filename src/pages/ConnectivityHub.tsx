import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { MapPin, Car, Building2, Milestone, Info } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { InfraTracker } from '../components/sections/InfraTracker';
import { SectorLinkMesh } from '../components/sections/SectorLinkMesh';

const locationNodes = [
    {
        title: "IT Hubs & Workspaces",
        nodes: [
            { name: "Hinjewadi Phase 1", distance: "4.5 km", time: "10 Mins" },
            { name: "Hinjewadi Phase 2", distance: "6.0 km", time: "12 Mins" },
            { name: "Hinjewadi Phase 3", distance: "7.5 km", time: "15 Mins" },
            { name: "Rajiv Gandhi Infotech Park", distance: "5.0 km", time: "10 Mins" }
        ],
        icon: Building2
    },
    {
        title: "Transit & Expressways",
        nodes: [
            { name: "Mumbai-Pune Expressway", distance: "8.0 km", time: "15 Mins" },
            { name: "Pune Metro Line 3", distance: "2.0 km", time: "5 Mins" },
            { name: "Pune Airport (PNQ)", distance: "26 km", time: "55 Mins" },
            { name: "Pune Railway Station", distance: "20 km", time: "45 Mins" }
        ],
        icon: Car
    },
    {
        title: "Education & Healthcare",
        nodes: [
            { name: "Anisha Global School", distance: "Inside", time: "Walk" },
            { name: "Ruby Hall Clinic", distance: "6.5 km", time: "15 Mins" },
            { name: "LifePoint Hospital", distance: "7.0 km", time: "18 Mins" },
            { name: "Symbiosis University", distance: "11 km", time: "25 Mins" }
        ],
        icon: Milestone
    }
];

export const ConnectivityHub: React.FC = () => {
    return (
        <div className="pt-20">
            <SEO 
                title="Connectivity & Distance Guide | Life Republic to Hinjewadi Phase 1, 2, 3"
                description="Official connectivity guide for Kolte Patil Life Republic. Real-time distance data to Hinjewadi IT Park, Metro Line 3, Mumbai Expressway, and Marunji Road."
                keywords="Life Republic connectivity, Hinjewadi phase 1 distance, Life Republic to Mumbai Expressway, Pune Metro Line 3 Hinjewadi, Marunji road development"
            />
            <Breadcrumbs />

            {/* Sovereign Location Hero */}
            <section className="relative py-24 bg-secondary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-black/50 z-10"></div>
                <div className="absolute inset-0 bg-[url('/images/gallery/eros/master-layout.webp')] bg-cover bg-center opacity-20"></div>
                <div className="container mx-auto px-4 relative z-20">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 text-accent rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            <MapPin size={14} /> Township Connectivity Ledger
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                            Strategic Connectivity & <br />
                            <span className="text-accent">Urban Mobility Matrix</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
                            Kolte Patil Life Republic is architected at the geographic center of Pune's West growth corridor, providing seamless access to the global IT hub and critical transit arteries.
                        </p>
                    </div>
                </div>
            </section>

            {/* Distance Matrix */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {locationNodes.map((cat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100"
                            >
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-accent mb-8">
                                    <cat.icon size={28} />
                                </div>
                                <h2 className="text-2xl font-bold text-secondary mb-8">{cat.title}</h2>
                                <div className="space-y-6">
                                    {cat.nodes.map((node, nIdx) => (
                                        <div key={nIdx} className="flex items-center justify-between group">
                                            <div>
                                                <div className="font-bold text-secondary group-hover:text-accent transition-colors">{node.name}</div>
                                                <div className="text-xs text-gray-400 uppercase font-medium mt-1">{node.time} Drive</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-serif font-bold text-secondary">{node.distance}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Infrastructure Tracker Integration */}
            <InfraTracker />

            {/* Connectivity Specific Content */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-gray-100">
                            <h2 className="text-3xl font-serif font-bold text-secondary mb-8">Marunji-Hinjewadi Corridor Analysis</h2>
                            <div className="prose prose-lg text-gray-600">
                                <p className="mb-6 leading-relaxed">
                                    The <strong>Marunji Road expansion</strong> is a pivotal infrastructure project for Life Republic. Upgrading to a 150ft spine road ensures that even with 12,000+ families, the internal transit remains fluid.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                                    <div className="p-6 bg-accent/5 rounded-2xl border border-accent/10">
                                        <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                                            <Info size={18} className="text-accent" /> Metro Impact
                                        </h4>
                                        <p className="text-sm italic">Property values within 3km of Metro Line 3 (Maan Station) are projected to appreciate by 15-18% upon launch.</p>
                                    </div>
                                    <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10">
                                        <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                                            <Info size={18} className="text-secondary" /> Ring Road Link
                                        </h4>
                                        <p className="text-sm italic">The upcoming PMRDA Ring Road will provide a bypass to Chakan and Talegaon MIDCs, making it a logistics hub.</p>
                                    </div>
                                </div>
                                <p className="leading-relaxed">
                                    For IT professionals, the <strong>"Walk to Work"</strong> concept is realized through the proximity to Hinjewadi Phase 1. Life Republic residents save an average of 90 minutes daily in commute time compared to Wakad or Baner.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Semantic Mesh */}
            <div className="py-12 border-t border-gray-100">
                <SectorLinkMesh />
            </div>

            {/* High Conversion Footer */}
            <section className="py-24 bg-secondary">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-serif font-bold text-white mb-8">Optimize Your Commute</h2>
                    <p className="text-white/60 mb-12 max-w-xl mx-auto">Request a personalized route optimization map and see how much time you'll save living at Life Republic.</p>
                    <Button 
                        size="lg" 
                        variant="primary" 
                        className="rounded-full px-12 h-14"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge'))}
                    >
                        Request Route Analysis
                    </Button>
                </div>
            </section>
        </div>
    );
};
