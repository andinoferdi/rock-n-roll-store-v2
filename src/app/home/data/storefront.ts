export type ParallaxAxis = "x" | "y";

export type ParallaxLayerImportance = "core" | "detail";

export type ParallaxSpringConfig = {
  stiffness: number;
  damping: number;
  mass?: number;
  restDelta?: number;
  restSpeed?: number;
};

export type ParallaxLayerConfig = {
  id: string;
  axis: ParallaxAxis;
  desktopRange: readonly [number, number];
  mobileRange: readonly [number, number];
  opacity?: readonly [number, number];
  scale?: readonly [number, number];
  spring: ParallaxSpringConfig;
  importance?: ParallaxLayerImportance;
};

export type ParallaxResponsiveMode = "adaptive" | "desktop-only";

export type ParallaxSceneConfig = {
  offset: readonly [
    "start end" | "start start" | "end end" | "end start",
    "start end" | "start start" | "end end" | "end start",
  ];
  responsive: {
    mode: ParallaxResponsiveMode;
    compactQuery: string;
    maxMobileLayers: number;
    reduceMotionByDefault: boolean;
  };
};

export const heroParallaxPreset: {
  scene: ParallaxSceneConfig;
  layers: readonly ParallaxLayerConfig[];
} = {
  scene: {
    offset: ["start start", "end start"],
    responsive: {
      mode: "adaptive",
      compactQuery: "(max-width: 760px)",
      maxMobileLayers: 3,
      reduceMotionByDefault: true,
    },
  },
  layers: [
    {
      id: "grid",
      axis: "y",
      desktopRange: [0, -36],
      mobileRange: [0, -14],
      opacity: [1, 0.9],
      scale: [1, 1.01],
      spring: {
        stiffness: 126,
        damping: 28,
        mass: 0.58,
      },
      importance: "core",
    },
    {
      id: "halo",
      axis: "y",
      desktopRange: [0, -108],
      mobileRange: [0, -32],
      opacity: [0.56, 0.88],
      scale: [0.96, 1.06],
      spring: {
        stiffness: 118,
        damping: 30,
        mass: 0.66,
      },
      importance: "core",
    },
  ],
} as const;

export const productsParallaxPreset: {
  scene: ParallaxSceneConfig;
  layers: readonly ParallaxLayerConfig[];
} = {
  scene: {
    offset: ["start end", "end start"],
    responsive: {
      mode: "adaptive",
      compactQuery: "(max-width: 760px)",
      maxMobileLayers: 2,
      reduceMotionByDefault: true,
    },
  },
  layers: [
    {
      id: "productsGrid",
      axis: "y",
      desktopRange: [0, -64],
      mobileRange: [0, -18],
      opacity: [0.18, 0.38],
      scale: [1, 1.01],
      spring: {
        stiffness: 118,
        damping: 26,
        mass: 0.58,
      },
      importance: "core",
    },
    {
      id: "productsGlow",
      axis: "y",
      desktopRange: [0, -122],
      mobileRange: [0, -34],
      opacity: [0.18, 0.62],
      scale: [0.96, 1.08],
      spring: {
        stiffness: 112,
        damping: 28,
        mass: 0.64,
      },
      importance: "core",
    },
    {
      id: "productsOrb",
      axis: "x",
      desktopRange: [0, -96],
      mobileRange: [0, -28],
      opacity: [0.12, 0.35],
      scale: [0.94, 1.05],
      spring: {
        stiffness: 106,
        damping: 28,
        mass: 0.68,
      },
      importance: "detail",
    },
  ],
} as const;

export const storyParallaxPreset: {
  scene: ParallaxSceneConfig;
  layers: readonly ParallaxLayerConfig[];
} = {
  scene: {
    offset: ["start end", "end start"],
    responsive: {
      mode: "adaptive",
      compactQuery: "(max-width: 900px)",
      maxMobileLayers: 2,
      reduceMotionByDefault: true,
    },
  },
  layers: [
    {
      id: "storyPanel",
      axis: "y",
      desktopRange: [0, -90],
      mobileRange: [0, -28],
      opacity: [1, 0.95],
      scale: [1, 1.015],
      spring: {
        stiffness: 118,
        damping: 27,
        mass: 0.6,
      },
      importance: "core",
    },
    {
      id: "storyImage",
      axis: "y",
      desktopRange: [0, -132],
      mobileRange: [0, -44],
      opacity: [1, 0.92],
      scale: [1, 1.045],
      spring: {
        stiffness: 112,
        damping: 28,
        mass: 0.65,
      },
      importance: "core",
    },
    {
      id: "storyGlow",
      axis: "x",
      desktopRange: [0, 76],
      mobileRange: [0, 20],
      opacity: [0.14, 0.44],
      scale: [0.96, 1.08],
      spring: {
        stiffness: 104,
        damping: 28,
        mass: 0.7,
      },
      importance: "detail",
    },
  ],
} as const;

