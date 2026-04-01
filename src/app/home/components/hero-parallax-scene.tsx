"use client";

import {
  heroParallaxPreset,
  type ParallaxLayerConfig,
} from "@/app/home/data/storefront";
import {
  ParallaxLayer,
  ParallaxScene,
} from "@/app/home/components/parallax-scene";
import GridBackgroundDemo from "@/components/grid-background-demo";
import { useParallaxLayers } from "@/hooks/use-parallax-layers";

function renderLayer(layer: ParallaxLayerConfig) {
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
        className="absolute left-1/2 top-[42%] h-[560px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--landing-blue-soft-strong)_0%,transparent_70%)] max-[760px]:h-[440px] max-[760px]:w-[540px]"
      >
        <span aria-hidden="true" />
      </ParallaxLayer>
    );
  }

  if (layer.id === "leftOrb") {
    return (
      <ParallaxLayer
        key={layer.id}
        config={layer}
        className="absolute left-[-4%] top-[30%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,var(--landing-atmosphere-soft)_0%,transparent_72%)] blur-[1px] max-[760px]:h-[180px] max-[760px]:w-[180px]"
      >
        <span aria-hidden="true" />
      </ParallaxLayer>
    );
  }

  if (layer.id === "rightOrb") {
    return (
      <ParallaxLayer
        key={layer.id}
        config={layer}
        className="absolute right-[-6%] top-[50%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,var(--landing-blue-soft)_0%,transparent_72%)] blur-[1px] max-[760px]:h-[170px] max-[760px]:w-[170px]"
      >
        <span aria-hidden="true" />
      </ParallaxLayer>
    );
  }

  return null;
}

export default function HeroParallaxScene() {
  const { visibleLayers } = useParallaxLayers({
    scene: heroParallaxPreset.scene,
    layers: heroParallaxPreset.layers,
  });

  return (
    <ParallaxScene
      scene={heroParallaxPreset.scene}
      className="pointer-events-none absolute inset-0"
    >
      {visibleLayers.map((layer) => renderLayer(layer))}
    </ParallaxScene>
  );
}
