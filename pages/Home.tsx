import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES, TESTIMONIALS, TRUST_CARDS, HOME_PROCESS } from '../constants';
import { LogoFull } from '../components/BrandLogos';

const Home: React.FC = () => {
  return (
    <div className="bg-slate-950 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full -z-10 pointer-events-none opacity-50"></div>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-12">
              <LogoFull />
            </div>
            
            <h1 className="text-5xl md:text-[5.5rem] font-black tracking-tight text-white mb-8 leading-[1.05]">
              Build. Launch. <br />
              <span className="gradient-text text-white">Scale Your Vision.</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              We bridge the gap between high-level engineering and startup speed. Deploy elite talent to ship world-class products in record time.
            </p>
            
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
                <Link to="/contact" className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-600/20">
                  Get Free Consultation <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/portfolio" className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg.White/10 transition-all backdrop-blur-sm">
                  Explore Case Studies
                </Link>
              </div>
              
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Kickoff in 48h</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> NDA Guaranteed</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> High Velocity</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-24 relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-slate-900 shadow-2xl"
          >
            <div className="absolute top-0 left-0 right-0 h-10 bg-slate-800/50 border-b border.White/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600" 
              alt="OUR STARTUP FREELANCER Delivery Platform" 
              className="w-full h-auto opacity-70 pt-10 grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 border-y border-white/5 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mb-10">Powering Next-Gen Unicorns</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-20 grayscale transition-all duration-500 hover:opacity-50">
            {['VOLT', 'ASTRA', 'ZENITH', 'NEXUS', 'VORTEX'].map(brand => (
              <span key={brand} className="text-2xl md:text-3xl font-black text.White tracking-tighter">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Execution is Everything.</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium">We deliver the elite specialized talent your startup needs to win the category.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -12 }}
                className="glass-card p-10 rounded-[2.5rem] transition-all group relative overflow-hidden border border-white/5 hover:border-indigo-500/20"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  {React.cloneElement(service.icon as React.ReactElement<any>, { className: "w-32 h-32" })}
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-600/30">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{service.title}</h3>
                <p className="text-slate-400 mb-8 leading-relaxed text-sm font-medium">{service.description}</p>
                <Link to="/services" className="inline-flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-widest group/btn">
                  See Capabilities <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
            <div className="glass-card p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center border-dashed border-white/10 bg-transparent">
              <h3 className="text-2xl font-black text-slate-500 mb-4 tracking-tight">Custom Scope?</h3>
              <p className="text-slate-600 mb-8 text-sm font-medium">Have a challenge that defies conventional boxes?</p>
              <Link to="/contact" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                Let's Strategize
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative glass-card rounded-[3rem] p-12 md:p-24 text-center overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 p-20 opacity-5">
              <Zap className="w-64 h-64 text-indigo-500" />
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">10x Your Digital <br /> Performance.</h2>
            <p className="text-slate-400 text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-medium">
              We're currently accepting limited partnerships for next month. Secure your spot in our high-velocity sprint cycle today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/contact" className="bg-indigo-600 text-white px-12 py-6 rounded-full text-xl font-black hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/40">
                Book Strategy Audit
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
              <span>Secure NDA</span>
              <span className="text-indigo-500 opacity-30">•</span>
              <span>Zero Retainer</span>
              <span className="text-indigo-500 opacity-30">•</span>
              <span>Elite Talent</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

