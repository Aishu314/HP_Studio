import { PortfolioItem, ReelItem, PricingPackage, TestimonialItem } from '../types';

import heroImg from '../assets/images/banner_royal_palace_wedding_1790716846971.jpg';
import originalBokehImg from '../assets/images/hero_wedding_bokeh_1790716142080.jpg';
import coupleLogoImg from '../assets/images/avatar_couple_logo_1790716862897.jpg';
import weddingRushiImg from '../assets/images/portfolio_wedding_rushi_1790716154473.jpg';
import preweddingUdaipurImg from '../assets/images/portfolio_prewedding_udaipur_1790716164239.jpg';
import babyAyaanImg from '../assets/images/portfolio_baby_ayaan_1790716177801.jpg';
import bridalReelImg from '../assets/images/reel_bridal_makeup_1790716191954.jpg';
import carShootImg from '../assets/images/car_shoot_night_cinematic_1790716875236.jpg';
import haldiImg from '../assets/images/events_haldi_carnival_1790716887372.jpg';
import sangeetReelImg from '../assets/images/reel_sangeet_dance_energy_1790716903069.jpg';
import weddingVarmaalaImg from '../assets/images/wedding_royal_varmaala_1790717279836.jpg';
import preweddingBeachImg from '../assets/images/prewedding_beach_sunset_1790717296359.jpg';
import babySmilesImg from '../assets/images/baby_smiles_floral_studio_1790717312800.jpg';
import eventsDanceFloorImg from '../assets/images/events_sangeet_dance_floor_1790717330035.jpg';
import supercarSpeedImg from '../assets/images/car_shoot_supercar_speed_1790717344524.jpg';

