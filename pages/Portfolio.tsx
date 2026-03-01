
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_PROJECTS } from '../constants';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = PORTFOLIO_PROJECTS.length > 0
    ? (filter === 'All' 
        ? PORTFOLIO_PROJECTS 
        : PORTFOLIO_PROJECTS.filter(p => p.category.toLowerCase().includes(filter.toLowerCase())))
    : [];

  const categories = ['All', 'Web', 'Branding', 'Strategy'];

  return (
    <div className="bg-slate-950 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Our Work</h1>
            <p className="text-slate-400 text-xl max-w-2xl">
              We focus on building products that don’t just look good—they achieve real business goals.
            </p>
          </div>
          {PORTFOLIO_PROJECTS.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full border transition-all text-sm font-bold ${
                    filter === cat 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                      : 'border-white/10 text-slate-400 hover:text-white hover:border-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div 
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-8 border border-white/10">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-slate-950 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <ArrowUpRight className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="text-indigo-500 font-bold uppercase tracking-widest text-xs mb-2 block">{project.category}</span>
                    <h3 className="text-3xl font-black text-white mb-6">{project.title}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-white/5 rounded-2xl border border-white/5">
                      <div>
                        <h5 className="text-[10px] uppercase font-bold text-slate-500 mb-1">Problem</h5>
                        <p className="text-xs text-slate-300 leading-tight">{project.problem}</p>
                      </div>
                      <div>
                        <h5 className="text-[10px] uppercase font-bold text-slate-500 mb-1">Contribution</h5>
                        <p className="text-xs text-slate-300 leading-tight">{project.contribution}</p>
                      </div>
                      <div>
                        <h5 className="text-[10px] uppercase font-bold text-slate-500 mb-1">Result</h5>
                        <p className="text-xs text-emerald-400 font-bold leading-tight">{project.results}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-16 rounded-[3rem] max-w-2xl mx-auto border border-white/10"
            >
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8">
                <ArrowUpRight className="w-12 h-12 text-slate-600" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6">No Current Projects</h3>
              <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
                We're currently working on exciting new projects. Check back soon to see our latest work, or contact us to discuss your project.
              </p>
              <Link 
                to="/contact"
                className="bg-indigo-600 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-indigo-500 transition-all inline-block shadow-xl shadow-indigo-600/30"
              >
                Start Your Project
              </Link>
            </motion.div>
          </div>
        )}

        {filteredProjects.length > 0 && (
          <div className="mt-24 text-center">
            <p className="text-slate-500 mb-8 font-medium italic">And many more NDA-protected projects for global leaders...</p>
            <Link 
              to="/contact"
              className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white/10 transition-all inline-block"
            >
              Request Private Deck
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
