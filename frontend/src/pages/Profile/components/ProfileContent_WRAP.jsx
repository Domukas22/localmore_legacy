//
//

import css from "./ProfileContent_WRAP.module.css";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Btn } from "../../../components/Btn/Btn";
import {
  ICON_3dots,
  ICON_arrow,
  ICON_leavePage,
  ICON_proCon,
  ICON_save,
} from "../../../components/icons/icons";

import { HeartConfetti } from "../../../components/HeartConfetti/HeartConfetti";
import USE_slideSwiper from "../../../hooks/USE_slideSwiper";
import { useCallback, useContext, useMemo, useState } from "react";
import { SavedProfileIDs_CONTEXT } from "../../../contexts/savedProfiles";
import { ProfileMore_DD } from "../../../components/DD/Dropdowns/ProfileMore_DD/ProfileMore_DD";
import { USE_windowSize } from "../../../hooks/USE_windowWidth";

export function ProfileContent_WRAP({ profile }) {
  const [SHOW_hearts, SET_showHearts] = useState(false);
  const { savedProfile_IDs, ADD_toSaved, REMOVE_fromSaved } = useContext(SavedProfileIDs_CONTEXT);
  const { width } = USE_windowSize();

  const HANDLE_save = useCallback(
    (action) => {
      if (action === "save") {
        ADD_toSaved(profile?._id);
        SET_showHearts(true);
      } else if (action === "delete") {
        REMOVE_fromSaved(profile?._id);
        SET_showHearts(false);
      }
    },
    [ADD_toSaved, REMOVE_fromSaved, profile?._id]
  );

  const mob_IMAGES = profile?.img?.["mobile"] || profile?.img?.["desktop"] || [];

  // const bg_BLUR = useMemo(
  //   () => (profile?.img?.blur ? { backgroundImage: `url(${profile.img.blur})` } : {}),
  //   [profile]
  // );

  return (
    <div className={css.all_WRAP}>
      <div className={css.img_WRAP}>
        <CREATE_swiper
          images={(width > 700 ? profile?.img?.["desktop"] : profile?.img?.["mobile"]) || []}
          img_END={width > 700 ? "/Big" : "/Mobile"}
          hover={profile?.hover}
          SHOW_hearts={SHOW_hearts}
          width={width}
        />

        <div className={css.name_BOX} style={{ backgroundImage: `url(${profile?.img?.blur})` }}>
          <div className={css.left}>
            <h1>{profile?.name?.en}</h1>
            <p>{profile?.subname?.en}</p>
          </div>
          <div className={css.right}>
            <Btn
              styles={["btn-40", "onBlur"]}
              left_ICON={<ICON_save color="white" />}
              onClick={() => {}}
            />
            {width > 700 && <ProfileMore_DD align="right" />}
            {width <= 700 && (
              <Btn
                styles={["btn-40", "onBlur"]}
                left_ICON={<ICON_3dots color="white" />}
                onClick={() => {}}
              />
            )}
            <Btn
              styles={["btn-40", "brand", `${width < 500 && "flex"}`]}
              text="Landkarte"
              right_ICON={<ICON_leavePage color="white" />}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
      <div className={css.info_WRAP}>
        {width > 900 && (
          <div className={css.info_LOWER}>
            <div className={css.left}>
              <section>
                <h4>Tags von {profile?.name?.en}</h4>
                <div className={css.tag_WRAP}>
                  {profile?.tags?.map((tag, i) => (
                    <Btn
                      key={i}
                      styles={["btn-36", "grey", "round"]}
                      left_ICON={<img src={tag.icon.url} />}
                      text={tag.name.en}
                      onClick={() => {}}
                    />
                  ))}
                </div>
              </section>
              <section>
                <h4>{profile?.about_TITLE?.en}</h4>
                <p>{profile?.about_PARAG?.en}</p>
              </section>
            </div>
            <div className={css.right}>
              <section>
                <h4>Vor- und Nachteile</h4>
                <ul className={css.proCon_UL}>
                  {profile?.pros?.map((pro, i) => (
                    <li key={i}>
                      <ICON_proCon IS_pro={true} />
                      {pro.en}
                    </li>
                  ))}
                  {profile?.cons?.map((con, i) => (
                    <li key={i}>
                      <ICON_proCon IS_pro={false} />
                      {con.en}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <div>
                  <h4>Kurze Infos</h4>
                  <p>
                    Adresse: {profile?.adress?.region}, {profile?.adress?.street}
                  </p>
                </div>
              </section>
            </div>
          </div>
        )}
        {width <= 900 && (
          <div className={css.info_LOWER}>
            <section>
              <h4>Vor- und Nachteile</h4>
              <ul className={css.proCon_UL}>
                {profile?.pros?.map((pro, i) => (
                  <li key={i}>
                    <ICON_proCon IS_pro={true} />
                    {pro.en}
                  </li>
                ))}
                {profile?.cons?.map((con, i) => (
                  <li key={i}>
                    <ICON_proCon IS_pro={false} />
                    {con.en}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h4>Tags von {profile?.name?.en}</h4>
              <div className={css.tag_WRAP}>
                {profile?.tags?.map((tag, i) => (
                  <Btn
                    key={i}
                    styles={["btn-36", "grey", "round"]}
                    left_ICON={<img src={tag.icon.url} />}
                    text={tag.name.en}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </section>
            <section>
              <div>
                <h4>Kurze Infos</h4>
                <p>
                  Adresse: {profile?.adress?.region}, {profile?.adress?.street}
                </p>
              </div>
            </section>
            <section>
              <h4>{profile?.about_TITLE?.en}</h4>
              <p>{profile?.about_PARAG?.en}</p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function CREATE_swiper({ images, img_END, hover, SHOW_hearts, width }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { sliderRef, slide } = USE_slideSwiper();

  return (
    <Swiper
      // loop={true}
      ref={sliderRef}
      pagination={true}
      modules={[Pagination]}
      speed={700}
      data-testid="swiper"
      lazyPreloadPrevNext={4}
      data-target="swiper"
      data-hover={hover}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      className="profile_SWIPER"
    >
      {/* <div className="bottom-left">
        <div className={css.corner_BOX}>
          <Btn
            styles={["btn-44", "onImg", "round"]}
            text={activeIndex + 1 + " / " + images?.length}
            onClick={(e) => {}}
          />
        </div>
      </div> */}
      <div className="bottom-right">
        <div className={css.corner_BOX}>
          {width > 900 && (
            <>
              <Btn
                styles={["btn-44", "onImg", "round", `${activeIndex === 0 ? "disabled" : ""}`]}
                right_ICON={<ICON_arrow color="white" direction="left" />}
                onClick={(e) => {
                  slide("prev");
                }}
              />
              <Btn
                styles={[
                  "btn-44",
                  "onImg",
                  "round",
                  `${activeIndex === images?.length - 1 ? "disabled" : ""}`,
                ]}
                right_ICON={<ICON_arrow color="white" direction="right" />}
                onClick={() => {
                  slide("next");
                }}
              />
            </>
          )}
          <Btn
            styles={["btn-44", "onImg", "round"]}
            text={activeIndex + 1 + " / " + images?.length}
            onClick={(e) => {}}
          />
        </div>
      </div>

      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <img src={img + img_END} className={css.profile_IMG} data-normal="true" />
        </SwiperSlide>
      ))}
      <HeartConfetti SHOW_hearts={SHOW_hearts} />
    </Swiper>
  );
}
