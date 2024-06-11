//
//

import css from "./Category_SWIPER.module.css";
import { Btn } from "../../../../components/btn/btn";
import { ICON_arrow } from "../../../../components/icons/icons";
import USE_scrollable from "../../../../hooks/USE_scrollable";

import { Swiper, SwiperSlide } from "swiper/react";
import USE_slideSwiper from "../../../../hooks/USE_slideSwiper";
import { useEffect, useState } from "react";

export function Category_SWIPER({ categories, window_WIDTH, profiles }) {
  // const { scrollable, scroll, scroll_START, scroll_END, HANDLE_arrowVisibility } = USE_scrollable();
  const { sliderRef, slide } = USE_slideSwiper();
  const [activeIndex, setActiveIndex] = useState(0);

  const categoryImages = {};

  categories.forEach((category) => {
    const categoryProfiles = profiles.filter((profile) =>
      profile.categories.includes(category._id)
    );
    const usedImages = new Set();

    for (const profile of categoryProfiles) {
      const image = profile.img?.desktop?.[0] + "/Big";
      if (!usedImages.has(image)) {
        usedImages.add(image);
        categoryImages[category._id] = image;
        break;
      }
    }

    // If no image was found, use a default one
    if (!categoryImages[category._id]) {
      categoryImages[category._id] =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/View_from_the_castle_park_to_the_old_town_with_the_Heiliggeistkirche_and_the_old_bridge_over_the_Neckar_to_the_Philosophenweg%2C_recognizable_by_the_traces_of_a_vehicle.jpg/1200px-thumbnail.jpg";
    }
  });

  return (
    <div className={css.Category_SWIPER}>
      <div className={css.ul_WRAP}>
        <ul>
          <Swiper
            ref={sliderRef}
            slidesPerView={"auto"}
            slidesPerGroup={1}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            // speed={500}
            // centeredSlides={window_WIDTH < 1100}
            className={css.swiper}
          >
            {categories?.map((category) => {
              // only end categories
              if (category?.IS_startCategory) return;

              return (
                <SwiperSlide key={category._id} className={css.swiperSlide}>
                  <a href="#" className={css.category_LINK}>
                    <img src={categoryImages[category._id]} alt="" loading="lazy" />
                    <h4>{category?.name?.en ?? "Name"}</h4>
                  </a>
                </SwiperSlide>
              );
            })}
            {window_WIDTH > 1100 && (
              <>
                <div className={css.fade} data-first data-hide={activeIndex === 0}></div>
                <div
                  className={css.fade}
                  data-second
                  data-hide={activeIndex === categories.length - 1}
                ></div>
              </>
            )}
          </Swiper>
        </ul>
      </div>
      {window_WIDTH > 900 && (
        <div className={css.swiperArrow_WRAP}>
          <Btn
            styles={["btn-36", "round"]}
            left_ICON={<ICON_arrow direction="right" />}
            aria_LABEL=""
            onClick={() => {
              slide("next");
            }}
            FIRE_clickEvent={false}
          />
          <Btn
            styles={["btn-36", "round"]}
            left_ICON={<ICON_arrow direction="left" />}
            aria_LABEL=""
            onClick={() => {
              slide("prev");
            }}
            FIRE_clickEvent={false}
          />
        </div>
      )}
    </div>
  );
}
