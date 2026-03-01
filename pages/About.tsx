
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Rocket, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="bg-slate-950 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-indigo-500 font-black tracking-[0.2em] uppercase text-xs mb-4 block"
          >
            Our Mission
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight"
          >
            Built by Freelancers, <br />
            <span className="gradient-text">For Businesses.</span>
          </motion.h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            OSF was born from a simple observation: traditional agencies are too slow and rigid for the modern startup. We’ve built a decentralized powerhouse of the top 1% creators who deliver excellence at speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-auto h-[400px] border border-white/5 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team Work" className="w-full h-full object-cover grayscale opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <span className="text-white text-3xl font-black tracking-tight">Our Roots</span>
            </div>
          </div>
          <div className="glass-card p-12 rounded-3xl flex flex-col justify-center">
            <h2 className="text-3xl font-black text-white mb-6">India's Strongest Freelance Ecosystem.</h2>
            <p className="text-slate-400 text-lg mb-6 font-medium">
              Based in India with a global mindset, we are on a mission to organize the freelance economy. We believe that if you have skill, you deserve to work on the world's most exciting projects.
            </p>
            <p className="text-slate-400 text-lg font-medium">
              We vet every partner, every dev, and every designer to ensure that when a client hires OSF, they aren't just getting a service—they're getting a commitment to excellence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-32">
          {[
            { icon: <Target />, title: "Precision", desc: "No fluff. Just results-driven digital strategies." },
            { icon: <Rocket />, title: "Speed", desc: "Agile workflows that match the pace of your growth." },
            { icon: <Users />, title: "Community", desc: "A thriving hub of specialized world-class talent." },
            { icon: <Award />, title: "Excellence", desc: "Setting the gold standard for design and code." }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/50 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-indigo-600/20 flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-600/10">
                {item.icon}
              </div>
              <h4 className="text-xl font-black text-white mb-3 tracking-tight">{item.title}</h4>
              <p className="text-slate-500 text-xs font-bold leading-relaxed tracking-wider">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center bg-indigo-600 rounded-[3rem] p-16 md:p-24 relative overflow-hidden shadow-2xl shadow-indigo-600/20">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10 tracking-tighter">Join our movement.</h2>
          <p className="text-indigo-100 text-xl mb-12 max-w-2xl mx-auto relative z-10 font-medium">
            Whether you're a founder looking for a partner or a master freelancer looking for your next challenge—OSF is your home.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
            <Link to="/work-with-us" className="bg-white text-indigo-600 px-12 py-5 rounded-full font-black text-lg hover:bg-slate-900 hover:text-white transition-all shadow-xl">Work with us</Link>
            <Link to="/contact" className="bg-transparent border-2 border-white text-white px-12 py-5 rounded-full font-black text-lg hover:bg-white/10 transition-all">Become a Partner</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
