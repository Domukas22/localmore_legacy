//

import { useRef, useCallback } from "react";

export default function USE_slideSwiper() {
  const sliderRef = useRef(null);

  const slide = useCallback((direction) => {
    if (!sliderRef.current) return;
    direction === "next"
      ? sliderRef.current.swiper.slideNext()
      : sliderRef.current.swiper.slidePrev();
  }, []);

  return { sliderRef, slide };
}
