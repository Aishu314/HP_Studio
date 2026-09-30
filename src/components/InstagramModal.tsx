import React, { useState, useEffect } from 'react';
import {
  X, Instagram, Copy, Check, ExternalLink, Smartphone, Globe,
  Heart, Sparkles, MapPin, Award, CheckCircle2, MessageCircle,
  Send, MoreHorizontal, Bookmark, Share2, Grid, Film, Tag,
  ChevronLeft, ChevronRight, Play, Phone, Mail, Calendar, Eye
} from 'lucide-react';
import { STUDIO_INFO, PORTFOLIO_ITEMS, REELS_DATA } from '../data/mockData';
import { PortfolioItem, ReelItem } from '../types';

interface InstagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
  onOpenBooking?: () => void;
}

export const InstagramModal: React.FC<InstagramModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'tagged'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(48290);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Detail post lightbox state
  const [selectedPost, setSelectedPost] = useState<PortfolioItem | null>(null);
  const [postLikes, setPostLikes] = useState<{ [id: string]: number }>({});
  const [likedPosts, setLikedPosts] = useState<{ [id: string]: boolean }>({});
  const [userComments, setUserComments] = useState<{ [id: string]: string[] }>({});
  const [newCommentText, setNewCommentText] = useState('');

  // Story highlight viewer state
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);

  // In-app DM modal state
  const [isDmOpen, setIsDmOpen] = useState(false);
  const [dmMessages, setDmMessages] = useState<Array<{ sender: 'studio' | 'user'; text: string; time: string }>>([
    {
      sender: 'studio',
      text: 'Hello! Welcome to HP STUDIO (@hp_studio1040). Let us know your shoot date or how we can assist with your wedding & cinematic film! 📸✨',
      time: 'Just now',
    },
  ]);
  const [dmInput, setDmInput] = useState('');

  // Story highlights list
  const storyHighlights = [
    { id: 'weddings', title: 'Weddings 💍', cover: PORTFOLIO_ITEMS[0]?.image, count: 5 },
    { id: 'prewedding', title: 'Pre-Wed 🏰', cover: PORTFOLIO_ITEMS[1]?.image, count: 4 },
    { id: 'baby', title: 'Milestones 👶', cover: PORTFOLIO_ITEMS[2]?.image, count: 3 },
    { id: 'sangeet', title: 'Sangeet 🥁', cover: PORTFOLIO_ITEMS[3]?.image, count: 4 },
    { id: 'haldi', title: 'Haldi 🌼', cover: PORTFOLIO_ITEMS[4]?.image, count: 4 },
    { id: 'reviews', title: 'Reviews ⭐', cover: PORTFOLIO_ITEMS[5]?.image, count: 6 },
  ];

  // Story progress timer
  useEffect(() => {
    if (activeStoryIndex === null) {
      setStoryProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          // Advance to next story highlight or close
          if (activeStoryIndex < storyHighlights.length - 1) {
            setActiveStoryIndex(activeStoryIndex + 1);
            return 0;
          } else {
            setActiveStoryIndex(null);
            return 0;
          }
        }
        return prev + 2.5; // ~4 seconds per story
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStoryIndex, storyHighlights.length]);

  if (!isOpen) return null;

  const handleToggleFollow = () => {
    if (!isFollowing) {
      setIsFollowing(true);
      setFollowerCount((prev) => prev + 1);
      if (onShowToast) onShowToast('You are now following @hp_studio1040 on Instagram! 🎉');
    } else {
      setIsFollowing(false);
      setFollowerCount((prev) => prev - 1);
      if (onShowToast) onShowToast('Unfollowed @hp_studio1040');
    }
  };

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('hp_studio1040');
    setCopiedId(true);
    if (onShowToast) onShowToast('Copied Instagram ID: hp_studio1040');
    setTimeout(() => setCopiedId(false), 2500);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(STUDIO_INFO.instagramUrl);
    setCopiedLink(true);
    if (onShowToast) onShowToast(`Instagram link copied: ${STUDIO_INFO.instagramUrl}`);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleOpenApp = () => {
    const appUrl = 'instagram://user?username=hp_studio1040';
    window.location.href = appUrl;
    setTimeout(() => {
      if (onShowToast) onShowToast('Attempting to open Instagram app for @hp_studio1040...');
    }, 400);
  };

  const handleTogglePostLike = (postId: string) => {
    const isLiked = likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !isLiked }));
    setPostLikes((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 1240) + (isLiked ? -1 : 1),
    }));
  };

  const handleAddComment = (postId: string) => {
    if (!newCommentText.trim()) return;
    setUserComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newCommentText.trim()],
    }));
    setNewCommentText('');
    if (onShowToast) onShowToast('Comment posted on Instagram feed!');
  };

  const handleSendDm = () => {
    if (!dmInput.trim()) return;
    const userMsg = dmInput.trim();
    setDmMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: 'Just now' },
    ]);
    setDmInput('');

    // Auto reply from Studio
    setTimeout(() => {
      setDmMessages((prev) => [
        ...prev,
        {
          sender: 'studio',
          text: 'Thank you for reaching out! We received your message. You can also connect directly on WhatsApp at +91 9865404174 for instant date confirmation.',
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Outer Shell resembling Instagram Mobile & Desktop Web App */}
      <div
        className="relative w-full sm:max-w-2xl md:max-w-3xl h-full sm:h-[92vh] sm:max-h-[920px] bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#EBDCCF]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP INSTAGRAM APP HEADER BAR */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-[#EFEFEF]">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 -ml-1 text-neutral-800 hover:text-neutral-500 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer flex items-center gap-1"
              title="Back to Studio Website"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-xs font-semibold text-neutral-600 hidden sm:inline">HP Studio</span>
            </button>

            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-base text-neutral-900 tracking-tight font-sans">
                hp_studio1040
              </h2>
              <CheckCircle2 className="w-4 h-4 text-[#3897F0] fill-[#3897F0] text-white shrink-0" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyId}
              className="px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer border border-neutral-200"
              title="Copy Instagram ID: hp_studio1040"
            >
              {copiedId ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied ID!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Copy ID</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* SCROLLABLE INSTAGRAM FEED BODY */}
        <div className="flex-1 overflow-y-auto bg-white">
          {/* NOTICE BANNER: In-App Verified Mirror */}
          <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-orange-50 px-4 py-2 border-b border-rose-100 flex items-center justify-between text-[11px] sm:text-xs text-neutral-700">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Official Instagram ID: <strong>hp_studio1040</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="text-rose-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
              <span className="text-neutral-300">|</span>
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-neutral-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>External</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* PROFILE HEADER SECTION */}
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Instagram Story Ring Profile Photo */}
              <button
                onClick={() => setActiveStoryIndex(0)}
                className="relative group shrink-0 cursor-pointer"
                title="Watch Stories from @hp_studio1040"
              >
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full p-[2.5px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full border-2 border-white bg-[#241E1C] flex items-center justify-center text-white font-serif-display font-bold text-xl sm:text-2xl">
                    HP
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#F58529] to-[#DD2A7B] text-white p-1 rounded-full shadow-xs">
                  <Play className="w-2.5 h-2.5 fill-white" />
                </div>
              </button>

              {/* Stats Counters */}
              <div className="flex-1 flex justify-around text-center">
                <div>
                  <span className="block font-bold text-base sm:text-lg text-neutral-900">384</span>
                  <span className="text-xs text-neutral-500">posts</span>
                </div>
                <div>
                  <span className="block font-bold text-base sm:text-lg text-neutral-900">
                    {followerCount.toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-500">followers</span>
                </div>
                <div>
                  <span className="block font-bold text-base sm:text-lg text-neutral-900">148</span>
                  <span className="text-xs text-neutral-500">following</span>
                </div>
              </div>
            </div>

            {/* BIO & CREDENTIALS */}
            <div className="space-y-1.5 text-xs sm:text-sm text-neutral-900">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base">HP STUDIO</span>
                <span className="text-neutral-400">·</span>
                <span className="text-xs text-neutral-500 font-medium">Photographer & Filmmaker</span>
              </div>

              <p className="text-neutral-700 leading-relaxed font-sans text-xs sm:text-[13px]">
                💍 Royal Weddings · Cinematic Heirlooms · Pre-Weddings<br />
                📍 Pune (Koregaon Park) & Mumbai (Bandra West)<br />
                🏆 Featured in WedMeGood & Vogue Wedding Book<br />
                🎵 Authentic Bollywood Master Soundtracks & 4K 60fps HDR<br />
                💬 DM for custom shoot dates or WhatsApp: +91 9865404174
              </p>

              <div className="flex items-center gap-1 text-xs text-[#00376B] font-semibold pt-0.5">
                <span>🔗</span>
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenBooking) onOpenBooking();
                  }}
                  className="hover:underline text-blue-700 cursor-pointer"
                >
                  hpstudio.in/booking-enquiry
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS (Follow, Message, Contact, Deep Link) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <button
                onClick={handleToggleFollow}
                className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98 ${
                  isFollowing
                    ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300'
                    : 'bg-[#0095F6] hover:bg-[#1877F2] text-white'
                }`}
              >
                {isFollowing ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Following</span>
                  </>
                ) : (
                  <span>Follow</span>
                )}
              </button>

              <button
                onClick={() => setIsDmOpen(true)}
                className="py-2 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-neutral-200"
              >
                <MessageCircle className="w-3.5 h-3.5 text-neutral-700" />
                <span>Message</span>
              </button>

              <button
                onClick={handleOpenApp}
                className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:brightness-105 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                title="Launch in Native Instagram App"
              >
                <Smartphone className="w-3.5 h-3.5 text-white" />
                <span>Open App</span>
              </button>

              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-neutral-200 text-center"
                title="Open in Browser Web Tab"
              >
                <Globe className="w-3.5 h-3.5 text-neutral-700" />
                <span>Web Link</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>

            {/* STORY HIGHLIGHTS BARS */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-2">
                Story Highlights
              </span>
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {storyHighlights.map((hl, idx) => (
                  <button
                    key={hl.id}
                    onClick={() => setActiveStoryIndex(idx)}
                    className="flex flex-col items-center gap-1 shrink-0 group cursor-pointer"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] group-hover:scale-105 transition-transform">
                      <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-neutral-200">
                        <img
                          src={hl.cover}
                          alt={hl.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-neutral-700 max-w-[65px] truncate text-center">
                      {hl.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* TAB BAR NAVIGATION (POSTS / REELS / TAGGED) */}
          <div className="border-t border-[#EFEFEF] grid grid-cols-3 text-center text-xs font-semibold">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-3 flex items-center justify-center gap-1.5 border-t-2 -mt-[1px] transition-colors cursor-pointer ${
                activeTab === 'posts'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-400 hover:text-neutral-700'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span className="uppercase tracking-wider text-[11px]">Posts ({PORTFOLIO_ITEMS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reels')}
              className={`py-3 flex items-center justify-center gap-1.5 border-t-2 -mt-[1px] transition-colors cursor-pointer ${
                activeTab === 'reels'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-400 hover:text-neutral-700'
              }`}
            >
              <Film className="w-4 h-4" />
              <span className="uppercase tracking-wider text-[11px]">Reels ({REELS_DATA.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('tagged')}
              className={`py-3 flex items-center justify-center gap-1.5 border-t-2 -mt-[1px] transition-colors cursor-pointer ${
                activeTab === 'tagged'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-400 hover:text-neutral-700'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span className="uppercase tracking-wider text-[11px]">Tagged</span>
            </button>
          </div>

          {/* TAB 1: POSTS GRID */}
          {activeTab === 'posts' && (
            <div className="grid grid-cols-3 gap-0.5 sm:gap-1 p-0.5 sm:p-1">
              {PORTFOLIO_ITEMS.map((item) => {
                const isLiked = likedPosts[item.id];
                const likes = postLikes[item.id] || 1240;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPost(item)}
                    className="group relative aspect-square bg-neutral-900 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white text-xs font-bold">
                      <div className="flex items-center gap-1">
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : 'fill-white'}`} />
                        <span>{likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>{(userComments[item.id] || []).length + 18}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: REELS GRID */}
          {activeTab === 'reels' && (
            <div className="grid grid-cols-3 gap-1 p-1">
              {REELS_DATA.map((reel) => (
                <div
                  key={reel.id}
                  onClick={() => {
                    // Trigger toast and open info
                    if (onShowToast) onShowToast(`🎵 Reel: ${reel.title} (${reel.songTitle})`);
                  }}
                  className="group relative aspect-[9/16] bg-neutral-900 rounded-lg overflow-hidden cursor-pointer shadow-xs"
                >
                  <img
                    src={reel.image}
                    alt={reel.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-2 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                        {reel.category}
                      </span>
                      <Play className="w-3.5 h-3.5 fill-white" />
                    </div>

                    <div>
                      <div className="flex items-center gap-1 text-[11px] font-bold">
                        <Eye className="w-3 h-3" />
                        <span>{reel.views}</span>
                      </div>
                      <p className="text-[10px] text-white/90 line-clamp-1 mt-0.5">
                        {reel.songTitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: TAGGED */}
          {activeTab === 'tagged' && (
            <div className="p-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-full border-2 border-neutral-300 flex items-center justify-center mx-auto text-neutral-400">
                <Tag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-neutral-800 text-sm">Photos and Videos of You</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Clients and wedding couples frequently tag <strong>@hp_studio1040</strong> in their royal wedding portraits and haldi celebrations.
              </p>
              <div className="grid grid-cols-3 gap-1 pt-4">
                {PORTFOLIO_ITEMS.slice(2, 8).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPost(item)}
                    className="aspect-square bg-neutral-100 rounded-md overflow-hidden cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM QUICK FOOTER */}
        <footer className="px-4 py-2.5 bg-neutral-50 border-t border-[#EFEFEF] flex items-center justify-between text-xs text-neutral-600">
          <div className="flex items-center gap-1.5 font-medium">
            <Instagram className="w-3.5 h-3.5 text-[#C13584]" />
            <span>@hp_studio1040</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                if (onOpenBooking) onOpenBooking();
              }}
              className="text-[#9E462A] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Shoot</span>
            </button>
            <span className="text-neutral-300">·</span>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-900 font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </footer>
      </div>

      {/* SUB-MODAL 1: INSTAGRAM POST DETAIL LIGHTBOX */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: High-Res Photo */}
            <div className="relative md:w-3/5 bg-black flex items-center justify-center min-h-[320px] md:min-h-[500px]">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Right: Instagram Post Detail & Comments */}
            <div className="md:w-2/5 flex flex-col bg-white border-l border-neutral-200">
              {/* Post Header */}
              <div className="flex items-center justify-between p-3.5 border-b border-neutral-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#241E1C] text-white flex items-center justify-center font-bold text-xs">
                    HP
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-xs text-neutral-900">hp_studio1040</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3897F0] fill-[#3897F0] text-white" />
                    </div>
                    <span className="text-[10px] text-neutral-500">{selectedPost.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Caption & Comments Stream */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
                {/* Author Caption */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#241E1C] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    HP
                  </div>
                  <div className="space-y-1">
                    <p className="leading-relaxed text-neutral-800">
                      <strong className="text-neutral-900 mr-1.5">hp_studio1040</strong>
                      {selectedPost.description}
                    </p>
                    <p className="text-[#00376B] text-[11px] font-medium">
                      #HPStudio #WeddingPhotography #PunePhotographer #MumbaiWedding #Cinematography #IndianBride
                    </p>
                    <span className="text-[10px] text-neutral-400 block pt-1">
                      {selectedPost.date} · Camera: {selectedPost.exif?.camera}
                    </span>
                  </div>
                </div>

                {/* Client Review Comment */}
                {selectedPost.clientReview && (
                  <div className="flex items-start gap-2.5 pt-2 border-t border-neutral-100">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                      ★
                    </div>
                    <div>
                      <p className="text-neutral-800 leading-relaxed">
                        <strong className="text-neutral-900 mr-1">{selectedPost.clientReview.author}</strong>
                        {selectedPost.clientReview.quote}
                      </p>
                      <span className="text-[10px] text-neutral-400">Verified Client Review</span>
                    </div>
                  </div>
                )}

                {/* User Submitted Comments */}
                {(userComments[selectedPost.id] || []).map((cmt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                      You
                    </div>
                    <div>
                      <p className="text-neutral-800">
                        <strong className="text-neutral-900 mr-1">You</strong>
                        {cmt}
                      </p>
                      <span className="text-[10px] text-neutral-400">Just now</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Bar */}
              <div className="p-3 border-t border-neutral-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleTogglePostLike(selectedPost.id)}
                      className="cursor-pointer transition-transform active:scale-125"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          likedPosts[selectedPost.id]
                            ? 'fill-rose-500 text-rose-500'
                            : 'text-neutral-800 hover:text-rose-500'
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => {
                        const input = document.getElementById('instagram-comment-input');
                        if (input) input.focus();
                      }}
                      className="cursor-pointer text-neutral-800 hover:text-neutral-500"
                    >
                      <MessageCircle className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="cursor-pointer text-neutral-800 hover:text-neutral-500"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                  <Bookmark className="w-5 h-5 text-neutral-800" />
                </div>

                <div className="text-xs font-bold text-neutral-900">
                  {((postLikes[selectedPost.id] || 1240)).toLocaleString()} likes
                </div>

                {/* Comment Input Box */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddComment(selectedPost.id);
                  }}
                  className="flex items-center gap-2 pt-2 border-t border-neutral-100"
                >
                  <input
                    id="instagram-comment-input"
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Add a comment on @hp_studio1040 post..."
                    className="flex-1 text-xs outline-none bg-transparent placeholder:text-neutral-400"
                  />
                  <button
                    type="submit"
                    disabled={!newCommentText.trim()}
                    className="text-xs font-bold text-[#0095F6] disabled:text-neutral-300 cursor-pointer disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODAL 2: INSTAGRAM STORY VIEWER */}
      {activeStoryIndex !== null && (
        <div
          className="fixed inset-0 z-70 flex items-center justify-center p-0 sm:p-4 bg-black/95 backdrop-blur-lg"
          onClick={() => setActiveStoryIndex(null)}
        >
          <div
            className="relative w-full max-w-sm sm:max-w-md h-full sm:h-[85vh] bg-black sm:rounded-3xl overflow-hidden flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Story Progress Bar */}
            <div className="absolute top-0 left-0 right-0 z-20 p-2.5 flex items-center gap-1.5">
              {storyHighlights.map((_, idx) => (
                <div key={idx} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-100"
                    style={{
                      width:
                        idx === activeStoryIndex
                          ? `${storyProgress}%`
                          : idx < activeStoryIndex
                          ? '100%'
                          : '0%',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Story Author Header */}
            <div className="absolute top-4 left-0 right-0 z-20 px-3 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 mt-2">
                <div className="w-8 h-8 rounded-full border border-white bg-[#241E1C] flex items-center justify-center font-bold text-xs">
                  HP
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs">hp_studio1040</span>
                    <CheckCircle2 className="w-3 h-3 text-[#3897F0] fill-[#3897F0] text-white" />
                  </div>
                  <span className="text-[10px] text-white/70">{storyHighlights[activeStoryIndex].title}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveStoryIndex(null)}
                className="p-1 rounded-full bg-black/40 hover:bg-black/60 text-white cursor-pointer mt-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Story Visual Content */}
            <div className="relative flex-1 flex items-center justify-center bg-neutral-900">
              <img
                src={storyHighlights[activeStoryIndex].cover}
                alt={storyHighlights[activeStoryIndex].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Prev / Next Click Zones */}
              <button
                onClick={() => {
                  if (activeStoryIndex > 0) {
                    setActiveStoryIndex(activeStoryIndex - 1);
                    setStoryProgress(0);
                  }
                }}
                className="absolute left-0 top-16 bottom-16 w-1/3 opacity-0 cursor-pointer"
                aria-label="Previous story"
              />
              <button
                onClick={() => {
                  if (activeStoryIndex < storyHighlights.length - 1) {
                    setActiveStoryIndex(activeStoryIndex + 1);
                    setStoryProgress(0);
                  } else {
                    setActiveStoryIndex(null);
                  }
                }}
                className="absolute right-0 top-16 bottom-16 w-1/3 opacity-0 cursor-pointer"
                aria-label="Next story"
              />
            </div>

            {/* Story Bottom Reply Bar */}
            <div className="p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center gap-2 z-20">
              <input
                type="text"
                placeholder="Reply to hp_studio1040 story..."
                className="flex-1 py-2 px-3.5 rounded-full bg-white/20 text-white text-xs placeholder:text-white/60 outline-none backdrop-blur-md border border-white/20"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (onShowToast) onShowToast('Story reply sent to @hp_studio1040!');
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <button
                onClick={() => {
                  if (onShowToast) onShowToast('Sent ❤️ to @hp_studio1040 story');
                }}
                className="p-2 rounded-full text-white hover:text-rose-500 cursor-pointer transition-colors"
              >
                <Heart className="w-6 h-6 hover:fill-rose-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODAL 3: IN-APP INSTAGRAM DIRECT MESSAGE (DM) */}
      {isDmOpen && (
        <div
          className="fixed inset-0 z-70 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsDmOpen(false)}
        >
          <div
            className="relative w-full max-w-md h-[550px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* DM Header */}
            <header className="px-4 py-3 bg-white border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#241E1C] text-white flex items-center justify-center font-bold text-xs">
                  HP
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm text-neutral-900">hp_studio1040</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3897F0] fill-[#3897F0] text-white" />
                  </div>
                  <span className="text-[10px] text-emerald-600 font-medium">Active now</span>
                </div>
              </div>

              <button
                onClick={() => setIsDmOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* DM Chat Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5]">
              {dmMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-[#0095F6] text-white rounded-br-xs'
                        : 'bg-white text-neutral-800 border border-neutral-200 rounded-bl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[9px] block text-right mt-1 ${
                        msg.sender === 'user' ? 'text-blue-100' : 'text-neutral-400'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompts */}
            <div className="p-2 bg-white border-t border-neutral-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <button
                onClick={() => setDmInput('Hi! What are your wedding photography packages in Pune?')}
                className="px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 shrink-0 cursor-pointer"
              >
                💍 Wedding packages
              </button>
              <button
                onClick={() => setDmInput('Hi! Are you available for shoot dates in Dec 2024?')}
                className="px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 shrink-0 cursor-pointer"
              >
                📅 Check dates
              </button>
              <button
                onClick={() => setDmInput('Can we discuss cinematic pre-wedding film rates?')}
                className="px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 shrink-0 cursor-pointer"
              >
                🏰 Pre-wedding film
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
              <input
                type="text"
                value={dmInput}
                onChange={(e) => setDmInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendDm()}
                placeholder="Message hp_studio1040..."
                className="flex-1 py-2 px-3.5 rounded-full bg-neutral-100 text-neutral-900 text-xs outline-none border border-neutral-200 placeholder:text-neutral-400"
              />
              <button
                onClick={handleSendDm}
                disabled={!dmInput.trim()}
                className="p-2 rounded-full bg-[#0095F6] text-white hover:bg-[#1877F2] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
