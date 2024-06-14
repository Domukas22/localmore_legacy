//
//

import css from "./Category_SWIPER.module.css";
import { Btn } from "../../../../components/Btn/Btn";
import { ICON_arrow } from "../../../../components/icons/icons";
import USE_scrollable from "../../../../hooks/USE_scrollable";

import { Swiper, SwiperSlide } from "swiper/react";
import USE_slideSwiper from "../../../../hooks/USE_slideSwiper";
import { useEffect, useState } from "react";
import { Label } from "../../../../components/labels/labels";

export function Category_SWIPER({ categories, window_WIDTH, shuffled_PROFILES }) {
  // const { scrollable, scroll, scroll_START, scroll_END, HANDLE_arrowVisibility } = USE_scrollable();
  const { sliderRef, slide } = USE_slideSwiper();
  const [activeIndex, setActiveIndex] = useState(0);

  const [displayed_CATEGORIES, SET_displayedCategories] = useState([...categories]);
  const [category_IMAGES, SET_categoryImages] = useState({});
  const dummy_IMG =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/View_from_the_castle_park_to_the_old_town_with_the_Heiliggeistkirche_and_the_old_bridge_over_the_Neckar_to_the_Philosophenweg%2C_recognizable_by_the_traces_of_a_vehicle.jpg/1200px-thumbnail.jpg";

  useEffect(() => {
    const img_SET = new Set();
    const category_IMAGES_TEMP = {};

    displayed_CATEGORIES.forEach((category) => {
      for (const profile of shuffled_PROFILES) {
        if (profile.categories.some((categ) => categ._id === category._id)) {
          const imageUrl = `${profile?.img?.desktop?.[0]}/Big`;

          if (!img_SET.has(imageUrl)) {
            img_SET.add(imageUrl);
            category_IMAGES_TEMP[category._id] = imageUrl;
            break; // Move to the next category after finding a unique image
          }
        }
      }
    });

    SET_categoryImages(category_IMAGES_TEMP);
  }, [displayed_CATEGORIES, shuffled_PROFILES]);

  useEffect(() => {
    SET_displayedCategories(categories.filter((category) => !category.IS_startCategory));
  }, [categories]);

  const GET_profileInCategoryCount = (categ_ID) => {
    return shuffled_PROFILES.filter((profile) =>
      profile.categories.some((categ) => categ._id === categ_ID)
    ).length;
  };

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
            {displayed_CATEGORIES?.map((category) => {
              return (
                <SwiperSlide key={category._id} className={css.swiperSlide}>
                  <div className={css.label_WRAP}>
                    <Label
                      name={`${GET_profileInCategoryCount(category._id)} items`}
                      color="brand-strong"
                    />
                  </div>
                  <a href="#" className={css.category_LINK}>
                    <img src={category_IMAGES[category._id] || dummy_IMG} alt="" loading="lazy" />
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
