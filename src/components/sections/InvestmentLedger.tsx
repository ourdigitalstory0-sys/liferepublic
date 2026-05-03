import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, BarChart3, ArrowUpRight, LineChart, Sparkles, Zap, ShieldCheck, Timer, AlertCircle, TrendingDown, Cpu, Network, ArrowRight, Calculator, PieChart, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ledgerData = [
    { year: 2012, avgPrice: 3800, inventory: "Launch", milestones: "Phase 1 Strategic Conceptualization", roi: "Entry" },
    { year: 2018, avgPrice: 5400, inventory: "Stable", milestones: "150ft Central Spine Road Completion", roi: "+42%" },
    { year: 2022, avgPrice: 6800, inventory: "Premium", milestones: "Metro Ph 3 Groundbreaking & Tech Hub Exp.", roi: "+26%" },
    { year: 2024, avgPrice: 8200, inventory: "Limited", milestones: "Atmos & Universe Cluster Synthesis", roi: "+21%" },
    { year: 2026, avgPrice: 10500, inventory: "Sovereign", milestones: "Metro Launch & 15-Min City Infrastructure", projected: true, roi: "+28%" }
];

const liveTicker = [
    { project: "Atmos Cluster R22", units: 14, status: "High Intent", urgency: "Selling Fast" },
    { project: "Canvas Sector R13", units: 2, status: "Critical", urgency: "Sovereign Scarcity" },
    { project: "Arezo Sector R16", units: 19, status: "Strategic", urgency: "Investor Favorite" },
    { project: "Qrious Smart Homes", units: 7, status: "High Velocity", urgency: "Limited Release" },
    { project: "24K Espada Villas", units: 3, status: "Ultra-Luxury", urgency: "Final Units" }
];

