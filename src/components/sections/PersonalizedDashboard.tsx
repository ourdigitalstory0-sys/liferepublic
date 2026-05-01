import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Search, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { personalizationStore } from '../../lib/personalizationStore';
import { Link } from 'react-router-dom';

export const PersonalizedDashboard: React.FC = () => {
    const history = personalizationStore.getHistory();
    
    // Only show if user has some history
    if (history.recentlyViewed.length === 0 && history.searchQueries.length === 0) return null;

    const intentLevel = 
        history.intentScore > 100 ? 'Elite Investor' :
        history.intentScore > 50 ? 'Township Explorer' : 'Active Visitor';

    return (
        <section className="py-20 bg-secondary overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/images/pattern-dark.svg')] opacity-10"></div>
            <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-12"
                >
                    <div className="max-w-xl text-white">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full mb-6">
                            <Sparkles size={16} className="text-accent" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Personalized Discovery Hub</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                            Welcome Back, <br /> 
                            <span className="text-accent">Future Citizen.</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Based on your browsing activity, we've synthesized a custom township overview. You are currently indexed as an <strong className="text-white">{intentLevel}</strong>.
                        </p>
                        
                        <div className="flex items-center gap-6">
                             <div className="flex -space-x-3">
                                {[1,2,3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-secondary bg-gray-800 flex items-center justify-center">
                                        <User size={16} className="text-gray-500" />
                                    </div>
                                ))}
                             </div>
                             <p className="text-xs text-gray-400 font-medium">Joined by 12,452+ families in this ecosystem.</p>
                        </div>
                    </div>

                    <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Recently Viewed */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-accent/20 rounded-lg text-accent">
                                    <MapPin size={20} />
                                </div>
                                <h4 className="text-white font-bold">Your Interest Map</h4>
                            </div>
                            <div className="space-y-4">
                                {history.recentlyViewed.length > 0 ? history.recentlyViewed.slice(0, 3).map((slug, i) => (
                                    <Link key={i} to={`/projects/${slug}`} className="flex items-center justify-between group">
                                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors capitalize">{slug.split('-').slice(0, 2).join(' ')}</span>
                                        <ArrowRight size={14} className="text-accent opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                )) : (
                                    <p className="text-xs text-gray-500 italic">No sectors viewed yet.</p>
                                )}
                            </div>
                        </div>

                        {/* Search Intelligence */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                    <Search size={20} />
                                </div>
                                <h4 className="text-white font-bold">Search History</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {history.searchQueries.length > 0 ? history.searchQueries.slice(0, 5).map((q, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-neural-search'))}
                                        className="px-3 py-1.5 bg-white/5 rounded-lg text-[10px] text-gray-400 hover:bg-accent hover:text-secondary transition-all font-bold uppercase tracking-wider"
                                    >
                                        {q}
                                    </button>
                                )) : (
                                    <p className="text-xs text-gray-500 italic">Try searching for '3 BHK'.</p>
                                )}
                            </div>
                        </div>

                        {/* Intent Progress */}
                        <div className="md:col-span-2 bg-accent p-8 rounded-[2.5rem] text-secondary flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-secondary text-accent rounded-2xl flex items-center justify-center shadow-xl">
                                    <TrendingUp size={32} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold">Sovereignty Level: {history.intentScore}</h4>
                                    <p className="text-xs font-bold text-secondary/60 uppercase tracking-widest">Next Milestone: Unlock Priority Site Visit</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge'))}
                                className="px-8 py-4 bg-secondary text-white rounded-full font-bold hover:bg-white hover:text-secondary transition-all shadow-2xl"
                            >
                                Re-Sync with Concierge
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
