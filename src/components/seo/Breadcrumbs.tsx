import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    path: string;
}

const ROUTE_LABELS: Record<string, string> = {
    'projects': 'Projects',
    'amenities': 'Amenities',
    'contact': 'Contact',
    'about': 'About',
    'privacy': 'Privacy Policy',
    'terms': 'Terms',
    'location': 'Location',
    'connectivity': 'Connectivity',
    'lifestyle': 'Lifestyle',
    'sustainability': 'Sustainability',
    'community-hub': 'Community Hub',
    'nri-corner': 'NRI Corner',
    'nri-investment-guide': 'NRI Investment Guide',
    'testimonials': 'Testimonials',
    'township-guide': 'Township Guide',
    'township-intelligence': 'Township Intelligence',
    'media-center': 'Media Center',
};

function slugToLabel(slug: string): string {
    return ROUTE_LABELS[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    if (pathSegments.length === 0) return null;

    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Home', path: '/' },
    ];

    let currentPath = '';
    pathSegments.forEach((segment) => {
        currentPath += `/${segment}`;
        breadcrumbs.push({ label: slugToLabel(segment), path: currentPath });
    });

    const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': item.label,
            'item': `https://life-republic.in${item.path}`,
        })),
    };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
            </Helmet>
            <nav aria-label="Breadcrumb" className="py-3 px-4 text-xs text-gray-400">
                <ol className="flex items-center flex-wrap gap-1" itemScope itemType="https://schema.org/BreadcrumbList">
                    {breadcrumbs.map((item, index) => (
                        <li key={item.path} className="flex items-center gap-1" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                            {index < breadcrumbs.length - 1 ? (
                                <>
                                    <Link to={item.path} className="hover:text-accent transition-colors" itemProp="item">
                                        {index === 0 ? <Home size={12} /> : <span itemProp="name">{item.label}</span>}
                                    </Link>
                                    <ChevronRight size={10} className="text-gray-300" />
                                </>
                            ) : (
                                <span className="text-gray-600 font-medium" itemProp="name">{item.label}</span>
                            )}
                            <meta itemProp="position" content={String(index + 1)} />
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
};
