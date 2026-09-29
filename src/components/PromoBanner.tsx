import React, { useState } from 'react';
import { Sparkles, Check, Tag } from 'lucide-react';

interface PromoBannerProps {
  onApplyPromo: (code: string) => void;
  appliedPromo: string;
  onShowToast: (message: string) => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  onApplyPromo,
  appliedPromo,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);
  const code = 'HPSTUDIO10';
  const isApplied = appliedPromo === code;

  const handleApply = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    onApplyPromo(code);
    onShowToast('🎉 Promo code HPSTUDIO10 applied! 10% discount activated.');
  };

  return (
    <div className="w-[98%] max-w-[1680px] mx-auto px-1 sm:px-3 my-4">
      <div
        onClick={handleApply}
        className={`group cursor-pointer rounded-2xl p-3 sm:p-3.5 text-center border transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 ${
          isApplied
            ? 'bg-[#EBF7EE] border-[#A2D9B2] text-[#196B36] shadow-xs'
            : 'bg-[#FDF4EC] hover:bg-[#F9ECE0] border-[#F1D7C3] text-[#733E2B] shadow-2xs'
        }`}
      >
        <span className="text-xs sm:text-sm font-serif-display font-medium tracking-wide flex items-center gap-1.5">
          <span className="text-[#BF5C3E]">♡</span>
          <span>Get 10% Discount on Your First Shoot</span>
          <span className="text-[#BF5C3E]">♡</span>
        </span>

        <span className="hidden sm:inline text-[#D4B59E]">·</span>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/80 border border-[#E9DACB] text-xs font-semibold group-hover:scale-103 transition-transform">
          {isApplied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-mono text-emerald-700">Code: {code}</span>
              <span className="text-[10px] text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full font-bold">Applied (-10%)</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-[#BF5C3E]" />
              <span className="font-mono text-[#423733]">Code: {code}</span>
              <span className="text-[11px] text-[#BF5C3E] underline font-medium">Tap to Apply</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
