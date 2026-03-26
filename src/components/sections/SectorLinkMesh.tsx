import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Globe, MapPin, Building2 } from 'lucide-react';
import sectorsData from '../../data/sectors.json';

export const SectorLinkMesh: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // Filter out current page and limit results
    const relatedSectors = sectorsData.sectors
        .filter(s => !currentPath.includes(s.slug))
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    const relatedAvenues = sectorsData.avenues
        .filter(a => !currentPath.includes(a.slug))
        .slice(0, 3);

    const relatedLocalities = sectorsData.localities
        .filter(l => !currentPath.includes(l.slug))
        .slice(0, 3);

    return (
        <section className="py-16 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white">
                        <Globe size={20} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-secondary">Township Connectivity Mesh</h2>
                        <p className="text-gray-500 text-sm">Explore specialized residential sectors and infrastructure hubs.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Residential Clusters */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs">
                            <Building2 size={14} /> Residential Clusters
                        </div>
                        <div className="flex flex-col gap-3">
                            {relatedSectors.map(sector => (
                                <Link 
                                    key={sector.id} 
                                    to={`/location/${sector.slug}`}
                                    className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-accent hover:shadow-md transition-all"
                                >
                                    <span className="text-sm font-medium text-secondary group-hover:text-accent">{sector.name}</span>
                                    <ChevronRight size={16} className="text-gray-300 group-hover:text-accent transform group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Township Avenues */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs">
                            <MapPin size={14} /> Township Avenues
                        </div>
                        <div className="flex flex-col gap-3">
                            {relatedAvenues.map(ave => (
                                <Link 
                                    key={ave.id} 
                                    to={`/location/${ave.slug}`}
                                    className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-accent hover:shadow-md transition-all"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-secondary group-hover:text-accent">{ave.name}</span>
                                        <span className="text-[10px] text-gray-400">{ave.infrastructure}</span>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-300 group-hover:text-accent transform group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Regional Connectivity */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs">
                            <Globe size={14} /> Regional Hubs
                        </div>
                        <div className="flex flex-col gap-3">
                            {relatedLocalities.map(loc => (
                                <Link 
                                    key={loc.id} 
                                    to={`/location/${loc.slug}`}
                                    className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-accent hover:shadow-md transition-all"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-secondary group-hover:text-accent">{loc.name}</span>
                                        <span className="text-[10px] text-gray-400">{loc.distance}</span>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-300 group-hover:text-accent transform group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 p-6 bg-secondary rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h4 className="font-bold text-lg">Looking for specialized ROI analysis?</h4>
                        <p className="text-white/60 text-sm">Download our 2025 Hinjewadi Infrastructure appreciation report.</p>
                    </div>
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-sovereign-concierge'))}
                        className="px-8 py-3 bg-accent text-white rounded-full font-bold hover:bg-white hover:text-secondary transition-all"
                    >
                        Get Expert Analysis
                    </button>
                </div>
            </div>
        </section>
    );
};
