import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Home, IndianRupee } from 'lucide-react';
import { Button } from '../ui/Button';
import { api } from '../../services/api';
import type { Project } from '../../lib/types';

export const ProjectComparison: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await api.projects.getAll();
                setProjects(data);
                // Pre-select first two
                if (data.length >= 2) {
                    setSelectedIds([data[0].id, data[1].id]);
                }
            } catch (error) {
                console.error('Failed to load projects:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProjects();
    }, []);

    const toggleProject = (id: string) => {
        if (selectedIds.includes(id)) {
            if (selectedIds.length > 1) {
                setSelectedIds(selectedIds.filter(i => i !== id));
            }
        } else {
            if (selectedIds.length < 3) {
                setSelectedIds([...selectedIds, id]);
            }
        }
    };

    const comparedProjects = projects.filter(p => selectedIds.includes(p.id));

    if (loading) return <div className="py-24 text-center">Loading comparisons...</div>;

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-secondary mb-4">Sovereign Project Comparison Hub</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Select up to 3 projects to compare configurations, amenities, and investment potential side-by-side.</p>
                </div>

                {/* Selection Bar */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {projects.map(p => (
                        <button
                            key={p.id}
                            onClick={() => toggleProject(p.id)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                                selectedIds.includes(p.id)
                                    ? 'bg-secondary text-white border-secondary shadow-lg'
                                    : 'bg-white text-gray-400 border-gray-100 hover:border-accent'
                            }`}
                        >
                            {p.title}
                        </button>
                    ))}
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {comparedProjects.map((p, idx) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-gray-50 rounded-[2.5rem] border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all"
                            >
                                <div className="relative h-48">
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                                        <h3 className="text-xl font-bold text-white">{p.title}</h3>
                                        <div className="text-accent text-sm font-bold uppercase tracking-widest">{p.category}</div>
                                    </div>
                                </div>

                                <div className="p-8 space-y-6">
                                    <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-4">
                                        <span className="text-gray-400 uppercase font-bold tracking-tighter">Starting Price</span>
                                        <span className="text-secondary font-bold flex items-center gap-1">
                                            <IndianRupee size={14} /> {p.price}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Core Features</div>
                                        {p.features.slice(0, 4).map((f, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                <CheckCircle2 size={16} className="text-accent" /> {f}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-gray-200">
                                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Investment Rating</div>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className={`w-8 h-1 rounded-full ${i < 4 ? 'bg-accent' : 'bg-gray-200'}`}></div>
                                            ))}
                                        </div>
                                        <div className="text-xs text-gray-500 italic">High yield potential due to Phase 1 proximity.</div>
                                    </div>

                                    <Button 
                                        onClick={() => window.location.href = `/projects/${p.id}`}
                                        variant="outline" 
                                        className="w-full rounded-2xl group/btn"
                                    >
                                        Detailed Ledger <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Empty Slots */}
                    {[...Array(3 - comparedProjects.length)].map((_, i) => (
                        <div key={`empty-${i}`} className="hidden md:flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[2.5rem] bg-gray-50/50 p-12 text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-200 mb-4">
                                <Home size={32} />
                            </div>
                            <h4 className="text-gray-400 font-bold mb-2">Compare Another Project</h4>
                            <p className="text-gray-400 text-xs">Select a sector from the bar above to audit it side-by-side.</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
