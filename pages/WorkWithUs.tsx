import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Rocket, Users, Zap, ShieldCheck, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkWithUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Founder/CEO',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use the correct API endpoint for work-with-us inquiries
      const apiBase = import.meta.env?.PROD || import.meta.env?.MODE === 'production'
        ? (import.meta.env?.VITE_API_URL || '/api')
        : 'http://localhost:5000/api';
      
      const response = await fetch(`${apiBase}/public/work-with-us`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          message: formData.message
        })
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', company: '', role: 'Founder/CEO', message: '' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit inquiry');
      }
    } catch (error: any) {
      console.error('Work With Us form error:', error);
      // Still show success to user for better UX, but log the error
      alert(error.message || 'Failed to submit inquiry. Please try again or contact us directly.');
    }
  };

  const benefits = [
    { icon: <Zap />, title: "Rapid Turnaround", desc: "Most projects kick off within 48 hours of consultation." },
    { icon: <TrendingUp />, title: "Growth Focused", desc: "Every line of code and pixel is optimized for conversions." },
    { icon: <ShieldCheck />, title: "Full Privacy", desc: "Standardized NDAs and secure data handling for all IP." },
    { icon: <Clock />, title: "24/7 Support", desc: "Dedicated project managers in your timezone." }
  ];

  return (
    <div className="bg-slate-950 pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-indigo-500 font-black tracking-[0.2em] uppercase text-xs mb-4 block">Partner With OSF</span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
            Let's Build Your <br />
            <span className="gradient-text">Unfair Advantage.</span>
          </h1>
          <p className="text-slate-400 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            We're currently accepting only a limited number of projects for the next quarter. Join the elite startups who trust OSF for mission-critical digital scaling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
          {/* Left Side - Benefits */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-white mb-12 tracking-tight">Why Work With OSF?</h2>
              
              <div className="space-y-8 mb-16">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg border border-white/5">
                      {React.cloneElement(benefit.icon as React.ReactElement<any>, { size: 28 })}
                    </div>
                    <div>
                      <h4 className="text-white font-black text-xl mb-2">{benefit.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-10">
                <a href="mailto:info@ourstartupfreelancer.com" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg border border-white/5">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg">Email Us Direct</h4>
                    <p className="text-slate-500 font-medium">info@ourstartupfreelancer.com</p>
                  </div>
                </a>
                <a href="https://wa.me/919424871885?text=Hello%20OSF%20Team%2C%20I%27d%20like%20to%20discuss%20working%20with%20you." target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg border border-white/5">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg">Fast-Track WhatsApp</h4>
                    <p className="text-slate-500 font-medium">+91 94248 71885</p>
                  </div>
                </a>
              </div>

              <div className="mt-20 p-10 glass-card rounded-[2.5rem] border border-white/5 bg-indigo-600/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <ShieldCheck className="w-20 h-20 text-indigo-400" />
                </div>
                <h4 className="text-white font-black text-xl mb-4 flex items-center gap-3">
                  Our Guarantee
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">Every project starts with a signed NDA. Your intellectual property is 100% secure with OSF.</p>
                <div className="flex gap-4">
                  <span className="px-4 py-2 rounded-full bg-slate-950 text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-white/5">Full Privacy</span>
                  <span className="px-4 py-2 rounded-full bg-slate-950 text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-white/5">Expert Support</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-card p-10 md:p-16 rounded-[3rem] relative overflow-hidden min-h-[600px] flex flex-col justify-center"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            
            {!isSubmitted ? (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <h3 className="text-3xl font-black text-white mb-10">Start Your Project</h3>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="E.g. Elon Musk" 
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-indigo-500 transition-all text-lg font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Work Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="name@startup.com" 
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-indigo-500 transition-all text-lg font-medium"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Company</label>
                      <input 
                        type="text" 
                        required
                        value={formData.company}
                        onChange={e => setFormData({...formData, company: e.target.value})}
                        placeholder="Your Startup" 
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-indigo-500 transition-all text-lg font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Your Role</label>
                      <select 
                        value={formData.role}
                        onChange={e => setFormData({...formData, role: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-indigo-500 transition-all text-lg font-medium appearance-none cursor-pointer"
                      >
                        <option>Founder/CEO</option>
                        <option>CTO</option>
                        <option>Product Manager</option>
                        <option>Marketing Lead</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Project Details</label>
                    <textarea 
                      rows={4} 
                      required
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your project, challenges, and goals..." 
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-indigo-500 transition-all text-lg font-medium resize-none"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 text-white font-black py-6 rounded-2xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-4 group text-xl shadow-xl shadow-indigo-600/30">
                    Submit Inquiry <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex justify-center items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> Guaranteed response within 24 hours
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-500">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-4xl font-black text-white mb-6 tracking-tight">Inquiry Submitted!</h3>
                <p className="text-slate-400 text-xl font-medium mb-12">
                  Our team has received your inquiry. Expect a response at your inbox within the next 24 hours.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-indigo-500 font-black uppercase tracking-widest text-xs hover:text-white transition-colors"
                >
                  Submit another inquiry
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32">
          {[
            { number: "120+", label: "Projects Delivered" },
            { number: "48h", label: "Avg. Kickoff Time" },
            { number: "100%", label: "Client Satisfaction" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="text-center glass-card p-8 rounded-2xl border border-white/5"
            >
              <div className="text-4xl md:text-5xl font-black text-indigo-500 mb-3">{stat.number}</div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkWithUs;
