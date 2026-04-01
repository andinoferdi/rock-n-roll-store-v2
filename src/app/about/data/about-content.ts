export type AboutHeaderContent = {
  eyebrow: string;
  titleTop: string;
  titleAccent: string;
  description: string;
  foundedYear: string;
  foundedLocation: string;
  quote: string;
  founders: string;
};

export type AboutStatItem = {
  value: string;
  accent?: string;
  label: string;
  sublabel: string;
};

export type AboutValueItem = {
  id: string;
  heading: string;
  body: string;
};

export type AboutTimelineItem = {
  year: string;
  event: string;
  milestone?: boolean;
};

export type AboutTeamMember = {
  name: string;
  role: string;
  instrument: string;
  bio: string;
};

export type AboutPressQuote = {
  quote: string;
  source: string;
};

export const aboutHeaderContent: AboutHeaderContent = {
  eyebrow: "About",
  titleTop: "We Are",
  titleAccent: "Musicians.",
  description:
    "Not a warehouse, not a chain. A shop opened in 2009 by two guitarists who were tired of buying gear from people who had never played a gig in their lives.",
  foundedYear: "2009",
  foundedLocation: "Brooklyn, New York",
  quote: "We built the store we always wanted to shop at. Everything else followed from that.",
  founders: "Marcus Webb and Yuki Tanaka, Founders",
};

export const editorialContent = {
  number: "01",
  headingTop: "Gear advice from people",
  headingBottom: "who actually play the stuff.",
  left: [
    "Every person on our floor plays an instrument. Some play multiple. Before you get a recommendation here, whoever helps you has probably owned, gigged, broken, and repaired something similar.",
    "That is not a marketing line. It is a hiring policy. We do not bring on floor staff who cannot explain why tube amps and solid-state react differently, or why nut width matters for fingerstyle players.",
  ],
  right: [
    "We carry 120+ brands not because we want the largest catalog, but because those are the brands that showed up when we needed them on stage, in studio rooms, and during late rehearsal blocks.",
    "If we would not play it ourselves, it does not go on the floor. That standard has cost us vendor deals over the years, and we are still comfortable with that tradeoff.",
  ],
} as const;

export const aboutStats: AboutStatItem[] = [
  {
    value: "16",
    accent: "+",
    label: "Years in business",
    sublabel: "Est. 2009 - Brooklyn, NY",
  },
  {
    value: "120",
    accent: "+",
    label: "Brands we carry",
    sublabel: "All played by staff",
  },
  {
    value: "48",
    accent: "k",
    label: "Orders shipped",
    sublabel: "98.4% on-time delivery",
  },
  {
    value: "4.9",
    accent: "/5",
    label: "Average customer rating",
    sublabel: "Across 12,400 reviews",
  },
];

export const originContent = {
  eyebrow: "Our Story",
  titleTop: "Started With a Strat",
  titleBottom: "and a Bad Landlord",
  paragraphs: [
    "Marcus Webb and Yuki Tanaka met at a session in Bushwick in 2007. Marcus played lead guitar in three bands simultaneously. Yuki built her own effects pedals and toured with a jazz quartet.",
    "Neither of them planned to open a store. But every time they needed specific gear, they ended up driving to multiple shops and still left empty-handed or oversold into something they did not need.",
    "In 2009, when a small storefront on Nostrand Avenue became available, they took it on a handshake and a shared credit card. The first month inventory was 40 guitars, two amps, and a wall of pedals that Yuki personally tested.",
    "Fifteen years later: same neighborhood, 8,000+ products, 18 staff, and still the same policy. If it is on the floor, someone here has played it.",
  ],
  ctaLabel: "Browse the Current Inventory",
  ctaHref: "/products",
} as const;

