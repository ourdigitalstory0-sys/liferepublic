import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ShareButtons } from '../components/ui/ShareButtons';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../lib/types';

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

                if (error) throw error;
                setPosts(data || []);
            } catch (err: any) {
                console.error('Error fetching posts:', err.message);
                setError('Failed to load posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="pt-20">
            <SEO
                title="News & Updates | Life Republic Blog"
                description="Stay updated with the latest news, construction updates, and real estate insights from Kolte Patil Life Republic Hinjewadi."
                keywords="Life Republic News, Construction Updates Hinjewadi, Pune Real Estate Blog, Metro Update Hinjewadi"
                canonical="/media-center"
            />
            <Breadcrumbs />

            <section className="bg-primary-dark text-white py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Media Center</h1>
                    <p className="text-xl text-gray-300">Insights, Updates, and Stories from the Township</p>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                            <p className="mt-4 text-gray-500">Loading updates...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 text-red-500">{error}</div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            <p>No updates available at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, idx) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                                >
                                    <Link to={`/media-center/${post.slug}`} className="block h-48 bg-gray-200 overflow-hidden">
                                        <img
                                            src={post.image || 'https://liferepublic.in/images/gallery/eros/master-layout.webp'}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            loading="lazy"
                                        />
                                    </Link>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center text-sm text-gray-500 mb-3">
                                            <Calendar size={14} className="mr-2" />
                                            {formatDate(post.published_at || post.created_at)}
                                        </div>
                                        <Link to={`/media-center/${post.slug}`}>
                                            <h2 className="text-xl font-bold font-serif mb-3 text-secondary line-clamp-2 hover:text-primary transition-colors">{post.title}</h2>
                                        </Link>
                                        <p className="text-gray-600 mb-6 flex-grow line-clamp-3">{post.excerpt || post.content.substring(0, 150)}...</p>
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                            <Link to={`/media-center/${post.slug}`}>
                                                <Button variant="ghost" className="p-0 hover:bg-transparent hover:text-accent gap-2 text-sm">
                                                    Read More <ArrowRight size={14} />
                                                </Button>
                                            </Link>
                                            <ShareButtons
                                                url={`/media-center/${post.slug}`}
                                                title={post.title}
                                                className="scale-90 origin-right"
                                            />
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};
