"use client";

import {
  ParallaxLayer,
  ParallaxScene,
} from "@/app/home/components/parallax-scene";
import type {
  ParallaxLayerConfig,
  ParallaxSceneConfig,
} from "@/app/home/data/storefront";
import GridBackgroundDemo from "@/components/grid-background-demo";
import { useParallaxLayers } from "@/hooks/use-parallax-layers";

const sceneConfig: ParallaxSceneConfig = {
  offset: ["start start", "end start"],
  responsive: {
    mode: "adaptive",
    compactQuery: "(max-width: 760px)",
    maxMobileLayers: 1,
    reduceMotionByDefault: true,
  },
};

const layerConfig: readonly ParallaxLayerConfig[] = [
  {
    id: "grid",
    axis: "y",
    desktopRange: [0, -64],
    mobileRange: [0, -20],
    opacity: [1, 0.9],
    scale: [1, 1.01],
    spring: {
      stiffness: 120,
      damping: 28,
      mass: 0.62,
    },
    importance: "core",
  },
];

export default function ProductsHeaderParallax() {
  const { visibleLayers } = useParallaxLayers({
    scene: sceneConfig,
    layers: layerConfig,
  });

  return (
    <ParallaxScene scene={sceneConfig} className="pointer-events-none absolute inset-0">
      {visibleLayers.map((layer) => (
        <ParallaxLayer key={layer.id} config={layer} className="absolute inset-0">
          <GridBackgroundDemo className="h-full w-full" showLabel={false} />
        </ParallaxLayer>
      ))}
    </ParallaxScene>
  );
}

