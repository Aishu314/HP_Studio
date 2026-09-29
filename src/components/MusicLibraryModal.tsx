import React, { useState, useEffect } from 'react';
import {
  X, Search, Play, Pause, Music, Volume2, VolumeX, ShieldCheck,
  Sparkles, Check, Disc, Sliders, ArrowRight, Film
} from 'lucide-react';
import { BOLLYWOOD_MUSIC_LIBRARY } from '../data/musicLibrary';
import { MusicTrack } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface MusicLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrackForSync: (track: MusicTrack) => void;
  selectedTrackId?: string;
  onShowToast: (message: string) => void;
}

export const MusicLibraryModal: React.FC<MusicLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectTrackForSync,
  selectedTrackId,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [visualizerBars, setVisualizerBars] = useState<number[]>([20, 50, 35, 75, 40, 60, 30]);

  const categories = [
    'All',
    'Bridal Entry',
    'Sangeet / Dance',
    'Pre-Wedding Romance',
    'Baby & Lullaby',
    'Acoustic / Emotional',
    'High Energy & Automotive',
  ];

  // Visualizer loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentlyPlayingId && !isMuted) {
        setVisualizerBars(audioEngine.getVisualizerData());
      }
    }, 120);

    return () => clearInterval(interval);
  }, [currentlyPlayingId, isMuted]);

  // Clean up audio on close
  useEffect(() => {
    if (!isOpen && currentlyPlayingId) {
      audioEngine.stop();
      setCurrentlyPlayingId(null);
    }
  }, [isOpen, currentlyPlayingId]);

  if (!isOpen) return null;

  const handleTogglePlay = (track: MusicTrack) => {
    if (currentlyPlayingId === track.id) {
      audioEngine.stop();
      setCurrentlyPlayingId(null);
    } else {
      audioEngine.play(track.audioTrackId);
      setCurrentlyPlayingId(track.id);
      onShowToast(`🎵 Now Playing: ${track.title}`);
    }
  };

  const handleToggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleSyncTrack = (track: MusicTrack) => {
    onSelectTrackForSync(track);
    onShowToast(`✨ Track synced: "${track.title}" attached to your project!`);
    onClose();
  };

  const filteredTracks = BOLLYWOOD_MUSIC_LIBRARY.filter((track) => {
    const matchesCategory =
      selectedCategory === 'All' || track.category === selectedCategory;
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.movieOrArtist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.mood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.popularFor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activePlayingTrack = BOLLYWOOD_MUSIC_LIBRARY.find((t) => t.id === currentlyPlayingId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-[32px] overflow-hidden shadow-2xl border border-[#ECD9C6] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#2B211E] to-[#1E1715] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 text-xs text-amber-300 font-semibold tracking-wider uppercase mb-1">
            <Music className="w-4 h-4 animate-pulse" />
            <span>HP Studio Vault · Licensed Bollywood Music</span>
          </div>

          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight">
            Curated Bollywood Reel & Video Soundtracks
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mt-1.5 leading-relaxed">
            Preview and select pre-cleared, royalty-free and master-licensed Bollywood audio tracks.
            Guaranteed copyright-strike-free for Instagram Reels, YouTube Shorts, and heirloom films.
          </p>

          {/* Search bar inside header */}
          <div className="mt-5 relative">
            <Search className="w-4 h-4 text-[#A89890] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Bollywood song, movie, mood (e.g. Sangeet, Kesariya, Bansuri, Lo-Fi)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder-stone-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#BF5C3E]"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-6 py-3 bg-[#F4EDE2] border-b border-[#ECD9C6] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#BF5C3E] text-white shadow-xs font-semibold'
                  : 'bg-white text-[#63544E] hover:bg-[#EAE0D2] border border-[#ECD9C6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tracks List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
          {filteredTracks.length === 0 ? (
            <div className="text-center py-12 text-[#7B6A63]">
              <Music className="w-10 h-10 mx-auto text-[#BF5C3E]/50 mb-2" />
              <p className="text-sm font-semibold">No tracks match your query "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-2 text-xs text-[#BF5C3E] underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredTracks.map((track) => {
              const isPlaying = currentlyPlayingId === track.id;
              const isSelected = selectedTrackId === track.id;

              return (
                <div
                  key={track.id}
                  className={`rounded-2xl p-4 sm:p-4.5 border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                    isPlaying
                      ? 'bg-[#FFF8F2] border-[#BF5C3E] shadow-sm'
                      : 'bg-white hover:bg-[#FAF4EC] border-[#E8DACB]'
                  }`}
                >
                  {/* Left: Play button & Song Details */}
                  <div className="flex items-start sm:items-center gap-3.5 flex-1">
                    {/* Play/Pause Button */}
                    <button
                      onClick={() => handleTogglePlay(track)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-sm cursor-pointer ${
                        isPlaying
                          ? 'bg-[#BF5C3E] text-white scale-105'
                          : 'bg-[#FAF0E6] text-[#783921] hover:bg-[#F2DEC9] border border-[#E0D0C0]'
                      }`}
                      title={isPlaying ? 'Pause preview' : 'Play audio preview'}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-white" />
                      ) : (
                        <Play className="w-5 h-5 fill-[#783921] translate-x-0.5" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-serif-display text-base sm:text-lg font-bold text-[#241E1C]">
                          {track.title}
                        </h4>

                        {/* Selected indicator */}
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                            Current Reel Track
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#6B5A53] font-medium">
                        {track.movieOrArtist}
                      </p>

                      {/* Meta badges: BPM, Duration, Mood, Popular For */}
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#7A6961] pt-0.5">
                        <span className="font-mono bg-[#F4EDE2] px-2 py-0.5 rounded-md">
                          {track.bpm} BPM
                        </span>
                        <span>·</span>
                        <span>{track.duration}</span>
                        <span>·</span>
                        <span className="italic text-[#BF5C3E]">{track.mood}</span>
                      </div>

                      {/* Recommended For */}
                      <p className="text-[11px] text-[#8C7A72]">
                        <span className="font-semibold text-[#4A3D38]">Best For:</span>{' '}
                        {track.popularFor}
                      </p>
                    </div>
                  </div>

                  {/* Right: Licensing Badge & Action Button */}
                  <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-[#ECD9C6]/60">
                    {/* License Badge */}
                    <div className="text-left md:text-right">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]">
                        <ShieldCheck className="w-3 h-3 text-[#2E7D32]" />
                        <span>{track.licenseBadge}</span>
                      </div>
                      <p className="text-[9px] text-[#8C7A72] mt-0.5 max-w-[150px] truncate hidden sm:block" title={track.licenseType}>
                        {track.licenseType}
                      </p>
                    </div>

                    {/* Sync with Reel Button */}
                    <button
                      onClick={() => handleSyncTrack(track)}
                      className="px-4 py-2 rounded-xl bg-[#BF5C3E] hover:bg-[#A94C30] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      <Film className="w-3.5 h-3.5" />
                      <span>Sync with Reel</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Live Audio Floating Ticker at Bottom if Playing */}
        {activePlayingTrack && (
          <div className="p-3.5 sm:p-4 bg-[#231B19] text-white flex items-center justify-between gap-4 border-t border-white/10 animate-in slide-in-from-bottom duration-150">
            <div className="flex items-center gap-3">
              {/* Rotating Disc */}
              <div
                className={`w-9 h-9 rounded-full bg-zinc-800 border border-white/20 flex items-center justify-center ${
                  !isMuted ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '3s' }}
              >
                <Disc className="w-5 h-5 text-amber-200" />
              </div>

              <div>
                <p className="text-xs font-bold text-amber-100 flex items-center gap-2">
                  <span>{activePlayingTrack.title}</span>
                  <span className="text-[10px] text-white/50">• {activePlayingTrack.bpm} BPM</span>
                </p>
                <p className="text-[10px] text-white/70">{activePlayingTrack.movieOrArtist}</p>
              </div>
            </div>

            {/* Visualizer bars */}
            <div className="hidden sm:flex items-end gap-1 h-5 px-3 py-1 bg-black/40 rounded-full border border-white/10">
              {visualizerBars.map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-[#BF5C3E] rounded-full transition-all duration-100"
                  style={{ height: `${!isMuted ? h : 15}%` }}
                />
              ))}
            </div>

            {/* Mute and Action */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleMute}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleSyncTrack(activePlayingTrack)}
                className="px-3.5 py-1.5 rounded-lg bg-[#BF5C3E] hover:bg-[#A94C30] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Sync This Song
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
