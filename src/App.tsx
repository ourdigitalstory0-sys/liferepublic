import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import { Amenities } from './pages/Amenities';
import { Contact } from './pages/Contact';
import ProjectDetails from './pages/ProjectDetails';
import { FloatingContact } from './components/ui/FloatingContact';
import { SmoothScrolling } from './components/layout/SmoothScrolling';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { LocationHighlights } from './pages/LocationHighlights';
import { TwoBHK } from './pages/landing/TwoBHK';
import { ThreeBHK } from './pages/landing/ThreeBHK';
import { FourBHK } from './pages/landing/FourBHK';
import { NRICorner } from './pages/NRICorner';
import { Testimonials } from './pages/Testimonials';
import { MediaCenter } from './pages/MediaCenter';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminSignup } from './pages/admin/AdminSignup';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { ImageManager } from './components/admin/ImageManager';
import { ExitIntentModal } from './components/ui/ExitIntentModal';
import { LocationLanding } from './pages/LocationLanding';

function App() {
  return (
    <SmoothScrolling>
      <Router>
        <ExitIntentModal />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20" aria-label="Kolte Patil Life Republic Township Hinjewadi">
                <Home />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/projects" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20" aria-label="Kolte Patil Life Republic Township Hinjewadi">
                <Projects />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/projects/:id" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20" aria-label="Kolte Patil Life Republic Township Hinjewadi">
                <ProjectDetails />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/amenities" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20" aria-label="Kolte Patil Life Republic Township Hinjewadi">
                <Amenities />
              </main>
              <Footer />
              <FloatingContact />
            </div>
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

          {/* Micro-Landing Pages */}
          <Route path="/2-bhk-flats-in-hinjewadi" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20" aria-label="2 BHK Flats in Hinjewadi">
                <TwoBHK />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/3-bhk-flats-in-hinjewadi" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20" aria-label="3 BHK Flats in Hinjewadi">
                <ThreeBHK />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/4-bhk-flats-in-hinjewadi" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20" aria-label="4 BHK Flats in Hinjewadi">
                <FourBHK />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />

          {/* Location SEO Landing Pages - Deep Web Data Implementation */}
          <Route path="/location/flats-near-hinjewadi" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20">
                <LocationLanding
                  locationName="Hinjewadi Phase 1"
                  distance="5 mins"
                  commuteTime="10 mins"
                  slug="flats-near-hinjewadi"
                />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/location/flats-near-tathawade" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20">
                <LocationLanding
                  locationName="Tathawade"
                  distance="10 mins"
                  commuteTime="15 mins"
                  slug="flats-near-tathawade"
                />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/location/flats-near-punawale" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20">
                <LocationLanding
                  locationName="Punawale"
                  distance="7 mins"
                  commuteTime="12 mins"
                  slug="flats-near-punawale"
                />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/location/flats-near-wakad" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20">
                <LocationLanding
                  locationName="Wakad"
                  distance="12 mins"
                  commuteTime="20 mins"
                  slug="flats-near-wakad"
                />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/location/flats-near-marunji" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20">
                <LocationLanding
                  locationName="Marunji"
                  distance="0 mins"
                  commuteTime="Walking Distance"
                  slug="flats-near-marunji"
                />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />



          {/* Phase 4 Routes */}
          <Route path="/nri-corner" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20" aria-label="NRI Corner">
                <NRICorner />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/testimonials" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20" aria-label="Testimonials">
                <Testimonials />
              </main>
              <Footer />
              <FloatingContact />
            </div>
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

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="images" element={<div className="p-8"><h1 className="text-2xl font-bold font-serif mb-6">Image Manager</h1><ImageManager /></div>} />
            </Route>
          </Route>

          {/* Catch-all for 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </SmoothScrolling>
  );
}

export default App;
