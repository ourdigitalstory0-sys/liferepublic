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
import { EnquiryModal } from '../ui/EnquiryModal';

export const Layout: React.FC<LayoutProps> = ({ children, ariaLabel }) => {
  const [isSovereignOpen, setIsSovereignOpen] = React.useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = React.useState(false);

  React.useEffect(() => {
    const handleOpen = () => setIsSovereignOpen(true);
    const handleEnquiryOpen = () => setIsEnquiryOpen(true);
    window.addEventListener('open-sovereign-concierge', handleOpen);
    window.addEventListener('open-enquiry-modal', handleEnquiryOpen);

    // Auto-popup logic (10s delay, once per session)
    const timer = setTimeout(() => {
      const hasShownPopup = sessionStorage.getItem('enquiry_popup_shown_v2');
      if (!hasShownPopup) {
        setIsEnquiryOpen(true);
        sessionStorage.setItem('enquiry_popup_shown_v2', 'true');
      }
    }, 10000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-sovereign-concierge', handleOpen);
      window.removeEventListener('open-enquiry-modal', handleEnquiryOpen);
    };
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
      <EnquiryModal 
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
};
