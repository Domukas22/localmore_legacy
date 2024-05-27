//

import PropTypes from "prop-types";
import { useState, useContext, useEffect } from "react";
import css from "./Profile_PREVIEW.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICON_arrow, ICON_save, ICON_x } from "../icons/icons";

import USE_Toggle from "../../hooks/USE_toggle";
import USE_slideSwiper from "../../hooks/USE_slideSwiper";
import USE_getName from "../../hooks/USE_getName";
import USE_showSwiper from "../../hooks/USE_showSwiper";
import USE_imgAlt from "../../hooks/USE_imgAlt";
import { USE_isProfileNew } from "../../hooks/USE_isProfileNew";

import { New_LABEL } from "../labels/labels";

import { SavedProfileIDs_CONTEXT } from "../../contexts/savedProfiles";
import { Btn, ProfileName_BTN, ProfileSearch_BTN, ShowTags_BTN } from "../btn/btn";

import { profilePreview_TR as tr } from "../../translations";

import "swiper/css";
import "swiper/css/free-mode";

// TODO => implement differnt view grid

export default function Profile_PREVIEW({ profile, SET_panoramas, search, lang }) {
  const [SHOW_tags, TOGGLE_showTags] = USE_Toggle(false);
  const { sliderRef, slide } = USE_slideSwiper();

  const SHOW_swiper = USE_showSwiper(profile);
  const IS_new = USE_isProfileNew(profile);
  const name = USE_getName(profile, lang);
  const img_ALT = USE_imgAlt(profile, lang);

  const images = profile?.img?.["mobile"] || profile?.img?.["desktop"] || [];
  const HAS_panoramas = Object.keys(profile?.img?.panoramas || {})?.length > 0;
  const HAS_tags = profile?.tags?.length > 0;

  const { savedProfile_IDs, ADD_toSaved, REMOVE_fromSaved } = useContext(SavedProfileIDs_CONTEXT);
  const IS_saved = savedProfile_IDs instanceof Set && savedProfile_IDs.has(profile?._id);

  const { arrow_DIRECTION, HANLDE_arrowClick } = USE_arrowSlider();

  return (
    <>
      <article
        className={css.profile_PREVIEW}
        aria-label={
          tr?.profileIntro_ARIA(profile?.name?.[lang], profile?.subname?.[lang])[lang] || "Profile"
        }
      >
        {/* ------------------ header ------------------ */}
        <header className={css.top}>
          {IS_new && <New_LABEL lang={lang} />}
          <div className={css.top_RIGHT}>
            {HAS_tags && (
              <ShowTags_BTN
                onClick={TOGGLE_showTags}
                IS_open={SHOW_tags}
                matchedTags_COUNT={0} // get matching tags count
                lang={lang}
                profile={profile}
              />
            )}
            {HAS_panoramas && (
              <Btn
                styles={["btn-36", "onImg"]}
                onClick={() => SET_panoramas(profile?.img?.panoramas)}
                text={"360"}
                aria_LABEL={tr?.panoramaBtn_ARIA(name)[lang]}
                test_ID="panorama-btn"
              />
            )}
            <Btn
              styles={["btn-36", "onImg", "save"]}
              onClick={() =>
                IS_saved ? REMOVE_fromSaved(profile?._id) : ADD_toSaved(profile?._id)
              }
              saved={IS_saved}
              left_ICON={<ICON_save style={IS_saved ? "active" : "white"} />}
              aria_LABEL={tr?.saveBtn_ARIA(name)[lang]}
              test_ID="save-btn"
            />
          </div>
        </header>

        {/* ------------------ tag overlay ------------------ */}
        <AnimatePresence>
          {SHOW_tags && (
            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ ease: "easeInOut", duration: 0.2 }}
              className={css.tag_PREVIEW}
              data-testid="tag-overlay"
            >
              <Tag_OVERLAY
                profile={profile}
                TOGGLE_showTags={TOGGLE_showTags}
                lang={lang}
                name={name}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ------------------ images ------------------ */}
        {SHOW_swiper.mobile && (
          <CREATE_swiper
            sliderRef={sliderRef}
            images={images}
            img_END={"/Mobile"}
            img_ALT={img_ALT}
          />
        )}
        {!SHOW_swiper.mobile && (
          <img src={images[0] + "/Mobile"} className={css.profile_IMG} alt={img_ALT} />
        )}
        {images.length < 1 && <img className={css.profile_IMG} alt={"No images found"} />}

        {/* ------------------ footer ------------------ */}
        <footer className={css.bottom} data-testid="profile-preview-bottom">
          {(!search || search === "") && (
            <ProfileName_BTN
              name={name}
              aria_LABEL={tr?.visitProfileBtn_ARIA(name)[lang]}
              onClick={() => alert("No function provided")}
            />
          )}
          {search && search !== "" && (
            <ProfileSearch_BTN
              name={name}
              search={search}
              aria_LABEL={tr?.visitProfileBtn_ARIA(name)[lang]}
              onClick={() => alert("No function provided")}
            />
          )}
          {SHOW_swiper.mobile && (
            <div
              className={css.slider_ARROWS}
              data-arrowmove={arrow_DIRECTION}
              data-testid="swiper-arrows"
            >
              <Btn
                styles={["btn-36", "onImg", "round", "prev"]}
                onClick={() => {
                  HANLDE_arrowClick("prev", slide);
                }}
                right_ICON={<ICON_arrow direction="left" color="white" />}
                aria_LABEL={tr?.prevImageBtn_ARIA(name)[lang]}
                data-testid="arrow-prev"
              />
              <Btn
                styles={["btn-36", "onImg", "round", "next"]}
                onClick={() => {
                  HANLDE_arrowClick("next", slide);
                }}
                right_ICON={<ICON_arrow direction="right" color="white" />}
                aria_LABEL={tr?.nextImageBtn_ARIA(name)[lang]}
                data-testid="arrow-prev"
              />
            </div>
          )}
        </footer>
      </article>
    </>
  );
}

