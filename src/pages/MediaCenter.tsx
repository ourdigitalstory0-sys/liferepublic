import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Calendar, ArrowRight, Play, Newspaper, Zap, Sparkles, Building2, TrendingUp, Globe, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ShareButtons } from '../components/ui/ShareButtons';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../lib/types';
import localBlogs from '../data/blogs.json';

export const MediaCenter: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('published', true)
                    .order('published_at', { ascending: false });

                if (error || !data || data.length === 0) {
                    console.log('Falling back to highly optimized local SEO blogs');
                    setPosts(localBlogs as any);
                } else {
                    // Combine DB posts with local SEO posts
                    setPosts([...data, ...localBlogs] as any);
                }
            } catch (err: any) {
                console.error('Error fetching posts:', err.message);
                setPosts(localBlogs as any);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white">
            <SEO
                title="Sovereign Media Center | Press & Milestones | Life Republic"
                description="Access the Life Republic Media Center. 2026 construction updates, architectural monographs, and resident stories from Pune's 390-acre township."
                keywords="Life Republic News, Construction Updates Hinjewadi, Hinjewadi Metro Update 2026, Kolte Patil Life Republic Blog"
                canonical="/media-center"
            />

            {/* Sovereign Hero */}
            <section className="relative pt-40 pb-32 bg-secondary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-secondary z-10"></div>
                <div className="absolute inset-0 bg-[url('/images/aerial-sunset.png')] bg-cover bg-center opacity-30 grayscale blur-[2px]"></div>
                
                <div className="container mx-auto px-4 relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="inline-flex items-center gap-4 px-6 py-3 bg-accent/20 border border-accent/30 rounded-full mb-12 backdrop-blur-xl">
                            <Newspaper size={16} className="text-accent" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">Sovereign Archive v5.5</span>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-serif font-bold text-white mb-10 tracking-tighter leading-none">
                            The Media <br /> <span className="text-accent italic text-7xl md:text-[10rem]">Nexus.</span>
                        </h1>
                        <p className="text-2xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
                            Synthesizing the structural evolution of Pune's premier township. Access the definitive monograph of our 2026 Hinjewadi transformation.
                        </p>
                    </motion.div>
                </div>

                {/* Sovereign News Ticker */}
                <div className="absolute bottom-0 left-0 w-full bg-white/5 backdrop-blur-3xl border-t border-white/5 py-6 z-20 overflow-hidden">
                    <div className="flex animate-marquee whitespace-nowrap">
                        {[
                            "METRO LINE 3: Ph 3 Structural Synthesis at 92% Completion",
                            "SPINE ROAD: 150ft High-Velocity Backbone Fully Operational",
                            "ATMOS CLUSTER: Final Structural Milestone Targeted for Q4 2025",
                            "LIFE REPUBLIC: 12,000+ Citizens Now Part of the Monograph",
                            "QRIOUS SMART HOMES: Neural Integration Phase 1 Commencing"
                        ].map((news, i) => (
                            <span key={`news-ticker-${i}`} className="text-[11px] font-bold text-accent uppercase tracking-[0.4em] mx-16 flex items-center gap-4 group">
                                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div> {news}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-32 bg-gray-50/30">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8 border-b border-gray-100 pb-12">
                        <div className="max-w-2xl">
                            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] mb-4 block">Feed</span>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary tracking-tighter">Architectural Insights.</h2>
                        </div>
                        <div className="flex gap-6">
                            {[
                                { label: 'Press Releases', icon: Globe },
                                { label: 'Construction', icon: Building2 },
                                { label: 'Market ROI', icon: TrendingUp }
                            ].map((tab, i) => (
                                <button key={i} className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-secondary hover:border-accent transition-all shadow-sm">
                                    <tab.icon size={14} className="text-accent" /> {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-40">
                            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-40">
                            <ShieldCheck size={48} className="text-red-400 mx-auto mb-6" />
                            <p className="text-secondary font-bold text-xl font-serif">{error}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                            {posts.map((post, idx) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all group flex flex-col"
                                >
                                    <Link to={`/media-center/${post.slug}`} className="relative block h-80 overflow-hidden bg-gray-200">
                                        <div className="absolute inset-0 bg-secondary/30 group-hover:bg-transparent transition-all z-10"></div>
                                        <img loading="lazy"
                                            src={post.image || '/images/aerial-sunset.png'}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute bottom-8 left-8 flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 text-white z-20">
                                            <Play size={16} fill="currentColor" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">View Monograph</span>
                                        </div>
                                    </Link>
                                    
                                    <div className="p-12 flex flex-col flex-grow">
                                        <div className="flex items-center gap-3 text-[10px] font-bold text-accent uppercase tracking-[0.4em] mb-6">
                                            <Calendar size={12} />
                                            {formatDate(post.published_at || post.created_at)}
                                        </div>
                                        <Link to={`/media-center/${post.slug}`}>
                                            <h2 className="text-3xl font-serif font-bold mb-6 text-secondary line-clamp-2 hover:text-accent transition-colors leading-tight tracking-tighter">{post.title}</h2>
                                        </Link>
                                        <p className="text-gray-500 mb-10 flex-grow line-clamp-3 font-medium leading-relaxed text-lg">{post.excerpt || post.content.substring(0, 150)}...</p>
                                        
                                        <div className="flex items-center justify-between pt-10 border-t border-gray-100">
                                            <Link to={`/media-center/${post.slug}`}>
                                                <button className="flex items-center gap-3 text-[10px] font-bold text-secondary uppercase tracking-[0.4em] group/btn">
                                                    Read Full Thesis 
                                                    <ArrowRight size={16} className="text-accent group-hover/btn:translate-x-2 transition-transform" />
                                                </button>
                                            </Link>
                                            <ShareButtons
                                                url={`/media-center/${post.slug}`}
                                                title={post.title}
                                            />
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-4">
                    <div className="bg-secondary rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative z-10"
                        >
                            <Sparkles size={64} className="text-accent mx-auto mb-10 animate-pulse" />
                            <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-10 tracking-tighter">Subscribe to the <br /><span className="text-accent italic">Sovereign Pulse.</span></h2>
                            <p className="text-gray-400 text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
                                Join 12,000+ citizens and investors. Receive direct architectural insights and 2026 infrastructure synthesis once a month.
                            </p>
                            <div className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto">
                                <input type="email" placeholder="Sovereign Email Address" className="flex-1 bg-white/5 border border-white/10 rounded-full px-10 py-6 text-white placeholder-gray-500 focus:outline-none focus:border-accent font-bold text-lg" />
                                <button className="bg-accent text-secondary px-16 py-6 rounded-full font-bold text-lg hover:bg-white hover:text-secondary transition-all shadow-xl shadow-accent/20">
                                    Join the Nexus
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};