export const STUDIO_INFO = {
  name: 'HP STUDIO',
  handle: '@HP_STUDIO_06',
  instagramUrl: 'https://www.instagram.com/hp_studio_06/',
  phone: '+91 9865404174',
  cleanPhone: '919865404174',
  email: 'Hpstudio@gmail.com',
  locations: 'Pune & Mumbai',
  address: 'Studio 402, Koregaon Park, Pune & Bandra West, Mumbai',
  rating: '4.9',
  reviewsCount: '240+ Shoots',
  tagline: 'Professional Photographers For wedding , Birthday , and Best forever events and make more truthful memory',
  heroImage: heroImg,
  coupleLogo: coupleLogoImg,
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // 1. WEDDING
  {
    id: 'wedding-heritage-shoot',
    title: 'Heritage Palace Wedding',
    category: 'Wedding',
    subtitle: 'WEDDING SHOOT',
    location: 'The Leela Palace, Udaipur',
    image: weddingRushiImg,
    date: 'Dec 2024',
    description: 'A 3-day royal heritage palace wedding celebration in Rajasthan with royal pheras at twilight, grand baraat, and an emotionally intimate sunset portrait series.',
    exif: {
      camera: 'Sony Alpha 1 + Sony A7R V',
      lens: 'Sony 50mm f/1.2 GM & 85mm f/1.4 GM',
      settings: 'f/1.6 · 1/500s · ISO 160'
    },
    clientReview: {
      quote: 'HP Studio captured our wedding with such raw warmth and poetry. Every photograph is a heirloom we will treasure for generations.',
      author: 'Wedding Client'
    }
  },
  {
    id: 'wedding-mandap-shoot',
    title: 'Royal Mandap Wedding',
    category: 'Wedding',
    subtitle: 'WEDDING SHOOT',
    location: 'Taj Falaknuma Palace, Hyderabad',
    image: heroImg,
    date: 'Jan 2025',
    description: 'An ethereal pastel and gold royal wedding. We focused on candids of laughter, intricate zardozi craftsmanship, and regal heritage portraiture under thousands of fairy lights.',
    exif: {
      camera: 'Canon EOS R5C',
      lens: 'Canon RF 85mm f/1.2L USM DS',
      settings: 'f/1.4 · 1/800s · ISO 100'
    },
    clientReview: {
      quote: 'The team blended in so effortlessly, catching glances and smiles that felt entirely candid and cinematic.',
      author: 'Wedding Client'
    }
  },
  {
    id: 'wedding-varmala-shoot',
    title: 'Royal Varmala Ceremony',
    category: 'Wedding',
    subtitle: 'WEDDING SHOOT',
    location: 'Suryagarh Palace, Jaisalmer',
    image: weddingVarmaalaImg,
    date: 'Feb 2025',
    description: 'Emotional varmala exchange under a cascading shower of red rose and white mogra petals in the palace courtyard as the sunset painted the stone golden.',
    exif: {
      camera: 'Sony A1 Master Cinema',
      lens: 'Sony 70-200mm f/2.8 GM II',
      settings: 'f/2.8 · 1/1250s · ISO 200'
    },
    clientReview: {
      quote: 'The varmala petal shower photograph looks like a dream! It captured the exact tearful smile on my father\'s face too.',
      author: 'Wedding Client'
    }
  },

  // 2. PRE-WEDDING
  {
    id: 'prewedding-udaipur-shoot',
    title: 'Heritage Pre-Wedding',
    category: 'Pre-Wedding',
    subtitle: 'PRE-WEDDING SHOOT',
    location: 'Chhatris of Udaipur & Lake Pichola',
    image: preweddingUdaipurImg,
    date: 'Nov 2024',
    description: 'Sunrise to twilight pre-wedding visual journal across ancient Mewar stone arches, vintage boat rides, and candlelit courtyard dance sequences.',
    exif: {
      camera: 'Sony A7 IV',
      lens: 'Sony 35mm f/1.4 GM & 24-70mm GM II',
      settings: 'f/2.0 · 1/640s · ISO 200'
    },
    clientReview: {
      quote: 'We felt like stars in a vintage Bollywood film. The styling, warmth, and direction from HP Studio was world-class.',
      author: 'Pre-Wedding Client'
    }
  },
  {
    id: 'prewedding-beach-shoot',
    title: 'Beachside Pre-Wedding',
    category: 'Pre-Wedding',
    subtitle: 'PRE-WEDDING SHOOT',
    location: 'Ashwem Sunset Beach, North Goa',
    image: preweddingBeachImg,
    date: 'Jan 2025',
    description: 'Barefoot romance on wet golden sands under a dramatic purple and amber sunset sky, with the crimson gown catching the sea breeze.',
    exif: {
      camera: 'Sony A7R V',
      lens: 'Sony 50mm f/1.2 GM',
      settings: 'f/1.8 · 1/800s · ISO 100'
    },
    clientReview: {
      quote: 'The beach reflections look like an oil painting. Truly unforgettable memories.',
      author: 'Pre-Wedding Client'
    }
  },

  // 3. BABY SHOOT
  {
    id: 'baby-newborn-shoot',
    title: 'Newborn Baby Shoot',
    category: 'Baby',
    subtitle: 'BABY SHOOT',
    location: 'HP Studio Suites, Pune',
    image: babyAyaanImg,
    date: 'Oct 2024',
    description: 'A tranquil 14-day newborn milestone portrait collection with temperature-controlled natural organic wool wraps, dried florals, and tender parental hands.',
    exif: {
      camera: 'Nikon Z9',
      lens: 'Nikkor Z 50mm f/1.2 S',
      settings: 'f/2.2 · 1/250s · ISO 100'
    },
    clientReview: {
      quote: 'HP Studio handled our baby with utmost tenderness, patience, and safety. The pictures brought tears of joy to our eyes.',
      author: 'Baby Milestone Parents'
    }
  },
  {
    id: 'baby-studio-shoot',
    title: 'Baby Milestone Shoot',
    category: 'Baby',
    subtitle: 'BABY SHOOT',
    location: 'HP Studio Suites, Bandra Mumbai',
    image: babySmilesImg,
    date: 'Feb 2025',
    description: 'Gentle joyful studio milestone capturing 6-month giggles, tiny clapping hands, white baby\'s breath floral halos, and natural baby innocence.',
    exif: {
      camera: 'Canon EOS R5C',
      lens: 'Canon RF 50mm f/1.2L',
      settings: 'f/2.0 · 1/320s · ISO 100'
    },
    clientReview: {
      quote: 'The baby was laughing the entire session! The team was so patient and playful.',
      author: 'Baby Milestone Parents'
    }
  },

  // 4. EVENTS (HALDI, SANGEET, RECEPTION)
  {
    id: 'events-haldi-shoot',
    title: 'Haldi Carnival Ceremony',
    category: 'Events',
    subtitle: 'EVENTS SHOOT',
    location: 'SaffronStays Alibag Ocean Estate',
    image: haldiImg,
    date: 'Jan 2025',
    description: 'Vibrant marigold petals flying in golden hour sunshine, organic turmeric ceremonies, dhol beats, and ecstatic candid family celebrations.',
    exif: {
      camera: 'Sony A7R V',
      lens: 'Sony 35mm f/1.4 GM',
      settings: 'f/2.0 · 1/2000s · ISO 100'
    },
    clientReview: {
      quote: 'The petal splash photos look like a movie poster! Everyone in our family is raving about HP Studio.',
      author: 'Events Client'
    }
  },
  {
    id: 'events-sangeet-shoot',
    title: 'Grand Sangeet Night',
    category: 'Events',
    subtitle: 'EVENTS SHOOT',
    location: 'Fairmont Jaipur Stage',
    image: originalBokehImg,
    date: 'Dec 2024',
    description: 'High-octane Sangeet night filled with Punjabi dhol beats, synchronized couple dance choreography, cold firework pyros, and electric celebrations.',
    exif: {
      camera: 'Sony A7S III',
      lens: 'Sony 24mm f/1.4 GM',
      settings: 'f/1.8 · 1/250s · ISO 1600'
    }
  },
  {
    id: 'events-reception-shoot',
    title: 'Reception After-Party',
    category: 'Events',
    subtitle: 'EVENTS SHOOT',
    location: 'The St. Regis, Mumbai',
    image: eventsDanceFloorImg,
    date: 'Feb 2025',
    description: 'Glamorous celebration on an illuminated glass LED dance stage with falling metallic confetti and cold sparks shooting into the night air.',
    exif: {
      camera: 'Sony FX3 Cinema',
      lens: 'Sony 24-70mm f/2.8 GM II',
      settings: 'f/2.8 · 1/320s · ISO 2500'
    }
  },

  // 5. CAR SHOOT
  {
    id: 'car-porsche-shoot',
    title: 'Porsche 911 GT3 Rollers',
    category: 'Car Shoot',
    subtitle: 'CAR SHOOT',
    location: 'Mumbai Coastal Sea Bridge & Studio',
    image: carShootImg,
    date: 'Feb 2025',
    description: 'Sleek luxury light painting and high-speed motion tracking shots, capturing dramatic LED silhouettes and automotive racing elegance.',
    exif: {
      camera: 'Sony FX3 Cinema Rig',
      lens: 'Sony 16-35mm f/2.8 GM II',
      settings: 'f/3.5 · 1/40s · ISO 200 · Polarizer'
    },
    clientReview: {
      quote: 'Best automotive cinematography in India. The night lighting on the curves of the GT3 is unbelievable.',
      author: 'Car Shoot Client'
    }
  },
  {
    id: 'car-supercar-shoot',
    title: 'Supercar Bridge Velocity',
    category: 'Car Shoot',
    subtitle: 'CAR SHOOT',
    location: 'Pune-Mumbai Expressway Viaduct',
    image: supercarSpeedImg,
    date: 'Jan 2025',
    description: 'Precision rolling camera car tracking shot at sunset dusk. Captures crisp gloss reflection on the supercar paintwork with cinematic highway blur.',
    exif: {
      camera: 'Sony FX6 with Flowcine Black Arm Rig',
      lens: 'Cooke Anamorphic /i Prime',
      settings: 'T2.8 · 1/48s · ISO 800 · ND 1.2'
    },
    clientReview: {
      quote: 'HP Studio understands speed and automotive lines better than any agency in the country.',
      author: 'Car Shoot Client'
    }
  }
];

