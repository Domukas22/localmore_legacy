//
//

import { useEffect, useRef, useState } from "react";
import { USE_windowSize } from "../../../../hooks/USE_windowSize";
import USE_fetchTagUsages from "../../../../hooks/fetch/USE_fetchTagUsages";
import USE_fetchProfiles from "../../../../hooks/fetch/USE_fetchProfiles";
import USE_fetchCategories from "../../../../hooks/fetch/USE_fetchCategories";
import Normal_NAV from "../../../../components/Nav/Normal_NAV/Normal_NAV";
import {
  FeedbackPagesSide_LINKS,
  SimplePageContent_WRAP,
  SimplePage_MAIN,
  SimplePage_SIDE,
} from "../../SimplePage_COMPS";
import { Header } from "../../../../components/Header/Header";
import { Breadcrumbs } from "../../../../components/Header/Breadcrumbs/Breadcrumbs";
import Form from "../../../../components/Form/Form";
import Text_INPUT from "../../../../components/Form/Inputs/Text_INPUT/Text_INPUT";
import Radio_LINES from "../../../../components/Form/Inputs/Radio_LINES/Radio_LINES";
import Text_AREA from "../../../../components/Form/Inputs/Text_AREA/Text_AREA";
import { Btn } from "../../../../components/Btn/Btn";

export default function SuggestIdea_PAGE() {
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
            <Breadcrumbs texts_ARR={["Homepage", "Suggest an idea"]} urls_ARR={["#"]} />
            {width > 1150 && <h1>Let us know about your idea to improve Localmore!</h1>}
            {width <= 1150 && width > 550 && <h1>Let us know about your idea!</h1>}
            {width <= 550 && <h1>Spicy, spicy new ideas</h1>}
          </Header>

          <Form autoComplete="on">
            <>
              <h3>Which subject does your idea belong to?</h3>
              <Radio_LINES
                required={true}
                label="Which subject does this idea belong to?"
                value={inquiry.topic}
                SET_value={(value) => SET_inquiry({ ...inquiry, topic: value })}
                options={[
                  "Suggest new tags for profiles",
                  "Design / Looks / User experience",
                  "Function / Performance / Security",
                  "Text / Copywriting / Website content",
                  "Search / Navigation / Filtering",
                  "Marketing / Promotion",
                  "No subject, my idea is crazy!",
                  "Something else...",
                ]}
              />
            </>
            <>
              <h3>Describe what you have in mind</h3>
              <Text_AREA
                label={inquiry.question}
                value={message}
                SET_value={SET_message}
                required={true}
              />
            </>
            <>
              <h3>Tell us about yourself</h3>
              <Text_INPUT
                label="What's your name? "
                name="name"
                autoComplete="name"
                required={true}
                value={name}
                SET_value={SET_name}
              />
              <Text_INPUT
                label="What email can we reach you at?"
                name="email"
                autoComplete="email"
                required={true}
                value={email}
                SET_value={SET_email}
                type="email"
              />
            </>

            <>
              <p>
                Your message will reach{" "}
                <a href="mailto: domassirbike@gmail.com" className="link_SPAN">
                  domassirbike@gmail.com
                </a>
              </p>
              <Btn
                styles={["btn-44", "brand", "flex"]}
                text={"Send my idea"}
                onClick={() => {}}
                type="submit"
              />
            </>
          </Form>
        </SimplePage_MAIN>

        {width > 1000 && (
          <SimplePage_SIDE>
            <FeedbackPagesSide_LINKS />
          </SimplePage_SIDE>
        )}
      </SimplePageContent_WRAP>
    </>
  );
}
