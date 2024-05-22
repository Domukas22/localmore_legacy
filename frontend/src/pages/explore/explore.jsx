//
//
//
import { useState, useContext } from "react";
import css from "./explore.module.css";
import SidePanel from "./sidepanel/sidepanel";
import Profile_PREVIEW from "../../components/Profile_PREVIEW/Profile_PREVIEW";
import Panorama from "../../components/panorama/panorama";
import { SavedProfileIDs_CONTEXT } from "../../contexts/savedProfiles";
import { Lang_CONTEXT } from "../../contexts/lang";

import { profilePreview_TR } from "../../translations";
import { global_TR } from "../../translations";

export default function Explore({ profiles, tags, tagUsages, windowWidth, search }) {
  const [panoramas, SET_panoramas] = useState(null);
  const { lang } = useContext(Lang_CONTEXT);

  return (
    <>
      <Explore_GRID
        profiles={profiles}
        SET_panoramas={SET_panoramas}
        search={search}
        lang={lang}
        windowWidth={windowWidth}
      />
      {panoramas !== null && <Modal360 panoramas={panoramas} SET_panoramas={SET_panoramas} />}
    </>
  );
}

function Explore_GRID({ profiles, SET_panoramas, search, lang, windowWidth }) {
  return (
    <div className={css.explore_WRAP}>
      <div className={css.left}>
        <div className={css.profile_GRID}>
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
        </div>
      </div>
      {windowWidth > 1100 && (
        <div className={css.right}>
          <SidePanel />
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
