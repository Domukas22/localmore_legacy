//
//

import css from "../../Blocks.module.css";
import { Btn } from "../../../../Btn/Btn";
import { useContext } from "react";

import light from "../../../../../assets/icons/light.png";
import en_FLAG from "../../../../../assets/icons/flags/en.png";
import de_FLAG from "../../../../../assets/icons/flags/de.webp";

import { Theme_CONTEXT } from "../../../../../contexts/theme";
import { FontSizeContext } from "../../../../../contexts/fontSize";
import { Lang_CONTEXT } from "../../../../../contexts/lang";

export function Settings_BLOCKS({ resize = () => {} }) {
  const { theme, TOGGLE_theme } = useContext(Theme_CONTEXT);
  const { fontSize, setFontSize } = useContext(FontSizeContext);
  const { lang, TOGGLE_lang } = useContext(Lang_CONTEXT);

  return (
    <>
      <div className={css.Block}>
        <span>Language</span>
        <div className={css.inline_SPAN}>
          <li>
            <Btn
              styles={["btn-44", "flex", `${lang === "en" ? "active" : ""}`]}
              left_ICON={<img src={en_FLAG} style={{ borderRadius: "8px" }} />}
              text={"EN"}
              aria_LABEL=""
              onClick={() => TOGGLE_lang("en")}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "flex", `${lang === "de" ? "active" : ""}`]}
              left_ICON={<img src={de_FLAG} style={{ borderRadius: "8px" }} />}
              text={"DE"}
              aria_LABEL=""
              onClick={() => TOGGLE_lang("de")}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
      </div>
      <div className={css.Block}>
        <span>Appearance</span>
        <div className={css.inline_SPAN}>
          <li>
            <Btn
              styles={["btn-44", "flex", `${theme === "light" ? "active" : ""}`]}
              left_ICON={<img src={light} />}
              text={"Light"}
              aria_LABEL=""
              onClick={() => TOGGLE_theme("light")}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "flex", `${theme === "dark" ? "active" : ""}`]}
              text={"Dark"}
              aria_LABEL=""
              onClick={() => TOGGLE_theme("dark")}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
      </div>
      <div className={css.Block}>
        <span>Text size</span>
        <div className={css.inline_SPAN}>
          <li data-item="li-btn-normal">
            <Btn
              styles={["btn-44", "flex", `${fontSize === 1 ? "active" : ""}`]}
              text={"Normal"}
              aria_LABEL=""
              onClick={() => {
                setFontSize(1);
                resize();
              }}
              FIRE_clickEvent={false}
            />
          </li>
          <li data-item="li-btn-big">
            <Btn
              styles={["btn-44", "flex", `${fontSize === 2 ? "active" : ""}`]}
              text={"Big"}
              aria_LABEL=""
              onClick={() => {
                setFontSize(2);
                resize();
              }}
              FIRE_clickEvent={false}
            />
          </li>
          <li data-item="li-btn-huge">
            <Btn
              styles={["btn-44", "flex", `${fontSize === 3 ? "active" : ""}`]}
              text={"Huge"}
              aria_LABEL=""
              onClick={() => {
                setFontSize(3);
                resize();
              }}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
      </div>
    </>
  );
}
