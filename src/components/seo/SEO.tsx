import React from 'react';
import { Helmet } from 'react-helmet-async';

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
    image = 'https://liferepublic.in/images/gallery/eros/master-layout.webp',
    type = 'website',
    schema,
}) => {
    const siteTitle = 'Kolte Patil Life Republic Township Hinjewadi';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    const defaultDescription =
        'Kolte Patil Life Republic Township Hinjewadi is a premium 390+ acre integrated township in Pune. Explore luxury 1, 2, 3 BHK flats, 4 BHK villas, and row houses near Rajiv Gandhi IT Park. Real Estate Projects in Hinjewadi.';
    const metaDescription = description || defaultDescription;

    // Fallback global keywords if not provided prop-wise
    const defaultKeywords = "Kolte Patil Life Republic Township Hinjewadi, life republic hinjewadi, life republic township, kolte patil hinjewadi, hinjewadi properties, real estate projects in hinjewadi, luxury properties in hinjewadi, kolte patil township hinjewadi";
    const metaKeywords = keywords || defaultKeywords;

    const fullCanonical = canonical
        ? `${DOMAIN}${canonical}`
        : DOMAIN + window.location.pathname;

    return (
        <Helmet>
            {/* Basic Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={fullCanonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullCanonical} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={image} />

            {/* Structured Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};
