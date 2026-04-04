import { marqueeItems } from "@/app/home/data/storefront";

export default function MarqueeBand() {
  return (
    <div className="overflow-hidden border-y border-[var(--landing-blue)] bg-[var(--landing-blue)] py-3.5">
      <div className="flex w-max items-center gap-4 whitespace-nowrap motion-safe:animate-[landingMarquee_40s_linear_infinite] motion-reduce:animate-none">
        {[0, 1].map((setIndex) =>
          marqueeItems.map((item) => (
            <span
              key={`${setIndex}-${item}`}
              className="inline-flex items-center gap-3 text-[0.875rem] font-semibold uppercase tracking-[0.08em] text-white [font-family:var(--font-barlow-condensed)]"
            >
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            </span>
          )),
        )}
      </div>
    </div>
  );
}
