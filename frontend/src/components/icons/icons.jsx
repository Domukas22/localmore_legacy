// //

import css from "./icons.module.css";
import PropTypes from "prop-types";

export function ICON_activeDigit({ count, IS_active, inverse = false, jump = false }) {
  return (
    <div
      className={css.ICON_activeDigit}
      data-active={IS_active || false}
      data-inverse={inverse}
      data-testid="active-digit-icon"
      data-jump={jump}
    >
      <p>{count || "0"}</p>
    </div>
  );
}
export function ICON_x({
  rotate = false,
  color = "dark",
  small = false,
  rotationAnimation = false,
  oneLine = false,
}) {
  return (
    <div
      className={small ? css.ICON_x_small : css.ICON_x}
      data-color={color}
      data-rotate={rotate}
      data-rotation-animation={rotationAnimation}
      data-one-line={oneLine}
    ></div>
  );
}
export function ICON_arrow({ direction = "right", color = "dark" }) {
  const rotationAngle = {
    right: "0deg",
    left: "180deg",
    down: "90deg",
    up: "-90deg",
  }[direction];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="14"
      viewBox="0 0 18 12"
      fill="none"
      style={{ rotate: rotationAngle }}
      className={css.ICON_arrow}
    >
      <path
        d="M1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75L1 5.25ZM17.5303 6.53033C17.8232 6.23744 17.8232 5.76256 17.5303 5.46967L12.7574 0.696699C12.4645 0.403806 11.9896 0.403806 11.6967 0.696699C11.4038 0.989593 11.4038 1.46447 11.6967 1.75736L15.9393 6L11.6967 10.2426C11.4038 10.5355 11.4038 11.0104 11.6967 11.3033C11.9896 11.5962 12.4645 11.5962 12.7574 11.3033L17.5303 6.53033ZM1 6.75L17 6.75L17 5.25L1 5.25L1 6.75Z"
        className={css.path_FILL}
        data-color={color}
      />
    </svg>
  );
}
export function ICON_leavePage({ color = "dark" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" className={css.ICON_leavePage}>
      <path
        d="M0.434315 8.43431C0.121895 8.74673 0.121895 9.25327 0.434315 9.56569C0.746734 9.8781 1.25327 9.8781 1.56569 9.56569L0.434315 8.43431ZM9.8 1C9.8 0.558172 9.44183 0.2 9 0.2L1.8 0.200001C1.35817 0.200001 1 0.558173 1 1C1 1.44183 1.35817 1.8 1.8 1.8H8.2V8.2C8.2 8.64183 8.55817 9 9 9C9.44183 9 9.8 8.64183 9.8 8.2L9.8 1ZM1.56569 9.56569L9.56569 1.56569L8.43431 0.434315L0.434315 8.43431L1.56569 9.56569Z"
        data-color={color}
      />
    </svg>
  );
}
export function ICON_save({ color = "dark" }) {
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
        data-style={color}
      />
    </svg>
  );
}

export function ICON_dropDownArrow({ color = "dark" }) {
  return (
    <div className={css.ICON_dropDownArrow} data-color={color}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 7 6"
        fill="none"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <path d="M4.36602 5.5C3.98112 6.16667 3.01888 6.16667 2.63397 5.5L0.46891 1.75C0.0840102 1.08333 0.565136 0.25 1.33494 0.25L5.66506 0.249999C6.43487 0.249999 6.91599 1.08333 6.53109 1.75L4.36602 5.5Z" />
      </svg>
    </div>
  );
}
export function ICON_search({ small = false }) {
  if (!small) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
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
export function ICON_proCon({ IS_pro = true }) {
  return (
    <div className={css.ICON_proCon} data-pro={IS_pro}>
      {IS_pro && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
        >
          <path
            d="M1.3337 6.57719L3.85275 10.0198L8.93721 1.91042"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {!IS_pro && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="none">
          <path
            d="M1.51611 1.36328L8.52006 8.36723"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.51953 1.36328L1.51558 8.36723"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
export function ICON_3dots({ color = "dark" }) {
  return (
    <div className={css.ICON_3dots} data-color={color}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
export function ICON_error({ color = "dark" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19" fill="none">
      <path
        d="M10.8849 0.4905C10.5389 -0.1635 9.46294 -0.1635 9.11694 0.4905L0.116935 17.4905C0.0359187 17.6429 -0.00424573 17.8136 0.00035519 17.9861C0.00495611 18.1586 0.0541655 18.327 0.143189 18.4749C0.232212 18.6227 0.358012 18.7449 0.508333 18.8297C0.658653 18.9145 0.828366 18.9588 1.00094 18.9585H19.0009C19.1734 18.9589 19.343 18.9145 19.4932 18.8298C19.6434 18.7451 19.7691 18.6229 19.8581 18.4752C19.947 18.3274 19.9961 18.1591 20.0007 17.9867C20.0052 17.8144 19.965 17.6437 19.8839 17.4915L10.8849 0.4905ZM11.0009 15.9585H9.00094V13.9585H11.0009V15.9585ZM9.00094 11.9585V6.9585H11.0009L11.0019 11.9585H9.00094Z"
        className={css.path_FILL}
        data-color={color}
      />
    </svg>
  );
}

ICON_activeDigit.propTypes = {
  count: PropTypes.number,
  IS_active: PropTypes.bool,
  inverse: PropTypes.bool,
  jump: PropTypes.bool,
};
ICON_x.propTypes = {
  rotate: PropTypes.bool,
  color: PropTypes.string,
  small: PropTypes.bool,
  rotationAnimation: PropTypes.bool,
  oneLine: PropTypes.bool,
};
ICON_arrow.propTypes = {
  direction: PropTypes.string,
  color: PropTypes.string,
};
ICON_save.propTypes = {
  style: PropTypes.string,
};
ICON_dropDownArrow.propTypes = {
  color: PropTypes.string,
};
ICON_search.propTypes = {
  color: PropTypes.string,
};
ICON_menuLines.propTypes = {};
ICON_proCon.propTypes = {
  IS_pro: PropTypes.bool,
};
ICON_3dots.propTypes = {
  color: PropTypes.string,
};
ICON_error.propTypes = {
  color: PropTypes.string,
};
