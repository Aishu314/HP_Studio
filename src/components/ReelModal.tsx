import React, { useState, useEffect } from 'react';
import {
  X, Play, Pause, Volume2, VolumeX, Heart, MessageCircle, Share2,
  Bookmark, ChevronUp, ChevronDown, Music, Check, Send, Sparkles, Disc,
  Instagram, ArrowUpRight
} from 'lucide-react';
import { ReelItem } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface ReelModalProps {
  reels: ReelItem[];
  currentReelIndex: number;
  onClose: () => void;
  onNavigateReel: (index: number) => void;
  onBookReelVibe: (reelTitle: string, category: string) => void;
  onOpenMusicLibrary?: () => void;
  onShowToast: (message: string) => void;
}

export const ReelModal: React.FC<ReelModalProps> = ({
  reels,
  currentReelIndex,
  onClose,
  onNavigateReel,
  onBookReelVibe,
  onOpenMusicLibrary,
  onShowToast,
}) => {
  const reel = reels[currentReelIndex];
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likes, setLikes] = useState<Record<string, number>>({
    [reel.id]: reel.likes,
  });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState(reel.comments);
  const [progress, setProgress] = useState(0);
  const [visualizerBars, setVisualizerBars] = useState<number[]>([30, 60, 45, 80, 50, 65, 40]);

  // Start audio on reel change
  useEffect(() => {
    setLocalComments(reel.comments);
    setIsPlayingAudio(true);
    audioEngine.play(reel.audioTrackId);

    return () => {
      audioEngine.stop();
    };
  }, [currentReelIndex, reel.audioTrackId, reel.comments]);

  // Visualizer & Progress ticker
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlayingAudio && !isMuted) {
        setVisualizerBars(audioEngine.getVisualizerData());
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
      }
    }, 150);

    return () => clearInterval(interval);
  }, [isPlayingAudio, isMuted]);

  const toggleAudio = () => {
    if (isPlayingAudio) {
      audioEngine.stop();
      setIsPlayingAudio(false);
    } else {
      audioEngine.play(reel.audioTrackId);
      setIsPlayingAudio(true);
    }
  };

  const toggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
    onShowToast(muted ? 'Muted' : 'Unmuted audio');
  };

  const handleLike = () => {
    const currentLiked = !!hasLiked[reel.id];
    setHasLiked((prev) => ({ ...prev, [reel.id]: !currentLiked }));
    setLikes((prev) => ({
      ...prev,
      [reel.id]: (prev[reel.id] || reel.likes) + (currentLiked ? -1 : 1),
    }));
    if (!currentLiked) {
      onShowToast('❤️ Added to your liked reels!');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}#reel-${reel.id}`);
    onShowToast('🔗 Reel link copied to clipboard!');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      user: 'you',
      avatar: '✨',
      text: commentText.trim(),
      time: 'Just now',
    };
    setLocalComments([newComment, ...localComments]);
    setCommentText('');
    onShowToast('💬 Comment posted!');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Reel Card Container */}
      <div
        className="relative w-full max-w-sm sm:max-w-md h-[88vh] max-h-[760px] bg-[#14100F] rounded-[32px] overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reel Background Visual with Cinematic Motion */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
          <img
            src={reel.image}
            alt={reel.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] animate-pulse duration-[8000ms]"
          />
          {/* Multi-stage Scrims for pristine readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
        </div>

        {/* Top Header: Category, Sound ticker, and Close */}
        <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
              {reel.category} Reel
            </span>
            <span className="text-xs text-white/70">· {reel.views} views</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Visualizer */}
            <div className="flex items-end gap-0.5 h-4 px-2 py-1 bg-black/40 rounded-full border border-white/10">
              {visualizerBars.slice(0, 5).map((height, i) => (
                <div
                  key={i}
                  className="w-1 bg-[#BF5C3E] rounded-full transition-all duration-150"
                  style={{ height: `${isPlayingAudio && !isMuted ? height : 15}%` }}
                />
              ))}
            </div>

            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Tap to Play/Pause Overlay */}
        <div
          className="relative z-10 flex-1 flex items-center justify-center cursor-pointer"
          onClick={toggleAudio}
        >
          {!isPlayingAudio && (
            <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/30 shadow-xl animate-in zoom-in-75 duration-150">
              <Play className="w-8 h-8 fill-white translate-x-0.5" />
            </div>
          )}
        </div>

        {/* Right Side Vertical Action Rail */}
        <div className="absolute right-3.5 bottom-24 z-20 flex flex-col items-center gap-4 text-white">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                hasLiked[reel.id]
                  ? 'bg-rose-600/90 text-white scale-110'
                  : 'bg-black/40 hover:bg-black/60 text-white'
              }`}
            >
              <Heart
                className={`w-5 h-5 ${hasLiked[reel.id] ? 'fill-white stroke-white' : 'stroke-white'}`}
              />
            </div>
            <span className="text-[11px] font-semibold mt-1 drop-shadow-md">
              {(likes[reel.id] || reel.likes).toLocaleString()}
            </span>
          </button>

          {/* Comments Button */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center transition-all">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-[11px] font-semibold mt-1 drop-shadow-md">
              {localComments.length}
            </span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center transition-all">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-[11px] font-semibold mt-1 drop-shadow-md">Share</span>
          </button>

          {/* Save / Bookmark Button */}
          <button
            onClick={() => {
              setIsSaved(!isSaved);
              onShowToast(isSaved ? 'Removed from saved' : '🔖 Reel saved to your collection!');
            }}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                isSaved ? 'bg-amber-500/90 text-white' : 'bg-black/40 hover:bg-black/60 text-white'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
            </div>
            <span className="text-[11px] font-semibold mt-1 drop-shadow-md">Save</span>
          </button>

          {/* Spinning Vinyl Record for Audio */}
          <div className="mt-1 relative group cursor-pointer" onClick={toggleAudio}>
            <div
              className={`w-10 h-10 rounded-full border-2 border-white/40 bg-zinc-900 flex items-center justify-center shadow-lg ${
                isPlayingAudio && !isMuted ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '3.5s' }}
            >
              <Disc className="w-6 h-6 text-amber-200" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#BF5C3E] flex items-center justify-center">
              <Music className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
        </div>

        {/* Bottom Details Section */}
        <div className="relative z-10 p-5 space-y-2 text-white">
          {/* Progress Bar */}
          <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mb-3">
            <div
              className="bg-[#BF5C3E] h-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Account & Title with Working Instagram Profile Links */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/hp_studio_06/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.instagram.com/hp_studio_06/', '_blank', 'noopener,noreferrer');
                }}
                className="flex items-center gap-2 group cursor-pointer"
                title="Open HP Studio on Instagram"
              >
                <div className="w-8 h-8 rounded-full border border-white/50 bg-[#C87D55] flex items-center justify-center text-xs font-bold group-hover:scale-105 transition-transform">
                  HP
                </div>
                <span className="font-semibold text-sm tracking-wide group-hover:text-amber-200 transition-colors">
                  @HP_STUDIO_06
                </span>
              </a>

              <a
                href="https://www.instagram.com/hp_studio_06/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.instagram.com/hp_studio_06/', '_blank', 'noopener,noreferrer');
                }}
                className="bg-gradient-to-r from-[#E1306C] to-[#F77737] hover:brightness-110 text-white font-bold px-2.5 py-0.5 rounded-full text-[10.5px] shadow-xs flex items-center gap-1 cursor-pointer transition-all"
                title="Follow on Instagram"
              >
                <Instagram className="w-3 h-3" />
                <span>Follow</span>
              </a>
            </div>

            <a
              href="https://www.instagram.com/hp_studio_06/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                window.open('https://www.instagram.com/hp_studio_06/', '_blank', 'noopener,noreferrer');
              }}
              className="text-[10px] sm:text-[11px] bg-white/15 hover:bg-white/25 text-white font-medium px-2.5 py-1 rounded-full backdrop-blur-md transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Open Instagram Page</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          <p className="text-xs text-white/90 line-clamp-2 max-w-[80%] leading-relaxed drop-shadow-xs">
            {reel.description}
          </p>

          {/* Bollywood Audio Ticker */}
          <div className="flex items-center justify-between bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 max-w-[90%]">
            <div className="flex items-center gap-2 truncate">
              <Music className="w-3.5 h-3.5 text-[#E58869] shrink-0 animate-pulse" />
              <span className="text-xs font-medium truncate text-amber-100/90">
                {reel.songTitle} · {reel.songArtist}
              </span>
            </div>
            {onOpenMusicLibrary && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                  onOpenMusicLibrary();
                }}
                className="text-[10px] bg-white/20 hover:bg-white/30 text-white font-semibold px-2 py-0.5 rounded-full ml-1.5 shrink-0 transition-colors"
              >
                Change
              </button>
            )}
          </div>

          {/* Action CTA: Book This Vibe */}
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onBookReelVibe(reel.title, reel.category);
              }}
              className="flex-1 py-2.5 rounded-xl bg-[#BF5C3E] hover:bg-[#A94C30] text-white text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book This Shoot Style</span>
            </button>
          </div>
        </div>

        {/* Up / Down Navigation Controls */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          {currentReelIndex > 0 && (
            <button
              onClick={() => onNavigateReel(currentReelIndex - 1)}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-colors"
              title="Previous Reel"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          )}
          {currentReelIndex < reels.length - 1 && (
            <button
              onClick={() => onNavigateReel(currentReelIndex + 1)}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-colors"
              title="Next Reel"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Comments Drawer Overlay */}
        {showComments && (
          <div
            className="absolute inset-x-0 bottom-0 h-[65%] z-30 bg-[#1D1716]/95 backdrop-blur-xl rounded-t-3xl border-t border-white/20 p-4 flex flex-col justify-between animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-white">
                <span className="text-xs font-bold tracking-wide">
                  Comments ({localComments.length})
                </span>
                <button
                  onClick={() => setShowComments(false)}
                  className="p-1 hover:text-[#BF5C3E]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Comment List */}
              <div className="space-y-3 mt-3 overflow-y-auto max-h-[220px] pr-1">
                {localComments.map((c, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-white">
                    <span className="text-base">{c.avatar}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-amber-200/90 text-[11px]">
                          @{c.user}
                        </span>
                        <span className="text-[10px] text-white/50">{c.time}</span>
                      </div>
                      <p className="text-white/80 text-[11px] mt-0.5 leading-snug">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="pt-2 border-t border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs focus:outline-none focus:ring-1 focus:ring-[#BF5C3E]"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-[#BF5C3E] text-white text-xs font-semibold hover:bg-[#A94C30] transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
