"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";

type Tilt3DCardIntensity = "subtle" | "medium";

type Tilt3DCardProps = {
  children: ReactNode;
  className?: string;
  surfaceClassName?: string;
  intensity?: Tilt3DCardIntensity;
  disabled?: boolean;
};

type TiltIntensityConfig = {
  maxRotate: number;
  maxScale: number;
  springStiffness: number;
  springDamping: number;
};

const intensityMap: Record<Tilt3DCardIntensity, TiltIntensityConfig> = {
  subtle: {
    maxRotate: 7,
    maxScale: 1.015,
    springStiffness: 170,
    springDamping: 22,
  },
  medium: {
    maxRotate: 10,
    maxScale: 1.02,
    springStiffness: 185,
    springDamping: 20,
  },
};

const mobileMediaQuery = "(max-width: 900px), (pointer: coarse)";

export default function Tilt3DCard({
  children,
  className,
  surfaceClassName,
  intensity = "subtle",
  disabled = false,
}: Tilt3DCardProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isMobileOrCoarse, setIsMobileOrCoarse] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowOpacity = useMotionValue(0);

  const config = intensityMap[intensity];

  const springRotateX = useSpring(rotateX, {
    stiffness: config.springStiffness,
    damping: config.springDamping,
    mass: 0.8,
  });
  const springRotateY = useSpring(rotateY, {
    stiffness: config.springStiffness,
    damping: config.springDamping,
    mass: 0.8,
  });
  const springScale = useSpring(scale, {
    stiffness: 170,
    damping: 24,
    mass: 0.8,
  });
  const springGlowOpacity = useSpring(glowOpacity, {
    stiffness: 190,
    damping: 26,
    mass: 0.7,
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mobileMediaQuery);
    const handleChange = () => {
      setIsMobileOrCoarse(mediaQueryList.matches);
    };

    handleChange();
    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, []);

  const isInteractive = useMemo(() => {
    return !disabled && !reduceMotion && !isMobileOrCoarse;
  }, [disabled, isMobileOrCoarse, reduceMotion]);

  const glowBackground = useMotionTemplate`radial-gradient(340px circle at ${glowX}% ${glowY}%, color-mix(in oklab, var(--landing-blue) 14%, transparent), transparent 62%)`;

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    glowOpacity.set(0);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isInteractive || event.pointerType === "touch") {
      return;
    }

    const target = rootRef.current;
    if (!target) {
      return;
    }

    const bounds = target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const xRatio = bounds.width > 0 ? x / bounds.width : 0.5;
    const yRatio = bounds.height > 0 ? y / bounds.height : 0.5;

    rotateY.set((xRatio - 0.5) * 2 * config.maxRotate);
    rotateX.set((0.5 - yRatio) * 2 * config.maxRotate);
    scale.set(config.maxScale);
    glowX.set(xRatio * 100);
    glowY.set(yRatio * 100);
    glowOpacity.set(1);
  };

  const onPointerLeave = () => {
    resetTilt();
  };

  return (
    <motion.div
      ref={rootRef}
      className={cn("relative h-full [perspective:1200px]", className)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerLeave}
      onPointerUp={onPointerLeave}
    >
      <motion.div
        className={cn(
          "relative h-full w-full transform-gpu [transform-style:preserve-3d]",
          surfaceClassName,
        )}
        style={{
          rotateX: isInteractive ? springRotateX : 0,
          rotateY: isInteractive ? springRotateY : 0,
          scale: isInteractive ? springScale : 1,
          willChange: "transform",
        }}
      >
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit]"
          style={{
            opacity: isInteractive ? springGlowOpacity : 0,
            background: glowBackground,
          }}
        />
        {children}
      </motion.div>
    </motion.div>
  );
}

