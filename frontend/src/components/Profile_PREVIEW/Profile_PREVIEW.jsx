//

import PropTypes from "prop-types";
import { useState, useContext, useEffect, useRef, useCallback, useMemo } from "react";
import css from "./Profile_PREVIEW.module.css";
import { delay, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ICON_arrow, ICON_error, ICON_proCon, ICON_save, ICON_x } from "../icons/icons";

import USE_slideSwiper from "../../hooks/USE_slideSwiper";
import USE_showSwiper from "../../hooks/USE_showSwiper";
import { USE_isProfileNew } from "../../hooks/USE_isProfileNew";
import { New_LABEL, Label } from "../labels/labels";
import { SavedProfileIDs_CONTEXT } from "../../contexts/savedProfiles";
import { Btn } from "../Btn/Btn";
import { ShowProsCons_BTN } from "../Btn/ShowProsCons_BTN/ShowProsCons_BTN";
import { ShowTags_BTN } from "../Btn/ShowTags_BTN/ShowTags_BTN";
import { Link } from "react-aria-components";

import { profilePreview_TR as tr } from "../../translations";

import "swiper/css";
import "swiper/css/free-mode";
import { USE_windowSize } from "../../hooks/USE_windowWidth";
import { HeartConfetti } from "../HeartConfetti/HeartConfetti";
import { FontSizeContext } from "../../contexts/fontSize";

const Motion_PROPS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
  style: { zIndex: 10 },
};

export default function Profile_PREVIEW({
  profile,
  SET_panoramas,
  search,
  lang,
  activeTag_IDs,
  UPDATE_tags,
  potentialTag_IDs,
  SET_potentialTagIDs,
}) {
  const { sliderRef, slide } = USE_slideSwiper();
  const [current_VIEW, SET_currentView] = useState("front");
  const [hover, SET_hover] = useState(false);
  const [SHOW_hearts, SET_showHearts] = useState(false);
  const [visibleIcon_COUNT, SET_visibleIconCount] = useState(3);
  const { width } = USE_windowSize();
  const HAS_panoramas = Object.keys(profile?.img?.panoramas || {}).length > 0;

  const footer_REF = useRef(null);
  const front_REF = useRef(null);
  const tags_REF = useRef(null);
  const prosCons_REF = useRef(null);
  const prosConsBtn_REF = useRef(null);
  const [footer_HEIGHT, SET_footerHeight] = useState(footer_REF?.current?.clientHeight || null);

  const matchedTag_IDs = useMemo(
    () =>
      Array.from(activeTag_IDs).filter((activeTag_ID) =>
        profile.tags.some((profile_TAG) => profile_TAG._id === activeTag_ID)
      ),
    [activeTag_IDs, profile]
  );

  const matched_TAGS = useMemo(
    () => profile.tags.filter((tag) => matchedTag_IDs.includes(tag._id)),
    [profile, matchedTag_IDs]
  );

  const { savedProfile_IDs, ADD_toSaved, REMOVE_fromSaved } = useContext(SavedProfileIDs_CONTEXT);
  const { fontSize, fontSize_SCALE } = useContext(FontSizeContext);

  const IS_saved = useMemo(
    () => savedProfile_IDs instanceof Set && savedProfile_IDs.has(profile?._id),
    [savedProfile_IDs, profile?._id]
  );

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

  useEffect(() => {
    SET_currentView("front");
  }, [activeTag_IDs]);

  useEffect(() => {
    let height = 0;
    switch (current_VIEW) {
      case "front":
        height = front_REF?.current?.clientHeight;
        break;
      case "tags":
        height = tags_REF?.current?.clientHeight;
        break;
      case "prosCons":
        height = prosCons_REF?.current?.clientHeight;
        break;
    }
    SET_footerHeight(height);
  }, [current_VIEW, width, fontSize, matched_TAGS]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (footer_REF.current && prosConsBtn_REF.current) {
        const footer_WIDTH = footer_REF.current.clientWidth;
        const prosCons_WIDTH = prosConsBtn_REF.current.clientWidth;
        const padding = 120 * fontSize_SCALE;

        const remaining_SPACE = footer_WIDTH - prosCons_WIDTH - padding; // Adjust for padding or margins
        const newVisibleIconCount = Math.floor(remaining_SPACE / 30); // 30 is the assumed width of each icon
        SET_visibleIconCount(newVisibleIconCount > 0 ? newVisibleIconCount : 1); // Ensure at least one icon is visible
      }
    });

    resizeObserver.observe(footer_REF.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [fontSize, fontSize_SCALE]);

  const style = useMemo(
    () => (profile?.img?.blur ? { backgroundImage: `url(${profile.img.blur})` } : {}),
    [profile]
  );

  return (
    <Link
      className={css.profile_PREVIEW}
      href={`/profile/${profile?._id}`}
      style={style}
      onMouseEnter={() => SET_hover(true)}
      onMouseLeave={() => SET_hover(false)}
    >
      <header className={css.top}>
        {USE_isProfileNew(profile) && <New_LABEL lang={lang} />}
        <div className={css.btn_WRAP}>
          {/* {HAS_panoramas && (
            <Btn
              styles={["btn-36", "onImg"]}
              onClick={() => SET_panoramas(profile?.img?.panoramas)}
              text={"360"}
              // aria_LABEL={tr?.panoramaBtn_ARIA(name)[lang]}
              test_ID="panorama-btn"
            />
          )} */}
          <Btn
            styles={["btn-36", "onImg", `${IS_saved ? "saved" : ""}`]}
            onClick={() => (IS_saved ? HANDLE_save("delete") : HANDLE_save("save"))}
            left_ICON={<ICON_save color={IS_saved ? "red" : "white"} />}
            // aria_LABEL={tr?.saveBtn_ARIA(name)[lang]}
            test_ID="save-btn"
          />
        </div>
      </header>

      <Images
        images={profile?.img?.["mobile"] || profile?.img?.["desktop"] || []}
        SHOW_swiper={USE_showSwiper(profile)}
        sliderRef={sliderRef}
        hover={hover}
        slide={slide}
        SHOW_hearts={SHOW_hearts}
      />

      <footer
        ref={footer_REF}
        style={{ height: `${footer_HEIGHT}px`, backgroundImage: `url(${profile?.img?.blur})` }}
      >
        {current_VIEW === "tags" && (
          <Footer_TAGS
            profile={profile}
            SET_currentView={SET_currentView}
            lang={lang}
            tr={tr}
            tags_REF={tags_REF}
            activeTag_IDs={activeTag_IDs}
            potentialTag_IDs={potentialTag_IDs}
            SET_potentialTagIDs={SET_potentialTagIDs}
          />
        )}
        {current_VIEW === "front" && (
          <Footer_FRONT
            profile={profile}
            SET_currentView={SET_currentView}
            lang={lang}
            front_REF={front_REF}
            visibleIcon_COUNT={visibleIcon_COUNT}
            prosConsBtn_REF={prosConsBtn_REF}
            activeTag_IDs={activeTag_IDs}
            matched_TAGS={matched_TAGS}
          />
        )}
        {current_VIEW === "prosCons" && (
          <Footer_PROCON
            CLOSE_prosCons={() => SET_currentView("front")}
            pros={profile?.pros}
            cons={profile?.cons}
            prosCons_REF={prosCons_REF}
            close={() => SET_currentView("front")}
            SET_currentView={SET_currentView}
            profile={profile}
          />
        )}
      </footer>
    </Link>
  );
}

