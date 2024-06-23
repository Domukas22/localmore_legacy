//
//

import { useRef, useState } from "react";
import { USE_windowSize } from "../../../hooks/USE_windowSize";
import USE_fetchTagUsages from "../../../hooks/fetch/USE_fetchTagUsages";
import USE_fetchProfiles from "../../../hooks/fetch/USE_fetchProfiles";
import USE_fetchCategories from "../../../hooks/fetch/USE_fetchCategories";
import Normal_NAV from "../../../components/Nav/Normal_NAV/Normal_NAV";
import {
  SimplePageContent_WRAP,
  SimplePage_MAIN,
  SimplePage_SIDE,
  Simple_BLOCK,
} from "../SimplePage_COMPS";
import { Header } from "../../../components/Header/Header";
import { Breadcrumbs } from "../../../components/Header/Breadcrumbs/Breadcrumbs";

export default function Consent_PAGE() {
  const { width } = USE_windowSize();
  const [search, SET_search] = useState("");

  const { tagUsages, LOADING_tagUsages, tagUsages_ERROR } = USE_fetchTagUsages();
  const { profiles, LOADING_profiles, profiles_ERROR } = USE_fetchProfiles();
  const { categories, LOADING_categories, categories_ERROR, available_CATEGORIES } =
    USE_fetchCategories();

  const nav_REF = useRef(null);

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
      <SimplePageContent_WRAP>
        <SimplePage_MAIN>
          <Header padding={false}>
            <Breadcrumbs texts_ARR={["Homepage", "Attributions"]} urls_ARR={["#"]} />
            <h1>Consent</h1>
          </Header>

          <Simple_BLOCK>
            <div>Epic consent</div>
          </Simple_BLOCK>
        </SimplePage_MAIN>

        {width > 1000 && <SimplePage_SIDE />}
      </SimplePageContent_WRAP>
    </>
  );
}
