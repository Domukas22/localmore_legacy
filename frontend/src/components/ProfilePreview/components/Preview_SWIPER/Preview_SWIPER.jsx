//

import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import css from "../../ProfilePreview.module.css";

export default function Preview_SWIPER({ sliderRef, images, img_END }) {
  return (
    <>
      <Swiper loop={true} ref={sliderRef} speed={500}>
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img + img_END} className={css.profile_IMG} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
Preview_SWIPER.propTypes = {
  sliderRef: PropTypes.object.isRequired,
  images: PropTypes.array.isRequired,
  img_END: PropTypes.string.isRequired,
};