export const REELS_DATA: ReelItem[] = [
  // 1. Wedding: Bridal Glam
  {
    id: 'reel-wedding-bridal',
    title: 'Royal Bridal Glow',
    category: 'Wedding',
    songTitle: 'Chalka Chalka Re',
    songArtist: 'Saathiya • A.R. Rahman, Richa Sharma',
    audioTrackId: 'chalka',
    views: '248K',
    likes: 18400,
    commentsCount: 642,
    image: bridalReelImg,
    description: 'Behind the scenes royal bridal entry preparation. Intricate kundan jewels and radiant cinematic lighting. ✨',
    comments: [
      { user: 'bridal_styling', avatar: '👰', text: 'The natural skin finish and lighting are divine!! 🤍', time: '2h ago' },
      { user: 'cinematography_in', avatar: '📸', text: 'HP Studio tone grading is next level brother 🔥', time: '5h ago' },
      { user: 'royal_weddings', avatar: '✨', text: 'Need this song on repeat! Booking you guys for Dec!', time: '1d ago' },
    ]
  },
  // 2. Wedding: Royal Varmala
  {
    id: 'reel-wedding-varmala',
    title: 'Royal Varmala & Petal Shower',
    category: 'Wedding',
    songTitle: 'Kabira',
    songArtist: 'Yeh Jawaani Hai Deewani • Pritam, Arijit Singh',
    audioTrackId: 'kabira',
    views: '356K',
    likes: 29800,
    commentsCount: 880,
    image: weddingVarmaalaImg,
    description: 'The golden hour moment under cascading rose petals in the palace courtyard with pure cinematic emotion. 🌹💍',
    comments: [
      { user: 'wedding_diaries', avatar: '🤍', text: 'That slow motion petal drop gave me full goosebumps!', time: '1h ago' },
      { user: 'palace_shoots', avatar: '👑', text: 'Pure royalty! Masterful cinematography.', time: '4h ago' },
    ]
  },
  // 3. Pre-Wedding: Udaipur Romance
  {
    id: 'reel-prewedding-udaipur',
    title: 'Palace Pre-Wedding Vibe',
    category: 'Pre-Wedding',
    songTitle: 'Kesariya',
    songArtist: 'Brahmāstra • Pritam, Arijit Singh',
    audioTrackId: 'kesariya',
    views: '185K',
    likes: 14100,
    commentsCount: 530,
    image: preweddingUdaipurImg,
    description: 'Romantic dance sequences through the heritage arches of Lake Pichola. Golden hour in Udaipur hits different. 🏰🧡',
    comments: [
      { user: 'prewedding_inspo', avatar: '✨', text: 'Literally feels like a Bollywood film frame! 😍', time: '4h ago' },
      { user: 'rajasthan_diaries', avatar: '💫', text: 'Stunning architectural framing and tones!', time: '1d ago' },
    ]
  },
  // 4. Pre-Wedding: Goa Beach Romance
  {
    id: 'reel-prewedding-beach',
    title: 'Beach Sunset Pre-Wedding',
    category: 'Pre-Wedding',
    songTitle: 'Tu Hi Haqeeqat / Tum Mile',
    songArtist: 'Tum Mile • Pritam, Javed Ali',
    audioTrackId: 'tummile',
    views: '220K',
    likes: 19400,
    commentsCount: 615,
    image: preweddingBeachImg,
    description: 'Barefoot romance on wet sunset sands as the crimson gown dances with the Arabian Sea breeze. Pure magic. 🌊🌅❤️',
    comments: [
      { user: 'beach_shoots', avatar: '🌴', text: 'The color grading of that sunset sky is unreal!!', time: '2h ago' },
      { user: 'travel_couples', avatar: '💫', text: 'Pre-wedding goals right here!', time: '6h ago' },
    ]
  },
  // 5. Baby: Newborn Milestone
  {
    id: 'reel-baby-newborn',
    title: 'Newborn Baby Milestone',
    category: 'Baby',
    songTitle: 'Dhaagon Se Baandhaa (Lullaby)',
    songArtist: 'Raksha Bandhan • Arijit Singh, Shreya Ghoshal',
    audioTrackId: 'lullaby',
    views: '320K',
    likes: 27900,
    commentsCount: 890,
    image: babyAyaanImg,
    description: 'That tiny smile while dreaming at just 14 days old. Handled with sterile warmth and pure love. 👶🍼🌸',
    comments: [
      { user: 'mommy_diary', avatar: '🤱', text: 'That little smile melted my whole heart 🥹❤️', time: '30m ago' },
      { user: 'baby_shoots', avatar: '🌸', text: 'How do you get newborns to sleep so peacefully? Magic!', time: '6h ago' },
    ]
  },
  // 6. Baby: Tara Giggles
  {
    id: 'reel-baby-milestone',
    title: 'Baby Milestone Moments',
    category: 'Baby',
    songTitle: 'Dhaagon Se Baandhaa (Lullaby)',
    songArtist: 'Raksha Bandhan • Arijit Singh, Shreya Ghoshal',
    audioTrackId: 'lullaby',
    views: '265K',
    likes: 23100,
    commentsCount: 740,
    image: babySmilesImg,
    description: 'Clapping tiny hands and giggling in the studio lights. Pure unscripted childhood happiness! 🌸👶✨',
    comments: [
      { user: 'baby_club', avatar: '💖', text: 'Those chubby cheeks! Such a gorgeous portrait!', time: '1h ago' },
      { user: 'studio_moms', avatar: '🥰', text: 'Booking a milestone shoot next week!', time: '5h ago' },
    ]
  },
  // 7. Events: Sangeet Pyros
  {
    id: 'reel-events-sangeet',
    title: 'Grand Sangeet Stage Pyros',
    category: 'Events',
    songTitle: 'Kudmayi (Film Version)',
    songArtist: 'Rocky Aur Rani Kii Prem Kahaani • Pritam, Shahid Mallya',
    audioTrackId: 'kudmayi',
    views: '412K',
    likes: 32700,
    commentsCount: 1240,
    image: sangeetReelImg,
    description: 'High-energy dance stage entry with cold pyros and live Punjabi dhol beats. Pure unadulterated madness! 🥁🎆',
    comments: [
      { user: 'dhol_kings', avatar: '🥁', text: 'That energy was unmatchable! Best crowd ever 🙌', time: '1h ago' },
      { user: 'sangeet_vibes', avatar: '💃', text: 'I have watched this 10 times already!! Goosebumps!', time: '3h ago' },
      { user: 'event_pro', avatar: '🔥', text: 'Best event videography in Maharashtra hands down', time: '1d ago' },
    ]
  },
  // 8. Events: Haldi Flower Shower
  {
    id: 'reel-events-haldi',
    title: 'Haldi Marigold Shower',
    category: 'Events',
    songTitle: 'Gallan Goodiyaan',
    songArtist: 'Dil Dhadakne Do • Shankar-Ehsaan-Loy, Yashita Sharma',
    audioTrackId: 'gallan',
    views: '380K',
    likes: 31200,
    commentsCount: 940,
    image: haldiImg,
    description: '50kg of fresh marigold petals flying in golden hour sunshine! The most joyful Haldi madness ever filmed. 🌼💛',
    comments: [
      { user: 'haldi_carnival', avatar: '💛', text: 'This is the happiest Haldi video on the internet!!', time: '2h ago' },
      { user: 'wedding_vibes', avatar: '🎊', text: 'The slow-mo petal burst is breathtaking!', time: '5h ago' },
    ]
  },
  // 9. Car Shoot: Porsche Coastal Rollers
  {
    id: 'reel-car-porsche',
    title: 'Porsche GT3 Night Rollers',
    category: 'Car Shoot',
    songTitle: 'Dhoom Again',
    songArtist: 'Dhoom 2 • Pritam, Vishal Dadlani, Sunidhi Chauhan',
    audioTrackId: 'dhoom',
    views: '298K',
    likes: 26400,
    commentsCount: 710,
    image: carShootImg,
    description: 'Low angle gimbal tracking at 100km/h along the Mumbai Sea Link at 2 AM. Pure automotive acoustic adrenaline! 🏎️💨✨',
    comments: [
      { user: 'speed_hunters', avatar: '🏎️', text: 'Those taillight streaks with that bass drop gave me chills! 🔥', time: '1h ago' },
      { user: 'car_enthusiasts', avatar: '⚡', text: 'Need a shoot for my car next month bro!!', time: '4h ago' },
    ]
  },
  // 10. Car Shoot: Supercar Velocity
  {
    id: 'reel-car-supercar',
    title: 'Supercar Highway Velocity',
    category: 'Car Shoot',
    songTitle: 'Dhoom Again',
    songArtist: 'Dhoom 2 • Pritam, Vishal Dadlani, Sunidhi Chauhan',
    audioTrackId: 'dhoom',
    views: '340K',
    likes: 30100,
    commentsCount: 820,
    image: supercarSpeedImg,
    description: 'High-speed bridge acceleration tracking with anamorphic cinematic flares. Pure visual adrenaline! 🏎️🔥🏁',
    comments: [
      { user: 'autocar_club', avatar: '🏎️', text: 'That rolling tracking rig work is top tier cinema work!', time: '2h ago' },
      { user: 'supercar_lovers', avatar: '⚡', text: 'The sound design on this reel is ridiculous!!', time: '4h ago' },
    ]
  }
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'silver-portrait',
    name: 'Silver Milestone',
    badge: 'Popular for Baby & Portraits',
    category: 'shoots',
    price: 14999,
    originalPrice: 18999,
    duration: 'Up to 3 Hours Session',
    team: '1 Senior Master Photographer + 1 Assistant',
    deliverables: [
      '35 High-Resolution Retouched Photos',
      '1 Cinematic 4K Instagram Reel with trending music',
      'Private Cloud Online Viewing Gallery (1 Year)',
      'Same-Week 48-Hour Preview Teaser'
    ],
    features: [
      'Studio or Outdoor Location (Pune / Mumbai)',
      'Multiple Outfit / Theme Changes (up to 3)',
      'Studio Props & Maternity/Baby Wraps included',
      'Full Commercial & Social Media Usage Rights'
    ]
  },
  {
    id: 'gold-wedding',
    name: 'Gold Royal Wedding',
    badge: 'Most Popular',
    category: 'wedding',
    price: 49999,
    originalPrice: 59999,
    popular: true,
    duration: '2 Full Days Coverage (Haldi, Sangeet & Wedding)',
    team: '2 Candid Photographers + 2 Cinematographers + Drone Pilot',
    deliverables: [
      '200+ Color-Graded Heirloom Portraits',
      'Full 4K Cinematic Wedding Film (15–20 mins)',
      '3 High-Energy Instagram Reels with Bollywood Audio',
      'Premium Handcrafted Velvet Photo Album (40 Pages)',
      'All Raw Uncut Footage on 1TB High-Speed SSD'
    ],
    features: [
      '4K Aerial Drone Coverage included',
      'Same-Week Teaser Highlights Video',
      'Dedicated Creative Director on site',
      'Pre-wedding Consultation & Timeline Planning'
    ]
  },
  {
    id: 'diamond-grandeur',
    name: 'Diamond Grandeur',
    badge: 'Luxury Heirloom Experience',
    category: 'wedding',
    price: 99999,
    originalPrice: 125000,
    duration: '3 to 4 Days Complete Celebrations & Pre-Wedding',
    team: 'Full Production Crew (6 Specialists + 2 Drones)',
    deliverables: [
      'Unlimited Full-Event Retouched Photography',
      'Feature-Length 45-Minute Cinema Documentary',
      '6 Curated Instagram Reels with custom audio mixing',
      '2 Premium Italian Leather Heirloom Albums (1 for Couple, 1 for Parents)',
      'Pre-Wedding Shoot in Udaipur, Goa or Mumbai included'
    ],
    features: [
      'Same-Day Sangeet/Reception Teaser screening for guests',
      'Dual 4K HDR Drone Cinematography',
      'Priority Post-Production: Complete delivery in 18 days',
      'Dedicated Travel & Logistics Concierge'
    ]
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    quote: 'HP Studio captured our wedding with such raw warmth and poetry. Every photograph is a heirloom.',
    author: 'Wedding Shoot',
    role: 'Destination Wedding · Udaipur',
    location: 'Pune',
    rating: 5,
  },
  {
    id: 't-2',
    quote: 'From our pre-wedding in Udaipur to the Sangeet madness, the team captured the exact feeling of our favorite moments. Their reels went viral too!',
    author: 'Pre-Wedding Shoot',
    role: 'Pre-Wedding & Wedding Film',
    location: 'Mumbai',
    rating: 5,
  },
  {
    id: 't-3',
    quote: 'Finding a photographer who understands newborn safety and baby temperament is so rare. HP Studio was so gentle with our little one.',
    author: 'Baby Milestone Shoot',
    role: 'Studio Newborn Milestone',
    location: 'Pune',
    rating: 5,
  },
  {
    id: 't-4',
    quote: 'The automotive shoot of my Porsche was straight out of Top Gear magazine. The lighting and rolling rig shots are perfection.',
    author: 'Luxury Car Shoot',
    role: 'Automotive Cinematography · Mumbai Coastal Road',
    location: 'Mumbai',
    rating: 5,
  }
];
