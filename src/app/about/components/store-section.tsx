"use client";

import { aboutStoreContent } from "@/app/about/data/about-content";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";

ensureGsapPlugins();

export default function StoreSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (shouldReduceMotion) {
        return;
      }

      const panel = sectionRef.current?.querySelector<HTMLElement>("[data-store-highlight]");
      const tiles = gsap.utils.toArray<HTMLElement>("[data-store-tile]");

      if (!panel) {
        return;
      }

      gsap.from(panel, {
        autoAlpha: 0,
        y: 28,
        duration: 0.78,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panel,
          start: "top 80%",
          once: true,
        },
      });

      if (tiles.length > 0) {
        gsap.from(tiles, {
          autoAlpha: 0,
          y: 18,
          duration: 0.58,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: panel,
            start: "top 72%",
            once: true,
          },
        });
      }

      gsap.to(panel, {
        yPercent: -3.5,
        ease: "none",
        scrollTrigger: {
          trigger: panel,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.42,
        },
      });
    },
    {
      scope: sectionRef,
      dependencies: [shouldReduceMotion],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="border-t border-[var(--landing-border)] bg-[var(--landing-bg-2)] py-16 sm:py-20"
    >
      <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:items-start">
        <div data-aos="fade-up">
          <p
            data-aos="fade-up"
            className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]"
          >
            {aboutStoreContent.eyebrow}
          </p>
          <h2
            data-aos="fade-up"
            data-aos-delay="70"
            className="mt-2 text-[clamp(1.9rem,7vw,3rem)] leading-[0.95] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]"
          >
            {aboutStoreContent.titleTop}
            <br />
            <span className="text-[var(--landing-blue)]">{aboutStoreContent.titleBottom}</span>
          </h2>

          <div className="mt-4 space-y-3">
            {aboutStoreContent.description.map((paragraph, index) => (
              <p
                key={paragraph}
                data-aos="fade-up"
                data-aos-delay={120 + index * 55}
                className="text-[0.95rem] leading-[1.7] text-[var(--landing-text-muted)]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="220"
            className="mt-5 rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-4"
          >
            <p className="text-[0.72rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
              {aboutStoreContent.locationLabel}
            </p>
            <p className="mt-2 whitespace-pre-line text-[0.95rem] leading-[1.7] text-[var(--landing-text-muted)]">
              {aboutStoreContent.location.join("\n")}
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="280"
            className="mt-4 rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-4"
          >
            {aboutStoreContent.hours.map((hour, index) => (
              <div
                key={hour.day}
                data-aos="fade-up"
                data-aos-delay={320 + index * 35}
                className={`flex items-center justify-between border-b border-[var(--landing-border)] py-2.5 last:border-b-0 last:pb-0 first:pt-0 ${
                  "highlight" in hour && hour.highlight
                    ? "text-[var(--landing-text)]"
                    : "text-[var(--landing-text-muted)]"
                }`}
              >
                <span className="text-[0.82rem] tracking-[0.08em] uppercase [font-family:var(--font-barlow-condensed)]">
                  {hour.day}
                </span>
                <span className="text-[0.92rem]">{hour.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          data-store-highlight
          className="rounded-[12px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-5 sm:p-6"
        >
          <p className="text-[0.72rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
            Floor Plan
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 [perspective:1000px]">
            <motion.div
              data-store-tile
              whileHover={shouldReduceMotion ? undefined : { y: -2.5, rotateX: -1.5, rotateY: 1.5 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="rounded-[8px] border border-[var(--landing-border)] bg-[var(--landing-bg)] p-3 [transform-style:preserve-3d]"
            >
              <p className="text-[0.82rem] text-[var(--landing-text)]">Guitar Wall</p>
              <p className="mt-1 text-[0.78rem] text-[var(--landing-text-subtle)]">
                Setup-ready lines and quick A/B stations.
              </p>
            </motion.div>

            <motion.div
              data-store-tile
              whileHover={shouldReduceMotion ? undefined : { y: -2.5, rotateX: -1.5, rotateY: -1.5 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="rounded-[8px] border border-[var(--landing-border)] bg-[var(--landing-bg)] p-3 [transform-style:preserve-3d]"
            >
              <p className="text-[0.82rem] text-[var(--landing-text)]">Amp Bay</p>
              <p className="mt-1 text-[0.78rem] text-[var(--landing-text-subtle)]">
                Combo and head cabinets patched for direct comparison.
              </p>
            </motion.div>

            <motion.div
              data-store-tile
              whileHover={shouldReduceMotion ? undefined : { y: -2.5, rotateX: 1.5, rotateY: 1.5 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="rounded-[8px] border border-[var(--landing-border)] bg-[var(--landing-bg)] p-3 [transform-style:preserve-3d]"
            >
              <p className="text-[0.82rem] text-[var(--landing-text)]">Pedal Bench</p>
              <p className="mt-1 text-[0.78rem] text-[var(--landing-text-subtle)]">
                Chain testing with baseline clean and gain presets.
              </p>
            </motion.div>

            <motion.div
              data-store-tile
              whileHover={shouldReduceMotion ? undefined : { y: -2.5, rotateX: 1.5, rotateY: -1.5 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="rounded-[8px] border border-[var(--landing-border)] bg-[var(--landing-bg)] p-3 [transform-style:preserve-3d]"
            >
              <p className="text-[0.82rem] text-[var(--landing-text)]">Drum Room</p>
              <p className="mt-1 text-[0.78rem] text-[var(--landing-text-subtle)]">
                Isolated room for realistic dynamics and monitoring.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

