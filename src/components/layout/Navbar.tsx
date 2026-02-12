import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'Amenities', path: '/amenities' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-center ${isScrolled ? 'pt-4' : 'py-0'}`}
            >
                {/* Gradient Overlay for better contrast when at top */}
                {!isScrolled && (
                    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 via-black/30 to-transparent -z-10 pointer-events-none" />
                )}

                <div
                    className={`
                        transition-all duration-500 ease-in-out
                        flex items-center justify-between
                        ${isScrolled
                            ? 'w-[95%] md:w-[85%] lg:w-[70%] bg-white/95 backdrop-blur-md shadow-lg rounded-full px-6 py-3 border border-white/40' // Increased opacity
                            : 'w-full container px-4 py-6 bg-transparent border-transparent'
                        }
                    `}
                >
                    {/* Logo Section */}
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src="/logo-theme.png"
                            alt="Kolte Patil Life Republic Township Logo"
                            width="160"
                            height="56"
                            className={`object-contain transition-all duration-500 ${isScrolled ? 'h-10' : 'h-14'}`}
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                        />
                        {/* Fallback Text Logo */}
                        <div className="hidden flex flex-col items-start leading-none">
                            <span className={`font-serif text-2xl tracking-wide transition-colors duration-300 ${isScrolled ? 'text-primary-dark' : 'text-white'}`}>
                                Life
                            </span>
                            <span className={`font-sans text-[10px] tracking-[0.4em] uppercase font-bold transition-colors duration-300 ${isScrolled ? 'text-accent' : 'text-accent-light'}`}>
                                REPUBLIC
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1">
                        <div className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-500 ${isScrolled ? 'bg-gray-100/50' : 'bg-black/20 backdrop-blur-sm'}`}>
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActive
                                            ? 'text-secondary bg-white shadow-sm'
                                            : isScrolled
                                                ? 'text-gray-600 hover:text-secondary hover:bg-white/50'
                                                : 'text-white hover:bg-white/10 drop-shadow-md font-semibold' // Increased contrast
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* CTA / Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant={isScrolled ? 'primary' : 'outline'}
                            size={isScrolled ? 'sm' : 'md'}

                            className={`hidden md:flex items-center gap-2 rounded-full transition-all duration-300 ${!isScrolled && 'border-white/30 text-white hover:bg-white hover:text-secondary'
                                }`}
                        >
                            <Phone size={16} />
                            <span className="hidden lg:inline">+91 77440 09295</span>
                        </Button>

                        <button
                            className={`md:hidden p-2 rounded-full transition-colors ${isScrolled
                                ? 'bg-gray-100 text-secondary hover:bg-gray-200'
                                : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md'
                                }`}
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open Menu"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl p-6 flex flex-col"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-xl font-serif font-bold text-secondary">Menu</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                                    aria-label="Close Menu"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center justify-between p-4 rounded-xl transition-all ${location.pathname === link.path
                                            ? 'bg-primary/10 text-accent'
                                            : 'hover:bg-gray-50 text-secondary'
                                            }`}
                                    >
                                        <span className="text-lg font-medium">{link.name}</span>
                                        <ArrowRight size={18} className={`opacity-0 -translate-x-2 transition-all ${location.pathname === link.path ? 'opacity-100 translate-x-0' : ''}`} />
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-auto">
                                <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                                    <p className="text-sm text-gray-500">Get in touch</p>
                                    <a href="tel:+917744009295" className="flex items-center gap-3 text-secondary font-medium text-lg">
                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                            <Phone size={20} />
                                        </div>
                                        +91 77440 09295
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
