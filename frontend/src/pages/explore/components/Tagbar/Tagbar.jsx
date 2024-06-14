//
//

import { Btn } from "../../../../components/Btn/Btn";
import css from "./Tagbar.module.css";

import { ICON_x, ICON_dropDownArrow, ICON_activeDigit } from "../../../../components/icons/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { FontSizeContext } from "../../../../contexts/fontSize";
import { USE_windowSize } from "../../../../hooks/USE_windowWidth";
import { Tagbox_MODAL } from "../../../../components/Modals/Tagbox_MODAL/Tagbox_MODAL";
import { Category_MODAL } from "../../../../components/Modals/Category_MODAL/Category_MODAL";
import { USE_showBrowserToolbar } from "../../../../hooks/USE_showBrowserToolbar";

import { Categories_DD } from "../../../../components/DD/Dropdowns/Categories_DD/Categories_DD";

export function Tagbar({
  categories,
  all_TAGS,
  activeTag_IDs,
  potentialTag_IDs,
  SET_potentialTagIDs,
  window_WIDTH,
  UPDATE_tags,
  tagGroups,
  tagUsages,
  tagbar_REF,
  result_COUNT,
}) {
  const { fontSize, fontSize_SCALE } = useContext(FontSizeContext);
  const { width } = USE_windowSize();
  const [chosen_TAGS, SET_chosenTags] = useState([]);
  const [HAS_shadow, SET_shadow] = useState(false);

  const mainBtns_REF = useRef(null);
  const categoriesDD_REF = useRef(null);

  const [IS_mobileTagMenuOpen, SET_isMobileTagMenuOpen] = useState(false);
  const [IS_mobileCategoryMenuOpen, SET_isMobileCategoryMenuOpen] = useState(false);

  useEffect(() => {
    const nav_HEIGHT = 56 * fontSize_SCALE;

    const handleScroll = () => {
      SET_shadow(nav_HEIGHT >= tagbar_REF.current.getBoundingClientRect().top && width < 1100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fontSize, fontSize_SCALE, width, tagbar_REF]);

  useEffect(() => {
    const CALCULATE_tagWidth = (tag) => {
      const icon_WIDTH = 20 * fontSize_SCALE;
      const padding = 12 * fontSize_SCALE * 2;
      const buttonInside_GAPS = 16 * fontSize_SCALE;
      const letters_WIDTH = 8 * fontSize_SCALE * tag.name.en.length; // a little overshot to make sure it fits
      const button_GAP = 8 * fontSize_SCALE;
      const icon_X = 16 * fontSize_SCALE;

      const total =
        padding + icon_WIDTH + buttonInside_GAPS + letters_WIDTH + icon_WIDTH + button_GAP;

      return total;
    };

    const calculateTagsToFit = () => {
      if (categoriesDD_REF.current && tagbar_REF.current) {
        const tagbar_WIDTH = tagbar_REF.current.clientWidth;
        const mainBtns_WIDTH = categoriesDD_REF.current.clientWidth;
        const remainingWidth = tagbar_WIDTH - mainBtns_WIDTH;

        let usedWidth = 0;
        const chosenTags = [];

        for (const tag of all_TAGS) {
          const tagWidth = CALCULATE_tagWidth(tag); // You need to implement this function
          if (usedWidth + tagWidth <= remainingWidth) {
            chosenTags.push(tag);
            usedWidth += tagWidth;
          } else {
            break;
          }
        }

        SET_chosenTags(chosenTags);
      }
    };

    const resizeObserver = new ResizeObserver(calculateTagsToFit);
    resizeObserver.observe(tagbar_REF.current);

    if (window_WIDTH > 900) {
      if (IS_mobileTagMenuOpen) SET_isMobileTagMenuOpen(false);
      if (IS_mobileCategoryMenuOpen) SET_isMobileCategoryMenuOpen(false);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [all_TAGS, fontSize, fontSize_SCALE, width, activeTag_IDs, tagbar_REF]);

  return (
    <header className={css.header} ref={tagbar_REF} data-shadow={HAS_shadow}>
      {window_WIDTH < 900 && (
        <div className={css.mobileBtn_WRAP}>
          <Btn
            styles={["btn-40", "round"]}
            text={"Sportsfields"}
            left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/889/889455.png"></img>}
            right_ICON={<ICON_dropDownArrow />}
            aria_LABEL=""
            onClick={() => SET_isMobileCategoryMenuOpen(true)}
            FIRE_clickEvent={false}
          />
          <Btn
            styles={["btn-40", "round"]}
            text={"Tags"}
            left_ICON={
              <ICON_activeDigit
                count={activeTag_IDs.size}
                IS_active={activeTag_IDs.size > 0}
                inverse={true}
              />
            }
            aria_LABEL=""
            onClick={() => {
              SET_isMobileTagMenuOpen(true);
              USE_showBrowserToolbar();
            }}
            FIRE_clickEvent={false}
          />
        </div>
      )}
      {window_WIDTH > 900 && (
        <>
          <div ref={categoriesDD_REF}>
            <Categories_DD
              categories={categories}
              styles={["btn-36", "round", "dropdown", "red-x-on-hover"]}
            />
          </div>
          {activeTag_IDs.size === 0 && (
            <NonActive_TAGS
              chosen_TAGS={chosen_TAGS}
              potentialTag_IDs={potentialTag_IDs}
              SET_potentialTagIDs={SET_potentialTagIDs}
            />
          )}
          {activeTag_IDs.size > 0 && (
            <Active_TAGS
              all_TAGS={all_TAGS}
              activeTag_IDs={activeTag_IDs}
              UPDATE_tags={UPDATE_tags}
            />
          )}
        </>
      )}
      <Tagbox_MODAL
        {...{
          tagGroups,
          all_TAGS,
          tagUsages,
          activeTag_IDs,
          UPDATE_tags,
          potentialTag_IDs,
          SET_potentialTagIDs,
          IS_mobileTagMenuOpen,
          SET_isMobileTagMenuOpen,
          result_COUNT,
        }}
      />

      <Category_MODAL
        {...{
          IS_mobileCategoryMenuOpen,
          SET_isMobileCategoryMenuOpen,
          categories,
        }}
      />
    </header>
  );
}

function NonActive_TAGS({ chosen_TAGS, potentialTag_IDs, SET_potentialTagIDs }) {
  return (
    <>
      {chosen_TAGS.map((tag, index) => {
        const IS_potentialAdd = potentialTag_IDs.toAdd_IDs.has(tag._id);

        return (
          <Btn
            key={index}
            styles={["btn-36", "round", `${IS_potentialAdd ? "green" : ""}`]}
            text={tag?.name?.en}
            left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
            aria_LABEL=""
            right_ICON={
              <ICON_x
                color={IS_potentialAdd ? "green" : "dark"}
                small={true}
                rotate={true}
                rotationAnimation={IS_potentialAdd}
              />
            }
            onClick={() => {
              if (IS_potentialAdd) {
                SET_potentialTagIDs((prev) => {
                  const updated = { ...prev };
                  updated.toAdd_IDs.delete(tag._id);
                  return updated;
                });
                return;
              } else {
                SET_potentialTagIDs((prev) => {
                  const updated = { ...prev };
                  updated.toAdd_IDs.add(tag._id);
                  return updated;
                });
              }
            }}
            FIRE_clickEvent={false}
          />
        );
      })}
    </>
  );
}
function Active_TAGS({ all_TAGS, activeTag_IDs, UPDATE_tags }) {
  return (
    <>
      {all_TAGS
        .filter((tag) => activeTag_IDs.has(tag._id))
        .map((tag, index) => (
          <Btn
            key={index}
            styles={["btn-36", "round", "active"]}
            text={tag?.name?.en}
            left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
            aria_LABEL=""
            right_ICON={<ICON_x color="brand" small={true} />}
            onClick={() => UPDATE_tags(tag, "remove")}
            FIRE_clickEvent={false}
          />
        ))}
      <Btn
        styles={["btn-36", "round", "seeThrough", "red-x-on-hover"]}
        text={"Clear all"}
        right_ICON={<ICON_x small={true} />}
        aria_LABEL=""
        onClick={() => UPDATE_tags(null, "deleteAll")}
        FIRE_clickEvent={false}
      />
    </>
  );
}
