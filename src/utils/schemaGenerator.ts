import type { Project } from '../lib/types';

const DOMAIN = 'https://life-republic.in';

export const generateGlobalSchema = (path: string = '/') => {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@id': `${DOMAIN}/#organization`,
                '@type': 'RealEstateAgent',
                'name': 'Kolte Patil Life Republic Hinjewadi',
                'url': DOMAIN,
                'logo': {
                    '@id': `${DOMAIN}/#logo`,
                    '@type': 'ImageObject',
                    'url': `${DOMAIN}/logo-theme.png`,
                    'contentUrl': `${DOMAIN}/logo-theme.png`,
                    'caption': 'Kolte Patil Life Republic Hinjewadi'
                },
                'image': { '@id': `${DOMAIN}/#logo` },
                'telephone': '+91-7744009295',
                'priceRange': '₹40L - ₹3Cr',
                'address': {
                    '@type': 'PostalAddress',
                    'streetAddress': 'Life Republic Township, Marunji Road',
                    'addressLocality': 'Hinjewadi, Pune',
                    'postalCode': '411057',
                    'addressCountry': 'IN'
                },
                'sameAs': [
                    'https://www.koltepatil.com/',
                    'https://en.wikipedia.org/wiki/Kolte-Patil_Developers',
                    'https://www.facebook.com/KoltePatilDevelopers/',
                    'https://www.linkedin.com/company/kolte-patil-developers-limited/',
                    'https://www.youtube.com/c/KoltePatilDevelopersLtd',
                    'https://www.google.com/search?q=kolte+patil+life+republic&sca_esv=0cefd7cacdd99c8f&rlz=1C5CHFA_enIN1014IN1014&sxsrf=ANbL-n6cp4Yw7Z7Fh4G4LehvmcPQYTXMWQ:1780943573807&udm=1&lsack=1Qonau7-ML6WseMPr7iR6A4&sa=X&ved=2ahUKEwiuvdPoo_iUAxU-S2wGHS9cBO0QjGp6BAgpEAA&biw=1440&bih=778&dpr=2#sv=CAwSwgIKBmxjbF9wdhIbCgNwdnESFENnMHZaeTh4TVdoNlpERTVaRFV3EpABCgNscWkSiAFDaGxyYjJ4MFpTQndZWFJwYkNCc2FXWmxJSEpsY0hWaWJHbGpTS0RoMHNENXI0Q0FDRm9yRUFBUUFSQUNFQU1ZQUJnQkdBSVlBeUlaYTI5c2RHVWdjR0YwYVd3Z2JHbG1aU0J5WlhCMVlteHBZNUlCRVdGd1lYSjBiV1Z1ZEY5amIyMXdiR1Y0ElQKA3RicxJNbHJmOiEybTQhMWUxNSE0bTIhMTVtMSExc2hhc18xd2hlZWxjaGFpcl8xYWNjZXNzaWJsZV8xZW50cmFuY2UhMm0xITFlMyEzc0lBRT0SHgoBcRIZa29sdGUgcGF0aWwgbGlmZSByZXB1YmxpYxoSbG9jYWwtcGxhY2Utdmlld2VyGAoghsjQIg'
                ],
                'parentOrganization': {
                    '@type': 'Organization',
                    'name': 'Kolte Patil Developers Ltd.',
                    'url': 'https://www.koltepatil.com/'
                },
                'aggregateRating': {
                    '@type': 'AggregateRating',
                    'ratingValue': '4.8',
                    'reviewCount': '12500',
                    'bestRating': '5',
                    'worstRating': '1'
                }
            },
            {
                '@type': 'WebSite',
                '@id': `${DOMAIN}/#website`,
                'url': DOMAIN,
                'name': 'Kolte Patil Life Republic',
                'description': '390-Acre Integrated Township in Hinjewadi, Pune',
                'publisher': { '@id': `${DOMAIN}/#organization` },
                'potentialAction': [{
                    '@type': 'SearchAction',
                    'target': `${DOMAIN}/search?q={search_term_string}`,
                    'query-input': 'required name=search_term_string'
                }]
            },
            {
                '@type': 'WebPage',
                '@id': `${DOMAIN}${path}#webpage`,
                'url': `${DOMAIN}${path}`,
                'name': 'Kolte Patil Life Republic Hinjewadi | Township Site',
                'isPartOf': { '@id': `${DOMAIN}/#website` },
                'about': { '@id': `${DOMAIN}/#organization` },
                'provider': { '@id': `${DOMAIN}/#organization` },
                'mainEntity': { '@id': `${DOMAIN}/#organization` },
                'primaryImageOfPage': { '@id': `${DOMAIN}${path}#primaryimage` },
                'description': 'Explore Kolte Patil Life Republic Hinjewadi, a 390-acre integrated township in Pune with premium 1, 2, 3 BHK flats and luxury villas.'
            }
        ]
    };
};

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => {
    return {
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
};

export const generateSiteNavigationSchema = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'itemListElement': [
            { '@type': 'SiteNavigationElement', 'position': 1, 'name': 'Projects', 'url': `${DOMAIN}/projects` },
            { '@type': 'SiteNavigationElement', 'position': 2, 'name': 'Amenities', 'url': `${DOMAIN}/amenities` },
            { '@type': 'SiteNavigationElement', 'position': 3, 'name': 'Location Highlights', 'url': `${DOMAIN}/location` },
            { '@type': 'SiteNavigationElement', 'position': 4, 'name': 'NRI Corner', 'url': `${DOMAIN}/nri-corner` },
            { '@type': 'SiteNavigationElement', 'position': 5, 'name': 'Township Intelligence', 'url': `${DOMAIN}/township-intelligence` }
        ]
    };
};

