import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Contact: React.FC = () => {
    return (
        <div className="pt-20">
            <section className="bg-secondary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-serif font-bold mb-6"
                    >
                        Contact Us
                    </motion.h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-300">
                        Get in touch with us to find your dream home at Life Republic.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-secondary mb-6">Get in Touch</h2>
                            <p className="text-gray-600 text-lg">
                                Have questions? Our experts are here to help you navigate your home buying journey.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent flex-shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-secondary mb-2">Visit Us</h3>
                                    <p className="text-gray-600">Life Republic Township, Marunji, Hinjawadi, Pune, Maharashtra 411057</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent flex-shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-secondary mb-2">Call Us</h3>
                                    <p className="text-gray-600">+91 98765 43210</p>
                                    <p className="text-gray-500 text-sm">Mon - Sun: 9:00 AM - 7:00 PM</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent flex-shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-secondary mb-2">Email Us</h3>
                                    <p className="text-gray-600">sales@liferepublic.in</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-100">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent" placeholder="Your Mobile Number" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent h-32" placeholder="I am interested in..."></textarea>
                            </div>
                            <Button size="lg" className="w-full">Submit Enquiry</Button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};
