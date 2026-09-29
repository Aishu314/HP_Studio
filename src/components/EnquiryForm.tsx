import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, ShieldCheck, MessageCircle, Sparkles, Send } from 'lucide-react';
import { EnquiryFormData } from '../types';
import { STUDIO_INFO } from '../data/mockData';

interface EnquiryFormProps {
  prefilledService?: string;
  appliedPromo?: string;
  onShowToast: (message: string) => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  prefilledService,
  appliedPromo,
  onShowToast,
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    phone: '',
    service: prefilledService || 'Wedding',
    message: '',
    date: '',
    city: 'Pune',
    promoCode: appliedPromo || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const servicesList = ['Wedding', 'Pre-Wedding', 'Baby Shoot', 'Events', 'Car Shoot'];

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, service: prefilledService }));
    }
  }, [prefilledService]);

  useEffect(() => {
    if (appliedPromo) {
      setFormData((prev) => ({ ...prev, promoCode: appliedPromo }));
    }
  }, [appliedPromo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      onShowToast('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const ref = `HP-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRef(ref);
      setIsSubmitting(false);
      setIsSubmitted(true);
      onShowToast('✨ Enquiry sent successfully! We will connect within 2 hours.');
    }, 600);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello HP Studio! I submitted an enquiry (Ref: ${bookingRef}).\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nCity: ${formData.city}\nDate: ${formData.date || 'Flexible'}\nNotes: ${formData.message}\nDiscount: ${formData.promoCode || 'None'}`
    );
    window.open(`https://wa.me/${STUDIO_INFO.cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <section id="enquiry" className="py-12 px-1 sm:px-3">
      <div className="w-[98%] max-w-[1680px] mx-auto">
        {/* Container with dashed border matching Screenshot 2 */}
        <div className="rounded-[32px] sm:rounded-[40px] p-6 sm:p-12 border-2 border-dashed border-[#DEB097]/80 bg-gradient-to-b from-[#FFFDFB] via-[#FAF4EC] to-[#FAF2E8] shadow-sm relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5D8C3]/30 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#221B19] tracking-tight">
              Send A Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5A53] mt-2 leading-relaxed">
              Share your dates & celebration vision. We review availability and send tailored estimates within 2 hours.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              {/* Row 1: Name and Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs sm:text-[13px] font-semibold text-[#382D28] mb-1.5">
                    Your Name <span className="text-[#BF5C3E]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Sneha & Rushi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-[#E9DACB] text-sm text-[#241E1C] placeholder-[#A4948C] shadow-2xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BF5C3E]/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] font-semibold text-[#382D28] mb-1.5">
                    Phone Number <span className="text-[#BF5C3E]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9880847789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-[#E9DACB] text-sm text-[#241E1C] placeholder-[#A4948C] shadow-2xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BF5C3E]/50 transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Service Interested In & Message / Event Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs sm:text-[13px] font-semibold text-[#382D28] mb-1.5">
                    Service Interested In
                  </label>
                  <input
                    type="text"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-[#E9DACB] text-sm text-[#241E1C] shadow-2xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BF5C3E]/50 transition-all"
                  />

                  {/* Quick Selector Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                    {servicesList.map((srv) => {
                      const isSelected = formData.service.toLowerCase().includes(srv.toLowerCase());
                      return (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => setFormData({ ...formData, service: srv })}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#BF5C3E] text-white shadow-xs'
                              : 'bg-white/80 hover:bg-white text-[#63544E] border border-[#ECD9C6]'
                          }`}
                        >
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] font-semibold text-[#382D28] mb-1.5">
                    Message / Event Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Dates, venue city, special vision..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-[#E9DACB] text-sm text-[#241E1C] placeholder-[#A4948C] shadow-2xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BF5C3E]/50 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Extra Helpful Details: Event Date & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                <div>
                  <label className="block text-xs font-medium text-[#6B5A53] mb-1">
                    Event Date (Approximate / Confirmed)
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-[#E9DACB] text-xs text-[#241E1C] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6B5A53] mb-1">
                    Shoot City / Destination
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-[#E9DACB] text-xs text-[#241E1C] focus:bg-white focus:outline-none"
                  >
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Goa">Goa (Destination)</option>
                    <option value="Udaipur">Udaipur (Destination)</option>
                    <option value="Jaipur">Jaipur (Destination)</option>
                    <option value="Other">Other City / Abroad</option>
                  </select>
                </div>
              </div>

              {/* Promo Code Notification */}
              {formData.promoCode && (
                <div className="flex items-center justify-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 py-1.5 px-3 rounded-xl max-w-sm mx-auto">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Promo code <strong>{formData.promoCode}</strong> applied (10% discount included!)</span>
                </div>
              )}

              {/* Centered Send Now button matching Screenshot 2 */}
              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl border-2 border-dashed border-[#BF5C3E] bg-[#FFF8F2] hover:bg-[#BF5C3E] text-[#BF5C3E] hover:text-white font-serif-display font-semibold text-base sm:text-lg transition-all duration-200 shadow-2xs hover:shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending Request...' : 'Send Now'}</span>
                  <CheckCircle2 className="w-5 h-5 stroke-[2]" />
                </button>
              </div>

              {/* Guarantees Footer */}
              <div className="flex items-center justify-center gap-4 text-xs text-[#7B6A63] pt-4 border-t border-[#ECD9C6]/60">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#BF5C3E]" />
                  <span>Response in &lt; 2 hours</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>Zero spam guarantee</span>
                </div>
              </div>
            </form>
          ) : (
            /* Success confirmation card */
            <div className="relative z-10 text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#221B19]">
                Thank You, {formData.name}!
              </h3>
              <p className="text-sm text-[#5C504A] max-w-md mx-auto leading-relaxed">
                Your enquiry for <strong>{formData.service}</strong> has been logged under reference{' '}
                <span className="font-mono font-bold text-[#BF5C3E] bg-white px-2 py-0.5 rounded-md border border-[#E8DACB]">
                  {bookingRef}
                </span>.
                Our lead creative director will review the dates and reach out within 2 hours.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="px-6 py-3 rounded-xl bg-[#0D6832] hover:bg-[#095226] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md transition-all active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Fast-Track on WhatsApp</span>
                </button>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-[#FAF4EC] text-[#5C504A] text-xs sm:text-sm font-semibold border border-[#E9DACB] transition-colors"
                >
                  Send Another Enquiry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
