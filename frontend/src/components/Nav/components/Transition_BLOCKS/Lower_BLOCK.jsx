//
//
import { Btn } from "../../../btn/btn";
import css from "../../Nav.module.css";
import { ICON_arrow } from "../../../icons/icons";
import logo from "../../../../assets/icons/logo.png";
// import { ICON_activeDigit } from "../../../icons/icons";

export function Lower_BLOCK({ SET_currentMenu }) {
  return (
    <div className={css.block_WRAP}>
      <li>
        <Btn
          styles={["btn-44", "navDD_BTN"]}
          text="Provide feedback"
          left_ICON={
            <img src="https://cdn-icons-png.freepik.com/512/4066/4066310.png?ga=GA1.1.807612306.1716024941" />
          }
          right_ICON={<ICON_arrow direction="right" />}
          aria_LABEL=""
          onClick={() => SET_currentMenu("feedback")}
          FIRE_clickEvent={false}
        />
      </li>

      <li>
        <Btn
          styles={["btn-44", "navDD_BTN"]}
          text="About us"
          left_ICON={<img src={logo}></img>}
          aria_LABEL=""
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
      <li>
        <Btn
          styles={["btn-44", "navDD_BTN"]}
          text="Contact"
          left_ICON={
            <img src="https://cdn-icons-png.freepik.com/512/7596/7596763.png?ga=GA1.1.807612306.1716024941" />
          }
          aria_LABEL=""
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
      <li>
        <Btn
          styles={["btn-44", "navDD_BTN"]}
          text="Legal"
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/3122/3122321.png"></img>}
          aria_LABEL=""
          right_ICON={<ICON_arrow direction="right" />}
          onClick={() => SET_currentMenu("legal")}
          FIRE_clickEvent={false}
        />
      </li>
    </div>
  );
}
