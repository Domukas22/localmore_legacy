//
//
//
import { useState } from "react";
import css from "./explore.module.css";
import SidePanel from "./sidepanel/sidepanel";
import ProfilePreview from "../../components/ProfilePreview/ProfilePreview";
import SphereViewer from "../../SphereViewer";

export default function Explore({ profiles, tags, tagUsages, windowWidth, IS_touchDevice }) {
  const [panoramas, SET_panoramas] = useState(null);
  const [search, SET_search] = useState("");

  return (
    <>
      <input type="text" value={search} onChange={(e) => SET_search(e.target.value)} />
      {/* <div style={{ background: "red", height: "770px" }}></div> */}
      <div className={css.explore_WRAP}>
        <div className={css.left}>
          <div className={css.profile_GRID}>
            {profiles.map((profile) => {
              return (
                <ProfilePreview
                  key={profile._id}
                  profile={profile}
                  SET_panoramas={SET_panoramas}
                  windowWidth={windowWidth}
                  IS_touchDevice={IS_touchDevice}
                  search={search}
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
      {panoramas !== null && <Modal360 panoramas={panoramas} SET_panoramas={SET_panoramas} />}
    </>
  );
}

function Modal360({ panoramas, SET_panoramas }) {
  return (
    <div className="modal360">
      <SphereViewer panoramas={panoramas} />
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
