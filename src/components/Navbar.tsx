import React, { useState } from 'react';
import { Camera, Instagram, Phone, Sparkles, Calendar, Menu, X } from 'lucide-react';
import { STUDIO_INFO } from '../data/mockData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenMusicLibrary: () => void;
  onOpenMyBookings: () => void;
  onOpenInstagram?: () => void;
  onOpenEnquiry: (service?: string) => void;
  onNavigatePricing: () => void;
  onNavigatePortfolio: () => void;
  onNavigateReels: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenMusicLibrary,
  onOpenMyBookings,
  onOpenInstagram,
  onOpenEnquiry,
  onNavigatePricing,
  onNavigatePortfolio,
  onNavigateReels,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EFE8DF] transition-all">
      <div className="w-[98%] max-w-[1680px] mx-auto px-2 sm:px-4 h-20 flex items-center justify-between">
        {/* Brand Zone with Couple Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C87D55] rounded-lg p-1"
        >
          <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#DEB097] via-[#FFFDF9] to-[#BF5C3E] shadow-xs group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full overflow-hidden border border-white">
              <img
                src={STUDIO_INFO.coupleLogo}
                alt="HP Studio Signature Couple"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#BF5C3E] text-white flex items-center justify-center border border-white shadow-xs">
              <Camera className="w-2.5 h-2.5 stroke-[2]" />
            </div>
          </div>
          <div>
            <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#221C1A] block leading-tight">
              HP STUDIO
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#944D33] block">
              LUXURY CINEMATOGRAPHY
            </span>
          </div>
        </a>

        {/* Desktop Nav Zone */}
        <nav className="hidden lg:flex items-center gap-6 text-[13.5px] font-medium text-[#5C504A]">
          <button
            onClick={onNavigatePortfolio}
            className="hover:text-[#C87D55] transition-colors cursor-pointer py-1"
          >
            Portfolio
          </button>
          <button
            onClick={onNavigateReels}
            className="hover:text-[#C87D55] transition-colors cursor-pointer py-1 flex items-center gap-1.5"
          >
            <span>Reels</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E0533C] animate-pulse"></span>
          </button>
          <button
            onClick={onOpenMusicLibrary}
            className="hover:text-[#C87D55] transition-colors cursor-pointer py-1 flex items-center gap-1"
          >
            <span>Music Vault</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-bold">New</span>
          </button>
          <button
            onClick={onNavigatePricing}
            className="hover:text-[#C87D55] transition-colors cursor-pointer py-1"
          >
            Packages
          </button>
          <button
            onClick={onOpenMyBookings}
            className="hover:text-[#C87D55] transition-colors cursor-pointer py-1"
          >
            My Bookings
          </button>
        </nav>

        {/* Action Buttons Zone */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={STUDIO_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#FAF0E6] hover:bg-[#F5E6D8] text-[#C13584] border border-[#ECD9C6] transition-all hover:scale-105 cursor-pointer shadow-2xs"
            title="Open Original Instagram Profile (@hp_studio1040)"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <button
            onClick={onOpenBooking}
            className="px-3.5 py-2 rounded-lg bg-[#FAF0E6] hover:bg-[#F5E6D8] text-[#8C482B] text-xs font-semibold flex items-center gap-1.5 border border-[#ECD9C6] transition-all hover:shadow-xs cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C87D55]" />
            <span>Book Shoot</span>
          </button>
          <button
            onClick={() => onOpenEnquiry()}
            className="px-4 py-2 rounded-lg bg-[#BF5C3E] hover:bg-[#A94C30] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all hover:shadow-md active:scale-98 cursor-pointer"
          >
            <span>Send Enquiry</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#5C504A] hover:text-[#221C1A] rounded-lg focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DACB] px-5 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#5C504A]">
            <button
              onClick={() => {
                onNavigatePortfolio();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#C87D55]"
            >
              Portfolio
            </button>
            <button
              onClick={() => {
                onNavigateReels();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#C87D55] flex items-center justify-between"
            >
              <span>Reels & Bollywood Songs</span>
              <span className="text-[10px] bg-[#E0533C]/10 text-[#E0533C] px-2 py-0.5 rounded-full font-bold">Trending</span>
            </button>
            <button
              onClick={() => {
                onOpenMusicLibrary();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#C87D55] flex items-center justify-between"
            >
              <span>Bollywood Music Vault</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">8 Tracks</span>
            </button>
            <button
              onClick={() => {
                onNavigatePricing();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#C87D55]"
            >
              Packages & Pricing
            </button>
            <button
              onClick={() => {
                onOpenMyBookings();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#C87D55]"
            >
              My Scheduled Bookings
            </button>
            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#C87D55] flex items-center justify-between text-[#8C3A24] w-full text-left cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#C13584]" />
                <span>Open Instagram Page</span>
              </span>
              <span className="text-xs text-[#8C482B] font-mono">{STUDIO_INFO.handle}</span>
            </a>
          </div>

          <div className="pt-3 border-t border-[#ECD9C6] flex gap-2">
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-lg bg-[#FAF0E6] text-[#8C482B] text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#ECD9C6]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C87D55]" />
              <span>Book Shoot</span>
            </button>
            <button
              onClick={() => {
                onOpenEnquiry();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-lg bg-[#BF5C3E] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Send Enquiry</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