function Images({ images, SHOW_swiper, sliderRef, hover, slide, SHOW_hearts }) {
  return (
    <>
      {SHOW_swiper.mobile && (
        <CREATE_swiper
          sliderRef={sliderRef}
          images={images}
          img_END={"/Mobile"}
          hover={hover}
          slide={slide}
          SHOW_hearts={SHOW_hearts}
        />
      )}
      {!SHOW_swiper.mobile && (
        <img src={images[0] + "/Mobile"} className={css.single_IMG} /*  alt={img_ALT} */ />
      )}
      {images.length < 1 && (
        <div className={css.noImagesFound}>
          <p>No images found</p>
          <Btn
            styles={["onImg"]}
            left_ICON={<ICON_error color="white" />}
            onClick={() => {}}
            text="Report issue"
          />
        </div>
      )}
    </>
  );
}
function CREATE_swiper({ sliderRef, images, img_END, hover, slide, SHOW_hearts }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      // loop={true}
      ref={sliderRef}
      pagination={true}
      modules={[Pagination]}
      speed={500}
      data-testid="swiper"
      lazyPreloadPrevNext={4}
      data-target="swiper"
      data-hover={hover}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
    >
      <div className={css.slider_ARROWS}>
        <Btn
          styles={["onImg", "round", `${activeIndex === 0 ? "disabled" : ""}`]}
          right_ICON={<ICON_arrow color="white" direction="left" />}
          onClick={() => {
            slide("prev");
          }}
        />

        <Btn
          styles={["onImg", "round", `${activeIndex === images.length - 1 ? "disabled" : ""}`]}
          right_ICON={<ICON_arrow color="white" direction="right" />}
          onClick={() => {
            slide("next");
          }}
        />
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

function Footer_FRONT({
  profile,
  SET_currentView,
  lang,
  front_REF,
  visibleIcon_COUNT,
  prosConsBtn_REF,
  activeTag_IDs,
  matched_TAGS,
}) {
  return (
    <motion.div className={css.footer_FRONT} ref={front_REF} {...Motion_PROPS}>
      <div className={css.top}>
        <div className={css.name_WRAP}>
          <h4>{profile?.name?.en || "Name"}</h4>
          <p>{profile?.subname?.en || "Subname"}</p>
        </div>
      </div>
      <div className={css.bottom}>
        {profile?.tags?.length > 0 && (
          <ShowTags_BTN
            onClick={() => SET_currentView("tags")}
            matchedTags_COUNT={matched_TAGS.length} // get matching tags count
            lang={lang}
            profile={profile}
            visibleIcon_COUNT={visibleIcon_COUNT}
          />
        )}
        {(profile?.pros || profile?.cons) && (
          <ShowProsCons_BTN
            onClick={() => SET_currentView("prosCons")}
            pros_COUNT={profile?.pros?.length}
            cons_COUNT={profile?.cons?.length}
            prosConsBtn_REF={prosConsBtn_REF}
          />
        )}
      </div>
      {matched_TAGS.length > 0 && (
        <div className={css.activeTag_WRAP} onClick={() => SET_currentView("tags")}>
          {matched_TAGS?.map((tag) => (
            <Label key={tag?._id} name={tag?.name?.en} small={true} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
function Footer_TAGS({
  profile,
  SET_currentView,
  lang,
  tr,
  tags_REF,
  activeTag_IDs,
  potentialTag_IDs,
  SET_potentialTagIDs,
}) {
  const HANDLE_tagPress = ({ tag, IS_active, IS_potentialAdd, IS_potentialDelete }) => {
    SET_potentialTagIDs((prev) => {
      const updated = { ...prev };

      if (IS_active && IS_potentialDelete && !IS_potentialAdd) {
        updated.toDelete_IDs.delete(tag._id);
      }
      if (IS_active && !IS_potentialAdd && !IS_potentialDelete) {
        updated.toDelete_IDs.add(tag._id);
      }
      if (!IS_active && !IS_potentialDelete && !IS_potentialAdd) {
        updated.toAdd_IDs.add(tag._id);
      }
      if (!IS_active && IS_potentialAdd && !IS_potentialDelete) {
        updated.toAdd_IDs.delete(tag._id);
      }

      return updated;
    });
  };
  return (
    <motion.div className={css.drawer} ref={tags_REF} {...Motion_PROPS}>
      <Drawer_TOP
        title={`${profile.tags.length} Tags of ${profile.name.en}`}
        CLOSE_drawer={() => SET_currentView("front")}
      />
      <ul key={profile?._id} className={css.bottom} data-type="tags">
        {profile?.tags?.map((tag) => {
          const IS_active = Array.from(activeTag_IDs).some(
            (activeTag_ID) => activeTag_ID === tag._id
          );
          const IS_potentialAdd = potentialTag_IDs.toAdd_IDs.has(tag._id);
          const IS_potentialDelete = potentialTag_IDs.toDelete_IDs.has(tag._id);

          return (
            <li key={tag._id}>
              <Btn
                key={tag._id}
                styles={[
                  "btn-36",
                  "onBlur",
                  "round",
                  `${IS_active ? "active" : ""}`,
                  `${IS_potentialAdd ? "green" : ""}`,
                  `${IS_potentialDelete ? "red" : ""}`,
                ]}
                left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
                right_ICON={
                  <ICON_x
                    rotate={!IS_active}
                    color={
                      IS_potentialAdd
                        ? "green"
                        : IS_potentialDelete
                        ? "red"
                        : IS_active
                        ? "brand"
                        : "white"
                    }
                    small={IS_active}
                    rotationAnimation={IS_potentialAdd || IS_potentialDelete}
                    oneLine={IS_potentialDelete}
                  />
                }
                text={tag.name?.en}
                // aria_LABEL={tr?.filterTagBtn_ARIA(tag.name?.[lang])[lang]}
                onClick={() =>
                  HANDLE_tagPress({ tag, IS_active, IS_potentialAdd, IS_potentialDelete })
                }
                test_ID={"overlay-tag-btn"}
              />
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
function Footer_PROCON({ pros, cons, prosCons_REF, close, profile }) {
  return (
    <motion.div className={css.drawer} ref={prosCons_REF} {...Motion_PROPS}>
      <Drawer_TOP title={`Pros & Cons of ${profile.name.en}`} CLOSE_drawer={close} />
      <div className={css.bottom} data-type="prosCons">
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
      </div>
    </motion.div>
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
