import { productsPageHeader } from "@/app/products/data/catalog-data";
import ProductsHeaderParallax from "@/app/products/components/products-header-parallax";

export default function ProductsPageHeader() {
  return (
    <header className="relative overflow-hidden border-b border-[var(--landing-border)] bg-[var(--landing-bg)] pb-12 pt-[calc(72px+2.75rem)] sm:pb-14 sm:pt-[calc(72px+3.5rem)]">
      <div className="pointer-events-none absolute inset-0 opacity-55">
        <ProductsHeaderParallax />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6">
        <p
          data-aos="fade-up"
          className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]"
        >
          {productsPageHeader.eyebrow}
        </p>
        <h1
          data-aos="fade-up"
          data-aos-delay="80"
          className="mt-3 text-[clamp(2.35rem,8.5vw,4.1rem)] leading-[0.9] tracking-[0.02em] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]"
        >
          {productsPageHeader.title}
        </h1>

        <div data-aos="fade-up" data-aos-delay="140" className="mt-3.5 flex flex-wrap items-center gap-3">
          <p className="text-[0.95rem] text-[var(--landing-text-muted)]">
            <span className="font-semibold text-[var(--landing-text)]">{productsPageHeader.resultLabel}</span>
          </p>
          <span className="inline-flex rounded-[4px] border border-[var(--landing-blue-soft-border)] bg-[var(--landing-blue-soft)] px-2.5 py-1 text-[0.72rem] tracking-[0.1em] uppercase text-[var(--landing-blue-light)] [font-family:var(--font-barlow-condensed)]">
            {productsPageHeader.promoTag}
          </span>
        </div>
      </div>
    </header>
  );
}
