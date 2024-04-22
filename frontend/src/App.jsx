import { useState, useEffect, useMemo } from "react";
import LM_Logo from "/LM_logo_long.svg";
import Pagination from "./components/pagination/pagination.jsx";
import "./styles/reset.css";
import "./styles/App.css";
import { LIST_staticProfiles, LIST_allTags, LIST_tagUsages } from "./DB.js";
import SphereViewer from "./SphereViewer.jsx";
import { Cache } from "@photo-sphere-viewer/core";
import ProfilePreview from "./components/ProfilePreview/ProfilePreview.jsx";
import Swipe from "./swipertest.jsx";
import Explore from "./pages/explore/explore.jsx";

import { Btn } from "./components/btn/btn.jsx";
Cache.enabled = true;

// const panoramas = {
//   pan1: {
//     img_URL: "https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-2.jpg",
//     markers: [
//       {
//         id: "pan2",
//         position: { yaw: 360, pitch: 0 },
//       },
//       {
//         id: "pan3",
//         position: { yaw: 0.105, pitch: 0.004 },
//       },
//     ],
//   },
//   pan2: {
//     img_URL: "https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg",
//     markers: [
//       {
//         id: "pan1",
//         position: { yaw: 0.265, pitch: 0.044 },
//       },
//       {
//         id: "pan3",
//         position: { yaw: 0.405, pitch: 0.004 },
//       },
//     ],
//   },
//   pan3: {
//     img_URL: "https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-6.jpg",
//     markers: [
//       {
//         id: "pan1",
//         position: { yaw: 0.165, pitch: 0.044 },
//       },
//       {
//         id: "pan2",
//         position: { yaw: 0.705, pitch: 0.004 },
//       },
//     ],
//   },
// };

export function App() {
  const [staticProfiles, setStaticProfiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagUsages, setTagUsages] = useState([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const IS_touchDevice = useMemo(
    () =>
      "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
    []
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [panoramas, SET_panoramas] = useState(null);
  const [SHOW_360, SET_show360] = useState(false);

  useEffect(() => {
    LIST_staticProfiles()
      .then((data) => setStaticProfiles(data))
      .catch((error) => console.error("Error fetching data:", error));
    LIST_allTags()
      .then((data) => setTags(data))
      .catch((error) => console.error("Error fetching data:", error));
    LIST_tagUsages()
      .then((data) => setTagUsages(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function OPEN_panorama(panoramas) {
    SET_show360(true);
    SET_panoramas(panoramas);
  }

  return (
    <>
      <Explore
        profiles={staticProfiles}
        tags={tags}
        tagUsages={tagUsages}
        windowWidth={windowWidth}
        IS_touchDevice={IS_touchDevice}
      />
      {/* <div className="allWrap">
        <div className="profilesWrap">
          {staticProfiles.map((profile) => {
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
      {SHOW_360 && <Modal360 panoramas={panoramas} setModal360_open={SET_show360} />} */}
    </>
  );
}

// create a react component that returns a fixed, full page modal with the 360 view inside like I have built

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
