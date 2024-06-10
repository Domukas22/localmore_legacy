//
//

import css from "./Blocks.module.css";
import { Btn } from "../../btn/btn";
import en_FLAG from "../../../assets/icons/flags/en.png";
import de_FLAG from "../../../assets/icons/flags/de.webp";
import light from "../../../assets/icons/light.png";
import { Theme_CONTEXT } from "../../../contexts/theme";
import { useContext, useState } from "react";
import { FontSizeContext } from "../../../contexts/fontSize";
import { Lang_CONTEXT } from "../../../contexts/lang";
import { AnimatePresence, motion } from "framer-motion";
import { SavedProfile_LINK } from "../../btn/btn";
import { ICON_arrow, ICON_save, ICON_x } from "../../icons/icons";
import { SavedProfileIDs_CONTEXT } from "../../../contexts/savedProfiles";
import logo from "../../../assets/icons/logo.png";

export function Legal_BLOCK() {
  return (
    <div className={css.Block}>
      <p>Legal</p>
      <li>
        <Btn
          styles={["btn-44", "navDD_BTN"]}
          text="Impressum"
          aria_LABEL=""
          left_ICON={
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-impressum-1-1181601.png?f=webp"
              style={{ opacity: "0.7" }}
            ></img>
          }
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
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/2592/2592317.png"></img>}
        />
      </li>
      <li>
        <Btn
          styles={["btn-44", "navDD_BTN"]}
          text="Einwillingung" // Einwilligungseinstellungen
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/4315/4315445.png"></img>}
          aria_LABEL=""
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
      <li>
        <Btn
          styles={["btn-44", "navDD_BTN"]}
          text="Attributions"
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/2448/2448648.png"></img>}
          aria_LABEL=""
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
    </div>
  );
}
export function Feedback_BLOCK() {
  return (
    <div className={css.Block}>
      <p>Provide feedback</p>
      <li>
        <Btn
          styles={["btn-44", "navDD_BTN"]}
          text="Suggest an idea"
          aria_LABEL=""
          left_ICON={
            <img src="https://cdn-icons-png.freepik.com/512/6339/6339162.png?ga=GA1.1.807612306.1716024941" />
          }
          right_ICON={<span>2 min</span>}
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
      <li>
        <Btn
          styles={["btn-44", "navDD_BTN"]}
          left_ICON={
            <img src="https://cdn-icons-png.freepik.com/512/725/725022.png?ga=GA1.1.807612306.17160249411" />
          }
          right_ICON={<span>2 min</span>}
          text="Report a problem"
          aria_LABEL=""
          onClick={() => ""}
        />
      </li>
      <li>
        <Btn
          styles={["btn-44", "navDD_BTN"]}
          text="Quick survey"
          left_ICON={
            <img src="https://cdn-icons-png.freepik.com/512/5321/5321120.png?ga=GA1.1.807612306.1716024941" />
          }
          right_ICON={<span>5 min</span>}
          aria_LABEL=""
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
    </div>
  );
}
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
      <div className={css.Block}>
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
      <div className={css.Block}>
        <span>Text size</span>
        <div className={css.inline_SPAN}>
          <li data-item="li-btn-normal">
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text={"Normal"}
              aria_LABEL=""
              onClick={() => {
                setFontSize(1);
                resize();
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
                resize();
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
                resize();
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
export function Saved_BLOCK({ savedProfile_OBJs, REMOVE_fromSaved, resize = () => {} }) {
  const [deletingItem, setDeletingItem] = useState(null);
  const SHOULD_noItemBoxBeVisible =
    (savedProfile_OBJs.length === 1 && deletingItem) || savedProfile_OBJs.length === 0;

  const handleRemove = (profileId) => {
    setDeletingItem(profileId);
    if (savedProfile_OBJs.length > 1) resize();

    setTimeout(() => {
      REMOVE_fromSaved(profileId);
      setDeletingItem(null);
      if (savedProfile_OBJs.length === 1) resize();
    }, 300); // Delay to match the fade-out duration
  };

  return (
    <div className={css.Block} data-custom="saved">
      <p>{savedProfile_OBJs.length} liked profiles</p>
      <AnimatePresence>
        {savedProfile_OBJs.map((profile) => (
          <motion.li
            className={css.savedBtn_LI}
            key={`Saved-${profile._id}`}
            initial={{ opacity: 1, height: "auto" }}
            animate={{
              opacity: deletingItem === profile._id ? 0 : 1,
              height: deletingItem === profile._id ? 0 : "auto",
            }}
            transition={{ opacity: { duration: 0.3 }, height: { duration: 0.3 } }}
          >
            <SavedProfile_LINK
              name={profile.name.en}
              subname={profile.subname.en}
              image_URL={profile?.img?.desktop?.[0] + "/Big"}
              aria_LABEL=""
              remove={() => handleRemove(profile._id)}
            />
          </motion.li>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {SHOULD_noItemBoxBeVisible && (
          <motion.div
            className={css.noSavedItems_BOX}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export function BtnBack_BLOCK({ title, onClick, aria_LABEL }) {
  return (
    <div className={css.Block}>
      <li key={""}>
        <Btn
          styles={["btn-44", "navDD_BTN"]}
          left_ICON={<ICON_arrow direction="left" />}
          text={title}
          aria_LABEL=""
          onClick={onClick}
          FIRE_clickEvent={false}
        />
      </li>
    </div>
  );
}
export function Nav_BLOCKS({ SET_currentMenu, visible_BTNs = {}, tagUsage_COUNT }) {
  const {
    home = true,
    categories = true,
    settings = true,
    liked = true,
  } = { home: true, categories: true, settings: true, liked: true, ...visible_BTNs };

  const { savedProfile_IDs } = useContext(SavedProfileIDs_CONTEXT);
  return (
    <>
      <div className={css.Block}>
        {home && (
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Home"
              left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/609/609803.png"></img>}
              aria_LABEL=""
              // left_ICON={<ICON_activeDigit count={tagUsage_COUNT} IS_active={true} />}
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
        )}
        <li>
          <Btn
            styles={["btn-44", "navDD_BTN"]}
            text="Alle tags"
            aria_LABEL=""
            left_ICON={
              <img src="https://cdn-icons-png.freepik.com/512/9458/9458516.png?ga=GA1.1.807612306.1716024941" />
            }
            right_ICON={<span>{tagUsage_COUNT || 99}</span>}
            onClick={() => {}}
            FIRE_clickEvent={false}
          />
        </li>
        {categories && (
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Categories"
              left_ICON={
                <img src="https://cdn-icons-png.flaticon.com/512/11244/11244162.png"></img>
              }
              aria_LABEL=""
              right_ICON={<ICON_arrow direction="right" />}
              onClick={() => SET_currentMenu("categories")}
              FIRE_clickEvent={false}
            />
          </li>
        )}
        {settings && (
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Settings"
              aria_LABEL=""
              left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/3953/3953226.png"></img>}
              right_ICON={<ICON_arrow direction="right" />}
              onClick={() => SET_currentMenu("settings")}
              FIRE_clickEvent={false}
            />
          </li>
        )}
        {liked && (
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text={`Saved (${savedProfile_IDs.size})`}
              // left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/2107/2107845.png"></img>}
              left_ICON={<ICON_save style="active" />}
              aria_LABEL=""
              right_ICON={<ICON_arrow direction="right" />}
              onClick={() => SET_currentMenu("saved")}
              FIRE_clickEvent={false}
            />
          </li>
        )}
      </div>
      <div className={css.Block}>
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
    </>
  );
}
export function EndBtn_BLOCK({ text, onClick }) {
  return (
    <div className={css.Block}>
      <li>
        <Btn
          styles={["btn-44", "red-x-on-hover"]}
          text={text}
          right_ICON={<ICON_x />}
          aria_LABEL=""
          onClick={onClick}
          // FIRE_clickEvent={false}
        />
      </li>
    </div>
  );
}
export function AllCategories_BLOCK({
  start_CATEG,
  end_CATEG,
  SET_currentMenu,
  SET_reverse = () => {},
}) {
  return (
    <>
      <div className={css.Block}>
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
            <li key={categ._id}>
              <Btn
                styles={["btn-44", "navDD_BTN"]}
                left_ICON={<img src={categ.icon?.url} />}
                right_ICON={<ICON_arrow direction="right" />}
                text={categ.name.en}
                aria_LABEL=""
                onClick={() => {
                  SET_reverse(true);
                  SET_currentMenu(categ._id);
                  // SET_currentMenu("business");
                }}
                FIRE_clickEvent={false}
              />
            </li>
          );
        })}
      </div>
      <div className={css.Block}>
        <p>All categories</p>
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
    </>
  );
}
export function Category_BLOCK({ category_OBJ, categoryChildren_ARR }) {
  return (
    <div className={css.Block}>
      <p>Find {category_OBJ.name.en}</p>
      <li>
        <Btn
          styles={["btn-44", "navDD_BTN"]}
          text={`All ${category_OBJ.name.en}`}
          aria_LABEL=""
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
      {categoryChildren_ARR.map((categ) => {
        return (
          <li key={category_OBJ._id}>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<img src={categ.icon?.url} />}
              text={categ.name.en}
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
        );
      })}
    </div>
  );
}
