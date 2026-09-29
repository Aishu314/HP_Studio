import React, { useState, useEffect } from 'react';
import {
  X, Calendar as CalendarIcon, Clock, MapPin, Sparkles, Check, ChevronRight,
  ChevronLeft, Music, ShieldCheck, Heart, FileText, Phone, MessageCircle,
  Camera, CheckCircle2, AlertCircle, Plus, Info
} from 'lucide-react';
import { PRICING_PACKAGES } from '../data/mockData';
import { BOLLYWOOD_MUSIC_LIBRARY } from '../data/musicLibrary';
import { ConfirmedBooking, MusicTrack, BookingSlot } from '../types';

interface BookingSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPackageId?: string;
  appliedPromo?: string;
  preselectedMusicTrack?: MusicTrack;
  onBookingConfirmed: (booking: ConfirmedBooking) => void;
  onOpenMusicLibrary: () => void;
  onShowToast: (message: string) => void;
}

const AVAILABLE_PACKAGES = [
  ...PRICING_PACKAGES,
  {
    id: 'baby-newborn-deluxe',
    name: 'Newborn & Baby Deluxe',
    badge: 'Safe & Warm',
    category: 'shoots' as const,
    price: 18999,
    originalPrice: 22999,
    duration: 'Up to 3 Hours (Sanitized Studio)',
    team: 'Master Newborn Specialist + Safety Assistant',
    deliverables: [
      '40 Retouched Baby & Family Portraits',
      '1 Sweet Lullaby 4K Instagram Reel',
      'Organic Props, Floral Baskets & Wraps Provided',
      'Digital Cloud Heirloom Gallery'
    ],
    features: [
      'Sterile & Temperature-controlled studio environment',
      'Unlimited feeding & soothing pauses',
      'Parents & Sibling portraits included'
    ]
  },
  {
    id: 'car-automotive-cinematic',
    name: 'Automotive & Supercar Cinematic',
    badge: 'High Action',
    category: 'shoots' as const,
    price: 24999,
    originalPrice: 29999,
    duration: '4 Hours Sunset & Night Rollers',
    team: 'Lead Automotive Director + Rig & Gimbal Specialist',
    deliverables: [
      '30 Magazine-Grade Light-Painted Stills',
      '2 High-BPM Action Instagram Reels with Bass Audio',
      'Dynamic Rolling Rig & Tracking Car Shots',
      '4K 60fps Slow-Motion Master Cut'
    ],
    features: [
      'Mumbai Sea Link / Coastal Road or Pune Expressway route',
      'Studio spot lighting & rim reflections',
      'Full commercial rights included'
    ]
  }
];

const TIME_SLOTS: BookingSlot[] = [
  {
    id: 'slot-morning',
    label: 'Morning Golden Hour',
    timeRange: '06:00 AM – 09:30 AM',
    type: 'Morning Golden Hour',
    available: true,
  },
  {
    id: 'slot-midday',
    label: 'Studio Comfort Session',
    timeRange: '11:00 AM – 02:00 PM',
    type: 'Afternoon Studio',
    available: true,
  },
  {
    id: 'slot-sunset',
    label: 'Sunset Twilight Golden Hour',
    timeRange: '04:00 PM – 07:30 PM',
    type: 'Sunset Twilight',
    available: true,
  },
  {
    id: 'slot-night',
    label: 'Night Sangeet & Celebration',
    timeRange: '07:30 PM – 12:00 AM',
    type: 'Night Celebration',
    available: true,
  },
  {
    id: 'slot-fullday',
    label: 'Full Day Royal Coverage',
    timeRange: '10:00 AM – 10:00 PM (12 Hours)',
    type: 'Full Day',
    available: true,
  },
];

