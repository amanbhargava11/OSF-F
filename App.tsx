
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Process from './pages/Process';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import WorkWithUs from './pages/WorkWithUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Simple placeholder for Press Kit
const PressKit = () => (
  <div className="pt-48 pb-24 px-6 text-center bg-slate-950 min-h-screen">
    <h1 className="text-5xl font-black text-white mb-6">Press Kit</h1>
    <p className="text-slate-400 max-w-lg mx-auto">Assets for OUR STARTUP FREELANCER (OSF) will be available shortly. Contact info@ourstartupfreelancer.com for inquiries.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppLayout />
      </Router>
    </AuthProvider>
  );
};

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/capabilities" element={<Services />} /> {/* Footer Alias */}
          <Route path="/about" element={<About />} />
          <Route path="/process" element={<Process />} />
          <Route path="/how-it-works" element={<Process />} /> {/* Footer Alias */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/work-with-us" element={<WorkWithUs />} />
          <Route path="/hire-talent" element={<Contact />} /> {/* Footer Alias */}
          <Route path="/partner" element={<WorkWithUs />} /> {/* Footer Alias */}
          <Route path="/press" element={<PressKit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/start-project" element={<Signup />} /> {/* Footer Alias */}
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
      {!isDashboard && <WhatsAppButton />}
    </div>
  );
};

// Helper component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default App;
