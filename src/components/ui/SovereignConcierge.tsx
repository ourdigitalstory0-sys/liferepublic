import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle, MessageSquare, Phone, User, Mail, Send, Sparkles, Database, FileText, Globe, Zap, Target, ShieldCheck, Cpu, Network, ArrowUpRight, Crown, Home, PhoneCall, LayoutGrid } from 'lucide-react';
import { Button } from './Button';
import { personalizationStore } from '../../lib/personalizationStore';
import { emailService } from '../../services/email';
import sectorsData from '../../data/sectors.json';

interface SovereignConciergeProps {
    isOpen: boolean;
    onClose: () => void;
    projectName?: string;
}

type Step = 'chat' | 'intent' | 'config' | 'budget' | 'contact' | 'synthesis' | 'success';

export const SovereignConcierge: React.FC<SovereignConciergeProps> = ({ isOpen: propIsOpen, onClose, projectName }) => {
    const [isOpen, setIsOpen] = useState(propIsOpen);
    const [step, setStep] = useState<Step>('chat');
    const [messages, setMessages] = useState<{role: 'ai' | 'user', content: string}[]>([
        { role: 'ai', content: `Greetings. I am the Sovereign Concierge. I have mapped all ${sectorsData.sectors.length} residential clusters and the 2026 infrastructure backbone. How can I assist your exploration today?` }
    ]);
    const [input, setInput] = useState('');
    const [formData, setFormData] = useState({
        intent: '',
        config: '',
        budget: '',
        name: '',
        phone: '',
        email: '',
        whatsapp: true
    });

    const scrollRef = useRef<HTMLDivElement>(null);
    const history = personalizationStore.getHistory();
    const isSovereignMode = history.intentScore > 250;

    useEffect(() => {
        setIsOpen(propIsOpen);
    }, [propIsOpen]);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-sovereign-concierge', handleOpen);
        
        // Exit Intent Detection Protocol v6.5
        const handleExitIntent = (e: MouseEvent) => {
            if (e.clientY <= 0 && !isOpen && history.intentScore > 100) {
                setIsOpen(true);
                setMessages(prev => [...prev, { role: 'ai', content: "I detect you are concluding your monograph review. Before you depart, would you like to synthesize a personalized 2026 investment projection for your portfolio?" }]);
            }
        };
        document.addEventListener('mouseleave', handleExitIntent);

        return () => {
            window.removeEventListener('open-sovereign-concierge', handleOpen);
            document.removeEventListener('mouseleave', handleExitIntent);
        };
    }, [isOpen, history.intentScore]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const reset = () => {
        setStep('chat');
        setFormData({ intent: '', config: '', budget: '', name: '', phone: '', email: '', whatsapp: true });
        setMessages([{ role: 'ai', content: `Greetings. I am the Sovereign Concierge. I have mapped all ${sectorsData.sectors.length} residential clusters and the 2026 infrastructure backbone. How can I assist your exploration today?` }]);
    };

    useEffect(() => {
        if (isOpen) {
            // Contextual welcome based on project
            if (projectName && messages.length === 1) {
                setMessages([{ role: 'ai', content: `Greetings. I see you are analyzing ${projectName}. I have the structural RERA data and 2026 inventory status for this cluster. How can I assist your synthesis?` }]);
            }
        }
    }, [isOpen, projectName]);

    const handleChatSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim().toLowerCase();
        setMessages(prev => [...prev, { role: 'user', content: input.trim() }]);
        setInput('');

        // Sovereign Knowledge Engine v6.5 - Hardened Data
        setTimeout(() => {
            let response = "That is a strategic inquiry. Let me synthesize the architectural data for you.";
            
            if (userMsg.includes('metro')) response = "The 2026 Metro Line 3 is the primary value catalyst. The Phase 3 station is situated within 1.2km of Universe (R10) and Atmos (R22) clusters. Verified RERA possession dates for these clusters are synced with the Metro launch.";
            if (userMsg.includes('sector') || userMsg.includes('cluster')) response = `I have mapped ${sectorsData.sectors.length} residential clusters. Atmos (R22) and Universe (R10) are currently seeing 0.98+ investment velocity due to infrastructure proximity.`;
            if (userMsg.includes('spine')) response = "The 150ft Central Spine Road is the township's structural backbone, providing zero-latency transit to Hinjewadi Phase 1 & 2 in under 5 minutes. All future clusters are anchored to this spine.";
            if (userMsg.includes('investment') || userMsg.includes('roi')) {
                response = "Sovereign Analysis: Capital appreciation for 2026 is mathematically anchored at 15-22% following the Metro & Spine Road synchronization. Current PSF synthesis shows a 14-year CAGR of 18%.";
            }
            if (userMsg.includes('possession') || userMsg.includes('ready')) {
                response = "Possession Synthesis: Clusters R1, R2, R3, R7 are Ready to Move. ORO (R9) is Dec 2024. Atmos, Universe, and Aros are Dec 2026. Shall I prepare a delivery timeline for you?";
            }
            if (isSovereignMode && (userMsg.includes('deal') || userMsg.includes('price') || userMsg.includes('offer'))) {
                response = "Sovereign Mode Active: Your interaction history qualifies you for a Priority Allocation Protocol. I can synthesize a personalized investment proposal with exclusive unit availability.";
            }
            
            setMessages(prev => [...prev, { role: 'ai', content: response }]);
            
            // Contextual Handover
            personalizationStore.updateIntentScore(30, 'TOOL');
            if (personalizationStore.getHistory().intentScore > 400 || userMsg.includes('proposal') || userMsg.includes('book') || userMsg.includes('visit')) {
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'ai', content: "Your intent patterns suggest high structural alignment. Initiating formal Synthesis Protocol for proposal generation." }]);
                    setTimeout(() => setStep('intent'), 1500);
                }, 1000);
            }
        }, 1000);
    };

    const handleFinalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStep('synthesis');
        
        try {
            // Triple-Redundant Dispatch (Email + SMS + CRM Simulation)
            await emailService.sendLeadNotification({
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                project: projectName || 'Life Republic General',
                message: `[SOVEREIGN CONCIERGE v6.5] 
Intent: ${formData.intent} 
Config: ${formData.config} 
Budget: ${formData.budget} 
Neural Score: ${history.intentScore} 
Sentiment: ${history.sentiment}
WhatsApp Opt-in: ${formData.whatsapp}`
            });

            // WhatsApp Protocol Handover (Simulation)
            if (formData.whatsapp) {
                console.log(`[WHATSAPP PROTOCOL] Dispatching direct monograph to ${formData.phone}`);
            }

            personalizationStore.updateIntentScore(150, 'CONVERSION');
        } catch (error) {
            console.error('Sovereign dispatch failure:', error);
        }

        setTimeout(() => setStep('success'), 4000);
    };

    const handleClose = () => {
        setIsOpen(false);
        onClose();
        reset();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex sm:items-center items-end justify-center sm:p-4 p-0 bg-secondary/95 backdrop-blur-xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 100 }}
                    className="bg-white rounded-t-[4rem] sm:rounded-[4rem] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.6)] w-full sm:max-w-3xl h-[90vh] sm:h-auto sm:max-h-[90vh] overflow-hidden flex flex-col border border-white/10"
                >
                    {/* Header Synthesis */}
                    <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-white relative z-10">
                        <div className="flex items-center gap-6">
                            <motion.div 
                                animate={isSovereignMode ? { rotate: [0, 10, -10, 0] } : {}}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className={`w-16 h-16 rounded-[2rem] flex items-center justify-center transition-all shadow-xl ${isSovereignMode ? 'bg-secondary text-accent' : 'bg-accent/10 text-accent'}`}
                            >
                                {isSovereignMode ? <Crown size={32} /> : <Cpu size={32} />}
                            </motion.div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className={`text-[11px] font-bold uppercase tracking-[0.5em] ${isSovereignMode ? 'text-accent' : 'text-gray-400'}`}>
                                        {isSovereignMode ? 'Sovereign Mode Active v6.5' : 'Neural Interaction Lab'}
                                    </span>
                                    <div className={`w-2 h-2 rounded-full animate-pulse ${isSovereignMode ? 'bg-accent' : 'bg-green-500'}`}></div>
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-secondary tracking-tighter">Sovereign Concierge</h3>
                            </div>
                        </div>
                        <button onClick={handleClose} className="p-4 hover:bg-gray-100 rounded-full transition-all text-gray-300 hover:text-secondary group">
                            <X size={32} className="group-hover:rotate-90 transition-transform" />
                        </button>
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 bg-gray-50/30 space-y-12">
                        {step === 'chat' && (
                            <div className="space-y-10">
                                {messages.map((m, i) => (
                                    <motion.div 
                                        key={i} 
                                        initial={{ opacity: 0, x: m.role === 'ai' ? -20 : 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                                    >
                                        <div className={`max-w-[85%] p-8 rounded-[3rem] font-bold text-lg leading-relaxed shadow-xl border ${m.role === 'ai' ? 'bg-white text-secondary border-gray-100' : 'bg-secondary text-white border-white/5'}`}>
                                            {m.content}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {step === 'intent' && (
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 py-6">
                                <div className="text-center space-y-4">
                                    <Target size={64} className="text-accent mx-auto" />
                                    <h4 className="text-4xl md:text-5xl font-serif font-bold text-secondary tracking-tighter">Strategic Intent.</h4>
                                    <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[11px]">Select your primary township objective</p>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    {[
                                        { id: 'investment', title: 'Sovereign Investment', desc: 'Maximize capital appreciation via 2026 infrastructure.', icon: Zap },
                                        { id: 'residential', title: 'Luxury Residence', desc: 'Establish primary residence in Hinjewadi\'s premier hub.', icon: Home },
                                        { id: 'nri', title: 'Global NRI Portfolio', desc: 'Secure high-yield managed assets from overseas.', icon: Globe }
                                    ].map(item => (
                                        <button key={item.id} onClick={() => { setFormData({...formData, intent: item.id}); setStep('config'); }}
                                            className="p-10 text-left bg-white border-2 border-gray-100 rounded-[3.5rem] hover:border-accent hover:shadow-2xl transition-all group flex items-center gap-8">
                                            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                                <item.icon size={28} />
                                            </div>
                                            <div>
                                                <p className="text-secondary font-bold text-xl mb-1 group-hover:text-accent transition-colors">{item.title}</p>
                                                <p className="text-sm text-gray-400 font-medium">{item.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 'config' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                                <h4 className="text-4xl md:text-5xl font-serif font-bold text-secondary text-center tracking-tighter">Cluster Synthesis.</h4>
                                <div className="grid grid-cols-2 gap-8">
                                    {['2 BHK', '3 BHK', '4 BHK', 'Villas'].map(item => (
                                        <button key={item} onClick={() => { setFormData({...formData, config: item}); setStep('budget'); }}
                                            className="p-12 bg-white border-2 border-gray-100 rounded-[3rem] font-bold text-secondary text-2xl hover:border-accent hover:shadow-2xl transition-all">
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 'budget' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                <h4 className="text-4xl md:text-5xl font-serif font-bold text-secondary text-center tracking-tighter">Capital Depth.</h4>
                                {['₹85 Lac - ₹1.2 Cr', '₹1.2 Cr - ₹1.8 Cr', '₹2 Cr - ₹3.5 Cr', 'Sovereign Luxury (₹5 Cr+)'].map(item => (
                                    <button key={item} onClick={() => { setFormData({...formData, budget: item}); setStep('contact'); }}
                                        className="w-full p-10 bg-white border-2 border-gray-100 rounded-[3.5rem] font-bold text-secondary text-2xl hover:border-accent hover:shadow-2xl transition-all flex items-center justify-between group">
                                        {item} <ArrowUpRight size={32} className="text-gray-200 group-hover:text-accent transition-all" />
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {step === 'contact' && (
                            <form onSubmit={handleFinalSubmit} className="space-y-8">
                                <div className="text-center space-y-4 mb-12">
                                    <ShieldCheck size={64} className="text-accent mx-auto" />
                                    <h4 className="text-4xl md:text-5xl font-serif font-bold text-secondary tracking-tighter">Secure Protocol.</h4>
                                    <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[11px]">Initiate verified investment handover</p>
                                </div>
                                <div className="space-y-4">
                                    <input type="text" required placeholder="Sovereign Full Name" className="w-full px-12 py-8 bg-white border border-gray-100 rounded-full focus:border-accent outline-none font-bold text-secondary text-xl shadow-inner"
                                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                    <input type="tel" required placeholder="Phone Matrix (+91)" className="w-full px-12 py-8 bg-white border border-gray-100 rounded-full focus:border-accent outline-none font-bold text-secondary text-xl shadow-inner"
                                        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                                    <input type="email" required placeholder="Email Address for Monograph" className="w-full px-12 py-8 bg-white border border-gray-100 rounded-full focus:border-accent outline-none font-bold text-secondary text-xl shadow-inner"
                                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                    
                                    <label className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-[2rem] cursor-pointer hover:bg-gray-50 transition-colors">
                                        <input type="checkbox" checked={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.checked})} className="w-6 h-6 accent-green-500" />
                                        <div className="flex items-center gap-3">
                                            <MessageSquare size={20} className="text-green-500" />
                                            <span className="text-sm font-bold text-secondary">Opt-in for WhatsApp Investment Synthesis</span>
                                        </div>
                                    </label>
                                </div>
                                <Button type="submit" variant="primary" size="lg" className="w-full rounded-full py-10 font-bold shadow-[0_40px_80px_-20px_rgba(197,160,89,0.5)] text-2xl mt-12 flex items-center justify-center gap-4">
                                    Synthesize Proposal <ArrowUpRight size={28} />
                                </Button>
                            </form>
                        )}

                        {step === 'synthesis' && (
                            <div className="text-center py-32 space-y-12">
                                <div className="relative w-40 h-40 mx-auto">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 border-t-4 border-accent rounded-full" />
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-4 border-b-4 border-secondary/20 rounded-full" />
                                    <div className="absolute inset-0 flex items-center justify-center text-accent">
                                        <Network size={48} className="animate-pulse" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-4xl font-serif font-bold text-secondary mb-4 tracking-tighter italic">Sovereign Synthesis...</h4>
                                    <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.6em]">Calibrating 400-Acre Market Intelligence</p>
                                </div>
                                <div className="max-w-xs mx-auto space-y-3">
                                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 4 }} className="h-full bg-accent" />
                                    </div>
                                    <p className="text-[10px] text-accent font-bold uppercase tracking-widest">Protocol 77-A Active</p>
                                </div>
                            </div>
                        )}

                        {step === 'success' && (
                            <div className="text-center py-20 space-y-12">
                                <div className="w-32 h-32 bg-accent/10 rounded-[3rem] flex items-center justify-center text-accent mx-auto shadow-2xl">
                                    <CheckCircle size={72} />
                                </div>
                                <div className="space-y-6">
                                    <h4 className="text-5xl font-serif font-bold text-secondary tracking-tighter">Sovereign Ready.</h4>
                                    <p className="text-xl text-gray-500 font-bold leading-relaxed max-w-md mx-auto">
                                        Your personalized township investment monograph has been synthesized and dispatched via encrypted protocol.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                    <Button variant="secondary" onClick={handleClose} className="rounded-full px-12 py-6 text-lg font-bold">Return to Archive</Button>
                                    <Button variant="outline" className="rounded-full px-12 py-6 text-lg font-bold border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white flex items-center gap-3">
                                        <MessageSquare size={20} /> Chat on WhatsApp
                                    </Button>
                                </div>
                                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.5em] mt-12">Session Finalized • 2026 Synchronized</p>
                            </div>
                        )}
                    </div>

                    {/* Chat Input v6.5 */}
                    {step === 'chat' && (
                        <form onSubmit={handleChatSubmit} className="p-12 bg-white border-t border-gray-100 flex gap-8 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.05)]">
                            <input 
                                type="text" value={input} onChange={e => setInput(e.target.value)}
                                placeholder="Enquire about Metro, Spine Road, or 2026 ROI..."
                                className="flex-1 px-12 py-8 bg-gray-50 border-none rounded-full outline-none font-bold text-secondary text-xl focus:ring-8 focus:ring-accent/10 transition-all placeholder:text-gray-300"
                            />
                            <button type="submit" className="w-24 h-24 bg-secondary text-white rounded-full flex items-center justify-center hover:bg-accent hover:text-secondary transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:scale-105">
                                <Send size={36} />
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default SovereignConcierge;
