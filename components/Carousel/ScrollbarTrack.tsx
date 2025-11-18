'use client';

import { Slot } from '@radix-ui/react-slot';
import { forwardRef, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

import { useCarouselContext } from './Root';

export interface CarouselScrollbarTrackProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean;
}

const CarouselScrollbarTrack = forwardRef<HTMLDivElement, CarouselScrollbarTrackProps>(({
    asChild = false, className, ...props
}, ref) => {
    const { 
        scrollbarTrackRef,
        scrollbarThumbRef,
        contentElementRef,
        isDragging,
        isScrollable,
    } = useCarouselContext();

    const handleThumbJump = useCallback((clientX: number) => {
        if(
            !scrollbarTrackRef.current || !scrollbarThumbRef.current ||
            !contentElementRef.current || isDragging
        ) { return; }

        const { scrollWidth: contentScrollWidth } = contentElementRef.current;
        const { clientWidth: trackWidth } = scrollbarTrackRef.current;

        const trackRectangle = scrollbarTrackRef.current?.getBoundingClientRect();
        const clientXRelative = clientX - trackRectangle.left;
        const contentLeft = (clientXRelative / trackWidth) * contentScrollWidth;

        contentElementRef.current.scrollTo({ left: contentLeft });
    }, [contentElementRef, isDragging, scrollbarThumbRef, scrollbarTrackRef]);

    const Component = asChild ? Slot : 'div';

    if(!isScrollable) { return null; }

    return (
        <Component
            aria-hidden="true"
            tabIndex={-1}
            className={twMerge(
                'group relative w-full bg-white cursor-pointer rounded-full',
                className,
            )}
            {...props}
            ref={ref || scrollbarTrackRef}
            onMouseDown={(event) => {
                event.stopPropagation();
                handleThumbJump(event.clientX);
            }}
            onTouchStart={(event) => {
                event.stopPropagation();
                handleThumbJump(event.touches[0]?.clientX || 0);
            }}
        />
    )
})

CarouselScrollbarTrack.displayName = "CarouselScrollbarTrack";

export default CarouselScrollbarTrack;