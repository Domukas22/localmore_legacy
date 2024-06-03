//
//
import { Categories_DD } from "../../../../components/Nav/components/Dropdowns/Categories_DD";
import { Btn } from "../../../../components/btn/btn";
import css from "./Tagbar.module.css";

import {
  ICON_x,
  ICON_arrow,
  ICON_dropDownArrow,
  ICON_activeDigit,
  ICON_3dots,
} from "../../../../components/icons/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { FontSizeContext } from "../../../../contexts/fontSize";
import { USE_windowSize } from "../../../../hooks/USE_windowWidth";

export function Tagbar({
  categories,
  all_TAGS,
  active_TAGS,
  nonActive_TAGS,
  potential_TAGS,
  window_WIDTH,
  UPDATE_tags,
}) {
  const { fontSize, fontSize_SCALE } = useContext(FontSizeContext);
  const { width } = USE_windowSize();
  const [chosen_TAGS, SET_chosenTags] = useState([]);
  const [HAS_shadow, SET_shadow] = useState(false);

  const tagbar_REF = useRef(null);
  const mainBtns_REF = useRef(null);

  useEffect(() => {
    const nav_HEIGHT = 56 * fontSize_SCALE;
    const handleScroll = () => {
      SET_shadow(nav_HEIGHT >= tagbar_REF.current.getBoundingClientRect().top);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fontSize, fontSize_SCALE]);

  useEffect(() => {
    const CALCULATE_tagWidth = (tag) => {
      const icon_WIDTH = 20 * fontSize_SCALE;
      const padding = 12 * fontSize_SCALE * 2;
      const buttonInside_GAP = 8 * fontSize_SCALE;
      const letters_WIDTH = 8 * fontSize_SCALE * tag.name.en.length; // a little overshot to make sure it fits
      const button_GAP = 8 * fontSize_SCALE;
      const total =
        padding + icon_WIDTH + buttonInside_GAP + letters_WIDTH + icon_WIDTH + button_GAP;

      return total;
    };

    const calculateTagsToFit = () => {
      if (mainBtns_REF.current && tagbar_REF.current) {
        const tagbar_WIDTH = tagbar_REF.current.clientWidth;
        const mainBtns_WIDTH = mainBtns_REF.current.clientWidth;
        const remainingWidth = tagbar_WIDTH - mainBtns_WIDTH;

        let usedWidth = 0;
        const chosenTags = [];

        for (const tag of nonActive_TAGS) {
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

    return () => {
      resizeObserver.disconnect();
    };
  }, [all_TAGS, fontSize, fontSize_SCALE, width, active_TAGS]);

  return (
    <header className={css.header} ref={tagbar_REF}>
      <div className={css.background} data-shadow={HAS_shadow}></div>
      {window_WIDTH < 900 && (
        <div className={css.mobileBtn_WRAP}>
          <Btn
            styles={["btn-40", "round"]}
            text={"Sportsfields"}
            left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/889/889455.png"></img>}
            right_ICON={<ICON_dropDownArrow />}
            aria_LABEL=""
            onClick={() => {}}
            FIRE_clickEvent={false}
          />
          <Btn
            styles={["btn-40", "round"]}
            text={"Tags"}
            left_ICON={
              <ICON_activeDigit count={active_TAGS.size} IS_active={active_TAGS.size > 0} />
            }
            aria_LABEL=""
            onClick={() => {}}
            FIRE_clickEvent={false}
          />
        </div>
      )}
      {window_WIDTH > 900 && (
        <>
          <div className={css.mainBtn_WRAP} ref={mainBtns_REF}>
            <Categories_DD categories={categories} styles={["btn-36", "round", "dropdown"]} />
            <Btn
              styles={["btn-36", "round"]}
              text={"Tags"}
              left_ICON={
                <ICON_activeDigit count={active_TAGS.size} IS_active={active_TAGS.size > 0} />
              }
              right_ICON={<ICON_x rotate={true} />}
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
            {Array.from(active_TAGS).map((tag, index) => (
              <Btn
                key={index}
                styles={["btn-36", "round"]}
                text={tag?.name?.en}
                left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
                aria_LABEL=""
                right_ICON={<ICON_x color="brand" small={true} />}
                onClick={() => UPDATE_tags(tag, "remove")}
                active={true}
                FIRE_clickEvent={false}
              />
            ))}
          </div>

          <div className={css.tags_WRAP}>
            {chosen_TAGS.map((tag, index) => (
              <Btn
                key={index}
                styles={["btn-36", "round"]}
                text={tag?.name?.en}
                left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
                aria_LABEL=""
                onClick={() => UPDATE_tags(tag, "add")}
                FIRE_clickEvent={false}
              />
            ))}
          </div>
          <Btn
            styles={["btn-36", "round"]}
            text={"More"}
            right_ICON={<ICON_dropDownArrow color="dark" />}
            aria_LABEL=""
            onClick={() => {}}
            FIRE_clickEvent={false}
          />
        </>
      )}
    </header>
  );
}
