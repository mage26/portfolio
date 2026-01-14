"use client";

import { Slot } from "@radix-ui/react-slot";
import { forwardRef, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useCarouselContext } from "./Root";

export interface CarouselControlBackProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const CarouselControlBack = forwardRef<
  HTMLButtonElement,
  CarouselControlBackProps
>(({ className, asChild = false, ...props }, ref) => {
  const [isHovered, setHovered] = useState(false);

  const {
    isScrollable,
    contentElementRef,
    contentPosition,
    itemsElementsRefs,
  } = useCarouselContext();

  const handleClick = useCallback(() => {
    if (!contentElementRef.current || !itemsElementsRefs.current.length) {
      return;
    }

    const { scrollLeft } = contentElementRef.current;
    const roundedScrollLeft = Math.floor(scrollLeft);
    const stopPoints = itemsElementsRefs.current.map(
      (itemRef) => itemRef.offsetLeft,
    );
    const previousStopPoint =
      stopPoints.reverse().find((point) => point < roundedScrollLeft) || 0;
    const contentLeft = Math.max(previousStopPoint, 0);
    contentElementRef.current.scrollTo({
      left: contentLeft,
      behavior: "smooth",
    });
  }, [contentElementRef, itemsElementsRefs]);

  const isHidden = !isScrollable || contentPosition === "start";
  const isAccessible = (isHovered && isHidden) || !isHidden;

  const Component = asChild ? Slot : "button";

  return (
    <Component
      aria-hidden="true"
      className={twMerge(
        "cursor-pointer opacity-100 transition-opacity delay-100 duration-500 ease-in-out",
        isHidden && "opacity-0",
        !isAccessible && "pointer-events-none",
        className,
      )}
      {...props}
      ref={ref}
      onClick={handleClick}
      tabIndex={isHidden ? -1 : 0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
});

CarouselControlBack.displayName = "CarouselControlBack";

export default CarouselControlBack;
