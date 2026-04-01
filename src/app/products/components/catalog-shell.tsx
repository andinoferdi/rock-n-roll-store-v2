"use client";

import ActiveFiltersStrip from "@/app/products/components/active-filters-strip";
import ProductGrid from "@/app/products/components/product-grid";
import ProductsToolbar, {
  type ProductViewMode,
} from "@/app/products/components/products-toolbar";
import SidebarFilters from "@/app/products/components/sidebar-filters";
import {
  catalogFilterGroups,
  initialActiveFilters,
  productCatalogItems,
  productsCatalogMeta,
  productsSortOptions,
} from "@/app/products/data/catalog-data";
import { useMemo, useState } from "react";

export default function ProductsCatalogShell() {
  const [viewMode, setViewMode] = useState<ProductViewMode>("grid3");
  const [selectedSort, setSelectedSort] = useState<string>(productsSortOptions[0].value);
  const [visibleCount, setVisibleCount] = useState<number>(productsCatalogMeta.initialVisibleCount);

  const shownCount = Math.min(visibleCount, productsCatalogMeta.totalResults);
  const progressPercent = Math.min(
    100,
    Math.round((shownCount / productsCatalogMeta.totalResults) * 100),
  );
  const canLoadMore = shownCount < productsCatalogMeta.totalResults;

  const resultsLabel = useMemo(
    () => `Showing ${shownCount} of ${productsCatalogMeta.totalResults.toLocaleString("en-US")} products`,
    [shownCount],
  );

  const handleLoadMore = () => {
    setVisibleCount((previous) => previous + productsCatalogMeta.loadMoreStep);
  };

  return (
    <section className="pb-20 pt-8 sm:pb-24 sm:pt-10">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">
        <div data-aos="fade-up">
          <ActiveFiltersStrip chips={initialActiveFilters} />
        </div>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[232px_minmax(0,1fr)] lg:gap-8">
          <div data-aos="fade-up" data-aos-delay="60" className="lg:sticky lg:top-[92px]">
            <SidebarFilters groups={catalogFilterGroups} />
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div data-aos="fade-up" data-aos-delay="100">
              <ProductsToolbar
                selectedSort={selectedSort}
                onSortChange={setSelectedSort}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                sortOptions={productsSortOptions}
                resultsLabel={resultsLabel}
              />
            </div>

            <div data-aos="fade-up" data-aos-delay="140">
              <ProductGrid
                products={productCatalogItems}
                viewMode={viewMode}
                visibleCount={shownCount}
              />
            </div>

            <section
              data-aos="fade-up"
              data-aos-delay="170"
              className="rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-4 sm:p-5"
            >
              <p className="text-[0.82rem] text-[var(--landing-text-subtle)]">{resultsLabel}</p>

              <div className="mt-2 h-[3px] rounded-full bg-[var(--landing-border)]">
                <div
                  className="h-full rounded-full bg-[var(--landing-blue)] transition-[width] duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {canLoadMore ? (
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-[4px] border border-[var(--landing-border)] bg-[var(--landing-bg-2)] px-4 text-[0.8rem] font-semibold tracking-[0.08em] uppercase text-[var(--landing-text-muted)] transition-colors duration-150 hover:border-[var(--landing-border-strong)] hover:text-[var(--landing-text)] [font-family:var(--font-barlow-condensed)]"
                >
                  Load more
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              ) : (
                <p className="mt-4 text-[0.8rem] text-[var(--landing-text-subtle)]">
                  All {productsCatalogMeta.totalResults.toLocaleString("en-US")} products loaded.
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
