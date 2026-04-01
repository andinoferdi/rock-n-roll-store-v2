"use client";

import {
  storyParallaxPreset,
  type ParallaxLayerConfig,
} from "@/app/home/data/storefront";
import {
  ParallaxLayer,
  ParallaxScene,
} from "@/app/home/components/parallax-scene";
import { cn } from "@/lib/utils";
import { useParallaxLayers } from "@/hooks/use-parallax-layers";
import type { ReactNode } from "react";

type StoryParallaxAsideProps = {
  children: ReactNode;
  className?: string;
};

function renderGlowLayer(layer: ParallaxLayerConfig) {
  if (layer.id !== "storyGlow") {
    return null;
  }

  return (
    <ParallaxLayer
      key={layer.id}
      config={layer}
      className="absolute right-[-10%] top-[6%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,var(--landing-blue-soft)_0%,transparent_72%)] max-[900px]:h-[160px] max-[900px]:w-[160px]"
    >
      <span aria-hidden="true" />
    </ParallaxLayer>
  );
}

export default function StoryParallaxAside({
  children,
  className,
}: StoryParallaxAsideProps) {
  const { visibleLayers } = useParallaxLayers({
    scene: storyParallaxPreset.scene,
    layers: storyParallaxPreset.layers,
  });
  const panelLayer =
    visibleLayers.find((layer) => layer.id === "storyPanel")
    ?? storyParallaxPreset.layers.find((layer) => layer.id === "storyPanel");
  const imageLayer =
    visibleLayers.find((layer) => layer.id === "storyImage")
    ?? storyParallaxPreset.layers.find((layer) => layer.id === "storyImage");

  if (!panelLayer || !imageLayer) {
    return <div className={className}>{children}</div>;
  }

  return (
    <ParallaxScene
      scene={storyParallaxPreset.scene}
      className={cn("relative", className)}
    >
      {visibleLayers.map((layer) => renderGlowLayer(layer))}
      <ParallaxLayer config={panelLayer} className="relative z-10 h-full">
        <div className="h-full">{children}</div>
      </ParallaxLayer>
    </ParallaxScene>
  );
}

export function StoryParallaxImage({
  children,
  className,
}: StoryParallaxAsideProps) {
  const { visibleLayers } = useParallaxLayers({
    scene: storyParallaxPreset.scene,
    layers: storyParallaxPreset.layers,
  });
  const imageLayer =
    visibleLayers.find((layer) => layer.id === "storyImage")
    ?? storyParallaxPreset.layers.find((layer) => layer.id === "storyImage");

  if (!imageLayer) {
    return <div className={className}>{children}</div>;
  }

  return (
    <ParallaxLayer config={imageLayer} className={className}>
      <div className="relative h-full">{children}</div>
    </ParallaxLayer>
  );
}
