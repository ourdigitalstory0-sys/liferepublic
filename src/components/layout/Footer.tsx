import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const Footer: React.FC = () => {
    return (
        <footer className="relative bg-primary-dark text-white pt-24 pb-12 overflow-hidden">
            {/* Fluid Curve Top */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(113%+1.3px)] h-[60px] md:h-[100px] fill-primary">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                </svg>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 pt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                    {/* Brand Column (Span 4) */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="flex flex-col">
                            <span className="text-3xl font-serif font-bold tracking-wider text-white">
                                LIFE REPUBLIC
                            </span>
                            <span className="text-xs uppercase tracking-[0.3em] text-accent/80 mt-1">
                                By Kolte Patil
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed max-w-sm">
                            Experience a world of luxury and tranquility. A 390+ acre integrated township redefining modern living in Hinjewadi, Pune.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 group"
                                >
                                    <Icon size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Link Columns (Span 2 each) */}
                    <div className="lg:col-span-2 lg:col-start-6">
                        <h4 className="text-lg font-serif font-bold mb-8 text-white">Explore</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Projects', path: '/projects' },
                                { name: 'Amenities', path: '/amenities' },
                                { name: 'Contact', path: '/contact' },
                                { name: 'About Us', path: '#' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-accent flex items-center gap-2 group transition-all duration-300"
                                    >
                                        <span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-300"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="text-lg font-serif font-bold mb-8 text-white">Featured</h4>
                        <ul className="space-y-4">
                            {[
                                'Atmos - Premium',
                                'Villas - Luxury',
                                '24K World',
                                'Aros - Smart',
                                'Arezo - 2 & 3 BHK'
                            ].map((project) => (
                                <li key={project}>
                                    <Link
                                        to="/projects"
                                        className="text-gray-400 hover:text-white group flex items-center gap-2 transition-all duration-300"
                                    >
                                        {project}
                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 text-accent" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column (Span 4) */}
                    <div className="lg:col-span-4 lg:col-start-10">
                        <h4 className="text-lg font-serif font-bold mb-8 text-white">Visit Us</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-lg bg-white/5 group-hover:bg-accent/20 transition-colors">
                                    <MapPin size={20} className="text-accent" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-gray-300 font-medium">Site Address</p>
                                    <p className="text-sm text-gray-500">Marunji, Hinjewadi, Pune, Maharashtra 411057</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="p-3 rounded-lg bg-white/5 group-hover:bg-accent/20 transition-colors">
                                    <Phone size={20} className="text-accent" />
                                </div>
                                <div>
                                    <p className="text-gray-300 font-medium">Call Us</p>
                                    <a href="tel:+919876543210" className="text-sm text-gray-500 hover:text-white transition-colors">+91 98765 43210</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="p-3 rounded-lg bg-white/5 group-hover:bg-accent/20 transition-colors">
                                    <Mail size={20} className="text-accent" />
                                </div>
                                <div>
                                    <p className="text-gray-300 font-medium">Email Us</p>
                                    <a href="mailto:sales@liferepublic.in" className="text-sm text-gray-500 hover:text-white transition-colors">sales@liferepublic.in</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Strip */}
                <div className="relative py-12 px-8 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/5 mb-16 overflow-hidden">
                    <div className="absolute inset-0 bg-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl font-serif font-bold mb-2">Join our Exclusive Newsletter</h3>
                            <p className="text-gray-400 text-sm">Be the first to know about new launches and offers.</p>
                        </div>
                        <div className="flex w-full md:w-auto gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-black/30 border border-white/10 rounded-lg px-6 py-3 w-full md:w-80 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all text-sm backdrop-blur-sm"
                            />
                            <Button variant="primary" className="whitespace-nowrap px-8">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500/60">
                    <p>© 2025 Life Republic. Designed with precision.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-accent transition-colors">Terms of Use</a>
                        <a href="#" className="hover:text-accent transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
            {/* Brand Multi-color Strip */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-400 via-red-500 pink-500 purple-500 blue-500 to-green-500"></div>
        </footer>
    );
};
