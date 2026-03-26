import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Globe, Gavel, Landmark, Info } from 'lucide-react';

const guidelines = [
    {
        title: 'RERA Compliance',
        desc: 'All Life Republic projects are 100% RERA registered, ensuring transparency in carpet area and possession dates.',
        icon: Shield,
        color: 'bg-blue-50 text-blue-600'
    },
    {
        title: 'FEMA Regulations',
        desc: 'Guidelines on repatriation of sale proceeds and investment through NRE/NRO accounts for seamless capital flow.',
        icon: Globe,
        color: 'bg-green-50 text-green-600'
    },
    {
        title: 'Taxation & TDS',
        desc: 'Understanding Section 195 of the Income Tax Act for property acquisitions by non-residents in India.',
        icon: Landmark,
        color: 'bg-amber-50 text-amber-600'
    },
    {
        title: 'Power of Attorney',
        desc: 'Simplified procedures for executing PoA for NRI home buyers who cannot be physically present for registration.',
        icon: Gavel,
        color: 'bg-purple-50 text-purple-600'
    }
];

export const NRIInvestorHub: React.FC = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-accent font-bold tracking-widest uppercase text-xs block mb-4"
                        >
                            Global Investment Authority
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight">
                            NRI Legal & Tax <br /> Intelligence Hub
                        </h2>
                        <p className="text-gray-600 text-lg mb-12 max-w-xl leading-relaxed">
                            Investing in Indian real estate from abroad requires technical precision. Our dedicated NRI cell provides the legal and financial clarity needed for a secure investment at Life Republic.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {guidelines.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-6 rounded-3xl border border-gray-100 hover:border-accent hover:shadow-xl transition-all group"
                                >
                                    <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="lg:w-1/2 relative">
                        <div className="bg-gray-900 rounded-[40px] p-8 md:p-12 text-white relative z-10 overflow-hidden shadow-2xl">
                            {/* Decorative elements */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-[80px]"></div>
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
                            
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-accent text-secondary rounded-full flex items-center justify-center">
                                    <FileText size={20} />
                                </div>
                                <span className="font-bold tracking-tighter uppercase text-sm">Downloadable Guides</span>
                            </div>
                            
                            <h3 className="text-3xl font-bold mb-6">Technical Resources</h3>
                            <div className="space-y-4">
                                {[
                                    'NRI Quick Investing Guide 2026',
                                    'Repatriation Policy Overview',
                                    'Life Republic RERA Certificates',
                                    'Hinjewadi Infrastructure ROI Report'
                                ].map((doc, i) => (
                                    <button 
                                        key={i}
                                        className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group text-left"
                                    >
                                        <span className="text-sm font-medium">{doc}</span>
                                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-secondary transition-all">
                                            <Info size={16} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                            
                            <div className="mt-12 flex items-center gap-4 p-6 bg-accent/10 border border-accent/20 rounded-2xl">
                                <div className="p-3 bg-accent/20 rounded-xl text-accent">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">Expert Cell</p>
                                    <p className="text-sm text-gray-400">Speak to our dedicated NRI Investment Consultant.</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative floating stats */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-6 -right-6 md:-right-12 bg-white p-6 rounded-3xl shadow-2xl z-20 border border-gray-50"
                        >
                            <div className="text-3xl font-bold text-gray-900 mb-1">1,800+</div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global NRIs Invested</div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
