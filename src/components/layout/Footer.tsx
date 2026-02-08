import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-secondary text-primary py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-serif font-bold mb-4">Life Republic</h3>
                        <p className="text-gray-400 text-sm">
                            Experience the perfect blend of nature and luxury at Life Republic. A township designed for a smarter, better life.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-accent">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link></li>
                            <li><Link to="/amenities" className="text-gray-400 hover:text-white transition-colors">Amenities</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-accent">Contact Us</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-center gap-2">
                                <MapPin size={16} />
                                <span>Marunji, Hinjewadi, Pune</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={16} />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} />
                                <span>sales@liferepublic.in</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-accent">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Life Republic. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
