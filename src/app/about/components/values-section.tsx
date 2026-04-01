import { aboutValues } from "@/app/about/data/about-content";

export default function ValuesSection() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--landing-border)] bg-[var(--landing-bg-2)] py-16 sm:py-20">
      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6">
        <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end">
          <div data-aos="fade-up">
            <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
              What We Stand For
            </p>
            <h2 className="mt-2 text-[clamp(1.9rem,7.5vw,3rem)] leading-[0.95] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
              Four things
              <br />
              <span className="text-[var(--landing-blue)]">we will not negotiate.</span>
            </h2>
          </div>
          <p data-aos="fade-up" data-aos-delay="90" className="text-[0.95rem] leading-[1.7] text-[var(--landing-text-muted)]">
            Most stores say they care about quality. We define it as decision discipline in daily operations, not just messaging.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {aboutValues.map((value, index) => (
            <article
              key={value.id}
              data-aos="fade-up"
              data-aos-delay={130 + index * 75}
              className="rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-5"
            >
              <p className="text-[0.82rem] tracking-[0.1em] uppercase text-[var(--landing-blue-light)] [font-family:var(--font-barlow-condensed)]">
                {value.id}
              </p>
              <h3 className="mt-2 text-[1.2rem] leading-[1.35] text-[var(--landing-text)]">{value.heading}</h3>
              <p className="mt-2 text-[0.94rem] leading-[1.68] text-[var(--landing-text-muted)]">{value.body}</p>
              <div className="mt-4 h-px bg-[var(--landing-border-strong)]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
