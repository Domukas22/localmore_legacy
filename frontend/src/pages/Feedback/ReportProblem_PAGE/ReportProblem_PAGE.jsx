//
//

import { Breadcrumbs } from "react-aria-components";
import { Header } from "../../../components/Header/Header";
import css from "./ReportProblem_PAGE.module.css";
import { USE_windowSize } from "../../../hooks/USE_windowSize";
import Text_INPUT from "../../../components/Form/Inputs/Text_INPUT/Text_INPUT";
import Text_AREA from "../../../components/Form/Inputs/Text_AREA/Text_AREA";
import { useState } from "react";
import { Btn } from "../../../components/Btn/Btn";

export default function ReportProblem_PAGE() {
  const { width } = USE_windowSize();

  const [problem, SET_problem] = useState("");
  const [name, SET_name] = useState("");
  const [email, SET_email] = useState("");

  return (
    <div className={css.all_WRAP}>
      <div className={css.left}>
        <Header>
          <Breadcrumbs texts_ARR={["Homepage", "Report Problem"]} urls_ARR={["#"]} />
          <h1>Report a problem you found on Localmore</h1>
        </Header>
        <div className={css.text_BLOCK}>
          <h3>
            We are sorry that something on our site bothers you! Please let us know so we can
            correct it as soon as possible.
          </h3>
        </div>

        <form autoComplete="on">
          <div className={css.text_BLOCK}>
            <Text_AREA
              label="Welches Problem haben Sie entdeckt?"
              value={problem}
              SET_value={SET_problem}
              required={true}
            />
          </div>
          <div className={css.text_BLOCK}>
            <Text_INPUT
              label="Unter welcher E-Mail können wir Sie erreichen?"
              name="email"
              autoComplete="email"
              required={true}
              value={email}
              SET_value={SET_email}
            />
          </div>
          <div className={css.text_BLOCK}>
            <Text_INPUT
              label="Wie heißen Sie?"
              name="name"
              autoComplete="name"
              required={true}
              value={name}
              SET_value={SET_name}
            />
          </div>
        </form>
      </div>
      <div className={css.right}></div>
    </div>
  );
}
