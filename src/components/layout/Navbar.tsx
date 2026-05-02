import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles, Building2, ShieldCheck, MapPin, Search, ChevronDown, Download, Phone, Zap, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import sectorsData from '../../data/sectors.json';

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

    const getAccentColor = () => {
        if (location.pathname.includes('luxury') || location.pathname.includes('24k')) return 'text-[#C5A059]';
        if (location.pathname.includes('smart') || location.pathname.includes('qrious')) return 'text-blue-400';
        return 'text-accent';
    };

    const getAccentBg = () => {
        if (location.pathname.includes('luxury') || location.pathname.includes('24k')) return 'bg-[#C5A059]';
        if (location.pathname.includes('smart') || location.pathname.includes('qrious')) return 'bg-blue-400';
        return 'bg-accent';
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 px-6 py-8 ${scrolled ? 'sm:py-4' : 'sm:py-8'}`}>
            <div className="container mx-auto">
                <div className={`relative flex items-center justify-between px-10 py-5 bg-secondary/80 backdrop-blur-3xl rounded-full border border-white/10 shadow-2xl transition-all ${scrolled ? 'shadow-accent/20 border-accent/20' : ''}`}>
                    <Link to="/" className="flex items-center gap-4 group">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-500 border border-white/20">
                                <span className="text-secondary font-serif font-black text-2xl tracking-tighter">LR</span>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-white font-serif font-bold text-xl tracking-tighter uppercase">Life Republic</span>
                                <span className="text-accent text-[8px] font-bold uppercase tracking-[0.4em] mt-1">Township Hinjewadi</span>
                            </div>
                        </div>
                    </Link>
                    
                    <div className="hidden lg:flex items-center gap-10">
                        {[
                            { name: 'Sectors', path: '/sectors', special: true },
                            { name: 'Lifestyle', path: '/lifestyle' },
                            { name: 'Infrastructure', path: '/location-highlights' },
                            { name: 'Investment', path: '/roi-calculator' }
                        ].map((link) => (
                            <div key={link.name} className="relative group">
                                {link.special ? (
                                    <button 
                                        onMouseEnter={() => setShowQuickSwitch(true)} 
                                        onClick={() => setShowQuickSwitch(!showQuickSwitch)} 
                                        className="flex items-center gap-2 text-[13px] font-bold text-white/70 uppercase tracking-[0.25em] hover:text-white transition-all"
                                    >
                                        {link.name} 
                                        <ChevronDown size={14} className={`transition-transform duration-500 ${showQuickSwitch ? 'rotate-180 text-accent' : ''}`} />
                                    </button>
                                ) : (
                                    <Link to={link.path} className={`text-[13px] font-bold uppercase tracking-[0.25em] transition-all ${location.pathname === link.path ? 'text-white' : 'text-white/70 hover:text-white'}`}>
                                        {link.name}
                                    </Link>
                                )}
                                <motion.div className={`absolute -bottom-2 left-0 h-[1.5px] ${getAccentBg()} w-0 group-hover:w-full transition-all duration-500 ${location.pathname === link.path ? 'w-full' : ''}`} />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden xl:flex items-center gap-6 border-r border-white/10 pr-6 mr-1">
                            <a href="tel:+918010101010" className="text-white/60 hover:text-accent transition-all flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest">
                                <Phone size={14} /> +91 8010 1010 10
                            </a>
                        </div>
                        <Button variant="primary" size="sm" className="hidden sm:flex rounded-full px-8 py-3 font-bold text-[12px] tracking-[0.2em] uppercase gap-2 shadow-xl" onClick={() => window.dispatchEvent(new CustomEvent('openEnquiry'))}>
                            Inquire <Sparkles size={14} />
                        </Button>
                        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 bg-white/5 rounded-xl text-white hover:text-accent transition-all border border-white/10">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
                <AnimatePresence>
                    {showQuickSwitch && (
                        <motion.div initial={{ opacity: 0, y: -40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -40, scale: 0.95 }} onMouseLeave={() => setShowQuickSwitch(false)} className="absolute left-1/2 -translate-x-1/2 top-36 w-full max-w-6xl bg-secondary/95 backdrop-blur-3xl rounded-[4rem] p-16 border border-white/10 shadow-2xl z-[-1]">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
                                <div className="space-y-10"><div className="flex items-center gap-3 text-accent mb-2"><Building2 size={16} /><span className="text-[12px] font-bold uppercase tracking-[0.5em]">Premium Clusters</span></div><div className="space-y-5">{sectorsData.sectors.slice(0, 6).map(s => (<Link key={s.id} to={`/projects/${s.slug}`} className="flex items-center justify-between text-white/50 hover:text-white group transition-all"><span className="text-base font-bold tracking-tight">{s.name}</span><ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all text-accent" /></Link>))}</div></div>
                                <div className="space-y-10"><div className="flex items-center gap-3 text-accent mb-2"><Zap size={16} /><span className="text-[12px] font-bold uppercase tracking-[0.5em]">Investment Yield</span></div><div className="space-y-5">{sectorsData.sectors.slice(6, 12).map(s => (<Link key={s.id} to={`/projects/${s.slug}`} className="flex items-center justify-between text-white/50 hover:text-white group transition-all"><span className="text-base font-bold tracking-tight">{s.name}</span><TrendingUp size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" /></Link>))}</div></div>
                                <div className="space-y-10"><div className="flex items-center gap-3 text-accent mb-2"><MapPin size={16} /><span className="text-[12px] font-bold uppercase tracking-[0.5em]">Strategic Zones</span></div><div className="space-y-5">{sectorsData.localities.slice(0, 6).map(l => (<Link key={l.id} to={`/location/${l.slug}`} className="flex items-center justify-between text-white/50 hover:text-white group transition-all"><span className="text-base font-bold tracking-tight">{l.name}</span><ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" /></Link>))}</div></div>
                                <div className="bg-white/5 rounded-[3rem] p-10 flex flex-col justify-between border border-white/10"><div className="space-y-4"><h4 className="text-3xl font-serif font-bold text-white tracking-tighter">Master <br />Blueprint.</h4><p className="text-sm text-white/30 leading-relaxed font-medium">Navigate the 390-acre tectonic landscape through our interactive spatial mesh.</p></div><Link to="/master-plan" className="w-full bg-accent text-secondary py-6 rounded-2xl text-center font-bold text-xs uppercase tracking-[0.4em] shadow-2xl hover:scale-105 transition-transform">Explore Map</Link></div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 bg-secondary z-[110] lg:hidden p-16 flex flex-col">
                        <div className="flex justify-between items-center mb-24 relative z-10">
                            <Link to="/" className="flex items-center gap-4 group">
                                <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center shadow-xl border border-white/20">
                                    <span className="text-secondary font-serif font-black text-2xl tracking-tighter">LR</span>
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-2xl font-serif font-bold text-white tracking-tighter uppercase">Life Republic</span>
                                    <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mt-1">Township Hinjewadi</span>
                                </div>
                            </Link>
                            <button onClick={() => setIsOpen(false)} className="p-5 bg-white/5 rounded-full text-white border border-white/10">
                                <X size={36} />
                            </button>
                        </div>
                        <div className="space-y-12 flex-1 relative z-10">{[
                            { name: 'The Sectors', path: '/sectors' },
                            { name: 'Luxury Monograph', path: '/projects/kolte-patil-life-republic-24k-espada-luxury-villas-hinjewadi' },
                            { name: 'IT Infrastructure', path: '/location-highlights' },
                            { name: 'Investment Hub', path: '/roi-calculator' }
                        ].map((link) => (<Link key={link.name} to={link.path} className="block text-5xl font-serif font-bold text-white hover:text-accent transition-all tracking-tighter">{link.name}</Link>))}</div>
                        <div className="space-y-8 pt-16 border-t border-white/10 relative z-10"><div className="flex items-center gap-4 text-white/30 font-bold uppercase tracking-[0.5em] text-[10px]"><ShieldCheck size={20} className="text-accent" /> MahaRERA Synchronized</div><Button variant="primary" size="lg" className="w-full rounded-[2.5rem] py-8 font-bold text-xl shadow-2xl" onClick={() => window.dispatchEvent(new CustomEvent('openEnquiry'))}>Secure Site Visit</Button></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
