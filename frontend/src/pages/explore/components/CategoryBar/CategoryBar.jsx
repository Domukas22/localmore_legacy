//
//

import { Category_LINK } from "../../../../components/btn/btn";
import css from "./CategoryBar.module.css";
import { Btn } from "../../../../components/btn/btn";
import { ICON_arrow } from "../../../../components/icons/icons";
import USE_scrollable from "../../../../hooks/USE_scrollable";

export function CategoryBar({ categories, window_WIDTH }) {
  const { scrollable, scroll, scroll_START, scroll_END, HANDLE_arrowVisibility } = USE_scrollable();

  return (
    <div className={css.CategoryBar}>
      <div className={css.ul_WRAP}>
        <ul ref={scrollable} onScroll={(e) => HANDLE_arrowVisibility(e.currentTarget.scrollLeft)}>
          {categories?.map((category) => (
            <Category_LINK
              key={category._id}
              name={category.name.en}
              image_URL={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/View_from_the_castle_park_to_the_old_town_with_the_Heiliggeistkirche_and_the_old_bridge_over_the_Neckar_to_the_Philosophenweg%2C_recognizable_by_the_traces_of_a_vehicle.jpg/1200px-thumbnail.jpg"
              }
              remove={() => {}}
            />
          ))}
        </ul>
        <div className={css.fade} data-first data-hide={scroll_START}></div>
        <div className={css.fade} data-second></div>
      </div>
      {window_WIDTH > 900 && (
        <div className={css.test_arrow_wrap} data-start={scroll_START} data-end={scroll_END}>
          <Btn
            styles={["btn-36", "round"]}
            left_ICON={<ICON_arrow direction="right" />}
            aria_LABEL=""
            onClick={() => scroll(400)}
            FIRE_clickEvent={false}
          />
          <Btn
            styles={["btn-36", "round"]}
            left_ICON={<ICON_arrow direction="left" />}
            aria_LABEL=""
            onClick={() => scroll(-400)}
            FIRE_clickEvent={false}
          />
        </div>
      )}
    </div>
  );
}
