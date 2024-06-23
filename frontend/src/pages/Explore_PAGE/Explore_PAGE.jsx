//
//
//
import { useState, useContext, useEffect, useMemo, useRef } from "react";
import css from "./Explore_PAGE.module.css";
import "../../styles/Swiper.css";

import Profile_PREVIEW from "../../components/Profile_PREVIEW/Profile_PREVIEW";
import Panorama from "../../components/panorama/panorama";

import { Lang_CONTEXT } from "../../contexts/lang";
import { profilePreview_TR } from "../../translations";
import { global_TR } from "../../translations";
import { Header } from "../../components/Header/Header";
import { Tagbar } from "./components/Tagbar/Tagbar";

import { AnimatePresence, motion } from "framer-motion";

import { Tagbox } from "../../components/Tagbox/Tagbox";
import { Btn } from "../../components/Btn/Btn";
import { ICON_dropDownArrow, ICON_x } from "../../components/icons/icons";
import { PotentialTags_MODAL } from "../../components/Modals/PotentialTags_MODAL/PotentialTags_MODAL";
import { Category_SWIPER } from "./components/Category_SWIPER/Category_SWIPER";
import { Breadcrumbs } from "../../components/Header/Breadcrumbs/Breadcrumbs";

const decoy_PROPS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.3 } },
  transition: { duration: 0.3, ease: "easeOut" },
  zIndex: 1,
};

export default function Explore_PAGE({
  shuffled_PROFILES,
  tags,
  tagUsages,
  window_WIDTH,
  search,
  categories,
  SET_search,
  tagGroups,
  profiles_OBJ,
  nav_REF,
}) {
  const [panoramas, SET_panoramas] = useState(null);
  const { lang } = useContext(Lang_CONTEXT);

  return (
    <>
      <Explore_GRID
        shuffled_PROFILES={shuffled_PROFILES}
        SET_panoramas={SET_panoramas}
        search={search}
        lang={lang}
        window_WIDTH={window_WIDTH}
        categories={categories}
        tags={tags}
        tagGroups={tagGroups}
        tagUsages={tagUsages}
        profiles_OBJ={profiles_OBJ}
        nav_REF={nav_REF}
      />
      {panoramas !== null && <Modal360 panoramas={panoramas} SET_panoramas={SET_panoramas} />}
    </>
  );
}

