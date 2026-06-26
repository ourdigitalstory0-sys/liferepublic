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
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true, syncTouch: true }}>
            {children}
        </ReactLenis>
    );
};
