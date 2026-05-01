/**
 * SEO Optimization Utility (Sovereign SEO v6.5)
 * Generates semantic keyword combinations and high-fidelity JSON-LD schemas
 * to maximize crawl authority and search engine dominance.
 */

interface SEOContext {
    title: string;
    category: string;
    location: string;
    price: string;
    slug?: string;
    description?: string;
    image?: string;
    type?: 'RealEstateListing' | 'LocalBusiness' | 'Organization';
}

/**
 * Generates high-intent semantic keywords for search dominance
 */
export const generateSemanticKeywords = (ctx: SEOContext): string => {
    const core = [
        `Kolte Patil ${ctx.title}`,
        `Life Republic ${ctx.title}`,
        `${ctx.category} in ${ctx.location}`,
        `Flats in ${ctx.location} within Life Republic`,
        `Buy ${ctx.category} in Life Republic Pune`
    ];

    const deepWebData = [
        `Properties near Rajiv Gandhi Infotech Park Phase 3`,
        `Flats near Hinjewadi Metro Station 2026`,
        `Apartments near Hinjewadi Phase 3 IT Park`,
        `New Launch in Hinjewadi vs Marunji`,
        `Best Integrated Township in Pune`,
        `Kolte Patil Life Republic Resale & New Launch`,
        `Life Republic vs Godrej Woodsville vs Lodha Panache`,
        `Hinjewadi Property Price Trends 2026`,
        `High Rental Yield Properties Hinjewadi`,
        `Investment in Hinjewadi Pune IT Hub`
    ];

    const variations = [
        `${ctx.category.replace('BHK', 'Bed')} Luxury Residences`,
        `Premium Apartments near Hinjewadi IT Park`,
        `${ctx.title} Floor Plans & Layouts`,
        `${ctx.title} Cost Sheet & Pricing Matrix`,
        `${ctx.title} Brochure PDF Download`,
        `${ctx.title} Possession Date 2026`,
        `400 Acres of Community Living Life Republic`,
        `Sustainable Living in Hinjewadi Pune`,
        `Gated Community near Anisha Global School`
    ];

    const authority = [
        "Kolte Patil Developers Official Portal",
        "MahaRERA Registered Projects Hinjewadi",
        "Gated Township West Pune",
        "Top Real Estate Developer in Pune 2026",
        "Sustainable Architectural Monograph Pune"
    ];

    return [...new Set([...core, ...deepWebData, ...variations, ...authority])].join(', ');
};

/**
 * Generates high-fidelity JSON-LD Schema for Google Rich Results
 */
export const generateJSONLD = (ctx: SEOContext) => {
    const canonical = generateCanonicalURL(ctx.slug || '');
    
    const schemas: any[] = [
        {
            "@type": ctx.type || "RealEstateListing",
            "name": `${ctx.title} | ${ctx.category} in ${ctx.location}`,
            "description": ctx.description || generateSemanticDescription(ctx),
            "url": canonical,
            "image": ctx.image || "https://life-republic.in/og-image.jpg",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kolte Patil Life Republic, Marunji",
                "addressLocality": "Hinjewadi",
                "addressRegion": "Pune",
                "postalCode": "411057",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "18.6047",
                "longitude": "73.7144"
            }
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://life-republic.in"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": ctx.location,
                    "item": `https://life-republic.in/location/${ctx.location.toLowerCase()}`
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": ctx.title,
                    "item": canonical
                }
            ]
        }
    ];

    // Add LocalBusiness schema for the main Sales Gallery
    if (ctx.slug === '/') {
        schemas.push({
            "@type": "LocalBusiness",
            "name": "Kolte Patil Life Republic Sales Gallery",
            "image": "https://life-republic.in/images/gallery/sales-gallery.jpg",
            "telePhone": "+91-20-67500000",
            "url": "https://life-republic.in",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Hinjewadi-Marunji Road",
                "addressLocality": "Hinjewadi",
                "addressRegion": "Pune",
                "postalCode": "411057",
                "addressCountry": "IN"
            },
            "openingHours": "Mo-Su 10:00-19:00"
        });
    }

    return {
        "@context": "https://schema.org",
        "@graph": schemas
    };
};

export const generateSemanticTitle = (ctx: SEOContext): string => {
    const hasBranding = ctx.title.includes('Life Republic');
    const templates = hasBranding ? [
        `${ctx.title} | ${ctx.category} in ${ctx.location} | Sovereign 2026`,
        `${ctx.title} - Official Price & Brochure | Starting ${ctx.price}`,
        `${ctx.title} | High-Yield ${ctx.category} in Hinjewadi`
    ] : [
        `${ctx.title} at Life Republic | ${ctx.category} in ${ctx.location}`,
        `${ctx.title} Hinjewadi | ${ctx.category} from ${ctx.price} | Kolte Patil`,
        `Buy ${ctx.category} in ${ctx.title} | Best Township in Pune West`
    ];
    return templates[0];
};

export const generateSemanticDescription = (ctx: SEOContext): string => {
    return `Looking for a ${ctx.category} in ${ctx.location}? Discover ${ctx.title} at Kolte Patil Life Republic. 
    Offering ${ctx.category.replace('BHK', 'Bedroom')} luxury homes starting ${ctx.price}. 
    Located near Rajiv Gandhi IT Park Ph 3 with world-class amenities and 400-acre infrastructure. Verified 2026 pricing.`;
};

/**
 * Consolidates link authority through canonical URL normalization
 */
export const generateCanonicalURL = (path: string): string => {
    const DOMAIN = 'https://life-republic.in';
    if (!path) return `${DOMAIN}/`;
    
    const cleanPath = path.split('?')[0].replace(/\/+$/, '').toLowerCase();
    return `${DOMAIN}${cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath}`;
};

/**
 * Generates high-intent semantic keywords for specific localities
 */
export const generateLocationKeywords = (location: string): string => {
    return [
        `Premium Flats in ${location}`,
        `Life Republic ${location} Connectivity`,
        `Buy Property in ${location} vs Hinjewadi`,
        `Real Estate Investment in ${location} 2026`,
        `2 & 3 BHK in ${location} Pune`,
        `Distance from ${location} to Hinjewadi Phase 3`,
        `${location} Property Appreciation Trends`
    ].join(', ');
};
