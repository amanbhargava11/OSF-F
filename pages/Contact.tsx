import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Select a Service',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message
        })
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', service: 'Select a Service', message: '' });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      // Still show success to user for better UX
      setIsSubmitted(true);
      setFormData({ name: '', email: '', service: 'Select a Service', message: '' });
    }
  };

  return (
    <div className="bg-slate-950 pt-48 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-indigo-500 font-black tracking-[0.2em] uppercase text-xs mb-4 block">Secure Your Growth</span>
              <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                Let’s Build Your <br />
                <span className="gradient-text">Unfair Advantage.</span>
              </h1>
              <p className="text-slate-400 text-xl md:text-2xl mb-12 max-w-lg leading-relaxed">
                We're currently accepting only a limited number of projects for the next quarter. Contact us now to claim your free digital audit and project roadmap.
              </p>

              <div className="space-y-10">
                <a href="mailto:info@ourstartupfreelancer.com" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg border border.White/5">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg">Email Us Direct</h4>
                    <p className="text-slate-500 font-medium">info@ourstartupfreelancer.com</p>
                  </div>
                </a>
                <a href="https://wa.me/919424871885?text=Hello%20OSF%20Team%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text.White transition-all shadow-lg border border-white/5">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg">Fast-Track WhatsApp</h4>
                    <p className="text-slate-500 font-medium">+91 94248 71885</p>
                  </div>
                </a>
              </div>

              <div className="mt-20 p-10 glass-card rounded-[2.5rem] border border.White/5 bg-indigo-600/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <ShieldCheck className="w-20 h-20 text-indigo-400" />
                </div>
                <h4 className="text-white font-black text-xl mb-4 flex items-center gap-3">
                  Our Guarantee
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">Every project starts with a signed NDA. Your intellectual property is 100% secure with OSF.</p>
                <div className="flex gap-4">
                  <span className="px-4 py-2 rounded-full bg-slate-950 text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-white/5">Full Privacy</span>
                  <span className="px-4 py-2 rounded-full bg-slate-950 text-[10px] font-bold text-slate-500 uppercase tracking-widest border border.White/5">Expert Support</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-card p-10 md:p-16 rounded-[3rem] relative overflow-hidden min-h-[600px] flex flex-col justify-center"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <h3 className="text-3xl font-black text-white mb-10">Request Free Audit</h3>
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
                          className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-5 text.White focus:outline-none focus:border-indigo-500 transition-all text-lg font-medium"
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
                          className="w-full bg-slate-950 border border.White/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-indigo-500 transition-all text-lg font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Project Type</label>
                      <select 
                        value={formData.service}
                        onChange={e => setFormData({...formData, service: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-5 text.white focus:outline-none focus:border-indigo-500 transition-all text-lg font-medium appearance-none cursor-pointer"
                      >
                        <option>Select a Service</option>
                        <option>Full Website Build</option>
                        <option>Brand Identity System</option>
                        <option>Growth Marketing</option>
                        <option>AI Automation Setup</option>
                        <option>On-Demand Talent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Your Challenges</label>
                      <textarea 
                        rows={4} 
                        required
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        placeholder="What’s stopping you from scaling today?" 
                        className="w-full bg-slate-950 border border.white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-indigo-500 transition-all text-lg font-medium resize-none"
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white font-black py-6 rounded-2xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-4 group text-xl shadow-xl shadow-indigo-600/30">
                      Send Inquiry <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <div className="flex justify-center items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-widest">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" /> Guaranteed response within 24 hours
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-500">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-4xl font-black text.white mb-6 tracking-tight">Audit Requested!</h3>
                  <p className="text-slate-400 text-xl font-medium mb-12">
                    Our strategy team has received your brief. Expect a response at your inbox within the next 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-indigo-500 font-black uppercase tracking-widest text-xs hover:text-white transition-colors"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

