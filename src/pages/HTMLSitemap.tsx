import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { projectsRegistry as projects } from '../data/projects';
import { ID_TO_SLUG } from '../data/slug-registry';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../lib/types';

const pseoRegistry: Record<string, { title: string }> = {
    'flats-in-hinjewadi-phase-1': { title: 'Premium Flats in Hinjewadi Phase 1 | Life Republic' },
    'apartments-near-rajiv-gandhi-it-park': { title: 'Apartments near Rajiv Gandhi IT Park | Life Republic' },
    'luxury-homes-in-pune-west': { title: 'Luxury Homes in Pune West | Life Republic' },
    'ready-possession-flats-in-hinjewadi': { title: 'Ready Possession Flats in Hinjewadi | Life Republic' },
    'affordable-housing-hinjewadi': { title: 'Affordable Housing in Hinjewadi | Life Republic' },
    'gated-community-pune': { title: 'Gated Community Pune | Life Republic' },
    'residential-projects-near-wakad': { title: 'Residential Projects near Wakad | Life Republic' },
    'investment-properties-pune': { title: 'Investment Properties Pune | Life Republic' }
};

const pseoSlugs = Object.keys(pseoRegistry);

export const HTMLSitemap: React.FC = () => {
    const [posts, setPosts] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase.from('posts').select('slug, title').eq('published', true);
            if (data) setPosts(data);
        };
        fetchPosts();
    }, []);

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
                        <h2 className="text-xl font-bold text-secondary border-b border-gray-200 pb-2 mb-4 uppercase tracking-widest text-[10px]">Main Navigation</h2>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-gray-600 hover:text-accent transition-colors font-medium">Home</Link></li>
                            <li><Link to="/about" className="text-gray-600 hover:text-accent transition-colors font-medium">About Us</Link></li>
                            <li><Link to="/projects" className="text-gray-600 hover:text-accent transition-colors font-medium">All Projects</Link></li>
                            <li><Link to="/amenities" className="text-gray-600 hover:text-accent transition-colors font-medium">Township Amenities</Link></li>
                            <li><Link to="/location" className="text-gray-600 hover:text-accent transition-colors font-medium">Location Highlights</Link></li>
                            <li><Link to="/contact" className="text-gray-600 hover:text-accent transition-colors font-medium">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Township Resources */}
                    <div>
                        <h2 className="text-xl font-bold text-secondary border-b border-gray-200 pb-2 mb-4 uppercase tracking-widest text-[10px]">Resources & Guides</h2>
                        <ul className="space-y-3">
                            <li><Link to="/township-guide" className="text-gray-600 hover:text-accent transition-colors font-medium">Ultimate Township Guide</Link></li>
                            <li><Link to="/township-intelligence" className="text-gray-600 hover:text-accent transition-colors font-medium">Township Intelligence</Link></li>
                            <li><Link to="/nri-corner" className="text-gray-600 hover:text-accent transition-colors font-medium">NRI Corner</Link></li>
                            <li><Link to="/nri-investment-guide" className="text-gray-600 hover:text-accent transition-colors font-medium">NRI Investment Guide</Link></li>
                            <li><Link to="/connectivity" className="text-gray-600 hover:text-accent transition-colors font-medium">Connectivity Hub</Link></li>
                            <li><Link to="/lifestyle" className="text-gray-600 hover:text-accent transition-colors font-medium">Life at Life Republic</Link></li>
                            <li><Link to="/sustainability" className="text-gray-600 hover:text-accent transition-colors font-medium">Sustainability</Link></li>
                            <li><Link to="/community-hub" className="text-gray-600 hover:text-accent transition-colors font-medium">Community Hub</Link></li>
                            <li><Link to="/testimonials" className="text-gray-600 hover:text-accent transition-colors font-medium">Resident Reviews</Link></li>
                        </ul>
                    </div>

                    {/* Project Portfolio */}
                    <div>
                        <h2 className="text-xl font-bold text-secondary border-b border-gray-200 pb-2 mb-4 uppercase tracking-widest text-[10px]">Property Portfolio</h2>
                        <ul className="space-y-3">
                            {projects.map(p => (
                                <li key={p.id}>
                                    <Link to={`/projects/${ID_TO_SLUG[p.id] || p.id}`} className="text-gray-600 hover:text-accent transition-colors text-sm font-medium">
                                        {p.title.split('|')[0]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Property Configurations */}
                    <div>
                        <h2 className="text-xl font-bold text-secondary border-b border-gray-200 pb-2 mb-4 uppercase tracking-widest text-[10px]">By Configuration</h2>
                        <ul className="space-y-3">
                            <li><Link to="/1-bhk-flats-in-hinjewadi" className="text-gray-600 hover:text-accent transition-colors font-medium">1 BHK Flats</Link></li>
                            <li><Link to="/2-bhk-flats-in-hinjewadi" className="text-gray-600 hover:text-accent transition-colors font-medium">2 BHK Flats</Link></li>
                            <li><Link to="/3-bhk-flats-in-hinjewadi" className="text-gray-600 hover:text-accent transition-colors font-medium">3 BHK Flats</Link></li>
                            <li><Link to="/4-bhk-flats-in-hinjewadi" className="text-gray-600 hover:text-accent transition-colors font-medium">4 BHK Luxury Flats</Link></li>
                            <li><Link to="/row-houses-in-life-republic" className="text-gray-600 hover:text-accent transition-colors font-medium">Row Houses</Link></li>
                            <li><Link to="/luxury-villas-near-hinjewadi" className="text-gray-600 hover:text-accent transition-colors font-medium">Luxury Villas</Link></li>
                            <li><Link to="/plots-in-hinjewadi" className="text-gray-600 hover:text-accent transition-colors font-medium">Plots</Link></li>
                        </ul>
                    </div>

                    {/* Media Center */}
                    <div>
                        <h2 className="text-xl font-bold text-secondary border-b border-gray-200 pb-2 mb-4 uppercase tracking-widest text-[10px]">Media Center</h2>
                        <ul className="space-y-3">
                            <li><Link to="/media-center" className="text-gray-600 hover:text-accent transition-colors font-medium">Latest News & Press</Link></li>
                            {posts.map(post => (
                                <li key={post.slug}>
                                    <Link to={`/media-center/${post.slug}`} className="text-gray-600 hover:text-accent transition-colors text-xs font-medium line-clamp-1">
                                        {post.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Policy */}
                    <div>
                        <h2 className="text-xl font-bold text-secondary border-b border-gray-200 pb-2 mb-4 uppercase tracking-widest text-[10px]">Legal</h2>
                        <ul className="space-y-3">
                            <li><Link to="/privacy" className="text-gray-600 hover:text-accent transition-colors font-medium">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-gray-600 hover:text-accent transition-colors font-medium">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Popular Location Searches (SEO Silo) */}
                    <div className="md:col-span-2 lg:col-span-3">
                        <h2 className="text-xl font-bold text-secondary border-b border-gray-200 pb-2 mb-4 mt-8 uppercase tracking-widest text-[10px]">Popular Location Searches</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {pseoSlugs.map(slug => (
                                <Link 
                                    key={slug} 
                                    to={`/location/${slug}`} 
                                    className="text-xs text-gray-500 hover:text-accent transition-colors block truncate font-medium"
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
