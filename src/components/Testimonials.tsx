import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));
  };

  const item = TESTIMONIALS[currentIndex];

  return (
    <div className="w-[98%] max-w-[1680px] mx-auto px-1 sm:px-3 my-6">
      {/* Featured Quote Pill matching Screenshot 2 & 4 */}
      <div className="relative rounded-2xl bg-[#FFFDF9] border border-[#EADBCA] py-4 px-6 sm:px-10 shadow-2xs text-center">
        <div className="flex items-center justify-center gap-3">
          <Quote className="w-4 h-4 text-[#BF5C3E] rotate-180 shrink-0 opacity-70" />
          <p className="font-serif-display italic text-[#4A3C37] text-sm sm:text-base leading-relaxed">
            "{item.quote}"
          </p>
          <Quote className="w-4 h-4 text-[#BF5C3E] shrink-0 opacity-70" />
          <span className="font-sans font-semibold text-xs sm:text-[13px] text-[#241D1B] shrink-0">
            — {item.author}
          </span>
        </div>

        {/* Carousel indicator dots if multiple */}
        {TESTIMONIALS.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  currentIndex === i ? 'w-4 bg-[#BF5C3E]' : 'bg-[#E0D0C0]'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
