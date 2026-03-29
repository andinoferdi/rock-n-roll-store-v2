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

export const brandItems = ["Fender", "Gibson", "Marshall", "Pearl", "Roland", "Boss", "Ibanez", "Nord"] as const;

export const storyData = {
  title: "Gear Advice Without the Sales Pitch",
  body: "We match gear to your setlist, room size, and budget first. If a lower-price option does the job better, we will say it clearly.",
  highlights: [
    "30-day returns with no hidden fees",
    "Price match on authorized dealers",
    "Free setup for guitar and bass purchases",
    "In-house repair bench with certified techs",
  ],
} as const;

export const testimonialItems = [
  {
    quote:
      "Ordered a Les Paul on Thursday and it arrived by Saturday in perfect condition. Setup was solid out of the box.",
    name: "Reza Kurniawan",
    initials: "RK",
    role: "Guitarist, Jakarta",
  },
  {
    quote:
      "The team recommended a better amp for my use case and saved me real money. Honest and practical advice.",
    name: "Sarah Tanuwijaya",
    initials: "ST",
    role: "Bassist, Bandung",
  },
  {
    quote:
      "My old Telecaster got a full setup and now plays like new. Fast service and clear communication.",
    name: "Arya Pratama",
    initials: "AP",
    role: "Studio guitarist, Surabaya",
  },
] as const;

export const newsletterData = {
  title: "Stay Updated on New Stock",
  description: "Get weekly stock alerts, practical buying notes, and quick setup tips for real playing situations.",
} as const;
