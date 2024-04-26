//

import PropTypes from "prop-types";
import { useState, useRef, useCallback, useContext } from "react";
import css from "./ProfilePreview.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Preview_TOP from "./components/Preview_TOP/Preview_TOP";
import Preview_SWIPER from "./components/Preview_SWIPER/Preview_SWIPER";
import Preview_BOTTOM from "./components/Preview_BOTTOM/Preview_BOTTOM";
import tag_OVERLAY from "./components/tag_OVERLAY/tag_OVERLAY";

import "swiper/css";
import "swiper/css/free-mode";

export default function ProfilePreview({ profile, SET_panoramas, windowWidth, search }) {
  const sliderRef = useRef(null);
  const [SHOW_tags, SET_showTags] = useState(false);
  const TOGGLE_showTags = useCallback(() => {
    SET_showTags((prev) => !prev);
  }, []);

  const slide = useCallback((direction) => {
    if (!sliderRef.current) return;
    direction === "next"
      ? sliderRef.current.swiper.slideNext()
      : sliderRef.current.swiper.slidePrev();
  }, []);

  return (
    <>
      <div className={css.profile_PREVIEW}>
        <Preview_TOP
          profile={profile}
          SET_panoramas={SET_panoramas}
          windowWidth={windowWidth}
          TOGGLE_showTags={TOGGLE_showTags}
          SHOW_tags={SHOW_tags}
        />
        <Preview_SWIPER
          sliderRef={sliderRef}
          images={profile.img["mobile"] || profile.img["desktop"]}
          img_END={"/Mobile"}
        />
        <Preview_BOTTOM
          slide={slide}
          HAS_swiper={profile.img.desktop && profile.img.desktop.length > 1}
          name_OBJ={profile.name}
          search={search}
        />
        <AnimatePresence>
          {SHOW_tags && (
            <motion.div
              initial={{ opacity: 0, y: [30] }}
              animate={{ opacity: 1, y: [30, -3, 0] }}
              exit={{ opacity: 0, y: [0, 20, 30] }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              className={css.tag_PREVIEW}
            >
              {tag_OVERLAY({ tags: profile.tags, name: profile.name.en, TOGGLE_showTags })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

ProfilePreview.propTypes = {
  profile: PropTypes.object.isRequired,
  SET_panoramas: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
  search: PropTypes.string.isRequired,
};
