//

import { useState, useRef, useCallback, useContext } from "react";
import css from "./ProfilePreview.module.css";
import { Btn, Btn_profileName, Btn_profileSearch, Btn_profilePreviewIcons } from "../btn/btn";
import { ICON_x } from "../icons/icons";
import { ICON_activeDigit, ICON_arrow, ICON_save } from "../icons/icons";
import { savedProfileIDs_CONTEXT } from "../../contexts/savedProfiles";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";

export default function ProfilePreview({ profile, SET_panoramas, windowWidth, search }) {
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

  return (
    <>
      <div className={css.profile_PREVIEW}>
        {CREATE_swiper({
          sliderRef,
          images: profile.img[windowWidth > 700 ? "mobile" : "mobile"],
          img_END: windowWidth > 700 ? "/Mobile" : "/Mobile",
        })}
        {CREATE_previewTop({
          profile_ID: profile._id,
          IS_new,
          tags: profile.tags,
          TOGGLE_showTags,
          panorama_OBJs: profile.img.panoramas,
          SET_panoramas,
          windowWidth,
          SHOW_tags,
        })}
        {CREATE_previewBottom({
          slide,
          name_OBJ: profile.name,
          HAS_swiper: profile.img.desktop && profile.img.desktop.length > 1,
          search,
        })}
        <AnimatePresence>
          {SHOW_tags && (
            <motion.div
              initial={{ opacity: 0, y: [30] }}
              animate={{ opacity: 1, y: [30, -3, 0] }}
              exit={{ opacity: 0, y: [0, 20, 30] }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              className={css.tag_PREVIEW}
            >
              {CREATE_tagPreview({ tags: profile.tags, name: profile.name.en, TOGGLE_showTags })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function CREATE_swiper({ sliderRef, images, img_END }) {
  return (
    <>
      <Swiper loop={true} ref={sliderRef} speed={500}>
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img + img_END} className={css.profile_IMG} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
function CREATE_previewTop({
  profile_ID,
  IS_new,
  tags,
  TOGGLE_showTags,
  panorama_OBJs,
  SET_panoramas,
  windowWidth,
  SHOW_tags,
}) {
  const { savedProfile_IDs, ADD_toSaved, REMOVE_fromSaved } = useContext(savedProfileIDs_CONTEXT);
  const IS_saved = savedProfile_IDs.has(profile_ID);

  return (
    <div className={css.top}>
      {/* {IS_new && <div className={css.labelNew}>New</div>} */}

      <div className={css.top_RIGHT}>
        <Btn_profilePreviewIcons
          icons={tags.map((t) => t.icon.url)}
          profile_ID={profile_ID}
          onClick={() => {
            TOGGLE_showTags();
          }}
          visibleIcon_COUNT={windowWidth > 400 ? 3 : windowWidth > 380 ? 2 : 1}
          IS_open={SHOW_tags}
          // activeDigit={<ICON_activeDigit count={1 /* get mathcing tag count */} IS_active={true} />}
        />
        {Object.keys(panorama_OBJs).length > 0 && (
          <Btn
            styles={["btn-36", "onImg"]}
            onClick={() => SET_panoramas(panorama_OBJs)}
            text={"360"}
          />
        )}
        <Btn
          styles={["btn-36", "onImg", "save"]}
          onClick={() => (IS_saved ? REMOVE_fromSaved(profile_ID) : ADD_toSaved(profile_ID))}
          active={IS_saved}
          left_ICON={<ICON_save style={IS_saved ? "active" : "white"} />}
        />
      </div>
    </div>
  );
}
function CREATE_previewBottom({ slide, HAS_swiper, name_OBJ, search }) {
  const [arrow_DIRECTION, SET_arrowDirection] = useState("");
  const [ARE_arrowsDisabled, SET_arrowsDisabled] = useState(false);

  const HANLDE_arrowClick = (direction) => {
    if (ARE_arrowsDisabled) return;
    SET_arrowsDisabled(true);
    slide(direction);
    SET_arrowDirection(direction);
    // Set timeout to reset the arrow after 200ms
    setTimeout(() => {
      SET_arrowDirection("");
      SET_arrowsDisabled(false);
    }, 499);
  };
  return (
    <div className={css.bottom}>
      {search === "" && <Btn_profileName name={name_OBJ.en} />}
      {search !== "" && <Btn_profileSearch name={name_OBJ.en} search={search} />}
      {HAS_swiper && (
        <div className={css.slider_ARROWS} data-arrowmove={arrow_DIRECTION}>
          <Btn
            styles={["btn-36", "onImg", "round", "next"]}
            onClick={() => {
              HANLDE_arrowClick("prev");
            }}
            right_ICON={<ICON_arrow direction="left" color="white" />}
          />
          <Btn
            styles={["btn-36", "onImg", "round", "next"]}
            onClick={() => {
              HANLDE_arrowClick("next");
            }}
            right_ICON={<ICON_arrow direction="right" color="white" />}
          />
        </div>
      )}
    </div>
  );
}
function CREATE_tagPreview({ tags, name, TOGGLE_showTags }) {
  return (
    <>
      <div className={css.tagPreview_TOP}>
        <h4>
          {tags.length} Tags of {name}
        </h4>
        <Btn
          styles={["btn-36", "onImg", "close"]}
          onClick={() => TOGGLE_showTags()}
          right_ICON={<ICON_x />}
        />
      </div>
      <div className={css.tagPreview_BOTTOM}>
        {tags.map((tag) => {
          return (
            <Btn
              key={tag._id}
              styles={["btn-36", "onImg", "round"]}
              leftIcon_URL={tag.icon.url}
              right_ICON={<ICON_x rotate={true} />}
              text={tag.name.en}
            />
          );
        })}
      </div>
    </>
  );
}

ProfilePreview.propTypes = {
  profile: PropTypes.object,
  SET_panoramas: PropTypes.func,
  windowWidth: PropTypes.number,
  search: PropTypes.string,
};

CREATE_swiper.propTypes = {
  sliderRef: PropTypes.object,
  images: PropTypes.array,
  img_END: PropTypes.string,
};

CREATE_previewTop.propTypes = {
  profile_ID: PropTypes.string,
  IS_new: PropTypes.bool,
  tags: PropTypes.array,
  TOGGLE_showTags: PropTypes.func,
  panorama_OBJs: PropTypes.object,
  SET_panoramas: PropTypes.func,
  windowWidth: PropTypes.number,
  SHOW_tags: PropTypes.bool,
};

CREATE_previewBottom.propTypes = {
  slide: PropTypes.func,
  HAS_swiper: PropTypes.bool,
  name_OBJ: PropTypes.object,
  search: PropTypes.string,
};

CREATE_tagPreview.propTypes = {
  tags: PropTypes.array,
  name: PropTypes.string,
  TOGGLE_showTags: PropTypes.func,
};
