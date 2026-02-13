import type { Project } from '../lib/types';

const DOMAIN = 'https://life-republic.in';

export const generateProjectSchema = (project: Project) => {
    const images =
        project.gallery?.map((g) => (typeof g === 'string' ? g : g.url)) || [
            project.image,
        ];

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product', // Or 'RealEstateListing' or 'SingleFamilyResidence'
        name: `Kolte Patil Life Republic ${project.title}`,
        description: project.description,
        image: images,
        url: `${DOMAIN}/projects/${project.id}`,
        brand: {
            '@type': 'Brand',
            name: 'Kolte Patil Developers',
        },
        offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: (() => {
                const priceStr = project.price.replace(/[^0-9.CrLakhs]/g, '');
                let value = 0;
                if (priceStr.includes('Cr')) {
                    value = parseFloat(priceStr) * 10000000;
                } else if (priceStr.includes('Lakhs')) {
                    value = parseFloat(priceStr) * 100000;
                } else {
                    value = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
                }
                return value.toString();
            })(),
            availability: 'https://schema.org/InStock',
            url: `${DOMAIN}/projects/${project.id}`,
        },
        additionalProperty: project.features.map((feature) => ({
            '@type': 'PropertyValue',
            name: 'Feature',
            value: feature,
        })),
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: DOMAIN,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Projects',
                item: `${DOMAIN}/projects`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: project.title,
                item: `${DOMAIN}/projects/${project.id}`,
            },
        ],
    };

    // Combining schemas
    return [productSchema, breadcrumbSchema];
};

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
};
