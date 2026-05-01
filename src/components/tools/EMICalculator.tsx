import React, { useState, useEffect } from 'react';
import { Calculator, IndianRupee, Sparkles, ArrowRight, ShieldCheck, Zap, Info, TrendingDown, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalizationStore } from '../../lib/personalizationStore';

export const EMICalculator: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState<number>(5000000);
    const [interestRate, setInterestRate] = useState<number>(8.5);
    const [loanTenure, setLoanTenure] = useState<number>(20);
    const [emi, setEMI] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);

    const calculateEMI = () => {
        const principal = loanAmount;
        const ratePerMonth = interestRate / 12 / 100;
        const tenureMonths = loanTenure * 12;

        const emiValue = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, tenureMonths)) / (Math.pow(1 + ratePerMonth, tenureMonths) - 1);
        const totalPayable = emiValue * tenureMonths;
        
        setEMI(Math.round(emiValue));
        setTotalInterest(Math.round(totalPayable - principal));
    };

    useEffect(() => {
        calculateEMI();
        const timer = setTimeout(() => personalizationStore.updateIntentScore(8), 3000);
        return () => clearTimeout(timer);
    }, [loanAmount, interestRate, loanTenure]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getRecommendedSectors = () => {
        if (emi < 35000) return ['Arezo', 'Universe'];
        if (emi < 60000) return ['Atmos', 'Aros', 'Duet'];
        if (emi < 90000) return ['Echoes', 'Qrious', 'First Avenue'];
        return ['Canvas', '24K Espada', 'Sound of Soul'];
    };

    return (
        <div className="bg-white rounded-[4rem] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.1)] p-10 md:p-20 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full -mr-48 -mt-48 blur-[120px] pointer-events-none"></div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                <div className="flex items-center gap-6">
                    <div className="p-6 bg-secondary text-white rounded-[2rem] shadow-2xl relative group">
                        <Calculator size={40} className="group-hover:rotate-12 transition-transform" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-pulse border-4 border-white"></div>
                    </div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-serif font-bold text-secondary tracking-tighter leading-tight">EMI Strategist <br /><span className="text-accent italic">v6.0</span></h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.5em] mt-2">Operational Precision Synthesis</p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                    <div className="px-6 py-3 bg-blue-50 border border-blue-100 rounded-full flex items-center gap-3 shadow-sm">
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">2026 Rate Benchmark Active</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                <div className="lg:col-span-7 space-y-12">
                    <div className="space-y-12 p-12 bg-gray-50 rounded-[3rem] border border-gray-100 shadow-inner">
                        <div className="group">
                            <div className="flex justify-between mb-6">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Loan Principal</label>
                                <span className="text-2xl font-bold text-secondary group-hover:text-accent transition-colors">{formatCurrency(loanAmount)}</span>
                            </div>
                            <input type="range" min="1000000" max="30000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-accent" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="group">
                                <div className="flex justify-between mb-6"><label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Rate (% p.a)</label><span className="text-2xl font-bold text-secondary group-hover:text-accent transition-colors">{interestRate}%</span></div>
                                <input type="range" min="6" max="15" step="0.05" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-accent" />
                            </div>
                            <div className="group">
                                <div className="flex justify-between mb-6"><label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Tenure (Years)</label><span className="text-2xl font-bold text-secondary group-hover:text-accent transition-colors">{loanTenure} Yrs</span></div>
                                <input type="range" min="5" max="30" step="1" value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-accent" />
                            </div>
                        </div>
                    </div>
                    <div className="p-10 bg-secondary rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                        <div className="flex justify-between items-center mb-10"><h4 className="text-xl font-serif font-bold flex items-center gap-3"><TrendingDown size={24} className="text-accent" /> Tax Benefit Synthesis</h4></div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5"><p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Interest Offset</p><p className="text-2xl font-serif font-bold text-accent">₹2,00,000</p></div>
                            <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5"><p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Principal Offset</p><p className="text-2xl font-serif font-bold text-accent">₹1,50,000</p></div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-8">
                    <div className="flex-1 bg-secondary rounded-[4rem] p-12 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl border border-white/5">
                        <div className="space-y-12">
                            <div><p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.5em] mb-4">Projected Sovereign EMI</p><div className="flex items-center gap-4 text-6xl font-serif font-bold text-white tracking-tighter"><IndianRupee size={48} className="text-accent" />{emi.toLocaleString('en-IN')}</div></div>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center"><span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.4em]">Total Interest Cost</span><span className="text-xl font-bold text-accent">{formatCurrency(totalInterest)}</span></div>
                                <div className="w-full h-px bg-white/10"></div>
                                <div className="flex justify-between items-center"><span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.4em]">Total Payable Synthesis</span><span className="text-xl font-bold text-white">{formatCurrency(loanAmount + totalInterest)}</span></div>
                            </div>
                        </div>
                        <div className="mt-12"><button onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge', { detail: { project: 'Sovereign Pre-Approval' } }))} className="w-full group bg-accent text-secondary hover:bg-white py-8 rounded-[2rem] font-bold flex items-center justify-center gap-4 transition-all text-xl">Apply for Sovereign Rate <ArrowRight size={24} /></button></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
