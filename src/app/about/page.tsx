import type { Metadata } from "next";
import EditorialOpenerSection from "@/app/about/components/editorial-opener-section";
import NumbersSection from "@/app/about/components/numbers-section";
import OriginSection from "@/app/about/components/origin-section";
import AboutPageHeader from "@/app/about/components/page-header";
import PressSection from "@/app/about/components/press-section";
import StoreSection from "@/app/about/components/store-section";
import TeamSection from "@/app/about/components/team-section";
import TimelineSection from "@/app/about/components/timeline-section";
import ValuesSection from "@/app/about/components/values-section";
import SiteShell from "@/components/layout/site-shell";
import AosInit from "@/providers/aos-init";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn the story, standards, and team behind Rock N Roll Store from Brooklyn roots to today's floor experience.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <div className="overflow-x-clip text-[var(--landing-text)] [font-family:var(--font-dm-sans)]">
        <AosInit />
        <AboutPageHeader />
        <EditorialOpenerSection />
        <NumbersSection />
        <OriginSection />
        <ValuesSection />
        <TimelineSection />
        <TeamSection />
        <StoreSection />
        <PressSection />
      </div>
    </SiteShell>
  );
}
