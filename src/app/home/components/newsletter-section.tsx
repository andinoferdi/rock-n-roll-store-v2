import { newsletterData } from "@/app/home/data/storefront";

const primaryButtonClass =
  "inline-flex h-12 items-center justify-center gap-2 rounded-[4px] border border-transparent bg-[var(--landing-blue)] px-7 text-[1.08rem] font-semibold tracking-[0.04em] text-white transition-all duration-200 hover:bg-[var(--landing-blue-light)] hover:shadow-[0_3px_10px_var(--landing-blue-glow)] [font-family:var(--font-barlow-condensed)]";

export default function NewsletterSection() {
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div
          data-reveal
          className="relative flex items-center justify-between gap-12 overflow-hidden rounded-[12px] border border-[var(--landing-border)] bg-[var(--landing-card)] px-16 py-16 shadow-[var(--landing-shadow-card)] max-[600px]:flex-col max-[600px]:gap-7 max-[600px]:px-7 max-[600px]:py-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(26,95,255,0.03)_0%,transparent_58%)]" />

          <div className="relative z-10 max-w-[440px] max-[600px]:max-w-none">
            <h3 className="mb-2 text-[2.25rem] leading-[1.1] tracking-[0.02em] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
              {newsletterData.title}
            </h3>
            <p className="text-[1rem] leading-[1.6] text-[var(--landing-text-muted)]">{newsletterData.description}</p>
          </div>

          <div className="relative z-10 flex min-w-0 flex-1 gap-2.5 max-[600px]:w-full max-[600px]:flex-col max-[600px]:items-stretch">
            <input
              type="email"
              className="h-12 min-w-[240px] flex-1 rounded-[4px] border border-[var(--landing-border)] bg-[var(--landing-bg-2)] px-4 text-[1rem] text-[var(--landing-text)] outline-none transition-colors duration-200 placeholder:text-[var(--landing-text-subtle)] focus:border-[var(--landing-blue)] max-[600px]:min-w-0 max-[600px]:w-full"
              placeholder="Your email address"
              aria-label="Email address"
            />
            <button type="button" className={`${primaryButtonClass} min-h-12 whitespace-nowrap max-[600px]:w-full`}>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
