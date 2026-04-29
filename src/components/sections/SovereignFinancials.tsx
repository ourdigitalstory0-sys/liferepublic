import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, PieChart, ArrowUpRight, Wallet } from 'lucide-react';

export const SovereignFinancials: React.FC = () => {
  const stats = [
    { label: "5-Year Appreciation", value: "48%", icon: <TrendingUp />, color: "bg-emerald-500" },
    { label: "Avg. Rental Yield", value: "4.2%", icon: <PieChart />, color: "bg-blue-500" },
    { label: "Yearly Demand Growth", value: "15%", icon: <ArrowUpRight />, color: "bg-orange-500" },
    { label: "Hinjewadi IT Footprint", value: "80M sqft", icon: <Wallet />, color: "bg-accent" }
  ];

  const appreciation = [
    { period: "2020", price: "4,800", label: "Seed Phase" },
    { period: "2022", price: "6,200", label: "Metro Inception" },
    { period: "2024", price: "7,500", label: "Cluster Expansion" },
    { period: "2026*", price: "8,800", label: "Sovereign Maturity" }
  ];

  return (
    <section className="py-24 bg-secondary text-white rounded-[3rem] my-16 overflow-hidden relative shadow-2xl">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      
      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Financial Intelligence</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">The Sovereign ROI Thesis</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Hinjewadi is the engine of Pune's economy. Life Republic is its residential cockpit. Explore the momentum that has turned an integrated township into Hinjewadi's premier capital appreciation zone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm"
              >
                <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                   {React.cloneElement(stat.icon as React.ReactElement, { size: 18 } as any)}
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Price Tracking Timeline */}
          <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-sm relative overflow-hidden">
            <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
              <TrendingUp className="text-accent" /> Base Rate Trajectory (₹ / sqft)
            </h4>
            
            <div className="space-y-8 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10"></div>
                {appreciation.map((point, i) => (
                    <div key={i} className="flex gap-6 relative group">
                        <div className="w-4 h-4 rounded-full bg-accent border-4 border-secondary z-10 mt-1 group-hover:scale-125 transition-transform"></div>
                        <div>
                            <div className="flex items-baseline gap-3 mb-1">
                                <span className="text-gray-500 font-mono text-xs">{point.period}</span>
                                <span className="text-lg font-bold">₹ {point.price}</span>
                            </div>
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">{point.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-6 bg-accent/10 border border-accent/20 rounded-2xl">
                <p className="text-xs italic text-accent font-medium leading-relaxed">
                    "Consistent 12%+ YoY growth in Hinjewadi Phase 1 properties over the last 48 months as per market analysis."
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
