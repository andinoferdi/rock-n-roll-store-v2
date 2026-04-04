import {
  testimonialItems,
  testimonialsSectionData,
} from "@/app/home/data/storefront";
import TestimonialsMarquee from "@/components/ui/testimonials-marquee";

const StarIcon = () => (
  <svg
    className="h-[14px] w-[14px] text-[var(--color-warning-500)]"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function TestimonialsSection() {
  const featuredTestimonial =
    testimonialItems.find((item) => item.featured) ?? testimonialItems[0];
  const supportingTestimonials = testimonialItems.filter(
    (item) => item.name !== featuredTestimonial.name,
  );
  const marqueeItems = supportingTestimonials.map((item) => ({
    quote: item.quote,
    name: item.name,
    title: `${item.role} - ${item.proof}`,
  }));

  return (
    <section className="bg-[var(--landing-bg)] py-16 sm:py-20 lg:py-24" id="testimonials">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">
        <div data-aos="fade-up" className="max-w-[760px]">
          <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
            {testimonialsSectionData.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(2rem,7.8vw,3.15rem)] leading-[0.95] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
            {testimonialsSectionData.title}
          </h2>
          <p className="mt-3 max-w-[60ch] text-[1rem] leading-[1.65] text-[var(--landing-text-muted)]">
            {testimonialsSectionData.description}
          </p>
        </div>

        <div className="mt-9 grid gap-4 lg:mt-11 lg:grid-cols-12 lg:items-start lg:gap-5">
          <article
            data-aos="fade-up"
            className="rounded-[12px] border border-[var(--landing-border-strong)] bg-[var(--landing-card)] px-5 py-5 sm:px-7 sm:py-7 lg:col-span-7"
          >
            <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--landing-blue-light)] [font-family:var(--font-barlow-condensed)]">
              {testimonialsSectionData.featuredLabel}
            </p>
            <div className="mt-3 flex gap-[3px]">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={`featured-star-${index}`} />
              ))}
            </div>
            <p className="mt-4 text-[1.08rem] leading-[1.72] text-[var(--landing-text-muted)]">
              &ldquo;{featuredTestimonial.quote}&rdquo;
            </p>
            <div className="mt-5 grid gap-3 rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-bg-2)] p-4 sm:grid-cols-2">
              <div>
                <p className="text-[0.68rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                  Gear used
                </p>
                <p className="mt-1 text-[0.92rem] leading-[1.55] text-[var(--landing-text)]">
                  {featuredTestimonial.gear}
                </p>
              </div>
              <div>
                <p className="text-[0.68rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                  Outcome
                </p>
                <p className="mt-1 text-[0.92rem] leading-[1.55] text-[var(--landing-text)]">
                  {featuredTestimonial.proof}
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3 border-t border-[var(--landing-border)] pt-4">
              <div className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[var(--landing-border-strong)] bg-[var(--landing-blue-soft)] text-[14px] font-bold text-[var(--landing-blue-light)] [font-family:var(--font-barlow-condensed)]">
                {featuredTestimonial.initials}
              </div>
              <div>
                <p className="text-[0.95rem] font-semibold text-[var(--landing-text)]">
                  {featuredTestimonial.name}
                </p>
                <p className="mt-0.5 text-[0.78rem] text-[var(--landing-text-subtle)]">
                  {featuredTestimonial.role}
                </p>
              </div>
            </div>
          </article>

          <div className="lg:col-span-5" data-aos="fade-up" data-aos-delay="90">
            <TestimonialsMarquee
              items={marqueeItems}
              speed="slow"
              direction="left"
              pauseOnHover
              className="rounded-[12px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
