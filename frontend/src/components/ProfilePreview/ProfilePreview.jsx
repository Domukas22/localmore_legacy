//

import { useState, useRef, useCallback } from "react";
import css from "./ProfilePreview.module.css";
import { Btn, Btn_text, Btn_showIcons } from "../btn/btn";

import plus from "./plus.svg";
import arrowRight from "./ar_ri.svg";
import arrowLeft from "./ar_le.svg";
import save from "./Save.png";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";

export default function ProfilePreview({ profile, OPEN_panorama, windowWidth }) {
  const IS_new = (new Date() - new Date(profile.createdAt)) / (1000 * 60 * 60) <= 72; // 72 hours
  const sliderRef = useRef(null);
  const [SHOW_tags, SET_showTags] = useState(false);

  const TOGGLE_showTags = useCallback(() => {
    SET_showTags((prev) => !prev);
  }, []);

  const slide = useCallback((direction) => {
    if (!sliderRef.current) return;
    if (direction === "next") sliderRef.current.swiper.slideNext();
    if (direction === "prev") sliderRef.current.swiper.slidePrev();
  }, []);

  // CREATE_previewTop(profile_ID, IS_new, tags, TOGGLE_showTags, panoramas, OPEN_panorama)
  return (
    <div className={css.profile_PREVIEW}>
      {console.log(profile.img)}
      {CREATE_swiper({
        sliderRef,
        images: profile.img[windowWidth > 700 ? "desktop" : "mobile"],
        img_END: windowWidth > 700 ? "/Big" : "/Mobile",
      })}
      {CREATE_previewTop({
        profile_ID: profile._id,
        IS_new,
        tags: profile.tags,
        TOGGLE_showTags,
        panorama_OBJs: profile.img.panoramas,
        OPEN_panorama,
        windowWidth,
      })}
      {CREATE_previewBottom({
        slide,
        HAS_swiper: profile.img.desktop && profile.img.desktop.length > 1,
        name_OBJ: profile.name,
      })}
      {SHOW_tags &&
        CREATE_tagPreview({ tags: profile.tags, name: profile.name.en, TOGGLE_showTags })}
    </div>
  );
}

function CREATE_swiper({ sliderRef, images, img_END }) {
  return (
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
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <img src={img + img_END} className={css.profile_IMG} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
function CREATE_previewTop({
  profile_ID,
  IS_new,
  tags,
  TOGGLE_showTags,
  panorama_OBJs,
  OPEN_panorama,
  windowWidth,
}) {
  return (
    <div className={css.top}>
      {IS_new && <div className={css.labelNew}>New</div>}
      <div className={css.top_RIGHT}>
        <Btn_showIcons
          icons={tags.map((t) => t.icon.url)}
          profile_ID={profile_ID}
          onClick={() => {
            TOGGLE_showTags();
          }}
          iconCount={windowWidth > 1200 ? 5 : 3}
        />
        {Object.keys(panorama_OBJs).length > 0 && (
          <Btn
            styles={["btn-36", "onImg"]}
            onClick={() => OPEN_panorama(panorama_OBJs)}
            text={"360"}
          />
        )}

        <Btn styles={["btn-36", "onImg"]} onClick={() => ""} left_ICON={save} />
      </div>
    </div>
  );
}
function CREATE_previewBottom({ slide, HAS_swiper, name_OBJ }) {
  return (
    <div className={css.bottom}>
      <Btn_text name={name_OBJ.en} subname={name_OBJ.en} />
      {HAS_swiper && (
        <>
          <Btn
            styles={["btn-36", "onImg", "round", "prev"]}
            onClick={() => slide("prev")}
            left_ICON={arrowLeft}
          />
          <Btn
            styles={["btn-36", "onImg", "round", "next"]}
            onClick={() => slide("next")}
            left_ICON={arrowRight}
          />
        </>
      )}
    </div>
  );
}
function CREATE_tagPreview({ tags, name, TOGGLE_showTags }) {
  return (
    <div className={css.tag_PREVIEW}>
      <div className={css.tagPreview_TOP}>
        <h4>Tags of {name}</h4>
        <div onClick={() => TOGGLE_showTags()}>Close</div>
      </div>
      <div className={css.tagPreview_BOTTOM}>
        {tags.map((tag) => {
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
  );
}
