// //

import css from "./icons.module.css";
import PropTypes from "prop-types";

export function ICON_activeDigit({ count, IS_active }) {
  return (
    <div className={css.ICON_activeDigit} data-active={IS_active} data-testid="active-digit-icon">
      <p>{count}</p>
    </div>
  );
}
export function ICON_x({ rotate, color = "dark", small = false }) {
  return (
    <div
      className={small ? css.ICON_x_small : css.ICON_x}
      data-color={color}
      data-rotate={rotate}
    ></div>
  );
}
export function ICON_arrow({ direction, color = "dark" }) {
  const rotationAngle =
    {
      right: "0deg",
      left: "180deg",
      down: "90deg",
      up: "-90deg",
    }[direction] || "0deg";

  // const rotationAngle = rotationMap;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="14"
      viewBox="0 0 18 12"
      fill="none"
      style={{ rotate: rotationAngle }}
    >
      <path
        d="M1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75L1 5.25ZM17.5303 6.53033C17.8232 6.23744 17.8232 5.76256 17.5303 5.46967L12.7574 0.696699C12.4645 0.403806 11.9896 0.403806 11.6967 0.696699C11.4038 0.989593 11.4038 1.46447 11.6967 1.75736L15.9393 6L11.6967 10.2426C11.4038 10.5355 11.4038 11.0104 11.6967 11.3033C11.9896 11.5962 12.4645 11.5962 12.7574 11.3033L17.5303 6.53033ZM1 6.75L17 6.75L17 5.25L1 5.25L1 6.75Z"
        fill={"black"}
        data-color={color}
      />
    </svg>
  );
}
export function ICON_save({ style }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      className={css.ICON_save}
      data-testid="icon-save"
    >
      <path
        d="M9.00013 15C9.78229 15 10.8832 14.1123 11.5544 13.5634C12.2256 13.0145 13.9986 11.5084 14.8111 10.586C15.6236 9.66357 16.8154 8.00547 16.9787 6.26592C17.142 4.52637 16.3515 2.63429 15.1411 1.7933C13.9307 0.952322 12.7047 0.873466 11.7856 1.12768C10.8196 1.39538 10.3318 1.61432 9.03826 3.07008C9.03334 3.07546 9.02745 3.07974 9.02094 3.08267C9.01443 3.08559 9.00744 3.08709 9.00037 3.08709C8.99331 3.08709 8.98631 3.08559 8.9798 3.08267C8.97329 3.07974 8.96741 3.07546 8.96248 3.07008C7.66898 1.61432 7.18111 1.39538 6.21514 1.12768C5.29609 0.873466 4.06956 0.952841 2.85965 1.7933C1.64974 2.63377 0.855356 4.52585 1.02205 6.26592C1.18875 8.00599 2.3752 9.66357 3.18963 10.586C4.00405 11.5084 5.77517 13.0151 6.44636 13.5634C7.11756 14.1118 8.21796 15 9.00013 15Z"
        stroke="black"
        strokeWidth="1.6"
        data-style={style}
      />
    </svg>
  );
}
export function ICON_dropDownArrow({ color }) {
  return (
    <div
      style={{
        width: "1.6rem",
        height: "1.6rem",
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
        padding: "0.15rem 0.42rem 0 0.42rem",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 7 6"
        fill="none"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <path
          d="M4.36602 5.5C3.98112 6.16667 3.01888 6.16667 2.63397 5.5L0.46891 1.75C0.0840102 1.08333 0.565136 0.25 1.33494 0.25L5.66506 0.249999C6.43487 0.249999 6.91599 1.08333 6.53109 1.75L4.36602 5.5Z"
          fill="#383940"
        />
      </svg>
    </div>
  );
}
export function ICON_search({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M13 13L19 19"
        stroke="#383940"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
        stroke="#383940"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function ICON_searchSmall({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M11.6739 11.6738L16.6739 16.6738"
        stroke="#383940"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.10869 12.8914C10.3023 12.8914 12.8913 10.3024 12.8913 7.10878C12.8913 3.91513 10.3023 1.32617 7.10869 1.32617C3.91504 1.32617 1.32608 3.91513 1.32608 7.10878C1.32608 10.3024 3.91504 12.8914 7.10869 12.8914Z"
        stroke="#383940"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function ICON_menuLines() {
  return (
    <div className={css.ICON_menuLines}>
      <div className={css.line}></div>
      <div className={css.line}></div>
      <div className={css.line}></div>
    </div>
  );
}

ICON_activeDigit.propTypes = {
  count: PropTypes.number,
  IS_active: PropTypes.bool,
};

ICON_x.propTypes = {
  rotate: PropTypes.bool,
  color: PropTypes.string,
};

ICON_arrow.propTypes = {
  direction: PropTypes.string,
  color: PropTypes.string,
};

ICON_save.propTypes = {
  style: PropTypes.string,
};
