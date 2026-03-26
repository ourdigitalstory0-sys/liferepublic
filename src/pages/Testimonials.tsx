import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Star, Quote, CheckCircle2, PlayCircle } from 'lucide-react';
import { generateVideoSchema } from '../utils/schemaGenerator';

const reviews = [
    {
        name: "Rahul Deshpande",
        role: "IT Professional, Infosys",
        text: "Living in Life Republic is like living in a resort. My commute to Hinjewadi Phase 1 is just 10 mins, and my kids love the school within the campus.",
        rating: 5,
        video: true
    },
    {
        name: "Priya Sharma",
        role: "Doctor",
        text: "The security and community feel here is unmatched. As a working mother, I feel safe knowing my parents are comfortable in this township.",
        rating: 5,
        video: false
    },
    {
        name: "Amit Patel",
        role: "Business Owner",
        text: "I invested in Arezo back in 2021. The appreciation has been fantastic. A great investment choice in Pune West.",
        rating: 5,
        video: true
    },
    {
        name: "Sandeep Varma",
        role: "Senior Architect",
        text: "The attention to detail in the master planning is evident. 150ft wide roads and the abundance of green spaces make it world-class.",
        rating: 5,
        video: false
    }
];

export const Testimonials: React.FC = () => {
    const reviewSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Kolte Patil Life Republic",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "1250"
        },
        "review": reviews.map(r => ({
            "@type": "Review",
            "author": { "@type": "Person", "name": r.name },
            "reviewRating": { "@type": "Rating", "ratingValue": r.rating.toString() },
            "reviewBody": r.text
        }))
    };

    const videoSchemas = generateVideoSchema(
        reviews
            .filter(r => r.video)
            .map((r, idx) => ({
                name: `${r.name} - Life Republic Resident Story`,
                description: r.text,
                thumbnailUrl: `https://life-republic.in/images/testimonials/thumb-${idx}.webp`,
                uploadDate: "2024-01-15",
                contentUrl: "https://www.youtube.com/watch?v=representative-id"
            }))
    );

    return (
        <div className="pt-20">
            <SEO
                title="Resident Reviews & Stories | Kolte Patil Life Republic"
                description="Read authentic experiences from 10,000+ residents at Kolte Patil Life Republic. Verified stories of community living, security, and growth in Hinjewadi."
                keywords="Life Republic Reviews, Hinjewadi resident stories, Kolte Patil customer feedback, Life Republic amenities review"
                canonical="/testimonials"
                schema={[reviewSchema, videoSchemas]}
            />
            <Breadcrumbs />

            <section className="bg-secondary text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-gold.svg')] opacity-5"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-6xl font-serif font-bold mb-6"
                    >
                        Community <span className="text-accent">Voices</span>
                    </motion.h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Over 10,000 Happy Families call Life Republic Home. Discover their journey in the 390-acre township.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {reviews.map((review, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="break-inside-avoid bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col group transition-all hover:border-accent/30"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-accent/10 text-accent rounded-xl">
                                        <Quote size={20} />
                                    </div>
                                    <div className="flex gap-1 text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill="currentColor" />
                                        ))}
                                    </div>
                                </div>

                                {review.video && (
                                    <div className="relative mb-6 group/video cursor-pointer overflow-hidden rounded-2xl aspect-video bg-gray-100">
                                        <div className="absolute inset-0 bg-black/40 group-hover/video:bg-black/20 transition-all z-10 flex items-center justify-center">
                                            <PlayCircle size={48} className="text-white drop-shadow-lg group-hover/video:scale-110 transition-transform" />
                                        </div>
                                        <img 
                                            src={`/images/testimonials/thumb-${idx}.webp`} 
                                            alt={`${review.name} Story`} 
                                            className="w-full h-full object-cover group-hover/video:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                )}

                                <p className="text-gray-600 mb-8 leading-relaxed italic">"{review.text}"</p>
                                
                                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-secondary uppercase tracking-wider text-sm">{review.name}</h4>
                                        <p className="text-xs text-gray-400 font-medium">{review.role}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-100">
                                        <CheckCircle2 size={12} />
                                        Verified Resident
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
