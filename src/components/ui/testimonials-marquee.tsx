"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "motion/react";

type TestimonialsMarqueeItem = {
  quote: string;
  name: string;
  title: string;
};

type TestimonialsMarqueeProps = {
  items: TestimonialsMarqueeItem[];
  speed?: "fast" | "normal" | "slow";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
};

export default function TestimonialsMarquee({
  items,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  className,
}: TestimonialsMarqueeProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={cn("grid gap-4", className)}>
        {items.map((item) => (
          <article
            key={`${item.name}-${item.title}`}
            className="rounded-[12px] border border-[var(--landing-border)] bg-[var(--landing-card)] px-5 py-5"
          >
            <p className="text-[0.92rem] leading-[1.65] text-[var(--landing-text-muted)]">
              &ldquo;{item.quote}&rdquo;
            </p>
            <p className="mt-3 text-[0.82rem] font-semibold text-[var(--landing-text)]">
              {item.name}
            </p>
            <p className="text-[0.74rem] text-[var(--landing-text-subtle)]">{item.title}</p>
          </article>
        ))}
      </div>
    );
  }

  return (
    <InfiniteMovingCards
      items={items}
      speed={speed}
      direction={direction}
      pauseOnHover={pauseOnHover}
      className={cn("aceternity-testimonials-marquee max-w-full", className)}
    />
  );
}

