import { testimonialItems } from "@/app/home/data/storefront";

const StarIcon = () => (
  <svg className="h-[15px] w-[15px] text-[#f0a500]" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function TestimonialsSection() {
  return (
    <section className="bg-[var(--landing-bg)] py-24" id="testimonials">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div data-aos="fade-up">
          <p className="mb-3 text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
            What players say
          </p>
          <h2 className="text-[3rem] leading-[1] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
            Trusted by working musicians.
          </h2>
          <p className="mt-2.5 max-w-[560px] text-[1.125rem] leading-[1.6] text-[var(--landing-text-muted)]">
            Feedback from players who use this gear in rehearsals, recording sessions, and live sets.
          </p>
        </div>

        <div className="mt-13 grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {testimonialItems.map((testimonial, index) => (
            <div
              key={testimonial.name}
              data-aos="fade-up"
              data-aos-delay={Math.min(index, 2) * 100}
            >
              <div
                className={`flex h-full flex-col gap-4.5 rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-card)] px-6.5 py-7 transition-all duration-200 hover:-translate-y-[1px] hover:border-[var(--landing-border-strong)] ${
                  index === 1 ? "pt-6 pb-5.5" : ""
                }`}
              >
                <div className="flex gap-[3px]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <StarIcon key={`${testimonial.name}-${starIndex}`} />
                  ))}
                </div>
                <p className="flex-grow text-[15px] leading-[1.65] text-[var(--landing-text-muted)] italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-[var(--landing-border)] pt-3.5">
                  <div className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--landing-blue)_24%,transparent)] bg-[color-mix(in_oklab,var(--landing-blue)_10%,transparent)] text-[14px] font-bold text-[var(--landing-blue)] [font-family:var(--font-barlow-condensed)]">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="text-[0.875rem] font-semibold text-[var(--landing-text)]">{testimonial.name}</div>
                    <div className="mt-0.5 text-[0.75rem] text-[var(--landing-text-subtle)]">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
