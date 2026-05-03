import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { pseoSlugs, pseoRegistry } from '../data/pseo-registry';
import { projectsRegistry as projects } from '../data/projects';

export const HTMLSitemap: React.FC = () => {
    return (
        <div className="pt-20 pb-24 bg-gray-50 min-h-screen">
            <Breadcrumbs />
            <SEO
                title="Sitemap | Kolte Patil Life Republic Hinjewadi Pune"
                description="Navigate through all projects, locations, and property configurations available at Kolte Patil Life Republic Township, Hinjewadi, Pune."
                canonical="/sitemap"
            />

            <div className="container mx-auto px-4 mt-12">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-12">Site Directory</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    
                    {/* Core Pages */}
                    <div>
                        <h2 className="text-xl font-bold text-secondary border-b border-gray-200 pb-2 mb-4">Main Navigation</h2>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-gray-600 hover:text-accent transition-colors">Home</Link></li>
                            <li><Link to="/about" className="text-gray-600 hover:text-accent transition-colors">About Us</Link></li>
                            <li><Link to="/projects" className="text-gray-600 hover:text-accent transition-colors">All Projects</Link></li>
                            <li><Link to="/amenities" className="text-gray-600 hover:text-accent transition-colors">Township Amenities</Link></li>
                            <li><Link to="/location" className="text-gray-600 hover:text-accent transition-colors">Location Highlights</Link></li>
                            <li><Link to="/contact" className="text-gray-600 hover:text-accent transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Township Resources */}
                    <div>
                        <h2 className="text-xl font-bold text-secondary border-b border-gray-200 pb-2 mb-4">Resources & Guides</h2>
                        <ul className="space-y-3">
                            <li><Link to="/township-guide" className="text-gray-600 hover:text-accent transition-colors">Ultimate Township Guide</Link></li>
                            <li><Link to="/township-intelligence" className="text-gray-600 hover:text-accent transition-colors">Township Intelligence</Link></li>
                            <li><Link to="/nri-corner" className="text-gray-600 hover:text-accent transition-colors">NRI Corner</Link></li>
                            <li><Link to="/nri-investment-guide" className="text-gray-600 hover:text-accent transition-colors">NRI Investment Guide</Link></li>
                            <li><Link to="/connectivity" className="text-gray-600 hover:text-accent transition-colors">Connectivity Hub</Link></li>
                            <li><Link to="/lifestyle" className="text-gray-600 hover:text-accent transition-colors">Life at Life Republic</Link></li>
                            <li><Link to="/sustainability" className="text-gray-600 hover:text-accent transition-colors">Sustainability</Link></li>
                            <li><Link to="/community-hub" className="text-gray-600 hover:text-accent transition-colors">Community Hub</Link></li>
                            <li><Link to="/testimonials" className="text-gray-600 hover:text-accent transition-colors">Resident Reviews</Link></li>
                        </ul>
                    </div>

                    {/* Project Portfolio */}
                    <div>
                        <h2 className="text-xl font-bold text-secondary border-b border-gray-200 pb-2 mb-4">Property Portfolio</h2>
                        <ul className="space-y-3">
                            {projects.map(p => (
                                <li key={p.id}>
                                    <Link to={`/projects/${p.id}`} className="text-gray-600 hover:text-accent transition-colors text-sm">
                                        {p.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Property Configurations */}
                    <div>
                        <h2 className="text-xl font-bold text-secondary border-b border-gray-200 pb-2 mb-4">By Configuration</h2>
                        <ul className="space-y-3">
                            <li><Link to="/1-bhk-flats-in-hinjewadi" className="text-gray-600 hover:text-accent transition-colors">1 BHK Flats</Link></li>
                            <li><Link to="/2-bhk-flats-in-hinjewadi" className="text-gray-600 hover:text-accent transition-colors">2 BHK Flats</Link></li>
                            <li><Link to="/3-bhk-flats-in-hinjewadi" className="text-gray-600 hover:text-accent transition-colors">3 BHK Flats</Link></li>
                            <li><Link to="/4-bhk-flats-in-hinjewadi" className="text-gray-600 hover:text-accent transition-colors">4 BHK Luxury Flats</Link></li>
                            <li><Link to="/row-houses-in-life-republic" className="text-gray-600 hover:text-accent transition-colors">Row Houses</Link></li>
                            <li><Link to="/luxury-villas-near-hinjewadi" className="text-gray-600 hover:text-accent transition-colors">Luxury Villas</Link></li>
                            <li><Link to="/plots-in-hinjewadi" className="text-gray-600 hover:text-accent transition-colors">Plots</Link></li>
                        </ul>
                    </div>

                    {/* Legal & Policy */}
                    <div>
                        <h2 className="text-xl font-bold text-secondary border-b border-gray-200 pb-2 mb-4">Legal</h2>
                        <ul className="space-y-3">
                            <li><Link to="/privacy" className="text-gray-600 hover:text-accent transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-gray-600 hover:text-accent transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Popular Location Searches (SEO Silo) */}
                    <div className="md:col-span-2 lg:col-span-3">
                        <h2 className="text-xl font-bold text-secondary border-b border-gray-200 pb-2 mb-4 mt-8">Popular Location Searches</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {pseoSlugs.map(slug => (
                                <Link 
                                    key={slug} 
                                    to={`/location/${slug}`} 
                                    className="text-xs text-gray-500 hover:text-accent transition-colors block truncate"
                                    title={pseoRegistry[slug].title}
                                >
                                    {pseoRegistry[slug].title.split('|')[0]}
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HTMLSitemap;
