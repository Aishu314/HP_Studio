import React, { useState } from 'react';
import { Play, Music, Heart, ArrowUpRight, Volume2, Film } from 'lucide-react';
import { REELS_DATA, STUDIO_INFO } from '../data/mockData';
import { ReelItem, CategoryType } from '../types';
import { audioEngine } from '../utils/audioEngine';
import { ReelModal } from './ReelModal';

interface ReelsSectionProps {
  onOpenEnquiry: (serviceName?: string) => void;
  onOpenMusicLibrary: () => void;
  onShowToast: (message: string) => void;
}

export const ReelsSection: React.FC<ReelsSectionProps> = ({
  onOpenEnquiry,
  onOpenMusicLibrary,
  onShowToast,
}) => {
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [selectedReelCategory, setSelectedReelCategory] = useState<string>('All');

  const categories = ['All', 'Wedding', 'Pre-Wedding', 'Baby', 'Events', 'Car Shoot'];

  const handleOpenReel = (index: number) => {
    setActiveReelIndex(index);
  };

  const handleToggleInlineAudio = (e: React.MouseEvent, reel: ReelItem) => {
    e.stopPropagation();
    if (playingAudioId === reel.id) {
      audioEngine.stop();
      setPlayingAudioId(null);
      onShowToast('Audio paused');
    } else {
      audioEngine.play(reel.audioTrackId);
      setPlayingAudioId(reel.id);
      onShowToast(`🎵 Playing: ${reel.songTitle}`);
    }
  };

  const handleBookFromReel = (reelTitle: string, category: string) => {
    onOpenEnquiry(`Reel: ${reelTitle} (${category})`);
  };

  const filteredReels = selectedReelCategory === 'All'
    ? REELS_DATA
    : REELS_DATA.filter((r) => r.category.toLowerCase() === selectedReelCategory.toLowerCase());

  return (
    <section id="reels" className="py-10 px-1 sm:px-3">
      <div className="w-[98%] max-w-[1680px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-2 border-b border-[#EADCCD]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E0533C] animate-pulse"></span>
            <h2 className="text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-[#382E2B] flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-[#BF5C3E]" />
              <span>Featured Cinema Reels & Soundtracks ({filteredReels.length})</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMusicLibrary}
              className="px-3.5 py-1.5 rounded-xl bg-[#FAF0E6] hover:bg-[#F2DEC9] text-[#783921] border border-[#ECD9C6] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Music className="w-3.5 h-3.5 text-[#BF5C3E]" />
              <span>Bollywood Music Vault (8 Tracks)</span>
            </button>

            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#8C482B] hover:text-[#BF5C3E] flex items-center gap-1 transition-colors"
            >
              <span>Follow on Instagram</span>
              <span className="text-sm">→</span>
            </a>
          </div>
        </div>

        {/* Category Filter Pills for Reels */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {categories.map((cat) => {
            const count = cat === 'All'
              ? REELS_DATA.length
              : REELS_DATA.filter((r) => r.category.toLowerCase() === cat.toLowerCase()).length;
            const isActive = selectedReelCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedReelCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#BF5C3E] text-white shadow-xs font-semibold'
                    : 'bg-[#F1E8DC] hover:bg-[#EADBCA] text-[#63544E]'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'text-[#8A7971]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 10 Vertical Reels Grid (Wedding, Pre-Wedding, Baby, Events, Car Shoot) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {filteredReels.map((reel) => {
            const index = REELS_DATA.findIndex((r) => r.id === reel.id);
            const isPlayingThis = playingAudioId === reel.id;

            return (
              <div
                key={reel.id}
                onClick={() => handleOpenReel(index)}
                className="group relative rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#181211] shadow-md hover:shadow-2xl transition-all duration-300 aspect-[9/16] cursor-pointer border border-[#ECD9C6]/60 flex flex-col justify-between"
              >
                {/* Background Image with Cinematic Hover Zoom */}
                <img
                  src={reel.image}
                  alt={reel.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                />

                {/* Dark Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/90 pointer-events-none" />

                {/* Top Badges */}
                <div className="relative z-10 p-3 flex items-center justify-between text-white text-[11px] font-medium">
                  {/* Category Pill */}
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] uppercase font-bold tracking-wider">
                    {reel.category}
                  </span>

                  {/* Views pill */}
                  <span className="text-white/80 font-mono text-[10px] sm:text-[11px] bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full">
                    {reel.views}
                  </span>
                </div>

                {/* Center Play Button Overlay */}
                <div className="relative z-10 flex items-center justify-center my-auto">
                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:scale-115 group-hover:bg-[#BF5C3E]/90 transition-all duration-200 shadow-lg">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 p-3 sm:p-4 text-white space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] sm:text-xs font-semibold text-white/95 tracking-wide truncate">
                      @HP_STUDIO_06
                    </p>
                    {/* Inline Audio Preview toggle button */}
                    <button
                      onClick={(e) => handleToggleInlineAudio(e, reel)}
                      className={`p-1 rounded-full text-white/90 hover:text-white transition-colors ${
                        isPlayingThis ? 'bg-[#BF5C3E] text-white' : 'bg-black/40 hover:bg-black/70'
                      }`}
                      title={isPlayingThis ? 'Pause music' : 'Play Bollywood song preview'}
                    >
                      {isPlayingThis ? (
                        <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                      ) : (
                        <Music className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Bollywood song title */}
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-amber-200/90 font-medium truncate">
                    <Music className="w-3 h-3 text-[#E58869] shrink-0" />
                    <span className="truncate">{reel.songTitle}</span>
                  </div>

                  {/* Likes and Watch CTA */}
                  <div className="pt-1 flex items-center justify-between text-[11px] border-t border-white/15">
                    <span className="flex items-center gap-1 text-white/90 font-medium">
                      <Heart className="w-3.5 h-3.5 fill-[#EF4444] text-[#EF4444]" />
                      <span>{(reel.likes / 1000).toFixed(1)}K</span>
                    </span>

                    <span className="inline-flex items-center gap-0.5 text-white/90 font-semibold group-hover:text-amber-200 transition-colors">
                      <span>Watch</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Reel Experience Modal */}
      {activeReelIndex !== null && (
        <ReelModal
          reels={REELS_DATA}
          currentReelIndex={activeReelIndex}
          onClose={() => setActiveReelIndex(null)}
          onNavigateReel={(idx) => setActiveReelIndex(idx)}
          onBookReelVibe={handleBookFromReel}
          onOpenMusicLibrary={onOpenMusicLibrary}
          onShowToast={onShowToast}
        />
      )}
    </section>
  );
};
