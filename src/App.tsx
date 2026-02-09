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

import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { ImageManager } from './components/admin/ImageManager';

function App() {
  return (
    <SmoothScrolling>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20">
                <Home />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/projects" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20">
                <Projects />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/projects/:id" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20">
                <ProjectDetails />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/amenities" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20">
                <Amenities />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />
          <Route path="/contact" element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow pt-20">
                <Contact />
              </main>
              <Footer />
              <FloatingContact />
            </div>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="images" element={<div className="p-8"><h1 className="text-2xl font-bold font-serif mb-6">Image Manager</h1><ImageManager /></div>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </SmoothScrolling>
  );
}

export default App;
