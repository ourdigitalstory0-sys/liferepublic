import React from 'react';
import { Link } from 'react-router-dom';
import sectorsData from '../../data/sectors.json';

export const SectorMesh: React.FC = () => {
    return (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mb-12">
                    <h2 className="text-3xl font-serif font-bold text-secondary mb-4">Township Sector Mesh</h2>
                    <p className="text-gray-600">
                        Explore the granular residential and infrastructure layers of Kolte Patil Life Republic. Our 390-acre ecosystem is mapped to provide maximum transparency and search precision for residents and investors.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    {/* Residential Sectors */}
                    <div>
                        <h3 className="font-bold text-accent uppercase tracking-widest text-xs mb-6 px-3 border-l-2 border-accent">Residential Sectors (R)</h3>
                        <ul className="grid grid-cols-2 gap-x-2 gap-y-2">
                            {sectorsData.sectors.map((s) => (
                                <li key={s.id}>
                                    <Link 
                                        to={`/location/${s.slug}`} 
                                        className="block p-3 rounded-xl hover:bg-white hover:shadow-lg hover:shadow-accent/5 group transition-all border border-transparent hover:border-gray-100"
                                    >
                                        <p className="text-gray-500 group-hover:text-secondary text-sm font-medium transition-colors">
                                            {s.name.split('(')[0]}
                                        </p>
                                        <span className="text-[10px] text-gray-300 group-hover:text-accent font-bold uppercase tracking-wider">{s.id} Intelligence</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Avenue Mapping */}
                    <div>
                        <h3 className="font-bold text-accent uppercase tracking-widest text-xs mb-6 px-3 border-l-2 border-accent">Avenue Intelligence</h3>
                        <ul className="grid grid-cols-2 gap-x-2 gap-y-2">
                            {sectorsData.avenues.map((a) => (
                                <li key={a.id}>
                                    <Link 
                                        to={`/location/${a.slug}`} 
                                        className="block p-3 rounded-xl hover:bg-white hover:shadow-lg hover:shadow-accent/5 group transition-all border border-transparent hover:border-gray-100"
                                    >
                                        <p className="text-gray-500 group-hover:text-secondary text-sm font-medium transition-colors">
                                            {a.name}
                                        </p>
                                        <span className="text-[10px] text-gray-300 group-hover:text-accent font-bold uppercase tracking-wider">Infrastructure Layer</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Regional Proximity */}
                    <div className="md:col-span-1 lg:col-span-2">
                        <h3 className="font-bold text-accent uppercase tracking-widest text-xs mb-6 px-3 border-l-2 border-accent">Hinjewadi Growth Localities</h3>
                        <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2">
                            {sectorsData.localities.map((l) => (
                                <li key={l.id}>
                                    <Link 
                                        to={`/location/${l.slug}`} 
                                        className="block p-3 rounded-xl hover:bg-white hover:shadow-lg hover:shadow-accent/5 group transition-all border border-transparent hover:border-gray-100"
                                    >
                                        <p className="text-gray-500 group-hover:text-secondary text-sm font-medium transition-colors">
                                            {l.name}
                                        </p>
                                        <span className="text-[10px] text-gray-300 group-hover:text-accent font-bold uppercase tracking-wider">Contextual Sync</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-200">
                    <p className="text-xs text-gray-400 text-center uppercase tracking-[0.2em]">
                        Sovereign Search Protocol v4.0 • Semantic Internal Linking Mesh • RERA Compliant Township Mapping
                    </p>
                </div>
            </div>
        </section>
    );
};
