export type CategoryType = 'All' | 'Wedding' | 'Pre-Wedding' | 'Baby Shoot' | 'Baby' | 'Events' | 'Car Shoot';

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Wedding' | 'Pre-Wedding' | 'Baby' | 'Events' | 'Car Shoot';
  subtitle: string;
  location: string;
  image: string;
  aspectRatio?: string;
  date: string;
  description: string;
  exif: {
    camera: string;
    lens: string;
    settings: string;
  };
  clientReview?: {
    quote: string;
    author: string;
  };
}

export interface ReelItem {
  id: string;
  title: string;
  category: 'Wedding' | 'Pre-Wedding' | 'Baby' | 'Events' | 'Car Shoot';
  songTitle: string;
  songArtist: string;
  audioTrackId: 'chalka' | 'kudmayi' | 'kesariya' | 'lullaby' | 'dhoom' | 'tummile' | 'kabira' | 'gallan';
  views: string;
  likes: number;
  commentsCount: number;
  image: string;
  description: string;
  comments: Array<{
    user: string;
    avatar: string;
    text: string;
    time: string;
  }>;
}

export interface PricingPackage {
  id: string;
  name: string;
  badge?: string;
  category: 'wedding' | 'shoots';
  price: number;
  originalPrice: number;
  duration: string;
  team: string;
  deliverables: string[];
  features: string[];
  popular?: boolean;
}

export interface EnquiryFormData {
  name: string;
  phone: string;
  service: string;
  message: string;
  date?: string;
  city?: string;
  promoCode?: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  movieOrArtist: string;
  category: 'Bridal Entry' | 'Sangeet / Dance' | 'Pre-Wedding Romance' | 'Baby & Lullaby' | 'Acoustic / Emotional' | 'High Energy & Automotive';
  audioTrackId: 'chalka' | 'kudmayi' | 'kesariya' | 'lullaby' | 'dhoom' | 'tummile' | 'kabira' | 'gallan';
  duration: string;
  bpm: number;
  mood: string;
  instruments: string[];
  licenseType: string;
  licenseBadge: 'Royalty-Free Sync' | 'HP Master Sync' | 'Commercial Creator License';
  popularFor: string;
}

export interface BookingSlot {
  id: string;
  label: string;
  timeRange: string;
  type: 'Morning Golden Hour' | 'Afternoon Studio' | 'Sunset Twilight' | 'Night Celebration' | 'Full Day';
  available: boolean;
}

export interface AddOnOption {
  id: string;
  name: string;
  description: string;
  price: number;
  iconName: string;
}

export interface ConfirmedBooking {
  id: string;
  createdAt: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  packageId: string;
  packageName: string;
  category: string;
  date: string;
  timeSlot: string;
  location: string;
  customVenueAddress?: string;
  notes: string;
  specificRequests: string[];
  selectedMusicTrack?: MusicTrack;
  selectedAddOns: string[];
  basePrice: number;
  addOnsPrice: number;
  discountPrice: number;
  totalPrice: number;
  depositAmount: number;
  promoCode?: string;
  status: 'Confirmed' | 'Deposit Paid' | 'Completed' | 'Pending Review';
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  image?: string;
}
