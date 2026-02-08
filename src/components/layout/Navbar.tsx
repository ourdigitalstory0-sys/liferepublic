import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
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
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent ${isScrolled
                    ? 'bg-primary/80 backdrop-blur-md shadow-sm py-2 border-gray-200'
                    : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    {/* Logo Placeholder - would use actual image if available */}
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isScrolled ? 'bg-accent text-white' : 'bg-white text-accent'}`}>
                        <span className="font-serif font-bold text-xl">L</span>
                    </div>
                    <div className="flex flex-col">
                        <span className={`text-xl font-serif font-bold tracking-wide transition-colors duration-300 ${isScrolled ? 'text-secondary' : 'text-white'}`}>
                            LIFE REPUBLIC
                        </span>
                        <span className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${isScrolled ? 'text-accent' : 'text-gray-200'}`}>
                            By Kolte Patil
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium hover:text-accent transition-colors uppercase tracking-wider relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full ${location.pathname === link.path ? 'text-accent after:w-full' : (isScrolled ? 'text-secondary' : 'text-white')
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button
                        variant={isScrolled ? 'primary' : 'outline'}
                        size="sm"
                        className={`gap-2 ${!isScrolled && 'border-white text-white hover:bg-white hover:text-accent'}`}
                    >
                        <Phone size={16} />
                        +91 98765 43210
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`md:hidden transition-colors duration-300 ${isScrolled ? 'text-secondary' : 'text-white'}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-primary shadow-lg absolute top-full left-0 w-full py-4 px-4 flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-secondary font-medium hover:text-accent"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button variant="primary" size="md" className="w-full gap-2">
                        <Phone size={16} />
                        Call Now
                    </Button>
                </div>
            )}
        </nav>
    );
};
