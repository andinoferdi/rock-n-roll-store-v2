import { originContent } from "@/app/about/data/about-content";
import Link from "next/link";

const primaryButtonClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-[4px] border border-transparent bg-[var(--landing-blue)] px-6 text-[1rem] font-semibold tracking-[0.04em] text-white transition-all duration-200 hover:bg-[var(--landing-blue-light)] hover:shadow-[0_3px_10px_var(--landing-blue-glow)] [font-family:var(--font-barlow-condensed)]";

export default function OriginSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-5 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div
          data-aos="fade-right"
          className="relative overflow-hidden rounded-[12px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-6 sm:p-7"
        >
          <div className="pointer-events-none absolute inset-0 [background-size:36px_36px] [background-image:linear-gradient(to_right,var(--landing-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--landing-grid)_1px,transparent_1px)] opacity-30" />
          <div className="relative">
            <p className="text-[0.72rem] tracking-[0.12em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
              147 Nostrand Ave
            </p>
            <p className="mt-2 text-[2.6rem] leading-none text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
              ROCK N&apos; ROLL
              <br />
              STORE
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-[8px] border border-[var(--landing-border)] bg-[var(--landing-bg-2)] p-3">
                <p className="text-[1.6rem] leading-none text-[var(--landing-blue)] [font-family:var(--font-bebas-neue)]">40</p>
                <p className="mt-1 text-[0.75rem] text-[var(--landing-text-muted)]">First-month guitars</p>
              </div>
              <div className="rounded-[8px] border border-[var(--landing-border)] bg-[var(--landing-bg-2)] p-3">
                <p className="text-[1.6rem] leading-none text-[var(--landing-blue)] [font-family:var(--font-bebas-neue)]">2009</p>
                <p className="mt-1 text-[0.75rem] text-[var(--landing-text-muted)]">Opening year</p>
              </div>
            </div>
          </div>
        </div>

        <div data-aos="fade-left" data-aos-delay="80">
          <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
            {originContent.eyebrow}
          </p>
          <h2 className="mt-2 text-[clamp(2rem,7.5vw,3.2rem)] leading-[0.95] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
            {originContent.titleTop}
            <br />
            <span className="text-[var(--landing-blue)]">{originContent.titleBottom}</span>
          </h2>
          <div className="mt-4 space-y-3">
            {originContent.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                data-aos="fade-up"
                data-aos-delay={110 + index * 55}
                className="text-[0.98rem] leading-[1.7] text-[var(--landing-text-muted)]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <Link href={originContent.ctaHref} data-aos="fade-up" data-aos-delay="300" className={`${primaryButtonClass} mt-6`}>
            {originContent.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
