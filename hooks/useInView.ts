import { useEffect, useRef, useCallback } from "react";
import debounce from "debounce";

const DATA_INVIEW = "data-inview";
const DATA_INVIEW_OFFSET = "data-inview-offset";
const DATA_INVIEW_LOCK_CLASSNAME = "inview-is-set";

const callback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) =>
  entries.forEach((entry) => {
    const inView = entry.isIntersecting;

    if (!inView) {
      return;
    }

    entry.target.classList.add("is-inview");

    observer.unobserve(entry.target);
  });

const useInView = (pathname: string) => {
  const trackersMap = useRef(new Map());

  const resetElements = useCallback(() => {
    const nodesList = document.querySelectorAll(
      `[${DATA_INVIEW}]`,
    ) as NodeListOf<HTMLElement>;

    const elements = new Set<HTMLElement>();

    nodesList.forEach((element) => {
      elements.add(element);
    });

    nodesList.forEach((element) => {
      const bottomMargin = element.getAttribute(DATA_INVIEW_OFFSET) || "0px";

      const rootMargin = `0px 0px -${bottomMargin} 0px`;
      const options = {
        rootMargin,
      };

      const key = rootMargin;

      if (trackersMap.current.has(key)) {
        const trackingItem = trackersMap.current.get(key);
        trackingItem.elements.add(element);
      } else {
        const observer = new IntersectionObserver(callback, options);

        trackersMap.current.set(key, {
          observer,
          elements: new Set([element]),
        });
      }
    });

    trackersMap.current.forEach((tracker, trackerKey) => {
      tracker.elements.forEach((element: HTMLElement) => {
        if (elements.has(element)) {
          tracker.observer.observe(element);
        } else {
          tracker.observer.unobserve(element);
          tracker.elements.delete(element);
        }
      });

      if (tracker.elements.size === 0) {
        tracker.observer.disconnect();

        trackersMap.current.delete(trackerKey);
      }
    });
  }, []);

  const resetTrackers = useCallback(() => {
    trackersMap.current.forEach((tracker, trackerKey) => {
      tracker.elements.forEach((element: HTMLElement) => {
        tracker.observer.unobserve(element);
        tracker.elements.delete(element);
      });
      tracker.observer.disconnect();
      trackersMap.current.delete(trackerKey);
    });
  }, []);

  useEffect(() => {
    if (window.document.body.classList.contains(DATA_INVIEW_LOCK_CLASSNAME)) {
      return () => false;
    }

    window.document.body.classList.add(DATA_INVIEW_LOCK_CLASSNAME);

    const debounceResetElements = debounce(resetElements, 200);

    window.addEventListener("resize", debounceResetElements);

    resetElements();

    return () => {
      resetTrackers();
      window.removeEventListener("resize", debounceResetElements);

      window.document.body.classList.remove(DATA_INVIEW_LOCK_CLASSNAME);
    };
  }, [resetTrackers, resetElements]);

  useEffect(() => {
    resetTrackers();

    resetElements();
  }, [pathname, resetTrackers, resetElements]);
};

export default useInView;
