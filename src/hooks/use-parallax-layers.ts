"use client";

import type {
  ParallaxLayerConfig,
  ParallaxSceneConfig,
} from "@/app/home/data/storefront";
import { useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

type UseParallaxLayersInput = {
  scene: ParallaxSceneConfig;
  layers: readonly ParallaxLayerConfig[];
};

function getInitialCompactState(mediaQuery: string) {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(mediaQuery).matches;
}

export function useParallaxLayers({ scene, layers }: UseParallaxLayersInput) {
  const shouldReduceMotion = useReducedMotion();
  const [isCompactViewport, setIsCompactViewport] = useState(() =>
    getInitialCompactState(scene.responsive.compactQuery),
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(scene.responsive.compactQuery);
    const handleChange = () => {
      setIsCompactViewport(mediaQueryList.matches);
    };

    handleChange();
    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [scene.responsive.compactQuery]);

  const visibleLayers = useMemo(() => {
    const coreLayers = layers.filter((layer) => layer.importance !== "detail");

    if (shouldReduceMotion) {
      return coreLayers;
    }

    if (!isCompactViewport) {
      return layers;
    }

    const maxMobileLayers = Math.max(1, scene.responsive.maxMobileLayers);
    const mobileLayers = coreLayers.slice(0, maxMobileLayers);

    if (mobileLayers.length >= maxMobileLayers) {
      return mobileLayers;
    }

    const detailLayers = layers.filter((layer) => layer.importance === "detail");
    const fillCount = maxMobileLayers - mobileLayers.length;
    return [...mobileLayers, ...detailLayers.slice(0, fillCount)];
  }, [isCompactViewport, layers, scene.responsive.maxMobileLayers, shouldReduceMotion]);

  return {
    isCompactViewport,
    shouldReduceMotion: Boolean(shouldReduceMotion),
    visibleLayers,
  };
}