export const heroData = {
  tag: "New Season - 2026 Collection",
  titleTop: "Gear selected for",
  titleAccent: "stage and studio.",
  subtitle:
    "Built for sessions, rehearsals, and weekend shows with reliable tone, stable tuning, and realistic pricing.",
  stats: [
    { value: "8K+", label: "Products in stock" },
    { value: "120+", label: "Brands carried" },
    { value: "48hr", label: "Delivery worldwide" },
  ],
} as const;

export const marqueeItems = [
  "Electric Guitars",
  "Acoustic & Classical",
  "Bass Guitars",
  "Drum Kits",
  "Amplifiers",
  "Effects Pedals",
  "Keyboards & Synths",
  "Studio & Recording",
] as const;

export const categoryItems = [
  { tag: "Electric & Acoustic", name: "Guitars", count: "1,240 instruments ready to ship", delayMs: 0 },
  { tag: "4, 5 & 6 string", name: "Bass", count: "380 products", delayMs: 100 },
  { tag: "Kits & Hardware", name: "Drums", count: "560 products", delayMs: 200 },
  { tag: "Keys & Synthesizers", name: "Keyboards", count: "430 products", delayMs: 300 },
] as const;

export const productItems = [
  {
    category: "Electric Guitar",
    name: "Fender Player II Stratocaster HSS",
    specs: "Alder body - Maple neck - 22 frets - Tremolo bridge",
    price: "$849",
    badge: "New",
    image: "/images/product/product-01.jpg",
  },
  {
    category: "Amplifier",
    name: "Marshall DSL40CR Combo",
    specs: "2-channel - 40W - Celestion speaker - Built-in reverb",
    price: "$749",
    badge: "Popular",
    image: "/images/product/product-02.jpg",
  },
  {
    category: "Drum Kit",
    name: "Pearl Export EXX Shell Pack",
    specs: "Poplar shell - 5-piece - Hardware included",
    price: "$629",
    badge: "Sale",
    image: "/images/product/product-03.jpg",
  },
  {
    category: "Bass Guitar",
    name: "Music Man StingRay Special 4",
    specs: "Roasted maple neck - Ceramic pickups - Active EQ",
    price: "$2,199",
    image: "/images/product/product-04.jpg",
  },
  {
    category: "Effects",
    name: "Boss GT-1000CORE Processor",
    specs: "121 effects - AIRD engine - USB-C interface",
    price: "$499",
    image: "/images/product/product-05.jpg",
  },
  {
    category: "Stage Keyboard",
    name: "Nord Stage 4 HA88",
    specs: "88-key weighted - Triple sensor - Piano library",
    price: "$3,799",
    badge: "Bestseller",
    image: "/images/hero/hero-img.jpg",
  },
] as const;

export const brandsSectionData = {
  eyebrow: "Authorized dealer network",
  title: "Pro lines we keep ready for sessions and stage work.",
  description:
    "These brands stay in rotation because parts support, build consistency, and service turnaround are reliable.",
  railLabel: "Current focus brands",
} as const;

export const brandItems = [
  {
    name: "Fender",
    emphasis: "anchor",
    category: "Anchor",
    note: "Player and Pro series, ready for touring setups.",
  },
  {
    name: "Gibson",
    emphasis: "anchor",
    category: "Anchor",
    note: "Core Les Paul and SG stock with setup checks included.",
  },
  {
    name: "Marshall",
    emphasis: "anchor",
    category: "Anchor",
    note: "Valve and studio combo options for rehearsal rooms.",
  },
  {
    name: "Pearl",
    emphasis: "core",
    category: "Core",
    note: "Shell packs and hardware bundles for live kits.",
  },
  {
    name: "Roland",
    emphasis: "core",
    category: "Core",
    note: "Hybrid percussion and keyboard lines with warranty support.",
  },
  {
    name: "Boss",
    emphasis: "core",
    category: "Core",
    note: "Pedalboard essentials from compact to flagship processors.",
  },
  {
    name: "Ibanez",
    emphasis: "specialty",
    category: "Specialty",
    note: "Fast-neck electric models for modern session players.",
  },
  {
    name: "Nord",
    emphasis: "specialty",
    category: "Specialty",
    note: "Stage keyboard units calibrated before dispatch.",
  },
] as const;

