"use client";

import { Slot } from "@radix-ui/react-slot";
import {
  forwardRef,
  TouchEventHandler,
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";

import { useCarouselContext } from "./Root";

export interface CarouselScrollbarThumbProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const MIN_THUMB_SIZE = 20;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const CarouselScrollbarThumb = forwardRef<
  HTMLDivElement,
  CarouselScrollbarThumbProps
>(({ asChild = false, className, ...props }, ref) => {
  const thumbOffsetRef = useRef(0);

  const {
    isDragging,
    isScrollable,
    setIsDragging,
    scrollbarThumbRef,
    scrollbarTrackRef,
    contentElementRef,
    itemsElementsRefs,
  } = useCarouselContext();

  const updateThumbSize = useCallback(() => {
    if (
      !contentElementRef.current ||
      !scrollbarTrackRef.current ||
      !scrollbarThumbRef.current
    ) {
      return;
    }

    const trackWidth = scrollbarTrackRef.current.clientWidth;

    const { clientWidth: contentWidth, scrollWidth: contentScrollWidth } =
      contentElementRef.current;

    const thumbSize = Math.max(
      (contentWidth / contentScrollWidth) * trackWidth,
      MIN_THUMB_SIZE,
    );

    scrollbarThumbRef.current.style.width = `${thumbSize}px`;
  }, [contentElementRef, scrollbarThumbRef, scrollbarTrackRef]);

  const updateThumbPosition = useCallback(() => {
    if (
      !contentElementRef.current ||
      !scrollbarTrackRef.current ||
      !scrollbarThumbRef.current ||
      isDragging
    ) {
      return;
    }

    const {
      clientWidth: contentWidth,
      scrollWidth: contentScrollWidth,
      scrollLeft: contentScrollLeft,
    } = contentElementRef.current;

    const { clientWidth: trackWidth } = scrollbarTrackRef.current;

    const { clientWidth: thumbWidth } = scrollbarThumbRef.current;

    const contentScrollLeftMax = contentScrollWidth - contentWidth;

    const thumbLeftMax = trackWidth - thumbWidth;
    const thumbLeft = (contentScrollLeft / contentScrollLeftMax) * thumbLeftMax;

    scrollbarThumbRef.current.style.left = `${thumbLeft}px`;
  }, [contentElementRef, isDragging, scrollbarThumbRef, scrollbarTrackRef]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (
        !scrollbarThumbRef.current ||
        !scrollbarTrackRef.current ||
        !contentElementRef.current ||
        !thumbOffsetRef.current
      ) {
        return;
      }

      const { scrollWidth: contentScrollWidth, clientWidth: contentWidth } =
        contentElementRef.current;

      const { clientWidth: trackWidth } = scrollbarTrackRef.current;
      const { clientWidth: thumbWidth } = scrollbarThumbRef.current;

      const trackRectangle = scrollbarTrackRef.current.getBoundingClientRect();
      const thumbLeftMax = trackWidth - thumbWidth;
      const clientXRelative =
        clientX - trackRectangle.left - thumbOffsetRef.current;
      const thumbLeft = clamp(clientXRelative, 0, thumbLeftMax);
      const contentScrollLeftMax = contentScrollWidth - contentWidth;
      const contentLeft = (thumbLeft / thumbLeftMax) * contentScrollLeftMax;

      contentElementRef.current.scrollTo({ left: contentLeft });
    },
    [contentElementRef, scrollbarThumbRef, scrollbarTrackRef],
  );

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      handleMove(event.clientX);
    },
    [handleMove],
  );

  const onTouchMove = useCallback(
    (event: TouchEvent) => {
      handleMove(event.touches[0]?.clientX || 0);
    },
    [handleMove],
  );

  const onDragEnd = useCallback(() => {
    setIsDragging(false);

    thumbOffsetRef.current = 0;
    const stopPoints = itemsElementsRefs.current.map(
      (itemRef) => itemRef.offsetLeft,
    );

    const currentScrollLeft = contentElementRef.current?.scrollLeft || 0;
    const closestStopPoint = stopPoints.reduce((previous, current) =>
      Math.abs(current - currentScrollLeft) <
      Math.abs(previous - currentScrollLeft)
        ? current
        : previous,
    );

    contentElementRef.current?.scrollTo({
      left: closestStopPoint,
      behavior: "smooth",
    });

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("mouseup", onDragEnd);
    window.removeEventListener("touchend", onDragEnd);
  }, [
    contentElementRef,
    itemsElementsRefs,
    onMouseMove,
    onTouchMove,
    setIsDragging,
  ]);

  const onDragStart = useCallback(
    (clientX: number) => {
      if (!scrollbarThumbRef.current || !scrollbarTrackRef.current) {
        return;
      }

      setIsDragging(true);

      const thumbRectangle = scrollbarThumbRef.current.getBoundingClientRect();
      thumbOffsetRef.current = clientX - thumbRectangle.left;

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("mouseup", onDragEnd);
      window.addEventListener("touchend", onDragEnd);
    },
    [
      onDragEnd,
      onMouseMove,
      onTouchMove,
      scrollbarThumbRef,
      scrollbarTrackRef,
      setIsDragging,
    ],
  );

  const initialThumb = useEffectEvent(() => {
    updateThumbSize();

    contentElementRef.current?.addEventListener("scroll", updateThumbPosition);
    const contentResizeObserver = new ResizeObserver(updateThumbSize);
    contentResizeObserver.observe(contentElementRef.current!);

    return () => {
      onDragEnd();
      contentResizeObserver.disconnect();
    };
  });
  useEffect(() => {
    initialThumb();
  }, [contentElementRef, updateThumbPosition, updateThumbSize, onDragEnd]);

  const Component = asChild ? Slot : "div";

  if (!isScrollable) {
    return null;
  }

  return (
    <Component
      aria-hidden="true"
      tabIndex={-1}
      className={twMerge(
        "relative h-1 w-1/4 rounded-full bg-primary dark:bg-primary-dark",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
      {...props}
      ref={ref || scrollbarThumbRef}
      onMouseDown={(event) => {
        event.stopPropagation();
        onDragStart(event.clientX);
      }}
      onTouchStart={(event) => {
        event.stopPropagation();
        onDragStart(event.touches[0]?.clientX || 0);
      }}
    />
  );
});

CarouselScrollbarThumb.displayName = "CarouselScrollbarThumb";

export default CarouselScrollbarThumb;
