import BrandsSection from "@/app/home/components/brands-section";
import CategoriesSection from "@/app/home/components/categories-section";
import HeroSection from "@/app/home/components/hero-section";
import MarqueeBand from "@/app/home/components/marquee-band";
import NewsletterSection from "@/app/home/components/newsletter-section";
import ProductsSection from "@/app/home/components/products-section";
import ScrollReveal from "@/app/home/components/scroll-reveal";
import StorySection from "@/app/home/components/story-section";
import TestimonialsSection from "@/app/home/components/testimonials-section";
import SiteShell from "@/components/layout/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <div className="overflow-x-hidden pt-[72px] text-[var(--landing-text)] [font-family:var(--font-dm-sans)]">
        <ScrollReveal />
        <HeroSection />
        <MarqueeBand />
        <CategoriesSection />
        <ProductsSection />
        <BrandsSection />
        <StorySection />
        <TestimonialsSection />
        <NewsletterSection />
      </div>
    </SiteShell>
  );
}
