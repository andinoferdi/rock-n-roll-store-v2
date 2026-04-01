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

const MOBILE_PARALLAX_QUERY = "(max-width: 430px)";

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

function getInitialCompactViewport() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(MOBILE_PARALLAX_QUERY).matches;
}

function useCompactViewport() {
  const [isCompactViewport, setIsCompactViewport] = useState(
    getInitialCompactViewport,
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(MOBILE_PARALLAX_QUERY);
    const handleChange = () => {
      setIsCompactViewport(mediaQueryList.matches);
    };

    handleChange();
    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, []);

  return isCompactViewport;
}

export function ParallaxScene({ children, className, scene }: ParallaxSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isCompactViewport = useCompactViewport();
  const [hasMounted, setHasMounted] = useState(false);
  const reducedMotionPreference = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: [scene.offset[0], scene.offset[1]],
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const runtime = useMemo(
    () => ({
      isCompactViewport,
      scrollYProgress,
      shouldReduceMotion: !hasMounted || Boolean(reducedMotionPreference),
    }),
    [hasMounted, isCompactViewport, reducedMotionPreference, scrollYProgress],
  );
  const sceneClassName = className ? `relative ${className}` : "relative";

  return (
    <div ref={sceneRef} className={sceneClassName} style={{ position: "relative" }}>
      <ParallaxRuntimeContext.Provider value={runtime}>
        {children}
      </ParallaxRuntimeContext.Provider>
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
    <motion.div className={className} style={{ ...layerStyle, ...style }}>
      {children}
    </motion.div>
  );
}
