import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';

import ProjectDetails from './pages/ProjectDetails';
import Projects from './pages/Projects';

import { FloatingContact } from './components/ui/FloatingContact';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-primary font-sans text-secondary">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            {/* Add more routes here */}
            <Route path="*" element={<div className="pt-24 text-center">Page Not Found</div>} />
          </Routes>
        </main>
        <Footer />
        <FloatingContact />
      </div>
    </Router>
  );
}

export default App;
