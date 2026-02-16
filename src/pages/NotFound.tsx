import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SEO } from '../components/seo/SEO';
import { Search, Home, Phone } from 'lucide-react';

export const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />
            <SEO
                title="Page Not Found | Kolte Patil Life Republic"
                description="The page you are looking for does not exist. Explore our luxury 2, 3, 4 BHK flats and villas in Hinjewadi."
                keywords="404 error, page not found, life republic hinjewadi"
                canonical="/404"
            />
            <main className="flex-grow pt-32 pb-20 px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
                    <h2 className="text-3xl font-serif font-bold text-secondary mb-6">Oops! We can't find that page.</h2>
                    <p className="text-gray-600 mb-10 text-lg">
                        It seems you've wandered off the map. But don't worry, finding your dream home is easier than finding this page.
                    </p>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">What were you looking for?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link to="/" className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-accent/10 hover:text-accent transition-colors group">
                                <Home className="w-8 h-8 mb-2 text-gray-400 group-hover:text-accent" />
                                <span className="font-semibold">Homepage</span>
                            </Link>
                            <Link to="/projects" className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-accent/10 hover:text-accent transition-colors group">
                                <Search className="w-8 h-8 mb-2 text-gray-400 group-hover:text-accent" />
                                <span className="font-semibold">Browse Projects</span>
                            </Link>
                            <Link to="/contact" className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-accent/10 hover:text-accent transition-colors group">
                                <Phone className="w-8 h-8 mb-2 text-gray-400 group-hover:text-accent" />
                                <span className="font-semibold">Contact Us</span>
                            </Link>
                        </div>
                    </div>

                    <div className="text-sm text-gray-500">
                        Top Searches: <Link to="/2-bhk-flats-in-hinjewadi" className="underline hover:text-accent">2 BHK Flats</Link>, <Link to="/nri-corner" className="underline hover:text-accent">NRI Investment</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
