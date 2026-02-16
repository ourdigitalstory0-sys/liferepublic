import type { Project } from '../lib/types';

const DOMAIN = 'https://life-republic.in';

export const generateProjectSchema = (project: Project) => {
    const images =
        project.gallery?.map((g) => (typeof g === 'string' ? g : g.url)) || [
            project.image,
        ];

    const bedrooms = parseInt(project.features[0].match(/\d+/)?.[0] || '0', 10);

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': ['Product', 'RealEstateListing', 'Apartment'],
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
            validFrom: new Date().toISOString(),
        },
        numberOfRooms: bedrooms > 0 ? bedrooms : undefined,
        amenityFeature: project.amenities?.map((amenity) => ({
            '@type': 'LocationFeatureSpecification',
            name: amenity,
            value: true,
        })),
        address: {
            '@type': 'PostalAddress',
            streetAddress: project.location,
            addressLocality: 'Hinjewadi',
            addressRegion: 'Pune',
            addressCountry: 'IN',
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

export const generateCollectionSchema = (projects: Project[]) => {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Kolte Patil Life Republic Projects",
        "description": "Browse premium 1, 2, 3 BHK flats and villas in Life Republic Township, Hinjewadi.",
        "url": `${DOMAIN}/projects`,
        "mainEntity": {
            "@type": "OfferCatalog",
            "name": "Properties for Sale",
            "itemListElement": projects.map((project, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Offer",
                    "name": project.title,
                    "description": project.description,
                    "url": `${DOMAIN}/projects/${project.id}`,
                    "price": project.price,
                    "priceCurrency": "INR"
                }
            }))
        }
    };
};
