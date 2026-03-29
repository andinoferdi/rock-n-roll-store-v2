import { cn } from "@/lib/utils";

type GridBackgroundDemoProps = {
  className?: string;
  showLabel?: boolean;
};

export default function GridBackgroundDemo({ className, showLabel = true }: GridBackgroundDemoProps) {
  return (
    <div className={cn("relative flex h-[50rem] w-full items-center justify-center bg-[var(--landing-bg)]", className)}>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:64px_64px]",
          "[background-image:linear-gradient(to_right,var(--landing-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--landing-grid)_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-[var(--landing-bg)] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      {showLabel ? (
        <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
          Backgrounds
        </p>
      ) : null}
    </div>
  );
}
