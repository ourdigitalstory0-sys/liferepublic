import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Calendar, ArrowLeft, User, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ShareButtons } from '../components/ui/ShareButtons';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../lib/types';

export const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return;

            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error) throw error;
                setPost(data);
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
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen pt-20 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
                <p className="text-gray-600 mb-8">{error || "The article you're looking for doesn't exist."}</p>
                <Link to="/media-center">
                    <Button variant="primary">Back to Media Center</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-20">
            <SEO
                title={`${post.title} | Life Republic Blog`}
                description={post.meta_description || post.excerpt || post.content.substring(0, 160)}
                keywords={post.tags?.join(', ') || 'life republic, real estate blog'}
                canonical={`/media-center/${post.slug}`}
                image={post.image}
            />
            <Breadcrumbs />

            <article className="max-w-4xl mx-auto px-4 py-12">
                <Link to="/media-center" className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Media Center
                </Link>

                <header className="mb-8">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center"><Calendar size={14} className="mr-1" /> {formatDate(post.published_at || post.created_at)}</span>
                        <span className="flex items-center"><User size={14} className="mr-1" /> {post.author || 'Admin'}</span>
                        <span className="flex items-center"><Clock size={14} className="mr-1" /> {Math.ceil(post.content.length / 1000)} min read</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-secondary mb-6">{post.title}</h1>

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map(tag => (
                                <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#{tag}</span>
                            ))}
                        </div>
                    )}
                </header>

                {post.image && (
                    <div className="rounded-2xl overflow-hidden shadow-lg mb-10 aspect-video relative">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-secondary prose-a:text-primary prose-img:rounded-xl">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-600 font-medium">Share this article:</p>
                        <ShareButtons
                            url={`/media-center/${post.slug}`}
                            title={post.title}
                        />
                    </div>
                </div>
            </article>

            {/* Newsletter Subscription or Related Posts could go here */}
        </div>
    );
};
