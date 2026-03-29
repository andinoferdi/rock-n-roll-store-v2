import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-[var(--landing-bg)] px-5 py-8 text-[var(--landing-text)] [font-family:var(--font-dm-sans)]">
      <div className="w-full max-w-[760px] rounded-[16px] border border-[var(--landing-border)] bg-[var(--landing-card)] px-7 py-8 text-center">
        <p className="inline-flex rounded-full border border-[color-mix(in_oklab,var(--landing-blue)_28%,transparent)] bg-[var(--landing-blue-soft)] px-2.5 py-1 text-[0.75rem] tracking-[0.12em] uppercase text-[var(--landing-blue-light)] [font-family:var(--font-barlow-condensed)]">
          404
        </p>
        <h1 className="mt-3.5 text-[clamp(42px,7vw,64px)] leading-[0.95] tracking-[0.03em] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
          Page Not Found
        </h1>
        <p className="mx-auto mt-2.5 max-w-[560px] text-[0.95rem] leading-[1.65] text-[var(--landing-text-muted)]">
          The link you opened is unavailable. Let&apos;s get you back to the Rock n Roll Store landing page.
        </p>
        <div className="mt-5.5 flex justify-center">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[4px] border border-transparent bg-[var(--landing-blue)] px-7 text-[1.08rem] font-semibold tracking-[0.04em] text-white transition-all duration-200 hover:bg-[var(--landing-blue-light)] hover:shadow-[0_3px_10px_var(--landing-blue-glow)] [font-family:var(--font-barlow-condensed)]"
          >
            Back To Home
          </Link>
        </div>
      </div>
    </section>
  );
}
