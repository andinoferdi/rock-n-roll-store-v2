"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let hasRegisteredPlugins = false;

export function ensureGsapPlugins() {
  if (hasRegisteredPlugins) {
    return;
  }

  gsap.registerPlugin(useGSAP, ScrollTrigger);
  hasRegisteredPlugins = true;
}

export { gsap, ScrollTrigger };

