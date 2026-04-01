"use client";

import type { productsSortOptions } from "@/app/products/data/catalog-data";

export type ProductViewMode = "grid3" | "grid2" | "list";

type ProductsToolbarProps = {
  selectedSort: string;
  onSortChange: (value: string) => void;
  viewMode: ProductViewMode;
  onViewModeChange: (value: ProductViewMode) => void;
  resultsLabel: string;
  sortOptions: typeof productsSortOptions;
};

const viewButtonClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-[var(--landing-border)] bg-[var(--landing-card)] text-[var(--landing-text-subtle)] transition-colors duration-150 hover:text-[var(--landing-text)]";

export default function ProductsToolbar({
  selectedSort,
  onSortChange,
  viewMode,
  onViewModeChange,
  resultsLabel,
  sortOptions,
}: ProductsToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-3.5 sm:p-4">
      <p className="text-[0.86rem] text-[var(--landing-text-muted)]">{resultsLabel}</p>

      <div className="flex items-center gap-2.5">
        <label className="relative">
          <span className="sr-only">Sort products</span>
          <select
            value={selectedSort}
            onChange={(event) => onSortChange(event.target.value)}
            className="h-9 rounded-[4px] border border-[var(--landing-border)] bg-[var(--landing-bg-2)] px-2.5 pr-8 text-[0.8rem] text-[var(--landing-text-muted)] outline-none transition-colors focus:border-[var(--landing-blue)]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--landing-text-subtle)]"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </label>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onViewModeChange("grid3")}
            className={`${viewButtonClass} ${viewMode === "grid3" ? "border-[var(--landing-border-strong)] text-[var(--landing-blue-light)]" : ""}`}
            aria-label="3-column grid"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="3" y="3" width="5" height="5" rx="1" />
              <rect x="10" y="3" width="5" height="5" rx="1" />
              <rect x="17" y="3" width="4" height="5" rx="1" />
              <rect x="3" y="10" width="5" height="5" rx="1" />
              <rect x="10" y="10" width="5" height="5" rx="1" />
              <rect x="17" y="10" width="4" height="5" rx="1" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("grid2")}
            className={`${viewButtonClass} ${viewMode === "grid2" ? "border-[var(--landing-border-strong)] text-[var(--landing-blue-light)]" : ""}`}
            aria-label="2-column grid"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="3" y="3" width="8" height="8" rx="1" />
              <rect x="13" y="3" width="8" height="8" rx="1" />
              <rect x="3" y="13" width="8" height="8" rx="1" />
              <rect x="13" y="13" width="8" height="8" rx="1" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={`${viewButtonClass} ${viewMode === "list" ? "border-[var(--landing-border-strong)] text-[var(--landing-blue-light)]" : ""}`}
            aria-label="List view"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}