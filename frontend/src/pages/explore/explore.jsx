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

import { tr } from "../../components/Profile_PREVIEW/translations";
import { global_TR } from "../../global_TRANSLATIONS";

export default function Explore({ profiles, tags, tagUsages, windowWidth }) {
  const [panoramas, SET_panoramas] = useState(null);
  const [search, SET_search] = useState("");

  const { savedProfile_IDs } = useContext(SavedProfileIDs_CONTEXT);
  const { lang, TOGGLE_lang } = useContext(Lang_CONTEXT);

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => SET_search(e.target.value)}
        style={{ fontSize: "17px", width: "300px" }}
      />
      <h4>Saved ids: {savedProfile_IDs.size}</h4>
      <button
        onClick={() => TOGGLE_lang("en")}
        style={{ padding: "8px 12px", border: "1px solid grey", marginRight: "4px" }}
      >
        EN
      </button>
      <button
        onClick={() => TOGGLE_lang("de")}
        style={{ padding: "8px 12px", border: "1px solid grey" }}
      >
        DE
      </button>

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
                tr={tr}
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
