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

export default function Explore({
  profiles,
  tags,
  tagUsages,
  window_WIDTH,
  search,
  categories,
  SET_search,
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
  tags,
}) {
  return (
    <div className={css.explore_WRAP}>
      <Header
        window_WIDTH={window_WIDTH}
        profile_COUNT={profiles.length}
        search={search}
        SET_search={SET_search}
      />

      <Tagbar categories={categories} tags={tags} window_WIDTH={window_WIDTH} />

      <CategoryBar categories={categories} window_WIDTH={window_WIDTH} />

      <section className={css.profile_GRID}>
        {profiles.map((profile) => {
          return (
            <Profile_PREVIEW
              key={profile._id}
              profile={profile}
              SET_panoramas={SET_panoramas}
              search={search}
              lang={lang}
              tr={profilePreview_TR}
              global_TR={global_TR}
            />
          );
        })}
      </section>
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
