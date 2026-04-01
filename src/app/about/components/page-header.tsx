import { aboutHeaderContent } from "@/app/about/data/about-content";
import AboutParallaxScene from "@/app/about/components/about-parallax-scene";
import Link from "next/link";

export default function AboutPageHeader() {
  return (
    <header className="relative overflow-hidden border-b border-[var(--landing-border)] bg-[var(--landing-bg)] pb-14 pt-[calc(72px+3.25rem)] sm:pb-16 sm:pt-[calc(72px+4rem)]">
      <div className="pointer-events-none absolute inset-0 opacity-55">
        <AboutParallaxScene variant="header" />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6">
        <nav
          aria-label="Breadcrumb"
          data-aos="fade-up"
          className="mb-6 flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]"
        >
          <Link href="/" className="transition-colors duration-150 hover:text-[var(--landing-blue-light)]">
            Home
          </Link>
          <span aria-hidden="true" className="opacity-55">
            /
          </span>
          <span className="text-[var(--landing-text-muted)]">{aboutHeaderContent.eyebrow}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-14">
          <div data-aos="fade-up" data-aos-delay="80">
            <h1 className="text-[clamp(2.8rem,9.5vw,5.3rem)] leading-[0.93] tracking-[0.015em] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
              {aboutHeaderContent.titleTop}
              <br />
              <span className="text-[var(--landing-blue)]">{aboutHeaderContent.titleAccent}</span>
            </h1>
            <p className="mt-4 max-w-[62ch] text-[1rem] leading-[1.72] text-[var(--landing-text-muted)]">
              {aboutHeaderContent.description}
            </p>
          </div>

          <aside
            data-aos="fade-up"
            data-aos-delay="170"
            className="space-y-4 rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-4 sm:p-5"
          >
            <div className="flex items-end gap-2 border-b border-[var(--landing-border)] pb-3">
              <p className="text-[2.75rem] leading-none text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
                {aboutHeaderContent.foundedYear}
              </p>
              <p className="pb-1 text-[0.72rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                {aboutHeaderContent.foundedLocation}
              </p>
            </div>
            <p className="text-[0.92rem] italic leading-[1.68] text-[var(--landing-text-muted)]">
              &ldquo;{aboutHeaderContent.quote}&rdquo;
            </p>
            <p className="text-[0.72rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
              {aboutHeaderContent.founders}
            </p>
          </aside>
        </div>
      </div>
    </header>
  );
}
