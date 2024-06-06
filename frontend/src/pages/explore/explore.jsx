//
//
//
import { useState, useContext, useEffect, useRef } from "react";
import css from "./explore.module.css";

import Profile_PREVIEW from "../../components/Profile_PREVIEW/Profile_PREVIEW";
import Panorama from "../../components/panorama/panorama";
import { SavedProfileIDs_CONTEXT } from "../../contexts/savedProfiles";

import { Lang_CONTEXT } from "../../contexts/lang";

import { profilePreview_TR } from "../../translations";
import { global_TR } from "../../translations";
import { Header } from "./components/header/Header";
import { Tagbar } from "./components/Tagbar/Tagbar";
import { CategoryBar } from "./components/CategoryBar/CategoryBar";
import { HeartConfetti } from "../../components/HeartConfetti/HeartConfetti";
import { FontSizeContext } from "../../contexts/fontSize";
import { Sidepanel } from "./components/Sidepanel/Sidepanel";

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

  const [active_TAGS, SET_activeTags] = useState(new Set());
  const [nonActive_TAGS, SET_nonActive_TAGS] = useState(new Set([all_TAGS.map((tag) => tag._id)]));
  const [potential_TAGS, SET_potentialTags] = useState({
    toDelete_IDs: new Set(),
    toAdd_IDs: new Set(),
  });

  useEffect(() => {
    SET_filteredProfiles(profiles);
  }, [profiles]);

  useEffect(() => {
    SET_nonActive_TAGS(new Set(all_TAGS.map((tag) => tag._id)));
  }, [all_TAGS]);

  // useEffect(() => {
  //   console.log(active_TAGS);
  //   console.log(nonActive_TAGS);
  // }, [nonActive_TAGS, active_TAGS]);

  const UPDATE_tags = (tag, action) => {
    SET_activeTags((prevTags) => {
      const updatedTags = new Set(prevTags);
      action === "add" ? updatedTags.add(tag._id) : updatedTags.delete(tag._id);

      // if the tag is active, remove it from the nonActive_TAGS and vise versa
      SET_nonActive_TAGS((prevTags) => {
        const updatedTags = new Set(prevTags);
        action === "add" ? updatedTags.delete(tag._id) : updatedTags.add(tag._id);
        return updatedTags;
      });

      return updatedTags;
    });
  };

  return (
    <div className={css.explore_WRAP}>
      <div className={css.left}>
        <Header
          window_WIDTH={window_WIDTH}
          profile_COUNT={profiles.length}
          search={search}
          SET_search={SET_search}
        />
        <Tagbar
          categories={categories}
          all_TAGS={all_TAGS}
          active_TAGS={active_TAGS}
          nonActive_TAGS={nonActive_TAGS}
          potential_TAGS={potential_TAGS}
          window_WIDTH={window_WIDTH}
          UPDATE_tags={UPDATE_tags}
        />
        <CategoryBar categories={categories} window_WIDTH={window_WIDTH} />
        <section className={css.profile_GRID}>
          {filtered_PROFILES.map((profile) => {
            return (
              <Profile_PREVIEW
                key={profile._id}
                profile={profile}
                active_TAGS={active_TAGS}
                UPDATE_tags={UPDATE_tags}
                potential_TAGS={potential_TAGS}
                SET_potentialTags={SET_potentialTags}
                SET_panoramas={SET_panoramas}
                search={search}
                lang={lang}
                tr={profilePreview_TR}
                global_TR={global_TR}
              />
            );
          })}

          {filtered_PROFILES.map((profile) => {
            return (
              <Profile_PREVIEW
                key={profile._id}
                profile={profile}
                active_TAGS={active_TAGS}
                UPDATE_tags={UPDATE_tags}
                SET_panoramas={SET_panoramas}
                potential_TAGS={potential_TAGS}
                SET_potentialTags={SET_potentialTags}
                search={search}
                lang={lang}
                tr={profilePreview_TR}
                global_TR={global_TR}
              />
            );
          })}
        </section>
      </div>
      {window_WIDTH > 1100 && (
        <div className={css.right}>
          <Sidepanel
            all_TAGS={all_TAGS}
            tagGroups={tagGroups}
            tagUsages={tagUsages}
            active_TAGS={active_TAGS}
            UPDATE_tags={UPDATE_tags}
            potential_TAGS={potential_TAGS}
            SET_potentialTags={SET_potentialTags}
          />
        </div>
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
