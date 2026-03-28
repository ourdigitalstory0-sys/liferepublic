import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { generateGlobalSchema, generateSiteNavigationSchema } from '../../utils/schemaGenerator';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    image?: string;
    type?: 'website' | 'article' | 'product';
    schema?: Record<string, unknown> | Record<string, unknown>[];
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
}) => {
    const siteTitle = 'Kolte Patil Life Republic';
    const locationSuffix = 'Hinjewadi Pune';
    
    // De-duplicate branding and location more aggressively
    const cleanTitle = title?.replace(/Kolte Patil|Life Republic|Hinjewadi|Pune/g, '').replace(/^[\s|:-]+|[\s|:-]+$/g, '');
    const fullTitle = title 
        ? title.includes(siteTitle) ? title : `${siteTitle} | ${cleanTitle} | Official Site`
        : `${siteTitle} Township | ${locationSuffix} | Official Site`;

    // Ensure it doesn't get too crazy long for Google
    const finalTitle = fullTitle.length > 70 ? fullTitle.substring(0, 67) + '...' : fullTitle;

    const defaultDescription =
        'Kolte Patil Life Republic Hinjewadi is a 390-acre integrated township in Pune. Explore RERA-registered 1, 2, 3 BHK flats, 4 BHK villas, and premium row houses near Rajiv Gandhi IT Park.';
    const metaDescription = description || defaultDescription;

    const location = useLocation();
    const currentPath = location.pathname;
    
    // Configuration-intelligent Keyword Injection
    const getPathSpecificKeywords = (path: string) => {
        if (path.includes('2-bhk')) return "2 BHK flats Hinjewadi, 2 BHK in Life Republic, buy 2BHK Pune west, 2 BHK price list Hinjewadi";
        if (path.includes('3-bhk')) return "3 BHK flats Hinjewadi, 3 BHK in Life Republic, luxury 3BHK Pune, 3 BHK price list Hinjewadi";
        if (path.includes('4-bhk')) return "4 BHK luxury apartments Life Republic, 4 BHK villas Hinjewadi, ultra luxury 4BHK Pune";
        if (path.includes('1-bhk')) return "1 BHK in Life Republic, small flats Hinjewadi, 1 BHK investment Pune";
        if (path.includes('nri')) return "NRI investment Pune, buy property from USA, FEMA repatriation rules, Life Republic ROI";
        return "";
    };

    const pathKeywords = getPathSpecificKeywords(currentPath);
    const defaultKeywords = "Kolte Patil Life Republic, Life Republic Hinjewadi, Life Republic Township, Kolte Patil Hinjewadi, Hinjewadi properties, Pune integrated township, buy flat in hinjewadi, luxury villas pune, 2 bhk near hinjewadi phase 1, rera projects hinjewadi";
    
    const metaKeywords = keywords 
        ? `${keywords}${pathKeywords ? `, ${pathKeywords}` : ''}` 
        : `${defaultKeywords}${pathKeywords ? `, ${pathKeywords}` : ''}`;

    const globalSchema = generateGlobalSchema(currentPath);
    const navSchema = generateSiteNavigationSchema();

    const allSchemas: any[] = [globalSchema, navSchema];
    if (schema) {
        if (Array.isArray(schema)) allSchemas.push(...schema);
        else allSchemas.push(schema);
    }

    const fullCanonical = canonical
        ? `${DOMAIN}${canonical.startsWith('/') ? '' : '/'}${canonical}`
        : DOMAIN + currentPath;

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