export const generateImageGallerySchema = (project: Project) => {
    const images = project.gallery?.map((g) => (typeof g === 'string' ? g : g.url)) || [project.image];
    return {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        'name': `${project.title} Image Gallery`,
        'description': `project images and floor plans for ${project.title} at Life Republic Hinjewadi.`,
        'image': images.map(url => ({
            '@type': 'ImageObject',
            'contentUrl': url,
            'caption': `${project.title} Hinjewadi - ${project.category}`
        }))
    };
};

export const generateProjectSchema = (project: Project) => {
    const images =
        project.gallery?.map((g) => (typeof g === 'string' ? g : g.url)) || [
            project.image,
        ];

    const bedrooms = parseInt(project.features.find(f => f.includes('BHK'))?.match(/\d+/)?.[0] || '0', 10);
    const floorSize = project.features.find(f => f.toLowerCase().includes('sq.ft') || f.toLowerCase().includes('sqft'))?.match(/\d+/)?.[0];

    const projectUrl = `${DOMAIN}/projects/${project.id}`;

    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'RealEstateListing',
                '@id': `${projectUrl}#listing`,
                'url': projectUrl,
                'name': `${project.title} | ${project.category} in Hinjewadi`,
                'description': project.description,
                'image': images,
                'datePosted': '2024-01-01',
                'address': {
                    '@type': 'PostalAddress',
                    'streetAddress': `${project.location || 'Sector'}, Life Republic Township`,
                    'addressLocality': 'Hinjewadi, Pune',
                    'addressRegion': 'Maharashtra',
                    'postalCode': '411057',
                    'addressCountry': 'IN'
                },
                'geo': {
                    '@type': 'GeoCoordinates',
                    'latitude': '18.5995',
                    'longitude': '73.7153'
                },
                'brand': {
                    '@type': 'Brand',
                    'name': 'Kolte Patil'
                },
                'itemListElement': [
                    {
                        '@type': 'Accommodation',
                        'name': `${project.title} Residence`,
                        'numberOfRooms': bedrooms > 0 ? bedrooms : undefined,
                        'floorSize': floorSize ? {
                            '@type': 'QuantitativeValue',
                            'value': floorSize,
                            'unitCode': 'FTK'
                        } : undefined,
                        'amenityFeature': project.amenities?.map((amenity) => ({
                            '@type': 'LocationFeatureSpecification',
                            'name': amenity,
                            'value': true
                        }))
                    }
                ],
                'offers': {
                    '@type': 'Offer',
                    'priceCurrency': 'INR',
                    'price': parsePrice(project.price),
                    'priceSpecification': {
                        '@type': 'UnitPriceSpecification',
                        'price': parsePrice(project.price),
                        'priceCurrency': 'INR',
                        'referenceQuantity': {
                            '@type': 'QuantitativeValue',
                            'value': '1',
                            'unitCode': 'UNIT'
                        }
                    },
                    'availability': 'https://schema.org/InStock',
                    'validFrom': new Date().toISOString()
                }
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${projectUrl}#breadcrumb`,
                'itemListElement': [
                    { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': DOMAIN },
                    { '@type': 'ListItem', 'position': 2, 'name': 'Projects', 'item': `${DOMAIN}/projects` },
                    { '@type': 'ListItem', 'position': 3, 'name': project.title, 'item': projectUrl }
                ]
            }
        ]
    };
};

