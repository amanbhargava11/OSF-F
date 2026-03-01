import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../constants';

const Process: React.FC = () => {
  return (
    <div className="bg-slate-950 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Our Process</h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            A high-speed, precision-driven roadmap designed to take you from idea to industry leader.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-20 transform -translate-x-1/2"></div>
          
          <div className="space-y-24">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div 
                key={step.number}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-0 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="w-full lg:w-1/2 lg:px-20 text-center lg:text-left">
                  <span className="text-8xl font-black text-white/5 absolute -top-10 left-0 lg:static leading-none">{step.number}</span>
                  <h3 className="text-3xl font-black text-white mb-4 relative z-10">{step.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{step.description}</p>
                </div>
                
                <div className="hidden lg:flex w-0 lg:w-1/2 justify-center items-center relative">
                  <div className="w-6 h-6 rounded-full bg-slate-950 border-4 border-indigo-600 z-10"></div>
                </div>

                <div className="w-full lg:w-1/2 lg:px-20">
                  <img 
                    src={`https://picsum.photos/seed/process${idx}/600/400`} 
                    alt={step.title} 
                    className="rounded-3xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-32 text-center glass-card p-12 md:p-20 rounded-[40px]">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Reliable & Predictable.</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            We don’t believe in surprises. Our transparent process keeps you in the loop at every stage, ensuring the final result exceeds expectations.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-white font-bold">Slack Communication</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-white font-bold">Weekly Check-ins</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-white font-bold">Dedicated PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;

