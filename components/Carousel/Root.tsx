"use client";

import {
  useContext,
  useRef,
  createContext,
  useState,
  useMemo,
  forwardRef,
  type RefObject,
  type SetStateAction,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";

type ContentPosition = "start" | "center" | "end";

export interface CarouselContextValue {
  isDragging: boolean;
  setIsDragging: (value: SetStateAction<boolean>) => void;
  isScrollable: boolean;
  setIsScrollable: (value: SetStateAction<boolean>) => void;
  contentPosition: ContentPosition;
  setContentPosition: (value: SetStateAction<ContentPosition>) => void;
  contentElementRef: RefObject<HTMLUListElement | null>;
  itemsElementsRefs: RefObject<HTMLLIElement[]>;
  scrollbarTrackRef: RefObject<HTMLDivElement | null>;
  scrollbarThumbRef: RefObject<HTMLDivElement | null>;
}

const CarouselContext = createContext<CarouselContextValue>({
  isDragging: false,
  isScrollable: true,
  setIsDragging: () => null,
  setIsScrollable: () => null,
  contentPosition: "start",
  setContentPosition: () => null,
  contentElementRef: { current: null },
  itemsElementsRefs: { current: [] },
  scrollbarTrackRef: { current: null },
  scrollbarThumbRef: { current: null },
});

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (context === null) {
    throw new Error("useCarouselContext must be used within a <CarouselRoot>");
  }

  return context;
};

export interface CarouselRootProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const CarouselRoot = forwardRef<HTMLDivElement, CarouselRootProps>(
  ({ asChild, className, ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);
    const [contentPosition, setContentPosition] =
      useState<ContentPosition>("start");

    const contentElementRef = useRef<HTMLUListElement | null>(null);
    const scrollbarTrackRef = useRef<HTMLDivElement | null>(null);
    const scrollbarThumbRef = useRef<HTMLDivElement | null>(null);
    const itemsElementsRefs = useRef<HTMLLIElement[]>([]);

    const contextValue: CarouselContextValue = useMemo(
      () => ({
        isDragging,
        setIsDragging,
        isScrollable,
        setIsScrollable,
        contentPosition,
        setContentPosition,
        contentElementRef,
        itemsElementsRefs,
        scrollbarTrackRef,
        scrollbarThumbRef,
      }),
      [contentPosition, isDragging, isScrollable],
    );

    const Component = asChild ? Slot : "div";
    return (
      <CarouselContext.Provider value={contextValue}>
        <Component
          className={twMerge(
            "relative flex w-full flex-col gap-6",
            isDragging && "cursor-grabbing select-none",
            className,
          )}
          {...props}
          ref={ref}
        />
      </CarouselContext.Provider>
    );
  },
);

CarouselRoot.displayName = "CarouselRoot";

export default CarouselRoot;