const parsePrice = (priceStr: string): string => {
    const cleanStr = priceStr.replace(/[^0-9.CrLakhs]/g, '');
    let value = 0;
    if (cleanStr.includes('Cr')) {
        value = parseFloat(cleanStr) * 10000000;
    } else if (cleanStr.includes('Lakhs')) {
        value = parseFloat(cleanStr) * 100000;
    } else {
        value = parseFloat(cleanStr.replace(/[^0-9.]/g, '')) || 0;
    }
    return value.toString();
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

export const generateLocalBusinessSchema = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent',
        '@id': `${DOMAIN}/#experience-centre`,
        'name': 'Kolte Patil Life Republic Hinjewadi Experience Centre',
        'image': `${DOMAIN}/images/experience-centre.webp`,
        'telephone': '+91-7744009295',
        'priceRange': '₹40L - ₹3Cr',
        'url': DOMAIN,
        'sameAs': [
            'https://www.google.com/search?q=kolte+patil+life+republic&sca_esv=0cefd7cacdd99c8f&rlz=1C5CHFA_enIN1014IN1014&sxsrf=ANbL-n6cp4Yw7Z7Fh4G4LehvmcPQYTXMWQ:1780943573807&udm=1&lsack=1Qonau7-ML6WseMPr7iR6A4&sa=X&ved=2ahUKEwiuvdPoo_iUAxU-S2wGHS9cBO0QjGp6BAgpEAA&biw=1440&bih=778&dpr=2#sv=CAwSwgIKBmxjbF9wdhIbCgNwdnESFENnMHZaeTh4TVdoNlpERTVaRFV3EpABCgNscWkSiAFDaGxyYjJ4MFpTQndZWFJwYkNCc2FXWmxJSEpsY0hWaWJHbGpTS0RoMHNENXI0Q0FDRm9yRUFBUUFSQUNFQU1ZQUJnQkdBSVlBeUlaYTI5c2RHVWdjR0YwYVd3Z2JHbG1aU0J5WlhCMVlteHBZNUlCRVdGd1lYSjBiV1Z1ZEY5amIyMXdiR1Y0ElQKA3RicxJNbHJmOiEybTQhMWUxNSE0bTIhMTVtMSExc2hhc18xd2hlZWxjaGFpcl8xYWNjZXNzaWJsZV8xZW50cmFuY2UhMm0xITFlMyEzc0lBRT0SHgoBcRIZa29sdGUgcGF0aWwgbGlmZSByZXB1YmxpYxoSbG9jYWwtcGxhY2Utdmlld2VyGAoghsjQIg'
        ],
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Life Republic Township, Marunji Road',
            'addressLocality': 'Hinjewadi, Pune',
            'postalCode': '411057',
            'addressCountry': 'IN'
        },
        'geo': {
            '@type': 'GeoCoordinates',
            'latitude': '18.5995',
            'longitude': '73.7153'
        },
        'openingHoursSpecification': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'opens': '10:00',
            'closes': '19:00'
        }
    };
};

