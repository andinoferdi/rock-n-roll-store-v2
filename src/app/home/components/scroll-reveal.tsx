"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-6");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    reveals.forEach((element) => {
      element.classList.add("opacity-0", "translate-y-6");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