export const storyData = {
  eyebrow: "Store Method",
  title: "Practical Advice Before Any Checkout Push",
  body: "We map your setlist, room volume, and transport limits first, then shortlist gear that solves those constraints with the least friction.",
  highlights: [
    {
      title: "Session-first recommendations",
      detail:
        "We suggest gear based on your actual rehearsal chain and monitoring setup.",
    },
    {
      title: "Transparent pricing decisions",
      detail:
        "If a lower-cost option performs better for your use case, we call it out directly.",
    },
    {
      title: "Setup and support continuity",
      detail:
        "Instrument setup, follow-up adjustment, and repair intake stay in one service flow.",
    },
    {
      title: "Fast logistics with clear handoff",
      detail:
        "Every shipped order includes setup notes and a confirmed service contact window.",
    },
  ],
  cta: {
    label: "See Verified Player Results",
    href: "#testimonials",
  },
  caseCard: {
    badge: "Real service case",
    productName: "Gibson Les Paul Standard 50s",
    status: "Configured and shipped in 48 hours",
    price: "$2,499",
    ratingLabel: "Customer confidence",
    ratingValue: "4.9 / 5.0",
    proofNotes: [
      "Action and intonation calibrated before dispatch.",
      "Pickup height tuned for clean headroom and gain staging.",
      "Post-delivery check-in completed after first rehearsal.",
    ],
    imageSrc: "/images/product/product-01.jpg",
    imageAlt: "Guitar prepared for stage and studio session",
  },
} as const;

export const testimonialsSectionData = {
  eyebrow: "Player feedback",
  title: "Reviews from musicians with real weekly gigs.",
  description:
    "Each note below came from customers after delivery, setup, or rehearsal usage, not from sponsored posts.",
  featuredLabel: "Featured session note",
} as const;

export const testimonialItems = [
  {
    featured: true,
    quote:
      "I ordered a Les Paul for a weekend studio date. It arrived in two days, intonation was dialed in, and we tracked the same night.",
    name: "Reza Kurniawan",
    initials: "RK",
    role: "Guitarist, Jakarta",
    gear: "Gibson Les Paul Standard",
    proof:
      "Delivery confirmed in 48 hours with action and intonation check sheet included.",
  },
  {
    featured: false,
    quote:
      "I came in for a louder rig and they pointed me to the DSL40 instead of a pricier stack. It solved my stage mix and cut cost.",
    name: "Sarah Tanuwijaya",
    initials: "ST",
    role: "Bassist, Bandung",
    gear: "Marshall DSL40CR Combo",
    proof:
      "Saved around $380 versus initial shortlist after room-size based recommendation.",
  },
  {
    featured: false,
    quote:
      "My Telecaster setup came back clean and stable. No fret buzz across rehearsal volume and the update notes were clear.",
    name: "Arya Pratama",
    initials: "AP",
    role: "Studio guitarist, Surabaya",
    gear: "Full setup service - Fender Telecaster",
    proof:
      "Turnaround completed in three days with before-after setup measurement report.",
  },
] as const;

export const newsletterData = {
  eyebrow: "Stock bulletin",
  title: "Get one useful stock brief every Friday.",
  description:
    "We send practical restock alerts, price shifts that matter, and setup notes from our service bench.",
  helperText: "One email per week. No promo blast. Unsubscribe anytime.",
  placeholder: "you@yourband.com",
  ctaLabel: "Send me the Friday brief",
  submittingLabel: "Saving your request...",
  successMessage:
    "You are on the list. Your first stock brief will arrive next Friday.",
  errorMessage:
    "Subscription service is not connected yet. Please try again in a moment.",
  invalidEmailMessage:
    "Enter a valid email so we can send the weekly stock brief.",
} as const;
