import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Camera, Video, Plane, Film, BookOpen, Clock } from 'lucide-react';
import { PRICING_PACKAGES } from '../data/mockData';
import { PricingPackage } from '../types';

interface PricingPackagesProps {
  onSelectPackage: (pkgName: string) => void;
  appliedPromo?: string;
}

export const PricingPackages: React.FC<PricingPackagesProps> = ({
  onSelectPackage,
  appliedPromo,
}) => {
  const [filter, setFilter] = useState<'all' | 'wedding' | 'shoots'>('all');

  // Custom Estimator state
  const [showEstimator, setShowEstimator] = useState(false);
  const [customDays, setCustomDays] = useState(1);
  const [includeDrone, setIncludeDrone] = useState(true);
  const [includeFilm, setIncludeFilm] = useState(true);
  const [includeAlbum, setIncludeAlbum] = useState(true);
  const [reelsCount, setReelsCount] = useState(3);

  const calculateCustomEstimate = () => {
    let total = customDays * 22000;
    if (includeDrone) total += 8000;
    if (includeFilm) total += 15000;
    if (includeAlbum) total += 7500;
    total += reelsCount * 2500;
    if (appliedPromo) total = Math.round(total * 0.9);
    return total;
  };

  const filteredPackages = PRICING_PACKAGES.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section id="pricing" className="py-12 px-1 sm:px-3 bg-[#FAF4EC]/60 border-y border-[#EFE4D6]">
      <div className="w-[98%] max-w-[1680px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] border border-[#ECD9C6] text-xs font-semibold text-[#8C482B] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C87D55]" />
            <span>Transparent Investment</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#221B19]">
            Packages & Investment
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5D56] mt-2">
            Every celebration is unique. Choose a handcrafted package or build your tailored bespoke coverage.
          </p>

          {/* Filter Segmented Control */}
          <div className="inline-flex items-center gap-1 p-1 bg-[#EFE3D5] rounded-xl mt-6 border border-[#DFD0BF]">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-[#211B19] shadow-xs font-semibold'
                  : 'text-[#63544E] hover:text-[#211B19]'
              }`}
            >
              All Packages
            </button>
            <button
              onClick={() => setFilter('wedding')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filter === 'wedding'
                  ? 'bg-white text-[#211B19] shadow-xs font-semibold'
                  : 'text-[#63544E] hover:text-[#211B19]'
              }`}
            >
              Wedding Sagas
            </button>
            <button
              onClick={() => setFilter('shoots')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filter === 'shoots'
                  ? 'bg-white text-[#211B19] shadow-xs font-semibold'
                  : 'text-[#63544E] hover:text-[#211B19]'
              }`}
            >
              Portraits & Milestones
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => {
            const finalPrice = appliedPromo ? Math.round(pkg.price * 0.9) : pkg.price;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-[#2E2421] to-[#1C1615] text-white shadow-xl scale-102 border-2 border-[#C87D55]'
                    : 'bg-[#FFFDFB] text-[#241E1C] border border-[#E8DACB] shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular / Feature Tag */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm ${
                        pkg.popular
                          ? 'bg-[#BF5C3E] text-white'
                          : 'bg-[#FAF0E6] text-[#8C482B] border border-[#ECD9C6]'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  <h3
                    className={`font-serif-display text-2xl font-bold ${
                      pkg.popular ? 'text-white' : 'text-[#241E1C]'
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={`text-xs mt-1 ${
                      pkg.popular ? 'text-stone-300' : 'text-[#6B5B54]'
                    }`}
                  >
                    {pkg.duration}
                  </p>

                  {/* Price */}
                  <div className="mt-5 pb-5 border-b border-white/15">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold font-serif-display tracking-tight">
                        ₹{finalPrice.toLocaleString('en-IN')}
                      </span>
                      <span
                        className={`text-xs line-through ${
                          pkg.popular ? 'text-stone-400' : 'text-[#9E8B83]'
                        }`}
                      >
                        ₹{pkg.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    {appliedPromo && (
                      <p className="text-[11px] text-emerald-400 mt-1 font-semibold">
                        Includes 10% Promo Discount
                      </p>
                    )}
                    <p
                      className={`text-xs mt-1 font-mono ${
                        pkg.popular ? 'text-amber-200/90' : 'text-[#BF5C3E]'
                      }`}
                    >
                      Team: {pkg.team}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="mt-5 space-y-2.5">
                    <p
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        pkg.popular ? 'text-amber-200/90' : 'text-[#8C482B]'
                      }`}
                    >
                      What You Receive:
                    </p>
                    {pkg.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs leading-snug">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            pkg.popular ? 'text-emerald-400' : 'text-emerald-600'
                          }`}
                        />
                        <span className={pkg.popular ? 'text-stone-200' : 'text-[#4A3D38]'}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5">
                    {pkg.features.map((feat, i) => (
                      <p
                        key={i}
                        className={`text-[11px] ${
                          pkg.popular ? 'text-stone-400' : 'text-[#7B6A63]'
                        }`}
                      >
                        • {feat}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Select Package CTA */}
                <div className="mt-6 pt-4">
                  <button
                    onClick={() => onSelectPackage(`${pkg.name} (₹${finalPrice.toLocaleString('en-IN')})`)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-98 cursor-pointer ${
                      pkg.popular
                        ? 'bg-[#BF5C3E] hover:bg-[#A94C30] text-white shadow-md'
                        : 'bg-[#FAF0E6] hover:bg-[#F2DEC9] text-[#783921] border border-[#E2CEB8]'
                    }`}
                  >
                    <span>Choose {pkg.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Estimate Calculator Toggle */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowEstimator(!showEstimator)}
            className="text-xs sm:text-sm font-semibold text-[#8C482B] hover:text-[#BF5C3E] underline decoration-dashed underline-offset-4 cursor-pointer"
          >
            {showEstimator ? 'Hide Custom Quote Estimator ▲' : '✦ Want a custom multi-day quote? Open Cost Estimator ▼'}
          </button>
        </div>

        {/* Custom Quote Estimator Drawer */}
        {showEstimator && (
          <div className="mt-6 bg-[#FFFDFB] rounded-3xl p-6 sm:p-8 border border-[#E9DACB] shadow-sm animate-in fade-in slide-in-from-top-3 duration-200">
            <h3 className="font-serif-display text-xl font-bold text-[#221B19] mb-4 text-center">
              Interactive Custom Estimate Builder
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              {/* Shoot Days */}
              <div className="p-3.5 rounded-2xl bg-[#FAF4EC] border border-[#ECD9C6]">
                <span className="font-semibold text-[#3D322E] block mb-2">Duration (Days)</span>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((d) => (
                    <button
                      key={d}
                      onClick={() => setCustomDays(d)}
                      className={`flex-1 py-1.5 rounded-lg font-bold ${
                        customDays === d
                          ? 'bg-[#BF5C3E] text-white'
                          : 'bg-white text-[#5C504A] border border-[#E2CEB8]'
                      }`}
                    >
                      {d} {d === 1 ? 'Day' : 'Days'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4K Drone */}
              <div
                onClick={() => setIncludeDrone(!includeDrone)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  includeDrone ? 'bg-[#EBF7EE] border-[#9AD2AC]' : 'bg-[#FAF4EC] border-[#ECD9C6]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#3D322E]">Aerial 4K Drone</span>
                  <span className={`text-xs ${includeDrone ? 'text-emerald-700 font-bold' : 'text-stone-400'}`}>
                    {includeDrone ? '✓ Included' : '+ Add'}
                  </span>
                </div>
                <p className="text-[11px] text-[#7B6A63] mt-1">+₹8,000 / Day</p>
              </div>

              {/* Cinematic Film */}
              <div
                onClick={() => setIncludeFilm(!includeFilm)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  includeFilm ? 'bg-[#EBF7EE] border-[#9AD2AC]' : 'bg-[#FAF4EC] border-[#ECD9C6]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#3D322E]">Cinema Wedding Film</span>
                  <span className={`text-xs ${includeFilm ? 'text-emerald-700 font-bold' : 'text-stone-400'}`}>
                    {includeFilm ? '✓ Included' : '+ Add'}
                  </span>
                </div>
                <p className="text-[11px] text-[#7B6A63] mt-1">+₹15,000 (Color Graded)</p>
              </div>

              {/* Instagram Reels */}
              <div className="p-3.5 rounded-2xl bg-[#FAF4EC] border border-[#ECD9C6]">
                <span className="font-semibold text-[#3D322E] block mb-2">
                  Reels ({reelsCount})
                </span>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={reelsCount}
                  onChange={(e) => setReelsCount(Number(e.target.value))}
                  className="w-full accent-[#BF5C3E]"
                />
                <span className="text-[11px] text-[#7B6A63] block mt-1">₹2,500 / Reel</span>
              </div>
            </div>

            {/* Calculated Result */}
            <div className="mt-6 pt-5 border-t border-[#ECD9C6] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#7B6A63]">Estimated Investment:</span>
                <div className="text-3xl font-serif-display font-bold text-[#BF5C3E]">
                  ₹{calculateCustomEstimate().toLocaleString('en-IN')}
                </div>
              </div>

              <button
                onClick={() =>
                  onSelectPackage(
                    `Custom Package: ${customDays} Days, ${reelsCount} Reels, Est: ₹${calculateCustomEstimate().toLocaleString('en-IN')}`
                  )
                }
                className="px-6 py-2.5 rounded-xl bg-[#BF5C3E] hover:bg-[#A94C30] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
              >
                Book This Custom Estimate
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
