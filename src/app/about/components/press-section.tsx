import { aboutPressQuotes } from "@/app/about/data/about-content";

export default function PressSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">
        <p
          data-aos="fade-up"
          className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]"
        >
          What People Have Said
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {aboutPressQuotes.map((item, index) => (
            <article
              key={item.source}
              data-aos="fade-up"
              data-aos-delay={70 + index * 85}
              className="rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-5"
            >
              <p className="text-[0.94rem] italic leading-[1.7] text-[var(--landing-text-muted)]">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-4 text-[0.72rem] tracking-[0.1em] uppercase text-[var(--landing-blue-light)] [font-family:var(--font-barlow-condensed)]">
                {item.source}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
