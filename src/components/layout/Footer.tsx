import React from 'react';
import { Link } from 'react-router-dom';
import { RERA_NUMBERS } from '../../data/rera';
import { Facebook, Instagram, Twitter, Linkedin, Phone, MapPin, ArrowUpRight } from 'lucide-react';

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

                    {/* Brand Column (Span 3) */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="flex flex-col">
                            <span className="text-3xl font-serif font-bold tracking-wider text-white">
                                LIFE REPUBLIC
                            </span>
                            <span className="text-xs uppercase tracking-[0.3em] text-accent/80 mt-1">
                                By Kolte Patil
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed max-w-sm">
                            <strong>Kolte Patil Life Republic Township Hinjewadi</strong> is a premium 390+ acre integrated township. Offering 1, 2, 3 BHK flats and villas near Rajiv Gandhi IT Park.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: Facebook, label: 'Facebook' },
                                { Icon: Instagram, label: 'Instagram' },
                                { Icon: Twitter, label: 'Twitter' },
                                { Icon: Linkedin, label: 'LinkedIn' }
                            ].map(({ Icon, label }, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 group"
                                    aria-label={label}
                                >
                                    <Icon size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Link Columns (Span 2 each) */}
                    <div className="lg:col-span-2 lg:col-start-4">
                        <h4 className="text-lg font-serif font-bold mb-8 text-white">Explore</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Projects', path: '/projects' },
                                { name: 'Amenities', path: '/amenities' },
                                { name: 'Contact', path: '/contact' },
                                { name: 'About Us', path: '/about' }
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
                                '24K Espada',
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

                    <div className="lg:col-span-2">
                        <h4 className="text-lg font-serif font-bold mb-8 text-white">Locations</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Near Hinjewadi', path: '/location/flats-near-hinjewadi' },
                                { name: 'Near Tathawade', path: '/location/flats-near-tathawade' },
                                { name: 'Near Punawale', path: '/location/flats-near-punawale' },
                                { name: 'Near Wakad', path: '/location/flats-near-wakad' },
                                { name: 'Near Marunji', path: '/location/flats-near-marunji' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-white group flex items-center gap-2 transition-all duration-300"
                                    >
                                        {link.name}
                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 text-accent" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column (Span 3) */}
                    <div className="lg:col-span-3">
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
                                    <a href="tel:+917744009295" className="text-sm text-gray-500 hover:text-white transition-colors">+91 77440 09295</a>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>



                {/* RERA Numbers Section */}
                <div className="border-t border-white/5 py-8 mt-12">
                    <h5 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">RERA Registration Numbers</h5>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-gray-500">
                        {RERA_NUMBERS.map((item, index) => (
                            <span key={index} className="flex items-center gap-1">
                                <span className="text-gray-400">{item.title}:</span>
                                <span className="font-mono text-accent/80">{item.rera}</span>
                            </span>
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-600 mt-4 italic">
                        The projects have been registered via MahaRERA registration numbers and are available on the website <a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-accent underline">https://maharera.mahaonline.gov.in</a> under registered projects.
                    </p>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500/60">
                    <p>© 2025 Life Republic. Designed with precision.</p>
                    <div className="flex gap-8">
                        <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-accent transition-colors">Terms of Use</Link>
                        <a href="/sitemap.xml" className="hover:text-accent transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
            {/* Brand Multi-color Strip */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-400 via-red-500 pink-500 purple-500 blue-500 to-green-500"></div>
        </footer>
    );
};
