import React from 'react';

// A tactile card with a defined border and "embedded" feel
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <div className={`bg-[#FDFDFD] rounded-xl border border-[#D4D4D4] shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

// A "Physical" button with 3D press effect
export const ActionButton: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  primary?: boolean;
  className?: string;
}> = ({ children, onClick, primary = false, className = "" }) => {
  // Base: Solid structure, rounded corners, transition on transform/shadow
  const baseClasses = "relative inline-flex items-center justify-center px-6 py-3 font-semibold transition-all duration-100 ease-out rounded-lg active:translate-y-[2px] active:border-b-0";
  
  // Primary: Orange, tactile thick bottom border for 3D effect
  const primaryClasses = "bg-[#FF6B00] text-white border-b-4 border-[#CC5500] hover:bg-[#FF7514] active:shadow-inner";
  
  // Secondary: White/Grey, thick bottom border
  const secondaryClasses = "bg-white text-[#1F1F1F] border border-[#D4D4D4] border-b-4 hover:bg-[#F9F9F9] active:bg-[#F0F0F0]";

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1.5 h-6 bg-[#FF6B00] rounded-sm"></div>
        <h2 className="text-2xl font-bold tracking-tight text-[#1F1F1F] uppercase">{title}</h2>
      </div>
      {subtitle && <p className="text-[#5A5A5A] ml-5 font-medium">{subtitle}</p>}
    </div>
  );
};

export const Tag: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-block px-3 py-1 text-xs font-bold tracking-wide uppercase text-[#4A4A4A] bg-[#EEEEEC] rounded border border-[#D1D1D1] mr-2 mb-2">
    {text}
  </span>
);