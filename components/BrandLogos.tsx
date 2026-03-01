import React from 'react';

/**
 * SHARED LOGO ICON MARK
 * Two interlocking bars forming a stylized 'S'
 */
const LogoIconMark: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 160 160" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`flex-shrink-0 ${className}`}
  >
    {/* Top Bar - Curves from left to right */}
    <path 
      d="M30 85C30 54.6243 54.6243 30 85 30H130M130 30L130 50C130 50 110 50 85 50C65.67 50 50 65.67 50 85" 
      fill="#4F46E5" 
    />
    <path 
      d="M130 75C130 105.376 105.376 130 75 130H30M30 130L30 110C30 110 50 110 75 110C94.33 110 110 94.33 110 75" 
      fill="#6366F1" 
    />
  </svg>
);

/**
 * logo-icon.svg (Icon Only)
 * Used for mobile navbar, favicon, and collapsed states.
 */
export const LogoIcon: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = "" }) => (
  <div className={`inline-flex items-center justify-center ${className}`}>
    <LogoIconMark size={size} />
  </div>
);

/**
 * logo-navbar.svg (Icon + Brand Name, No Tagline)
 * Primary identity for Navbar and Dashboards.
 */
export const LogoNavbar: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ size = 'md', className = "" }) => {
  const iconSize = size === 'sm' ? 24 : size === 'md' ? 32 : 44;
  const textSize = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-xl';
  const freelancerSize = size === 'sm' ? 'px-1.5 py-0.5' : size === 'md' ? 'px-2 py-1' : 'px-3 py-1.5';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIconMark size={iconSize} />
      <div className={`flex items-center gap-1.5 font-black uppercase tracking-tighter ${textSize} whitespace-nowrap`}>
        <span className="text-white">OUR</span>
        <span className="text-white">STARTUP</span>
        <span className={`bg-[#F59E0B] text-slate-950 rounded-[4px] leading-none flex items-center justify-center ${freelancerSize}`}>
          FREELANCER
        </span>
      </div>
    </div>
  );
};

/**
 * logo-full.svg (Icon + Brand Name + Tagline)
 * Used for Hero sections and Footer.
 */
export const LogoFull: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex flex-col items-center gap-6 ${className}`}>
    <div className="flex items-center gap-4">
      <LogoIconMark size={80} />
      <div className="flex flex-col items-start leading-none">
        <div className="flex items-center gap-2 font-black uppercase tracking-tighter text-4xl text-white">
          <span>OUR</span>
          <span>STARTUP</span>
        </div>
        <div className="bg-[#F59E0B] text-slate-950 px-4 py-2 rounded-[6px] font-black uppercase text-4xl mt-2 tracking-tighter">
          FREELANCER
        </div>
      </div>
    </div>
    <div className="text-slate-400 font-bold text-xl uppercase tracking-[0.4em]">
      Build • Launch • Scale
    </div>
  </div>
);

