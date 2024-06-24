import "./styles/reset.css";
import "./styles/App.css";

import { useMemo, useRef, useState } from "react";
import Explore_PAGE from "./pages/Explore_PAGE/Explore_PAGE.jsx";
import { USE_windowSize } from "./hooks/USE_windowSize";
import { USE_fetchData } from "./hooks/fetch/USE_fetchData.js";
import { base_URL } from "./config.js";
import Normal_NAV from "./components/Nav/Normal_NAV/Normal_NAV.jsx";

import { AnimatePresence } from "framer-motion";
import { SearchResults_MODAL } from "./components/Modals/SearchResults_MODAL/SearchResults_MODAL.jsx";
import { USE_getCategories } from "./hooks/USE_getCategories.js";

const isProduction = import.meta.env.PROD;
const meta = import.meta;

export function App() {
  console.log(meta);

  const [search, SET_search] = useState("");
  const { width } = USE_windowSize();

  const {
    data: profiles,
    loading: LOADING_profiles,
    error: profile_ERROR,
  } = USE_fetchData(`${base_URL}/staticProfiles`);

  const {
    data: tags,
    loading: LOADING_tags,
    error: tags_ERROR,
  } = USE_fetchData(`${base_URL}/tags`);

  const {
    data: tagUsages,
    loading: LOADING_tagUsages,
    error: tagUsages_ERROR,
  } = USE_fetchData(`${base_URL}/tagUsages`);

  const {
    data: categories,
    loading: LOADING_categories,
    error: categories_ERROR,
  } = USE_fetchData(`${base_URL}/categories`);

  const {
    data: tagGroups,
    loading: LOADING_tagGroups,
    error: tagGroups_ERROR,
  } = USE_fetchData(`${base_URL}/tagGroups`);

  const available_CATEGORIES = categories?.filter((category) => category?.visible);
  const shuffled_PROFILES = useMemo(
    () => profiles?.sort(() => Math.random() - 0.5),
    [LOADING_profiles]
  );
  const nav_REF = useRef(null);

  if (profile_ERROR) console.log(profile_ERROR);

  return (
    <>
      <Normal_NAV
        tagUsages={tagUsages}
        search={search}
        SET_search={SET_search}
        categories={available_CATEGORIES}
        profiles={profiles}
        nav_REF={nav_REF}
      />
      <AnimatePresence>
        {search !== "" && <SearchResults_MODAL search={search} profiles={profiles} />}
      </AnimatePresence>

      <Explore_PAGE
        profiles_OBJ={{ shuffled_PROFILES, LOADING_profiles }}
        tags={tags}
        tagUsages={tagUsages}
        window_WIDTH={width}
        search={search}
        SET_search={SET_search}
        categories={available_CATEGORIES}
        tagGroups={tagGroups}
        nav_REF={nav_REF}
      />
    </>
  );
}
