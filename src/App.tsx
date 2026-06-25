import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
// Lazy load public pages for Route-Level Code Splitting (Phase 8 Optimization)
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Amenities = lazy(() => import('./pages/Amenities').then(module => ({ default: module.Amenities })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Privacy = lazy(() => import('./pages/Privacy').then(module => ({ default: module.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then(module => ({ default: module.Terms })));
const LocationHighlights = lazy(() => import('./pages/LocationHighlights').then(module => ({ default: module.LocationHighlights })));
const Lifestyle = lazy(() => import('./pages/Lifestyle').then(module => ({ default: module.Lifestyle })));
const TwoBHK = lazy(() => import('./pages/landing/TwoBHK').then(module => ({ default: module.TwoBHK })));
const ThreeBHK = lazy(() => import('./pages/landing/ThreeBHK').then(module => ({ default: module.ThreeBHK })));
const FourBHK = lazy(() => import('./pages/landing/FourBHK').then(module => ({ default: module.FourBHK })));
const NRICorner = lazy(() => import('./pages/NRICorner').then(module => ({ default: module.NRICorner })));
const Testimonials = lazy(() => import('./pages/Testimonials').then(module => ({ default: module.Testimonials })));
const TownshipGuide = lazy(() => import('./pages/TownshipGuide').then(module => ({ default: module.TownshipGuide })));
const MediaCenter = lazy(() => import('./pages/MediaCenter').then(module => ({ default: module.MediaCenter })));
const BlogPostPage = lazy(() => import('./pages/BlogPost').then(module => ({ default: module.BlogPostPage })));
const ConnectivityHub = lazy(() => import('./pages/ConnectivityHub').then(module => ({ default: module.ConnectivityHub })));
const TownshipIntelligence = lazy(() => import('./pages/TownshipIntelligence').then(module => ({ default: module.TownshipIntelligence })));
const HyperLocalLanding = lazy(() => import('./pages/HyperLocalLanding').then(module => ({ default: module.HyperLocalLanding })));
const NRIInvestmentHub = lazy(() => import('./pages/NRIInvestmentHub').then(module => ({ default: module.NRIInvestmentHub })));
const Sustainability = lazy(() => import('./pages/Sustainability').then(module => ({ default: module.Sustainability })));
const CommunityForum = lazy(() => import('./pages/CommunityForum').then(module => ({ default: module.CommunityForum })));
const LocationLanding = lazy(() => import('./pages/LocationLanding').then(module => ({ default: module.LocationLanding })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));
const HTMLSitemap = lazy(() => import('./pages/HTMLSitemap'));

// Keep layout components static as they are used on every page
import { FloatingContact } from './components/ui/FloatingContact';
import { Layout } from './components/layout/Layout';
import { SmoothScrolling } from './components/layout/SmoothScrolling';
import { ExitIntentOffer } from './components/ui/ExitIntentOffer';
import { TownshipAgent } from './components/sections/TownshipAgent';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

// Lazy load Admin components
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminSignup } from './pages/admin/AdminSignup';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLayout } from './components/admin/AdminLayout';
import { ImageManager } from './components/admin/ImageManager';

// Premium Loading Component for Suspense Boundary
export const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white fixed inset-0 z-[1000]">
    <div className="relative">
      <div className="w-32 h-32 border-[1px] border-accent/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 border-t-2 border-accent rounded-full animate-spin"></div>
      </div>
    </div>
    <div className="mt-12 space-y-4 text-center">
      <div className="text-[10px] font-bold text-secondary uppercase tracking-[0.8em] animate-pulse">Synthesizing Architecture</div>
      <div className="text-[9px] font-medium text-gray-400 uppercase tracking-[0.4em]">Life Republic v5.5</div>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    if (!sessionStorage.getItem('lr_entry_page')) {
      sessionStorage.setItem('lr_entry_page', window.location.pathname);
    }
  }, []);

  return (
    <SmoothScrolling>
      <Helmet>
        <meta name="google-site-verification" content="IAyC1c_sDzY_uqhpy2gKk-M0IlkQdxdM_UMA9ukAIWQ" />
        <meta name="msvalidate.01" content="BING_VERIFICATION_PLACEHOLDER" />
        <meta name="p:domain_verify" content="PINTEREST_VERIFICATION_PLACEHOLDER" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://life-republic.in" />
      </Helmet>
      <ExitIntentOffer />
      <TownshipAgent />
      <FloatingContact />
      <Suspense fallback={<PageLoader />}>
        <Routes>
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
    </SmoothScrolling>
  );
}

export default App;
