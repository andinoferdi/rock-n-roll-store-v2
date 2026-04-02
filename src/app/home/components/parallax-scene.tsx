"use client";

import type {
  ParallaxLayerConfig,
  ParallaxSceneConfig,
} from "@/app/home/data/storefront";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ParallaxRuntime = {
  isCompactViewport: boolean;
  scrollYProgress: MotionValue<number>;
  shouldReduceMotion: boolean;
};

const ParallaxRuntimeContext = createContext<ParallaxRuntime | null>(null);

function toRangeTuple(range: readonly [number, number]): [number, number] {
  return [range[0], range[1]];
}

type ParallaxSceneProps = {
  children: ReactNode;
  className?: string;
  scene: ParallaxSceneConfig;
};

type ParallaxLayerProps = {
  children: ReactNode;
  className?: string;
  config: ParallaxLayerConfig;
  style?: MotionStyle;
};

function useCompactViewport(mediaQuery: string) {
  const [isCompactViewport, setIsCompactViewport] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);
    const handleChange = () => {
      setIsCompactViewport(mediaQueryList.matches);
    };

    handleChange();
    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [mediaQuery]);

  return isCompactViewport;
}

export function ParallaxScene({ children, className, scene }: ParallaxSceneProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const isCompactViewport = useCompactViewport(scene.responsive.compactQuery);
  const reducedMotionPreference = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: [scene.offset[0], scene.offset[1]],
  });

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      return;
    }

    const targetElement = targetRef.current;
    if (!targetElement) {
      return;
    }

    const height = targetElement.getBoundingClientRect().height;
    if (height <= 0) {
      console.warn("ParallaxScene target has non-positive height.", {
        className,
        offset: scene.offset,
      });
    }
  }, [className, scene.offset]);

  const shouldReduceMotion = hasMounted
    && ((scene.responsive.reduceMotionByDefault && Boolean(reducedMotionPreference))
      || (scene.responsive.mode === "desktop-only" && isCompactViewport));

  const runtime = useMemo(
    () => ({
      isCompactViewport,
      scrollYProgress,
      shouldReduceMotion,
    }),
    [isCompactViewport, scrollYProgress, shouldReduceMotion],
  );
  return (
    <div className={cn("relative", className)} data-parallax-scene>
      <div ref={targetRef} className="relative h-full w-full">
        <ParallaxRuntimeContext.Provider value={runtime}>
          {children}
        </ParallaxRuntimeContext.Provider>
      </div>
    </div>
  );
}

export function ParallaxLayer({
  children,
  className,
  config,
  style,
}: ParallaxLayerProps) {
  const runtime = useContext(ParallaxRuntimeContext);

  if (!runtime) {
    throw new Error("ParallaxLayer must be used inside ParallaxScene.");
  }

  const activeRange = runtime.shouldReduceMotion
    ? ([0, 0] as const)
    : runtime.isCompactViewport
      ? config.mobileRange
      : config.desktopRange;
  const activeOpacityRange = runtime.shouldReduceMotion
    ? ([1, 1] as const)
    : config.opacity ?? ([1, 1] as const);
  const activeScaleRange = runtime.shouldReduceMotion
    ? ([1, 1] as const)
    : config.scale ?? ([1, 1] as const);

  const translation = useSpring(
    useTransform(runtime.scrollYProgress, [0, 1], toRangeTuple(activeRange)),
    config.spring,
  );
  const opacity = useSpring(
    useTransform(
      runtime.scrollYProgress,
      [0, 1],
      toRangeTuple(activeOpacityRange),
    ),
    config.spring,
  );
  const scale = useSpring(
    useTransform(
      runtime.scrollYProgress,
      [0, 1],
      toRangeTuple(activeScaleRange),
    ),
    config.spring,
  );

  const layerStyle: MotionStyle =
    config.axis === "x"
      ? { opacity, scale, x: translation }
      : { opacity, scale, y: translation };

  return (
    <motion.div
      className={className}
      data-parallax-layer={config.id}
      style={{ ...layerStyle, ...style }}
    >
      {children}
    </motion.div>
  );
}
