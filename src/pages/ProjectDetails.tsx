import React, { useEffect, useState } from 'react';
import { EMICalculator } from '../components/ui/EMICalculator';
import { ROICalculator } from '../components/tools/ROICalculator';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle, ZoomIn, ArrowRight, Building2, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { api } from '../services/api';
import type { Project, Amenity } from '../lib/types';
import { ICON_MAP } from '../lib/icons';
import { SimilarProjects } from '../components/sections/SimilarProjects';
import { DemandHeatmap } from '../components/sections/DemandHeatmap';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ShareButtons } from '../components/ui/ShareButtons';
import { ImageModal } from '../components/ui/ImageModal';
import { generateSemanticKeywords, generateSemanticDescription, generateSemanticTitle } from '../lib/seo-utils';
import { generateProjectSchema, generateFAQSchema, generateImageGallerySchema } from '../utils/schemaGenerator';

import { SectorLinkMesh } from '../components/sections/SectorLinkMesh';

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
    const gallerySchema = generateImageGallerySchema(project);
    const faqSchema = project.faqs ? generateFAQSchema(project.faqs) : null;

    const seoContext = {
        title: project.title,
        category: project.category,
        location: project.location || 'Hinjewadi',
        price: project.price,
        phrase: `Premium ${project.category} near Hinjewadi IT Park Phase 1 & 2`
    };

    const dynamicTitle = generateSemanticTitle(seoContext);
    const dynamicDesc = generateSemanticDescription(seoContext);
    const dynamicKeywords = generateSemanticKeywords(seoContext) + ", flats near hinjewadi phase 1, property in marunji pune, kolte patil life republic " + project.id;

    const [mode, setMode] = useState<'day' | 'night'>('day');

    return (
        <div className={`pt-20 transition-colors duration-1000 ${mode === 'night' ? 'bg-[#05070a] text-white' : 'bg-white text-gray-900'}`}>
            <Breadcrumbs />
            <SEO
                title={dynamicTitle}
                description={dynamicDesc}
                keywords={dynamicKeywords}
                image={project.image}
                canonical={`/projects/${project.id}`}
                schema={[
                    ...(Array.isArray(projectSchema) ? projectSchema : [projectSchema]), 
                    gallerySchema,
                    ...(faqSchema ? [faqSchema] : [])
                ]}
            />
            {/* Project Hero with Atmospheric Shift */}
            <section className="relative h-[70vh] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={project.image}
                            alt={`Kolte Patil Life Republic ${project.title}`}
                            className={`w-full h-full object-cover transition-all duration-1000 ${mode === 'night' ? 'brightness-[0.4] saturate-[0.8] contrast-[1.2]' : 'brightness-100'}`}
                        />
                        <div className={`absolute inset-0 transition-all duration-1000 ${
                            mode === 'night' 
                                ? 'bg-gradient-to-t from-[#05070a] via-indigo-950/40 to-transparent' 
                                : 'bg-black/40'
                        }`}></div>
                    </motion.div>
                </AnimatePresence>

                {/* Atmosphere Toggle */}
                <div className="absolute top-10 right-10 z-20">
                    <button 
                        onClick={() => setMode(mode === 'day' ? 'night' : 'day')}
                        className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all group"
                    >
                        {mode === 'day' ? (
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Night Life</span>
                                <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Daylight View</span>
                                <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                            </div>
                        )}
                    </button>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span
                                className="px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6 inline-block shadow-2xl border border-white/20 backdrop-blur-md"
                                style={{ backgroundColor: themeColor }}
                            >
                                {project.category} Masterpiece
                            </span>
                            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 text-shadow-2xl leading-tight">
                                {project.title}
                            </h1>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-lg font-medium">
                                <p className="flex items-center gap-2">
                                    <MapPin size={24} style={{ color: themeColor }} /> {project.location || 'Life Republic, Hinjewadi'}
                                </p>
                                <span className="hidden md:block w-1.5 h-1.5 bg-white/30 rounded-full"></span>
                                <p className="text-white/80">390-Acre Ecosystem</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="py-16">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-serif font-bold mb-6 text-secondary">Project Overview & Connectivity to Hinjewadi IT Park</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            {project.description}
                        </p>

                        <h3 className="text-2xl font-serif font-bold mb-6 text-secondary">Key Features & Global Amenities</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                            {project.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                                    <CheckCircle size={24} style={{ color: themeColor }} />
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* Master Layout & Blueprint Viewer v6.5 */}
                        {project.masterLayout && (
                            <section className="mb-20">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 bg-secondary text-accent rounded-2xl flex items-center justify-center shadow-lg">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Sovereign Synthesis</span>
                                        <h3 className="text-3xl font-serif font-bold text-secondary">Master Blueprint.</h3>
                                    </div>
                                </div>
                                
                                <motion.div 
                                    whileHover={{ scale: 1.01 }}
                                    className="relative rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl group cursor-zoom-in"
                                    onClick={() => openLightbox(project.masterLayout!, `${project.title} - Master Plan`)}
                                >
                                    <img
                                        src={project.masterLayout}
                                        alt={`${project.title} Master Layout`}
                                        className="w-full h-auto object-contain min-h-[400px]"
                                    />
                                    <div className="absolute inset-0 bg-secondary/5 group-hover:bg-secondary/0 transition-all duration-700"></div>
                                    <div className="absolute bottom-10 right-10 flex items-center gap-4 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                        <ZoomIn size={18} className="text-secondary" />
                                        <span className="text-sm font-bold text-secondary">Expand Blueprint</span>
                                    </div>
                                </motion.div>
                                <p className="mt-6 text-sm text-gray-400 font-medium italic text-center">
                                    390-Acre Master Development Plan synchronized with 2026 infrastructure milestones.
                                </p>
                            </section>
                        )}

                        {/* Structured Floor Plans v6.5 */}
                        {project.floorPlans && project.floorPlans.length > 0 && (
                            <section className="mb-20">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 bg-secondary text-accent rounded-2xl flex items-center justify-center shadow-lg">
                                        <Building2 size={24} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Spatial Synthesis</span>
                                        <h3 className="text-3xl font-serif font-bold text-secondary">Unit Floor Plans.</h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {project.floorPlans.map((plan, idx) => (
                                        <motion.div 
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-xl hover:shadow-2xl transition-all group"
                                        >
                                            <div 
                                                className="relative aspect-square bg-gray-50 p-8 cursor-zoom-in overflow-hidden"
                                                onClick={() => openLightbox(plan.image, `${project.title} - ${plan.type}`)}
                                            >
                                                <img src={plan.image} alt={plan.type} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                                                <div className="absolute top-6 left-6 px-4 py-2 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-lg">
                                                    {plan.size}
                                                </div>
                                            </div>
                                            <div className="p-8">
                                                <h4 className="text-xl font-bold text-secondary mb-4">{plan.type}</h4>
                                                <ul className="space-y-3">
                                                    {plan.details?.map((detail, dIdx) => (
                                                        <li key={dIdx} className="flex items-start gap-3 text-sm text-gray-500 font-medium">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shadow-[0_0_8px_var(--accent)]"></div>
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Structural Specifications v6.5 */}
                        {project.specifications && project.specifications.length > 0 && (
                            <section className="mb-20">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 bg-secondary text-accent rounded-2xl flex items-center justify-center shadow-lg">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Material Integrity</span>
                                        <h3 className="text-3xl font-serif font-bold text-secondary">Technical Specifications.</h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {project.specifications.map((spec, sIdx) => (
                                        <div key={sIdx} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                                            <h4 className="text-sm font-bold text-accent uppercase tracking-[0.4em] mb-6 border-b border-accent/20 pb-4 group-hover:border-accent transition-colors">
                                                {spec.title}
                                            </h4>
                                            <ul className="space-y-4">
                                                {spec.items.map((item, iIdx) => (
                                                    <li key={iIdx} className="flex items-start gap-4 text-base text-gray-600 font-medium">
                                                        <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Amenities Section v6.5 */}
                        {project.amenities && project.amenities.length > 0 && (
                            <div className="mb-20">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 bg-secondary text-accent rounded-2xl flex items-center justify-center shadow-lg">
                                        <Sparkles size={24} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Tectonic Velocity</span>
                                        <h3 className="text-3xl font-serif font-bold text-secondary">Lifestyle Curations.</h3>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {project.amenities.map((amenityName, index) => {
                                        const originalAmenity = globalAmenities.find(a => a.title === amenityName);
                                        const IconComponent = originalAmenity?.icon ? ICON_MAP[originalAmenity.icon] : Star;
                                        return (
                                            <motion.div 
                                                key={index} 
                                                whileHover={{ y: -5 }}
                                                className="flex flex-col items-center justify-center p-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 text-center gap-4 hover:border-accent hover:shadow-2xl transition-all"
                                            >
                                                <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all shadow-inner">
                                                    {IconComponent ? <IconComponent size={32} strokeWidth={1.5} /> : <Star size={32} />}
                                                </div>
                                                <span className="text-sm font-bold text-secondary uppercase tracking-tighter leading-tight">{amenityName}</span>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Township Guide Nudge Banner */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="mb-16 bg-gradient-to-br from-secondary to-gray-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-white/5"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="max-w-xl text-center md:text-left">
                                    <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">Sovereign Perspective</span>
                                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">New to the Life Republic Ecosystem?</h2>
                                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                        Before choosing your cluster, understand the bigger picture. Read our <strong>Ultimate Township Guide</strong> to explore internal infrastructure, global schools, and the 2026 ROI roadmap.
                                    </p>
                                </div>
                                <Link to="/township-guide">
                                    <Button variant="primary" size="lg" className="rounded-full px-10 bg-accent hover:bg-white hover:text-accent border-none shadow-xl transition-all whitespace-nowrap">
                                        Access Guide <ArrowRight size={18} className="ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Gallery Section */}
                        {project.gallery && project.gallery.length > 0 && (
                            <div className="mb-12">
                                <div className="flex justify-between items-end mb-6">
                                    <h3 className="text-2xl font-serif font-bold text-secondary">Gallery & Construction Photos</h3>
                                    <button 
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge'))}
                                        className="text-accent text-xs font-bold uppercase tracking-widest border-b border-accent/20 hover:border-accent transition-all pb-1 mb-1"
                                    >
                                        Request Latest Site Photos
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.gallery.map((item, index) => {
                                        const url = typeof item === 'string' ? item : item.url;
                                        const alt = typeof item === 'string' ? `Life Republic Project Image ${index + 1}` : item.alt || `Life Republic - ${project.title} Gallery`;

                                        return (
                                            <div key={index} className="relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                                                <img
                                                    src={url}
                                                    alt={`${alt} - Near IT Park Hinjewadi Pune`}
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
                                <EMICalculator 
                                    basePrice={parseInt(project.price.replace(/[^\d]/g, '')) * (project.price.toLowerCase().includes('crore') || project.price.toLowerCase().includes('cr') ? 10000000 : 100000)} 
                                    projectName={project.title}
                                />
                                <ROICalculator />
                            </div>
                        </div>

                        {/* FAQ Section */}
                        {project.faqs && project.faqs.length > 0 && (
                            <div className="mt-16 border-t border-gray-100 pt-16">
                                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
                                <div className="space-y-4">
                                    {project.faqs.map((faq, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-gray-50 p-6 rounded-2xl border border-gray-200"
                                        >
                                            <h3 className="text-lg font-bold text-secondary mb-2">{faq.question}</h3>
                                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-16">
                            <SectorLinkMesh />
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
                        </div>

                        <div className="mt-8">
                            <DemandHeatmap />
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
                    placeholder="Enter your mobile number"
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
