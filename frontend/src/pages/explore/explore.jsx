//
//
//
import { useState } from "react";
import css from "./explore.module.css";
import SidePanel from "./sidepanel/sidepanel";
import ProfilePreview from "../../components/ProfilePreview/ProfilePreview";
import SphereViewer from "../../SphereViewer";

export default function Explore({ profiles, tags, tagUsages, windowWidth }) {
  const [panoramas, SET_panoramas] = useState(null);
  const [SHOW_360, SET_show360] = useState(false);

  function OPEN_panorama(panoramas) {
    SET_show360(true);
    SET_panoramas(panoramas);
  }

  return (
    <>
      <div className={css.explore_WRAP}>
        <div className={css.left}>
          <div className={css.profile_GRID}>
            {profiles.map((profile) => {
              return (
                <ProfilePreview
                  key={profile._id}
                  profile={profile}
                  OPEN_panorama={OPEN_panorama}
                  windowWidth={windowWidth}
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
      {SHOW_360 && <Modal360 panoramas={panoramas} setModal360_open={SET_show360} />}
    </>
  );
}

function Modal360({ panoramas, setModal360_open }) {
  return (
    <div className="modal360">
      <SphereViewer panoramas={panoramas} />
      <div
        className="btn_CLOSE"
        onClick={(e) => {
          e.stopPropagation();
          setModal360_open(false);
        }}
      >
        X
      </div>
    </div>
  );
}
