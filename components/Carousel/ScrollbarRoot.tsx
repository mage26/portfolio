import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";

export interface CarouselScrollbarRootProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const CarouselScrollbarRoot = forwardRef<
  HTMLDivElement,
  CarouselScrollbarRootProps
>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      aria-hidden="true"
      className={twMerge(
        "group relative -my-4 w-full py-4 duration-200 ease-in-out hover:scale-y-150",
        className,
      )}
      {...props}
      ref={ref}
    />
  );
});

CarouselScrollbarRoot.displayName = "CarouselScrollbarRoot";

export default CarouselScrollbarRoot;
