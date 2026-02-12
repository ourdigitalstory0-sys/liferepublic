import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "What is the starting price of flats in Kolte Patil Life Republic Hinjewadi?",
        answer: "The starting price for 2 BHK flats in Life Republic is approximately ₹72 Lakhs* in the Arezo sector. Premium 3 BHK units start from ₹1.05 Cr*, while luxury 4 BHK villas and row houses range from ₹2.0 Cr to ₹3.0 Cr* depending on the sector."
    },
    {
        question: "Where is Kolte Patil Life Republic located exactly?",
        answer: "Kolte Patil Life Republic is strategically located in Marunji, Hinjewadi, Pune (411057). It is just 4.5 km from Hinjewadi Phase 1 IT Park and offers seamless connectivity to the Mumbai-Pune Expressway and the upcoming Metro Line."
    },
    {
        question: "When is the possession date for Life Republic Atmos and Arezo?",
        answer: "Possession dates vary by project universe: Life Republic Arezo is expected by December 2025, while Life Republic Atmos is scheduled for possession in December 2027. Some sectors like First Avenue and Oro Avenue already have ready-to-move units."
    },
    {
        question: "What amenities are available in the township?",
        answer: "The 390+ acre township features world-class amenities including a 3.5-acre Urban Park, Anisha Global School, a fire station, 150ft wide spine roads, multiple clubhouses, swimming pools, gymnasiums, and a dedicated sports arena."
    },
    {
        question: "Is Kolte Patil Life Republic RERA registered?",
        answer: "Yes, all active projects within Kolte Patil Life Republic are RERA registered. Specific RERA numbers for projects like Atmos, Aros, and Arezo can be found on the official MahaRERA website or our project details page."
    }
];

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
