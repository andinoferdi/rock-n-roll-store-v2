import { productItems } from "@/app/home/data/storefront";
import ProductsParallaxChrome from "@/app/home/components/products-parallax-chrome";
import Image from "next/image";
import Link from "next/link";

const PRODUCT_BADGE_STYLE: Record<string, string> = {
  New: "bg-[var(--landing-blue)] text-white",
  Popular: "bg-[#c0392b] text-white",
  Bestseller: "bg-[#c0392b] text-white",
  Sale: "bg-[#1a8060] text-white",
};

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const secondaryButtonClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-[4px] border border-[var(--landing-border)] bg-transparent px-6 text-[1.05rem] font-semibold tracking-[0.04em] text-[var(--landing-text-muted)] transition-colors duration-200 hover:border-[var(--landing-border)] hover:text-[var(--landing-text)] [font-family:var(--font-barlow-condensed)]";

export default function ProductsSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--landing-bg)] py-24" id="products">
      <div className="pointer-events-none absolute inset-0">
        <ProductsParallaxChrome />
      </div>
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mb-12 flex items-end justify-between gap-6 max-[600px]:flex-col max-[600px]:items-start" data-aos="fade-up">
          <div>
            <p className="mb-3 text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
              New Arrivals
            </p>
            <h2 className="text-[3rem] leading-[1] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
              This Week in Stock
            </h2>
            <p className="mt-2.5 max-w-[420px] text-[1rem] text-[var(--landing-text-muted)]">
              Fresh inventory with verified specs and current pricing.
            </p>
          </div>
          <Link href="/#products" className={secondaryButtonClass}>
            Browse all gear
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
          {productItems.map((product, index) => (
            <div
              key={product.name}
              data-aos="fade-up"
              data-aos-delay={Math.min(index, 2) * 100}
            >
              <div
                className="group h-full overflow-hidden rounded-[10px] border border-[var(--landing-border)] bg-[var(--landing-card)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[var(--landing-border-strong)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.14)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--landing-bg-3)]">
                  <Image
                    alt={product.name}
                    src={product.image}
                    width={640}
                    height={480}
                    className="h-full w-full object-cover transition-transform duration-400 ease-out group-hover:scale-[1.02]"
                  />
                  {"badge" in product && product.badge ? (
                    <span
                      className={`absolute left-3 top-3 rounded-[3px] px-2 py-[3px] text-[0.75rem] font-bold tracking-[0.08em] uppercase [font-family:var(--font-barlow-condensed)] ${
                        PRODUCT_BADGE_STYLE[product.badge] ?? "bg-[var(--landing-blue)] text-white"
                      }`}
                    >
                      {product.badge}
                    </span>
                  ) : null}
                </div>

                <div className="px-5 pb-5 pt-4.5">
                  <div className="mb-1 text-[0.75rem] font-semibold tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                    {product.category}
                  </div>
                  <div className="mb-2 text-[1.125rem] leading-[1.4] text-[var(--landing-text)]">{product.name}</div>
                  <div className="mb-4 text-[0.875rem] leading-[1.5] text-[var(--landing-text-subtle)]">{product.specs}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[1.375rem] tracking-[0.02em] text-[var(--landing-text)] [font-family:var(--font-barlow-condensed)] font-bold">
                      {product.price}
                    </span>
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-[4px] bg-[var(--landing-blue)] text-white transition-all duration-200 hover:scale-[1.08] hover:bg-[var(--landing-blue-light)]"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
