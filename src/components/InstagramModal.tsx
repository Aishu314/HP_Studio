import React, { useState } from 'react';
import {
  X, Instagram, Copy, Check, ExternalLink, Smartphone, Globe,
  Heart, Sparkles, MapPin, Award, CheckCircle2
} from 'lucide-react';
import { STUDIO_INFO, PORTFOLIO_ITEMS } from '../data/mockData';

interface InstagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
}

export const InstagramModal: React.FC<InstagramModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('Hp_studio_06');
    setCopiedId(true);
    if (onShowToast) onShowToast('Copied Instagram ID: Hp_studio_06');
    setTimeout(() => setCopiedId(false), 2500);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(STUDIO_INFO.instagramUrl);
    setCopiedLink(true);
    if (onShowToast) onShowToast('Instagram link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleOpenApp = () => {
    // Attempt deep link to Instagram App on mobile/desktop
    const appUrl = 'instagram://user?username=Hp_studio_06';
    window.location.href = appUrl;
    // Fallback notification
    setTimeout(() => {
      if (onShowToast) onShowToast('Opening Instagram app for Hp_studio_06...');
    }, 500);
  };

  // Sample grid preview from portfolio
  const previewPosts = PORTFOLIO_ITEMS.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#FFFDFB] rounded-3xl shadow-2xl border border-[#ECD9C6] text-[#241E1C] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-3.5 bg-[#FFFDFB]/95 backdrop-blur-md border-b border-[#EBDCCF]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shadow-xs">
              <Instagram className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#382E2B] block leading-none">
                HP Studio Instagram
              </span>
              <span className="text-[10.5px] font-medium text-[#8C7A72]">
                Official Photography & Cinematography
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF0E6] hover:bg-[#F2DEC9] text-[#783921] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Profile Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#FAF5EE] to-[#F5EBE0] border border-[#ECD9C6] space-y-4">
            <div className="flex items-start gap-4">
              {/* Profile Avatar with Story Ring */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] shadow-md flex items-center justify-center">
                  <div className="w-full h-full rounded-full border-2 border-white bg-[#2E2421] flex items-center justify-center text-white font-serif-display font-bold text-lg sm:text-xl">
                    HP
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#BF5C3E] text-white flex items-center justify-center text-[10px] shadow-xs">
                  ★
                </div>
              </div>

              {/* Identity & Follow Counts */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-bold text-base sm:text-lg text-[#1F1715] leading-none">
                    HP STUDIO
                  </h3>
                  <CheckCircle2 className="w-4 h-4 text-[#3897F0] fill-[#3897F0] text-white shrink-0" />
                </div>

                {/* Handle Chip with Copy */}
                <div className="mt-1.5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#E0D0C0] shadow-2xs">
                  <span className="font-mono font-bold text-xs sm:text-sm text-[#9E462A]">
                    {STUDIO_INFO.handle}
                  </span>
                  <button
                    onClick={handleCopyId}
                    className="text-[11px] font-semibold text-[#66544E] hover:text-[#9E462A] flex items-center gap-1 cursor-pointer transition-colors"
                    title="Copy Instagram ID"
                  >
                    {copiedId ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Bio text */}
                <p className="mt-2 text-xs text-[#52443F] leading-relaxed">
                  Timeless wedding poetry, luxury pre-weddings & milestone heirlooms in Pune, Mumbai & Udaipur.
                </p>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#EBDCCF] text-center">
              <div className="p-2 rounded-xl bg-white/60">
                <span className="block font-bold text-sm text-[#2E2421]">380+</span>
                <span className="text-[10px] text-[#7A6B64] uppercase tracking-wider">Posts</span>
              </div>
              <div className="p-2 rounded-xl bg-white/60">
                <span className="block font-bold text-sm text-[#2E2421]">48.5K</span>
                <span className="text-[10px] text-[#7A6B64] uppercase tracking-wider">Followers</span>
              </div>
              <div className="p-2 rounded-xl bg-white/60">
                <span className="block font-bold text-sm text-[#2E2421]">240+</span>
                <span className="text-[10px] text-[#7A6B64] uppercase tracking-wider">Shoots</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Primary Direct Link to Web */}
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:brightness-105 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                <span>Open Instagram Web</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-90" />
              </a>

              {/* Deep Link to App */}
              <button
                onClick={handleOpenApp}
                className="py-3 px-4 rounded-xl bg-[#2E2421] hover:bg-[#1E1715] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-[#F58529]" />
                <span>Open in Instagram App</span>
              </button>
            </div>

            {/* Copy Link helper */}
            <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#FAF0E6] border border-[#ECD9C6] text-xs">
              <span className="text-[#6B5A53] truncate pr-2 font-mono text-[11px]">
                {STUDIO_INFO.instagramUrl}
              </span>
              <button
                onClick={handleCopyLink}
                className="shrink-0 text-[#9E462A] hover:text-[#BF5C3E] font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Browser / Login Wall Guidance */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-[#6B4B32] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#8C482B]">
              <Sparkles className="w-3.5 h-3.5 text-[#BF5C3E]" />
              <span>Direct Search Option (Avoids Blank Screen)</span>
            </div>
            <p className="leading-relaxed text-[11.5px]">
              If your web browser displays an empty page or login wall when opening Instagram, simply open your <strong>Instagram app</strong> on your phone and search for <strong>{STUDIO_INFO.handle}</strong>, or click the <strong>Copy ID</strong> button above to find our verified studio profile instantly.
            </p>
          </div>

          {/* Visual Feed Preview */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#382E2B]">
                Recent Studio Stories & Reels
              </span>
              <span className="text-[11px] text-[#8C7A72]">
                @HP_STUDIO_06
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {previewPosts.map((post) => (
                <a
                  key={post.id}
                  href={STUDIO_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square rounded-xl overflow-hidden bg-[#241E1C] border border-[#ECD9C6] block"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs p-1 text-center">
                    <Heart className="w-4 h-4 fill-white text-white mb-1" />
                    <span className="text-[9px] line-clamp-1">{post.title}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#FAF7F2] border-t border-[#EBDCCF] flex items-center justify-between text-[11px] text-[#7A6B64]">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#BF5C3E]" />
            <span>Koregaon Park, Pune & Bandra, Mumbai</span>
          </span>
          <button
            onClick={onClose}
            className="text-xs font-bold text-[#8C482B] hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