export const generateSectorSchema = (data: { name: string; type: string; usp: string; slug: string }) => {
    const isLocality = data.type === 'Locality';
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': isLocality ? 'Place' : 'ApartmentComplex',
                '@id': `${DOMAIN}/location/${data.slug}#${data.type.toLowerCase()}`,
                'name': data.name,
                'description': data.usp,
                'url': `${DOMAIN}/location/${data.slug}`,
                'address': {
                    '@type': 'PostalAddress',
                    'addressLocality': 'Hinjewadi',
                    'addressRegion': 'Maharashtra',
                    'addressCountry': 'IN'
                },
                'containedInPlace': {
                    '@type': 'ApartmentComplex',
                    'name': 'Kolte Patil Life Republic',
                    'url': DOMAIN
                }
            }
        ]
    };
};

export const generateVideoSchema = (videos: { name: string; description: string; thumbnailUrl: string; uploadDate: string; contentUrl: string }[]) => {
    return {
        '@context': 'https://schema.org',
        '@graph': videos.map(v => ({
            '@type': 'VideoObject',
            'name': v.name,
            'description': v.description,
            'thumbnailUrl': v.thumbnailUrl,
            'uploadDate': v.uploadDate,
            'contentUrl': v.contentUrl
        }))
    };
};

export const generateAboutPageSchema = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        'mainEntity': {
            '@id': `${DOMAIN}/#organization`,
            '@type': 'RealEstateAgent',
            'name': 'Kolte Patil Life Republic Hinjewadi',
            'description': '390-Acre Integrated Township in Hinjewadi, Pune developed by Kolte Patil Developers.'
        },
        'breadcrumb': {
            '@type': 'BreadcrumbList',
            'itemListElement': [
                { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': DOMAIN },
                { '@type': 'ListItem', 'position': 2, 'name': 'About Us', 'item': `${DOMAIN}/about` }
            ]
        }
    };
};

export const generateReviewSchema = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': 'Kolte Patil Life Republic Hinjewadi',
        'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.8',
            'reviewCount': '12500'
        },
        'review': [
            {
                '@type': 'Review',
                'author': 'Rahul Deshpande',
                'datePublished': '2024-01-15',
                'description': 'Living in Life Republic is like living in a resort. My commute to Hinjewadi Phase 1 is just 10 mins via the Spine Road.',
                'name': 'Excellent Connectivity',
                'reviewRating': {
                    '@type': 'Rating',
                    'bestRating': '5',
                    'ratingValue': '5',
                    'worstRating': '1'
                }
            },
            {
                '@type': 'Review',
                'author': 'Priya Sharma',
                'datePublished': '2024-02-20',
                'description': 'The security and community feel here is unmatched. Absolute peace of mind for working parents.',
                'name': 'Safe & Secure Community',
                'reviewRating': {
                    '@type': 'Rating',
                    'bestRating': '5',
                    'ratingValue': '5',
                    'worstRating': '1'
                }
            }
        ]
    };
};

export const generateBreadcrumbSchema = (items: { name: string; item: string }[]) => {
    const breadcrumbId = `${DOMAIN}${items[items.length - 1].item}#breadcrumb`;
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        'itemListElement': items.map((it, idx) => ({
            '@type': 'ListItem',
            'position': idx + 1,
            'name': it.name,
            'item': it.item.startsWith('http') ? it.item : `${DOMAIN}${it.item}`
        }))
    };
};
