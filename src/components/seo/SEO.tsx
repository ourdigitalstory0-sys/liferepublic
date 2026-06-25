import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { generateGlobalSchema, generateSiteNavigationSchema, generateBreadcrumbSchema } from '../../utils/schemaGenerator';
import { generateCanonicalURL } from '../../lib/seo-utils';
import seoMatrix from '../../data/seoMatrix.json';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    image?: string;
    type?: 'website' | 'article' | 'product';
    schema?: Record<string, unknown> | Record<string, unknown>[];
    breadcrumbItems?: { name: string; item: string }[];
}

const DOMAIN = 'https://life-republic.in';

export const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    canonical,
    image = '/images/gallery/eros/master-layout.webp',
    type = 'website',
    schema,
    breadcrumbItems,
}) => {
    const siteTitle = 'Kolte Patil Life Republic Hinjewadi';
    const locationSuffix = 'Pune';
    
    // De-duplicate branding and location more aggressively
    const cleanTitle = title?.replace(/Kolte Patil|Life Republic|Hinjewadi|Pune/gi, '').replace(/^[\s|:-]+|[\s|:-]+$/g, '');
    const fullTitle = title 
        ? (title.includes('Kolte Patil Life Republic') && title.includes('Hinjewadi')) 
            ? title 
            : `${siteTitle} | ${cleanTitle || title} | ${locationSuffix}`
        : `${siteTitle} | Premium Township | ${locationSuffix}`;

    // Ensure it doesn't get too crazy long for Google (keep under 60-70 chars)
    const finalTitle = fullTitle.length > 70 ? fullTitle.substring(0, 67) + '...' : fullTitle;

    const defaultDescription =
        'Explore Kolte Patil Life Republic Hinjewadi, a 390-acre premium township in Pune. RERA-registered 1, 2, 3 BHK flats & 4 BHK villas near Rajiv Gandhi IT Park.';
    const metaDescription = description || defaultDescription;

    const location = useLocation();
    const currentPath = location.pathname + location.search;
    const fullCanonical = generateCanonicalURL(canonical || currentPath);
    
    // Advanced Keyword Matrix Routing using Data Layer
    const getPathSpecificKeywords = (path: string) => {
        const segments = path.split('/').filter(Boolean);
        let cluster: string[] = [...seoMatrix.base];
        
        // 1. Configuration Keywords
        if (path.includes('1-bhk')) cluster.push(...seoMatrix.configurations["1-bhk"]);
        if (path.includes('2-bhk')) cluster.push(...seoMatrix.configurations["2-bhk"]);
        if (path.includes('3-bhk')) cluster.push(...seoMatrix.configurations["3-bhk"]);
        if (path.includes('4-bhk')) cluster.push(...seoMatrix.configurations["4-bhk"]);
        
        // 2. Project/Cluster Specific
        if (path.includes('projects')) {
            if (path.includes('atmos')) cluster.push(...seoMatrix.projects.atmos);
            if (path.includes('aros')) cluster.push(...seoMatrix.projects.aros);
            if (path.includes('universe')) cluster.push(...seoMatrix.projects.universe);
            if (path.includes('oro-avenue')) cluster.push(...seoMatrix.projects["oro-avenue"]);
            if (path.includes('first-avenue')) cluster.push(...seoMatrix.projects["first-avenue"]);
            if (path.includes('24k-espada')) cluster.push(...seoMatrix.projects["24k-espada"]);
            if (path.includes('sound-of-soul')) cluster.push(...seoMatrix.projects["sound-of-soul"]);
            if (path.includes('arezo')) cluster.push(...seoMatrix.projects.arezo);
            if (path.includes('duet')) cluster.push(...seoMatrix.projects.duet);
            if (path.includes('canvas')) cluster.push(...seoMatrix.projects.canvas);
            if (path.includes('echoes')) cluster.push(...seoMatrix.projects.echoes);
            if (path.includes('villas')) cluster.push(...seoMatrix.projects.villas);
        }

        // 3. Location & Region Keywords
        if (path.includes('location') || path.includes('projects')) {
            // Micro-markets
            if (path.includes('hinjewadi')) cluster.push(...seoMatrix.locations.hinjewadi);
            if (path.includes('marunji')) cluster.push(...seoMatrix.locations.marunji);
            if (path.includes('wakad')) cluster.push(...seoMatrix.locations.wakad);
            if (path.includes('tathawade')) cluster.push(...seoMatrix.locations.tathawade);
            if (path.includes('punawale')) cluster.push(...seoMatrix.locations.punawale);
            if (path.includes('baner')) cluster.push(...seoMatrix.locations.baner);
            if (path.includes('balewadi')) cluster.push(...seoMatrix.locations.balewadi);
            if (path.includes('bavdhan')) cluster.push(...seoMatrix.locations.bavdhan);
            if (path.includes('mahalunge')) cluster.push(...seoMatrix.locations.mahalunge);
            if (path.includes('bhugaon')) cluster.push(...seoMatrix.locations.bhugaon);

            // Macro-regions
            cluster.push(...seoMatrix.regions.west_pune);
            cluster.push(...seoMatrix.regions.pune);
        }

        // 4. NRI & Investment Keywords
        if (path.includes('nri') || path.includes('investment')) {
            cluster.push(...seoMatrix.investors.nri);
            cluster.push(...seoMatrix.buyer_intent);
        }

        // 5. Township, Lifestyle, Luxury & IT Hub Keywords
        if (path.includes('lifestyle') || path.includes('amenities') || path.includes('township')) {
            cluster.push(...seoMatrix.lifestyle.township);
        }
        
        // 6. Global Injectors (Applied to almost all core pages to maximize long-tail hits)
        if (path === '/' || path.includes('projects') || path.includes('location')) {
            cluster.push(...seoMatrix.it_hub);
            cluster.push(...seoMatrix.luxury);
            cluster.push(...seoMatrix.lifestyle.long_tail);
            cluster.push(...seoMatrix.lifestyle.mega_combinations);
            cluster.push(...seoMatrix.configurations.general);
        }

        // Deduplicate and return
        return [...new Set(cluster)].join(', ');
    };

    const pathKeywords = getPathSpecificKeywords(location.pathname);
    
    // De-duplicate and combine keywords from props and matrix
    const metaKeywords = keywords 
        ? `${keywords}, ${pathKeywords}` 
        : pathKeywords;

    const globalSchema = generateGlobalSchema(location.pathname);
    const navSchema = generateSiteNavigationSchema();
    
    // Auto-generate Breadcrumb schema if items are provided
    const breadcrumbSchema = breadcrumbItems 
        ? generateBreadcrumbSchema(breadcrumbItems)
        : location.pathname !== '/' 
            ? generateBreadcrumbSchema(
                location.pathname.split('/')
                    .filter(Boolean)
                    .reduce((acc, curr, idx, arr) => {
                        const path = '/' + arr.slice(0, idx + 1).join('/');
                        acc.push({ 
                            name: curr.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), 
                            item: path 
                        });
                        return acc;
                    }, [{ name: 'Home', item: '/' }])
              )
            : null;

    const allSchemas: any[] = [globalSchema, navSchema];
    if (breadcrumbSchema) allSchemas.push(breadcrumbSchema);
    if (schema) {
        if (Array.isArray(schema)) allSchemas.push(...schema);
        else allSchemas.push(schema);
    }

    return (
        <Helmet>
            {/* Basic Metadata */}
            <title>{finalTitle}</title>
            <meta name="google-site-verification" content="IAyC1c_sDzY_uqhpy2gKk-M0IlkQdxdM_UMA9ukAIWQ" />
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={fullCanonical} />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:site_name" content="Kolte Patil Life Republic" />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={DOMAIN + image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullCanonical} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={DOMAIN + image} />

            {/* Structured Data (JSON-LD) */}
            {allSchemas.map((s, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(s)}
                </script>
            ))}
        </Helmet>
    );
};

