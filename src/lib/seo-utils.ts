/**
 * SEO Optimization Utility
 * Generates semantic keyword combinations to avoid "keyword stuffing" penalties
 * while maximizing "long-tail" coverage.
 */

interface SEOContext {
    title: string;
    category: string;
    location: string;
    price: string;
}

export const generateSemanticKeywords = (ctx: SEOContext): string => {
    // 1. Core Identifiers (High Intent)
    const core = [
        `Kolte Patil ${ctx.title}`,
        `Life Republic ${ctx.title}`,
        `${ctx.category} in ${ctx.location}`,
        `Flats in ${ctx.location} within Life Republic`,
    ];

    // 2. Deep Web Data / Competitor Drafting (Strategic)
    // We targeting people searching for nearby areas or competitors implicitly
    const deepWebData = [
        `Properties near Rajiv Gandhi Infotech Park`,
        `Flats near Hinjewadi Phase 1`,
        `Apartments near Hinjewadi Phase 3`,
        `New Launch in Hinjewadi vs Wakad`,
        `Best Township in West Pune`,
        `Flats in Marunji Hinjewadi Properties`,
        `Kolte Patil Life Republic Resale`, // Catch resale traffic and convert to new
        `Life Republic vs Godrej Woodsville`, // Competitor high volume
        `Hinjewadi Property Price Trends 2025`, // Trend based
        `Rental Yield Hinjewadi` // Investor intent
    ];

    // 3. Semantic Variations (Algorithm Friendly)
    // Google treats "Flat", "Apartment", "Home", "Residence" as synonyms but values diversity.
    const variations = [
        `${ctx.category.replace('BHK', 'Bed')} Residences`, // "2 Bed Residences"
        `Luxury Homes in ${ctx.location}`,
        `Premium Apartments near IT Park`,
        `${ctx.title} Floor Plans`,
        `${ctx.title} Latest Price`,
        `${ctx.title} Brochure Download`,
        `${ctx.title} Possession Date`
    ];

    // 4. Authority Terms (Brand & Trust)
    const authority = [
        "Kolte Patil Township",
        "RERA Registered Projects",
        "Gated Community Pune",
        "Integrated Township West Pune",
        "Kolte Patil Developers Reviews"
    ];

    // Combine and deduplicate
    return [...new Set([...core, ...deepWebData, ...variations, ...authority])].join(', ');
};

export const generateLocationKeywords = (location: string): string => {
    return [
        `Flats in ${location} near Life Republic`,
        `Properties in ${location} Pune`,
        `2 BHK in ${location}`,
        `3 BHK in ${location}`,
        `New Projects in ${location}`,
        `Life Republic distance from ${location}`,
        `Real Estate Investment ${location}`
    ].join(', ');
};

export const generateSemanticTitle = (ctx: SEOContext): string => {
    const hasBranding = ctx.title.includes('Life Republic');

    // High-CTR Title Templates
    const templates = hasBranding ? [
        `${ctx.title} | ${ctx.category} in ${ctx.location}`,
        `${ctx.title} - Stores offering ${ctx.category} | Starts ${ctx.price}`,
        `${ctx.title} | Official Brochure & Pricing`
    ] : [
        `${ctx.title} at Life Republic | Premium ${ctx.category} in ${ctx.location}`,
        `${ctx.title} Hinjewadi | ${ctx.category} starting ${ctx.price} | Kolte Patil`,
        `Buy ${ctx.category} in ${ctx.title} | Best Township in ${ctx.location}`
    ];

    // Return the first one for now, or rotate if we had random logic
    return templates[0];
};

export const generateSemanticDescription = (ctx: SEOContext): string => {
    return `Looking for a ${ctx.category} in ${ctx.location}? Discover ${ctx.title} at Kolte Patil Life Republic. 
    Offering ${ctx.category.replace('BHK', 'Bedroom')} luxury homes starting ${ctx.price}. 
    Located near Rajiv Gandhi IT Park with world-class amenities. Check floor plans, pricing, and availability.`;
};
