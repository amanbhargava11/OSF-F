import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';
import { useAuth } from '../context/AuthContext';
import { LogoNavbar, LogoIcon } from './BrandLogos';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/80 backdrop-blur-2xl border-b border-white/10 py-3' 
          : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* REFINED BRAND IDENTITY - NAVBAR USES logo-navbar.svg */}
        <Link to="/" className="relative z-10 hidden lg:block">
          <LogoNavbar size={scrolled ? 'sm' : 'md'} />
        </Link>
        
        {/* MOBILE USES logo-icon.svg */}
        <Link to="/" className="relative z-10 lg:hidden">
          <LogoIcon size={36} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8 bg-slate-900/40 border border-white/5 rounded-full px-8 py-2.5 backdrop-blur-md">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-indigo-400 ${
                  location.pathname === link.href ? 'text-white' : 'text-slate-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
              >
                <User size={14} className="text-indigo-500" /> My Portal
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all px-4"
              >
                Login
              </Link>
            )}
            
            <Link 
              to="/contact" 
              className="bg-indigo-600 text-white px-7 py-3 rounded-full text-xs font-black hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2 group"
            >
              Start Project 
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button 
            className="text-white p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-[100%] left-6 right-6 mt-4 bg-slate-900 border border-white/10 rounded-[2.5rem] p-10 flex flex-col gap-6 shadow-3xl backdrop-blur-3xl z-[101]"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-4xl font-black transition-colors ${
                  location.pathname === link.href ? 'text-indigo-500' : 'text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-white/5 my-4"></div>
            <Link 
              to="/contact" 
              className="bg-indigo-600 text-white px-8 py-5 rounded-[1.8rem] text-center font-black text-xl shadow-2xl shadow-indigo-600/30"
            >
              Get Free Audit
            </Link>
            <Link 
              to="/login" 
              className="text-center text-slate-500 font-black uppercase tracking-widest text-xs py-2"
            >
              Client Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

