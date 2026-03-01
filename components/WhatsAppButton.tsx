import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton: React.FC = () => {
  const whatsappNumber = "919424871885"; // +91 94248 71885
  const message = encodeURIComponent("Hi OSF team, I'd like to discuss a project and get an audit.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  const trackWhatsApp = () => {
    console.log('[Analytics] footer_whatsapp_click', { location: 'floating_button' });
  };

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact OSF team via WhatsApp"
      onClick={trackWhatsApp}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[90] w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 border border-white/10 group focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
      <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
        Chat with us
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;

