//
//
import { Dialog, Modal } from "react-aria-components";
import { Btn } from "../../btn/btn";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { ICON_activeDigit } from "../../icons/icons";
import lightbulb from "../../../assets/icons/lightbulb.png";
import settings_ICON from "../../../assets/icons/settings.png";
import css from "./DD_content.module.css";
import { ICON_arrow } from "../../icons/icons";
import en_FLAG from "../../../assets/icons/flags/en.png";
import de_FLAG from "../../../assets/icons/flags/de.webp";
import light from "../../../assets/icons/light.png";

export function Mobile_MENU({ tagUsage_COUNT, lang, TOGGLE_lang, categories }) {
  const [activeMenu, setActiveMenu] = useState("all");
  const IDs = {
    businessCateg_ID: "6648757cd5d02a9c790a0782",
    placesCateg_ID: "65eafad210e9fd0b015b91ae",
  };
  const timeout = 300;

  return (
    <Modal isOpen={true} className={css.Modal_MENU}>
      <Dialog
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          paddingTop: "60px",
          zIndex: 40,
          backgroundColor: "rgba(234, 237, 245, 1)",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
        aria-label="Menu"
      >
        <All_BLOCK
          timeout={timeout}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          tagUsage_COUNT={tagUsage_COUNT}
        />
        <Legal_BLOCK timeout={timeout} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <Settings_BLOCK
          timeout={timeout}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          lang={lang}
          TOGGLE_lang={TOGGLE_lang}
        />
        <AllCategories_BLOCK
          timeout={timeout}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          categories={categories}
          IDs={IDs}
        />
        <Business_BLOCK
          categories={categories.filter((c) => c.parent_CATEG === IDs.businessCateg_ID)}
          timeout={timeout}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          IDs={IDs}
        />
        <Places_BLOCK
          categories={categories.filter((c) => c.parent_CATEG === IDs.placesCateg_ID)}
          timeout={timeout}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          IDs={IDs}
        />
      </Dialog>
    </Modal>
  );
}

