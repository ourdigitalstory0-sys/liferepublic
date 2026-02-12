import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ShareButtons } from '../components/ui/ShareButtons';

const posts = [
    {
        title: "Hinjewadi Real Estate Market Outlook 2026: The Year of Appreciation",
        date: "February 10, 2026",
        summary: "With property prices in West Pune appreciating by 12% YoY, 2026 is projected to be the golden year for Hinjewadi investors. Analyze the impact of the operational Metro Line 3 and the rising demand for integrated townships.",
        image: "https://liferepublic.in/images/gallery/eros/master-layout.webp"
    },
    {
        title: "Pune Metro Line 3: A Game Changer for Hinjewadi",
        date: "October 15, 2025",
        summary: "The upcoming Metro Line 3 connecting Hinjewadi to Shivajinagar is set to reduce commute times by 75%. Here is how it impacts property prices in Life Republic.",
        image: "https://liferepublic.in/images/gallery/eros/master-layout.webp" // Placeholder
    },
    {
        title: "Why Integrated Townships are the Future of Pune",
        date: "September 28, 2025",
        summary: "Post-pandemic, the demand for holistic living with schools, hospitals, and parks within walking distance has skyrocketed. Learn why.",
        image: "https://liferepublic.in/images/slider/2.webp"
    },
    {
        title: "Construction Update: 24K Espada & Atmos",
        date: "August 10, 2025",
        summary: "We are happy to announce that Phase 1 of Atmos has reached the plinth level. Check out the latest site drone footage.",
        image: "https://liferepublic.in/images/slider/3.webp"
    }
];

export const MediaCenter: React.FC = () => {
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
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, idx) => (
                        <motion.article
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                        >
                            <div className="h-48 bg-gray-200">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center text-sm text-gray-500 mb-3">
                                    <Calendar size={14} className="mr-2" />
                                    {post.date}
                                </div>
                                <h2 className="text-xl font-bold font-serif mb-3 text-secondary line-clamp-2">{post.title}</h2>
                                <p className="text-gray-600 mb-6 flex-grow line-clamp-3">{post.summary}</p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                    <Button variant="ghost" className="p-0 hover:bg-transparent hover:text-accent gap-2 text-sm">
                                        Read More <ArrowRight size={14} />
                                    </Button>
                                    <ShareButtons
                                        url="/media-center"
                                        title={post.title}
                                        className="scale-90 origin-right"
                                    />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>
        </div>
    );
};
