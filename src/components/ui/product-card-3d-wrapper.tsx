"use client";

import { CardBody, CardContainer } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

type ProductCard3DWrapperProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

const mobileQuery = "(max-width: 900px), (pointer: coarse)";

export default function ProductCard3DWrapper({
  children,
  className,
  disabled = false,
}: ProductCard3DWrapperProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mobileQuery);
    const handleChange = () => {
      setIsCoarsePointer(mediaQueryList.matches);
    };

    handleChange();
    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, []);

  const shouldDisable3D = disabled || prefersReducedMotion || isCoarsePointer;

  if (shouldDisable3D) {
    return <div className={cn("h-full", className)}>{children}</div>;
  }

  return (
    <CardContainer
      containerClassName={cn(
        "!py-0 !items-stretch !justify-stretch h-full w-full",
        className,
      )}
      className="h-full w-full"
    >
      <CardBody className="h-full w-full [&>*]:h-full [&>*]:w-full">
        {children}
      </CardBody>
    </CardContainer>
  );
}

