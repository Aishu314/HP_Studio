import React, { useState } from 'react';
import {
  Camera, Instagram, Phone, Mail, MapPin, ArrowUp, Star, ShieldCheck,
  Award, Heart, Send, Sparkles, CheckCircle2, ExternalLink
} from 'lucide-react';
import { STUDIO_INFO, PORTFOLIO_ITEMS } from '../data/mockData';

interface FooterProps {
  onOpenInstagram?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInstagram }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  // Curated preview photos representing each content category
  const instaGrid = [
    PORTFOLIO_ITEMS.find((i) => i.id === 'wedding-varmala-shoot') || PORTFOLIO_ITEMS[0],
    PORTFOLIO_ITEMS.find((i) => i.id === 'prewedding-beach-shoot') || PORTFOLIO_ITEMS[1],
    PORTFOLIO_ITEMS.find((i) => i.id === 'baby-studio-shoot') || PORTFOLIO_ITEMS[2],
    PORTFOLIO_ITEMS.find((i) => i.id === 'events-haldi-shoot') || PORTFOLIO_ITEMS[3],
    PORTFOLIO_ITEMS.find((i) => i.id === 'car-porsche-shoot') || PORTFOLIO_ITEMS[4],
    PORTFOLIO_ITEMS.find((i) => i.id === 'car-supercar-shoot') || PORTFOLIO_ITEMS[5],
  ];

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E8DACB] pt-14 pb-10 px-1 sm:px-3 relative overflow-hidden">
      {/* Decorative ambient backdrop */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F5D8C3]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-[98%] max-w-[1680px] mx-auto space-y-12 relative z-10">
        {/* SECTION 1: Instagram Live Grid Feed */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-[#BF5C3E]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#241E1C]">
                Follow Our Daily Journey on Instagram
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#E1306C]/10 to-[#F77737]/10 hover:from-[#E1306C]/20 hover:to-[#F77737]/20 text-[#8C3A24] border border-[#EACEC0] text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                title="Open Original Instagram Profile"
              >
                <Instagram className="w-3.5 h-3.5 text-[#C13584]" />
                <span>Open Instagram Page</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#BF5C3E] hover:underline flex items-center gap-1 cursor-pointer"
                title="Follow Original Account on Instagram"
              >
                <span>Follow {STUDIO_INFO.handle}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* 6 Grid Photos */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
            {instaGrid.map((item, idx) => (
              <a
                key={idx}
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-2xl overflow-hidden bg-[#241E1C] border border-[#ECD9C6] shadow-2xs block cursor-pointer w-full text-left"
                title={`View ${item.title} on Original Instagram (${STUDIO_INFO.handle})`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2">
                  <Instagram className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-medium text-center line-clamp-1">{STUDIO_INFO.handle}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* SECTION 2: VIP Lookbook & Pricing Guide Box */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#2B211E] via-[#382B27] to-[#1E1715] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-white/10">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-medium border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary 2025–2026 Lookbook</span>
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-white">
              Get the HP Studio Wedding & Venue Inspiration Guide
            </h3>
            <p className="text-xs text-stone-300 max-w-lg">
              Receive curated Rajasthan, Mumbai, and Goa destination wedding timelines, lighting setups, and wardrobe color palettes.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2.5">
            {isSubscribed ? (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-4 py-3 rounded-xl border border-emerald-700/50">
                <CheckCircle2 className="w-4 h-4" />
                <span>Guide sent to your email!</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-stone-400 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#BF5C3E] min-w-[240px]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#BF5C3E] hover:bg-[#A94C30] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Send Me Guide
                </button>
              </>
            )}
          </form>
        </div>

        {/* SECTION 3: Four Rich Editorial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4 pb-8 border-b border-[#ECD9C6]/70 text-xs text-[#5C504A]">
          {/* Col 1: Brand & Couple Emblem */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full border border-[#DEB097] overflow-hidden p-0.5 shadow-xs">
                <img
                  src={STUDIO_INFO.coupleLogo}
                  alt="HP Studio Signature"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-serif-display text-xl font-bold tracking-[0.2em] text-[#221B19]">
                  HP STUDIO
                </span>
                <p className="text-[10px] text-[#7B6A63] font-medium tracking-wide">LUXURY CINEMATOGRAPHY</p>
              </div>
            </div>

            <p className="text-xs text-[#6B5A53] leading-relaxed">
              Capturing truthful, poetic heirlooms across Pune, Mumbai, Udaipur, and international destination weddings.
            </p>

            <div className="flex items-center gap-1.5 text-amber-700 font-semibold pt-1">
              <Award className="w-4 h-4 text-[#BF5C3E]" />
              <span>WedMeGood & Fearless Certified 2024</span>
            </div>
          </div>

          {/* Col 2: Signature Services */}
          <div className="space-y-2.5">
            <p className="font-serif-display text-sm font-bold text-[#221B19] tracking-wider uppercase">
              Signature Collections
            </p>
            <ul className="space-y-1.5 text-[#6B5A53]">
              <li>• Royal Destination Weddings</li>
              <li>• Cinematic Pre-Wedding Sagas</li>
              <li>• Newborn & 1st Birthday Milestones</li>
              <li>• High-Octane Automotive & Supercar</li>
              <li>• Sangeet, Haldi & Reception Nights</li>
              <li>• 4K Drone & Aerial Master Cuts</li>
            </ul>
          </div>

          {/* Col 3: Studio Destinations */}
          <div className="space-y-2.5">
            <p className="font-serif-display text-sm font-bold text-[#221B19] tracking-wider uppercase">
              Studio Destinations
            </p>
            <div className="space-y-2 text-[#6B5A53]">
              <div>
                <span className="font-bold text-[#241E1C] block">Pune Studio Suites</span>
                <span>Studio 402, North Main Road, Koregaon Park</span>
              </div>
              <div>
                <span className="font-bold text-[#241E1C] block">Mumbai Seafront Flagship</span>
                <span>Carter Road, Bandra West, Mumbai</span>
              </div>
              <div>
                <span className="font-bold text-[#241E1C] block">Rajasthan Operations</span>
                <span>Lake Palace Road, Udaipur</span>
              </div>
            </div>
          </div>

          {/* Col 4: Trust & Contacts */}
          <div className="space-y-2.5">
            <p className="font-serif-display text-sm font-bold text-[#221B19] tracking-wider uppercase">
              Direct Contact
            </p>
            <div className="space-y-2">
              <a
                href={`tel:${STUDIO_INFO.phone}`}
                className="flex items-center gap-2 hover:text-[#BF5C3E] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#BF5C3E]" />
                <span className="font-medium text-[#241E1C]">{STUDIO_INFO.phone}</span>
              </a>

              <a
                href={`mailto:${STUDIO_INFO.email}`}
                className="flex items-center gap-2 hover:text-[#BF5C3E] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#BF5C3E]" />
                <span>{STUDIO_INFO.email}</span>
              </a>

              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#BF5C3E] transition-colors cursor-pointer text-left"
                title="Open Original Instagram Profile"
              >
                <Instagram className="w-3.5 h-3.5 text-[#BF5C3E]" />
                <span>{STUDIO_INFO.handle}</span>
              </a>

              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7EE] text-[#196B36] font-semibold text-[11px] border border-[#A2D9B2]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#196B36]" />
                  <span>Licensed Bollywood Sync</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Bottom Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7B6A63]">
          <p>© 2024 HP STUDIO. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Booking Agreement</span>
          </div>

          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-[#FAF0E6] hover:bg-[#F0DFD0] text-[#783921] flex items-center justify-center border border-[#ECD9C6] transition-colors cursor-pointer"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
