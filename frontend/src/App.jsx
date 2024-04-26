import "./styles/reset.css";
import "./styles/App.css";
import { useState, useEffect, useMemo } from "react";
import { LIST_staticProfiles, LIST_allTags, LIST_tagUsages } from "./DB.js";
import Explore from "./pages/explore/explore.jsx";
import { SavedProfileIDs_PROVIDER } from "./contexts/savedProfiles.jsx";
import { Lang_PROVIDER } from "./contexts/lang.jsx";

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

  useEffect(function FETCH_dataFromDB() {
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

  useEffect(function HANDLE_windowSize() {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Lang_PROVIDER>
        <SavedProfileIDs_PROVIDER>
          <Explore
            profiles={staticProfiles}
            tags={tags}
            tagUsages={tagUsages}
            windowWidth={windowWidth}
            IS_touchDevice={IS_touchDevice}
          />
        </SavedProfileIDs_PROVIDER>
      </Lang_PROVIDER>
    </>
  );
}
