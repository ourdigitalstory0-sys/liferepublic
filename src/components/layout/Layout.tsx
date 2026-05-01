import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingContact } from '../ui/FloatingContact';
import { Concierge } from '../ui/Concierge';
import { Breadcrumbs } from '../seo/Breadcrumbs';
import { SovereignConcierge } from '../ui/SovereignConcierge';
import { EnquiryModal } from '../ui/EnquiryModal';
import { NeuralSearch } from '../ui/NeuralSearch';
import { ResidentPulse } from '../ui/ResidentPulse';
import { ExitIntentModal } from '../ui/ExitIntentModal';
import { RecentlyViewed } from '../sections/RecentlyViewed';

interface LayoutProps {
  children: React.ReactNode;
  ariaLabel?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, ariaLabel }) => {
  const [enquiryProject, setEnquiryProject] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Neural Hub Event Synchronization v6.0
    const handleSovereignOpen = () => setIsSovereignOpen(true);
    const handleEnquiryOpen = (e: any) => {
        setEnquiryProject(e.detail?.projectName);
        setIsEnquiryOpen(true);
    };
    const handleSearchOpen = () => setIsSearchOpen(true);
    
    window.addEventListener('open-sovereign-concierge', handleSovereignOpen);
    window.addEventListener('open-enquiry-modal', handleEnquiryOpen as any);
    window.addEventListener('open-neural-search', handleSearchOpen);

    // Global Command Logic: Command + K (Search) / Command + J (Concierge)
    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey)) {
            if (e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(prev => !prev);
            }
            if (e.key === 'j') {
                e.preventDefault();
                setIsSovereignOpen(prev => !prev);
            }
        }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Strategic Engagement Trigger (Context-Aware)
    const timer = setTimeout(() => {
      const hasShownPopup = sessionStorage.getItem('lr_sovereign_engagement_v6');
      if (!hasShownPopup) {
        setIsSovereignOpen(true); // Default to Concierge for 2026 AI-first UX
        sessionStorage.setItem('lr_sovereign_engagement_v6', 'true');
      }
    }, 15000); // 15s dwell time trigger

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-sovereign-concierge', handleSovereignOpen);
      window.removeEventListener('open-enquiry-modal', handleEnquiryOpen);
      window.removeEventListener('open-neural-search', handleSearchOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-accent selection:text-secondary overflow-x-hidden">
      {/* Sovereign Residents Pulse Ticker */}
      <ResidentPulse />
      
      <Navbar />
      
      <main className="flex-grow pt-20" aria-label={ariaLabel}>
        <div className="container mx-auto px-4">
          <Breadcrumbs />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={window.location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "circOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>

        {/* Neural Path Personalization Overlay */}
        <RecentlyViewed />
      </main>

      <Footer />
      
      {/* Global UI Hardening Layer */}
      <FloatingContact />
      <Concierge />
      
      <SovereignConcierge 
        isOpen={isSovereignOpen} 
        onClose={() => setIsSovereignOpen(false)} 
      />
      
      <EnquiryModal 
        isOpen={isEnquiryOpen}
        onClose={() => {
            setIsEnquiryOpen(false);
            setEnquiryProject(undefined);
        }}
        projectName={enquiryProject}
      />
      
      <NeuralSearch 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <ExitIntentModal />
    </div>
  );
};