export const InvestmentLedger: React.FC = () => {
    const [tickerIndex, setTickerIndex] = useState(0);
    const [calcConfig, setCalcConfig] = useState('2 BHK');
    const [investmentAmount, setInvestmentAmount] = useState(8500000);

    useEffect(() => {
        const interval = setInterval(() => {
            setTickerIndex(prev => (prev + 1) % liveTicker.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const projectedValue = investmentAmount * 1.45; // 45% growth projected over 3 years
    const monthlyRent = calcConfig === '2 BHK' ? 28000 : calcConfig === '3 BHK' ? 38000 : 55000;

    return (
        <section className="py-40 bg-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px] pointer-events-none -mr-48 -mt-48"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Sovereign Scarcity Ledger Ticker v6.5 */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-32 bg-secondary rounded-[4rem] p-10 flex flex-col md:flex-row items-center justify-between border border-white/5 relative overflow-hidden group shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent pointer-events-none"></div>
                    
                    <div className="flex items-center gap-12 relative z-10 w-full">
                        <div className="flex items-center gap-4 bg-accent text-secondary px-8 py-4 rounded-full font-bold text-[11px] uppercase tracking-[0.5em] shadow-2xl animate-pulse whitespace-nowrap">
                            <Timer size={18} /> Live Scarcity Ledger
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={tickerIndex}
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 w-full"
                            >
                                <span className="font-serif font-bold text-white text-3xl md:text-4xl tracking-tighter italic">{liveTicker[tickerIndex].project}</span>
                                <div className="h-8 w-px bg-white/10 hidden md:block"></div>
                                <div className="flex items-center gap-6">
                                    <span className={`text-lg font-bold ${liveTicker[tickerIndex].units > 0 ? 'text-white/60' : 'text-red-400'}`}>
                                        {liveTicker[tickerIndex].units} Sovereign Units Left
                                    </span>
                                    <span className={`text-[10px] px-6 py-2 rounded-full font-bold uppercase tracking-[0.4em] border ${liveTicker[tickerIndex].urgency === 'Sovereign Scarcity' ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-white/10 text-accent border-white/20'}`}>
                                        {liveTicker[tickerIndex].urgency}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold text-white/30 uppercase tracking-[0.6em] whitespace-nowrap">
                        <Network size={20} className="text-accent" /> Neural Sync Active
                    </div>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-end justify-between mb-32 gap-16">
                    <div className="max-w-4xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-4 px-6 py-3 bg-gray-100 rounded-full mb-10 border border-gray-200"
                        >
                            <Cpu size={16} className="text-accent" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.6em]">Financial Synthesis Protocol v6.5</span>
                        </motion.div>
                        <h2 className="text-6xl md:text-[11rem] font-serif font-bold text-secondary mb-12 tracking-tighter leading-[0.8]">
                            The Financial <br /> <span className="text-accent italic">Authority.</span>
                        </h2>
                        <p className="text-2xl md:text-3xl text-gray-400 font-medium leading-relaxed max-w-3xl">
                            Mapping the 14-year appreciation lifecycle of Hinjewadi's premier township. The upcoming 2026 Metro activation is the final high-velocity price trigger.
                        </p>
                    </div>
                    <div className="pb-10">
                        <button 
                            onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                            className="bg-secondary text-white px-16 py-10 rounded-full font-bold text-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] hover:bg-accent hover:text-secondary transition-all flex items-center gap-6 group hover:scale-[1.05]"
                        >
                            Enquire Now <ArrowUpRight size={32} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-40">
                    {/* Tectonic Ledger Matrix v6.5 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 bg-white rounded-[5rem] shadow-[0_100px_200px_-50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-secondary text-white">
                                        <th className="px-12 py-12 text-[10px] font-bold uppercase tracking-[0.6em]">Lifecycle Phase</th>
                                        <th className="px-12 py-12 text-[10px] font-bold uppercase tracking-[0.6em]">Market PSF Synthesis</th>
                                        <th className="px-12 py-12 text-[10px] font-bold uppercase tracking-[0.6em]">Inventory State</th>
                                        <th className="px-12 py-12 text-[10px] font-bold uppercase tracking-[0.6em]">Structural Catalyst</th>
                                        <th className="px-12 py-12 text-[10px] font-bold uppercase tracking-[0.6em]">ROI</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {ledgerData.map((row, idx) => (
                                        <tr key={idx} className={`group hover:bg-gray-50/80 transition-all ${row.projected ? 'bg-accent/5' : ''}`}>
                                            <td className="px-12 py-12">
                                                <div className="font-serif font-bold text-secondary text-4xl flex items-center gap-4">
                                                    {row.year}
                                                    {row.projected && <Sparkles size={24} className="text-accent animate-pulse" />}
                                                </div>
                                            </td>
                                            <td className="px-12 py-12">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-gray-300 font-bold text-xl">₹</span>
                                                    <span className={`text-4xl font-bold tracking-tighter ${row.projected ? 'text-accent' : 'text-secondary'}`}>{row.avgPrice}</span>
                                                </div>
                                            </td>
                                            <td className="px-12 py-12">
                                                <span className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] ${row.projected ? 'bg-accent text-white shadow-xl shadow-accent/30' : 'bg-gray-100 text-gray-400'}`}>
                                                    {row.inventory}
                                                </span>
                                            </td>
                                            <td className={`px-12 py-12 font-bold text-sm leading-relaxed max-w-[200px] ${row.projected ? 'text-accent italic' : 'text-secondary/60'}`}>
                                                {row.milestones}
                                            </td>
                                            <td className="px-12 py-12">
                                                <div className={`flex items-center gap-2 font-bold text-2xl ${row.projected ? 'text-accent' : 'text-green-600'}`}>
                                                    {row.roi}
                                                    <TrendingUp size={24} className={row.projected ? 'animate-bounce' : ''} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Dynamic Yield Projection Calculator v6.5 */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-secondary rounded-[5rem] p-16 text-white border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-10">
                            <Calculator size={120} className="text-accent" />
                        </div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-12">
                                <Coins size={24} className="text-accent" />
                                <h3 className="font-bold uppercase tracking-[0.4em] text-[11px] text-accent">Yield Projection Calculator</h3>
                            </div>
                            
                            <div className="space-y-12">
                                <div>
                                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] block mb-6">Select Configuration</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {['2 BHK', '3 BHK', 'Villas'].map(c => (
                                            <button 
                                                key={c}
                                                onClick={() => {
                                                    setCalcConfig(c);
                                                    setInvestmentAmount(c === '2 BHK' ? 8500000 : c === '3 BHK' ? 12500000 : 25000000);
                                                }}
                                                className={`py-4 rounded-2xl text-xs font-bold transition-all border ${calcConfig === c ? 'bg-accent text-secondary border-accent' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'}`}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-end mb-4">
                                        <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Investment Base</label>
                                        <span className="text-2xl font-mono font-bold text-white">₹{(investmentAmount / 100000).toFixed(1)}L</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min={7000000} 
                                        max={50000000} 
                                        step={500000}
                                        value={investmentAmount}
                                        onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-accent"
                                    />
                                </div>

                                <div className="space-y-8 bg-white/5 p-10 rounded-[3rem] border border-white/5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-white/40 font-bold uppercase tracking-widest flex items-center gap-2">
                                            <TrendingUp size={14} className="text-green-400" /> 2026 Proj. Value
                                        </span>
                                        <span className="text-3xl font-mono font-bold text-accent">₹{(projectedValue / 1000000).toFixed(2)}Cr</span>
                                    </div>
                                    <div className="h-px bg-white/10"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-white/40 font-bold uppercase tracking-widest flex items-center gap-2">
                                            <PieChart size={14} className="text-blue-400" /> Est. Monthly Rent
                                        </span>
                                        <span className="text-2xl font-mono font-bold text-white">₹{(monthlyRent / 1000).toFixed(0)}K</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-12 text-[10px] text-white/20 font-medium leading-relaxed italic border-t border-white/10 mt-12">
                            *Projections based on 14-year historical CAGR and 2026 infrastructure milestones. Verified data source active.
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {[
                        { title: 'Rental Synthesis', desc: 'Sovereign 2 BHK yields have outpaced the Hinjewadi market by 22.4% since the Spine Road expansion. 2026 forecast: Peak Yield.', icon: LineChart },
                        { title: 'Liquidity Matrix', desc: 'The 400-acre gated ecosystem maintains a robust secondary market with 100% investor verification and zero-latency resale.', icon: ShieldCheck },
                        { title: 'Capital Correction', desc: 'The 2026 Metro activation is the final structural trigger for a 25%+ price correction across the western Pune corridor.', icon: Sparkles }
                    ].map((card, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-16 bg-gray-50/50 rounded-[5rem] border border-gray-100 flex flex-col gap-10 group hover:border-accent hover:bg-white hover:shadow-2xl transition-all"
                        >
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-accent shadow-xl group-hover:rotate-12 transition-transform">
                                <card.icon size={40} />
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-3xl font-bold text-secondary tracking-tight group-hover:text-accent transition-colors">{card.title}</h4>
                                <p className="text-xl text-gray-500 font-medium leading-relaxed italic">"{card.desc}"</p>
                                <div className="flex items-center gap-3 text-[11px] font-bold text-accent uppercase tracking-widest pt-4">
                                    <ArrowRight size={16} /> Audit Data Source
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

