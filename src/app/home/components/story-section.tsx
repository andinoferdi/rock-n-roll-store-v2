import { storyData } from "@/app/home/data/storefront";
import Image from "next/image";

const CheckIcon = () => (
  <svg
    className="h-5 w-5 shrink-0 text-[var(--landing-blue)]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon = () => (
  <svg
    className="h-4 w-4 text-[var(--color-warning-500)]"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const primaryButtonClass =
  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-[4px] border border-transparent bg-[var(--landing-blue)] px-7 text-[1rem] font-semibold tracking-[0.04em] text-white transition-all duration-200 hover:bg-[var(--landing-blue-light)] hover:shadow-[var(--landing-shadow-card)] sm:w-auto [font-family:var(--font-barlow-condensed)]";

export default function StorySection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24" id="story">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div data-aos="fade-up" className="lg:col-span-6">
            <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
              {storyData.eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(2rem,8vw,3.3rem)] leading-[0.94] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
              {storyData.title}
            </h2>
            <p className="mt-4 max-w-[56ch] text-[1rem] leading-[1.72] text-[var(--landing-text-muted)]">
              {storyData.body}
            </p>

            <div className="mt-7 grid gap-3.5">
              {storyData.highlights.map((highlight) => (
                <article
                  key={highlight.title}
                  className="rounded-[8px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-3.5 sm:p-4"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckIcon />
                    <div>
                      <p className="text-[0.92rem] font-semibold text-[var(--landing-text)]">
                        {highlight.title}
                      </p>
                      <p className="mt-1 text-[0.86rem] leading-[1.55] text-[var(--landing-text-subtle)]">
                        {highlight.detail}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <a href={storyData.cta.href} className={`${primaryButtonClass} mt-7`}>
              {storyData.cta.label}
            </a>
          </div>

          <div data-aos="fade-up" data-aos-delay="120" className="lg:col-span-6 lg:pt-6">
            <article className="overflow-hidden rounded-[12px] border border-[var(--landing-border)] bg-[var(--landing-card)]">
              <div className="border-b border-[var(--landing-border)] px-4 py-3 sm:px-5">
                <p className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[var(--landing-blue-light)] [font-family:var(--font-barlow-condensed)]">
                  {storyData.caseCard.badge}
                </p>
              </div>

              <div className="p-4 sm:p-5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-bg-3)]">
                  <Image
                    src={storyData.caseCard.imageSrc}
                    alt={storyData.caseCard.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="text-[1.2rem] leading-[1.2] text-[var(--landing-text)] [font-family:var(--font-barlow-condensed)]">
                      {storyData.caseCard.productName}
                    </p>
                    <p className="mt-1 text-[0.85rem] leading-[1.55] text-[var(--landing-text-subtle)]">
                      {storyData.caseCard.status}
                    </p>
                  </div>
                  <p className="text-[2rem] leading-none text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
                    {storyData.caseCard.price}
                  </p>
                </div>

                <div className="mt-4 border-t border-[var(--landing-border)] pt-4">
                  <ul className="grid gap-2.5">
                    {storyData.caseCard.proofNotes.map((note) => (
                      <li key={note} className="flex items-start gap-2.5">
                        <span className="mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--landing-blue)]" />
                        <span className="text-[0.84rem] leading-[1.55] text-[var(--landing-text-muted)]">
                          {note}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 inline-flex items-center gap-2.5 rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-bg-2)] px-3.5 py-2.5">
                  <StarIcon />
                  <div>
                    <p className="text-[0.66rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                      {storyData.caseCard.ratingLabel}
                    </p>
                    <p className="text-[0.95rem] text-[var(--landing-text)] [font-family:var(--font-barlow-condensed)]">
                      {storyData.caseCard.ratingValue}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
