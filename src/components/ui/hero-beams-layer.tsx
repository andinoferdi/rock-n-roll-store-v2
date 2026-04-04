"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { cn } from "@/lib/utils";

type HeroBeamsLayerProps = {
  className?: string;
  intensity?: "soft" | "medium" | "strong";
};

const intensityClassMap: Record<NonNullable<HeroBeamsLayerProps["intensity"]>, string> = {
  soft: "opacity-20",
  medium: "opacity-30",
  strong: "opacity-45",
};

export default function HeroBeamsLayer({
  className,
  intensity = "soft",
}: HeroBeamsLayerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        intensityClassMap[intensity],
        className,
      )}
    >
      <BackgroundBeams className="[mask-image:linear-gradient(to_bottom,transparent,black_24%,black_78%,transparent)]" />
    </div>
  );
}

