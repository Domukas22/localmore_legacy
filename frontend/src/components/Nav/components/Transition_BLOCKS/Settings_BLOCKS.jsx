//
//
import { Btn } from "../../../btn/btn";
import css from "../DD_content.module.css";
import en_FLAG from "../../../../assets/icons/flags/en.png";
import de_FLAG from "../../../../assets/icons/flags/de.webp";
import light from "../../../../assets/icons/light.png";

export function Settings_BLOCKS({ lang, TOGGLE_lang }) {
  return (
    <>
      <div className={css.block_WRAP}>
        <span>Language</span>
        <div className={css.inline_SPAN}>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<img src={en_FLAG} style={{ borderRadius: "8px" }} />}
              text={"EN"}
              aria_LABEL=""
              onClick={() => TOGGLE_lang("en")}
              active={lang === "en"}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<img src={de_FLAG} style={{ borderRadius: "8px" }} />}
              text={"DE"}
              aria_LABEL=""
              onClick={() => TOGGLE_lang("de")}
              active={lang === "de"}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
      </div>
      <div className={css.block_WRAP}>
        <span>Appearance</span>
        <div className={css.inline_SPAN}>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<img src={light} />}
              text={"Light"}
              aria_LABEL=""
              onClick={() => {}}
              active={true}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              // left_ICON={<img src={light} />}
              text={"Dark"}
              aria_LABEL=""
              onClick={() => {}}
              active={false}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
      </div>
      <div className={css.block_WRAP}>
        <span>Text size</span>
        <div className={css.inline_SPAN}>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text={"Normal"}
              aria_LABEL=""
              onClick={() => {}}
              active={true}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text={"Big"}
              aria_LABEL=""
              onClick={() => {}}
              active={false}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text={"Huge"}
              aria_LABEL=""
              onClick={() => {}}
              active={false}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
      </div>
    </>
  );
}
