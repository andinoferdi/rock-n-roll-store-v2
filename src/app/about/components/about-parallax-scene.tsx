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

type AboutParallaxSceneProps = {
  variant: "header" | "closing";
};

type ParallaxPreset = {
  scene: ParallaxSceneConfig;
  layers: readonly ParallaxLayerConfig[];
};

const headerPreset: ParallaxPreset = {
  scene: {
    offset: ["start start", "end start"],
    responsive: {
      mode: "adaptive",
      compactQuery: "(max-width: 760px)",
      maxMobileLayers: 2,
      reduceMotionByDefault: true,
    },
  },
  layers: [
    {
      id: "grid",
      axis: "y",
      desktopRange: [0, -72],
      mobileRange: [0, -20],
      opacity: [1, 0.86],
      scale: [1, 1.01],
      spring: {
        stiffness: 124,
        damping: 27,
        mass: 0.6,
      },
      importance: "core",
    },
    {
      id: "halo",
      axis: "y",
      desktopRange: [0, -148],
      mobileRange: [0, -42],
      opacity: [0.18, 0.45],
      scale: [0.96, 1.06],
      spring: {
        stiffness: 114,
        damping: 28,
        mass: 0.64,
      },
      importance: "core",
    },
    {
      id: "orb",
      axis: "x",
      desktopRange: [0, 92],
      mobileRange: [0, 22],
      opacity: [0.1, 0.28],
      scale: [0.96, 1.06],
      spring: {
        stiffness: 108,
        damping: 28,
        mass: 0.68,
      },
      importance: "detail",
    },
  ],
};

const closingPreset: ParallaxPreset = {
  scene: {
    offset: ["start end", "end start"],
    responsive: {
      mode: "adaptive",
      compactQuery: "(max-width: 760px)",
      maxMobileLayers: 2,
      reduceMotionByDefault: true,
    },
  },
  layers: [
    {
      id: "grid",
      axis: "y",
      desktopRange: [0, -44],
      mobileRange: [0, -14],
      opacity: [1, 0.9],
      scale: [1, 1.01],
      spring: {
        stiffness: 116,
        damping: 27,
        mass: 0.62,
      },
      importance: "core",
    },
    {
      id: "halo",
      axis: "y",
      desktopRange: [0, -96],
      mobileRange: [0, -28],
      opacity: [0.14, 0.36],
      scale: [0.96, 1.05],
      spring: {
        stiffness: 108,
        damping: 28,
        mass: 0.66,
      },
      importance: "core",
    },
    {
      id: "orb",
      axis: "x",
      desktopRange: [0, -72],
      mobileRange: [0, -20],
      opacity: [0.08, 0.24],
      scale: [0.96, 1.04],
      spring: {
        stiffness: 104,
        damping: 28,
        mass: 0.7,
      },
      importance: "detail",
    },
  ],
};

function renderLayer(layer: ParallaxLayerConfig, variant: AboutParallaxSceneProps["variant"]) {
  if (layer.id === "grid") {
    return (
      <ParallaxLayer key={layer.id} config={layer} className="absolute inset-0">
        <GridBackgroundDemo className="h-full w-full" showLabel={false} />
      </ParallaxLayer>
    );
  }

  if (layer.id === "halo") {
    return (
      <ParallaxLayer
        key={layer.id}
        config={layer}
        className="absolute left-1/2 top-1/2 h-[440px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--landing-blue-soft-strong)_0%,transparent_72%)] max-[760px]:h-[300px] max-[760px]:w-[420px]"
      >
        <span aria-hidden="true" className={variant === "header" ? "opacity-100" : "opacity-80"} />
      </ParallaxLayer>
    );
  }

  return (
    <ParallaxLayer
      key={layer.id}
      config={layer}
      className="absolute right-[-8%] top-[44%] h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle,var(--landing-atmosphere-soft)_0%,transparent_72%)] max-[760px]:h-[150px] max-[760px]:w-[150px]"
    >
      <span aria-hidden="true" />
    </ParallaxLayer>
  );
}

export default function AboutParallaxScene({ variant }: AboutParallaxSceneProps) {
  const preset = variant === "header" ? headerPreset : closingPreset;
  const { visibleLayers } = useParallaxLayers({
    scene: preset.scene,
    layers: preset.layers,
  });

  return (
    <ParallaxScene scene={preset.scene} className="pointer-events-none absolute inset-0">
      {visibleLayers.map((layer) => renderLayer(layer, variant))}
    </ParallaxScene>
  );
}