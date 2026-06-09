import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

interface SmoothScrollingProps {
    children: ReactNode;
}

export const SmoothScrolling = ({ children }: SmoothScrollingProps) => {
    if (typeof window === 'undefined') {
        return <>{children}</>;
    }

    return (
        <ReactLenis root>
            {children}
        </ReactLenis>
    );
};
