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
} from "../../../../components/icons/icons";
import { useCallback, useRef, useState } from "react";
import USE_scrollable from "../../../../hooks/USE_scrollable";

export function Tagbar({ categories, tags, window_WIDTH }) {
  const { scrollable, scroll, scroll_START, scroll_END, HANDLE_arrowVisibility } = USE_scrollable();

  return (
    <header className={css.header}>
      {window_WIDTH < 900 && (
        <div className={css.mobileBtn_WRAP}>
          <Btn
            styles={["btn-40", "round"]}
            text={"Sportsfields"}
            left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/889/889455.png"></img>}
            right_ICON={<ICON_dropDownArrow />}
            aria_LABEL=""
            onClick={() => scroll(-400)}
            FIRE_clickEvent={false}
          />
          <Btn
            styles={["btn-40", "round"]}
            text={"Tags"}
            left_ICON={<ICON_activeDigit count={0} />}
            // right_ICON={<ICON_x rotate={true} />}
            aria_LABEL=""
            onClick={() => scroll(-400)}
            FIRE_clickEvent={false}
          />
        </div>
      )}
      {window_WIDTH > 900 && (
        <>
          <div className={css.ul_WRAP}>
            <ul
              ref={scrollable}
              onScroll={(e) => HANDLE_arrowVisibility(e.currentTarget.scrollLeft)}
            >
              {tags?.map((tag) => {
                return (
                  <li key={tag._id}>
                    <Btn
                      key={tag._id}
                      styles={["btn-36", "round"]}
                      leftIcon_URL={tag.icon?.url ? tag.icon?.url : ""}
                      right_ICON={<span style={{ paddingTop: "0.1rem" }}>{13}</span>}
                      text={tag.name?.en}
                      // aria_LABEL={tr?.filterTagBtn_ARIA(tag.name?.[lang])[lang]}
                      onClick={() => alert("No function provided")}
                      test_ID={"overlay-tag-btn"}
                    />
                  </li>
                );
              })}
              {tags?.map((tag) => {
                return (
                  <li key={tag._id}>
                    <Btn
                      key={tag._id}
                      styles={["btn-36", "round"]}
                      leftIcon_URL={tag.icon?.url ? tag.icon?.url : ""}
                      right_ICON={<span style={{ paddingTop: "0.1rem" }}>{13}</span>}
                      text={tag.name?.en}
                      // aria_LABEL={tr?.filterTagBtn_ARIA(tag.name?.[lang])[lang]}
                      onClick={() => alert("No function provided")}
                      test_ID={"overlay-tag-btn"}
                    />
                  </li>
                );
              })}
            </ul>
            <div className={css.fade} data-first data-hide={scroll_START}></div>
            <div className={css.fade} data-second></div>
          </div>

          <div className={css.sliderBtn_WRAP} data-start={scroll_START} data-end={scroll_END}>
            <Btn
              styles={["btn-36", "round"]}
              left_ICON={<ICON_arrow direction="left" />}
              aria_LABEL=""
              onClick={() => scroll(-400)}
              FIRE_clickEvent={false}
            />
            <Btn
              styles={["btn-36", "round"]}
              left_ICON={<ICON_arrow direction="right" />}
              aria_LABEL=""
              onClick={() => scroll(400)}
              FIRE_clickEvent={false}
            />
          </div>
        </>
      )}
    </header>
  );
}
