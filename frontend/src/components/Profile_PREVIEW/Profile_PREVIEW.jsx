//

import PropTypes from "prop-types";
import { useState, useRef, useCallback, useContext, useEffect } from "react";
import css from "./Profile_PREVIEW.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICON_arrow, ICON_save, ICON_x } from "../icons/icons";

import { SavedProfileIDs_CONTEXT } from "../../contexts/savedProfiles";
import { Btn, ProfileName_BTN, ProfileSearch_BTN, ShowTags_BTN } from "../btn/btn";

import "swiper/css";
import "swiper/css/free-mode";

// TODO => implement differnt view grid

export default function Profile_PREVIEW({ profile, SET_panoramas, search, lang, tr, global_TR }) {
  const sliderRef = useRef(null);
  const [SHOW_tags, SET_showTags] = useState(false);
  const SHOW_swiper = profile?.img?.mobile && profile?.img?.mobile.length > 1;

  const TOGGLE_showTags = useCallback(() => {
    SET_showTags((prev) => !prev);
  }, []);

  const slide = useCallback((direction) => {
    if (!sliderRef.current) return;
    direction === "next"
      ? sliderRef.current.swiper.slideNext()
      : sliderRef.current.swiper.slidePrev();
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const visibleIcon_COUNT = windowWidth > 400 ? 3 : windowWidth > 380 ? 2 : 1;

  useEffect(function HANDLE_windowSize() {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const name = profile?.name?.[lang] && profile?.name?.[lang] !== "" && profile?.name?.[lang];

  return (
    <>
      <article
        className={css.profile_PREVIEW}
        aria-label={tr?.profileIntro_ARIA(profile?.name?.[lang], profile?.subname?.[lang])[lang]}
      >
        <Preview_TOP
          profile={profile}
          SET_panoramas={SET_panoramas}
          TOGGLE_showTags={TOGGLE_showTags}
          SHOW_tags={SHOW_tags}
          lang={lang}
          name={name}
          visibleIcon_COUNT={visibleIcon_COUNT}
          tr={tr}
          global_TR={global_TR}
        />
        <AnimatePresence>
          {SHOW_tags && (
            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ ease: "easeInOut", duration: 0.2 }}
              className={css.tag_PREVIEW}
              data-testid="tag-preview"
            >
              <Tag_OVERLAY
                profile={profile}
                TOGGLE_showTags={TOGGLE_showTags}
                lang={lang}
                name={name}
                tr={tr}
                global_TR={global_TR}
              />
            </motion.aside>
          )}
        </AnimatePresence>
        <Preview_IMAGES
          sliderRef={sliderRef}
          images={profile?.img?.["mobile"] || profile?.img?.["desktop"] || []}
          img_END={"/Mobile"}
          profile={profile}
          lang={lang}
          SHOW_swiper={SHOW_swiper}
        />
        <Preview_BOTTOM
          slide={slide}
          profile={profile}
          search={search}
          name={name}
          lang={lang}
          SHOW_swiper={SHOW_swiper}
          tr={tr}
        />
      </article>
    </>
  );
}
function Preview_TOP({
  profile,
  TOGGLE_showTags,
  SET_panoramas,
  SHOW_tags,
  lang,
  name,
  visibleIcon_COUNT,
  tr,
  global_TR,
}) {
  const { savedProfile_IDs, ADD_toSaved, REMOVE_fromSaved } = useContext(SavedProfileIDs_CONTEXT);
  const IS_saved = savedProfile_IDs instanceof Set && savedProfile_IDs.has(profile?._id);
  const IS_new = (new Date() - new Date(profile?.createdAt)) / (1000 * 60 * 60) <= 72; // 72 hours

  return (
    <header className={css.top}>
      {IS_new && (
        <span className={css.labelNew} data-testid="label-new">
          {global_TR?.new_TEXT?.[lang] || "New"}
        </span>
      )}

      <div className={css.top_RIGHT}>
        {profile?.tags?.length > 0 && (
          <ShowTags_BTN
            icons={profile?.tags?.map((t) => (t.icon?.url ? t.icon.url : ""))}
            profile_ID={profile?._id}
            onClick={() => {
              TOGGLE_showTags();
            }}
            IS_open={SHOW_tags}
            visibleIcon_COUNT={visibleIcon_COUNT}
            matchedTags_COUNT={0} // get matching tags count
            aria_LABEL={
              SHOW_tags ? tr?.hideTagsBtn_ARIA(name)[lang] : tr?.showTagsBtn_ARIA(name)[lang]
            }
          />
        )}
        {(profile?.img?.panoramas ? Object.keys(profile?.img?.panoramas).length > 0 : false) && (
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
          onClick={() => (IS_saved ? REMOVE_fromSaved(profile?._id) : ADD_toSaved(profile?._id))}
          saved={IS_saved}
          left_ICON={<ICON_save style={IS_saved ? "active" : "white"} />}
          aria_LABEL={tr?.saveBtn_ARIA(name)[lang]}
          test_ID="save-btn"
        />
      </div>
    </header>
  );
}
function Preview_IMAGES({ sliderRef, images, img_END, profile, lang, SHOW_swiper }) {
  const img_ALT = `${profile?.name?.[lang]}, ${profile?.subname?.[lang]} ${profile?.city?.name?.[lang]}, ${profile?.adress?.["street"]}, ${profile?.adress?.["region"]} ${profile?.city?.name?.[lang]}`;
  return (
    <>
      {SHOW_swiper ? (
        <Swiper loop={true} ref={sliderRef} speed={500}>
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img + img_END} className={css.profile_IMG} alt={img_ALT} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img src={images[0] + img_END} className={css.profile_IMG} alt={img_ALT} />
      )}
    </>
  );
}
function Preview_BOTTOM({ slide, search, name, lang, SHOW_swiper, tr }) {
  const [arrow_DIRECTION, SET_arrowDirection] = useState("");
  const [ARE_arrowsDisabled, SET_arrowsDisabled] = useState(false);

  const HANLDE_arrowClick = (direction) => {
    if (ARE_arrowsDisabled) return;
    SET_arrowsDisabled(true);
    slide(direction);
    SET_arrowDirection(direction);
    setTimeout(() => {
      SET_arrowDirection("");
      SET_arrowsDisabled(false);
    }, 499);
  };

  return (
    <footer className={css.bottom} data-testid="profile-preview-bottom">
      {search === "" && (
        <ProfileName_BTN
          name={name}
          aria_LABEL={tr?.visitProfileBtn_ARIA(name)[lang]}
          onClick={() => alert("No function provided")}
        />
      )}
      {search !== "" && (
        <ProfileSearch_BTN
          name={name}
          search={search}
          aria_LABEL={tr?.visitProfileBtn_ARIA(name)[lang]}
          onClick={() => alert("No function provided")}
        />
      )}
      {SHOW_swiper && (
        <div
          className={css.slider_ARROWS}
          data-arrowmove={arrow_DIRECTION}
          data-testid="swiper-arrows"
        >
          <Btn
            styles={["btn-36", "onImg", "round", "prev"]}
            onClick={() => {
              HANLDE_arrowClick("prev");
            }}
            right_ICON={<ICON_arrow direction="left" color="white" />}
            aria_LABEL={tr?.prevImageBtn_ARIA(name)[lang]}
            data-testid="arrow-prev"
          />
          <Btn
            styles={["btn-36", "onImg", "round", "next"]}
            onClick={() => {
              HANLDE_arrowClick("next");
            }}
            right_ICON={<ICON_arrow direction="right" color="white" />}
            aria_LABEL={tr?.nextImageBtn_ARIA(name)[lang]}
            data-testid="arrow-prev"
          />
        </div>
      )}
    </footer>
  );
}
function Tag_OVERLAY({ profile, TOGGLE_showTags, lang, name, tr, global_TR }) {
  return (
    <>
      <div className={css.tagPreview_TOP}>
        <h4>
          {profile?.tags.length} {global_TR?.tagsOf_TITLE(name)[lang]}
        </h4>
        <Btn
          styles={["btn-36", "onImg", "close"]}
          onClick={() => TOGGLE_showTags()}
          right_ICON={<ICON_x />}
          aria_LABEL={tr?.hideTagsBtn_ARIA(name)[lang]}
        />
      </div>
      <AnimatePresence>
        <motion.ul key={profile?._id + profile?._id} className={css.tagPreview_BOTTOM}>
          {profile?.tags.map((tag, index) => {
            return (
              <motion.li
                key={tag._id}
                initial={{ y: 10 }}
                animate={{ y: [10, -4, 0] }}
                exit={{ y: 0 }}
                transition={{
                  ease: "easeIn",
                  duration: 0.3,
                  delay: (index + 1) * 0.02,
                }}
              >
                <Btn
                  key={tag._id}
                  styles={["btn-36", "onImg", "round"]}
                  leftIcon_URL={tag.icon?.url ? tag.icon.url : ""}
                  right_ICON={<ICON_x rotate={true} />}
                  text={tag.name.en}
                  aria_LABEL={tr?.filterTagBtn_ARIA(tag.name?.[lang])[lang]}
                  onClick={() => alert("No function provided")}
                />
              </motion.li>
            );
          })}
        </motion.ul>
      </AnimatePresence>

      {/* <AnimatePresence>
          {SHOW_tags && (
            <motion.aside
              initial={{ opacity: 0, y: [30] }}
              animate={{ opacity: 1, y: [30, -3, 0] }}
              exit={{ opacity: 0, y: [0, 20, 30] }}
              transition={{ ease: "easeOut", duration: 0.3 }}
              className={css.tag_PREVIEW}
              data-testid="tag-preview"
            >
              <Tag_OVERLAY
                profile={profile}
                TOGGLE_showTags={TOGGLE_showTags}
                lang={lang}
                name={name}
              />
            </motion.aside>
          )}
        </AnimatePresence> */}
    </>
  );
}

Profile_PREVIEW.propTypes = {
  profile: PropTypes.object.isRequired,
  SET_panoramas: PropTypes.func.isRequired,
  search: PropTypes.string,
  lang: PropTypes.string.isRequired,
  tr: PropTypes.object.isRequired,
  global_TR: PropTypes.object.isRequired,
};
Preview_TOP.propTypes = {
  profile: PropTypes.object.isRequired,
  TOGGLE_showTags: PropTypes.func.isRequired,
  SET_panoramas: PropTypes.func.isRequired,
  SHOW_tags: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
  name: PropTypes.string,
  visibleIcon_COUNT: PropTypes.number.isRequired,
  tr: PropTypes.object.isRequired,
  global_TR: PropTypes.object.isRequired,
};
Preview_IMAGES.propTypes = {
  sliderRef: PropTypes.object,
  images: PropTypes.array.isRequired,
  img_END: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  SHOW_swiper: PropTypes.bool.isRequired,
};
Preview_BOTTOM.propTypes = {
  slide: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  search: PropTypes.string,
  name: PropTypes.string,
  lang: PropTypes.string.isRequired,
  SHOW_swiper: PropTypes.bool.isRequired,
  tr: PropTypes.object.isRequired,
};
Tag_OVERLAY.propTypes = {
  profile: PropTypes.object.isRequired,
  TOGGLE_showTags: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  name: PropTypes.string,
  tr: PropTypes.object.isRequired,
  global_TR: PropTypes.object.isRequired,
};
