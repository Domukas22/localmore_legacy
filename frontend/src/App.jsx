import "./styles/reset.css";
import "./styles/App.css";
import { useState, useEffect, useMemo } from "react";
import { LIST_staticProfiles, LIST_allTags, LIST_tagUsages } from "./DB.js";
import Explore from "./pages/explore/explore.jsx";
import { savedProfileIDs_CONTEXT } from "./contexts/savedProfiles.jsx";

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

  const [savedProfile_IDs, SET_savedProfileIDs] = useState(
    new Set(JSON.parse(localStorage.getItem("savedProfile_IDs")) || [])
  );

  const ADD_toSaved = (profileID) =>
    SET_savedProfileIDs((prevIDs) => new Set([...prevIDs, profileID]));

  const REMOVE_fromSaved = (profileID) => {
    const newIDs = new Set(savedProfile_IDs);
    newIDs.delete(profileID);
    SET_savedProfileIDs(newIDs);
  };

  useEffect(() => {
    localStorage.setItem("savedProfile_IDs", JSON.stringify(Array.from(savedProfile_IDs)));
  }, [savedProfile_IDs]);

  return (
    <>
      <savedProfileIDs_CONTEXT.Provider value={{ savedProfile_IDs, ADD_toSaved, REMOVE_fromSaved }}>
        <Explore
          profiles={staticProfiles}
          tags={tags}
          tagUsages={tagUsages}
          windowWidth={windowWidth}
          IS_touchDevice={IS_touchDevice}
        />
      </savedProfileIDs_CONTEXT.Provider>
    </>
  );
}
