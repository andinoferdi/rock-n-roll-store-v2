"use client";

import { useThemeTransition } from "@/hooks/use-theme-transition";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
] as const;

const primaryButtonClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-[4px] border border-transparent bg-[var(--landing-blue)] px-6 text-[1.05rem] font-semibold tracking-[0.04em] text-white transition-all duration-200 hover:bg-[var(--landing-blue-light)] hover:shadow-[0_3px_10px_var(--landing-blue-glow)] [font-family:var(--font-barlow-condensed)]";

export default function SiteHeader() {
  const pathname = usePathname();
  const { resolvedTheme, toggleThemeWithTransition } = useThemeTransition();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isDarkTheme = mounted && resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isNavItemActive = (href: string) => {
    return pathname === href;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "marketing-nav-glass"
          : "border-b-0 bg-transparent"
      }`}
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-6 py-4 max-[900px]:flex max-[900px]:justify-between">
        <Link href="/" className="flex items-center gap-3.5" aria-label="Rock N Roll Store home">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-[7px] bg-transparent">
            <Image
              src="/images/Logo.png"
              alt="Rock N Roll Store"
              width={56}
              height={56}
              className="h-full w-full object-contain"
              priority
            />
          </span>
          <span className="text-[1.35rem] leading-none tracking-[0.06em] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
            ROCK <span className="text-[var(--landing-blue)]">N&apos;</span> ROLL STORE
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="justify-self-center max-[900px]:hidden">
          <ul className="flex items-center justify-center gap-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-[4px] px-2 py-1 text-[0.9rem] font-medium transition-colors duration-200 ${
                    isNavItemActive(item.href)
                      ? "bg-[var(--landing-blue-soft)] text-[var(--landing-blue-light)]"
                      : "text-[var(--landing-text-muted)] hover:text-[var(--landing-text)]"
                  }`}
                  aria-current={isNavItemActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-self-end gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-[var(--landing-border)] bg-[var(--landing-bg-card)] text-[var(--landing-text-muted)] transition-colors duration-200 hover:border-[var(--landing-border-strong)] hover:text-[var(--landing-blue-light)]"
            onClick={toggleThemeWithTransition}
            aria-label="Toggle theme"
          >
            {isDarkTheme ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="18"
                height="18"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M6.24683 7.08492C6.24683 10.7677 9.23232 13.7532 12.9151 13.7532C14.6687 13.7532 16.2641 13.0764 17.4545 11.9697C16.584 15.2727 13.5765 17.7083 10.0001 17.7083C5.74289 17.7083 2.29175 14.2572 2.29175 9.99996C2.29175 6.42356 4.72736 3.41602 8.03036 2.54558C6.92367 3.73594 6.24683 5.33139 6.24683 7.08492Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          <Link href="/login" className={`${primaryButtonClass} max-[900px]:hidden`} aria-label="Login">
            Login
          </Link>

          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-[4px] border border-[var(--landing-border)] bg-[var(--landing-bg-card)] text-[var(--landing-text-muted)] max-[900px]:inline-flex"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Open menu</span>
            <div className="flex flex-col gap-1.5">
              <span className="h-0.5 w-4 bg-current" />
              <span className="h-0.5 w-4 bg-current" />
              <span className="h-0.5 w-4 bg-current" />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`border-y border-[var(--landing-border)] bg-[color-mix(in_oklab,var(--landing-bg)_92%,transparent)] px-6 py-4 backdrop-blur-xl transition-[max-height,opacity,padding] duration-300 ease-out max-[900px]:block ${
          mobileMenuOpen ? "max-h-72 opacity-100" : "max-h-0 overflow-hidden py-0 opacity-0"
        } hidden`}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-[4px] px-2 py-2 text-[0.92rem] transition-colors duration-200 hover:bg-[var(--landing-bg-2)] ${
                isNavItemActive(item.href)
                  ? "bg-[var(--landing-blue-soft)] text-[var(--landing-blue-light)]"
                  : "text-[var(--landing-text-muted)] hover:text-[var(--landing-text)]"
              }`}
              aria-current={isNavItemActive(item.href) ? "page" : undefined}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            className={`${primaryButtonClass} mt-2 w-fit`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
