import { TrendingUp, DollarSign, BarChart3, ArrowUpRight, LineChart } from 'lucide-react';

const ledgerData = [
    { year: 2012, avgPrice: 3800, inventory: "Launch", milestones: "Phase 1 Started" },
    { year: 2014, avgPrice: 4200, inventory: "Growth", milestones: "Anisha Global School Open" },
    { year: 2016, avgPrice: 4800, inventory: "Steady", milestones: "Handover of R-Sector" },
    { year: 2018, avgPrice: 5400, inventory: "High Demand", milestones: "Spine Road Completion" },
    { year: 2020, avgPrice: 5800, inventory: "Resilient", milestones: "Digital Hub Launch" },
    { year: 2022, avgPrice: 6500, inventory: "Premium", milestones: "Metro Ph 3 Construction" },
    { year: 2024, avgPrice: 7800, inventory: "Peak", milestones: "Universe & Atmos Towers" }
];

export const InvestmentLedger: React.FC = () => {
    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-secondary/20">
                            <BarChart3 size={14} /> Historical Ledger v1.0
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-6">Real Estate Appreciation Ledger (2012 - 2024)</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            A transparent breakdown of price trends and infrastructure milestones that have driven a <strong>105% appreciation</strong> since the inception of Life Republic.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-secondary text-white">
                                    <th className="px-8 py-6 font-bold text-sm uppercase tracking-widest">Year</th>
                                    <th className="px-8 py-6 font-bold text-sm uppercase tracking-widest">Avg Price (psf)</th>
                                    <th className="px-8 py-6 font-bold text-sm uppercase tracking-widest">Market Phase</th>
                                    <th className="px-8 py-6 font-bold text-sm uppercase tracking-widest">Key Driver</th>
                                    <th className="px-8 py-6 font-bold text-sm uppercase tracking-widest">ROI Signal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ledgerData.map((row, idx) => (
                                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6 font-serif font-bold text-secondary text-xl">{row.year}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-gray-400 text-sm">₹</span>
                                                <span className="text-2xl font-bold text-secondary">{row.avgPrice}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-4 py-1.5 bg-gray-100 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-tighter group-hover:bg-accent group-hover:text-white transition-all">
                                                {row.inventory}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-gray-500 font-medium">
                                            {row.milestones}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-green-600 font-bold">
                                                <TrendingUp size={16} />
                                                {idx === 0 ? "Initial" : `+${Math.round(((row.avgPrice - ledgerData[idx-1].avgPrice)/ledgerData[idx-1].avgPrice)*100)}%`}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent flex-shrink-0">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-secondary mb-1">Rental Upside</h4>
                            <p className="text-sm text-gray-500">Avg 2 BHK rental grown from ₹12k to ₹28k in 8 years.</p>
                        </div>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
                        <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary flex-shrink-0">
                            <LineChart size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-secondary mb-1">Resale Velocity</h4>
                            <p className="text-sm text-gray-500">Average inventory duration on market: &lt; 45 days.</p>
                        </div>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 flex-shrink-0">
                            <ArrowUpRight size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-secondary mb-1">Capital Protection</h4>
                            <p className="text-sm text-gray-500">Zero default project history in 12+ years of delivery.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
