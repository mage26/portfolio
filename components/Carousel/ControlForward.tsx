"use client";

import { Slot } from "@radix-ui/react-slot";
import { forwardRef, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useCarouselContext } from "./Root";

export interface CarouselControlForwardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const CarouselControlForward = forwardRef<
  HTMLButtonElement,
  CarouselControlForwardProps
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

    const { scrollLeft, clientWidth, scrollWidth } = contentElementRef.current;
    const roundedScrollLeft = Math.ceil(scrollLeft);
    const stopPoints = itemsElementsRefs.current.map(
      (itemRef) => itemRef.offsetLeft,
    );
    const nextStopPoint =
      stopPoints.find((point) => point > roundedScrollLeft) || scrollWidth;
    const contentLeftMax = scrollWidth - clientWidth;
    const contentLeft = Math.min(nextStopPoint, contentLeftMax);
    contentElementRef.current.scrollTo({
      left: contentLeft,
    });
  }, [contentElementRef, itemsElementsRefs]);

  const isHidden = !isScrollable || contentPosition === "end";
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

CarouselControlForward.displayName = "CarouselControlForward";

export default CarouselControlForward;
