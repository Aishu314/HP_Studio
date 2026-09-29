import React, { useState } from 'react';
import { Sparkles, Phone, Mail, Check, MessageCircle, Star, MapPin, ShieldCheck, Copy, Crown, Image as ImageIcon } from 'lucide-react';
import { STUDIO_INFO } from '../data/mockData';
import originalBokehImg from '../assets/images/hero_wedding_bokeh_1790716142080.jpg';

interface HeroProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  onNavigatePricing: () => void;
  onShowToast: (message: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectCategory,
  selectedCategory,
  onNavigatePricing,
  onShowToast,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeBanner, setActiveBanner] = useState<'palace' | 'garden'>('palace');

  const categories = ['Wedding', 'Baby Shoot', 'Events', 'Car Shoot'];

  const bannerImages = {
    palace: STUDIO_INFO.heroImage,
    garden: originalBokehImg,
  };

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      onShowToast('Phone number copied to clipboard!');
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      onShowToast('Email address copied to clipboard!');
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('Hi HP Studio! I would like to check availability and packages for my photoshoot.');
    window.open(`https://wa.me/${STUDIO_INFO.cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <section className="pt-3 pb-8 px-2 sm:px-4">
      <div className="max-w-5xl mx-auto">
        {/* Banner with Rounded Corners - Compact & Elegant */}
        <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-lg border border-[#E9DAC8] bg-[#221B19] h-[210px] sm:h-[270px] md:h-[300px]">
          {/* Hero Image */}
          <img
            src={bannerImages[activeBanner]}
            alt="HP Studio Wedding Photography"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.04] transition-all duration-700 ease-out hover:scale-103"
          />

          {/* Subtle Top & Bottom Gradient for Badges */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/45 pointer-events-none" />

          {/* Top Left Badge: Now Booking */}
          <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10 flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/25 text-white text-[11px] sm:text-xs font-bold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>Now Booking Dates</span>
            </div>
          </div>

          {/* Top Right Badges: Banner Switcher + Pricing */}
          <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 flex items-center gap-2">
            {/* Banner Theme Switcher */}
            <div className="hidden sm:inline-flex items-center gap-1 p-0.5 rounded-full bg-black/65 backdrop-blur-md border border-white/25 text-[11px] text-white">
              <button
                onClick={() => setActiveBanner('palace')}
                className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                  activeBanner === 'palace' ? 'bg-[#BF5C3E] text-white font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                Royal Palace
              </button>
              <button
                onClick={() => setActiveBanner('garden')}
                className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                  activeBanner === 'garden' ? 'bg-[#BF5C3E] text-white font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                Garden Bokeh
              </button>
            </div>

            <button
              onClick={onNavigatePricing}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 sm:py-1.5 rounded-full bg-white/95 hover:bg-white text-[#29221F] text-xs font-bold tracking-wide backdrop-blur-md shadow-md border border-white/40 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#C87D55]" />
              <span>Packages</span>
            </button>
          </div>
        </div>

        {/* Center Romantic Couple Medallion Logo & Verified Badge */}
        <div className="flex justify-center -mt-12 sm:-mt-14 relative z-20">
          <div className="relative group">
            {/* Double Ornate Ring Container */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#DEB097] via-[#FFFDF9] to-[#BF5C3E] shadow-xl">
              <div className="w-full h-full rounded-full border-3 border-[#FAF7F2] overflow-hidden bg-[#2D2422]">
                {/* Real Couple Logo Image */}
                <img
                  src={STUDIO_INFO.coupleLogo}
                  alt="HP Studio Signature Couple"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Verified checkmark badge */}
            <div
              className="absolute bottom-1.5 right-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#BF5C3E] text-white flex items-center justify-center border-2 border-[#FAF7F2] shadow-md"
              title="Verified Luxury Studio"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>
        </div>

        {/* Attractive Royal Marquee Box for HP STUDIO Heading & Description */}
        <div className="max-w-4xl mx-auto mt-4 sm:mt-6">
          <div className="relative rounded-[32px] sm:rounded-[40px] p-1.5 sm:p-2 bg-gradient-to-b from-[#EED9C7] via-[#FAF6EF] to-[#DEB097] shadow-xl shadow-[#4A2619]/8">
            <div className="relative rounded-[28px] sm:rounded-[34px] px-6 py-7 sm:px-12 sm:py-9 bg-gradient-to-b from-[#FFFDFB] via-[#FAF5EE] to-[#F5EBE0] border border-dashed border-[#C88A6F]/50 text-center space-y-3 sm:space-y-4 overflow-hidden">
              
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-3.5 left-4 text-[#C88A6F]/60 text-xs sm:text-sm select-none">✦</div>
              <div className="absolute top-3.5 right-4 text-[#C88A6F]/60 text-xs sm:text-sm select-none">✦</div>
              <div className="absolute bottom-3.5 left-4 text-[#C88A6F]/60 text-xs sm:text-sm select-none">✦</div>
              <div className="absolute bottom-3.5 right-4 text-[#C88A6F]/60 text-xs sm:text-sm select-none">✦</div>

              {/* Ambient radial glow inside box */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-36 bg-[#F5D8C3]/30 rounded-full blur-2xl pointer-events-none" />

              {/* Top Royal Heritage Badge */}
              <div className="relative z-10 inline-flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0E6] border border-[#ECD9C6] text-[11px] font-extrabold tracking-[0.28em] uppercase text-[#944D33]">
                <Crown className="w-3.5 h-3.5 text-[#BF5C3E]" />
                <span>EST. 2018 · PUNE & MUMBAI · CINEMATOGRAPHY</span>
                <Crown className="w-3.5 h-3.5 text-[#BF5C3E]" />
              </div>

              {/* Bolder, Attractive HP STUDIO Heading */}
              <h1 className="relative z-10 font-serif-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-[0.18em] sm:tracking-[0.24em] text-[#1A1210] uppercase drop-shadow-sm select-none leading-none">
                H P &nbsp; S T U D I O
              </h1>

              {/* Decorative Divider */}
              <div className="relative z-10 flex items-center justify-center gap-3 text-[#BF5C3E]/50 my-1">
                <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-[#BF5C3E]/40"></span>
                <span className="text-xs">✧ &nbsp; ⚜ &nbsp; ✧</span>
                <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-[#BF5C3E]/40"></span>
              </div>

              {/* Attractively Written Editorial Description */}
              <p className="relative z-10 font-serif-display text-base sm:text-xl lg:text-2xl text-[#4A3C37] max-w-2xl mx-auto leading-relaxed px-2 font-normal">
                <span className="italic">Crafting timeless poetry from your most sacred celebrations.</span>{' '}
                <span className="font-semibold text-[#221917]">Master photographers</span> for{' '}
                <span className="text-[#9E462A] font-semibold">royal weddings</span>, heartfelt birthdays,{' '}
                <span className="text-[#9E462A] font-semibold">baby milestones</span>, and forever memories—preserving raw emotions that become immortal heirlooms.
              </p>

              {/* Studio Destinations Tagline Strip inside the Box */}
              <div className="relative z-10 pt-1 flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#8C7A72]">
                <span>Pune (Koregaon Park)</span>
                <span>·</span>
                <span>Mumbai (Bandra West)</span>
                <span>·</span>
                <span>Udaipur</span>
                <span>·</span>
                <span>Worldwide Destinations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-5">
          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase() ||
              (cat === 'Baby Shoot' && selectedCategory.toLowerCase() === 'baby');
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat === 'Baby Shoot' ? 'Baby' : cat)}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#BF5C3E] text-white shadow-xs font-semibold'
                    : 'bg-[#F1E8DC] hover:bg-[#EADBCA] text-[#63544E]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Contact Row (Phone, Email, WhatsApp) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-5">
          {/* Phone Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-full bg-[#FAF7F2] border border-[#ECD9C6] text-xs sm:text-[13px] text-[#423733] shadow-2xs hover:border-[#D1B59C] transition-colors">
            <Phone className="w-3.5 h-3.5 text-[#BF5C3E]" />
            <span className="font-medium tracking-wide">{STUDIO_INFO.phone}</span>
            <button
              onClick={() => copyToClipboard(STUDIO_INFO.phone, 'phone')}
              className="text-[11px] text-[#8C7A72] hover:text-[#BF5C3E] ml-0.5 flex items-center gap-1 cursor-pointer"
              title="Copy phone"
            >
              {copiedPhone ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span className="text-[10px]">{copiedPhone ? 'copied' : 'copy'}</span>
            </button>
          </div>

          {/* Email Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-full bg-[#FAF7F2] border border-[#ECD9C6] text-xs sm:text-[13px] text-[#423733] shadow-2xs hover:border-[#D1B59C] transition-colors">
            <Mail className="w-3.5 h-3.5 text-[#BF5C3E]" />
            <span className="font-medium">{STUDIO_INFO.email}</span>
            <button
              onClick={() => copyToClipboard(STUDIO_INFO.email, 'email')}
              className="text-[11px] text-[#8C7A72] hover:text-[#BF5C3E] ml-0.5 flex items-center gap-1 cursor-pointer"
              title="Copy email"
            >
              {copiedEmail ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span className="text-[10px]">{copiedEmail ? 'copied' : 'copy'}</span>
            </button>
          </div>

          {/* WhatsApp Direct Pill */}
          <button
            onClick={openWhatsApp}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:py-2 rounded-full bg-[#E3F6EC] hover:bg-[#D4EFE0] text-[#0D6832] border border-[#BCE4CD] text-xs sm:text-[13px] font-semibold transition-all hover:scale-102 active:scale-98 cursor-pointer shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-[#0D6832] text-[#0D6832]" />
            <span>WhatsApp</span>
          </button>
        </div>

        {/* Social Proof Trust Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-7 mt-6 text-xs sm:text-[13px] text-[#6E5E57] pt-2 border-t border-[#EFE5D8]/70">
          <div className="flex items-center gap-1.5 font-medium">
            <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
            <span className="font-semibold text-[#211B19]">{STUDIO_INFO.rating}</span>
            <span>({STUDIO_INFO.reviewsCount})</span>
          </div>
          <span className="text-[#DAC9B7] hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#BF5C3E]" />
            <span>{STUDIO_INFO.locations}</span>
          </div>
          <span className="text-[#DAC9B7] hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>Same-Week Preview</span>
          </div>
        </div>
      </div>
    </section>
  );
};

