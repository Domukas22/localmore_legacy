import "./styles/reset.css";
import "./styles/App.css";

import { useState } from "react";
import Explore from "./pages/explore/explore.jsx";
import { USE_windowSize } from "./hooks/USE_windowWidth";
import { USE_fetchData } from "./hooks/USE_fetchData.js";
import { base_URL } from "./config.js";
import Nav from "./components/Nav/Nav.jsx";

import { AnimatePresence } from "framer-motion";
import { SearchResults_MODAL } from "./components/Modals/SearchResults_MODAL/SearchResults_MODAL.jsx";
import { USE_getCategories } from "./hooks/USE_getCategories.js";

export function App() {
  const [search, SET_search] = useState("");
  const { width } = USE_windowSize();

  // memoize the fetch calls

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

  // ------------------------------

  // TODO => end-categories that have no profiles, or start-categories with
  // empty end-categories should not be displayed

  // const available_CATEGORIES = categories?.filter((category) => category?.name?.en !== "All");
  // const { startCateg_ARR, endCateg_ARR, GET_subCategories } = USE_getCategories(categories);

  // ------------------------------

  if (profile_ERROR) console.log(profile_ERROR);

  return (
    <>
      <Nav
        tagUsages={tagUsages}
        search={search}
        SET_search={SET_search}
        categories={categories}
        profiles={profiles}
      />
      <AnimatePresence>
        {search !== "" && <SearchResults_MODAL search={search} profiles={profiles} />}
      </AnimatePresence>

      <Explore
        profiles={profiles}
        tags={tags}
        tagUsages={tagUsages}
        window_WIDTH={width}
        search={search}
        SET_search={SET_search}
        categories={categories}
        tagGroups={tagGroups}
      />
    </>
  );
}
