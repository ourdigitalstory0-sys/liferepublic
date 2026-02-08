import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, Phone, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { projects } from '../data/projects';

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const project = projects.find((p) => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
                <Button onClick={() => navigate('/')} variant="outline">
                    Back to Home
                </Button>
            </div>
        );
    }

    return (
        <div className="pt-20">
            {/* Project Hero */}
            <section className="relative h-[60vh] w-full">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="bg-accent px-4 py-1 text-sm font-semibold rounded-full mb-4 inline-block">
                                {project.category}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">{project.title}</h1>
                            <p className="text-xl md:text-2xl flex items-center justify-center gap-2">
                                <MapPin size={24} /> {project.location}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="py-16">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-serif font-bold mb-6 text-secondary">Overview</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            {project.description}
                        </p>

                        <h3 className="text-2xl font-serif font-bold mb-6 text-secondary">Key Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                            {project.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <CheckCircle className="text-accent" size={24} />
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <h3 className="text-xl font-bold mb-4">Configuration & Pricing</h3>
                            <div className="flex justify-between items-center border-b border-gray-200 py-3">
                                <span className="text-gray-600">Typology</span>
                                <span className="font-semibold">{project.features[0]}</span>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <span className="text-gray-600">Starting Price</span>
                                <span className="font-bold text-accent text-lg">{project.price}</span>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Contact Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                            <h3 className="text-2xl font-serif font-bold mb-6 text-center">Enquire Now</h3>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent" placeholder="+91 98765 43210" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent" placeholder="john@example.com" />
                                </div>
                                <Button className="w-full">
                                    Request Call Back
                                </Button>
                            </form>

                            <div className="mt-8">
                                <p className="text-center text-gray-500 mb-4 text-sm">Or connect instantly via</p>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1 gap-2 border-green-500 text-green-600 hover:bg-green-50" onClick={() => window.open('https://wa.me/919999999999', '_blank')}>
                                        <MessageSquare size={18} /> WhatsApp
                                    </Button>
                                    <Button variant="outline" className="flex-1 gap-2" onClick={() => window.location.href = 'tel:+919999999999'}>
                                        <Phone size={18} /> Call
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetails;
