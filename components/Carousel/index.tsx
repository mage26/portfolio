import Content, { CarouselContentProps } from "./Content";
import Item, { CarouselItemProps } from "./Item";
import Root, { useCarouselContext, CarouselRootProps } from "./Root";
import ScrollbarRoot, { CarouselScrollbarRootProps } from "./ScrollbarRoot";
import ScrollbarTrack, { CarouselScrollbarTrackProps } from "./ScrollbarTrack";
import ScrollbarThumb, { CarouselScrollbarThumbProps } from "./ScrollbarThumb";
import ControlForward, { CarouselControlForwardProps } from "./ControlForward";
import ControlBack, { CarouselControlBackProps } from "./ControlBack";
const Carousel = {
  Content,
  Item,
  Root,
  ScrollbarRoot,
  ScrollbarThumb,
  ScrollbarTrack,
  ControlForward,
  ControlBack,
};

export { useCarouselContext };

export type {
  CarouselContentProps,
  CarouselItemProps,
  CarouselRootProps,
  CarouselScrollbarRootProps,
  CarouselScrollbarThumbProps,
  CarouselScrollbarTrackProps,
  CarouselControlForwardProps,
  CarouselControlBackProps,
};

export default Carousel;
