export type ProductBadge = "new" | "popular" | "sale" | "used";

export type StockStatus = "in_stock" | "low_stock" | "preorder";

export type ProductCatalogItem = {
  id: string;
  category: string;
  name: string;
  specs: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: ProductBadge;
  stockLabel: string;
  stockStatus: StockStatus;
  image: string;
};

export type FilterOption = {
  label: string;
  count: number;
  selected?: boolean;
};

export type FilterGroup = {
  id: string;
  title: string;
  type: "single" | "multi" | "range";
  options?: FilterOption[];
  range?: {
    min: number;
    max: number;
    selectedMin: number;
    selectedMax: number;
  };
};

export type ActiveFilterChip = {
  id: string;
  label: string;
};

export const productsPageHeader = {
  eyebrow: "Catalog",
  title: "All Gear",
  resultLabel: "8,240 products available",
  promoTag: "Free shipping over $100",
} as const;

export const productsCatalogMeta = {
  totalResults: 1840,
  initialVisibleCount: 9,
  loadMoreStep: 9,
} as const;

export const productsSortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "popular", label: "Most Popular" },
] as const;

export const initialActiveFilters: ActiveFilterChip[] = [
  { id: "category-electric", label: "Electric Guitars" },
  { id: "brand-fender", label: "Fender" },
  { id: "price-0-1500", label: "$0 - $1,500" },
];

export const catalogFilterGroups: FilterGroup[] = [
  {
    id: "category",
    title: "Category",
    type: "single",
    options: [
      { label: "All Instruments", count: 8240 },
      { label: "Electric Guitars", count: 1840, selected: true },
      { label: "Acoustic Guitars", count: 920 },
      { label: "Bass Guitars", count: 380 },
      { label: "Drums", count: 560 },
      { label: "Keyboards", count: 430 },
      { label: "Amplifiers", count: 740 },
      { label: "Effects", count: 1120 },
      { label: "Recording", count: 850 },
    ],
  },
  {
    id: "price",
    title: "Price Range",
    type: "range",
    range: {
      min: 0,
      max: 5000,
      selectedMin: 0,
      selectedMax: 1500,
    },
  },
  {
    id: "brand",
    title: "Brand",
    type: "multi",
    options: [
      { label: "Fender", count: 342, selected: true },
      { label: "Gibson", count: 218, selected: true },
      { label: "Marshall", count: 180 },
      { label: "Taylor", count: 156 },
      { label: "Martin", count: 134 },
      { label: "Roland", count: 122 },
      { label: "Boss", count: 98 },
      { label: "Nord", count: 64 },
    ],
  },
  {
    id: "availability",
    title: "Availability",
    type: "multi",
    options: [
      { label: "In Stock", count: 6840, selected: true },
      { label: "Pre-order", count: 420 },
      { label: "Used / Open-box", count: 980 },
    ],
  },
  {
    id: "condition",
    title: "Condition",
    type: "multi",
    options: [
      { label: "New", count: 7040, selected: true },
      { label: "Excellent Used", count: 680 },
      { label: "Good Used", count: 300 },
      { label: "Refurbished", count: 220 },
    ],
  },
];

export const productCatalogItems: ProductCatalogItem[] = [
  {
    id: "fender-player-ii-strat-hss",
    category: "Electric Guitar",
    name: "Fender Player II Stratocaster HSS",
    specs: "Alder body - Maple neck - 22 frets - Tremolo bridge",
    price: 849,
    rating: 4.5,
    reviews: 184,
    badge: "new",
    stockLabel: "In stock",
    stockStatus: "in_stock",
    image: "/images/product/product-01.jpg",
  },
  {
    id: "gibson-les-paul-standard-50s",
    category: "Electric Guitar",
    name: "Gibson Les Paul Standard 50s",
    specs: "Mahogany body - Burstbucker pickups - Tune-o-Matic bridge",
    price: 2499,
    rating: 5,
    reviews: 312,
    badge: "popular",
    stockLabel: "In stock",
    stockStatus: "in_stock",
    image: "/images/product/product-02.jpg",
  },
  {
    id: "prs-se-custom-24-08",
    category: "Electric Guitar",
    name: "PRS SE Custom 24-08",
    specs: "Mahogany body - Maple top - 85/15 S pickups - Wide Thin neck",
    price: 699,
    originalPrice: 849,
    rating: 4.5,
    reviews: 97,
    badge: "sale",
    stockLabel: "4 left",
    stockStatus: "low_stock",
    image: "/images/product/product-03.jpg",
  },
  {
    id: "fender-player-ii-telecaster",
    category: "Electric Guitar",
    name: "Fender Player II Telecaster",
    specs: "Alder body - 9.5 inch radius - 6-saddle bridge - Noiseless pickups",
    price: 879,
    rating: 5,
    reviews: 228,
    badge: "new",
    stockLabel: "In stock",
    stockStatus: "in_stock",
    image: "/images/product/product-04.jpg",
  },
  {
    id: "epiphone-sg-standard-61",
    category: "Electric Guitar",
    name: "Epiphone SG Standard 61",
    specs: "Mahogany body - ProBucker-2 and 3 humbuckers - LockTone bridge",
    price: 449,
    rating: 4,
    reviews: 144,
    stockLabel: "In stock",
    stockStatus: "in_stock",
    image: "/images/product/product-05.jpg",
  },
  {
    id: "squier-classic-vibe-50s-strat-used",
    category: "Electric Guitar - Used",
    name: "Squier Classic Vibe 50s Strat",
    specs: "Maple neck - Alnico V pickups - Excellent condition - 2022",
    price: 249,
    originalPrice: 379,
    rating: 4.5,
    reviews: 76,
    badge: "used",
    stockLabel: "2 left",
    stockStatus: "low_stock",
    image: "/images/cards/card-01.jpg",
  },
  {
    id: "gretsch-g2622-streamliner",
    category: "Electric Guitar",
    name: "Gretsch G2622 Streamliner Center Block",
    specs: "Semi-hollow - BroadTron BT-2S humbuckers - 12 inch radius",
    price: 549,
    rating: 5,
    reviews: 88,
    badge: "popular",
    stockLabel: "In stock",
    stockStatus: "in_stock",
    image: "/images/cards/card-02.jpg",
  },
  {
    id: "schecter-hellraiser-c1-fr",
    category: "Electric Guitar",
    name: "Schecter Hellraiser C-1 FR",
    specs: "Mahogany body - EMG 81 and 89 active - Floyd Rose - Ebony fretboard",
    price: 999,
    rating: 4.5,
    reviews: 112,
    stockLabel: "In stock",
    stockStatus: "in_stock",
    image: "/images/cards/card-03.jpg",
  },
  {
    id: "jackson-js22-dinky",
    category: "Electric Guitar",
    name: "Jackson JS22 Dinky Arch Top",
    specs: "Poplar body - Maple neck - 24 frets - Dual Jackson humbuckers",
    price: 249,
    rating: 4,
    reviews: 201,
    badge: "new",
    stockLabel: "Pre-order",
    stockStatus: "preorder",
    image: "/images/hero/hero-img.jpg",
  },
];