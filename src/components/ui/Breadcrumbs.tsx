import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // Don't show on home page
    if (pathnames.length === 0) return null;

    const generateBreadcrumbSchema = () => {
        const items = pathnames.map((_, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            return {
                "@type": "ListItem",
                "position": index + 2,
                "name": pathnames[index].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                "item": `https://life-republic.in${routeTo}`
            };
        });

        const schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://life-republic.in"
                },
                ...items
            ]
        };

        return JSON.stringify(schema);
    };

    return (
        <nav aria-label="Breadcrumb" className="bg-gray-100 py-3 px-4 border-b border-gray-200">
            <script type="application/ld+json">
                {generateBreadcrumbSchema()}
            </script>
            <ol className="flex items-center space-x-2 text-sm text-gray-600 container mx-auto">
                <li>
                    <Link to="/" className="hover:text-accent flex items-center">
                        <Home size={14} />
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    const name = value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

                    return (
                        <li key={name} className="flex items-center">
                            <ChevronRight size={14} className="mx-1 text-gray-400" />
                            {isLast ? (
                                <span className="font-semibold text-gray-800" aria-current="page">
                                    {name}
                                </span>
                            ) : (
                                <Link to={routeTo} className="hover:text-accent">
                                    {name}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
