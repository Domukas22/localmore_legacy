//

import { useState, useRef, useCallback, useEffect } from "react";

import css from "./ProfilePreview.module.css";
import { Btn, Btn_text } from "../btn/btn";

import plus from "./plus.svg";
import arrowRight from "./ar_ri.svg";
import arrowLeft from "./ar_le.svg";
import save from "./Save.png";
import cssBtn from "../btn/btn.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export default function ProfilePreview({ profile, OPEN_panorama }) {
  const scrollable = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [scroll_START, SET_scrollStart] = useState(true);
  const [scroll_END, SET_scrollEnd] = useState(false);

  const IS_new = (new Date() - new Date(profile.createdAt)) / (1000 * 60 * 60) <= 72; // 72 hours

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
  const scroll = (scrollOffset) => {
    if (scrollable.current) {
      scrollable.current.style.scrollBehavior = "smooth";
      const x = scrollable.current.scrollLeft + scrollOffset;
      scrollable.current.scrollLeft = x > 0 ? x : 0;
      scrollable.current.style.scrollBehavior = "auto";
      HANDLE_arrowVisibility(x > 0 ? x : 0);
    }
  };

  return (
    <div className={css.profile_PREVIEW}>
      <img src={profile.img.desktop[0] + "/Big"} className={css.profile_IMG} alt="" />
      <div className={css.top}>
        <div className={css.top_LEFT}>{IS_new && <div className={css.labelNew}>New</div>}</div>
        <div className={css.top_RIGHT}>
          {Object.keys(profile.img.panoramas).length > 0 && (
            <Btn
              styles={["btn-40", "onImg", "rainbow"]}
              onClick={() => OPEN_panorama(profile.img.panoramas)}
              text={"360"}
            />
          )}
          <Btn styles={["btn-40", "onImg"]} onClick={() => ""} left_ICON={save} />
        </div>
      </div>
      <div className={css.bottom}>
        <div
          className={css.bottom_LEFT}
          ref={scrollable}
          onMouseDown={HANDLE_mouseDown}
          onMouseLeave={() => setMouseDown(false)}
          onMouseUp={() => setMouseDown(false)}
          onMouseMove={HANDLE_mouseMove}
        >
          <Btn_text name={profile.name.en} subname={profile.subname.en} />
          {profile.tags.map((tag) => {
            return (
              <Btn
                key={tag._id}
                styles={["btn-40", "onImg", "round"]}
                text={tag.name.en}
                left_ICON={tag.icon.url}
                right_ICON={plus}
              />
            );
          })}
        </div>

        {window.innerWidth >= 1000 && (
          <Btn
            styles={["btn-40", "onImg", "round", `${scroll_START && "disabled"}`]}
            right_ICON={arrowLeft}
            onClick={() => scroll(-200)}
          />
        )}
        {window.innerWidth >= 1000 && (
          <Btn
            styles={["btn-40", "onImg", "round", `${scroll_END && "disabled"}`]}
            right_ICON={arrowRight}
            onClick={() => scroll(200)}
          />
        )}
      </div>
    </div>
  );
}
