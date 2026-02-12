import React, { useState, useEffect } from 'react';
import { Calculator, IndianRupee } from 'lucide-react';

export const EMICalculator: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState<number>(5000000);
    const [interestRate, setInterestRate] = useState<number>(8.5);
    const [loanTenure, setLoanTenure] = useState<number>(20);
    const [emi, setEMI] = useState<number>(0);

    const calculateEMI = () => {
        const principal = loanAmount;
        const ratePerMonth = interestRate / 12 / 100;
        const tenureMonths = loanTenure * 12;

        const emiValue = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, tenureMonths)) / (Math.pow(1 + ratePerMonth, tenureMonths) - 1);
        setEMI(Math.round(emiValue));
    };

    useEffect(() => {
        calculateEMI();
    }, [loanAmount, interestRate, loanTenure]);

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
                <div className="p-3 bg-accent/10 rounded-lg text-accent">
                    <Calculator size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">EMI Calculator</h3>
                    <p className="text-sm text-gray-500">Plan your finances smartly</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Loan Amount */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Loan Amount</label>
                        <span className="text-sm font-bold text-accent">{formatCurrency(loanAmount)}</span>
                    </div>
                    <input
                        type="range"
                        min="1000000"
                        max="20000000"
                        step="100000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                </div>

                {/* Interest Rate */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Interest Rate (% p.a)</label>
                        <span className="text-sm font-bold text-accent">{interestRate}%</span>
                    </div>
                    <input
                        type="range"
                        min="5"
                        max="15"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                </div>

                {/* Tenure */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Loan Tenure (Years)</label>
                        <span className="text-sm font-bold text-accent">{loanTenure} Years</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                </div>

                {/* Result */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-6">
                    <p className="text-sm text-gray-500 mb-1">Monthly EMI</p>
                    <div className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                        <IndianRupee size={24} className="text-accent" />
                        {emi.toLocaleString('en-IN')}
                    </div>
                </div>
            </div>
        </div>
    );
};
