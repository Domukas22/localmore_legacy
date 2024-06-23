//
//

import { Breadcrumbs } from "../../../components/Header/Breadcrumbs/Breadcrumbs";
import { Header } from "../../../components/Header/Header";
import { USE_windowSize } from "../../../hooks/USE_windowSize";
import Text_INPUT from "../../../components/Form/Inputs/Text_INPUT/Text_INPUT";
import Text_AREA from "../../../components/Form/Inputs/Text_AREA/Text_AREA";
import { useEffect, useRef, useState } from "react";
import { Btn } from "../../../components/Btn/Btn";
import Normal_NAV from "../../../components/Nav/Normal_NAV/Normal_NAV";

import Form from "../../../components/Form/Form";
import Radio_LINES from "../../../components/Form/Inputs/Radio_LINES/Radio_LINES";
import USE_isMobileDevice from "../../../hooks/USE_isMobileDevice";
import {
  SimplePageContent_WRAP,
  SimplePage_MAIN,
  SimplePage_SIDE,
  Simple_BLOCK,
} from "../SimplePage_COMPS";
import USE_fetchCategories from "../../../hooks/fetch/USE_fetchCategories";
import USE_fetchProfiles from "../../../hooks/fetch/USE_fetchProfiles";
import USE_fetchTagUsages from "../../../hooks/fetch/USE_fetchTagUsages";
import { ContactPerson_WRAP } from "../SimplePage_COMPS";

export default function Contact_PAGE() {
  const IS_mobileDevice = USE_isMobileDevice();
  const { width } = USE_windowSize();
  const [search, SET_search] = useState("");

  const [message, SET_message] = useState("");
  const [name, SET_name] = useState("");
  const [email, SET_email] = useState("");
  const [inquiry, SET_inquiry] = useState({ topic: "", question: "Wie können wir Ihnen helfen?" });

  useEffect(() => {
    const questions = {
      "Frage stellen": "Welche Frage möchten Sie uns stellen? Wir hören gerne zu.",
      "Idee vorschlagen": "Welche Idee möchten Sie uns vorschlagen? Wir sind gespannt!",
      "Problem melden": "Welches Problem möchten Sie uns melden? Wir kümmern uns darum.",
      "Localmore helfen": "Wie möchten Sie uns helfen? Wir freuen uns auf Ihre Unterstützung.",
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
            <Breadcrumbs texts_ARR={["Homepage", "Contact"]} urls_ARR={["#"]} />
            {/* {width > 750 && <h1>Report a problem you found on Localmore</h1>}
              {width <= 750 && width > 550 && <h1>Report a problem you found</h1>}
              {width <= 550 && <h1>Report a problem</h1>} */}
            <h1>Let's chat!</h1>
          </Header>
          <ContactPerson_WRAP />

          <Form autoComplete="on">
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
              <h3>Worum geht es?</h3>
              <Radio_LINES
                required={true}
                label="Worum geht es?"
                value={inquiry.topic}
                SET_value={(value) => SET_inquiry({ ...inquiry, topic: value })}
                options={[
                  "Frage stellen",
                  "Idee vorschlagen",
                  "Problem melden",
                  "Localmore helfen",
                  "Sonstiges",
                ]}
              />
            </Simple_BLOCK>
            <Simple_BLOCK>
              <h3>Was gibt’s?</h3>
              <Text_AREA
                label={inquiry.question}
                value={message}
                SET_value={SET_message}
                required={true}
              />
            </Simple_BLOCK>
            <Simple_BLOCK>
              <p>
                Ihre Nachricht erreicht{" "}
                <a href="mailto: domassirbike@gmail.com" className="link_SPAN">
                  domassirbike@gmail.com
                </a>
              </p>
              <Btn
                styles={["btn-44", "brand", "flex"]}
                text={"Nachricht senden"}
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