export const aboutValues: AboutValueItem[] = [
  {
    id: "01",
    heading: "No salesperson who cannot play.",
    body: "When someone asks for a serious first-year instrument, advice quality changes outcomes. Every floor hire plays at gigging level in at least one instrument. That bar stays fixed.",
  },
  {
    id: "02",
    heading: "If we would not gig it, we do not sell it.",
    body: "Every brand is played by at least two staff members before it reaches the floor. Some good-looking brands never pass real-use checks. Margin is not the first filter.",
  },
  {
    id: "03",
    heading: "Setup is part of the sale.",
    body: "Each guitar shipment gets setup work before dispatch. Intonation, action, and relief are checked by a real technician, not replaced by a generic inspection sticker.",
  },
  {
    id: "04",
    heading: "Trade-ins are priced honestly.",
    body: "We explain valuation logic openly and avoid lowball pricing for quick flips. Long-term trust is treated as higher value than one-transaction margin.",
  },
];

export const aboutTimeline: AboutTimelineItem[] = [
  {
    year: "2009",
    event: "Doors open at 147 Nostrand Ave. 40 guitars, 2 amps, Yuki's pedal wall.",
    milestone: true,
  },
  {
    year: "2011",
    event: "First repair bench. Hired Leo, a luthier from Flushing who still works here.",
  },
  {
    year: "2013",
    event: "Expanded to 3,000 sq ft. Added the drum room. Survived a flood in August.",
    milestone: true,
  },
  {
    year: "2016",
    event: "Online store launch. First order shipped to Portland - a Taylor 814ce.",
  },
  {
    year: "2020",
    event: "Survived closure during the pandemic. Curbside only for 4 months. Zero layoffs.",
    milestone: true,
  },
  {
    year: "2025",
    event: "8,000+ SKUs, 18 staff, 120+ brands. Same landlord, new lease signed.",
    milestone: true,
  },
];

export const aboutTeam: AboutTeamMember[] = [
  {
    name: "Marcus Webb",
    role: "Co-Founder",
    instrument: "Electric Guitar - Pedals",
    bio: "Lead guitarist in multiple touring projects from 2004 to 2018. Now leads buying decisions for the guitar floor.",
  },
  {
    name: "Yuki Tanaka",
    role: "Co-Founder",
    instrument: "Keys - Bass - Effects",
    bio: "Jazz bassist and keys player who personally tests major effects categories before they are approved for retail floor placement.",
  },
  {
    name: "Leo Fontaine",
    role: "Head Luthier",
    instrument: "Classical Guitar - Setup",
    bio: "Handles instrument setup and repair workflows end-to-end and sets technical QA standards for shipped string instruments.",
  },
  {
    name: "Priya Nair",
    role: "Drums and Studio",
    instrument: "Drums - Recording Gear",
    bio: "Session drummer in the Brooklyn circuit who leads drum room demos and recording chain recommendations.",
  },
];

export const aboutStoreContent = {
  eyebrow: "Find Us",
  titleTop: "Come In.",
  titleBottom: "Play Something.",
  description: [
    "The floor is set up to be played, not just displayed. Every amp is connected at realistic volume, and every guitar is tuned before demo sessions.",
    "If you want quiet space to evaluate gear, we give you room. If you want technical discussion, we go deep with practical recommendations.",
  ],
  locationLabel: "Location",
  location: ["147 Nostrand Avenue", "Brooklyn, New York 11216", "(718) 555-0192"],
  hours: [
    { day: "Mon - Fri", time: "10am - 8pm", highlight: true },
    { day: "Saturday", time: "9am - 9pm" },
    { day: "Sunday", time: "11am - 6pm" },
    { day: "Holidays", time: "Check website" },
  ],
} as const;

export const aboutPressQuotes: AboutPressQuote[] = [
  {
    quote:
      "The best independent instrument shop in the five boroughs. The staff knows what they are talking about, which is rarer than it should be.",
    source: "Brooklyn Magazine",
  },
  {
    quote:
      "I have been buying guitars for thirty years. This is the first shop that warned me when I was about to make a bad decision.",
    source: "Customer Review",
  },
  {
    quote:
      "A shop that treats gear like craft. The repair bench alone is worth the trip.",
    source: "Guitar World",
  },
];
