import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Menu, X, ArrowRight, Sparkles, Building2, ShieldCheck, 
    MapPin, ChevronDown, Phone, Zap, ArrowUpRight, TrendingUp 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import sectorsData from '../../data/sectors.json';
import { ID_TO_SLUG } from '../../data/slug-registry';

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showQuickSwitch, setShowQuickSwitch] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setShowQuickSwitch(false);
    }, [location]);

    const getAccentBg = () => {
        if (location.pathname.includes('luxury') || location.pathname.includes('24k')) return 'bg-[#C5A059]';
        if (location.pathname.includes('smart') || location.pathname.includes('qrious')) return 'bg-blue-400';
        return 'bg-accent';
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 px-6 py-8 ${scrolled ? 'sm:py-4' : 'sm:py-8'}`}>
            <div className="container mx-auto">
                <div className={`relative flex items-center justify-between px-10 py-5 bg-secondary/80 backdrop-blur-3xl rounded-full border border-white/10 shadow-2xl transition-all ${scrolled ? 'shadow-accent/20 border-accent/20' : ''}`}>
                    <Link to="/" className="flex items-center gap-5 group">
                        <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-[10deg] transition-all duration-700 border border-white/20 overflow-hidden">
                                <img src="/images/life-republic-logo-color.png" alt="LR" className="w-full h-full object-contain p-2 brightness-110 group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="flex flex-col leading-[1.1]">
                                <span className="text-white font-serif font-bold text-2xl md:text-3xl tracking-tighter uppercase group-hover:text-accent transition-colors duration-500">Life Republic</span>
                                <span className="text-accent/60 text-[9px] font-bold uppercase tracking-[0.6em] mt-1 group-hover:text-white transition-colors duration-500">Sovereign Township</span>
                            </div>
                        </div>
                    </Link>
                    
                    <div className="hidden lg:flex items-center gap-12">
                        {[
                            { name: 'Sectors', path: '/projects', special: true },
                            { name: 'Lifestyle', path: '/lifestyle' },
                            { name: 'Infrastructure', path: '/location-highlights' },
                            { name: 'Investment', path: '/nri-corner' }
                        ].map((link) => (
                            <div key={link.name} className="relative group">
                                {link.special ? (
                                    <button 
                                        onMouseEnter={() => setShowQuickSwitch(true)} 
                                        onClick={() => setShowQuickSwitch(!showQuickSwitch)} 
                                        className="flex items-center gap-3 text-sm font-bold text-white/70 uppercase tracking-[0.3em] hover:text-white transition-all"
                                    >
                                        {link.name} 
                                        <ChevronDown size={16} className={`transition-transform duration-500 ${showQuickSwitch ? 'rotate-180 text-accent' : ''}`} />
                                    </button>
                                ) : (
                                    <Link to={link.path} className={`text-sm font-bold uppercase tracking-[0.3em] transition-all ${location.pathname === link.path ? 'text-white' : 'text-white/70 hover:text-white'}`}>
                                        {link.name}
                                    </Link>
                                )}
                                <motion.div className={`absolute -bottom-2 left-0 h-[2px] ${getAccentBg()} w-0 group-hover:w-full transition-all duration-700 ${location.pathname === link.path ? 'w-full' : ''}`} />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="hidden xl:flex items-center gap-8 border-r border-white/10 pr-8 mr-2">
                            <a href="tel:+918010101010" className="text-white/60 hover:text-accent transition-all flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
                                <Phone size={16} className="text-accent" /> +91 8010 1010 10
                            </a>
                        </div>
                        <Button variant="primary" size="lg" className="hidden sm:flex rounded-full px-10 py-4 font-bold text-sm tracking-[0.25em] uppercase gap-3 shadow-2xl shadow-accent/20 hover:scale-105 transition-all" onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}>
                            Enquire Now <Sparkles size={16} />
                        </Button>
                        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-3 bg-white/5 rounded-2xl text-white hover:text-accent transition-all border border-white/10">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
                <AnimatePresence>
                    {showQuickSwitch && (
                        <motion.div initial={{ opacity: 0, y: -40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -40, scale: 0.95 }} onMouseLeave={() => setShowQuickSwitch(false)} className="absolute left-1/2 -translate-x-1/2 top-40 w-full max-w-6xl bg-secondary/95 backdrop-blur-3xl rounded-[5rem] p-20 border border-white/10 shadow-2xl z-[-1]">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
                                <div className="space-y-12"><div className="flex items-center gap-4 text-accent mb-4"><Building2 size={20} /><span className="text-[12px] font-bold uppercase tracking-[0.6em]">Premium Clusters</span></div><div className="space-y-6">{sectorsData.sectors.slice(0, 6).map(s => (<Link key={s.id} to={`/projects/${ID_TO_SLUG[s.id] || s.slug}`} className="flex items-center justify-between text-white/50 hover:text-white group transition-all"><span className="text-lg font-bold tracking-tight">{s.name}</span><ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 -translate-y-2 translate-x-2 transition-all text-accent" /></Link>))}</div></div>
                                <div className="space-y-12"><div className="flex items-center gap-4 text-accent mb-4"><Zap size={20} /><span className="text-[12px] font-bold uppercase tracking-[0.6em]">Investment Yield</span></div><div className="space-y-6">{sectorsData.sectors.slice(6, 12).map(s => (<Link key={s.id} to={`/projects/${ID_TO_SLUG[s.id] || s.slug}`} className="flex items-center justify-between text-white/50 hover:text-white group transition-all"><span className="text-lg font-bold tracking-tight">{s.name}</span><TrendingUp size={20} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" /></Link>))}</div></div>
                                <div className="space-y-12"><div className="flex items-center gap-4 text-accent mb-4"><MapPin size={20} /><span className="text-[12px] font-bold uppercase tracking-[0.6em]">Strategic Zones</span></div><div className="space-y-6">{sectorsData.localities.slice(0, 6).map(l => (<Link key={l.id} to={`/location/${l.slug}`} className="flex items-center justify-between text-white/50 hover:text-white group transition-all"><span className="text-lg font-bold tracking-tight">{l.name}</span><ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" /></Link>))}</div></div>
                                <div className="bg-white/5 rounded-[4rem] p-12 flex flex-col justify-between border border-white/10 group"><div className="space-y-6 text-center"><Sparkles size={48} className="text-accent mx-auto mb-4 animate-pulse" /><h4 className="text-4xl font-serif font-bold text-white tracking-tighter">Master <br />Blueprint.</h4><p className="text-sm text-white/30 leading-relaxed font-medium">Navigate the 390-acre tectonic landscape through our interactive spatial mesh.</p></div><Link to="/master-plan" className="w-full bg-accent text-secondary py-8 rounded-3xl text-center font-bold text-xs uppercase tracking-[0.5em] shadow-2xl hover:bg-white transition-all mt-10">Explore Map</Link></div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 bg-secondary z-[110] lg:hidden p-16 flex flex-col">
                        <div className="flex justify-between items-center mb-24 relative z-10">
                            <Link to="/" className="flex items-center gap-6 group">
                                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-xl border border-white/20">
                                    <img src="/images/life-republic-logo-color.png" alt="LR" className="w-full h-full object-contain p-2" />
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-3xl font-serif font-bold text-white tracking-tighter uppercase">Life Republic</span>
                                    <span className="text-accent text-[12px] font-bold uppercase tracking-[0.5em] mt-1">Sovereign Township</span>
                                </div>
                            </Link>
                            <button onClick={() => setIsOpen(false)} className="p-6 bg-white/5 rounded-full text-white border border-white/10">
                                <X size={48} />
                            </button>
                        </div>
                        <div className="space-y-10 flex-1 relative z-10">{[
                            { name: 'Sovereign Sectors', path: '/projects' },
                            { name: 'Luxury Villas', path: '/projects/kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi' },
                            { name: 'Infrastructure', path: '/location-highlights' },
                            { name: 'Investment Hub', path: '/nri-corner' }
                        ].map((link) => (<Link key={link.name} to={link.path} className="block text-6xl font-serif font-bold text-white hover:text-accent transition-all tracking-tighter leading-tight">{link.name}</Link>))}</div>
                        <div className="space-y-8 pt-16 border-t border-white/10 relative z-10"><div className="flex items-center gap-4 text-white/30 font-bold uppercase tracking-[0.5em] text-[10px]"><ShieldCheck size={20} className="text-accent" /> MahaRERA Synchronized</div><Button variant="primary" size="lg" className="w-full rounded-[2.5rem] py-8 font-bold text-xl shadow-2xl" onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}>Enquire Now</Button></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
