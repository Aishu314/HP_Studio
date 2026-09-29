import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Music, Check, MessageCircle, AlertCircle, Plus } from 'lucide-react';
import { ConfirmedBooking } from '../types';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNewShoot: () => void;
  onShowToast: (message: string) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  onBookNewShoot,
  onShowToast,
}) => {
  const [bookings, setBookings] = useState<ConfirmedBooking[]>([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('hp_studio_bookings') || '[]');
        setBookings(stored);
      } catch {
        setBookings([]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleWhatsAppHelp = (b: ConfirmedBooking) => {
    const text = encodeURIComponent(
      `Hi HP Studio! Regarding my booked photoshoot (Booking ID: ${b.id}, ${b.packageName} on ${b.date}): I have a question about my session.`
    );
    window.open(`https://wa.me/919865404174?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-[32px] overflow-hidden shadow-2xl border border-[#ECD9C6] max-h-[88vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#241C1A] text-white relative flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#BF5C3E]">
              Client Dashboard
            </span>
            <h3 className="font-serif-display text-2xl font-bold text-white mt-0.5">
              My Scheduled Photoshoots
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Calendar className="w-12 h-12 text-[#BF5C3E]/50 mx-auto" />
              <h4 className="font-serif-display text-xl font-bold text-[#241E1C]">
                No Bookings Found Yet
              </h4>
              <p className="text-xs text-[#6B5A53] max-w-sm mx-auto">
                Ready to capture your love story or family milestone? Choose a package and reserve your date.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBookNewShoot();
                }}
                className="mt-3 px-6 py-2.5 rounded-xl bg-[#BF5C3E] hover:bg-[#A94C30] text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Book a Photoshoot Now
              </button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl p-5 bg-white border border-[#E8DACB] shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#ECD9C6]">
                  <div>
                    <span className="text-[10px] font-mono text-[#8C7A72] uppercase">
                      Ref: {booking.id}
                    </span>
                    <h4 className="font-serif-display text-lg font-bold text-[#241E1C]">
                      {booking.packageName}
                    </h4>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    ✓ {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#5C504A]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#BF5C3E]" />
                    <span className="font-semibold">{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#BF5C3E]" />
                    <span>{booking.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-[#BF5C3E] shrink-0" />
                    <span className="truncate">{booking.location}</span>
                  </div>
                </div>

                {booking.selectedMusicTrack && (
                  <div className="p-2.5 rounded-xl bg-[#FAF4EC] text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Music className="w-3.5 h-3.5 text-[#BF5C3E]" />
                      <span className="font-medium text-[#241E1C]">
                        Reel Track: {booking.selectedMusicTrack.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#7B6A63]">
                      {booking.selectedMusicTrack.licenseBadge}
                    </span>
                  </div>
                )}

                {booking.notes && (
                  <div className="text-xs text-[#6B5A53] italic bg-[#FAF7F2] p-2.5 rounded-xl">
                    "{booking.notes}"
                  </div>
                )}

                <div className="pt-3 border-t border-[#ECD9C6] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#7B6A63]">Total:</span>
                    <span className="font-serif-display font-bold text-base text-[#241E1C] ml-1.5">
                      ₹{booking.totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => handleWhatsAppHelp(booking)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#E3F6EC] hover:bg-[#D1EFE0] text-[#0D6832] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-[#0D6832]" />
                    <span>WhatsApp Studio Concierge</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#ECD9C6] flex items-center justify-between">
          <span className="text-xs text-[#7B6A63]">
            {bookings.length} active scheduled {bookings.length === 1 ? 'booking' : 'bookings'}
          </span>
          <button
            onClick={() => {
              onClose();
              onBookNewShoot();
            }}
            className="px-4 py-2 rounded-xl bg-[#BF5C3E] hover:bg-[#A94C30] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Book Another Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
