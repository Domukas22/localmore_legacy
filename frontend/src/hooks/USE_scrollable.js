import { useRef, useState, useCallback } from "react";

export default function USE_scrollable() {
  const scrollable = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scroll_START, SET_scrollStart] = useState(true);
  const [scroll_END, SET_scrollEnd] = useState(false);

  const HANDLE_arrowVisibility = useCallback(
    (scrolled) => {
      if (scrollable.current) {
        if (scrolled <= 0) {
          SET_scrollStart(true);
        } else {
          SET_scrollStart(false);
        }
        if (scrolled >= scrollable.current.scrollWidth - scrollable.current.clientWidth) {
          SET_scrollEnd(true);
        } else {
          SET_scrollEnd(false);
        }
      }
    },
    [scrollable]
  );

  const HANDLE_mouseDown = (event) => {
    setMouseDown(true);
    setStartX(event.pageX - scrollable.current.offsetLeft);
    setScrollLeft(scrollable.current.scrollLeft);
  };

  const HANDLE_mouseMove = (event) => {
    if (!mouseDown) return;
    event.preventDefault();
    const x = event.pageX - scrollable.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust the scrolling speed here
    const result = scrollLeft - walk;
    scrollable.current.scrollLeft = result;
    HANDLE_arrowVisibility(result);
  };

  const HANDLE_mouseUp = () => {
    setMouseDown(false);
  };

  const scroll = (scrollOffset) => {
    if (scrollable.current) {
      scrollable.current.style.scrollBehavior = "smooth";
      const x = scrollable.current.scrollLeft + scrollOffset;
      scrollable.current.scrollLeft = x > 0 ? x : 0;
      scrollable.current.style.scrollBehavior = "auto";
      HANDLE_arrowVisibility(x > 0 ? x : 0);
    }
  };

  return {
    scrollable,
    HANDLE_mouseDown,
    HANDLE_mouseMove,
    HANDLE_mouseUp,
    scroll,
    scroll_START,
    scroll_END,
    HANDLE_arrowVisibility,
  };
}
