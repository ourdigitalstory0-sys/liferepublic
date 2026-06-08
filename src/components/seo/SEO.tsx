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
    
    // Advanced Keyword Matrix Routing
    const getPathSpecificKeywords = (path: string) => {
        const segments = path.split('/').filter(Boolean);
        let cluster = [];
        
        // 1. Configuration Keywords
        if (path.includes('1-bhk')) cluster.push("Life Republic 1 BHK, 1 BHK in Life Republic, small flats Hinjewadi, Life Republic Flats for Sale");
        if (path.includes('2-bhk')) cluster.push("Life Republic 2 BHK, 2 BHK flats Hinjewadi, Hinjewadi 2 BHK, Life Republic Affordable Homes");
        if (path.includes('3-bhk')) cluster.push("Life Republic 3 BHK, 3 BHK flats Hinjewadi, Hinjewadi 3 BHK, Premium 3 BHK in Hinjewadi Pune");
        if (path.includes('4-bhk')) cluster.push("Life Republic 4 BHK, 4 BHK villas Hinjewadi, Life Republic Luxury Homes, Luxury Family Homes Pune");
        
        // 2. Project/Cluster Specific
        if (path.includes('projects')) {
            cluster.push("Life Republic Apartments, Life Republic New Launch, Life Republic Premium Residences, Hinjewadi Residential Projects, Best Residential Project Pune");
            if (path.includes('atmos')) cluster.push("Life Republic Atmos, Life Republic Cluster Apartments");
            if (path.includes('aros')) cluster.push("Life Republic Aros, Life Republic Premium Towers");
            if (path.includes('universe')) cluster.push("Life Republic Universe, Life Republic Sector Homes");
            if (path.includes('oro-avenue')) cluster.push("Life Republic Oro Avenue, Life Republic Township Clusters");
            if (path.includes('first-avenue')) cluster.push("Life Republic First Avenue, Life Republic Township Clusters");
            if (path.includes('24k-espada')) cluster.push("Life Republic 24K Espada, Luxury gated community in West Pune");
        }

        // 3. Location & IT Hub Keywords
        if (path.includes('/location/')) {
            const place = segments[segments.length - 1].replace(/-/g, ' ');
            cluster.push(`Property Near Hinjewadi IT Park, Apartments Near Rajiv Gandhi Infotech Park, Homes Near Infosys Hinjewadi, Hinjewadi Real Estate Growth, flats near ${place}`);
            if (path.includes('hinjewadi')) cluster.push("Hinjewadi Pune Real Estate, Hinjewadi Property Market, Hinjewadi Investment Opportunities");
            if (path.includes('marunji')) cluster.push("Marunji Pune Real Estate, Marunji Property Market, Kolte Patil Life Republic Marunji");
            if (path.includes('wakad') || path.includes('tathawade')) cluster.push("West Pune Real Estate, West Pune Property Market, West Pune Investment Properties");
        }

        // 4. NRI & Investment Keywords
        if (path.includes('nri')) {
            cluster.push("Pune Real Estate Investment, Hinjewadi Property Investment, NRI investment Pune, High ROI Property Hinjewadi Pune, Pune Property Appreciation");
        }

        // 5. Township & Lifestyle Keywords
        if (path.includes('lifestyle') || path.includes('amenities') || path.includes('township')) {
            cluster.push("Life Republic Integrated Township, Life Republic Smart Township, Pune Smart City Real Estate, Best Township in Pune, Sustainable township in Pune");
        }

        return cluster.join(', ');
    };

    const pathKeywords = getPathSpecificKeywords(location.pathname);
    const baseKeywords = "Kolte Patil Life Republic, Life Republic Hinjewadi, Life Republic Pune, Kolte Patil Township Pune, Kolte Patil Life Republic Township";
    
    // De-duplicate and combine keywords
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

