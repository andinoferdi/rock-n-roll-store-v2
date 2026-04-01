import { editorialContent } from "@/app/about/data/about-content";

export default function EditorialOpenerSection() {
  return (
    <section className="border-b border-[var(--landing-border)] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">
        <div
          data-aos="fade-up"
          className="about-editorial-line mb-8 h-px w-full bg-[color-mix(in_oklab,var(--landing-blue)_35%,transparent)]"
        />
        <div className="grid gap-6 sm:grid-cols-[80px_1fr] sm:gap-8">
          <p
            data-aos="fade-up"
            className="text-[4rem] leading-none text-[var(--landing-blue)] opacity-20 [font-family:var(--font-bebas-neue)] sm:text-[5rem]"
          >
            {editorialContent.number}
          </p>
          <div>
            <h2
              data-aos="fade-up"
              data-aos-delay="70"
              className="text-[clamp(1.8rem,6vw,3.25rem)] leading-[1.03] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]"
            >
              {editorialContent.headingTop}
              <br />
              <span className="text-[var(--landing-blue)]">{editorialContent.headingBottom}</span>
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="space-y-3">
                {editorialContent.left.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    data-aos="fade-up"
                    data-aos-delay={120 + index * 55}
                    className="text-[0.98rem] leading-[1.7] text-[var(--landing-text-muted)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="space-y-3">
                {editorialContent.right.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    data-aos="fade-up"
                    data-aos-delay={180 + index * 55}
                    className="text-[0.98rem] leading-[1.7] text-[var(--landing-text-muted)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
