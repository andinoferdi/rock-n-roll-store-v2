import { brandItems } from "@/app/home/data/storefront";

export default function BrandsSection() {
  return (
    <section className="py-14">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <p className="mb-7 text-center text-[0.75rem] font-semibold tracking-[0.14em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
          Authorized dealer for
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 max-[600px]:gap-6">
          {brandItems.map((brand) => (
            <span
              key={brand}
              className="text-[1.75rem] tracking-[0.08em] text-[var(--landing-text-subtle)] transition-colors duration-200 hover:text-[var(--landing-text-muted)] [font-family:var(--font-bebas-neue)]"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
