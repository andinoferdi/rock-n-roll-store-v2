import { heroData } from "@/app/home/data/storefront";
import GridBackgroundDemo from "@/components/grid-background-demo";

const primaryButtonClass =
  "inline-flex h-12 items-center justify-center gap-2 rounded-[4px] border border-transparent bg-[var(--landing-blue)] px-7 text-[1.08rem] font-semibold tracking-[0.04em] text-white transition-all duration-200 hover:bg-[var(--landing-blue-light)] hover:shadow-[0_3px_10px_var(--landing-blue-glow)] [font-family:var(--font-barlow-condensed)]";

const secondaryButtonClass =
  "inline-flex h-12 items-center justify-center gap-2 rounded-[4px] border border-[var(--landing-border)] bg-transparent px-7 text-[1.08rem] font-semibold tracking-[0.04em] text-[var(--landing-text-muted)] transition-colors duration-200 hover:border-[var(--landing-border)] hover:text-[var(--landing-text)] [font-family:var(--font-barlow-condensed)]";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-[var(--landing-bg)] pb-18 pt-[calc(72px+6rem)]"
      id="hero"
    >
      <div className="pointer-events-none absolute inset-0">
        <GridBackgroundDemo className="h-full w-full" showLabel={false} />
        <div className="absolute left-1/2 top-[42%] h-[560px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--landing-blue-soft-strong)_0%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-6">
        <div className="mx-auto max-w-[980px] text-center" data-aos="fade-up">
          <div className="mb-7 inline-flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-[3px] border border-[var(--landing-blue-soft-border)] bg-[var(--landing-blue-soft)] px-2.5 py-1 text-[0.75rem] font-semibold tracking-[0.1em] uppercase text-[var(--landing-tag-text)] [font-family:var(--font-barlow-condensed)]">
              {heroData.tag}
            </span>
          </div>

          <h1 className="text-[clamp(4.7rem,15vw,9rem)] leading-[0.87] tracking-[0.02em] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
            {heroData.titleTop}
            <br />
            <span className="text-[var(--landing-blue)]">{heroData.titleAccent}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[560px] text-[1.125rem] leading-[1.6] text-[var(--landing-text-muted)]">
            {heroData.subtitle}
          </p>

          <div className="mt-9 flex items-center justify-center gap-3.5 max-[600px]:flex-col">
            <a href="#products" className={primaryButtonClass}>
              Browse All Gear
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="#categories" className={secondaryButtonClass}>
              See Categories
            </a>
          </div>

          <div className="mx-auto mt-14 flex max-w-[780px] items-start justify-center gap-10 pt-9 max-[720px]:flex-wrap max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-4">
            {heroData.stats.map((stat, index) => (
              <div key={stat.label} className="contents">
                <div className="flex flex-col items-start gap-1.5 max-[720px]:items-center max-[600px]:items-start">
                  <span className="text-[2.25rem] leading-none text-[var(--landing-text)] [font-family:var(--font-bebas-neue)] tracking-[0.03em]">
                    {stat.value}
                  </span>
                  <span className="text-[0.75rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                    {stat.label}
                  </span>
                </div>
                {index < heroData.stats.length - 1 ? (
                  <span className="h-9 w-px bg-[var(--landing-border)] max-[600px]:hidden" aria-hidden="true" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