function Explore_GRID({
  SET_panoramas,
  search,
  SET_search,
  lang,
  window_WIDTH,
  categories,
  tags: all_TAGS,
  tagGroups,
  tagUsages,
  profiles_OBJ,
  nav_REF,
}) {
  const { shuffled_PROFILES, LOADING_profiles } = profiles_OBJ;
  const tagbar_REF = useRef(null);

  const [filtered_PROFILES, SET_filteredProfiles] = useState([...shuffled_PROFILES]);
  const theRest_PROFILES = useMemo(
    () => shuffled_PROFILES.filter((profile) => !filtered_PROFILES.includes(profile)),
    [shuffled_PROFILES, filtered_PROFILES]
  );

  const [activeTag_IDs, SET_activeTagIDs] = useState(new Set());
  const [potentialTag_IDs, SET_potentialTagIDs] = useState({
    toDelete_IDs: new Set(),
    toAdd_IDs: new Set(),
  });

  useEffect(() => {
    if (activeTag_IDs.size === 0) {
      SET_filteredProfiles(shuffled_PROFILES);
      return;
    }

    const filtered = shuffled_PROFILES
      .filter((profile) => {
        return profile.tags.some((tag) => activeTag_IDs.has(tag._id));
      })
      .sort((a, b) => {
        const aCount = a.tags.filter((tag) => activeTag_IDs.has(tag._id)).length;
        const bCount = b.tags.filter((tag) => activeTag_IDs.has(tag._id)).length;
        return bCount - aCount;
      });

    SET_filteredProfiles(filtered);
  }, [activeTag_IDs, shuffled_PROFILES]);

  // nav_REF

  const header_REF = useRef(null);

  const UPDATE_tags = (tag, action) => {
    SET_activeTagIDs((prevactiveTag_IDs) => {
      if (action === "deleteAll") return new Set();
      const newactiveTag_IDs = new Set(prevactiveTag_IDs);
      action === "add" ? newactiveTag_IDs.add(tag._id) : newactiveTag_IDs.delete(tag._id);
      window.scrollTo({
        top:
          window_WIDTH > 1100
            ? tagbar_REF.current.offsetTop - nav_REF.current.clientHeight
            : header_REF.current.offsetHeight,
        behavior: "smooth",
      });

      return newactiveTag_IDs;
    });
  };

  return (
    <div className={css.explore_WRAP}>
      <div className={css.left}>
        <Header header_REF={header_REF}>
          {/* <Breadcrumbss texts_ARR={["text_1", "text_2"]} urls_ARR={["#"]} /> */}
          <p>Look through {shuffled_PROFILES.length} places</p>
          {window_WIDTH >= 630 && <h1>Find what you're looking for in Heidelberg</h1>}
          {window_WIDTH <= 629 && window_WIDTH >= 450 && <h1>Explore the city of Heidelberg</h1>}
          {window_WIDTH <= 449 && <h1>Explore Heidelberg</h1>}
        </Header>
        <Tagbar
          categories={categories}
          all_TAGS={all_TAGS}
          activeTag_IDs={activeTag_IDs}
          potentialTag_IDs={potentialTag_IDs}
          SET_potentialTagIDs={SET_potentialTagIDs}
          window_WIDTH={window_WIDTH}
          UPDATE_tags={UPDATE_tags}
          tagGroups={tagGroups}
          tagUsages={tagUsages}
          tagbar_REF={tagbar_REF}
          result_COUNT={filtered_PROFILES.length}
          shuffled_PROFILES={shuffled_PROFILES}
        />
        {activeTag_IDs.size === 0 && (
          <Category_SWIPER
            categories={categories}
            window_WIDTH={window_WIDTH}
            shuffled_PROFILES={shuffled_PROFILES}
          />
        )}

        <section className={css.profile_GRID}>
          <AnimatePresence>
            {LOADING_profiles ? (
              [...Array(9)].map((_, i) => {
                return (
                  <motion.div
                    {...decoy_PROPS}
                    key={i}
                    className={css.profile_DECOY}
                    data-loading="true"
                  ></motion.div>
                );
              })
            ) : (
              <>
                {filtered_PROFILES.map((profile) => (
                  <Profile_PREVIEW
                    key={profile?.name?.en}
                    profile={profile}
                    activeTag_IDs={activeTag_IDs}
                    UPDATE_tags={UPDATE_tags}
                    potentialTag_IDs={potentialTag_IDs}
                    SET_potentialTagIDs={SET_potentialTagIDs}
                    SET_panoramas={SET_panoramas}
                    search={search}
                    lang={lang}
                    tr={profilePreview_TR}
                    global_TR={global_TR}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </section>

        {activeTag_IDs.size > 0 && (
          <section className={css.profile_GRID} data-type="the-rest">
            {theRest_PROFILES.map((profile) => {
              return (
                <Profile_PREVIEW
                  key={profile._id}
                  profile={profile}
                  activeTag_IDs={activeTag_IDs}
                  UPDATE_tags={UPDATE_tags}
                  potentialTag_IDs={potentialTag_IDs}
                  SET_potentialTagIDs={SET_potentialTagIDs}
                  SET_panoramas={SET_panoramas}
                  search={search}
                  lang={lang}
                  tr={profilePreview_TR}
                  global_TR={global_TR}
                />
              );
            })}
          </section>
        )}
      </div>
      {window_WIDTH > 1100 && (
        <div className={css.right}>
          <Tagbox
            all_TAGS={all_TAGS}
            tagGroups={tagGroups}
            tagUsages={tagUsages}
            activeTag_IDs={activeTag_IDs}
            UPDATE_tags={UPDATE_tags}
            potentialTag_IDs={potentialTag_IDs}
            SET_potentialTagIDs={SET_potentialTagIDs}
            width={window_WIDTH}
            shuffled_PROFILES={shuffled_PROFILES}
          />
        </div>
      )}
      {window_WIDTH < 1100 &&
        (potentialTag_IDs.toAdd_IDs.size > 0 || potentialTag_IDs.toDelete_IDs.size > 0) && (
          <PotentialTags_MODAL
            {...{
              potentialTag_IDs,
              SET_potentialTagIDs,
              all_TAGS,
              UPDATE_tags,
              activeTag_IDs: activeTag_IDs,
              tagUsages,
              shuffled_PROFILES,
            }}
          />
        )}
    </div>
  );
}

function Modal360({ panoramas, SET_panoramas }) {
  return (
    <div className="modal360">
      <Panorama panoramas={panoramas} />
      <div
        className="btn_CLOSE"
        onClick={(e) => {
          e.stopPropagation();
          SET_panoramas(null);
        }}
      >
        X
      </div>
    </div>
  );
}
