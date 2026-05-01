import React from 'react';
import { motion } from 'framer-motion';
import { Camera, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

const updates = [
    { id: 1, sector: 'Arezo (R16)', phase: 'Finishing', progress: 92, status: 'On Track', date: 'Oct 2025' },
    { id: 2, sector: 'Atmos (R22)', phase: 'Structure', progress: 45, status: 'On Track', date: 'Oct 2027' },
    { id: 3, sector: 'Aros (R13)', phase: 'Plumbing', progress: 68, status: 'Ahead of Schedule', date: 'Dec 2026' },
    { id: 4, sector: 'Echoes (R17)', phase: 'Excavation', progress: 12, status: 'New Launch', date: 'June 2029' },
    { id: 5, sector: 'Universe (R10)', phase: 'Structure', progress: 55, status: 'On Track', date: 'Dec 2026' },
    { id: 6, sector: 'Duet (R10)', phase: 'Piling', progress: 18, status: 'On Track', date: 'Oct 2029' }
];

export const ConstructionUpdates: React.FC = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em] block mb-4">Real-Time Transparency</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-6">Construction Ledger 2026</h2>
                        <p className="text-gray-500 text-lg leading-relaxed mb-4">
                            Monitor the tectonic pulse of your future home. We maintain a transparent digital ledger of every structural milestone across the 390-acre ecosystem.
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-accent uppercase tracking-widest">
                            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                            Last Site Sync: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </div>
                    </div>
                    <Button 
                        variant="outline" 
                        className="rounded-full border-gray-200 group"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge'))}
                    >
                        Request Site Progress Report <Camera size={18} className="ml-2 group-hover:scale-110 transition-transform" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {updates.map((update, idx) => (
                        <motion.div
                            key={update.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-2xl hover:shadow-secondary/5 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-secondary mb-1">{update.sector}</h3>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">{update.phase} Stage</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${update.status === 'Ahead of Schedule' ? 'bg-green-100 text-green-600' : 'bg-secondary/10 text-secondary/60'}`}>
                                    {update.status}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end text-sm">
                                    <span className="text-gray-500">Overall Completion</span>
                                    <span className="font-bold text-secondary">{update.progress}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${update.progress}%` }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                        className="h-full bg-accent"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-200/50">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Clock size={14} />
                                    <span className="text-xs">Est. Possession: <strong>{update.date}</strong></span>
                                </div>
                                <CheckCircle2 size={18} className="text-accent opacity-20 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
