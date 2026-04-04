"use client";

import { heroData } from "@/app/home/data/storefront";
import HeroParallaxScene from "@/app/home/components/hero-parallax-scene";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";

ensureGsapPlugins();

const primaryButtonClass =
  "inline-flex h-12 items-center justify-center gap-2 rounded-[4px] border border-transparent bg-[var(--landing-blue)] px-7 text-[1.08rem] font-semibold tracking-[0.04em] text-white transition-all duration-200 hover:bg-[var(--landing-blue-light)] hover:shadow-[0_3px_10px_var(--landing-blue-glow)] [font-family:var(--font-barlow-condensed)]";

const secondaryButtonClass =
  "inline-flex h-12 items-center justify-center gap-2 rounded-[4px] border border-[var(--landing-border)] bg-transparent px-7 text-[1.08rem] font-semibold tracking-[0.04em] text-[var(--landing-text-muted)] transition-colors duration-200 hover:border-[var(--landing-border)] hover:text-[var(--landing-text)] [font-family:var(--font-barlow-condensed)]";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (shouldReduceMotion) {
        return;
      }

      const introTimeline = gsap.timeline({
        defaults: {
          duration: 0.72,
          ease: "power3.out",
        },
      });

      introTimeline
        .from("[data-hero-eyebrow]", { autoAlpha: 0, y: 18 })
        .from(
          "[data-hero-title-line]",
          { autoAlpha: 0, y: 36, stagger: 0.1, duration: 0.82 },
          "-=0.42",
        )
        .from("[data-hero-subtitle]", { autoAlpha: 0, y: 24 }, "-=0.36")
        .from("[data-hero-actions]", { autoAlpha: 0, y: 24 }, "-=0.3")
        .from("[data-hero-stats]", { autoAlpha: 0, y: 30, duration: 0.8 }, "-=0.24");

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
      className="relative overflow-hidden bg-[var(--landing-bg)] pb-18 pt-[calc(72px+6rem)]"
      id="hero"
    >
      <div className="pointer-events-none absolute inset-0">
        <HeroParallaxScene />
      </div>

      <div className="relative z-[2] mx-auto w-full max-w-[1200px] px-6">
        <div className="mx-auto max-w-[980px] text-center">
          <div className="mb-7 inline-flex items-center justify-center" data-hero-eyebrow>
            <span className="inline-flex items-center gap-1.5 rounded-[3px] border border-[var(--landing-blue-soft-border)] bg-[var(--landing-blue-soft)] px-2.5 py-1 text-[0.75rem] font-semibold tracking-[0.1em] uppercase text-[var(--landing-tag-text)] [font-family:var(--font-barlow-condensed)]">
              {heroData.tag}
            </span>
          </div>

          <h1
            data-hero-title-group
            className="text-[clamp(4.7rem,15vw,9rem)] leading-[0.87] tracking-[0.02em] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]"
          >
            <span className="block" data-hero-title-line>
              {heroData.titleTop}
            </span>
            <span className="block text-[var(--landing-blue)]" data-hero-title-line>
              {heroData.titleAccent}
            </span>
          </h1>

          <p
            data-hero-subtitle
            className="mx-auto mt-6 max-w-[560px] text-[1.125rem] leading-[1.6] text-[var(--landing-text-muted)]"
          >
            {heroData.subtitle}
          </p>

          <div
            data-hero-actions
            className="mt-9 flex items-center justify-center gap-3.5 max-[600px]:flex-col"
          >
            <motion.a
              href="#products"
              className={primaryButtonClass}
              whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02, rotateX: -1.5 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              Browse All Gear
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.a>

            <motion.a
              href="#categories"
              className={secondaryButtonClass}
              whileHover={shouldReduceMotion ? undefined : { y: -1.5, scale: 1.012, rotateX: -1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
            >
              See Categories
            </motion.a>
          </div>

          <div
            data-hero-stats
            className="mx-auto mt-14 flex max-w-[780px] items-start justify-center gap-10 pt-9 max-[720px]:flex-wrap max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-4"
          >
            {heroData.stats.map((stat, index) => (
              <div key={stat.label} className="contents">
                <div className="flex flex-col items-start gap-1.5 max-[720px]:items-center max-[600px]:items-start">
                  <span className="text-[2.25rem] leading-none text-[var(--landing-text)] [font-family:var(--font-bebas-neue)] tracking-[0.03em]">
                    {stat.value}
                  </span>
                  <span className="text-[0.75rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                    {stat.label}
                  </span>
                </div>
                {index < heroData.stats.length - 1 ? (
                  <span
                    className="h-9 w-px bg-[var(--landing-border)] max-[600px]:hidden"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
