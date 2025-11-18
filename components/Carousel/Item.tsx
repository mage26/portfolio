'use client';

import { Slot } from '@radix-ui/react-slot';
import { useEffect, useCallback, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { useCarouselContext } from './Root';

export interface CarouselItemProps extends React.HTMLAttributes<HTMLLIElement> {
    asChild?: boolean;
    onPositionChange?: (position: number) => void;
}

const CarouselItem = ({
    className, asChild = false, onPositionChange, ...props
}: CarouselItemProps) => {
    const { itemsElementsRefs, contentElementRef } = useCarouselContext();
    const itemRef = useRef<HTMLLIElement | null>(null);

    const Component = asChild ? Slot :  'li';

    const handleContentScroll = useCallback(() => {
        if(!contentElementRef.current || !itemRef.current || !onPositionChange) {
            return;
        }

        const {
            width: contentWidth,
            left: contentLeft,
        } = contentElementRef.current.getBoundingClientRect();

        const { width: itemWidth, left: itemLeft} = itemRef.current.getBoundingClientRect();

        const positionLeft = itemLeft - contentLeft;

        const itemWidthPercentage = itemWidth / contentWidth;

        const positionLeftPercentage = positionLeft / contentWidth + itemWidthPercentage / 2;

        const position = positionLeftPercentage.toFixed(2);

        onPositionChange(Number(position));
    }, [contentElementRef, onPositionChange]);

    useEffect(() => {
        contentElementRef.current?.addEventListener(
            'scroll',
            handleContentScroll,
        );
        handleContentScroll();
    }, [contentElementRef, handleContentScroll]);

    return (
        <Component  
            className={twMerge('relative w-full shrink-0 snap-start', className)}
            {...props}
            ref={(ref) => {
                if (!ref || itemsElementsRefs.current.includes(ref)) {
                    return;
                }
                itemsElementsRefs.current?.push(ref);
                itemRef.current = ref as HTMLLIElement;
            }}
        />
    )
}

CarouselItem.displayName = 'CarouselItem';

export default CarouselItem;