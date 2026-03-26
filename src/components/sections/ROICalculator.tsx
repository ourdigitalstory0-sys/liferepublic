import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calculator, ShieldCheck, ChevronRight } from 'lucide-react';

export const ROICalculator: React.FC = () => {
    const [investment, setInvestment] = useState(8500000); // Default 85 Lacs
    const [years, setYears] = useState(5);
    const appreciationRate = 0.08; // 8% annual appreciation (conservative for Hinjewadi)
    
    const futureValue = useMemo(() => {
        return Math.floor(investment * Math.pow(1 + appreciationRate, years));
    }, [investment, years]);

    const profit = futureValue - investment;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-accent font-bold tracking-widest uppercase text-sm block mb-4"
                    >
                        Investment Intelligence
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6"
                    >
                        Project Your Growth
                    </motion.h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Analyze the potential of Hinjewadi's prime real estate. Calculation based on historical appreciation trends in the Life Republic corridor.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Controls */}
                    <div className="lg:w-1/2 bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-gray-100">
                        <div className="space-y-12">
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <label className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <TrendingUp className="text-accent" size={20} />
                                        Initial Investment
                                    </label>
                                    <span className="text-2xl font-bold text-accent">{formatCurrency(investment)}</span>
                                </div>
                                <input 
                                    type="range"
                                    min="6000000"
                                    max="50000000"
                                    step="500000"
                                    value={investment}
                                    onChange={(e) => setInvestment(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent"
                                />
                                <div className="flex justify-between mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    <span>60 Lacs</span>
                                    <span>5 Cr</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <label className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <Calculator className="text-blue-500" size={20} />
                                        Investment Horizon
                                    </label>
                                    <span className="text-2xl font-bold text-blue-500">{years} Years</span>
                                </div>
                                <input 
                                    type="range"
                                    min="1"
                                    max="15"
                                    step="1"
                                    value={years}
                                    onChange={(e) => setYears(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <div className="flex justify-between mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    <span>1 Year</span>
                                    <span>15 Years</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4">
                            <ShieldCheck className="text-blue-600 shrink-0" size={24} />
                            <p className="text-sm text-blue-800 leading-relaxed font-medium">
                                These projections are based on Hinjewadi's average annual growth of 8-12%. Physical infrastructure like the Spine Road and Metro expansion are key value drivers.
                            </p>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="lg:w-1/2 bg-secondary rounded-[40px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
                        
                        <div className="relative z-10 space-y-12">
                            <div>
                                <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-2">Estimated Market Value</p>
                                <motion.h3 
                                    key={futureValue}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-5xl md:text-6xl font-bold text-accent"
                                >
                                    {formatCurrency(futureValue)}
                                </motion.h3>
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                                <div>
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Total Appreciation</p>
                                    <p className="text-2xl font-bold text-green-400">+{formatCurrency(profit)}</p>
                                </div>
                                <div>
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Avg. Annual Rental</p>
                                    <p className="text-2xl font-bold text-blue-400">~ 4-5%</p>
                                </div>
                            </div>

                            <button className="w-full py-5 px-8 bg-white text-secondary rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-accent hover:text-secondary transition-all group mt-8">
                                Get Detailed Investment Report <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
