import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

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

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">ROI Estimator</h3>
                    <p className="text-sm text-gray-500">Calculate Investment Potential</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Property Value */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Property Cost</label>
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
                <p className="text-[10px] text-gray-400 mt-2 text-center">*Estimates based on 8% annual appreciation.</p>
            </div>
        </div>
    );
};