function All_BLOCK({ timeout, activeMenu, setActiveMenu, tagUsage_COUNT }) {
  return (
    <CSSTransition
      in={activeMenu === "all"}
      timeout={timeout}
      classNames="menu-primary"
      unmountOnExit
    >
      <ul className="menu">
        <div className={css.block_WRAP}>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Home"
              aria_LABEL=""
              // left_ICON={<ICON_activeDigit count={tagUsage_COUNT} IS_active={true} />}
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Categories"
              aria_LABEL=""
              right_ICON={<ICON_arrow direction="right" />}
              onClick={() => setActiveMenu("categories")}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Saved - 3"
              aria_LABEL=""
              right_ICON={<ICON_arrow direction="right" />}
              onClick={() => setActiveMenu("saved")}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Settings"
              aria_LABEL=""
              right_ICON={<ICON_arrow direction="right" />}
              onClick={() => setActiveMenu("settings")}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
        <div className={css.block_WRAP}>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Alle tags"
              aria_LABEL=""
              left_ICON={<ICON_activeDigit count={tagUsage_COUNT} IS_active={true} />}
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<img src={lightbulb} />}
              text="Idee Vorschlagen"
              aria_LABEL=""
              onClick={() => ""}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Feedback geben"
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
        <div className={css.block_WRAP}>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="About us"
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Contact"
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Legal"
              aria_LABEL=""
              right_ICON={<ICON_arrow direction="right" />}
              onClick={() => setActiveMenu("legal")}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
      </ul>
    </CSSTransition>
  );
}
function Legal_BLOCK({ timeout, activeMenu, setActiveMenu }) {
  return (
    <CSSTransition
      in={activeMenu === "legal"}
      timeout={timeout}
      classNames="menu-secondary"
      unmountOnExit
    >
      <ul className="menu">
        <div className={css.block_WRAP}>
          <li key={""}>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<ICON_arrow direction="left" />}
              text="Back"
              aria_LABEL=""
              onClick={() => setActiveMenu("all")}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
        <div className={css.block_WRAP}>
          <p>Legal</p>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Impressum"
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Datenschutz"
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Einwillingung" // Einwilligungseinstellungen
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Attributions"
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
      </ul>
    </CSSTransition>
  );
}
function Settings_BLOCK({ lang, TOGGLE_lang, timeout, activeMenu, setActiveMenu }) {
  return (
    <CSSTransition
      in={activeMenu === "settings"}
      timeout={timeout}
      classNames="menu-secondary"
      unmountOnExit
    >
      <ul className="menu">
        <div className={css.block_WRAP}>
          <li key={""}>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<ICON_arrow direction="left" />}
              text="Back"
              aria_LABEL=""
              onClick={() => setActiveMenu("all")}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
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
      </ul>
    </CSSTransition>
  );
}
///
function AllCategories_BLOCK({ categories, timeout, activeMenu, setActiveMenu, IDs }) {
  // categories with .IS_endCategory === true should be up placed at the top, then the rest sorted alpahbaetically underneath
  const start_CATEG = categories
    .filter((c) => c.IS_startCategory && !c.IS_endCategory)
    .sort((a, b) => a.name.en.localeCompare(b.name.en));
  const end_CATEG = categories
    .filter((c) => c.IS_endCategory && !c.IS_startCategory)
    .sort((a, b) => a.name.en.localeCompare(b.name.en));

  const [reverse, SET_reverse] = useState(false);

  return (
    <CSSTransition
      in={activeMenu === "categories"}
      timeout={timeout}
      classNames={reverse ? "menu-secondary-reverse" : "menu-secondary"}
      unmountOnExit
    >
      <ul className="menu">
        <div className={css.block_WRAP}>
          <li key={""}>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<ICON_arrow direction="left" />}
              text="Back"
              aria_LABEL=""
              onClick={() => {
                SET_reverse(false);
                setActiveMenu("all");
              }}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
        <div className={css.block_WRAP}>
          <li key={"all-categories"}>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="All Categories"
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          {start_CATEG.map((categ) => {
            return (
              <li key={categ.id}>
                <Btn
                  styles={["btn-44", "navDD_BTN"]}
                  left_ICON={<img src={categ.icon?.url} />}
                  right_ICON={<ICON_arrow direction="right" />}
                  text={categ.name.en}
                  aria_LABEL=""
                  onClick={() => {
                    SET_reverse(true);
                    if (categ._id === IDs.businessCateg_ID) {
                      setActiveMenu("business");
                    } else if (categ._id === IDs.placesCateg_ID) {
                      setActiveMenu("places");
                    }
                  }}
                  FIRE_clickEvent={false}
                />
              </li>
            );
          })}
        </div>
        <div className={css.block_WRAP}>
          {end_CATEG.map((categ) => {
            return (
              <li key={categ.id}>
                <Btn
                  styles={["btn-44", "navDD_BTN"]}
                  left_ICON={<img src={categ.icon?.url} />}
                  // right_ICON={<ICON_arrow direction="right" />}
                  text={categ.name.en}
                  aria_LABEL=""
                  onClick={() => {}}
                  FIRE_clickEvent={false}
                />
              </li>
            );
          })}
        </div>
      </ul>
    </CSSTransition>
  );
}
function Business_BLOCK({ categories, timeout, activeMenu, setActiveMenu }) {
  return (
    <CSSTransition
      in={activeMenu === "business"}
      timeout={timeout}
      classNames="menu-third"
      unmountOnExit
    >
      <ul className="menu">
        <div className={css.block_WRAP}>
          <li key={"business-categories"}>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<ICON_arrow direction="left" />}
              text="All Categories"
              aria_LABEL=""
              onClick={() => setActiveMenu("categories")}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
        <div className={css.block_WRAP}>
          <p>Find businesses</p>
          {categories.map((categ) => {
            return (
              <li key={categ.id}>
                <Btn
                  styles={["btn-44", "navDD_BTN"]}
                  left_ICON={<img src={categ.icon?.url} />}
                  // right_ICON={<ICON_arrow direction="right" />}
                  text={categ.name.en}
                  aria_LABEL=""
                  onClick={() => {}}
                  FIRE_clickEvent={false}
                />
              </li>
            );
          })}
        </div>
      </ul>
    </CSSTransition>
  );
}
function Places_BLOCK({ categories, timeout, activeMenu, setActiveMenu }) {
  return (
    <CSSTransition
      in={activeMenu === "places"}
      timeout={timeout}
      classNames="menu-third"
      unmountOnExit
    >
      <ul className="menu">
        <div className={css.block_WRAP}>
          <li key={"places-categories"}>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<ICON_arrow direction="left" />}
              text="All Categories"
              aria_LABEL=""
              onClick={() => setActiveMenu("categories")}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
        <div className={css.block_WRAP}>
          <p>Find places</p>
          {categories.map((categ) => {
            return (
              <li key={categ.id}>
                <Btn
                  styles={["btn-44", "navDD_BTN"]}
                  left_ICON={<img src={categ.icon?.url} />}
                  // right_ICON={<ICON_arrow direction="right" />}
                  text={categ.name.en}
                  aria_LABEL=""
                  onClick={() => {}}
                  FIRE_clickEvent={false}
                />
              </li>
            );
          })}
        </div>
      </ul>
    </CSSTransition>
  );
}
