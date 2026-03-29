import { storyData } from "@/app/home/data/storefront";

const CheckIcon = () => (
  <svg className="h-5 w-5 shrink-0 text-[var(--landing-blue)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const primaryButtonClass =
  "inline-flex h-12 items-center justify-center gap-2 rounded-[4px] border border-transparent bg-[var(--landing-blue)] px-7 text-[1.08rem] font-semibold tracking-[0.04em] text-white transition-all duration-200 hover:bg-[var(--landing-blue-light)] hover:shadow-[0_3px_10px_var(--landing-blue-glow)] [font-family:var(--font-barlow-condensed)]";

export default function StorySection() {
  return (
    <section className="py-24" id="story">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="grid grid-cols-2 items-center gap-20 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <div data-reveal>
            <p className="mb-3 text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
              Our Approach
            </p>
            <h2 className="mb-5 text-[3rem] leading-[1] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
              {storyData.title}
            </h2>
            <p className="mb-7 text-[1.125rem] leading-[1.7] text-[var(--landing-text-muted)]">{storyData.body}</p>

            <div className="mb-9 flex flex-col gap-3.5">
              {storyData.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-[1rem] leading-[1.5] text-[var(--landing-text-muted)]">{highlight}</span>
                </div>
              ))}
            </div>

            <a href="#testimonials" className={primaryButtonClass}>
              Read Our Store Approach
            </a>
          </div>

          <div data-reveal style={{ transitionDelay: "100ms" }} className="relative">
            <div className="relative overflow-hidden rounded-[12px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-8">
              <div className="relative mb-6 flex h-[220px] items-center justify-center overflow-hidden rounded-[10px] bg-[var(--landing-bg-3)] text-[var(--landing-text-subtle)]">
                <svg className="h-[120px] w-[120px] text-[var(--landing-blue)] opacity-[0.18]" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M65 10L70 15L55 30C60 35 62 42 58 50C56 54 52 57 47 57C43 57 40 55 38 52L35 49C32 47 30 44 30 40C30 35 33 31 37 29C45 25 52 27 57 32L65 10Z M42 35C40 37 40 40 42 42C44 44 47 44 49 42C51 40 51 37 49 35C47 33 44 33 42 35Z" />
                </svg>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[1.375rem] font-bold tracking-[0.02em] text-[var(--landing-text)] [font-family:var(--font-barlow-condensed)]">
                    Gibson Les Paul Standard
                  </div>
                  <div className="mt-0.5 text-[0.875rem] text-[var(--landing-text-subtle)]">In stock - Ships in 2 days</div>
                </div>
                <div className="text-[2.25rem] tracking-[0.02em] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">$2,499</div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-6 flex items-center gap-3 rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-card)] px-4.5 py-3.5 shadow-[0_3px_12px_rgba(0,0,0,0.16)]">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--landing-blue)_25%,transparent)] bg-[color-mix(in_oklab,var(--landing-blue)_12%,transparent)] text-[var(--landing-blue-light)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <div>
                <div className="text-[0.75rem] tracking-[0.08em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                  Customer Rating
                </div>
                <div className="text-[1.2rem] tracking-[0.04em] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">4.9 / 5.0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
