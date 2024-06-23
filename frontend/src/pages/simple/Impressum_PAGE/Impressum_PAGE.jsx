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

export default function Impressum_PAGE() {
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
            <h1>Impressum</h1>
          </Header>

          <Simple_BLOCK>
            <div>
              <p>
                Localmore
                <br></br>
                Domas Sirbike
                <br></br>
                Kumamotostrasse 3<br></br>
                69115 Heidelberg
              </p>
            </div>
            <div>
              <p>
                <strong>Kontakt</strong>
                <br></br>
                Telefon: 0157 5825 9215
                <br></br>
                E-Mail: domassirbike@gmail.com
              </p>
            </div>
            <div>
              <strong>Gewerbeanmeldung</strong>
              <br></br>
              <p>
                Die Gewerbeerlaubnis nach § 14 oder § 55c GewO wurde am 15.05.2022 von folgender
                Stelle erteilt: IHK Rhein-Neckar.
              </p>
            </div>
            <div>
              <p>
                <strong>Redaktionell verantwortlich</strong>
                <br></br>
                Domas Sirbike
              </p>
            </div>
          </Simple_BLOCK>
        </SimplePage_MAIN>

        {width > 1000 && <SimplePage_SIDE />}
      </SimplePageContent_WRAP>
    </>
  );
}
