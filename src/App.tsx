import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { PromoBanner } from './components/PromoBanner';
import { ReelsSection } from './components/ReelsSection';
import { PricingPackages } from './components/PricingPackages';
import { Testimonials } from './components/Testimonials';
import { EnquiryForm } from './components/EnquiryForm';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingSystemModal } from './components/BookingSystemModal';
import { MusicLibraryModal } from './components/MusicLibraryModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { InstagramModal } from './components/InstagramModal';
import { ConfirmedBooking, MusicTrack } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Wedding');
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [prefilledService, setPrefilledService] = useState<string>('Wedding');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPackageId, setBookingPackageId] = useState<string | undefined>(undefined);
  const [isMusicLibraryOpen, setIsMusicLibraryOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isInstagramModalOpen, setIsInstagramModalOpen] = useState(false);
  const [selectedSyncedTrack, setSelectedSyncedTrack] = useState<MusicTrack | undefined>(undefined);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const handleOpenBooking = (packageId?: string) => {
    if (packageId) {
      setBookingPackageId(packageId);
    }
    setIsBookingModalOpen(true);
  };

  const handleOpenEnquiry = (serviceName?: string) => {
    if (serviceName) {
      setPrefilledService(serviceName);
    }
    const elem = document.getElementById('enquiry');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigatePricing = () => {
    const elem = document.getElementById('pricing');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigatePortfolio = () => {
    const elem = document.getElementById('portfolio');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateReels = () => {
    const elem = document.getElementById('reels');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    // Smooth scroll to portfolio if needed
    const elem = document.getElementById('portfolio');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingConfirmed = (booking: ConfirmedBooking) => {
    showToast(`📸 Booking ${booking.id} reserved for ${booking.clientName}!`);
  };

  const handleTrackSelectedForSync = (track: MusicTrack) => {
    setSelectedSyncedTrack(track);
    showToast(`🎵 "${track.title}" synced! Ready for your video reel.`);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#241E1C] font-body selection:bg-[#BF5C3E] selection:text-white relative">
      {/* Top Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenMusicLibrary={() => setIsMusicLibraryOpen(true)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onOpenInstagram={() => setIsInstagramModalOpen(true)}
        onOpenEnquiry={handleOpenEnquiry}
        onNavigatePricing={handleNavigatePricing}
        onNavigatePortfolio={handleNavigatePortfolio}
        onNavigateReels={handleNavigateReels}
      />

      <main>
        {/* Hero Section */}
        <Hero
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onNavigatePricing={handleNavigatePricing}
          onShowToast={showToast}
        />

        {/* Portfolio Section */}
        <Portfolio
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenEnquiry={(service) => {
            if (service) {
              setPrefilledService(service);
              handleOpenBooking();
            } else {
              handleOpenEnquiry();
            }
          }}
          onShowToast={showToast}
        />

        {/* Promo Discount Banner */}
        <PromoBanner
          onApplyPromo={setAppliedPromo}
          appliedPromo={appliedPromo}
          onShowToast={showToast}
        />

        {/* Real Reels Section with Bollywood Songs & Web Audio */}
        <ReelsSection
          onOpenEnquiry={(srv) => {
            setPrefilledService(srv || 'Wedding');
            handleOpenBooking();
          }}
          onOpenMusicLibrary={() => setIsMusicLibraryOpen(true)}
          onOpenInstagram={() => setIsInstagramModalOpen(true)}
          onShowToast={showToast}
        />

        {/* Featured Heirloom Testimonial */}
        <Testimonials />

        {/* Packages & Pricing + Custom Estimator */}
        <PricingPackages
          onSelectPackage={(pkg) => handleOpenBooking(pkg)}
          appliedPromo={appliedPromo}
        />

        {/* Dashed Border Send A Enquiry Form */}
        <EnquiryForm
          prefilledService={prefilledService}
          appliedPromo={appliedPromo}
          onShowToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer onOpenInstagram={() => setIsInstagramModalOpen(true)} />

      {/* Booking System Modal */}
      <BookingSystemModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedPackageId={bookingPackageId}
        appliedPromo={appliedPromo}
        preselectedMusicTrack={selectedSyncedTrack}
        onBookingConfirmed={handleBookingConfirmed}
        onOpenMusicLibrary={() => {
          setIsBookingModalOpen(false);
          setIsMusicLibraryOpen(true);
        }}
        onShowToast={showToast}
      />

      {/* Bollywood Music Library Vault Modal */}
      <MusicLibraryModal
        isOpen={isMusicLibraryOpen}
        onClose={() => setIsMusicLibraryOpen(false)}
        onSelectTrackForSync={handleTrackSelectedForSync}
        selectedTrackId={selectedSyncedTrack?.id}
        onShowToast={showToast}
      />

      {/* Client Scheduled Bookings Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        onBookNewShoot={() => handleOpenBooking()}
        onShowToast={showToast}
      />

      {/* Official Instagram Profile & Connect Modal */}
      <InstagramModal
        isOpen={isInstagramModalOpen}
        onClose={() => setIsInstagramModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Floating Elements */}
      <FloatingWhatsApp />
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
