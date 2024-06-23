//
//
import css from "../SimplePage_COMPS.module.css";

import { useEffect, useRef, useState } from "react";
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
import Form from "../../../components/Form/Form";
import Text_INPUT from "../../../components/Form/Inputs/Text_INPUT/Text_INPUT";
import Radio_LINES from "../../../components/Form/Inputs/Radio_LINES/Radio_LINES";
import Text_AREA from "../../../components/Form/Inputs/Text_AREA/Text_AREA";
import { Btn } from "../../../components/Btn/Btn";
import USE_fetchIcons from "../../../hooks/fetch/USE_fetchIcons";

export default function Attributions_PAGE() {
  const { width } = USE_windowSize();
  const [search, SET_search] = useState("");

  const { tagUsages, LOADING_tagUsages, tagUsages_ERROR } = USE_fetchTagUsages();
  const { profiles, LOADING_profiles, profiles_ERROR } = USE_fetchProfiles();
  const { categories, LOADING_categories, categories_ERROR, available_CATEGORIES } =
    USE_fetchCategories();
  const { icons, LOADING_icons, icons_ERROR } = USE_fetchIcons();

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
            <h1>Here are out attributions</h1>
          </Header>
          {icons && (
            <Simple_BLOCK>
              <h3>Icon attribututions</h3>
              {icons.map((icon) => (
                <div key={icon._id} className={css.iconAttribution_LINE}>
                  <img src={icon.url} alt={icon.name?.en} className={css.icon} />
                  <p>
                    {icon.desc}, designed by{" "}
                    <a href={icon.attribution_URL}>{icon.attribution_TEXT}</a>
                  </p>
                </div>
              ))}
            </Simple_BLOCK>
          )}
        </SimplePage_MAIN>

        {width > 1000 && <SimplePage_SIDE />}
      </SimplePageContent_WRAP>
    </>
  );
}
