//
//
import { Btn } from "../../../btn/btn";
import css from "../../Nav.module.css";
import en_FLAG from "../../../../assets/icons/flags/en.png";
import de_FLAG from "../../../../assets/icons/flags/de.webp";
import light from "../../../../assets/icons/light.png";
import { Theme_CONTEXT } from "../../../../contexts/theme";
import { useContext, useEffect, useState } from "react";
import { FontSizeContext } from "../../../../contexts/fontSize";
import { Lang_CONTEXT } from "../../../../contexts/lang";

export function Settings_BLOCKS() {
  const { theme, TOGGLE_theme } = useContext(Theme_CONTEXT);
  const { fontSize, setFontSize } = useContext(FontSizeContext);
  const { lang, TOGGLE_lang } = useContext(Lang_CONTEXT);

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
              onClick={() => TOGGLE_theme("light")}
              active={theme === "light" ? true : false}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              // left_ICON={<img src={light} />}
              text={"Dark"}
              aria_LABEL=""
              onClick={() => TOGGLE_theme("dark")}
              active={theme === "dark" ? true : false}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
      </div>
      <div className={css.block_WRAP}>
        <span>Text size</span>
        <div className={css.inline_SPAN}>
          <li data-item="li-btn-normal">
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text={"Normal"}
              aria_LABEL=""
              onClick={() => {
                setFontSize(1);
                // resize();
              }}
              active={fontSize === 1 ? true : false}
              FIRE_clickEvent={false}
            />
          </li>
          <li data-item="li-btn-big">
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text={"Big"}
              aria_LABEL=""
              onClick={() => {
                setFontSize(2);
                // resize();
              }}
              active={fontSize === 2 ? true : false}
              FIRE_clickEvent={false}
            />
          </li>
          <li data-item="li-btn-huge">
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text={"Huge"}
              aria_LABEL=""
              onClick={() => {
                setFontSize(3);
                // resize();
              }}
              active={fontSize === 3 ? true : false}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
      </div>
    </>
  );
}
