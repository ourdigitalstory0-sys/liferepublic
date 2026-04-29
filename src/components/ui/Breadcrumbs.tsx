import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
    hideSchema?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // Don't show on home page
    if (pathnames.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className="bg-gray-100/50 backdrop-blur-sm py-4 px-4 border-b border-gray-200">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 container mx-auto overflow-x-auto whitespace-nowrap scrollbar-hide">
                <li className="flex-shrink-0">
                    <Link to="/" className="hover:text-accent flex items-center transition-colors">
                        <Home size={14} className="mr-1" />
                        <span className="hidden sm:inline">Home</span>
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    const name = value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

                    return (
                        <li key={name} className="flex items-center flex-shrink-0">
                            <ChevronRight size={14} className="mx-2 text-gray-400" />
                            {isLast ? (
                                <span className="font-semibold text-secondary truncate max-w-[200px]" aria-current="page">
                                    {name}
                                </span>
                            ) : (
                                <Link to={routeTo} className="hover:text-accent transition-colors">
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
