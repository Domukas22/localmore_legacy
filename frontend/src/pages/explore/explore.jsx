//
//
//
import { useState, useContext, useEffect, useMemo } from "react";
import css from "./explore.module.css";

import Profile_PREVIEW from "../../components/Profile_PREVIEW/Profile_PREVIEW";
import Panorama from "../../components/panorama/panorama";

import { Lang_CONTEXT } from "../../contexts/lang";
import { profilePreview_TR } from "../../translations";
import { global_TR } from "../../translations";
import { Header } from "../../components/Header/Header";
import { Tagbar } from "./components/Tagbar/Tagbar";

import { Tagbox } from "../../components/Tagbox/Tagbox";
import { Btn } from "../../components/btn/btn";
import { ICON_dropDownArrow, ICON_x } from "../../components/icons/icons";
import { PotentialTags_NAV } from "./components/PotentialTags_NAV/PotentialTags_NAV";

export default function Explore({
  profiles,
  tags,
  tagUsages,
  window_WIDTH,
  search,
  categories,
  SET_search,
  tagGroups,
}) {
  const [panoramas, SET_panoramas] = useState(null);
  const { lang } = useContext(Lang_CONTEXT);

  return (
    <>
      <Explore_GRID
        profiles={profiles}
        SET_panoramas={SET_panoramas}
        search={search}
        lang={lang}
        window_WIDTH={window_WIDTH}
        categories={categories}
        tags={tags}
        tagGroups={tagGroups}
        tagUsages={tagUsages}
      />
      {panoramas !== null && <Modal360 panoramas={panoramas} SET_panoramas={SET_panoramas} />}
    </>
  );
}

function Explore_GRID({
  profiles,
  SET_panoramas,
  search,
  SET_search,
  lang,
  window_WIDTH,
  categories,
  tags: all_TAGS,
  tagGroups,
  tagUsages,
}) {
  const [filtered_PROFILES, SET_filteredProfiles] = useState([...profiles]);
  const theRest_PROFILES = useMemo(
    () => profiles.filter((profile) => !filtered_PROFILES.includes(profile)),
    [profiles, filtered_PROFILES]
  );

  const [activeTag_IDs, SET_activeTagIDs] = useState(new Set());
  const [potentialTag_IDs, SET_potentialTagIDs] = useState({
    toDelete_IDs: new Set(),
    toAdd_IDs: new Set(),
  });

  useEffect(() => {
    SET_filteredProfiles(profiles);
  }, [profiles]);

  useEffect(() => {
    if (activeTag_IDs.size === 0) {
      SET_filteredProfiles(profiles);
      return;
    }

    const filtered = profiles
      .filter((profile) => {
        return profile.tags.some((tag) => activeTag_IDs.has(tag._id));
      })
      .sort((a, b) => {
        const aCount = a.tags.filter((tag) => activeTag_IDs.has(tag._id)).length;
        const bCount = b.tags.filter((tag) => activeTag_IDs.has(tag._id)).length;
        return bCount - aCount;
      });

    SET_filteredProfiles(filtered);
  }, [activeTag_IDs, profiles]);

  const UPDATE_tags = (tag, action) => {
    SET_activeTagIDs((prevactiveTag_IDs) => {
      if (action === "deleteAll") return new Set();
      const newactiveTag_IDs = new Set(prevactiveTag_IDs);
      action === "add" ? newactiveTag_IDs.add(tag._id) : newactiveTag_IDs.delete(tag._id);
      return newactiveTag_IDs;
    });
  };

  return (
    <div className={css.explore_WRAP}>
      <div className={css.left}>
        <Header>
          <p>Look through {profiles.length} places</p>
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
        />
        {/* <CategoryBar categories={categories} window_WIDTH={window_WIDTH} /> */}
        <section className={css.profile_GRID}>
          {filtered_PROFILES.map((profile) => {
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
          />
        </div>
      )}
      {window_WIDTH < 1100 &&
        (potentialTag_IDs.toAdd_IDs.size > 0 || potentialTag_IDs.toDelete_IDs.size > 0) && (
          <PotentialTags_NAV
            {...{
              potentialTag_IDs,
              SET_potentialTagIDs,
              all_TAGS,
              UPDATE_tags,
              activeTag_IDs: activeTag_IDs,
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
