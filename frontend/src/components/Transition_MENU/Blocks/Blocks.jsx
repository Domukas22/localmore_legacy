//
//

import css from "./Blocks.module.css";
import { Btn } from "../../Btn/Btn";
import en_FLAG from "../../../assets/icons/flags/en.png";
import de_FLAG from "../../../assets/icons/flags/de.webp";
import light from "../../../assets/icons/light.png";
import { Theme_CONTEXT } from "../../../contexts/theme";
import { useContext, useState } from "react";
import { FontSizeContext } from "../../../contexts/fontSize";
import { Lang_CONTEXT } from "../../../contexts/lang";
import { AnimatePresence, motion } from "framer-motion";
import { ICON_activeDigit, ICON_arrow, ICON_save, ICON_x } from "../../icons/icons";
import { SavedProfileIDs_CONTEXT } from "../../../contexts/savedProfiles";
import logo from "../../../assets/icons/logo.png";

export function BtnBack_BLOCK({ title, onClick, aria_LABEL }) {
  return (
    <div className={css.Block}>
      <li key={""}>
        <Btn
          styles={["btn-44", "strech", "text-left-auto"]}
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
export function EndBtn_BLOCK({ text, onClick }) {
  return (
    <div className={css.Block}>
      <li>
        <Btn
          styles={["btn-44", "strech", "red-x-on-hover", "text-left-auto"]}
          text={text}
          right_ICON={<ICON_x />}
          aria_LABEL=""
          onClick={onClick}
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
              styles={["btn-44"]}
              text="Home"
              left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/609/609803.png"></img>}
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
        )}
        <li>
          <Btn
            styles={["btn-44"]}
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
              styles={["btn-44"]}
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
              styles={["btn-44"]}
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
              styles={["btn-44"]}
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
            styles={["btn-44"]}
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
            styles={["btn-44"]}
            text="About us"
            left_ICON={<img src={logo}></img>}
            aria_LABEL=""
            onClick={() => {}}
            FIRE_clickEvent={false}
          />
        </li>
        <li>
          <Btn
            styles={["btn-44"]}
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
            styles={["btn-44"]}
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
export function Legal_BLOCK() {
  return (
    <div className={css.Block}>
      <p>Legal</p>
      <li>
        <Btn
          styles={["btn-44"]}
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
          styles={["btn-44"]}
          text="Datenschutz"
          aria_LABEL=""
          onClick={() => {}}
          FIRE_clickEvent={false}
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/2592/2592317.png"></img>}
        />
      </li>
      <li>
        <Btn
          styles={["btn-44"]}
          text="Einwillingung" // Einwilligungseinstellungen
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/4315/4315445.png"></img>}
          aria_LABEL=""
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
      <li>
        <Btn
          styles={["btn-44"]}
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
          styles={["btn-44"]}
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
          styles={["btn-44"]}
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
          styles={["btn-44"]}
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
              styles={["btn-44"]}
              left_ICON={<img src={en_FLAG} style={{ borderRadius: "8px" }} />}
              text={"EN"}
              aria_LABEL=""
              onClick={() => TOGGLE_lang("en")}
              custom={lang === "en" && "active"}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44"]}
              left_ICON={<img src={de_FLAG} style={{ borderRadius: "8px" }} />}
              text={"DE"}
              aria_LABEL=""
              onClick={() => TOGGLE_lang("de")}
              custom={lang === "de" && "active"}
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
              styles={["btn-44"]}
              left_ICON={<img src={light} />}
              text={"Light"}
              aria_LABEL=""
              onClick={() => TOGGLE_theme("light")}
              custom={theme === "light" && "active"}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44"]}
              text={"Dark"}
              aria_LABEL=""
              onClick={() => TOGGLE_theme("dark")}
              custom={theme === "dark" && "active"}
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
              styles={["btn-44"]}
              text={"Normal"}
              aria_LABEL=""
              onClick={() => {
                setFontSize(1);
                resize();
              }}
              custom={fontSize === 1 && "active"}
              FIRE_clickEvent={false}
            />
          </li>
          <li data-item="li-btn-big">
            <Btn
              styles={["btn-44"]}
              text={"Big"}
              aria_LABEL=""
              onClick={() => {
                setFontSize(2);
                resize();
              }}
              custom={fontSize === 2 && "active"}
              FIRE_clickEvent={false}
            />
          </li>
          <li data-item="li-btn-huge">
            <Btn
              styles={["btn-44"]}
              text={"Huge"}
              aria_LABEL=""
              onClick={() => {
                setFontSize(3);
                resize();
              }}
              custom={fontSize === 3 && "active"}
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
        {savedProfile_OBJs.map((profile) => {
          const IS_saved = savedProfile_OBJs.some((p) => p._id === profile._id);
          return (
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
              <div className={css.SavedProfile_LINK}>
                <Btn
                  styles={["btn-36", "onImg", "save"]}
                  onClick={() => {
                    handleRemove(profile._id);
                  }}
                  custom={IS_saved && "saved"}
                  left_ICON={<ICON_save style={IS_saved ? "active" : "white"} />}
                  // aria_LABEL={tr?.saveBtn_ARIA(name)[lang]}
                  test_ID="save-btn"
                  FIRE_clickEvent={false}
                />
                <a
                  href="#"
                  style={{ backgroundImage: `url(${profile?.img?.desktop?.[0] + "/Big" || ""})` }}
                ></a>
                <h4>{name ?? "Name"}</h4>
              </div>
            </motion.li>
          );
        })}
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

export function AllCategories_BLOCK({
  start_CATEG,
  end_CATEG,
  SET_currentMenu,
  SET_reverse = () => {},
}) {
  return (
    <>
      <div className={css.Block} key={"all-categories-upper-block"}>
        <li key={"all-categories"}>
          <Btn
            styles={["btn-44"]}
            text="All Categories"
            aria_LABEL=""
            onClick={() => {}}
            FIRE_clickEvent={false}
          />
        </li>
        {start_CATEG.map((categ) => {
          return (
            <li key={categ.name?.en}>
              <Btn
                styles={["btn-44"]}
                left_ICON={<img src={categ.icon?.url} />}
                right_ICON={<ICON_arrow direction="right" />}
                text={categ.name.en}
                aria_LABEL=""
                onClick={() => {
                  SET_reverse(true);
                  SET_currentMenu(categ._id);
                }}
                FIRE_clickEvent={false}
              />
            </li>
          );
        })}
      </div>
      <div className={css.Block} key={"all-categories-lower-block"}>
        <p>All categories</p>
        {end_CATEG.map((categ) => {
          return (
            <li key={categ.name?.en}>
              <Btn
                styles={["btn-44"]}
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
    </>
  );
}
export function Category_BLOCK({ category_OBJ, categoryChildren_ARR }) {
  return (
    <div className={css.Block}>
      <p>Find {category_OBJ.name.en}</p>
      <li>
        <Btn
          styles={["btn-44"]}
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
              styles={["btn-44"]}
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

export function ActiveTagsbtn_BLOCK({ activeTag_IDs, SET_currentMenu }) {
  return (
    <div className={css.Block}>
      <li>
        <Btn
          styles={["btn-40", "strech"]}
          left_ICON={
            <ICON_activeDigit
              count={activeTag_IDs?.size || 0}
              IS_active={activeTag_IDs?.size > 0 || false}
              inverse={true}
            />
          }
          right_ICON={<ICON_arrow color="dark" direction="right" />}
          text="Active tags"
          onClick={() => SET_currentMenu("active-tags")}
        />
      </li>
    </div>
  );
}
export function TagGroupBtns_BLOCK({
  tagGroups,
  tagUsages,
  SET_currentMenu,
  SET_currentTagGroupID,
  SET_currentTagGroupName,
}) {
  return (
    <div className={css.Block}>
      <p>Tag groups</p>
      {tagGroups.map((tagGroup) => {
        // if there isnt a single tagUsage with this tagGroup_ID, dont render the button
        if (!tagUsages.some((tagUsage) => tagUsage.tagGroup_ID === tagGroup._id)) return;

        return (
          <li key={tagGroup._id}>
            <Btn
              key={tagGroup._id}
              styles={["btn-40", "strech"]}
              left_ICON={<img src={tagGroup.icon?.url ? tagGroup.icon?.url : ""} />}
              right_ICON={<ICON_arrow color="dark" direction="right" />}
              text={tagGroup?.name?.en}
              onClick={() => {
                SET_currentMenu("tag-group");
                SET_currentTagGroupID(tagGroup._id);
                SET_currentTagGroupName(tagGroup?.name?.en);
              }}
            />
          </li>
        );
      })}
    </div>
  );
}
export function Tags_BLOCK({ title, tags, activeTag_IDs, UPDATE_tags, tag_COUNTS }) {
  return (
    <div className={css.Block}>
      {/* <p>All tags</p> */}
      <p>{title}</p>
      {tags?.map((tag) => {
        const IS_active = activeTag_IDs.has(tag._id);
        return (
          <li key={tag._id}>
            <Btn
              key={tag._id}
              styles={["btn-40", "strech", `${IS_active ? "active" : ""}`, "text-left-auto"]}
              left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
              right_ICON={
                IS_active ? (
                  <ICON_x color="brand" small={true} />
                ) : (
                  <span>{tag_COUNTS?.[tag._id]}</span>
                )
              }
              text={tag?.name?.en}
              onClick={() => UPDATE_tags(tag, IS_active ? "remove" : "add")}
            />
          </li>
        );
      })}
    </div>
  );
}
export function Potential_BLOCK({ type, tags, SET_potentialTagIDs }) {
  const x_COLOR = type === "add" ? "green" : type === "delete" ? "red" : "brand";

  return (
    <div className={css.Block}>
      <p>
        {type === "add" ? "Add" : type === "delete" ? "Delete" : "Keep"} {tags?.length || "NUM"}{" "}
        tags
      </p>
      {tags?.map((tag) => (
        <Btn
          key={tag._id}
          styles={[
            "btn-40",
            "strech",
            type === "add" && "green",
            type === "delete" && "red",
            type === "keep" && "active",
            "text-left-auto",
          ]}
          left_ICON={<img src={tag.icon?.url || ""} />}
          right_ICON={<ICON_x color={x_COLOR} small={true} />}
          text={tag?.name?.en || ""}
          onClick={() =>
            SET_potentialTagIDs((prev) => {
              const updated = { ...prev };
              if (type === "delete") updated.toDelete_IDs.delete(tag._id);
              if (type === "add") updated.toAdd_IDs.delete(tag._id);
              if (type === "keep") updated.toDelete_IDs.add(tag._id);
              return updated;
            })
          }
        />
      ))}
    </div>
  );
}
