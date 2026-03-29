import { categoryItems } from "@/app/home/data/storefront";
import type { ReactNode } from "react";

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CATEGORY_ICONS: Record<string, ReactNode> = {
  Guitars: (
    <svg width="180" height="180" viewBox="0 0 100 100" fill="currentColor" opacity="1">
      <path d="M65 10 L70 15 L55 30 C60 35 62 42 58 50 C56 54 52 57 47 57 C43 57 40 55 38 52 L35 49 C32 47 30 44 30 40 C30 35 33 31 37 29 C45 25 52 27 57 32 L65 10Z M42 35 C40 37 40 40 42 42 C44 44 47 44 49 42 C51 40 51 37 49 35 C47 33 44 33 42 35Z" />
    </svg>
  ),
  Bass: (
    <svg width="180" height="180" viewBox="0 0 100 100" fill="currentColor">
      <path d="M60 8 L65 13 L50 28 C56 34 58 43 53 52 C50 57 45 60 39 60 C34 60 30 57 28 53 L26 50 C23 47 22 43 22 39 C22 33 25 28 30 26 C39 22 47 25 52 31 L60 8Z M34 34 C31 37 31 41 34 44 C37 47 41 47 44 44 C47 41 47 37 44 34 C41 31 37 31 34 34Z M22 62 L28 68 L70 92 L72 88 Z" />
    </svg>
  ),
  Drums: (
    <svg width="180" height="180" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="55" rx="35" ry="18" fill="none" stroke="currentColor" strokeWidth="5" />
      <ellipse cx="50" cy="45" rx="35" ry="18" />
      <rect x="15" y="44" width="70" height="11" />
      <ellipse cx="50" cy="45" rx="35" ry="18" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.5" />
      <line x1="30" y1="28" x2="22" y2="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="70" y1="28" x2="78" y2="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  Keyboards: (
    <svg width="180" height="180" viewBox="0 0 100 100" fill="currentColor">
      <rect x="10" y="30" width="80" height="50" rx="4" />
      <rect x="14" y="30" width="10" height="30" fill="var(--landing-bg)" rx="2" opacity="0.8" />
      <rect x="28" y="30" width="10" height="30" fill="var(--landing-bg)" rx="2" opacity="0.8" />
      <rect x="42" y="30" width="10" height="30" fill="var(--landing-bg)" rx="2" opacity="0.8" />
      <rect x="56" y="30" width="10" height="30" fill="var(--landing-bg)" rx="2" opacity="0.8" />
      <rect x="70" y="30" width="10" height="30" fill="var(--landing-bg)" rx="2" opacity="0.8" />
      <rect x="22" y="30" width="7" height="19" rx="2" />
      <rect x="36" y="30" width="7" height="19" rx="2" />
      <rect x="57" y="30" width="7" height="19" rx="2" />
      <rect x="71" y="30" width="7" height="19" rx="2" />
    </svg>
  ),
};

export default function CategoriesSection() {
  return (
    <section className="py-24" id="categories">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mx-auto max-w-[720px] text-center" data-reveal>
          <p className="mb-3 text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
            Shop by Category
          </p>
          <h2 className="text-[3rem] leading-[1] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
            Find Your <span className="text-[var(--landing-blue)]">Instrument</span>
          </h2>
          <p className="mx-auto mt-2.5 max-w-[560px] text-[1.125rem] leading-[1.6] text-[var(--landing-text-muted)]">
            Pick by instrument type first, then compare specs and price range without digging through generic listings.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-3 grid-rows-2 gap-5 max-[900px]:grid-cols-2 max-[900px]:grid-rows-none">
          {categoryItems.map((category, index) => {
            const featuredCard = index === 0;
            const wideCard = index === 3;

            return (
              <div
                key={category.name}
                data-reveal
                style={{ transitionDelay: `${category.delayMs}ms` }}
                className={`group relative overflow-hidden rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-6 transition-all duration-200 hover:-translate-y-[1px] hover:border-[var(--landing-border-strong)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.14)] ${
                  featuredCard ? "row-span-2 min-h-[330px] max-[900px]:row-span-1 max-[900px]:min-h-[240px]" : "min-h-[150px]"
                } ${wideCard ? "col-span-2 max-[900px]:col-span-1" : ""}`}
              >
                <div className="pointer-events-none absolute -right-5 -top-5 text-[var(--landing-blue)] opacity-7 transition-[opacity,transform] duration-400 ease-out group-hover:translate-x-1 group-hover:opacity-10">
                  {CATEGORY_ICONS[category.name]}
                </div>

                <div className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-[4px] border border-[color-mix(in_oklab,var(--landing-blue)_24%,transparent)] bg-[color-mix(in_oklab,var(--landing-card)_86%,var(--landing-blue)_14%)] text-[var(--landing-blue-light)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <ArrowIcon />
                </div>

                <span className="relative mb-2 block text-[0.75rem] font-semibold tracking-[0.1em] uppercase text-[var(--landing-blue-light)] [font-family:var(--font-barlow-condensed)]">
                  {category.tag}
                </span>
                <div className="relative text-[1.75rem] leading-[1] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
                  {category.name}
                </div>
                <div className="relative mt-1.5 text-[0.875rem] text-[var(--landing-text-subtle)]">
                  {category.count}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
