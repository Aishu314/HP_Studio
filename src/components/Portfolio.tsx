import React, { useState } from 'react';
import { Camera, MapPin, Calendar, Heart, Share2, X, ChevronRight } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/mockData';
import { PortfolioItem, CategoryType } from '../types';

interface PortfolioProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenEnquiry: (serviceName?: string) => void;
  onShowToast: (message: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenEnquiry,
  onShowToast,
}) => {
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});

  const filterTabs: { label: CategoryType; key: string; count: number }[] = [
    { label: 'Wedding', key: 'Wedding', count: PORTFOLIO_ITEMS.filter((i) => i.category === 'Wedding').length },
    { label: 'Pre-Wedding', key: 'Pre-Wedding', count: PORTFOLIO_ITEMS.filter((i) => i.category === 'Pre-Wedding').length },
    { label: 'Baby', key: 'Baby', count: PORTFOLIO_ITEMS.filter((i) => i.category === 'Baby').length },
    { label: 'Events', key: 'Events', count: PORTFOLIO_ITEMS.filter((i) => i.category === 'Events').length },
    { label: 'Car Shoot', key: 'Car Shoot', count: PORTFOLIO_ITEMS.filter((i) => i.category === 'Car Shoot').length },
    { label: 'All', key: 'All', count: PORTFOLIO_ITEMS.length },
  ];

  const filteredItems = selectedCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => {
        if (selectedCategory === 'Baby' || selectedCategory === 'Baby Shoot') {
          return item.category === 'Baby';
        }
        return item.category.toLowerCase() === selectedCategory.toLowerCase();
      });

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedItems((prev) => {
      const next = !prev[id];
      if (next) onShowToast('Added to your favorite inspirations!');
      return { ...prev, [id]: next };
    });
  };

  const shareItem = (e: React.MouseEvent, item: PortfolioItem) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}#portfolio-${item.id}`);
    onShowToast(`Link to ${item.title} copied!`);
  };

  return (
    <section id="portfolio" className="py-10 px-1 sm:px-3">
      <div className="w-[98%] max-w-[1680px] mx-auto">
        {/* Calligraphic Script Heading matching screenshot */}
        <div className="text-center mb-6">
          <span className="font-script text-5xl sm:text-6xl text-[#BF5C3E] block tracking-wide select-none">
            Portfolio
          </span>
        </div>

        {/* Filter Tabs with exact counts */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8">
          {filterTabs.map((tab) => {
            const isTabActive =
              selectedCategory === tab.key ||
              (tab.key === 'Baby' && selectedCategory === 'Baby Shoot');

            return (
              <button
                key={tab.key}
                onClick={() => onSelectCategory(tab.key)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13px] transition-all cursor-pointer flex items-center gap-1.5 ${
                  isTabActive
                    ? 'bg-[#BF5C3E] text-white font-semibold shadow-xs'
                    : 'bg-[#F1E8DC] hover:bg-[#EADBCA] text-[#63544E]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isTabActive ? 'bg-white/25 text-white' : 'text-[#8A7971]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-[24px] overflow-hidden bg-[#241E1C] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 aspect-[16/11] border border-[#E8DACB]"
            >
              {/* Photo with Ken Burns subtle hover */}
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
              />

              {/* Gradient Scrim for readable high-contrast typography */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Top Floating Actions */}
              <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => toggleLike(e, item.id)}
                  className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  title="Save inspiration"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likedItems[item.id] ? 'fill-[#EF4444] text-[#EF4444]' : 'text-white'
                    }`}
                  />
                </button>
                <button
                  onClick={(e) => shareItem(e, item)}
                  className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  title="Share"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom Details matching screenshot */}
              <div className="absolute bottom-5 inset-x-0 text-center px-4 z-10">
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white tracking-wide drop-shadow-sm">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-semibold text-amber-100/90 mt-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Item Detail Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#ECD9C6] max-h-[90vh] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Big Image View */}
            <div className="md:w-3/5 bg-black relative flex items-center justify-center min-h-[300px] md:min-h-[480px]">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white/90 text-xs flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#BF5C3E]" />
                <span>{activeItem.location}</span>
              </div>
            </div>

            {/* Right: Story, Review & EXIF metadata */}
            <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between text-xs text-[#8A7971] mb-1">
                  <span className="uppercase tracking-widest font-semibold text-[#BF5C3E]">
                    {activeItem.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {activeItem.date}
                  </span>
                </div>

                <h3 className="font-serif-display text-2xl font-bold text-[#221B19]">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-[#5C504A] mt-2 leading-relaxed">
                  {activeItem.description}
                </p>

                {/* Client Review if available */}
                {activeItem.clientReview && (
                  <div className="mt-4 p-3.5 rounded-xl bg-[#F4EDE2] border border-[#ECD9C6]">
                    <p className="font-serif-display italic text-xs text-[#4A3D38] leading-relaxed">
                      "{activeItem.clientReview.quote}"
                    </p>
                    <p className="text-[11px] font-semibold text-[#BF5C3E] mt-1.5 text-right">
                      — {activeItem.clientReview.author}
                    </p>
                  </div>
                )}

                {/* EXIF Data */}
                <div className="mt-4 pt-4 border-t border-[#ECD9C6]/60">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#3D322E] mb-2">
                    <Camera className="w-3.5 h-3.5 text-[#BF5C3E]" />
                    <span>Technical Metadata</span>
                  </div>
                  <div className="text-[11px] text-[#695850] space-y-1 font-mono">
                    <p>• {activeItem.exif.camera}</p>
                    <p>• {activeItem.exif.lens}</p>
                    <p>• {activeItem.exif.settings}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-[#ECD9C6]">
                <button
                  onClick={() => {
                    const styleName = `${activeItem.title} (${activeItem.category})`;
                    setActiveItem(null);
                    onOpenEnquiry(styleName);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#BF5C3E] hover:bg-[#A94C30] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Inquire for this style</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
