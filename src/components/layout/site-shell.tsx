import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import type { ReactNode } from "react";

type SiteShellProps = {
  children: ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--landing-bg)] text-[var(--landing-text)] transition-colors duration-200">
      <SiteHeader />
      <main className="relative z-10 flex flex-1 flex-col">{children}</main>
      <div className="relative z-10">
        <SiteFooter />
      </div>
    </div>
  );
}
