import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import { Amenities } from './pages/Amenities';
import { Contact } from './pages/Contact';
import ProjectDetails from './pages/ProjectDetails';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { LocationHighlights } from './pages/LocationHighlights';
import { Lifestyle } from './pages/Lifestyle';
import { TwoBHK } from './pages/landing/TwoBHK';
import { ThreeBHK } from './pages/landing/ThreeBHK';
import { FourBHK } from './pages/landing/FourBHK';
import { NRICorner } from './pages/NRICorner';
import { Testimonials } from './pages/Testimonials';
import { TownshipGuide } from './pages/TownshipGuide';
import { MediaCenter } from './pages/MediaCenter';
import { BlogPostPage } from './pages/BlogPost';
import { ConnectivityHub } from './pages/ConnectivityHub';
import { TownshipIntelligence } from './pages/TownshipIntelligence';
import { HyperLocalLanding } from './pages/HyperLocalLanding';
import { NRIInvestmentHub } from './pages/NRIInvestmentHub';
import { Sustainability } from './pages/Sustainability';
import { CommunityForum } from './pages/CommunityForum';
import { LocationLanding } from './pages/LocationLanding';
import { NotFound } from './pages/NotFound';
import HTMLSitemap from './pages/HTMLSitemap';

// Keep layout components static as they are used on every page
import { FloatingContact } from './components/ui/FloatingContact';
import { Layout } from './components/layout/Layout';
import { SmoothScrolling } from './components/layout/SmoothScrolling';
import { ExitIntentOffer } from './components/ui/ExitIntentOffer';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

// Lazy load Admin components
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminSignup } from './pages/admin/AdminSignup';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLayout } from './components/admin/AdminLayout';
import { ImageManager } from './components/admin/ImageManager';

import { motion, AnimatePresence } from 'framer-motion';

export const PageLoader = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="min-h-screen flex flex-col items-center justify-center bg-primary fixed inset-0 z-[1000]"
  >
    <div className="w-full max-w-xs px-8">
      {/* Premium minimal expanding line loader */}
      <div className="w-full h-[1px] bg-gray-200 relative overflow-hidden">
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full bg-accent"
        />
      </div>
      
      <div className="mt-8 flex flex-col items-center space-y-3">
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[10px] font-bold text-secondary uppercase tracking-[0.8em]"
        >
          Kolte Patil
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[9px] font-light text-gray-400 uppercase tracking-[0.5em]"
        >
          Life Republic
        </motion.div>
      </div>
    </div>
  </motion.div>
);

