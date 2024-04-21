//

import { useState, useRef, useCallback, useEffect } from "react";

import css from "./ProfilePreview.module.css";
import { Btn, Btn_text, Btn_showIcons } from "../btn/btn";

import plus from "./plus.svg";
import arrowRight from "./ar_ri.svg";
import arrowLeft from "./ar_le.svg";
import save from "./Save.png";
import cssBtn from "../btn/btn.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export default function ProfilePreview({ profile, OPEN_panorama, windowWidth }) {
  const IS_new = (new Date() - new Date(profile.createdAt)) / (1000 * 60 * 60) <= 72; // 72 hours
  const sliderRef = useRef(null);
  const [SHOW_tags, SET_showTags] = useState(false);

  const TOGGLE_showTags = useCallback(() => {
    SET_showTags((prev) => !prev);
  }, []);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className={css.profile_PREVIEW}>
      <Swiper
        slidesPerView={1}
        loop={true}
        navigation={{
          prevEl: ".prev",
          nextEl: ".next",
        }}
        ref={sliderRef}
        speed={700}
      >
        {profile.img.desktop.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img + "/Big"} className={css.profile_IMG} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={css.top}>
        {IS_new && <div className={css.labelNew}>New</div>}
        <div className={css.top_RIGHT}>
          <Btn_showIcons
            icons={profile.tags.map((t) => t.icon.url)}
            profile_ID={profile._id}
            onClick={() => {
              TOGGLE_showTags();
            }}
          />
          {Object.keys(profile.img.panoramas).length > 0 && (
            <Btn
              styles={["btn-36", "onImg"]}
              onClick={() => OPEN_panorama(profile.img.panoramas)}
              text={"360"}
            />
          )}

          <Btn styles={["btn-36", "onImg"]} onClick={() => ""} left_ICON={save} />
        </div>
      </div>
      <div className={css.bottom}>
        <Btn_text name={profile.name.en} subname={profile.subname.en} />
        {profile.img.desktop && profile.img.desktop.length > 1 && (
          <>
            <Btn
              styles={["btn-36", "onImg", "round", "prev"]}
              onClick={() => handlePrev()}
              left_ICON={arrowLeft}
            />
            <Btn
              styles={["btn-36", "onImg", "round", "next"]}
              onClick={() => handleNext()}
              left_ICON={arrowRight}
            />
          </>
        )}
      </div>
      {SHOW_tags && (
        <div className={css.tag_PREVIEW}>
          <div className={css.tagPreview_TOP}>
            <h4>Tags of {profile.name.en}</h4>
            <div onClick={() => TOGGLE_showTags()}>Close</div>
          </div>
          <div className={css.tagPreview_BOTTOM}>
            {profile.tags.map((tag) => {
              return (
                <Btn
                  key={tag._id}
                  styles={["btn-36", "onImg", "round"]}
                  onClick={() => ""}
                  left_ICON={tag.icon.url}
                  right_ICON={plus}
                  text={tag.name.en}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
