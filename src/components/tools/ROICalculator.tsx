import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const ROICalculator: React.FC = () => {
    const [propertyValue, setPropertyValue] = useState<number>(7500000); // 75 Lakhs
    const [monthlyRent, setMonthlyRent] = useState<number>(28000);
    const [appreciationRate] = useState<number>(8); // 8% conservative
    const [holdingPeriod, setHoldingPeriod] = useState<number>(5);

    const [totalROI, setTotalROI] = useState<number>(0);
    const [finalValue, setFinalValue] = useState<number>(0);

    const calculateROI = () => {
        // Simple Compound Interest for appreciation
        const futureValue = propertyValue * Math.pow((1 + appreciationRate / 100), holdingPeriod);

        // Total Rent collected (simplified, not verified for rent increase for now to keep UI clean)
        const totalRent = monthlyRent * 12 * holdingPeriod;

        const totalGain = (futureValue - propertyValue) + totalRent;
        // const roiPercentage = (totalGain / propertyValue) * 100; // Reserved for future use

        setFinalValue(Math.round(futureValue));
        setTotalROI(Math.round(totalGain));
    };

    useEffect(() => {
        calculateROI();
    }, [propertyValue, monthlyRent, appreciationRate, holdingPeriod]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const priceTrends = [
        { year: '2018', Price: 5200 },
        { year: '2019', Price: 5500 },
        { year: '2020', Price: 5800 },
        { year: '2021', Price: 6300 },
        { year: '2022', Price: 7000 },
        { year: '2023', Price: 7800 },
        { year: '2024', Price: 8500 },
        { year: '2025', Price: 9200 }
    ];

    const maxPrice = Math.max(...priceTrends.map(t => t.Price));

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">ROI Analytics</h3>
                    <p className="text-sm text-gray-500">Hinjewadi Historical Performance</p>
                </div>
            </div>

            {/* Price Trend Chart (Phase 12) */}
            <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-end justify-between h-32 gap-1 px-2">
                    {priceTrends.map((trend, idx) => (
                        <div key={idx} className="flex flex-col items-center flex-1 group">
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${(trend.Price / maxPrice) * 100}%` }}
                                className={`w-full max-w-[12px] rounded-t-sm transition-all ${idx === priceTrends.length - 1 ? 'bg-accent' : 'bg-secondary/40 group-hover:bg-secondary/60'}`}
                            />
                            <span className="text-[8px] text-gray-400 mt-2 font-bold">{trend.year}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-gray-500">
                    <span>Hinjewadi Price Trend</span>
                    <span className="text-accent">Avg. ₹9,200/sqft</span>
                </div>
            </div>

            <div className="space-y-6">
                {/* Property Value */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Investment Amount</label>
                        <span className="text-sm font-bold text-secondary">{formatCurrency(propertyValue)}</span>
                    </div>
                    <input
                        type="range"
                        min="4000000"
                        max="20000000"
                        step="100000"
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                    />
                </div>

                {/* Monthly Rent */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Expected Monthly Rent</label>
                        <span className="text-sm font-bold text-secondary">{formatCurrency(monthlyRent)}</span>
                    </div>
                    <input
                        type="range"
                        min="15000"
                        max="100000"
                        step="1000"
                        value={monthlyRent}
                        onChange={(e) => setMonthlyRent(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                    />
                </div>

                {/* Holding Period */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Holding Period</label>
                        <span className="text-sm font-bold text-secondary">{holdingPeriod} Years</span>
                    </div>
                    <input
                        type="range"
                        min="3"
                        max="15"
                        step="1"
                        value={holdingPeriod}
                        onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                    />
                </div>

                {/* Result */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Projected Value</p>
                        <p className="font-bold text-gray-800 text-lg">{formatCurrency(finalValue)}</p>
                    </div>
                    <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/10">
                        <p className="text-xs text-secondary mb-1">Total Gain</p>
                        <p className="font-bold text-secondary text-lg">+{formatCurrency(totalROI)}</p>
                    </div>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 text-center">*Projections based on conservative 8% CAGR.</p>
            </div>
        </div>
    );
};
