//
//

import { Breadcrumbs } from "../../../components/Header/Breadcrumbs/Breadcrumbs";
import { Header } from "../../../components/Header/Header";
import css from "./Contact_PAGE.module.css";
import { USE_windowSize } from "../../../hooks/USE_windowSize";
import Text_INPUT from "../../../components/Form/Inputs/Text_INPUT/Text_INPUT";
import Text_AREA from "../../../components/Form/Inputs/Text_AREA/Text_AREA";
import { useRef, useState } from "react";
import { Btn } from "../../../components/Btn/Btn";
import Normal_NAV from "../../../components/Nav/Normal_NAV/Normal_NAV";
import { USE_fetchData } from "../../../hooks/fetch/USE_fetchData";
import { base_URL } from "../../../config";

import Domas from "../../../assets/images/Domas.jpg";

export default function ReportProblem_PAGE() {
  const { width } = USE_windowSize();
  const [search, SET_search] = useState("");

  const [problem, SET_problem] = useState("");
  const [name, SET_name] = useState("");
  const [email, SET_email] = useState("");

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

  if (profiles_ERROR) console.log(profiles_ERROR);
  if (tagUsages_ERROR) console.log(tagUsages_ERROR);
  if (categories_ERROR) console.log(categories_ERROR);

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
      <div className={css.all_WRAP}>
        <div className={css.content_WRAP}>
          <div className={css.left}>
            <Header>
              <Breadcrumbs texts_ARR={["Homepage", "Report Problem"]} urls_ARR={["#"]} />
              <h1>Report a problem you found on Localmore</h1>
            </Header>
            {/* <div className={css.text_BLOCK}>
            <h3>
              We are sorry that something on our site bothers you! Please let us know so we can
              correct it as soon as possible.
            </h3>
          </div> */}

            <form autoComplete="on">
              <div className={css.block}>
                <h3>Welches Problem haben Sie entdeckt?</h3>
                <Text_AREA
                  label="Beschreiben Sie bitte das Problem so ausführlich wie möglich."
                  value={problem}
                  SET_value={SET_problem}
                  required={true}
                />
              </div>
              <div className={css.block}>
                <h3>Bitte erzählen Sie über sich selbst.</h3>
                <Text_INPUT
                  label="Wie heißen Sie?"
                  name="name"
                  autoComplete="name"
                  required={true}
                  value={name}
                  SET_value={SET_name}
                />
                <Text_INPUT
                  label="Unter welcher E-Mail können wir Sie erreichen?"
                  name="email"
                  autoComplete="email"
                  required={true}
                  value={email}
                  SET_value={SET_email}
                />
              </div>
            </form>
          </div>
          <div className={css.right}>
            <div className={css.upper_BLOCK}>
              <h2>Ihre Kontaktperson</h2>
              <img src={Domas} alt="Domas Sirbike, Inhaber von Localmore" />
              <h3>Domas Sirbike</h3>
              <p>Inhaber von Localmore</p>
            </div>

            <div className={css.lower_BLOCK}>
              <div>
                <p>
                  Handy: <span>0157 5825 9215</span>
                </p>
                <p>
                  E-Mail: <span>email@gmail.com</span>
                </p>
              </div>
              <div>
                <p style={{ fontStyle: "italic" }}>
                  Was auch immer Sie uns mitteilen möchten: Wir haben immer ein offenes Ohr für Sie
                  :)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
