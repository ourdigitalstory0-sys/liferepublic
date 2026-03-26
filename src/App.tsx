import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import { Amenities } from './pages/Amenities';
import { Contact } from './pages/Contact';
import ProjectDetails from './pages/ProjectDetails';
import { FloatingContact } from './components/ui/FloatingContact';
import { Layout } from './components/layout/Layout';
import { SmoothScrolling } from './components/layout/SmoothScrolling';
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
import { MediaCenter } from './pages/MediaCenter';
import { BlogPostPage } from './pages/BlogPost';
import { ConnectivityHub } from './pages/ConnectivityHub';
import { TownshipIntelligence } from './pages/TownshipIntelligence';
import { NRIInvestmentHub } from './pages/NRIInvestmentHub';
import { Sustainability } from './pages/Sustainability';
import { CommunityForum } from './pages/CommunityForum';
// Lazy load Admin components
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(module => ({ default: module.AdminLogin })));
const AdminSignup = lazy(() => import('./pages/admin/AdminSignup').then(module => ({ default: module.AdminSignup })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout').then(module => ({ default: module.AdminLayout })));
const ImageManager = lazy(() => import('./components/admin/ImageManager').then(module => ({ default: module.ImageManager })));

// Loading Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);
import { ExitIntentModal } from './components/ui/ExitIntentModal';
import { LocationLanding } from './pages/LocationLanding';
import { SectorLanding } from './pages/SectorLanding';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <SmoothScrolling>
      <Router>
        <ExitIntentModal />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <Layout ariaLabel="Kolte Patil Life Republic Township Hinjewadi">
              <Home />
            </Layout>
          } />
          <Route path="/projects" element={
            <Layout ariaLabel="Kolte Patil Life Republic Township Hinjewadi">
              <Projects />
            </Layout>
          } />
          <Route path="/projects/:id" element={
            <Layout ariaLabel="Kolte Patil Life Republic Township Hinjewadi">
              <ProjectDetails />
            </Layout>
          } />
          <Route path="/amenities" element={
            <Layout ariaLabel="Kolte Patil Life Republic Township Hinjewadi">
              <Amenities />
            </Layout>
          } />
          <Route path="/contact" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20" aria-label="Kolte Patil Life Republic Township Hinjewadi">
                <Contact />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/about" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20" aria-label="Kolte Patil Life Republic Township Hinjewadi">
                <About />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/privacy" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20" aria-label="Kolte Patil Life Republic Township Hinjewadi">
                <Privacy />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/terms" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20" aria-label="Kolte Patil Life Republic Township Hinjewadi">
                <Terms />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/location" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20" aria-label="Hinjewadi Location Guide">
                <LocationHighlights />
              </main>
              <Footer />
              <FloatingContact />
            </div>
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

          {/* Location SEO Landing Pages - Deep Web Data Implementation */}
          <Route path="/location/flats-near-hinjewadi" element={
            <Layout>
              <LocationLanding
                locationName="Hinjewadi Phase 1"
                distance="5 mins"
                commuteTime="10 mins"
                slug="flats-near-hinjewadi"
              />
            </Layout>
          } />
          <Route path="/location/flats-near-tathawade" element={
            <Layout>
              <LocationLanding
                locationName="Tathawade"
                distance="10 mins"
                commuteTime="15 mins"
                slug="flats-near-tathawade"
              />
            </Layout>
          } />
          <Route path="/location/flats-near-punawale" element={
            <Layout>
              <LocationLanding
                locationName="Punawale"
                distance="7 mins"
                commuteTime="12 mins"
                slug="flats-near-punawale"
              />
            </Layout>
          } />
          <Route path="/location/flats-near-wakad" element={
            <Layout>
              <LocationLanding
                locationName="Wakad"
                distance="12 mins"
                commuteTime="20 mins"
                slug="flats-near-wakad"
              />
            </Layout>
          } />
          <Route path="/location/flats-near-marunji" element={
            <Layout>
              <LocationLanding
                locationName="Marunji"
                distance="0 mins"
                commuteTime="Walking Distance"
                slug="flats-near-marunji"
              />
            </Layout>
          } />

          {/* Dynamic Sector/Locality Landing Pages (Phase 3) */}
          <Route path="/location/:slug" element={
            <Layout>
              <SectorLanding />
            </Layout>
          } />

          {/* Phase 4 Routes */}
          <Route path="/nri-corner" element={
            <Layout ariaLabel="NRI Corner">
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
            <Layout ariaLabel="Testimonials">
              <Testimonials />
            </Layout>
          } />
          <Route path="/media-center" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20" aria-label="Media Center">
                <MediaCenter />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/media-center/:slug" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20" aria-label="Blog Post">
                <BlogPostPage />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/lifestyle" element={
            <Layout ariaLabel="Life at Life Republic">
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
      </Router>
    </SmoothScrolling>
  );
}

export default App;
