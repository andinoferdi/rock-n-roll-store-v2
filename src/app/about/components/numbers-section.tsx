import { aboutStats } from "@/app/about/data/about-content";

export default function NumbersSection() {
  return (
    <section className="border-b border-t border-[var(--landing-border)] bg-[var(--landing-bg-2)] py-12 sm:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aboutStats.map((stat, index) => (
            <article
              key={stat.label}
              data-aos="fade-up"
              data-aos-delay={index * 90}
              className="rounded-[8px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-4 sm:p-5"
            >
              <p className="text-[2.45rem] leading-none text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
                {stat.value}
                {stat.accent ? <span className="text-[var(--landing-blue)]">{stat.accent}</span> : null}
              </p>
              <p className="mt-2 text-[0.95rem] text-[var(--landing-text-muted)]">{stat.label}</p>
              <p className="mt-1 text-[0.7rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                {stat.sublabel}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
