import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, PieChart, Info, Download, Sparkles, Zap, ShieldCheck, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalizationStore } from '../../lib/personalizationStore';

export const ROICalculator: React.FC = () => {
    const [propertyValue, setPropertyValue] = useState<number>(7500000); // 75 Lakhs
    const [monthlyRent, setMonthlyRent] = useState<number>(28000);
    const [holdingPeriod, setHoldingPeriod] = useState<number>(5);
    const [includeMetroDelta, setIncludeMetroDelta] = useState<boolean>(true);

    const [totalROI, setTotalROI] = useState<number>(0);
    const [finalValue, setFinalValue] = useState<number>(0);
    const [annualYield, setAnnualYield] = useState<number>(0);

    // Tectonic Financial Constants
    const BASE_APPRECIATION = 8.5; // 8.5% Base
    const METRO_DELTA = 3.5; // +3.5% for 2026 Metro Sync
    const RENTAL_INCREMENT = 5; // 5% Annual Rent Increase

    const calculateROI = () => {
        const effectiveRate = BASE_APPRECIATION + (includeMetroDelta ? METRO_DELTA : 0);
        const futureValue = propertyValue * Math.pow((1 + effectiveRate / 100), holdingPeriod);
        
        // Compound Rental Yield calculation
        let totalRent = 0;
        let currentRent = monthlyRent;
        for (let i = 0; i < holdingPeriod; i++) {
            totalRent += currentRent * 12;
            currentRent *= (1 + RENTAL_INCREMENT / 100);
        }

        const totalGain = (futureValue - propertyValue) + totalRent;
        const yieldPercent = (totalRent / (propertyValue * holdingPeriod)) * 100;

        setFinalValue(Math.round(futureValue));
        setTotalROI(Math.round(totalGain));
        setAnnualYield(Number(yieldPercent.toFixed(2)));
    };

    useEffect(() => {
        calculateROI();
        // Reward user for financial engagement
        const timer = setTimeout(() => personalizationStore.updateIntentScore(10), 3000);
        return () => clearTimeout(timer);
    }, [propertyValue, monthlyRent, holdingPeriod, includeMetroDelta]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const priceTrends = [
        { year: '2019', Price: 5500 },
        { year: '2020', Price: 5800 },
        { year: '2021', Price: 6300 },
        { year: '2022', Price: 7000 },
        { year: '2023', Price: 7800 },
        { year: '2024', Price: 8500 },
        { year: '2025', Price: 9400 },
        { year: '2026', Price: 10800 }
    ];

    const maxPrice = Math.max(...priceTrends.map(t => t.Price));

    return (
        <div className="bg-white rounded-[4rem] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.1)] p-10 md:p-20 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full -mr-48 -mt-48 blur-[120px] pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                <div className="flex items-center gap-6">
                    <div className="p-6 bg-secondary text-white rounded-[2rem] shadow-2xl relative group">
                        <TrendingUp size={40} className="group-hover:rotate-12 transition-transform" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-pulse border-4 border-white"></div>
                    </div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-serif font-bold text-secondary tracking-tighter leading-tight">Investment Thesis <br /><span className="text-accent italic">v6.0</span></h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.5em] mt-2">Hinjewadi ROI Synthesis 2026</p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                    <div className="px-6 py-3 bg-green-50 border border-green-100 rounded-full flex items-center gap-3 shadow-sm">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Market Alpha: Scarcity Active</span>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                        <Landmark size={12} /> Verified by Sovereign Intelligence
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                {/* Inputs & Parameters */}
                <div className="lg:col-span-7 space-y-12">
                    <div className="space-y-12 p-12 bg-gray-50 rounded-[3rem] border border-gray-100 shadow-inner">
                        {/* Property Value */}
                        <div className="group">
                            <div className="flex justify-between mb-6">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Principal Asset Value</label>
                                <span className="text-2xl font-bold text-secondary group-hover:text-accent transition-colors">{formatCurrency(propertyValue)}</span>
                            </div>
                            <input
                                type="range" min="4000000" max="30000000" step="100000"
                                value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-accent"
                            />
                        </div>

                        {/* Monthly Rent */}
                        <div className="group">
                            <div className="flex justify-between mb-6">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Projected Monthly Yield</label>
                                <span className="text-2xl font-bold text-secondary group-hover:text-accent transition-colors">{formatCurrency(monthlyRent)}</span>
                            </div>
                            <input
                                type="range" min="15000" max="150000" step="1000"
                                value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-accent"
                            />
                        </div>

                        {/* Holding Period */}
                        <div className="group">
                            <div className="flex justify-between mb-6">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Holding Horizon</label>
                                <span className="text-2xl font-bold text-secondary group-hover:text-accent transition-colors">{holdingPeriod} Years</span>
                            </div>
                            <input
                                type="range" min="3" max="20" step="1"
                                value={holdingPeriod} onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-accent"
                            />
                        </div>

                        {/* Metro Delta Toggle */}
                        <button 
                            onClick={() => setIncludeMetroDelta(!includeMetroDelta)}
                            className={`w-full p-6 rounded-2xl border transition-all flex items-center justify-between group ${includeMetroDelta ? 'bg-secondary border-secondary text-white' : 'bg-white border-gray-100 text-gray-400 hover:border-accent'}`}
                        >
                            <div className="flex items-center gap-4">
                                <Zap size={20} className={includeMetroDelta ? 'text-accent' : 'text-gray-300'} />
                                <div className="text-left">
                                    <p className="text-[10px] font-bold uppercase tracking-widest">Metro Multiplier 2026</p>
                                    <p className={`text-xs ${includeMetroDelta ? 'text-white/60' : 'text-gray-400'}`}>Include +3.5% infrastructure scarcity delta</p>
                                </div>
                            </div>
                            <div className={`w-10 h-5 rounded-full relative transition-colors ${includeMetroDelta ? 'bg-accent' : 'bg-gray-200'}`}>
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${includeMetroDelta ? 'left-6' : 'left-1'}`}></div>
                            </div>
                        </button>
                    </div>

                    {/* Historical Pulse Chart */}
                    <div className="p-10 bg-secondary rounded-[3rem] text-white relative overflow-hidden shadow-2xl group">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Landmark size={80} />
                        </div>
                        <div className="flex justify-between items-center mb-12">
                            <h4 className="text-xl font-serif font-bold flex items-center gap-3">
                                <BarChart3 size={24} className="text-accent" /> Tectonic Price Index
                            </h4>
                            <span className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-40">Hinjewadi Ph 3 Corridor</span>
                        </div>
                        <div className="flex items-end justify-between h-48 gap-3">
                            {priceTrends.map((trend, idx) => (
                                <div key={idx} className="flex flex-col items-center flex-1 group/bar relative">
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(trend.Price / maxPrice) * 100}%` }}
                                        className={`w-full rounded-t-xl transition-all duration-700 ${idx === priceTrends.length - 1 ? 'bg-accent shadow-[0_0_30px_rgba(197,160,89,0.5)]' : 'bg-white/10 group-hover/bar:bg-white/20'}`}
                                    />
                                    <span className="text-[9px] text-white/30 mt-4 font-bold tracking-widest">{trend.year}</span>
                                    <div className="absolute bottom-full mb-3 bg-white text-secondary text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all scale-90 group-hover/bar:scale-100 whitespace-nowrap shadow-2xl">
                                        ₹{trend.Price}/sqft
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Synthesis Card */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                    <div className="flex-1 bg-secondary rounded-[4rem] p-12 text-white relative overflow-hidden flex flex-col justify-between shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)] border border-white/5">
                        <div className="absolute inset-0 bg-[url('/images/aerial-sunset.png')] bg-cover bg-center opacity-5 grayscale pointer-events-none"></div>
                        
                        <div>
                            <div className="flex items-center justify-between mb-12">
                                <div className="flex items-center gap-3">
                                    <PieChart size={24} className="text-accent" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Sovereign Thesis</span>
                                </div>
                                <div className="p-3 bg-white/5 rounded-full">
                                    <ShieldCheck size={20} className="text-accent" />
                                </div>
                            </div>
                            
                            <div className="space-y-12">
                                <div className="group cursor-help">
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.5em] mb-3">Projected Asset Valuation</p>
                                    <p className="text-5xl md:text-6xl font-serif font-bold text-white tracking-tighter group-hover:text-accent transition-colors">{formatCurrency(finalValue)}</p>
                                </div>
                                
                                <div className="group cursor-help">
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.5em] mb-3">Total Wealth Synthesis</p>
                                    <p className="text-5xl md:text-6xl font-serif font-bold text-accent tracking-tighter">+{formatCurrency(totalROI)}</p>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <div className="px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase tracking-widest">
                                            ~{((totalROI / propertyValue) * 100).toFixed(1)}% Absolute ROI
                                        </div>
                                        <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/60 uppercase tracking-widest">
                                            {annualYield}% Annual Yield
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 pt-10 border-t border-white/5 space-y-8">
                             <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                                <div className="flex items-start gap-4">
                                    <Info size={16} className="text-accent mt-1 shrink-0" />
                                    <p className="text-[11px] leading-relaxed text-white/40 italic font-medium">
                                        Synthesized using **Tectonic Scarcity Algorithms**. Assumes effective appreciation of {BASE_APPRECIATION + (includeMetroDelta ? METRO_DELTA : 0)}% anchored to 2026 infrastructure maturity.
                                    </p>
                                </div>
                             </div>
                             
                             <button 
                                onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge', { detail: { project: 'Sovereign Investment Thesis' } }))}
                                className="w-full group bg-accent text-secondary hover:bg-white py-8 rounded-[2rem] font-bold flex items-center justify-center gap-4 transition-all shadow-[0_40px_80px_-20px_rgba(197,160,89,0.4)] text-xl"
                             >
                                Synthesize Custom Ledger <Download size={24} className="group-hover:translate-y-1 transition-transform" />
                             </button>
                        </div>
                    </div>

                    <div className="p-10 bg-accent/5 border border-accent/10 rounded-[3rem] flex items-center gap-8 group hover:bg-accent/10 transition-all">
                        <div className="w-16 h-16 bg-secondary text-accent rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Landmark size={32} />
                        </div>
                        <div>
                            <h4 className="text-xl font-serif font-bold text-secondary tracking-tight">Sovereign Tax Synthesis</h4>
                            <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Integrated tax optimization & managed NRI rental protocols for 2026 portfolios.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
