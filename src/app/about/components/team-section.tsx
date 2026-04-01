import { aboutTeam } from "@/app/about/data/about-content";

export default function TeamSection() {
  return (
    <section className="border-t border-[var(--landing-border)] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,430px)] lg:items-end">
          <div data-aos="fade-up">
            <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
              The People
            </p>
            <h2 className="mt-2 text-[clamp(1.9rem,7.2vw,3rem)] leading-[0.95] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
              Who&apos;s Behind the Counter
            </h2>
          </div>
          <p data-aos="fade-up" data-aos-delay="90" className="text-[0.95rem] leading-[1.7] text-[var(--landing-text-muted)]">
            We keep the team intentionally small. Everyone here has a second life as an active musician.
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {aboutTeam.map((member, index) => (
            <article
              key={member.name}
              data-aos="fade-up"
              data-aos-delay={130 + index * 80}
              className="rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-5"
            >
              <p className="text-[0.72rem] tracking-[0.1em] uppercase text-[var(--landing-blue-light)] [font-family:var(--font-barlow-condensed)]">
                {member.role}
              </p>
              <h3 className="mt-1 text-[1.25rem] leading-[1.3] text-[var(--landing-text)]">{member.name}</h3>
              <p className="mt-2 text-[0.94rem] leading-[1.68] text-[var(--landing-text-muted)]">{member.bio}</p>
              <p className="mt-3 text-[0.72rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                {member.instrument}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
