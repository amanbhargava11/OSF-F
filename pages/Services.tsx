import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SERVICES } from '../constants';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <div className="bg-slate-950 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
          >
            Digital Solutions for <br />
            <span className="gradient-text">Hyper-Growth.</span>
          </motion.h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            From zero-to-one startups to established enterprises, we provide the tools and talent needed to lead your industry.
          </p>
        </div>

        <div className="space-y-32">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="w-full lg:w-1/2">
                <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-500 mb-8">
                  {service.icon}
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{service.title}</h2>
                <div className="space-y-8 mb-10">
                  <div>
                    <h4 className="text-sm font.bold uppercase tracking-widest text-indigo-500 mb-2">The Problem</h4>
                    <p className="text-slate-300 text-lg">{service.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-2">Our Solution</h4>
                    <p className="text-slate-300 text-lg">{service.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-2">The Result</h4>
                    <p className="text-slate-300 text-lg font-semibold">{service.result}</p>
                  </div>
                </div>
                
                <div className="mb-10">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Ideal For:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.forWho.map(item => (
                      <span key={item} className="px-4 py-1.5 rounded-full bg-slate-900 border border-white/5 text-slate-400 text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <Link to="/contact" className="inline-flex items-center gap-2 bg.White text-slate-950 px-8 py-4 rounded-full font-bold hover:bg-indigo-600 hover:text-white transition-all group">
                  Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group">
                  <img 
                    src={`https://picsum.photos/seed/${service.id}/1000/600`} 
                    alt={service.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-indigo-600/10 opacity-40"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;

