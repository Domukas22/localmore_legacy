//
//
import css from "./Profile.module.css";
import "../../styles/Swiper.css";

import { useParams } from "react-router-dom";
import { USE_windowSize } from "../../hooks/USE_windowSize.js";
import { base_URL } from "../../config.js";
import { USE_fetchData } from "../../hooks/fetch/USE_fetchData.js";
import { useMemo, useRef, useState } from "react";
import Normal_NAV from "../../components/Nav/Normal_NAV/Normal_NAV.jsx";
import { ProfileContent_WRAP } from "./components/ProfileContent_WRAP.jsx";
import MobileProfile_NAV from "../../components/Nav/MobileProfile_NAV/MobileProfile_NAV.jsx";
import USE_windowScroll from "../../hooks/USE_windowScroll.js";

export function Profile() {
  const [search, SET_search] = useState("");
  const { width } = USE_windowSize();
  const { id } = useParams();

  const scrolled = USE_windowScroll();

  const {
    data: profile,
    loading: LOADING_profile,
    error: profile_ERROR,
  } = USE_fetchData(`${base_URL}/profile/${id}`);

  const {
    data: profiles,
    loading: LOADING_profiles,
    error: profiles_ERROR,
  } = USE_fetchData(`${base_URL}/staticProfiles`);

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

  const available_CATEGORIES = categories?.filter((category) => category?.visible);
  const nav_REF = useRef(null);

  if (profile_ERROR) console.log(profile_ERROR);
  if (profiles_ERROR) console.log(profiles_ERROR);
  if (tagUsages_ERROR) console.log(tagUsages_ERROR);
  if (categories_ERROR) console.log(categories_ERROR);

  return (
    <>
      {width > 700 && (
        <Normal_NAV
          tagUsages={tagUsages}
          search={search}
          SET_search={SET_search}
          categories={available_CATEGORIES}
          profiles={profiles}
          nav_REF={nav_REF}
        />
      )}
      {width <= 700 && (
        <MobileProfile_NAV white={scrolled > 150} profile_NAME={profile?.name?.en} />
      )}
      {width > 700 && (
        <div
          className={css.color_FADE}
          data-ss={profile?.color_FADE}
          style={{ background: profile?.color_FADE }}
        ></div>
      )}
      <ProfileContent_WRAP profile={profile} />
    </>
  );
}
