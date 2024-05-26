//
//
import { Btn } from "../../../btn/btn";
import css from "../../Nav.module.css";

export function Feedback_BLOCK() {
  return (
    <div className={css.block_WRAP}>
      <li>
        <Btn
          styles={["btn-44", "navDD_BTN"]}
          text="Idee Vorschlagen"
          aria_LABEL=""
          // left_ICON={<ICON_activeDigit count={tagUsage_COUNT} IS_active={true} />}
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
      <li>
        <Btn
          styles={["btn-44", "navDD_BTN"]}
          // left_ICON={<img src={lightbulb} />}
          text="Problem melden"
          aria_LABEL=""
          onClick={() => ""}
        />
      </li>
      <li>
        <Btn
          styles={["btn-44", "navDD_BTN"]}
          text="Fragebogen ausfüllen"
          // left_ICON={
          //   <img src="https://cdn-icons-png.freepik.com/512/4066/4066310.png?ga=GA1.1.807612306.1716024941" />
          // }
          aria_LABEL=""
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
    </div>
  );
}
