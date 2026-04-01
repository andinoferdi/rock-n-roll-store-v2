"use client";

import type { ProductViewMode } from "@/app/products/components/products-toolbar";
import type { ProductCatalogItem } from "@/app/products/data/catalog-data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMemo, useState } from "react";

type ProductGridProps = {
  products: ProductCatalogItem[];
  viewMode: ProductViewMode;
  visibleCount: number;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getBadgeClass(badge: ProductCatalogItem["badge"]) {
  switch (badge) {
    case "new":
      return "bg-[var(--landing-blue)] text-white";
    case "popular":
      return "bg-[var(--color-warning-500)] text-white";
    case "sale":
      return "bg-[var(--color-success-700)] text-white";
    case "used":
      return "bg-[var(--landing-text-subtle)] text-white";
    default:
      return "";
  }
}

function renderRatingStars(rating: number) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-[2px] text-[0.8rem]" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => {
        const isFull = index < fullStars;
        const isHalf = index === fullStars && hasHalf;
        return (
          <span
            key={`rating-${index}`}
            className={cn(
              "leading-none",
              isFull || isHalf ? "text-[var(--color-warning-500)]" : "text-[var(--landing-border)]",
            )}
          >
            *
          </span>
        );
      })}
    </div>
  );
}

export default function ProductGrid({ products, viewMode, visibleCount }: ProductGridProps) {
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({
    "gibson-les-paul-standard-50s": true,
  });
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({});

  const visibleProducts = useMemo(() => products.slice(0, visibleCount), [products, visibleCount]);

  const toggleWishlist = (id: string) => {
    setWishlist((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  const addToCart = (id: string) => {
    setAddedToCart((previous) => ({
      ...previous,
      [id]: true,
    }));

    window.setTimeout(() => {
      setAddedToCart((previous) => ({
        ...previous,
        [id]: false,
      }));
    }, 1100);
  };

  return (
    <div
      className={cn(
        "grid gap-4 sm:gap-5",
        viewMode === "grid3" && "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
        viewMode === "grid2" && "grid-cols-1 lg:grid-cols-2",
        viewMode === "list" && "grid-cols-1",
      )}
    >
      {visibleProducts.map((product, index) => {
        const isWishlisted = Boolean(wishlist[product.id]);
        const isAdded = Boolean(addedToCart[product.id]);

        return (
          <article
            key={product.id}
            data-aos="fade-up"
            data-aos-delay={Math.min(5, index) * 70}
            className={cn(
              "group overflow-hidden rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-card)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[var(--landing-border-strong)] hover:shadow-[var(--landing-shadow-card)]",
              viewMode === "list" && "sm:grid sm:grid-cols-[320px_1fr]",
            )}
          >
            <div
              className={cn(
                "relative aspect-[4/3] overflow-hidden bg-[var(--landing-bg-3)]",
                viewMode === "list" && "sm:h-full sm:aspect-auto",
              )}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes={viewMode === "list" ? "(max-width: 640px) 100vw, 320px" : "(max-width: 1200px) 50vw, 33vw"}
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />

              {product.badge ? (
                <span
                  className={cn(
                    "absolute left-3 top-3 rounded-[3px] px-2 py-[3px] text-[0.68rem] font-semibold tracking-[0.08em] uppercase [font-family:var(--font-barlow-condensed)]",
                    getBadgeClass(product.badge),
                  )}
                >
                  {product.badge}
                </span>
              ) : null}

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={`Toggle wishlist for ${product.name}`}
                className={cn(
                  "absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--landing-border)] bg-[color-mix(in_oklab,var(--landing-card)_88%,transparent)] text-[var(--landing-text-subtle)] transition-colors duration-150",
                  isWishlisted && "border-[var(--landing-border-strong)] text-[var(--landing-blue-light)]",
                )}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill={isWishlisted ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
              <p className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                {product.category}
              </p>
              <h3 className="text-[1.02rem] leading-[1.4] text-[var(--landing-text)]">{product.name}</h3>

              <div className="flex items-center gap-2">
                {renderRatingStars(product.rating)}
                <span className="text-[0.78rem] text-[var(--landing-text-subtle)]">({product.reviews})</span>
              </div>

              <p className="text-[0.84rem] leading-[1.55] text-[var(--landing-text-muted)]">{product.specs}</p>

              <div className="flex flex-wrap items-end justify-between gap-2 border-t border-[var(--landing-border)] pt-3">
                <div>
                  <p className="text-[1.2rem] font-semibold leading-none text-[var(--landing-text)] [font-family:var(--font-barlow-condensed)]">
                    {formatPrice(product.price)}
                  </p>
                  {product.originalPrice ? (
                    <p className="mt-1 text-[0.76rem] text-[var(--landing-text-subtle)] line-through">
                      {formatPrice(product.originalPrice)}
                    </p>
                  ) : null}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2 py-[3px] text-[0.66rem] tracking-[0.08em] uppercase [font-family:var(--font-barlow-condensed)]",
                      product.stockStatus === "in_stock" &&
                        "bg-[color-mix(in_oklab,var(--color-success-500)_14%,transparent)] text-[var(--color-success-700)]",
                      product.stockStatus === "low_stock" &&
                        "bg-[color-mix(in_oklab,var(--color-warning-500)_16%,transparent)] text-[var(--color-warning-700)]",
                      product.stockStatus === "preorder" && "bg-[var(--landing-blue-soft)] text-[var(--landing-blue-light)]",
                    )}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {product.stockLabel}
                  </span>

                  <button
                    type="button"
                    onClick={() => addToCart(product.id)}
                    className={cn(
                      "inline-flex h-9 w-9 items-center justify-center rounded-[4px] bg-[var(--landing-blue)] text-white transition-colors duration-150 hover:bg-[var(--landing-blue-light)]",
                      isAdded && "bg-[var(--color-success-700)]",
                    )}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    {isAdded ? (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
