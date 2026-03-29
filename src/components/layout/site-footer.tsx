import { getCurrentYear } from "@/lib/utils";
import Link from "next/link";

const INSTRUMENT_LINKS = [
  "Electric Guitars",
  "Acoustic Guitars",
  "Bass Guitars",
  "Drum Kits",
  "Keyboards & Synths",
] as const;

const GEAR_LINKS = [
  "Amplifiers",
  "Effects Pedals",
  "Recording",
  "Strings & Picks",
  "Accessories",
] as const;

const STORE_LINKS = ["About Us", "Trade-Ins", "Repair Service", "Financing", "Contact"] as const;

const LEGAL_LINKS = ["Privacy Policy", "Terms of Use", "Cookie Settings"] as const;

const columnTitleClass =
  "mb-4 text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-[var(--landing-text)] [font-family:var(--font-barlow-condensed)]";

const linkListClass =
  "text-[0.875rem] text-[var(--landing-text-subtle)] transition-colors duration-200 hover:text-[var(--landing-text-muted)]";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--landing-border)] bg-[var(--landing-bg)] py-16 pb-8">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mb-12 grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 max-[900px]:grid-cols-2 max-[900px]:gap-8 max-[600px]:grid-cols-1">
          <div>
            <Link
              href="/"
              className="mb-3 inline-block text-[1.75rem] tracking-[0.06em] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]"
              aria-label="Rock N Roll Store home"
            >
              ROCK<span className="text-[var(--landing-blue)]">&apos;N&apos;ROLL</span> STORE
            </Link>
            <p className="max-w-[240px] text-[0.875rem] leading-[1.65] text-[var(--landing-text-subtle)]">
              Musical instruments and gear for players at every level. Independently owned since 2009.
            </p>

            <div className="mt-5 flex gap-2.5">
              <a
                href="#"
                className="inline-flex h-8.5 w-8.5 items-center justify-center rounded-[4px] border border-[var(--landing-border)] bg-[var(--landing-bg-card)] text-[var(--landing-text-subtle)] transition-colors duration-200 hover:border-[var(--landing-border-strong)] hover:text-[var(--landing-blue-light)]"
                aria-label="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex h-8.5 w-8.5 items-center justify-center rounded-[4px] border border-[var(--landing-border)] bg-[var(--landing-bg-card)] text-[var(--landing-text-subtle)] transition-colors duration-200 hover:border-[var(--landing-border-strong)] hover:text-[var(--landing-blue-light)]"
                aria-label="YouTube"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.96C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex h-8.5 w-8.5 items-center justify-center rounded-[4px] border border-[var(--landing-border)] bg-[var(--landing-bg-card)] text-[var(--landing-text-subtle)] transition-colors duration-200 hover:border-[var(--landing-border-strong)] hover:text-[var(--landing-blue-light)]"
                aria-label="X"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className={columnTitleClass}>Instruments</p>
            <ul className="flex list-none flex-col gap-2.5">
              {INSTRUMENT_LINKS.map((item) => (
                <li key={item}>
                  <a href="#" className={linkListClass}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={columnTitleClass}>Gear</p>
            <ul className="flex list-none flex-col gap-2.5">
              {GEAR_LINKS.map((item) => (
                <li key={item}>
                  <a href="#" className={linkListClass}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={columnTitleClass}>Store</p>
            <ul className="flex list-none flex-col gap-2.5">
              {STORE_LINKS.map((item) => (
                <li key={item}>
                  <a href="#" className={linkListClass}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--landing-border)] pt-6 max-[600px]:flex-col max-[600px]:gap-4 max-[600px]:text-center">
          <p className="text-[0.75rem] text-[var(--landing-text-subtle)]">
            &copy; {getCurrentYear()} Rock N Roll Store. All rights reserved.
          </p>
          <div className="flex gap-5">
            {LEGAL_LINKS.map((item) => (
              <a key={item} href="#" className="text-[0.75rem] text-[var(--landing-text-subtle)] transition-colors duration-200 hover:text-[var(--landing-text-muted)]">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
