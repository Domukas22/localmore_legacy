// //

import css from "./icons.module.css";
import PropTypes from "prop-types";

export function ICON_activeDigit({ count, IS_active }) {
  return (
    <div className={css.ICON_activeDigit} data-active={IS_active} data-testid="icon-active-digit">
      <p>{count}</p>
    </div>
  );
}
export function ICON_x({ rotate, color }) {
  return <div className={css.ICON_x} data-color={color} data-rotate={rotate}></div>;
}
export function ICON_arrow({ direction, color }) {
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
      width="15"
      height="20"
      viewBox="0 0 15 20"
      fill="none"
      className={css.ICON_save}
      data-testid="icon-save"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.78571 1C3.0469 1 2.33834 1.28447 1.81592 1.79083C1.29349 2.29719 1 2.98397 1 3.70007V18.1005C1.00008 18.2538 1.0406 18.4046 1.11769 18.5385C1.19479 18.6724 1.30591 18.785 1.44051 18.8657C1.57511 18.9463 1.72873 18.9922 1.88679 18.9991C2.04485 19.006 2.20211 18.9736 2.34364 18.9051L7.5 16.4066L12.6564 18.9051C12.7979 18.9736 12.9551 19.006 13.1132 18.9991C13.2713 18.9922 13.4249 18.9463 13.5595 18.8657C13.6941 18.785 13.8052 18.6724 13.8823 18.5385C13.9594 18.4046 13.9999 18.2538 14 18.1005V3.70007C14 2.98397 13.7065 2.29719 13.1841 1.79083C12.6617 1.28447 11.9531 1 11.2143 1H3.78571Z"
        fill="none"
        stroke="black"
        strokeWidth="1.6"
        data-style={style}
      />
    </svg>
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
