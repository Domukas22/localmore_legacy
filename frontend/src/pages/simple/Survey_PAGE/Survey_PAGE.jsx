//
//

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
import GiantSurvey_RADIOS from "../../../components/Form/Inputs/GiantSurvey_RADIOS/GiantSurvey_RADIOS";
import { ICON_smiley } from "../../../components/icons/icons";
import Checkbox_LINE from "../../../components/Form/Inputs/Checkbox_LINES/Checkbox_LINES";

export default function Survey_PAGE() {
  const { width } = USE_windowSize();
  const [search, SET_search] = useState("");

  const [message, SET_message] = useState("");
  const [name, SET_name] = useState("");
  const [email, SET_email] = useState("");

  const { tagUsages, LOADING_tagUsages, tagUsages_ERROR } = USE_fetchTagUsages();
  const { profiles, LOADING_profiles, profiles_ERROR } = USE_fetchProfiles();
  const { categories, LOADING_categories, categories_ERROR, available_CATEGORIES } =
    USE_fetchCategories();

  const nav_REF = useRef(null);

  const [easeOfUse_ANSWER, SET_easeOfUseAnswer] = useState("");
  const [SHOW_easeOfUseExplanation, SET_easeOfUseExplanation] = useState(false);

  const [tellAFriend_ANSWER, SET_tellAFriendAnswer] = useState("");
  const [SHOW_tellAFriendExplanation, SET_tellAFriendExplanation] = useState(false);

  const [user_AGE, SET_userAge] = useState("");
  const [emoji_ANSWER, SET_emojiAnswer] = useState("");

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
            <Breadcrumbs texts_ARR={["Homepage", "Survey"]} urls_ARR={["#"]} />
            {width > 1150 && <h1>Complete a quick survey to help improve Localmore!</h1>}
            {width <= 1150 && width > 1050 && <h1>Complete a quick survey to help Localmore!</h1>}
            {width <= 1050 && width > 700 && <h1>Complete a quick survey to help Localmore!</h1>}
            {width <= 700 && width > 500 && <h1>A quick Localmore survey</h1>}
            {width <= 500 && <h1>A quick survey</h1>}
          </Header>

          <Form autoComplete="on">
            <Simple_BLOCK>
              <h3>Which emoji best represents your experience with Localmore?</h3>
              <Radio_LINES
                required={true}
                label="What is your age group??"
                value={emoji_ANSWER}
                SET_value={SET_emojiAnswer}
                options={[
                  "🤯 This is crazy",
                  "😎 Fun and cool",
                  "😊 Happy and satisfied",
                  "🤔 Curious and exploring",
                  "😒 Meh, kinda boring...",
                  "💩 Come on, you can do better",
                ]}
              />
            </Simple_BLOCK>
            <Simple_BLOCK>
              <h3>Do you find Localmore easy to use?</h3>
              <GiantSurvey_RADIOS
                label="test"
                value={easeOfUse_ANSWER}
                SET_value={SET_easeOfUseAnswer}
                options={[
                  {
                    text: "Super easy!",
                    icon: (
                      <ICON_smiley
                        emotion="happy"
                        color={easeOfUse_ANSWER === "Super easy!" ? "brand" : "dark"}
                      />
                    ),
                  },
                  {
                    text: "Hmm, it's okay",
                    icon: (
                      <ICON_smiley
                        emotion="neutral"
                        color={easeOfUse_ANSWER === "Hmm, it's okay" ? "brand" : "dark"}
                      />
                    ),
                  },
                  {
                    text: "It's difficult",
                    icon: (
                      <ICON_smiley
                        emotion="sad"
                        color={easeOfUse_ANSWER === "It's difficult" ? "brand" : "dark"}
                      />
                    ),
                  },
                ]}
              />
              {easeOfUse_ANSWER === "It's difficult" && (
                <Checkbox_LINE
                  label="Let me tell you why it so difficult"
                  checked={SHOW_easeOfUseExplanation}
                  SET_checked={SET_easeOfUseExplanation}
                />
              )}
              {easeOfUse_ANSWER === "It's difficult" && SHOW_easeOfUseExplanation && (
                <Text_AREA
                  label="Please tell us why you think Localmore is difficult to use. Could you maybe give us some examples?"
                  value={message}
                  SET_value={SET_message}
                  required={true}
                />
              )}
            </Simple_BLOCK>

            <Simple_BLOCK>
              <h3>What is your age group?</h3>
              <Radio_LINES
                required={true}
                label="What is your age group??"
                value={user_AGE}
                SET_value={SET_userAge}
                options={["Under 18", "18-25", "26-35", "36-45", "46-55", "56-65", "65 and older"]}
              />
            </Simple_BLOCK>

            <Simple_BLOCK>
              <h3>Your final thoughts (optional)</h3>
              <Text_AREA
                label="Do you wish to add anythign else? Any reasons for choosing certain options? Your answer would help us out a lot!"
                value={message}
                SET_value={SET_message}
                required={true}
              />
            </Simple_BLOCK>

            <Simple_BLOCK>
              <Btn
                styles={["btn-44", "brand", "flex"]}
                text={"Submit survey"}
                onClick={() => {}}
                type="submit"
              />
            </Simple_BLOCK>
          </Form>
        </SimplePage_MAIN>

        {width > 1150 && <SimplePage_SIDE />}
      </SimplePageContent_WRAP>
    </>
  );
}
