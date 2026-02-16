import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/seo/SEO';

import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export const Contact: React.FC = () => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // Sunday

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Kolte Patil Life Republic Sales Office",
        "image": "https://liferepublic.in/images/gallery/eros/master-layout.webp",
        "url": "https://life-republic.in/contact",
        "telephone": "+917744009295",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Life Republic Township, Marunji",
            "addressLocality": "Hinjawadi, Pune",
            "postalCode": "411057",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 18.5995,
            "longitude": 73.7153
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "09:00",
            "closes": "19:00"
        }
    };

    return (
        <div className="pt-20">
            <SEO
                title="Contact Kolte Patil Life Republic Sales Office | Hinjewadi | +91 77440 09295"
                description="Get in touch with the official sales team for Life Republic by Kolte Patil. Schedule a VIP site visit, request a brochure, or call +91 77440 09295 for best deals."
                keywords="Life Republic Contact No, Kolte Patil Sales Office Hinjewadi, Life Republic Address, Site Visit Life Republic, Booking Office Hinjewadi, Kolte Patil Customer Care"
                canonical="/contact"
                schema={localBusinessSchema}
            />
            <Breadcrumbs />
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
                                    <p className="text-gray-600">+91 77440 09295</p>
                                    <p className="text-gray-500 text-sm">Mon - Sun: 9:00 AM - 7:00 PM</p>
                                </div>
                            </div>


                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-100">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </div>
    );
};

const ContactForm: React.FC = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await import('../services/api').then(m => m.api.leads.create({
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                message: formData.message
            }));
            alert('Thank you! We will contact you shortly.');
            setFormData({ name: '', phone: '', email: '', message: '' });
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                    required
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                    required
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
                    placeholder="Your Mobile Number"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent h-32"
                    placeholder="I am interested in..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
            </div>
            <Button size="lg" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Submit Enquiry'}
            </Button>
        </form>
    );
};