const ADD_ON_OPTIONS = [
  { id: 'addon-drone', name: '4K Aerial Drone Cinematography', price: 8000, desc: 'Licensed drone pilot with dual 4K cameras' },
  { id: 'addon-reels', name: '2 Extra Viral Bollywood Reels', price: 5000, desc: 'Edited in 9:16 vertical 4K with custom sound design' },
  { id: 'addon-album', name: 'Handcrafted Italian Leather Photobook', price: 7500, desc: '40 thick-layflat pages with velvet presentation box' },
  { id: 'addon-sameday', name: 'Same-Day Sangeet/Teaser Screening', price: 12000, desc: 'Edit delivered live to surprise wedding guests' },
];

export const BookingSystemModal: React.FC<BookingSystemModalProps> = ({
  isOpen,
  onClose,
  preselectedPackageId,
  appliedPromo,
  preselectedMusicTrack,
  onBookingConfirmed,
  onOpenMusicLibrary,
  onShowToast,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedPackage, setSelectedPackage] = useState(
    AVAILABLE_PACKAGES.find((p) => p.id === preselectedPackageId) || AVAILABLE_PACKAGES[1]
  );
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState<string>('slot-sunset');
  const [selectedLocation, setSelectedLocation] = useState('HP Studio Suites (Koregaon Park, Pune)');
  const [customAddress, setCustomAddress] = useState('');
  
  // Specific Requests & Notes
  const [notes, setNotes] = useState('');
  const [specificRequests, setSpecificRequests] = useState<string[]>([
    'Candid Natural Lighting',
    'Same-Week 48h Preview',
  ]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<MusicTrack | undefined>(
    preselectedMusicTrack || BOLLYWOOD_MUSIC_LIBRARY[0]
  );

  // Client Details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  // Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  useEffect(() => {
    if (preselectedPackageId) {
      const match = AVAILABLE_PACKAGES.find((p) => p.id === preselectedPackageId || p.name.includes(preselectedPackageId));
      if (match) setSelectedPackage(match);
    }
  }, [preselectedPackageId]);

  useEffect(() => {
    if (preselectedMusicTrack) {
      setSelectedMusic(preselectedMusicTrack);
    }
  }, [preselectedMusicTrack]);

  if (!isOpen) return null;

  // Price calculations
  const addOnsTotal = selectedAddOns.reduce((acc, id) => {
    const item = ADD_ON_OPTIONS.find((a) => a.id === id);
    return acc + (item ? item.price : 0);
  }, 0);

  const basePrice = selectedPackage.price;
  const subtotal = basePrice + addOnsTotal;
  const discountAmount = appliedPromo ? Math.round(subtotal * 0.1) : 0;
  const totalPrice = subtotal - discountAmount;
  const depositRequired = Math.round(totalPrice * 0.2); // 20% advance token

  const toggleRequestChip = (chip: string) => {
    if (specificRequests.includes(chip)) {
      setSpecificRequests(specificRequests.filter((c) => c !== chip));
    } else {
      setSpecificRequests([...specificRequests, chip]);
    }
  };

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const handleConfirmBooking = () => {
    if (!clientName.trim() || !clientPhone.trim()) {
      onShowToast('Please fill in your name and phone number to confirm.');
      return;
    }

    const bookingId = `HP-BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const slotObj = TIME_SLOTS.find((s) => s.id === selectedSlot);

    const booking: ConfirmedBooking = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      category: selectedPackage.category,
      date: selectedDate,
      timeSlot: slotObj ? `${slotObj.label} (${slotObj.timeRange})` : 'Flexible Slot',
      location: selectedLocation === 'Custom Venue Address' ? customAddress || 'Custom Client Venue' : selectedLocation,
      customVenueAddress: customAddress,
      notes: notes.trim(),
      specificRequests,
      selectedMusicTrack: selectedMusic,
      selectedAddOns,
      basePrice,
      addOnsPrice: addOnsTotal,
      discountPrice: discountAmount,
      totalPrice,
      depositAmount: depositRequired,
      promoCode: appliedPromo,
      status: 'Confirmed',
    };

    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('hp_studio_bookings') || '[]');
      localStorage.setItem('hp_studio_bookings', JSON.stringify([booking, ...existing]));
    } catch {
      // ignore
    }

    setConfirmedBooking(booking);
    onBookingConfirmed(booking);
    onShowToast(`🎉 Booking confirmed! Reference: ${bookingId}`);
  };

  const shareBookingOnWhatsApp = () => {
    if (!confirmedBooking) return;
    const text = encodeURIComponent(
      `*HP Studio Photoshoot Confirmation*\n` +
      `Booking ID: ${confirmedBooking.id}\n` +
      `Client: ${confirmedBooking.clientName} (${confirmedBooking.clientPhone})\n` +
      `Package: ${confirmedBooking.packageName}\n` +
      `Date: ${confirmedBooking.date}\n` +
      `Time Slot: ${confirmedBooking.timeSlot}\n` +
      `Location: ${confirmedBooking.location}\n` +
      `Bollywood Music: ${confirmedBooking.selectedMusicTrack?.title || 'Studio Choice'}\n` +
      `Notes: ${confirmedBooking.notes || 'None'}\n` +
      `Total: ₹${confirmedBooking.totalPrice.toLocaleString('en-IN')}\n` +
      `Deposit (20%): ₹${confirmedBooking.depositAmount.toLocaleString('en-IN')}`
    );
    window.open(`https://wa.me/919865404174?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-[32px] overflow-hidden shadow-2xl border border-[#ECD9C6] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Step Tracker */}
        <div className="p-5 sm:p-7 bg-[#241C1A] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs text-amber-200 font-semibold uppercase tracking-wider mb-1">
            <Camera className="w-4 h-4 text-[#BF5C3E]" />
            <span>HP Studio VIP Booking Portal</span>
          </div>

          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold">
            {confirmedBooking ? 'Booking Confirmed & Scheduled' : 'Book Your Photoshoot Session'}
          </h2>

          {/* Stepper Tabs (1 -> 2 -> 3 -> 4) */}
          {!confirmedBooking && (
            <div className="grid grid-cols-4 gap-2 mt-5 text-[11px] font-semibold text-center">
              {[
                { num: 1, label: '1. Package' },
                { num: 2, label: '2. Date & Time' },
                { num: 3, label: '3. Notes & Music' },
                { num: 4, label: '4. Confirm' },
              ].map((s) => (
                <button
                  key={s.num}
                  onClick={() => setStep(s.num as 1 | 2 | 3 | 4)}
                  className={`py-1.5 px-1 rounded-lg transition-all cursor-pointer ${
                    step === s.num
                      ? 'bg-[#BF5C3E] text-white shadow-sm'
                      : step > s.num
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/50'
                      : 'bg-white/10 text-stone-400 hover:text-white'
                  }`}
                >
                  <span className="truncate block">{s.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          {confirmedBooking ? (
            /* Confirmation Pass */
            <div className="space-y-6 text-center max-w-xl mx-auto py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#BF5C3E]">
                  Session Officially Reserved
                </span>
                <h3 className="font-serif-display text-3xl font-bold text-[#241E1C] mt-1">
                  We Can't Wait To Shoot With You!
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5A53] mt-2">
                  A calendar invite and preparation guide has been dispatched to{' '}
                  <strong>{confirmedBooking.clientPhone}</strong>.
                </p>
              </div>

              {/* Digital Booking Ticket Pass */}
              <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-[#DEB097] text-left shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#ECD9C6]">
                  <div>
                    <span className="text-[10px] text-[#8C7A72] uppercase font-mono tracking-wider">
                      Booking Reference
                    </span>
                    <p className="font-mono text-xl font-bold text-[#BF5C3E]">
                      {confirmedBooking.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      <Check className="w-3 h-3" /> Confirmed
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#8C7A72]">Client:</span>
                    <p className="font-semibold text-[#241E1C]">{confirmedBooking.clientName}</p>
                  </div>
                  <div>
                    <span className="text-[#8C7A72]">Package:</span>
                    <p className="font-semibold text-[#241E1C]">{confirmedBooking.packageName}</p>
                  </div>
                  <div>
                    <span className="text-[#8C7A72]">Date & Slot:</span>
                    <p className="font-semibold text-[#241E1C]">
                      {confirmedBooking.date} · {confirmedBooking.timeSlot}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#8C7A72]">Location:</span>
                    <p className="font-semibold text-[#241E1C] truncate">{confirmedBooking.location}</p>
                  </div>
                </div>

                {confirmedBooking.selectedMusicTrack && (
                  <div className="p-3 rounded-xl bg-[#FAF4EC] border border-[#ECD9C6] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-[#BF5C3E]" />
                      <div>
                        <span className="font-bold text-[#241E1C]">
                          {confirmedBooking.selectedMusicTrack.title}
                        </span>
                        <p className="text-[10px] text-[#7B6A63]">
                          {confirmedBooking.selectedMusicTrack.movieOrArtist}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Sync Licensed
                    </span>
                  </div>
                )}

                {confirmedBooking.notes && (
                  <div className="text-xs text-[#5C504A] bg-[#FAF7F2] p-3 rounded-xl border border-[#ECD9C6]/60">
                    <span className="font-semibold text-[#3D322E]">Special Requests / Notes:</span>
                    <p className="mt-0.5 italic">"{confirmedBooking.notes}"</p>
                  </div>
                )}

                <div className="pt-3 border-t border-[#ECD9C6] flex items-center justify-between text-xs font-semibold">
                  <span>Total Investment:</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#241E1C] font-serif-display">
                      ₹{confirmedBooking.totalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-[#7B6A63] block">
                      (20% Deposit: ₹{confirmedBooking.depositAmount.toLocaleString('en-IN')})
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={shareBookingOnWhatsApp}
                  className="px-6 py-3 rounded-xl bg-[#0D6832] hover:bg-[#095226] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md transition-all active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Ticket to WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    setConfirmedBooking(null);
                    setStep(1);
                    onClose();
                  }}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-[#FAF4EC] text-[#5C504A] text-xs sm:text-sm font-semibold border border-[#E9DACB] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: SELECT PACKAGE */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif-display text-xl font-bold text-[#241E1C]">
                        Step 1: Choose Your Photoshoot Package
                      </h3>
                      <p className="text-xs text-[#6B5A53]">
                        Select from our signature wedding, pre-wedding, baby, or luxury automotive collections.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {AVAILABLE_PACKAGES.map((pkg) => {
                      const isSelected = selectedPackage.id === pkg.id;
                      const pkgPrice = appliedPromo ? Math.round(pkg.price * 0.9) : pkg.price;

                      return (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackage(pkg)}
                          className={`rounded-2xl p-5 border cursor-pointer transition-all duration-200 relative flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#FFF8F2] border-[#BF5C3E] shadow-md ring-2 ring-[#BF5C3E]/30'
                              : 'bg-white hover:bg-[#FAF4EC] border-[#E8DACB]'
                          }`}
                        >
                          {pkg.badge && (
                            <span className="absolute top-3.5 right-3.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF0E6] text-[#8C482B] border border-[#ECD9C6]">
                              {pkg.badge}
                            </span>
                          )}

                          <div>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  isSelected ? 'border-[#BF5C3E] bg-[#BF5C3E]' : 'border-stone-400'
                                }`}
                              >
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <h4 className="font-serif-display text-lg font-bold text-[#241E1C]">
                                {pkg.name}
                              </h4>
                            </div>

                            <p className="text-xs text-[#7B6A63] mt-1 pl-6">
                              {pkg.duration} · {pkg.team}
                            </p>

                            <div className="mt-3 pl-6 space-y-1 text-xs text-[#5C504A]">
                              {pkg.deliverables.slice(0, 3).map((d, i) => (
                                <p key={i} className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span>{d}</span>
                                </p>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-[#ECD9C6]/60 pl-6 flex items-baseline justify-between">
                            <div>
                              <span className="text-xl font-bold font-serif-display text-[#241E1C]">
                                ₹{pkgPrice.toLocaleString('en-IN')}
                              </span>
                              <span className="text-xs text-[#8C7A72] line-through ml-2">
                                ₹{pkg.originalPrice.toLocaleString('en-IN')}
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-[#BF5C3E]">
                              {isSelected ? '✓ Selected' : 'Select'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: DATE & TIME SELECTION */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h3 className="font-serif-display text-xl font-bold text-[#241E1C]">
                      Step 2: Choose Session Date & Time Slot
                    </h3>
                    <p className="text-xs text-[#6B5A53]">
                      Pick your ideal shoot date, golden hour lighting window, and preferred shoot destination.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date Picker & Location */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#382D28] mb-1.5 flex items-center gap-1.5">
                          <CalendarIcon className="w-4 h-4 text-[#BF5C3E]" />
                          <span>Photoshoot Date</span>
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E9DACB] text-sm text-[#241E1C] focus:outline-none focus:ring-2 focus:ring-[#BF5C3E]/50 font-medium"
                        />
                        <p className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>HP Studio Crew is available for {selectedDate}</span>
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#382D28] mb-1.5 flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#BF5C3E]" />
                          <span>Shoot Location / Studio</span>
                        </label>
                        <select
                          value={selectedLocation}
                          onChange={(e) => setSelectedLocation(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E9DACB] text-xs sm:text-sm text-[#241E1C] focus:outline-none focus:ring-2 focus:ring-[#BF5C3E]/50"
                        >
                          <option value="HP Studio Suites (Koregaon Park, Pune)">HP Studio Suites (Koregaon Park, Pune)</option>
                          <option value="HP Seafront Studio (Bandra West, Mumbai)">HP Seafront Studio (Bandra West, Mumbai)</option>
                          <option value="Outdoor Pune Heritage / Golden Hour Hills">Outdoor Pune Heritage / Golden Hour Hills</option>
                          <option value="Mumbai Marine Drive & Coastal Sea Link">Mumbai Marine Drive & Coastal Sea Link</option>
                          <option value="Udaipur Heritage Lake Pichola (Destination)">Udaipur Heritage Lake Pichola (Destination)</option>
                          <option value="Goa Beach & Portuguese Villa (Destination)">Goa Beach & Portuguese Villa (Destination)</option>
                          <option value="Custom Venue Address">Custom Venue / Client Home / Wedding Hall</option>
                        </select>

                        {selectedLocation === 'Custom Venue Address' && (
                          <input
                            type="text"
                            placeholder="Enter full venue address or hotel name..."
                            value={customAddress}
                            onChange={(e) => setCustomAddress(e.target.value)}
                            className="w-full mt-2 px-4 py-2.5 rounded-xl bg-white border border-[#E9DACB] text-xs text-[#241E1C] focus:outline-none focus:ring-1 focus:ring-[#BF5C3E]"
                          />
                        )}
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <label className="block text-xs font-semibold text-[#382D28] mb-2 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#BF5C3E]" />
                        <span>Available Lighting Slots</span>
                      </label>

                      <div className="space-y-2">
                        {TIME_SLOTS.map((slot) => {
                          const isSelected = selectedSlot === slot.id;
                          return (
                            <div
                              key={slot.id}
                              onClick={() => setSelectedSlot(slot.id)}
                              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-[#FFF8F2] border-[#BF5C3E] shadow-2xs'
                                  : 'bg-white hover:bg-[#FAF4EC] border-[#E8DACB]'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                                    isSelected ? 'border-[#BF5C3E] bg-[#BF5C3E]' : 'border-stone-400'
                                  }`}
                                >
                                  {isSelected && <div className="w-1 h-1 rounded-full bg-white" />}
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-[#241E1C]">{slot.label}</p>
                                  <p className="text-[11px] text-[#7B6A63] font-mono">{slot.timeRange}</p>
                                </div>
                              </div>

                              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                Available
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: NOTES & BOLLYWOOD MUSIC SYNC */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h3 className="font-serif-display text-xl font-bold text-[#241E1C]">
                      Step 3: Notes, Specific Requests & Bollywood Music Sync
                    </h3>
                    <p className="text-xs text-[#6B5A53]">
                      Tell us your vision, select pre-cleared Bollywood music for your reels, and add production add-ons.
                    </p>
                  </div>

                  {/* Bollywood Soundtrack Selector */}
                  <div className="p-4 rounded-2xl bg-white border border-[#E8DACB] shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Music className="w-4 h-4 text-[#BF5C3E]" />
                        <span className="text-xs font-bold text-[#241E1C]">
                          Selected Bollywood Soundtrack for Reel
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={onOpenMusicLibrary}
                        className="text-xs font-semibold text-[#BF5C3E] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Browse Music Vault</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {selectedMusic ? (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF4EC] border border-[#ECD9C6]">
                        <div>
                          <p className="text-xs font-bold text-[#241E1C]">
                            {selectedMusic.title}
                          </p>
                          <p className="text-[11px] text-[#7B6A63]">
                            {selectedMusic.movieOrArtist} · {selectedMusic.bpm} BPM · {selectedMusic.mood}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {selectedMusic.licenseBadge}
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-[#8C7A72]">No track selected. Studio will recommend a trending track.</p>
                    )}
                  </div>

                  {/* Quick Specific Request Chips */}
                  <div>
                    <label className="block text-xs font-semibold text-[#382D28] mb-2">
                      Specific Styling & Preference Tags (Tap to toggle)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Candid Natural Lighting',
                        'Same-Week 48h Preview',
                        'Drone Flythroughs',
                        'Multiple Outfit Changes',
                        'Slow Motion Cinematic',
                        'Raw Film Grading',
                        'Baby Feeding Warm Room',
                        'Sunset Backlit Bokeh',
                        'Parents Family Portraits',
                        'Car Roller Light Painting',
                      ].map((chip) => {
                        const active = specificRequests.includes(chip);
                        return (
                          <button
                            type="button"
                            key={chip}
                            onClick={() => toggleRequestChip(chip)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                              active
                                ? 'bg-[#BF5C3E] text-white shadow-xs'
                                : 'bg-white text-[#63544E] hover:bg-[#F4EDE2] border border-[#ECD9C6]'
                            }`}
                          >
                            {active ? '✓ ' : '+ '}
                            {chip}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes / Special Requests Textarea */}
                  <div>
                    <label className="block text-xs font-semibold text-[#382D28] mb-1.5 flex items-center justify-between">
                      <span>Notes or Specific Instructions for HP Studio Crew</span>
                      <span className="text-[10px] text-[#8C7A72] font-normal">Optional</span>
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="E.g., We have a special grandmother blessing at 5 PM, please prioritize candid laughter over posed shots. We also have 2 outfit changes..."
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E9DACB] text-xs sm:text-sm text-[#241E1C] placeholder-[#A4948C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BF5C3E]/50"
                    />
                  </div>

                  {/* Add-ons Checklist */}
                  <div>
                    <label className="block text-xs font-semibold text-[#382D28] mb-2">
                      Optional Production Add-Ons
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ADD_ON_OPTIONS.map((addon) => {
                        const isAdded = selectedAddOns.includes(addon.id);
                        return (
                          <div
                            key={addon.id}
                            onClick={() => toggleAddOn(addon.id)}
                            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                              isAdded
                                ? 'bg-[#EBF7EE] border-[#97D4A8]'
                                : 'bg-white hover:bg-[#FAF4EC] border-[#E8DACB]'
                            }`}
                          >
                            <div>
                              <p className="text-xs font-bold text-[#241E1C]">{addon.name}</p>
                              <p className="text-[10px] text-[#7B6A63] mt-0.5">{addon.desc}</p>
                              <p className="text-xs font-mono font-bold text-[#BF5C3E] mt-1">
                                +₹{addon.price.toLocaleString('en-IN')}
                              </p>
                            </div>
                            <span className={`text-xs font-bold ${isAdded ? 'text-emerald-700' : 'text-stone-400'}`}>
                              {isAdded ? '✓ Added' : '+ Add'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW & CONFIRM */}
              {step === 4 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h3 className="font-serif-display text-xl font-bold text-[#241E1C]">
                      Step 4: Contact Information & Confirmation
                    </h3>
                    <p className="text-xs text-[#6B5A53]">
                      Review your photoshoot schedule and enter your contact details to reserve.
                    </p>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#382D28] mb-1">
                        Your Full Name <span className="text-[#BF5C3E]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Sneha Patel"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E9DACB] text-xs sm:text-sm text-[#241E1C] focus:outline-none focus:ring-2 focus:ring-[#BF5C3E]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#382D28] mb-1">
                        Phone Number (WhatsApp) <span className="text-[#BF5C3E]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9880847789"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E9DACB] text-xs sm:text-sm text-[#241E1C] focus:outline-none focus:ring-2 focus:ring-[#BF5C3E]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#382D28] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="sneha@example.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E9DACB] text-xs sm:text-sm text-[#241E1C] focus:outline-none focus:ring-2 focus:ring-[#BF5C3E]/50"
                      />
                    </div>
                  </div>

                  {/* Booking Summary Box */}
                  <div className="rounded-2xl p-5 bg-[#FAF4EC] border border-[#ECD9C6] space-y-3">
                    <h4 className="font-serif-display text-base font-bold text-[#241E1C] border-b border-[#ECD9C6] pb-2">
                      Booking Summary Breakdown
                    </h4>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6B5A53]">
                        {selectedPackage.name} ({selectedPackage.duration}):
                      </span>
                      <span className="font-semibold text-[#241E1C]">
                        ₹{basePrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6B5A53]">Scheduled Slot:</span>
                      <span className="font-semibold text-[#241E1C]">
                        {selectedDate} · {TIME_SLOTS.find((s) => s.id === selectedSlot)?.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6B5A53]">Location:</span>
                      <span className="font-semibold text-[#241E1C] truncate max-w-[200px]">
                        {selectedLocation === 'Custom Venue Address' ? customAddress || 'Custom Venue' : selectedLocation}
                      </span>
                    </div>

                    {selectedMusic && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#6B5A53]">Reel Sound:</span>
                        <span className="font-semibold text-[#BF5C3E]">
                          🎵 {selectedMusic.title}
                        </span>
                      </div>
                    )}

                    {addOnsTotal > 0 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#6B5A53]">Selected Add-Ons ({selectedAddOns.length}):</span>
                        <span className="font-semibold text-[#241E1C]">
                          +₹{addOnsTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}

                    {discountAmount > 0 && (
                      <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold">
                        <span>Promo Code ({appliedPromo} - 10% OFF):</span>
                        <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-[#ECD9C6] flex items-baseline justify-between">
                      <div>
                        <span className="text-xs text-[#7B6A63]">Total Booking Value:</span>
                        <div className="text-2xl font-bold font-serif-display text-[#241E1C]">
                          ₹{totalPrice.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-[#7B6A63]">20% Token Advance:</span>
                        <div className="text-lg font-bold text-[#BF5C3E] font-serif-display">
                          ₹{depositRequired.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-stone-500 block">Balance due upon delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!confirmedBooking && (
          <div className="p-4 sm:p-6 bg-[#FAF7F2] border-t border-[#ECD9C6] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as 1 | 2 | 3)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#F2DEC9] text-[#5C504A] text-xs font-semibold border border-[#ECD9C6] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep((step + 1) as 2 | 3 | 4)}
                  className="px-6 py-2.5 rounded-xl bg-[#BF5C3E] hover:bg-[#A94C30] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="px-8 py-3 rounded-xl bg-[#BF5C3E] hover:bg-[#A94C30] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Photoshoot Booking</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
