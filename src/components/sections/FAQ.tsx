import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

import seoFaqs from '../../data/seo-faqs.json';

const faqs = seoFaqs;

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
};

export const FAQ: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-20 bg-white">
            <script type="application/ld+json">
                {JSON.stringify(faqSchema)}
            </script>
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-4 text-accent">
                        <HelpCircle size={24} />
                    </div>
                    <h2 className="text-4xl font-serif font-bold mb-4 text-secondary">Frequently Asked Questions</h2>
                    <p className="text-gray-600">
                        Common queries about Life Republic Township, Pricing, and Possession.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:border-accent/30 transition-colors bg-gray-50/50">
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`font-semibold text-lg ${activeIndex === index ? 'text-accent' : 'text-gray-800'}`}>
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`text-gray-400 transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-accent' : ''}`}
                                />
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
