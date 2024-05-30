//

import PropTypes from "prop-types";
import { useState, useContext, useEffect, useRef } from "react";
import css from "./Profile_PREVIEW.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  ICON_3dots,
  ICON_activeDigit,
  ICON_arrow,
  ICON_dropDownArrow,
  ICON_proCon,
  ICON_save,
  ICON_x,
} from "../icons/icons";

import USE_Toggle from "../../hooks/USE_toggle";
import USE_slideSwiper from "../../hooks/USE_slideSwiper";
import USE_getName from "../../hooks/USE_getName";
import USE_showSwiper from "../../hooks/USE_showSwiper";
import USE_imgAlt from "../../hooks/USE_imgAlt";
import { USE_isProfileNew } from "../../hooks/USE_isProfileNew";

import { New_LABEL } from "../labels/labels";

import { SavedProfileIDs_CONTEXT } from "../../contexts/savedProfiles";
import {
  Btn,
  ProfileName_BTN,
  ProfileSearch_BTN,
  ShowMore_BTN,
  ShowProsCons_BTN,
  ShowTags_BTN,
} from "../btn/btn";

import { profilePreview_TR as tr } from "../../translations";

import "swiper/css";
import "swiper/css/free-mode";

// TODO => implement differnt view grid

export default function Profile_PREVIEW({ profile, SET_panoramas, search, lang }) {
  const [SHOW_tags, TOGGLE_showTags] = USE_Toggle(false);
  const { sliderRef, slide } = USE_slideSwiper();
  const [current_VIEW, SET_currentView] = useState("front");

  const SHOW_swiper = USE_showSwiper(profile);
  const IS_new = USE_isProfileNew(profile);
  // const IS_new = true;
  const name = USE_getName(profile, lang);
  const img_ALT = USE_imgAlt(profile, lang);

  const images = profile?.img?.["mobile"] || profile?.img?.["desktop"] || [];
  const HAS_panoramas = Object.keys(profile?.img?.panoramas || {})?.length > 0;
  const HAS_tags = profile?.tags?.length > 0;
  const HAS_pros = profile?.pros?.length > 0;
  const HAS_cons = profile?.cons?.length > 0;

  const { savedProfile_IDs, ADD_toSaved, REMOVE_fromSaved } = useContext(SavedProfileIDs_CONTEXT);
  const IS_saved = savedProfile_IDs instanceof Set && savedProfile_IDs.has(profile?._id);

  const { arrow_DIRECTION, HANLDE_arrowClick } = USE_arrowSlider();

  const test_REF = useRef(null);
  const test2_REF = useRef(null);

  const footer_REF = useRef(null);
  const front_REF = useRef(null);
  const tags_REF = useRef(null);
  const prosCons_REF = useRef(null);

  const article_REF = useRef(null);

  const [height, SET_Height] = useState(footer_REF?.current?.clientHeight || null);

  useEffect(() => {
    switch (current_VIEW) {
      case "front":
        console.log(front_REF?.current?.clientHeight);
        SET_Height(front_REF?.current?.clientHeight);
        break;
      case "tags":
        console.log(tags_REF?.current?.clientHeight);
        SET_Height(tags_REF?.current?.clientHeight);
        break;
      case "prosCons":
        console.log(prosCons_REF?.current?.clientHeight);
        SET_Height(prosCons_REF?.current?.clientHeight);
        break;
    }
    // // if (footer_REF.current) {
    // //   const newHeight = footer_REF.current.clientHeight;
    // //   SET_Height(newHeight);
    // //   footer_REF.current.style.height = newHeight + "px";
    // // }
    // console.log(footer_REF?.current?.clientHeight);
  }, [current_VIEW]);

  return (
    <article
      className={css.profile_PREVIEW}
      aria-label={
        tr?.profileIntro_ARIA(profile?.name?.[lang], profile?.subname?.[lang])[lang] || "Profile"
      }
      ref={article_REF}
    >
      <header className={css.top}>
        {IS_new && <New_LABEL lang={lang} />}
        <div className={css.btn_WRAP}>
          {/* {HAS_tags && (
            <ShowTags_BTN
              onClick={() => SET_currentView("tags")}
              IS_open={SHOW_tags}
              matchedTags_COUNT={0} // get matching tags count
              lang={lang}
              profile={profile}
              parent_REF={test_REF}
              // prosCons_REF={test2_REF}
            />
          )} */}
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
            onClick={() => (IS_saved ? REMOVE_fromSaved(profile?._id) : ADD_toSaved(profile?._id))}
            saved={IS_saved}
            left_ICON={<ICON_save style={IS_saved ? "active" : "white"} />}
            aria_LABEL={tr?.saveBtn_ARIA(name)[lang]}
            test_ID="save-btn"
          />
        </div>
      </header>

      {SHOW_swiper.mobile && (
        <CREATE_swiper
          sliderRef={sliderRef}
          images={images}
          img_END={"/Mobile"}
          img_ALT={img_ALT}
          height={height}
          article_REF={article_REF}
        />
      )}
      {!SHOW_swiper.mobile && (
        <img src={images[0] + "/Mobile"} className={css.profile_IMG} alt={img_ALT} />
      )}
      {images.length < 1 && <img className={css.profile_IMG} alt={"No images found"} />}

      <footer
        data-testid="profile-preview-bottom"
        ref={footer_REF}
        style={{ height: `${height}px` }}
      >
        <div
          className={css.footer_BLUR}
          // style={profile?.img?.blur ? { backgroundImage: `url(${profile.img.blur})` } : {}}
        ></div>
        {/* Create an opacity fade on entrance and exit */}
        {current_VIEW === "tags" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ zIndex: 10 }}
            className={css.drawer}
            ref={tags_REF}
          >
            <Drawer_TOP title="Pros & Cons" CLOSE_drawer={() => SET_currentView("front")} />
            <motion.ul
              key={profile?._id}
              className={css.bottom}
              data-type="tags"
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              exit={{ y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {profile?.tags?.map((tag) => {
                return (
                  <li key={tag._id}>
                    <Btn
                      key={tag._id}
                      styles={["onBlur", "round"]}
                      leftIcon_URL={tag.icon?.url ? tag.icon?.url : ""}
                      right_ICON={<ICON_x rotate={true} color="white" />}
                      text={tag.name?.en}
                      aria_LABEL={tr?.filterTagBtn_ARIA(tag.name?.[lang])[lang]}
                      onClick={() => alert("No function provided")}
                      test_ID={"overlay-tag-btn"}
                    />
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}

        {current_VIEW === "front" && (
          <motion.div
            className={css.footer_FRONT}
            ref={front_REF}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ zIndex: 10 }}
          >
            <div className={css.top}>
              <div className={css.name_WRAP}>
                <h4>{profile?.name?.en || "Name"}</h4>
                <p>{profile?.subname?.en || "Subname"}</p>
              </div>
            </div>
            <div className={css.bottom} ref={test_REF}>
              {HAS_tags && (
                <ShowTags_BTN
                  onClick={() => SET_currentView("tags")}
                  IS_open={SHOW_tags}
                  matchedTags_COUNT={0} // get matching tags count
                  lang={lang}
                  profile={profile}
                  parent_REF={test_REF}
                  // prosCons_REF={test2_REF}
                />
              )}
              {(HAS_pros || HAS_cons) && (
                <ShowProsCons_BTN
                  onClick={() => SET_currentView("prosCons")}
                  pros_COUNT={HAS_pros && profile?.pros?.length}
                  cons_COUNT={HAS_cons && profile?.cons?.length}
                  // prosCons_REF={test2_REF}
                />
              )}
              {/* <Btn
                styles={["btn-36", "onBlur", "close"]}
                onClick={() => {}}
                // right_ICON={<ICON_dropDownArrow color="white" />}
                text="More"
                right_ICON={<ICON_dropDownArrow color="white" />}
                // aria_LABEL={tr?.hideTagsBtn_ARIA(name)[lang]}
                test_ID={"close-tag-overlay-btn"}
              /> */}
            </div>
          </motion.div>
        )}

        {current_VIEW === "prosCons" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ zIndex: 10 }}
          >
            <ProsCons
              CLOSE_prosCons={() => SET_currentView("front")}
              pros={profile?.pros}
              cons={profile?.cons}
              _ref={prosCons_REF}
              SET_currentView={SET_currentView}
            />
          </motion.div>
        )}
      </footer>

      {/*  Implement arrow buttons like on AirBnb */}
      {/* <div
                className={css.btn_WRAP}
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
              </div> */}
    </article>
  );
}

