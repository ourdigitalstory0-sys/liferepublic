import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Star, Quote } from 'lucide-react';

const reviews = [
    {
        name: "Rahul Deshpande",
        role: "IT Professional, Infosys",
        text: "Living in Life Republic is like living in a resort. My commute to Hinjewadi Phase 1 is just 10 mins, and my kids love the school within the campus.",
        rating: 5
    },
    {
        name: "Priya Sharma",
        role: "Doctor",
        text: "The security and community feel here is unmatched. As a working mother, I feel safe knowing my parents are comfortable in this township.",
        rating: 5
    },
    {
        name: "Amit Patel",
        role: "Business Owner",
        text: "I invested in Arezo back in 2021. The appreciation has been fantastic. A great investment choice in Pune West.",
        rating: 4
    }
];

export const Testimonials: React.FC = () => {
    // Construct Schema
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

    return (
        <div className="pt-20">
            <SEO
                title="Reviews of Kolte Patil Life Republic | Customer Testimonials"
                description="Read what residents say about life at Kolte Patil Life Republic Hinjewadi. 4.8/5 Star Rating based on 1250+ reviews. Real stories from happy families."
                keywords="Life Republic Reviews, Kolte Patil Complaints, Is Life Republic Good, Resident Feedback"
                canonical="/testimonials"
                schema={reviewSchema}
            />
            <Breadcrumbs />

            <section className="bg-secondary text-white py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Resident Stories</h1>
                    <p className="text-xl text-gray-300">Over 10,000 Happy Families call Life Republic Home</p>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative"
                        >
                            <Quote className="text-accent/20 absolute top-6 right-6 w-10 h-10" />
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 italic">"{review.text}"</p>
                            <div>
                                <h4 className="font-bold text-secondary">{review.name}</h4>
                                <p className="text-sm text-gray-500">{review.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};
