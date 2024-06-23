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

export default function ReportProblem_PAGE() {
  const { width } = USE_windowSize();
  const [search, SET_search] = useState("");

  const [message, SET_message] = useState("");
  const [name, SET_name] = useState("");
  const [email, SET_email] = useState("");
  const [inquiry, SET_inquiry] = useState({ topic: "", question: "Wie können wir Ihnen helfen?" });

  useEffect(() => {
    const questions = {
      "Technisches Problem":
        "Es tut uns leid, dass Sie technische Fehler entdeckt haben. Beschreiben Sie bitte das Problem so detailiert wie möglich.",
      "Tippfehler melden": "Vielen Dank, dass Sie aufpassen! Wo kann man den Tippfehler finden?",
      "Rechtliche Meldung": "Beschreiben Sie bitte die rechtliche Meldung",
      Sonstiges: "Welches Problem möchten Sie melden?",
    };
    SET_inquiry({
      ...inquiry,
      question: questions[inquiry.topic] || "Wie können wir Ihnen helfen?",
    });
  }, [inquiry.topic]);

  const { tagUsages, LOADING_tagUsages, tagUsages_ERROR } = USE_fetchTagUsages();
  const { profiles, LOADING_profiles, profiles_ERROR } = USE_fetchProfiles();
  const { categories, LOADING_categories, categories_ERROR, available_CATEGORIES } =
    USE_fetchCategories();

  const nav_REF = useRef(null);

  return (
    <Simple_BLOCK>
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
            <Breadcrumbs texts_ARR={["Homepage", "Report problem"]} urls_ARR={["#"]} />
            {width > 750 && <h1>Report a problem you found on Localmore</h1>}
            {width <= 750 && width > 550 && <h1>Report a problem you found</h1>}
            {width <= 550 && <h1> Report a problem</h1>}
          </Header>
          {/* {width <= 1000 && <ContactPerson_WRAP IS_mobileDevice={IS_mobileDevice} />} */}

          <Form autoComplete="on">
            {/* <Simple_BLOCK>
              <h4>
                Es tut uns leid, dass Ihnen etwas auf unserer Seite stört! Teilen Sie es gerne mit,
                damit wir es schellstmöglich korrigieren können.
              </h4>
            </Simple_BLOCK> */}
            <Simple_BLOCK>
              <h3>Was für ein Problem möchten Sie melden?</h3>
              <Radio_LINES
                required={true}
                label="Was für ein Problem möchten Sie melden?"
                value={inquiry.topic}
                SET_value={(value) => SET_inquiry({ ...inquiry, topic: value })}
                options={[
                  "Technisches Problem",
                  "Falscher / veralteter Inhalt",
                  "Tippfehler melden",
                  "Rechtliche Meldung",
                  "Sonstiges",
                ]}
              />
            </Simple_BLOCK>
            <Simple_BLOCK>
              <h3>Beschreiben Sie das Problem</h3>
              <Text_AREA
                label={inquiry.question}
                value={message}
                SET_value={SET_message}
                required={true}
              />
            </Simple_BLOCK>
            <Simple_BLOCK>
              <h3>Erzählen Sie über sich selbst.</h3>
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
                type="email"
              />
            </Simple_BLOCK>

            <Simple_BLOCK>
              <p>
                Ihre Meldung erreicht{" "}
                <a href="mailto: domassirbike@gmail.com" className="link_SPAN">
                  domassirbike@gmail.com
                </a>
              </p>
              <Btn
                styles={["btn-44", "brand", "flex"]}
                text={"Meldung abschicken"}
                onClick={() => {}}
                type="submit"
              />
            </Simple_BLOCK>
          </Form>
        </SimplePage_MAIN>

        {width > 1000 && <SimplePage_SIDE />}
      </SimplePageContent_WRAP>
    </Simple_BLOCK>
  );
}
