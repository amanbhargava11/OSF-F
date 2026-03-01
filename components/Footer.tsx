
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Mail, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../context/AppStateContext';
import { LogoFull } from './BrandLogos';

// Analytics Mock Helper
const trackEvent = (name: string, props: any = {}) => {
  console.log(`[Analytics] ${name}`, { location: 'footer', ...props });
};

const SocialLink: React.FC<{ icon: React.ReactNode, href: string, label: string }> = ({ icon, href, label }) => (
  <a 
    href={href} 
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    onClick={() => trackEvent('footer_social_click', { social: label })}
    className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 text-slate-500 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
  >
    {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
  </a>
);

const FooterLink: React.FC<{ to: string, children: React.ReactNode, label: string }> = ({ to, children, label }) => (
  <li>
    <Link 
      to={to} 
      aria-label={label}
      onClick={() => trackEvent('footer_link_click', { text: label, to })}
      className="text-slate-500 hover:text-indigo-400 text-sm font-bold transition-colors block py-2 md:py-1 focus:outline-none focus:text-indigo-400"
    >
      {children}
    </Link>
  </li>
);

const Footer: React.FC = () => {
  const { subscribeEmail } = useAppState();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus('error');
      return;
    }

    setStatus('loading');
    trackEvent('footer_subscribe_attempt', { email });

    try {
      await subscribeEmail(email);
      setStatus('success');
      setEmail('');
      trackEvent('footer_subscribe_success');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to subscribe. Please try again.");
      setStatus('error');
      trackEvent('footer_subscribe_fail', { error: err.message });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Info - USES logo-full.svg variant */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link 
              to="/" 
              onClick={() => trackEvent('footer_logo_click')}
              className="inline-block mb-12"
            >
              <LogoFull className="!items-start scale-75 origin-left" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs font-medium">
              We bridge the gap between high-level engineering and startup speed. Deploy elite talent to ship world-class products in record time.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<Twitter />} href="https://twitter.com/ourstartupfreelancer" label="Visit OSF Twitter" />
              <SocialLink icon={<Linkedin />} href="https://linkedin.com/company/ourstartupfreelancer" label="Visit OSF LinkedIn" />
              <SocialLink icon={<Instagram />} href="https://instagram.com/ourstartupfreelancer" label="Visit OSF Instagram" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Quick Links</h4>
            <ul className="space-y-4 md:space-y-2">
              <FooterLink to="/capabilities" label="View Capabilities">Capabilities</FooterLink>
              <FooterLink to="/portfolio" label="View Portfolio">Portfolio</FooterLink>
              <FooterLink to="/about" label="Read Our Story">Our Story</FooterLink>
              <FooterLink to="/how-it-works" label="Read The Flow">The Flow</FooterLink>
            </ul>
          </div>

          {/* Column 3: Ecosystem */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Ecosystem</h4>
            <ul className="space-y-4 md:space-y-2">
              <FooterLink to="/hire-talent" label="Hire Talent Form">Hire Talent</FooterLink>
              <FooterLink to="/start-project" label="Start Project Signup">Start Project</FooterLink>
              <FooterLink to="/work-with-us" label="Work With Us">Work With Us</FooterLink>
              <FooterLink to="/press" label="Download Press Kit">Press Kit</FooterLink>
            </ul>
          </div>

          {/* Column 4: Strategy Feed */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Strategy Feed</h4>
            <p className="text-slate-500 text-xs mb-6 font-medium leading-relaxed">Join 2,000+ founders receiving weekly product & scale insights.</p>
            
            <div className="relative">
              <form onSubmit={handleSubscribe} className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="name@startup.com" 
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-5 text-xs focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600 disabled:opacity-50 text-white font-bold"
                  aria-label="Email address for strategy newsletter"
                />
                <button 
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="absolute right-2 top-2 p-3 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-95 disabled:bg-slate-800 disabled:shadow-none flex items-center justify-center min-w-[44px] min-h-[44px]"
                  aria-label="Subscribe to newsletter"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5 text-white" />
                  )}
                </button>
              </form>

              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-full mt-3 flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest"
                  >
                    <CheckCircle size={14} /> Thanks — You're on the list!
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-full mt-3 text-red-500 text-[10px] font-black uppercase tracking-widest"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] text-center md:text-left">
            © {new Date().getFullYear()} OUR STARTUP FREELANCER (OSF). ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <a 
              href="mailto:info@ourstartupfreelancer.com?subject=OSF Inquiry: Scaling My Startup" 
              onClick={() => trackEvent('footer_email_click')}
              className="flex items-center gap-3 text-slate-500 hover:text-indigo-400 text-[10px] font-black uppercase tracking-widest transition-colors py-2 md:py-1 px-4 md:px-0"
            >
              <Mail className="w-4 h-4 text-indigo-500" /> INFO@OURSTARTUPFREELANCER.COM
            </a>
            
            <div className="flex gap-8 md:gap-6">
              <a href="#" className="text-slate-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors py-2 md:py-0">Privacy</a>
              <a href="#" className="text-slate-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors py-2 md:py-0">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
