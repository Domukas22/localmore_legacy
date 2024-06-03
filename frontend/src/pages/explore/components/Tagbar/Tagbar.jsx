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
import { useContext, useEffect, useRef, useState } from "react";
import { FontSizeContext } from "../../../../contexts/fontSize";
import { USE_windowSize } from "../../../../hooks/USE_windowWidth";

export function Tagbar({ categories, tags, window_WIDTH }) {
  const { fontSize, fontSize_SCALE } = useContext(FontSizeContext);
  const { width } = USE_windowSize();
  const tagbar_REF = useRef(null);
  const mainBtns_REF = useRef(null);
  const [chosen_TAGS, setChosen_TAGS] = useState([]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (mainBtns_REF.current && tagbar_REF.current) {
        const tagbar_WIDTH = tagbar_REF.current.clientWidth;
        const mainBtns_WIDTH = mainBtns_REF.current.clientWidth;
        console.log("left", tagbar_WIDTH - mainBtns_WIDTH);
      }
    });

    resizeObserver.observe(mainBtns_REF.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [fontSize, fontSize_SCALE, width]);

  return (
    <header className={css.header} ref={tagbar_REF}>
      <div className={css.background} data-shadow={false}></div>
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
            left_ICON={<ICON_activeDigit count={0} />}
            // right_ICON={<ICON_x rotate={true} />}
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
              left_ICON={<ICON_activeDigit count={0} />}
              right_ICON={<ICON_x rotate={true} />}
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </div>

          <div className={css.tags_WRAP}>
            {tags.map((tag, index) => (
              <Btn
                key={index}
                styles={["btn-36", "round"]}
                text={tag?.name?.en}
                left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
                aria_LABEL=""
                onClick={() => {}}
                FIRE_clickEvent={false}
              />
            ))}
          </div>
        </>
      )}
    </header>
  );
}
