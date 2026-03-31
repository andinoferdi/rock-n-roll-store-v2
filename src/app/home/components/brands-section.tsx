import { brandItems, brandsSectionData } from "@/app/home/data/storefront";
import { cn } from "@/lib/utils";

export default function BrandsSection() {
  return (
    <section className="py-16 sm:py-20" id="brands">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">
        <div
          data-aos="fade-up"
          className="rounded-[12px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-5 sm:p-7 lg:grid lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-8"
        >
          <div className="border-b border-[var(--landing-border)] pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
            <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
              {brandsSectionData.eyebrow}
            </p>
            <h2 className="mt-2.5 text-[clamp(1.9rem,7vw,2.8rem)] leading-[0.95] tracking-[0.02em] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
              {brandsSectionData.title}
            </h2>
            <p className="mt-3 max-w-[34ch] text-[0.95rem] leading-[1.65] text-[var(--landing-text-muted)]">
              {brandsSectionData.description}
            </p>
            <p className="mt-5 text-[0.7rem] tracking-[0.12em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
              {brandsSectionData.railLabel}
            </p>
          </div>

          <div className="pt-5 lg:pt-0">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {brandItems.map((brand, index) => (
                <article
                  key={brand.name}
                  data-aos="fade-up"
                  data-aos-delay={Math.min(index, 5) * 60}
                  className={cn(
                    "rounded-[8px] border border-[var(--landing-border)] bg-[var(--landing-bg)] px-3.5 py-3.5 transition-colors duration-200",
                    "hover:border-[var(--landing-border-strong)] hover:bg-[var(--landing-card-hover)]",
                    brand.emphasis === "anchor" &&
                      "border-[var(--landing-border-strong)] bg-[var(--landing-blue-soft)]",
                  )}
                >
                  <p
                    className={cn(
                      "text-[0.68rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]",
                      brand.emphasis === "anchor" && "text-[var(--landing-blue-light)]",
                    )}
                  >
                    {brand.category}
                  </p>
                  <p className="mt-1.5 text-[1.18rem] leading-none tracking-[0.08em] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
                    {brand.name}
                  </p>
                  <p className="mt-2 text-[0.8rem] leading-[1.55] text-[var(--landing-text-muted)]">
                    {brand.note}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
