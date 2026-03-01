import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Building, ArrowRight, ShieldCheck, Rocket, AlertCircle, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LogoNavbar } from '../components/BrandLogos';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError(null);
    setIsSubmitting(true);

    try {
      await signup({ ...formData, role: 'client' }, rememberMe);
      navigate('/dashboard/client');
    } catch (err: any) {
      setError(err.message || 'Project initialization failed. Please check your data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl glass-card rounded-[3.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl border border-white/5"
      >
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-12 hidden lg:flex flex-col justify-between text-white relative">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Rocket className="w-48 h-48" />
          </div>
          <div>
            <Link to="/" className="inline-block mb-10">
              <LogoNavbar size="md" />
            </Link>
            <h2 className="text-4xl font-black leading-[1.1] mb-6 tracking-tighter">Accelerate Your <br /> Marketplace Entry.</h2>
            <p className="text-indigo-100 text-lg opacity-80 font-medium">Join 120+ innovators who trust OSF for mission-critical digital scaling.</p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-xs font-black uppercase tracking-widest">Enterprise Privacy NDA</p>
            </div>
          </div>
        </div>

        <div className="p-10 md:p-14 bg-slate-950/40">
          <div className="mb-10">
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Deploy Your Portal</h2>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Build • Launch • Scale</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-bold"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Principal Identity</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Alexander Riviera" 
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl px-12 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/60 transition-all text-sm font-medium placeholder:text-slate-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Startup / Enterprise</label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  required
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  placeholder="Skyline Digital" 
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl px-12 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/60 transition-all text-sm font-medium placeholder:text-slate-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="alex@skyline.digital" 
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl px-12 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/60 transition-all text-sm font-medium placeholder:text-slate-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Access Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  required
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl px-12 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/60 transition-all text-sm font-medium placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
  <label className="flex items-center cursor-pointer relative p-1">
    <input
      type="checkbox"
      id="rememberMe"
      checked={rememberMe}
      onChange={e => setRememberMe(e.target.checked)}
      className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded-sm border border-slate-600/50 bg-slate-900/50 hover:border-slate-500/70 hover:shadow-sm checked:bg-indigo-600/90 checked:border-indigo-600/90 focus-visible:ring-2 focus-visible:ring-indigo-500/50"
    />
    <span className="absolute text-white/90 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </span>
  </label>
  <label htmlFor="rememberMe" className="text-slate-500/80 text-xs font-medium cursor-pointer select-none hover:text-slate-400/80 transition-colors">
    Remember me
  </label>
</div>


            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-3 text-lg group shadow-xl shadow-indigo-600/30 disabled:opacity-50"
            >
              {isSubmitting ? "Initializing..." : "Register Account"} 
              {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="text-center text-slate-500 text-[10px] font-black uppercase tracking-widest mt-10">
            Registered partner? <Link to="/login" className="text-indigo-500 hover:underline">Secure Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;

