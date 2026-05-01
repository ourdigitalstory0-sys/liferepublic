import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Calculator, ShieldCheck, ChevronRight, Zap, Target, Sparkles } from 'lucide-react';

export const ROICalculator: React.FC = () => {
    const [investment, setInvestment] = useState(8500000); 
    const [years, setYears] = useState(5);
    const [strategy, setStrategy] = useState<'conservative' | 'aggressive'>('aggressive');
    
    const appreciationRate = strategy === 'aggressive' ? 0.12 : 0.08;
    
    const futureValue = useMemo(() => {
        return Math.floor(investment * Math.pow(1 + appreciationRate, years));
    }, [investment, years, appreciationRate]);

    const profit = futureValue - investment;

    const getVerdict = () => {
        if (years >= 10) return "Strategic Multi-Generational Asset";
        if (years >= 5) return "High-Yield Growth Corridor Acquisition";
        return "Tactical Mid-Term Capital Appreciation";
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <section className="py-24 bg-white overflow-hidden relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl text-left">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full mb-6"
                        >
                            <Target size={14} className="text-accent" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Tectonic ROI Engine v2.0</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary mb-6 leading-tight">
                            Project Your <br /> <span className="text-accent italic">Wealth Velocity.</span>
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed font-medium">
                            Synthesize your portfolio's growth based on Hinjewadi's 2026 infrastructure roadmap. Our engine accounts for the **Metro Expansion** and the **Spine Road Connectivity** delta.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Controls */}
                    <div className="lg:col-span-5 bg-gray-50 rounded-[3rem] p-10 md:p-14 border border-gray-100 flex flex-col justify-between">
                        <div className="space-y-16">
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <label className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                                        <TrendingUp className="text-accent" size={18} />
                                        Capital Input
                                    </label>
                                    <span className="text-2xl font-serif font-bold text-secondary">{formatCurrency(investment)}</span>
                                </div>
                                <input 
                                    type="range"
                                    min="6000000"
                                    max="50000000"
                                    step="500000"
                                    value={investment}
                                    onChange={(e) => setInvestment(Number(e.target.value))}
                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                                />
                                <div className="flex justify-between mt-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span>60 Lacs</span>
                                    <span>5 Cr</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <label className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                                        <Calculator className="text-secondary" size={18} />
                                        Time Horizon
                                    </label>
                                    <span className="text-2xl font-serif font-bold text-secondary">{years} Years</span>
                                </div>
                                <input 
                                    type="range"
                                    min="1"
                                    max="15"
                                    step="1"
                                    value={years}
                                    onChange={(e) => setYears(Number(e.target.value))}
                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                                />
                                <div className="flex justify-between mt-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span>Launch (2024)</span>
                                    <span>Maturity (2039)</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <button 
                                    onClick={() => setStrategy('conservative')}
                                    className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${strategy === 'conservative' ? 'bg-secondary text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                                >
                                    Conservative (8%)
                                </button>
                                <button 
                                    onClick={() => setStrategy('aggressive')}
                                    className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${strategy === 'aggressive' ? 'bg-accent text-secondary shadow-lg' : 'bg-white border border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                                >
                                    Metro Adjusted (12%)
                                </button>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
                            <ShieldCheck className="text-accent shrink-0" size={20} />
                            <p className="text-xs text-gray-500 leading-relaxed font-bold uppercase tracking-wider">
                                Projections account for the 2026 Metro Correction and IT Phase 3 cluster delivery.
                            </p>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="lg:col-span-7 bg-secondary rounded-[3.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between group">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
                        
                        <div className="relative z-10 space-y-12">
                            <div>
                                <div className="flex items-center gap-2 text-accent mb-4">
                                    <Zap size={14} className="animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Sovereign Valuation</span>
                                </div>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-4">Projected Market Value (Year {2024 + years})</p>
                                <motion.h3 
                                    key={futureValue}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-6xl md:text-8xl font-serif font-bold text-white tracking-tighter"
                                >
                                    {formatCurrency(futureValue)}
                                </motion.h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp size={14} className="text-green-400" />
                                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Growth Premium</p>
                                    </div>
                                    <p className="text-3xl font-serif font-bold text-green-400">+{formatCurrency(profit)}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles size={14} className="text-accent" />
                                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Yield Signal</p>
                                    </div>
                                    <p className="text-3xl font-serif font-bold text-white italic">{getVerdict()}</p>
                                </div>
                            </div>

                            <div className="pt-12">
                                <button className="w-full py-6 px-10 bg-white text-secondary rounded-[2rem] flex items-center justify-between font-bold hover:bg-accent hover:scale-[1.02] transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] group">
                                    <span className="text-lg">Synthesize Detailed Investment Monograph</span>
                                    <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all">
                                        <ChevronRight size={24} />
                                    </div>
                                </button>
                                <p className="text-center mt-6 text-[10px] text-white/20 font-bold uppercase tracking-[0.5em]">Secure Ledger Access Protocol v5.0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
