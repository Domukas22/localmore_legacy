//
//
import css from "../Feedback_MODALS.module.css";

import { useState } from "react";
import { Dialog, Modal } from "react-aria-components";
import { Btn } from "../../../Btn/Btn";
import { ICON_x } from "../../../icons/icons";
import Text_INPUT from "../../../Form/Inputs/Text_INPUT/Text_INPUT";
import Text_AREA from "../../../Form/Inputs/Text_AREA/Text_AREA";

export function ReportProblem_MODAL({ IS_open, SET_isOpen }) {
  const [problem, SET_problem] = useState("");
  const [name, SET_name] = useState("");
  const [email, SET_email] = useState("");

  const HANDLE_close = () => {
    SET_isOpen(false);

    setTimeout(() => {
      SET_problem("");
      SET_name("");
    }, 301);
  };

  return (
    <Modal isOpen={IS_open} className={css.feedback_MODAL}>
      <Dialog aria-label="Menu" className={css.content_WRAP} autoFocus={false}>
        <form autoComplete="on" onClick={() => console.log("close")}>
          <div className={css.top}>
            <h2>Problem melden</h2>
            <Btn
              left_ICON={<ICON_x />}
              styles={["btn-40", "grey", "round", "red-x-on-hover"]}
              onClick={HANDLE_close}
            />
          </div>
          <div className={css.bottom}>
            <h4>
              Es tut uns leid, dass Ihnen etwas auf unserer Seite stört! Teilen Sie es gerne mit,
              damit wir es schellstmöglich korrigieren können.
            </h4>
            <div className={css.allInput_WRAP}>
              <Text_AREA
                label="Welches Problem haben Sie entdeckt?"
                value={problem}
                SET_value={SET_problem}
                required={true}
              />
              <Text_INPUT
                label="Unter welcher E-Mail können wir Sie erreichen?"
                name="email"
                autoComplete="email"
                required={true}
                value={email}
                SET_value={SET_email}
              />
              <Text_INPUT
                label="Wie heißen Sie?"
                name="name"
                autoComplete="name"
                required={true}
                value={name}
                SET_value={SET_name}
              />
            </div>
            <div className={css.btn_WRAP}>
              <Btn styles={["btn-44", "flex"]} text={"Abbrechen"} onClick={() => {}} />
              <Btn
                styles={["btn-44", "brand", "flex"]}
                text={"Nachricht senden"}
                onClick={() => {}}
                type="submit"
              />{" "}
            </div>
          </div>
        </form>
      </Dialog>
    </Modal>
  );
}
