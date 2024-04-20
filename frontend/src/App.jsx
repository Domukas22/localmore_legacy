import { useState, useEffect } from "react";
import LM_Logo from "/LM_logo_long.svg";
import Pagination from "./components/pagination/pagination.jsx";
import "./styles/reset.css";
import "./styles/App.css";
import { LIST_staticProfiles, LIST_allTags, LIST_tagUsages } from "./DB.js";
import SphereViewer from "./SphereViewer.jsx";
import { Cache } from "@photo-sphere-viewer/core";
import ProfilePreview from "./components/ProfilePreview/ProfilePreview.jsx";
import Swipe from "./swipertest.jsx";

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
  const [img_VARIANT, SET_imgVariant] = useState("/Big");

  const [panoramas, SET_panoramas] = useState(null);
  const [SHOW_360, SET_show360] = useState(false);

  const [modalProfile, setModalProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("profiles");

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
      <nav>
        <div
          className="nav_BTN"
          data-active={currentTab === "profiles"}
          onClick={() => setCurrentTab("profiles")}
        >
          Profiles
        </div>
        <div
          className="nav_BTN"
          data-active={currentTab === "tags"}
          onClick={() => setCurrentTab("tags")}
        >
          Tags
        </div>
      </nav>
      {/* <Btn text="Brand button" style="brand" />
      <Btn text="Inverted brand button" style="brand-inverted" /> */}
      {currentTab === "profiles" && staticProfiles.length > 0 && (
        <div className="allWrap">
          <div className="profilesWrap">
            {staticProfiles.map((profile) => {
              return (
                <ProfilePreview key={profile._id} profile={profile} OPEN_panorama={OPEN_panorama} />
              );
            })}
          </div>
        </div>
      )}

      {currentTab === "tags" && tags.length > 0 && (
        <div className="tagWrap">
          {tags.map((tag) => {
            const tagCount = tagUsages
              .filter((tagUsage) => tagUsage.tag_ID === tag._id)
              .reduce((acc, tagUsage) => acc + tagUsage.count, 0);

            return (
              <div key={tag._id} className="tag">
                <img src={tag.icon?.url} className="tagIcon" />
                <p className="profileSubtitle">{tag.name.en}</p>
                <p className="tagCount">{tagCount}</p>
              </div>
            );
          })}
        </div>
      )}
      {SHOW_360 && <Modal360 panoramas={panoramas} setModal360_open={SET_show360} />}
      {modalOpen && (
        <Modal profile={modalProfile} setModalOpen={setModalOpen} img_VARIANT={img_VARIANT} />
      )}
    </>
  );
}

// create a react component that returns a fixed, full page modal with the 360 view inside like I have built

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

function Modal({ profile, setModalOpen, img_VARIANT }) {
  return (
    <div
      className="modal"
      onClick={(e) => {
        e.stopPropagation();
        setModalOpen(false);
      }}
    >
      <div
        className="content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal_TOP">
          <div className="modalTopLeft_WRAP">
            <h2>{profile.name.en}</h2>
            <p>{profile.subname.en}</p>
            {profile.IS_new && <p>NEW</p>}
          </div>
          <div
            className="close_BTN"
            onClick={() => {
              setModalOpen(false);
            }}
          ></div>
        </div>
        <div className="modal_CONTENT">
          <div className="modal_BOX">
            <h4>Tags</h4>
            <div className="tagWrap">
              {profile.tags.map((tag) => {
                return (
                  <div key={tag._id} className="tag">
                    <img src={tag.icon.url} className="tagIcon" />
                    <p className="profileSubtitle">{tag.name.en}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="modal_BOX">
            <h4>🖥️ Desktop images</h4>
            <div className="img_WRAP">
              {profile.img.desktop.map((img, index) => {
                return (
                  <img key={`desk-${index}`} src={img + img_VARIANT} className="modal_IMG desk" />
                );
              })}
            </div>
          </div>
          <div className="modal_BOX">
            <h4>📱 Mobile images</h4>
            <div className="img_WRAP">
              {profile.img.mobile.map((img, index) => {
                return (
                  <img key={`mob-${index}`} src={img + img_VARIANT} className="modal_IMG mob" />
                );
              })}
            </div>
          </div>

          <div className="modal_BOX">
            <h4>📍 Adress</h4>
            <ul>
              <li key="adress_full">
                {profile.adress.street}, {profile.adress.plz} {profile.city.name.en}
              </li>
              <li key="region">{profile.adress.region}</li>
              <li key="coords">{profile.adress.coords}</li>
              <li key="gMaps">{profile.adress.gMaps}</li>
            </ul>
          </div>
          <div className="modal_BOX">
            <h4>✅ Pros</h4>
            <ul>
              {profile.pros.map((pro) => {
                return <li key={pro._id}>{pro.en}</li>;
              })}
            </ul>
          </div>
          <div className="modal_BOX">
            <h4>❌ Cons</h4>
            <ul>
              {profile.cons.map((con) => {
                return <li key={con._id}>{con.en}</li>;
              })}
            </ul>
          </div>

          <div className="modal_BOX">
            <h4>📝 {profile.about_TITLE.en}</h4>
            <p>{profile.about_PARAG.en}</p>
          </div>
          <div className="modal_BOX">
            <h4>🗂️ Categories</h4>
            <ul>
              {profile.categories.map((categ) => {
                return <li key={categ._id + "categ"}>{categ.name.en}</li>;
              })}
            </ul>
          </div>
          <div className="modal_BOX">
            <h4>🗃️ Category path</h4>
            <ul>
              {profile.category_PATH.map((categ) => {
                return <li key={categ._id + "categ_Path"}>{categ.name.en}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
