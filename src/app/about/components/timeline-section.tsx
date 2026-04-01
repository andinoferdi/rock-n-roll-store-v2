import { aboutTimeline } from "@/app/about/data/about-content";

export default function TimelineSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">
        <p
          data-aos="fade-up"
          className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]"
        >
          16 Years
        </p>
        <h2
          data-aos="fade-up"
          data-aos-delay="70"
          className="mt-2 text-[clamp(1.9rem,7.2vw,3rem)] leading-[0.95] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]"
        >
          The Story,
          <span className="text-[var(--landing-blue)]"> Year by Year</span>
        </h2>

        <div data-aos="fade-up" data-aos-delay="120" className="about-timeline-track mt-12">
          <div className="about-timeline-spine">
            <div className="about-timeline-spine-fill" />
          </div>
          <div className="grid grid-cols-2 gap-x-0 gap-y-8 md:grid-cols-3 min-[1025px]:grid-cols-6">
            {aboutTimeline.map((item, index) => (
              <article key={item.year} data-aos="fade-up" data-aos-delay={160 + index * 55} className="about-timeline-item pr-4">
                <span className={`about-timeline-dot ${item.milestone ? "about-timeline-dot-milestone" : ""}`} />
                <p className={`about-timeline-year ${item.milestone ? "about-timeline-year-milestone" : ""}`}>{item.year}</p>
                <p className={`about-timeline-event ${item.milestone ? "about-timeline-event-milestone" : ""}`}>{item.event}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
