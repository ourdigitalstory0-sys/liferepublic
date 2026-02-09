import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

interface SmoothScrollingProps {
    children: ReactNode;
}

export const SmoothScrolling = ({ children }: SmoothScrollingProps) => {
    return (
        <ReactLenis root>
            {children}
        </ReactLenis>
    );
};
