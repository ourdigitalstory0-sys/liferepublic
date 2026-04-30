import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, Info, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface EMICalculatorProps {
    basePrice?: number;
    projectName?: string;
}

export const EMICalculator: React.FC<EMICalculatorProps> = ({ basePrice = 7500000 }) => {
    const [amount, setAmount] = useState(basePrice * 0.8);
    const [tenure, setTenure] = useState(20);
    const [rate, setRate] = useState(8.5);

    const emi = useMemo(() => {
        const p = amount;
        const r = rate / (12 * 100);
        const n = tenure * 12;
        return Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    }, [amount, tenure, rate]);

    const totalInterest = useMemo(() => {
        return (emi * tenure * 12) - amount;
    }, [emi, tenure, amount]);

    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                        <Calculator size={20} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-secondary">Financial Planner</h3>
                        <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Life Republic Investment Hub</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Controls */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-sm font-bold text-secondary uppercase tracking-wider">Loan Amount</label>
                                <span className="text-lg font-bold text-accent">₹{(amount / 100000).toFixed(2)} Lakhs</span>
                            </div>
                            <input 
                                type="range" 
                                min={1000000} 
                                max={50000000} 
                                step={100000}
                                value={amount} 
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-sm font-bold text-secondary uppercase tracking-wider">Tenure (Years)</label>
                                <span className="text-lg font-bold text-accent">{tenure} Yrs</span>
                            </div>
                            <input 
                                type="range" 
                                min={5} 
                                max={30} 
                                step={1}
                                value={tenure} 
                                onChange={(e) => setTenure(Number(e.target.value))}
                                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-sm font-bold text-secondary uppercase tracking-wider">Interest Rate (%)</label>
                                <span className="text-lg font-bold text-accent">{rate}%</span>
                            </div>
                            <input 
                                type="range" 
                                min={7} 
                                max={12} 
                                step={0.1}
                                value={rate} 
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="bg-secondary rounded-[2rem] p-10 text-white relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        
                        <div>
                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">Estimated Monthly Installment</span>
                            <div className="text-5xl md:text-6xl font-serif font-bold mb-4">
                                ₹{emi.toLocaleString('en-IN')}
                            </div>
                            <div className="flex items-center gap-2 text-accent text-sm font-bold">
                                <TrendingUp size={16} /> ROI Projection Available
                            </div>
                        </div>

                        <div className="pt-10 border-t border-white/10 space-y-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-white/60">Total Interest Payable</span>
                                <span className="font-bold">₹{Math.round(totalInterest / 100000).toFixed(2)} L</span>
                            </div>
                            <Button variant="primary" className="w-full rounded-xl py-6 flex items-center justify-center gap-3 group">
                                Inquire about this EMI <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-6 flex items-center gap-3 border-t border-gray-100">
                <Info size={14} className="text-gray-400" />
                <p className="text-[10px] text-gray-400 font-medium">
                    *Estimates are indicative. Actual bank rates may vary based on credit score and official bank policy.
                </p>
            </div>
        </div>
    );
};
