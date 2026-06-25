import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Calendar, ArrowLeft, User, Clock, Share2, Sparkles, Target, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ShareButtons } from '../components/ui/ShareButtons';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../lib/types';
import { motion } from 'framer-motion';
import localBlogs from '../data/blogs.json';

export const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [related, setRelated] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return;

            try {
                // Fetch Main Post
                let postData;
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error || !data) {
                    // Fallback to local SEO blogs
                    const localPost = localBlogs.find(b => b.slug === slug);
                    if (localPost) {
                        postData = localPost;
                    } else {
                        throw new Error('Post not found locally or in DB');
                    }
                } else {
                    postData = data;
                }
                
                setPost(postData as any);

                // Fetch Related Posts
                const { data: relatedData } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('published', true)
                    .neq('id', postData.id)
                    .limit(3);
                
                if (!relatedData || relatedData.length === 0) {
                    const localRelated = localBlogs.filter(b => b.slug !== slug).slice(0, 3);
                    setRelated(localRelated as any);
                } else {
                    setRelated(relatedData as any);
                }

            } catch (err: any) {
                console.error('Error fetching post:', err.message);
                setError('Failed to load post. It may have been removed or does not exist.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-serif font-bold text-secondary mb-4">Article Displaced</h1>
                <p className="text-gray-500 mb-8 max-w-md">{error || "The requested insights could not be retrieved from the Sovereign Archive."}</p>
                <Link to="/media-center">
                    <Button variant="primary" className="rounded-full px-8">Return to Media Center</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <SEO
                title={`${post.title} | Sovereign Insights | Life Republic`}
                description={post.meta_description || post.excerpt || post.content.substring(0, 160)}
                keywords={post.tags?.join(', ') || 'life republic, real estate blog, hinjewadi real estate'}
                canonical={`/media-center/${post.slug}`}
                image={post.image}
            />

            {/* Editorial Header */}
            <header className="relative pt-32 pb-20 bg-secondary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-secondary z-10"></div>
                {post.image && (
                    <motion.div 
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.3 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0"
                    >
                        <img loading="lazy" src={post.image} alt={post.title} className="w-full h-full object-cover grayscale" />
                    </motion.div>
                )}
                
                <div className="container mx-auto px-4 relative z-20">
                    <div className="max-w-4xl mx-auto">
                        <Link to="/media-center" className="inline-flex items-center text-accent hover:text-white mb-12 transition-colors group">
                            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Media Center
                        </Link>
                        
                        <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-accent/80 mb-8">
                            <span className="flex items-center gap-2"><Calendar size={14} /> {formatDate(post.published_at || post.created_at)}</span>
                            <span className="flex items-center gap-2"><User size={14} /> {post.author || 'Sovereign Editor'}</span>
                            <span className="flex items-center gap-2"><Clock size={14} /> {Math.ceil(post.content.length / 1000)} MIN READ</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-12 leading-tight tracking-tighter">
                            {post.title}
                        </h1>

                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                                {post.tags.map(tag => (
                                    <span key={tag} className="bg-white/10 backdrop-blur-md text-white/70 border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <article className="relative bg-white -mt-12 rounded-t-[4rem] z-30 shadow-2xl">
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <div className="prose prose-xl max-w-none prose-headings:font-serif prose-headings:text-secondary prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-accent prose-strong:text-secondary prose-img:rounded-[2rem] prose-img:shadow-2xl font-medium">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>

                    <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-secondary text-accent rounded-full flex items-center justify-center">
                                <Target size={24} />
                            </div>
                            <div>
                                <p className="text-secondary font-bold">Life Republic Media Desk</p>
                                <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">Sovereign Publication</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Share Synthesis</span>
                            <ShareButtons
                                url={`/media-center/${post.slug}`}
                                title={post.title}
                            />
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Insights */}
            {related.length > 0 && (
                <section className="py-24 bg-gray-50/50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] mb-4 block text-center md:text-left">Complementary Synthesis</span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary mb-12 text-center md:text-left">Related <span className="text-accent italic">Sovereign Insights.</span></h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {related.map((item, idx) => (
                                    <Link key={item.id} to={`/media-center/${item.slug}`} className="group">
                                        <div className="bg-white rounded-[2rem] border border-gray-100 p-8 h-full flex flex-col hover:border-accent transition-all hover:shadow-xl hover:shadow-accent/5">
                                            <div className="text-[9px] font-bold text-accent uppercase tracking-widest mb-4">{formatDate(item.published_at)}</div>
                                            <h3 className="text-lg font-serif font-bold text-secondary mb-4 line-clamp-2 group-hover:text-accent transition-colors">{item.title}</h3>
                                            <div className="mt-auto flex items-center gap-2 text-[9px] font-bold text-secondary uppercase tracking-[0.2em]">
                                                View Article <ChevronRight size={14} />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Final CTA */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto bg-secondary rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
                        <Sparkles size={48} className="text-accent mx-auto mb-8 animate-pulse" />
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Deepen Your <span className="text-accent italic">Sovereign Knowledge.</span></h2>
                        <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">
                            Synthesize your personal investment portfolio using our AI-driven Thesis engine.
                        </p>
                        <Link to="/township-intelligence">
                            <button className="bg-white text-secondary px-12 py-5 rounded-full font-bold shadow-2xl hover:bg-accent transition-all">
                                Initiate Portfolio Synthesis
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
