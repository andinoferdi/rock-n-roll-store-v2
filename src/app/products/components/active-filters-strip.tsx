"use client";

import type { ActiveFilterChip } from "@/app/products/data/catalog-data";
import { useState } from "react";

type ActiveFiltersStripProps = {
  chips: ActiveFilterChip[];
};

export default function ActiveFiltersStrip({ chips }: ActiveFiltersStripProps) {
  const [activeChips, setActiveChips] = useState(chips);

  if (activeChips.length === 0) {
    return null;
  }

  const removeChip = (id: string) => {
    setActiveChips((previous) => previous.filter((chip) => chip.id !== id));
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 border-b border-[var(--landing-border)] py-4">
      <span className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
        Filters
      </span>

      {activeChips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={() => removeChip(chip.id)}
          className="inline-flex items-center gap-1.5 rounded-[4px] border border-[var(--landing-blue-soft-border)] bg-[var(--landing-blue-soft)] px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-[var(--landing-blue-light)] transition-colors duration-150 hover:bg-[var(--landing-blue-soft-strong)] [font-family:var(--font-barlow-condensed)]"
        >
          {chip.label}
          <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--landing-blue)_20%,transparent)] text-[0.6rem] leading-none">
            x
          </span>
        </button>
      ))}

      <button
        type="button"
        onClick={() => setActiveChips([])}
        className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-[var(--landing-text-subtle)] transition-colors duration-150 hover:text-[var(--landing-text)] [font-family:var(--font-barlow-condensed)]"
      >
        Clear all
      </button>
    </div>
  );
}