"use client";

import {
  productsParallaxPreset,
  type ParallaxLayerConfig,
} from "@/app/home/data/storefront";
import {
  ParallaxLayer,
  ParallaxScene,
} from "@/app/home/components/parallax-scene";
import { useParallaxLayers } from "@/hooks/use-parallax-layers";

function renderLayer(layer: ParallaxLayerConfig) {
  if (layer.id === "productsGrid") {
    return (
      <ParallaxLayer key={layer.id} config={layer} className="absolute inset-0">
        <div className="h-full w-full [background-size:56px_56px] [background-image:linear-gradient(to_right,var(--landing-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--landing-grid)_1px,transparent_1px)] opacity-35" />
      </ParallaxLayer>
    );
  }

  if (layer.id === "productsGlow") {
    return (
      <ParallaxLayer
        key={layer.id}
        config={layer}
        className="absolute left-1/2 top-[42%] h-[480px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--landing-blue-soft)_0%,transparent_70%)] max-[760px]:h-[320px] max-[760px]:w-[420px]"
      >
        <span aria-hidden="true" />
      </ParallaxLayer>
    );
  }

  if (layer.id === "productsOrb") {
    return (
      <ParallaxLayer
        key={layer.id}
        config={layer}
        className="absolute right-[-8%] top-[18%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,var(--landing-atmosphere-soft)_0%,transparent_70%)] max-[760px]:h-[170px] max-[760px]:w-[170px]"
      >
        <span aria-hidden="true" />
      </ParallaxLayer>
    );
  }

  return null;
}

export default function ProductsParallaxChrome() {
  const { visibleLayers } = useParallaxLayers({
    scene: productsParallaxPreset.scene,
    layers: productsParallaxPreset.layers,
  });

  return (
    <ParallaxScene
      scene={productsParallaxPreset.scene}
      className="pointer-events-none absolute inset-0"
    >
      {visibleLayers.map((layer) => renderLayer(layer))}
    </ParallaxScene>
  );
}