function App() {
  const location = useLocation();

  useEffect(() => {
    if (!sessionStorage.getItem('lr_entry_page')) {
      sessionStorage.setItem('lr_entry_page', window.location.pathname);
    }
  }, []);

  return (
    <SmoothScrolling>
      <ExitIntentOffer />
      <FloatingContact />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={
              <Layout ariaLabel="Kolte Patil Life Republic Township Hinjewadi">
                <Home />
              </Layout>
            } />
            <Route path="/projects" element={
              <Layout ariaLabel="Kolte Patil Life Republic Township Hinjewadi Gallery">
                <Projects />
              </Layout>
            } />
            <Route path="/projects/:id" element={
              <Layout ariaLabel="Kolte Patil Life Republic Township Project Monograph">
                <ProjectDetails />
              </Layout>
            } />
            <Route path="/amenities" element={
              <Layout ariaLabel="Kolte Patil Life Republic Township Amenities">
                <Amenities />
              </Layout>
            } />
            <Route path="/contact" element={
              <Layout ariaLabel="Contact Kolte Patil Life Republic">
              <Contact />
            </Layout>
          } />
          <Route path="/about" element={
            <Layout ariaLabel="About Kolte Patil Life Republic">
              <About />
            </Layout>
          } />
          <Route path="/privacy" element={
            <Layout ariaLabel="Privacy Policy | Life Republic">
              <Privacy />
            </Layout>
          } />
          <Route path="/terms" element={
            <Layout ariaLabel="Terms & Conditions | Life Republic">
              <Terms />
            </Layout>
          } />
          <Route path="/location" element={
            <Layout ariaLabel="Hinjewadi Location Guide & Strategic Infrastructure">
              <LocationHighlights />
            </Layout>
          } />
          <Route path="/connectivity" element={
            <Layout ariaLabel="Life Republic Connectivity & Infrastructure">
              <ConnectivityHub />
            </Layout>
          } />

          {/* Micro-Landing Pages */}
          <Route path="/2-bhk-flats-in-hinjewadi" element={
            <Layout ariaLabel="2 BHK Flats in Hinjewadi">
              <TwoBHK />
            </Layout>
          } />
          <Route path="/3-bhk-flats-in-hinjewadi" element={
            <Layout ariaLabel="3 BHK Flats in Hinjewadi">
              <ThreeBHK />
            </Layout>
          } />
          <Route path="/4-bhk-flats-in-hinjewadi" element={
            <Layout ariaLabel="4 BHK Flats in Hinjewadi">
              <FourBHK />
            </Layout>
          } />
          <Route path="/1-bhk-flats-in-hinjewadi" element={
            <Layout ariaLabel="1 BHK Flats in Hinjewadi">
              <Projects />
            </Layout>
          } />
          <Route path="/row-houses-in-life-republic" element={
            <Layout ariaLabel="Row Houses in Life Republic">
              <Projects />
            </Layout>
          } />
          <Route path="/plots-in-hinjewadi" element={
            <Layout ariaLabel="Plots in Hinjewadi">
              <Projects />
            </Layout>
          } />
          <Route path="/luxury-villas-near-hinjewadi" element={
            <Layout ariaLabel="Luxury Villas near Hinjewadi">
              <Projects />
            </Layout>
          } />

          {/* Location SEO Landing Pages */}
          <Route path="/location/flats-near-hinjewadi" element={
            <Layout ariaLabel="Flats near Hinjewadi Phase 1">
              <LocationLanding
                locationName="Hinjewadi Phase 1"
                distance="5 mins"
                commuteTime="10 mins"
                slug="flats-near-hinjewadi"
              />
            </Layout>
          } />
          <Route path="/location/flats-near-tathawade" element={
            <Layout ariaLabel="Flats near Tathawade">
              <LocationLanding
                locationName="Tathawade"
                distance="10 mins"
                commuteTime="15 mins"
                slug="flats-near-tathawade"
              />
            </Layout>
          } />
          <Route path="/location/flats-near-punawale" element={
            <Layout ariaLabel="Flats near Punawale">
              <LocationLanding
                locationName="Punawale"
                distance="7 mins"
                commuteTime="12 mins"
                slug="flats-near-punawale"
              />
            </Layout>
          } />
          <Route path="/location/flats-near-wakad" element={
            <Layout ariaLabel="Flats near Wakad Hinjewadi Road">
              <LocationLanding
                locationName="Wakad"
                distance="12 mins"
                commuteTime="20 mins"
                slug="flats-near-wakad"
              />
            </Layout>
          } />
          <Route path="/location/flats-near-marunji" element={
            <Layout ariaLabel="Flats near Marunji Road Hinjewadi">
              <LocationLanding
                locationName="Marunji"
                distance="0 mins"
                commuteTime="Walking Distance"
                slug="flats-near-marunji"
              />
            </Layout>
          } />

          {/* Dynamic Sector/Locality Landing Pages */}
          <Route path="/location/:slug" element={
            <Layout ariaLabel="Sovereign Sector Landing Page">
              <HyperLocalLanding />
            </Layout>
          } />

          {/* HTML Sitemap */}
          <Route path="/sitemap" element={
            <Layout ariaLabel="Sovereign Site Directory">
              <HTMLSitemap />
            </Layout>
          } />

          {/* Phase 4 Routes */}
          <Route path="/nri-corner" element={
            <Layout ariaLabel="NRI Corner & Global Investment Desk">
              <NRICorner />
            </Layout>
          } />
          <Route path="/township-intelligence" element={
            <Layout ariaLabel="Hinjewadi Township Intelligence & Infrastructure Hub">
              <TownshipIntelligence />
            </Layout>
          } />
          <Route path="/nri-investment-guide" element={
            <Layout ariaLabel="Kolte Patil Life Republic NRI Investment Guide">
              <NRIInvestmentHub />
            </Layout>
          } />
          <Route path="/testimonials" element={
            <Layout ariaLabel="Resident Testimonials & Success Stories">
              <Testimonials />
            </Layout>
          } />
          <Route path="/township-guide" element={
            <Layout ariaLabel="The Ultimate Guide to Kolte Patil Life Republic Hinjewadi">
              <TownshipGuide />
            </Layout>
          } />
          <Route path="/media-center" element={
            <Layout ariaLabel="Media Center & Press Monographs">
              <MediaCenter />
            </Layout>
          } />
          <Route path="/media-center/:slug" element={
            <Layout ariaLabel="Sovereign Media Monograph">
              <BlogPostPage />
            </Layout>
          } />
          <Route path="/lifestyle" element={
            <Layout ariaLabel="Life at Life Republic - 390 Acre Township">
              <Lifestyle />
            </Layout>
          } />
          <Route path="/sustainability" element={
            <Layout ariaLabel="Sustainability & Green Initiatives at Life Republic">
              <Sustainability />
            </Layout>
          } />
          <Route path="/community-hub" element={
            <Layout ariaLabel="Resident Hub & Community Forum at Life Republic">
              <CommunityForum />
            </Layout>
          } />
          {/* Admin Routes */}
          <Route path="/admin/login" element={
            <Suspense fallback={<PageLoader />}>
              <AdminLogin />
            </Suspense>
          } />
          <Route path="/admin/signup" element={
            <Suspense fallback={<PageLoader />}>
              <AdminSignup />
            </Suspense>
          } />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={
              <Suspense fallback={<PageLoader />}>
                <AdminLayout />
              </Suspense>
            }>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={
                <Suspense fallback={<PageLoader />}>
                  <AdminDashboard />
                </Suspense>
              } />
              <Route path="images" element={
                <Suspense fallback={<PageLoader />}>
                  <div className="p-8"><h1 className="text-2xl font-bold font-serif mb-6">Image Manager</h1><ImageManager /></div>
                </Suspense>
              } />
            </Route>
          </Route>

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </AnimatePresence>
    </SmoothScrolling>
  );
}

export default App;
