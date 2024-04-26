//

import PropTypes from "prop-types";
import { useState, useContext } from "react";
import css from "../../ProfilePreview.module.css";
import { Btn, Btn_profileName, Btn_profileSearch } from "../../../btn/btn";
import { ICON_arrow } from "../../../icons/icons";
import { Lang_CONTEXT } from "../../../../contexts/lang";

export default function Preview_BOTTOM({ slide, HAS_swiper, name_OBJ, search = "" }) {
  const [arrow_DIRECTION, SET_arrowDirection] = useState("");
  const [ARE_arrowsDisabled, SET_arrowsDisabled] = useState(false);

  const { lang } = useContext(Lang_CONTEXT);

  const HANLDE_arrowClick = (direction) => {
    if (ARE_arrowsDisabled) return;
    SET_arrowsDisabled(true);
    slide(direction);
    SET_arrowDirection(direction);
    setTimeout(() => {
      SET_arrowDirection("");
      SET_arrowsDisabled(false);
    }, 499);
  };

  return (
    <div className={css.bottom} data-testid="profile-preview-bottom">
      {search === "" && (
        <Btn_profileName
          name={name_OBJ?.[lang]}
          aria_LABEL={`Visit ${name_OBJ?.[lang] || "profile"}`}
          onClick={() => alert("No function provided")}
        />
      )}
      {search !== "" && (
        <Btn_profileSearch
          name={name_OBJ?.[lang]}
          search={search}
          aria_LABEL={`Visit ${name_OBJ?.[lang] || "profile"}`}
          onClick={() => alert("No function provided")}
        />
      )}
      {HAS_swiper && (
        <div
          className={css.slider_ARROWS}
          data-arrowmove={arrow_DIRECTION}
          data-testid="swiper-arrows"
        >
          <Btn
            styles={["btn-36", "onImg", "round", "prev"]}
            onClick={() => {
              HANLDE_arrowClick("prev");
            }}
            right_ICON={<ICON_arrow direction="left" color="white" />}
            aria_LABEL={"Previous image"}
            data-testid="arrow-prev"
          />
          <Btn
            styles={["btn-36", "onImg", "round", "next"]}
            onClick={() => {
              HANLDE_arrowClick("next");
            }}
            right_ICON={<ICON_arrow direction="right" color="white" />}
            aria_LABEL={"Next image"}
            data-testid="arrow-prev"
          />
        </div>
      )}
    </div>
  );
}
Preview_BOTTOM.propTypes = {
  slide: PropTypes.func.isRequired,
  HAS_swiper: PropTypes.bool.isRequired,
  name_OBJ: PropTypes.object.isRequired,
  search: PropTypes.string.isRequired,
};
