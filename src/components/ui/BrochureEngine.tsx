import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileCheck, Mail, Phone, ChevronRight, X, Sparkles, Users, BrainCircuit, ShieldCheck, Database, Zap, CheckCircle2, QrCode, ArrowUpRight, Cpu, Network } from 'lucide-react';
import { brochureGenerator } from '../../services/brochureGenerator';
import { personalizationStore } from '../../lib/personalizationStore';

export const BrochureEngine: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [synthesisStep, setSynthesisStep] = useState(0);
    const [selections, setSelections] = useState<string[]>(['thesis']);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    
    const history = personalizationStore.getHistory();
    
    const options = [
        { id: 'thesis', label: 'The Sovereign Thesis', icon: <BrainCircuit size={24} />, premium: true, desc: 'AI-synthesized investment profile based on your neural interaction path.' },
        { id: 'master', label: 'Master Blueprint v6.0', icon: <Database size={24} />, desc: '390-acre technical infrastructure & connectivity blueprint.' },
        { id: 'pricing', label: 'ROI Pricing Matrix', icon: <Zap size={24} />, desc: '2026 appreciation-anchored pricing & yield sheets.' }
    ];

    const synthesisLabels = [
        "Scanning interaction neural paths...",
        "Weighting interest in viewed sectors...",
        "Calculating ROI projections for 2026...",
        "Mapping solar gain & spatial flow...",
        "Generating Sovereign QR Identifier...",
        "Synthesizing your Sovereign Thesis PDF..."
    ];

    useEffect(() => {
        if (isGenerating && synthesisStep < synthesisLabels.length - 1) {
            const timer = setTimeout(() => setSynthesisStep(prev => prev + 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [isGenerating, synthesisStep]);

    const toggleSelection = (id: string) => {
        setSelections(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const handleDeploy = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        setSynthesisStep(0);
        try {
            await new Promise(resolve => setTimeout(resolve, 6000));
            await brochureGenerator.generateCustomBrochure(formData.name || 'Valued Partner');
            setIsGenerating(false);
            setIsComplete(true);
            setTimeout(() => { setIsOpen(false); setIsComplete(false); setSelections(['thesis']); }, 4000);
        } catch (error) {
            console.error("Brochure Synthesis Error:", error);
            setIsGenerating(false);
        }
    };

    return (
        <section className="py-48 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto rounded-[6rem] bg-secondary p-16 md:p-32 text-white relative overflow-hidden shadow-2xl border border-white/5">
                    <div className="relative z-10 flex flex-col lg:flex-row gap-32 items-center">
                        <div className="lg:w-5/12 text-left">
                            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-4 px-8 py-4 bg-accent/20 border border-accent/30 rounded-full mb-16 backdrop-blur-3xl"><Sparkles size={18} className="text-accent animate-pulse" /><span className="text-[11px] font-bold uppercase tracking-[0.6em] text-accent">Synthesis Lab v6.0</span></motion.div>
                            <h2 className="text-6xl md:text-[8rem] font-serif font-bold mb-16 leading-[0.85] tracking-tighter">Synthesize <br /> Your <span className="text-accent italic">Monograph.</span></h2>
                            <p className="text-gray-400 text-2xl leading-relaxed mb-20 font-medium max-w-2xl">Our synthesis engine aggregates your neural path into a personalized, high-fidelity investment monograph.</p>
                            <div className="flex items-center gap-16"><div className="text-center group"><div className="text-6xl font-serif font-bold text-white tracking-tighter group-hover:text-accent transition-colors">{history.intentScore}</div><div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.5em] mt-3">Intent Factor</div></div><div className="w-px h-24 bg-white/10"></div><div className="text-center group"><div className="text-6xl font-serif font-bold text-white tracking-tighter group-hover:text-accent transition-colors">{history.recentlyViewed.length}</div><div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.5em] mt-3">Sectors Indexed</div></div></div>
                        </div>
                        <div className="lg:w-7/12 grid grid-cols-1 gap-8 w-full">
                            {options.map((opt) => (
                                <button key={opt.id} onClick={() => toggleSelection(opt.id)} className={`group relative p-12 rounded-[4rem] border transition-all duration-700 text-left overflow-hidden ${selections.includes(opt.id) ? 'bg-accent border-accent text-secondary scale-[1.03] shadow-2xl' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}><div className="flex justify-between items-start mb-8"><div className={`p-6 rounded-[2.5rem] transition-all duration-700 ${selections.includes(opt.id) ? 'bg-secondary text-white shadow-2xl' : 'bg-white/5 text-accent border border-white/5'}`}>{opt.icon}</div>{opt.premium && (<div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/20"><QrCode size={16} className="text-accent" /><span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Sovereign QR Active</span></div>)}</div><h3 className="text-3xl font-serif font-bold mb-4 tracking-tight">{opt.label}</h3><p className={`text-xl leading-relaxed font-medium ${selections.includes(opt.id) ? 'text-secondary/70' : 'text-gray-500'}`}>{opt.desc}</p></button>
                            ))}
                            <button disabled={selections.length === 0} onClick={() => setIsOpen(true)} className={`mt-16 w-full py-10 rounded-full font-bold text-2xl flex items-center justify-center gap-8 transition-all shadow-2xl ${selections.length > 0 ? 'bg-white text-secondary hover:bg-accent hover:scale-[1.02]' : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'}`}><FileCheck size={36} /><span>Deploy Portfolio Synthesis</span><ArrowUpRight size={32} /></button>
                        </div>
                    </div>
                </div>
                <AnimatePresence mode="wait">{isOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-secondary/98 backdrop-blur-3xl z-[200] flex items-center justify-center p-12">
                        <motion.div initial={{ scale: 0.95, y: 150 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-4xl text-center">
                            {isComplete ? (
                                <div className="text-white space-y-12"><div className="w-48 h-48 bg-accent text-secondary rounded-full flex items-center justify-center mx-auto shadow-2xl"><CheckCircle2 size={100} className="animate-bounce" /></div><h3 className="text-7xl font-serif font-bold tracking-tighter leading-none">Thesis <br /><span className="text-accent italic">Deployed.</span></h3><p className="text-white/40 text-3xl font-medium max-w-2xl mx-auto leading-relaxed">Your Sovereign Portfolio has been synthesized and dispatched to your local archive.</p></div>
                            ) : !isGenerating ? (
                                <div className="bg-white rounded-[5rem] p-20 md:p-32 shadow-2xl text-secondary border border-white/20 relative overflow-hidden"><div className="w-28 h-28 bg-secondary text-accent rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 shadow-2xl"><Users size={48} /></div><h3 className="text-6xl font-serif font-bold mb-8 text-secondary tracking-tighter leading-none">Finalize <br /> Coordinates.</h3><p className="text-gray-500 text-2xl mb-16 font-medium leading-relaxed max-w-2xl mx-auto">Anchor the Sovereign Portfolio to your digital identity.</p><form onSubmit={handleDeploy} className="space-y-8 max-w-xl mx-auto text-left"><div className="space-y-6"><input required type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-12 py-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 outline-none font-bold text-secondary text-xl" /><input required type="email" placeholder="Email Matrix" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-12 py-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 outline-none font-bold text-secondary text-xl" /></div><button type="submit" className="w-full py-10 bg-secondary text-white rounded-full font-bold text-2xl hover:bg-accent transition-all shadow-2xl mt-12 flex items-center justify-center gap-6">Finalize & Generate Thesis <ArrowUpRight size={32} /></button><button type="button" onClick={() => setIsOpen(false)} className="w-full text-gray-400 text-[11px] font-bold uppercase tracking-[0.6em] hover:text-accent transition-all mt-10 text-center">Dismiss Synthesis</button></form></div>
                            ) : (
                                <div className="text-white space-y-24"><div className="relative w-80 h-80 mx-auto"><motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-[10px] border-accent/20 border-t-accent rounded-full" /><div className="absolute inset-0 flex items-center justify-center"><Network size={120} className="text-accent animate-pulse" /></div></div><div className="space-y-12"><h3 className="text-7xl font-serif font-bold italic tracking-tighter">Synthesizing...</h3><p className="text-accent font-bold tracking-[0.6em] uppercase text-sm h-8 transition-all duration-700">{synthesisLabels[synthesisStep]}</p><div className="w-full max-w-xl h-2.5 bg-white/5 rounded-full mx-auto overflow-hidden border border-white/10"><motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 6, ease: "linear" }} className="h-full bg-accent" /></div></div></div>
                            )}
                        </motion.div>
                    </motion.div>
                )}</AnimatePresence>
            </div>
        </section>
    );
};
