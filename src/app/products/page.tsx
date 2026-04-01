import type { Metadata } from "next";
import ProductsCatalogShell from "@/app/products/components/catalog-shell";
import ProductsPageHeader from "@/app/products/components/page-header";
import SiteShell from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore guitars, basses, drums, amplifiers, and studio gear curated for stage and studio workflows.",
};

export default function ProductsPage() {
  return (
    <SiteShell>
      <div className="overflow-x-clip text-[var(--landing-text)] [font-family:var(--font-dm-sans)]">
        <ProductsPageHeader />
        <ProductsCatalogShell />
      </div>
    </SiteShell>
  );
}