function CREATE_swiper({ sliderRef, images, img_END, img_ALT, height, article_REF }) {
  return (
    <Swiper
      loop={true}
      ref={sliderRef}
      speed={500}
      data-testid="swiper"
      lazyPreloadPrevNext={4}
      data-target="swiper"
      // style={{ overflow: "visible" }}
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <div className={css.slide_WRAP}>
            <div className={css.normalImg_WRAP} style={{ height: `calc(100% -${height}px)` }}>
              <img src={img + img_END} className={css.profile_IMG} data-normal="true" />
            </div>
            <div className={css.blur_WRAP} style={{ height: `${height}px` }}>
              <img
                // src={img + "/mobileBlur"}
                src={img + "/mobileBlur"}
                className={css.profile_IMG}
                data-blured="true"
                // style={{ height: `${article_REF?.current?.clientHeight}px` }}
                style={{ height: `${1300}px` }}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function Tag_OVERLAY({ profile, CLOSE_tags, lang, name, _ref, SET_currentView }) {
  return (
    <div className={css.drawer} ref={_ref}>
      <Drawer_TOP
        title={`${profile?.tags.length} Tags of ${profile?.name?.en}`}
        CLOSE_drawer={() => SET_currentView("front")}
      />
      <ul key={profile?._id} className={css.bottom} data-type="tags">
        {profile?.tags?.map((tag) => {
          return (
            <li key={tag._id}>
              <Btn
                key={tag._id}
                styles={["onImg", "round"]}
                leftIcon_URL={tag.icon?.url ? tag.icon?.url : ""}
                right_ICON={<ICON_x rotate={true} color="white" />}
                text={tag.name?.en}
                aria_LABEL={tr?.filterTagBtn_ARIA(tag.name?.[lang])[lang]}
                onClick={() => alert("No function provided")}
                test_ID={"overlay-tag-btn"}
              />
            </li>
          );
        })}
      </ul>
    </div>
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

function ProsCons({ CLOSE_prosCons, pros, cons, _ref, SET_currentView }) {
  return (
    <div className={css.drawer} ref={_ref}>
      <Drawer_TOP title="Pros & Cons" CLOSE_drawer={() => SET_currentView("front")} />
      <motion.div
        className={css.bottom}
        data-type="prosCons"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        exit={{ y: 30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {pros?.length > 0 && (
          <ul>
            {pros.map((pro, index) => (
              <li key={index}>
                <ICON_proCon />
                <p>{pro?.en}</p>
              </li>
            ))}
          </ul>
        )}
        {cons?.length > 0 && (
          <ul>
            {cons.map((con, index) => (
              <li key={index}>
                <ICON_proCon IS_pro={false} />
                <p>{con?.en}</p>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}

function Drawer_TOP({ title, CLOSE_drawer }) {
  return (
    <div className={css.top}>
      <h4>{title}</h4>
      <Btn
        styles={["btn-36", "onBlur", "close"]}
        onClick={CLOSE_drawer}
        right_ICON={<ICON_x color="white" />}
        // aria_LABEL={tr?.hideTagsBtn_ARIA(name)[lang]}
        test_ID={"close-tag-overlay-btn"}
      />
    </div>
  );
}

// Profile_PREVIEW.propTypes = {
//   profile: PropTypes.object.isRequired,
//   SET_panoramas: PropTypes.func.isRequired,
//   search: PropTypes.string,
//   lang: PropTypes.string.isRequired,
// };

// CREATE_swiper.propTypes = {
//   sliderRef: PropTypes.object.isRequired,
//   images: PropTypes.array.isRequired,
//   img_END: PropTypes.string.isRequired,
//   img_ALT: PropTypes.string.isRequired,
// };

// Tag_OVERLAY.propTypes = {
//   profile: PropTypes.object.isRequired,
//   TOGGLE_showTags: PropTypes.func.isRequired,
//   lang: PropTypes.string.isRequired,
//   name: PropTypes.string,
// };
