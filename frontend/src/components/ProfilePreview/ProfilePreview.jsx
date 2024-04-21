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

  return (
    <div className={css.profile_PREVIEW}>
      {/* <img src={profile.img.desktop[0] + "/Big"} className={css.profile_IMG} alt="" /> */}
      <Swiper slidesPerView={1} loop={true}>
        {profile.img.desktop.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img + "/Big"} className={css.profile_IMG} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={css.top}>
        {IS_new && <div className={css.labelNew}>New</div>}
        <Btn_showIcons icons={profile.tags.map((t) => t.icon.url)} profile_ID={profile._id} />
      </div>
      <div className={css.bottom}>
        <Btn_text name={profile.name.en} subname={profile.subname.en} />
        {Object.keys(profile.img.panoramas).length > 0 && (
          <Btn
            styles={["btn-36", "onImg", "rainbow"]}
            onClick={() => OPEN_panorama(profile.img.panoramas)}
            text={"360"}
          />
        )}
        <Btn styles={["btn-36", "onImg"]} onClick={() => ""} left_ICON={save} />
      </div>
    </div>
  );
}