function CREATE_swiper({ sliderRef, images, img_END, img_ALT }) {
  return (
    <Swiper
      loop={true}
      ref={sliderRef}
      speed={500}
      data-testid="swiper"
      lazyPreloadPrevNext={4}
      // style={{ overflow: "visible" }}
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <img src={img + img_END} className={css.profile_IMG} alt={img_ALT} loading="lazy" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function Tag_OVERLAY({ profile, TOGGLE_showTags, lang, name }) {
  return (
    <>
      <div className={css.tagPreview_TOP}>
        <h4>{tr?.tagsOverlay_TITLE(profile?.tags?.length, name ? name : undefined)[lang]}</h4>
        <Btn
          styles={["btn-36", "onImg", "close"]}
          onClick={TOGGLE_showTags}
          right_ICON={<ICON_x />}
          aria_LABEL={tr?.hideTagsBtn_ARIA(name)[lang]}
          test_ID={"close-tag-overlay-btn"}
        />
      </div>
      <motion.ul key={profile?._id} className={css.tagPreview_BOTTOM}>
        {profile?.tags?.map((tag, index) => {
          return (
            <motion.li
              key={tag._id}
              initial={{ y: 20 + index }}
              animate={{ y: [20 + index, -4, 0] }}
              transition={{
                ease: "easeIn",
                times: [0, 0.7, 1],
                // duration: 0.3,
                duration: 0.3,
                // delay: (index + 1) * 0.02,
                delay: (index + 1) * 0.02,
              }}
            >
              {console.log((index + 1) * 0.02)}
              <Btn
                key={tag._id}
                styles={["btn-36", "onImg", "round"]}
                leftIcon_URL={tag.icon?.url ? tag.icon?.url : ""}
                right_ICON={<ICON_x rotate={true} />}
                text={tag.name?.en}
                aria_LABEL={tr?.filterTagBtn_ARIA(tag.name?.[lang])[lang]}
                onClick={() => alert("No function provided")}
                test_ID={"overlay-tag-btn"}
              />
            </motion.li>
          );
        })}
      </motion.ul>
    </>
  );
}
function USE_arrowSlider(initialDirection = "") {
  const [arrow_DIRECTION, SET_arrowDirection] = useState(initialDirection);
  const [ARE_arrowsDisabled, SET_arrowsDisabled] = useState(false);

  const HANLDE_arrowClick = (direction, slide) => {
    if (ARE_arrowsDisabled) return;
    SET_arrowsDisabled(true);
    slide(direction);
    SET_arrowDirection(direction);
    setTimeout(() => {
      SET_arrowDirection("");
      SET_arrowsDisabled(false);
    }, 499); // Adjust the delay as needed
  };

  return { arrow_DIRECTION, HANLDE_arrowClick };
}

Profile_PREVIEW.propTypes = {
  profile: PropTypes.object.isRequired,
  SET_panoramas: PropTypes.func.isRequired,
  search: PropTypes.string,
  lang: PropTypes.string.isRequired,
};

CREATE_swiper.propTypes = {
  sliderRef: PropTypes.object.isRequired,
  images: PropTypes.array.isRequired,
  img_END: PropTypes.string.isRequired,
  img_ALT: PropTypes.string.isRequired,
};

Tag_OVERLAY.propTypes = {
  profile: PropTypes.object.isRequired,
  TOGGLE_showTags: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  name: PropTypes.string,
};
