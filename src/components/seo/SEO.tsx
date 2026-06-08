import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { generateGlobalSchema, generateSiteNavigationSchema, generateBreadcrumbSchema } from '../../utils/schemaGenerator';
import { generateCanonicalURL } from '../../lib/seo-utils';

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
        : `${siteTitle} | Official Premium Township | ${locationSuffix}`;

    // Ensure it doesn't get too crazy long for Google (keep under 60-70 chars)
    const finalTitle = fullTitle.length > 70 ? fullTitle.substring(0, 67) + '...' : fullTitle;

    const defaultDescription =
        'Explore Kolte Patil Life Republic Hinjewadi, a 390-acre premium township in Pune. RERA-registered 1, 2, 3 BHK flats & 4 BHK villas near Rajiv Gandhi IT Park.';
    const metaDescription = description || defaultDescription;

    const location = useLocation();
    const currentPath = location.pathname + location.search;
    const fullCanonical = generateCanonicalURL(canonical || currentPath);
    
    // Configuration-intelligent Keyword Injection
    const getPathSpecificKeywords = (path: string) => {
        const segments = path.split('/').filter(Boolean);
        if (path.includes('2-bhk')) return "2 BHK flats Hinjewadi, 2 BHK in Life Republic, buy 2BHK Pune west, 2 BHK price list Hinjewadi";
        if (path.includes('3-bhk')) return "3 BHK flats Hinjewadi, 3 BHK in Life Republic, luxury 3BHK Pune, 3 BHK price list Hinjewadi";
        if (path.includes('4-bhk')) return "4 BHK luxury apartments Life Republic, 4 BHK villas Hinjewadi, ultra luxury 4BHK Pune";
        if (path.includes('1-bhk')) return "1 BHK in Life Republic, small flats Hinjewadi, 1 BHK investment Pune";
        if (path.includes('nri')) return "NRI investment Pune, buy property from USA, FEMA repatriation rules, Life Republic ROI";
        
        // Auto-generate keywords for location pages
        if (path.includes('/location/')) {
            const place = segments[segments.length - 1].replace(/-/g, ' ');
            return `flats in ${place}, apartments near ${place}, property in ${place} Pune, Hinjewadi real estate ${place}`;
        }
        return "";
    };

    const pathKeywords = getPathSpecificKeywords(location.pathname);
    const baseKeywords = "Kolte Patil Life Republic Hinjewadi, Kolte Patil Life Republic, Life Republic Hinjewadi, Kolte Patil Hinjewadi, Life Republic Pune, buy flat in hinjewadi, luxury villas pune";
    
    const metaKeywords = keywords 
        ? `${keywords}${pathKeywords ? `, ${pathKeywords}` : ''}` 
        : `${baseKeywords}${pathKeywords ? `, ${pathKeywords}` : ''}`;

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

