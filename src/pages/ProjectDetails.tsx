import React, { useEffect, useState } from 'react';
import { EMICalculator } from '../components/tools/EMICalculator';
import { ROICalculator } from '../components/tools/ROICalculator';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, Phone, MessageSquare, ZoomIn } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { api } from '../services/api';
import type { Project, Amenity } from '../lib/types';
import { Star } from 'lucide-react';
import { ICON_MAP } from '../lib/icons';
import { SimilarProjects } from '../components/sections/SimilarProjects';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ShareButtons } from '../components/ui/ShareButtons';
import { ImageModal } from '../components/ui/ImageModal';
import { generateSemanticKeywords, generateSemanticDescription, generateSemanticTitle } from '../lib/seo-utils';
import { generateProjectSchema } from '../utils/schemaGenerator';

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);
    const [globalAmenities, setGlobalAmenities] = useState<Amenity[]>([]);
    const [loading, setLoading] = useState(true);

    // Lightbox State
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [currentAlt, setCurrentAlt] = useState('');

    const openLightbox = (image: string, alt: string) => {
        setCurrentImage(image);
        setCurrentAlt(alt);
        setLightboxOpen(true);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const loadProject = async () => {
            if (!id) return;
            try {
                const [projectData, amenitiesData] = await Promise.all([
                    api.projects.getById(id),
                    api.amenities.getAll().catch(() => [])
                ]);

                if (projectData) {
                    setProject(projectData);
                    setGlobalAmenities(amenitiesData);
                }
            } catch (error) {
                console.error('Failed to load project from API:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProject();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
        );
    }

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

    // Default theme color if not present
    const themeColor = project.themeColor || '#C5A059';

    // Construct Schema using logic
    const projectSchema = generateProjectSchema(project);

    const seoContext = {
        title: project.title,
        category: project.category,
        location: 'Hinjewadi', // Hardcoded as primary target
        price: project.price
    };

    const dynamicTitle = generateSemanticTitle(seoContext);
    const dynamicDesc = generateSemanticDescription(seoContext);
    const dynamicKeywords = generateSemanticKeywords(seoContext);

    return (
        <div className="pt-20">
            <Breadcrumbs />
            <SEO
                title={dynamicTitle}
                description={dynamicDesc}
                keywords={dynamicKeywords}
                image={project.image}
                canonical={`/projects/${project.id}`}
                schema={projectSchema}
            />
            {/* Project Hero */}
            <section className="relative h-[60vh] w-full">
                <img
                    src={project.image}
                    alt={`Kolte Patil Life Republic - ${project.title}`}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span
                                className="px-4 py-1 text-sm font-semibold rounded-full mb-4 inline-block shadow-lg border border-white/20 backdrop-blur-sm"
                                style={{ backgroundColor: themeColor }}
                            >
                                {project.category}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-shadow-lg">{project.title}</h1>
                            <p className="text-xl md:text-2xl flex items-center justify-center gap-2 text-shadow">
                                <MapPin size={24} style={{ color: themeColor }} /> {project.location}
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
                                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                                    <CheckCircle size={24} style={{ color: themeColor }} />
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* Master Layout & Floor Plans Section */}
                        {(project.masterLayout || (project.floorPlans && project.floorPlans.length > 0)) && (
                            <div className="mb-12">
                                <h3 className="text-2xl font-serif font-bold mb-6 text-secondary">Layouts & Plans</h3>

                                {/* Master Layout */}
                                {project.masterLayout && (
                                    <div className="mb-8">
                                        <h4 className="text-lg font-semibold mb-4 text-gray-700">Master Layout</h4>
                                        <button
                                            onClick={() => openLightbox(project.masterLayout!, `${project.title} - Master Layout`)}
                                            className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-gray-200 group bg-gray-50"
                                        >
                                            <img
                                                src={project.masterLayout}
                                                alt={`${project.title} Master Layout`}
                                                className="w-full h-full object-contain"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2">
                                                    <ZoomIn size={16} />
                                                    <span className="text-sm font-medium">View Full Size</span>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                )}

                                {/* Floor Plans */}
                                {project.floorPlans && project.floorPlans.length > 0 && (
                                    <div>
                                        <h4 className="text-lg font-semibold mb-4 text-gray-700">Floor Plans</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {project.floorPlans.map((plan, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => openLightbox(plan, `${project.title} - Floor Plan ${idx + 1}`)}
                                                    className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 group bg-gray-50 flex flex-col"
                                                >
                                                    <div className="flex-grow w-full relative">
                                                        <img
                                                            src={plan}
                                                            alt={`Floor Plan ${idx + 1}`}
                                                            className="w-full h-full object-contain p-2"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                                            <ZoomIn size={20} className="text-gray-800 opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100" />
                                                        </div>
                                                    </div>
                                                    <div className="w-full py-2 bg-white border-t border-gray-100 text-center text-sm font-medium text-gray-600">
                                                        Type {idx + 1}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Amenities Section */}
                        {project.amenities && project.amenities.length > 0 && (
                            <div className="mb-12">
                                <h3 className="text-2xl font-serif font-bold mb-6 text-secondary">Amenities</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {project.amenities.map((amenityName, index) => {
                                        const originalAmenity = globalAmenities.find(a => a.title === amenityName);
                                        const IconComponent = originalAmenity?.icon ? ICON_MAP[originalAmenity.icon] : Star;
                                        return (
                                            <div key={index} className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center gap-2 hover:border-accent/30 transition-colors">
                                                {originalAmenity?.image_url ? (
                                                    <img src={originalAmenity.image_url} alt={amenityName} className="w-10 h-10 object-cover rounded-full" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                                        {IconComponent ? <IconComponent size={20} /> : <Star size={20} />}
                                                    </div>
                                                )}
                                                <span className="text-sm font-medium text-gray-700">{amenityName}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Gallery Section */}
                        {project.gallery && project.gallery.length > 0 && (
                            <div className="mb-12">
                                <h3 className="text-2xl font-serif font-bold mb-6 text-secondary">Gallery</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.gallery.map((item, index) => {
                                        const url = typeof item === 'string' ? item : item.url;
                                        const alt = typeof item === 'string' ? `Life Republic Project Image ${index + 1}` : item.alt || `Life Republic - ${project.title} Gallery`;

                                        return (
                                            <div key={index} className="relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                                                <img
                                                    src={url}
                                                    alt={alt}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <h3 className="text-xl font-bold mb-4">Configuration & Pricing</h3>
                            <div className="flex justify-between items-center border-b border-gray-200 py-3">
                                <span className="text-gray-600">Typology</span>
                                <span className="font-semibold">{project.features[0]}</span>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <span className="text-gray-600">Starting Price</span>
                                <span className="font-bold text-lg" style={{ color: themeColor }}>{project.price}</span>
                            </div>
                        </div>

                        {/* Financial Tools Section (New for Engagement) */}
                        <div className="mt-12 mb-16">
                            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-8">Financial Planning Tools</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <EMICalculator />
                                <ROICalculator />
                            </div>
                        </div>

                        {/* Similar Projects Section */}
                        {project.id && (
                            <div className="mt-16">
                                <SimilarProjects currentId={project.id} />
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Contact Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                            <h3 className="text-2xl font-serif font-bold mb-6 text-center">Enquire Now</h3>
                            <ProjectEnquiryForm project={project} themeColor={themeColor} />

                            <div className="mt-8">
                                <p className="text-center text-gray-500 mb-4 text-sm">Or connect instantly via</p>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1 gap-2 border-green-500 text-green-600 hover:bg-green-50" onClick={() => window.open('https://wa.me/917744009295', '_blank')}>
                                        <MessageSquare size={18} /> WhatsApp
                                    </Button>
                                    <Button variant="outline" className="flex-1 gap-2" onClick={() => window.location.href = 'tel:+917744009295'}>
                                        <Phone size={18} /> Call
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <ShareButtons
                                url={`/projects/${project.id}`}
                                title={`Check out ${project.title} at Life Republic`}
                                className="justify-center"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <ImageModal
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                imageSrc={currentImage}
                altText={currentAlt}
            />
        </div>
    );
};

const ProjectEnquiryForm: React.FC<{ project: Project; themeColor: string }> = ({ project, themeColor }) => {
    const [formData, setFormData] = React.useState({
        name: '',
        phone: '',
        email: ''
    });
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.leads.create({
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                project_id: project.id,
                message: `Enquiry from Project Page: ${project.title}`
            });
            alert('Thank you! We will contact you shortly.');
            setFormData({ name: '', phone: '', email: '' });
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    required
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-shadow"
                    style={{ '--tw-ring-color': themeColor } as React.CSSProperties}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                    required
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-shadow"
                    style={{ '--tw-ring-color': themeColor } as React.CSSProperties}
                    placeholder="+91 77440 09295"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-shadow"
                    style={{ '--tw-ring-color': themeColor } as React.CSSProperties}
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            <Button className="w-full" disabled={loading} style={{ backgroundColor: themeColor }}>
                {loading ? 'Submitting...' : 'Request Call Back'}
            </Button>
        </form>
    );
};

export default ProjectDetails;
