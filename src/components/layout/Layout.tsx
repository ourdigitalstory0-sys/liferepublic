import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingContact } from '../ui/FloatingContact';
import { Concierge } from '../ui/Concierge';

interface LayoutProps {
  children: React.ReactNode;
  ariaLabel?: string;
}

import { SovereignConcierge } from '../ui/SovereignConcierge';

export const Layout: React.FC<LayoutProps> = ({ children, ariaLabel }) => {
  const [isSovereignOpen, setIsSovereignOpen] = React.useState(false);

  React.useEffect(() => {
    const handleOpen = () => setIsSovereignOpen(true);
    window.addEventListener('open-sovereign-concierge', handleOpen);
    return () => window.removeEventListener('open-sovereign-concierge', handleOpen);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-20" aria-label={ariaLabel}>
        {children}
      </main>
      <Footer />
      <FloatingContact />
      <Concierge />
      <SovereignConcierge 
        isOpen={isSovereignOpen} 
        onClose={() => setIsSovereignOpen(false)} 
      />
    </div>
  );
};
