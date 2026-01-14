"use client";

import { Slot } from "@radix-ui/react-slot";
import { useEffect, useCallback, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { useCarouselContext } from "./Root";

export interface CarouselContentProps extends React.HTMLAttributes<HTMLUListElement> {
  asChild?: boolean;
  label?: string;
}

const CarouselContent = forwardRef<HTMLUListElement, CarouselContentProps>(
  (
    { className, label = "Carousel Content", asChild = false, ...props },
    ref,
  ) => {
    const {
      contentElementRef,
      isDragging,
      setIsScrollable,
      setContentPosition,
    } = useCarouselContext();

    const handleContentResize = useCallback(() => {
      if (!contentElementRef.current) {
        return;
      }

      const { scrollWidth, clientWidth } = contentElementRef.current;
      const isScrollable = scrollWidth > clientWidth;

      setIsScrollable(isScrollable);
    }, [contentElementRef, setIsScrollable]);

    const handleContentScroll = useCallback(() => {
      if (!contentElementRef.current) {
        return;
      }
      const { scrollLeft, scrollWidth, clientWidth } =
        contentElementRef.current;

      if (scrollLeft <= 0) {
        setContentPosition("start");

        return;
      }

      if (scrollLeft + clientWidth >= scrollWidth) {
        setContentPosition("end");

        return;
      }

      setContentPosition("center");
    }, [contentElementRef, setContentPosition]);

    useEffect(() => {
      contentElementRef.current?.addEventListener(
        "scroll",
        handleContentScroll,
      );

      const contentResizeObserver = new ResizeObserver(handleContentResize);

      contentResizeObserver.observe(contentElementRef.current!);

      return () => {
        contentResizeObserver.disconnect();
      };
    }, [contentElementRef, handleContentScroll, handleContentResize]);

    const Component = asChild ? Slot : "ul";

    return (
      <Component
        role="region"
        aria-label={label}
        className={twMerge(
          "no-native-scrollbar overscroll-x-contain",
          "relative flex w-full flex-nowrap gap-4 overflow-y-hidden overflow-x-scroll md:gap-6",
          isDragging
            ? "cursor-grabbing select-none scroll-auto"
            : "snap-x snap-mandatory scroll-smooth",
          className,
        )}
        {...props}
        ref={ref || contentElementRef}
      />
    );
  },
);

CarouselContent.displayName = "CarouselContent";

export default CarouselContent;
