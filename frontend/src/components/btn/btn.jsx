//

import { useState } from "react";
import css from "./btn.module.css";
import PropTypes from "prop-types";

export function Btn({
  styles = ["btn-36"],
  text,
  leftIcon_URL,
  rightIcon_URL,
  onClick = () => alert("No function provided"),
  left_ICON,
  right_ICON,
  active,
}) {
  return (
    <button
      className={styles ? styles.map((style) => css[style]).join(" ") : css.btn}
      data-testid="btn"
      data-active={active}
      onClick={() => onClick()}
    >
      {leftIcon_URL && (
        <img src={leftIcon_URL} alt="" className={css.icon} data-testid="left-icon" />
      )}
      {left_ICON && left_ICON}
      {text && <p className={css.text}>{text}</p>}
      {rightIcon_URL && (
        <img
          src={rightIcon_URL}
          alt=""
          className={css.icon}
          style={{ height: "18px" }}
          data-testid="right-icon"
        />
      )}
      {right_ICON && right_ICON}
    </button>
  );
}
export function Btn_profileSearch({
  name = "Profile name",
  search = "...search...",
  onClick = () => alert("No function provided"),
}) {
  return (
    <button
      className={css["btn-profile-search"]}
      data-search={search !== ""}
      data-testid="btn-profile-search"
      onClick={() => onClick()}
    >
      <h4>{name}</h4>
      <p>
        Search for <span className={css.highlight}>{search}</span>
      </p>
    </button>
  );
}
export function Btn_profileName({
  name = "Profile name",
  onClick = () => alert("No function provided"),
}) {
  return (
    <button
      className={css["btn-profile-name"]}
      onClick={() => onClick()}
      data-testid="btn-profile-name"
    >
      <h4>{name}</h4>
    </button>
  );
}
export function Btn_profilePreviewIcons({
  icons = [],
  onClick = () => alert("No function provided"),
  visibleIcon_COUNT = 1,
  IS_open,
  activeDigit,
}) {
  const [dance, setDance] = useState(false);

  const handleDance = () => {
    if (dance) return;
    setDance(true);

    setTimeout(() => {
      setDance(false);
    }, 1000);
  };

  const displayedIcons = icons.slice(0, visibleIcon_COUNT);
  const remainingTagsCount = Math.max(0, icons.length - visibleIcon_COUNT);

  return (
    <button
      className={css["btn-show-icons"]}
      data-active={IS_open}
      onClick={() => {
        onClick();
        handleDance();
      }}
      data-dance={dance}
      data-testid="btn-profile-preview-icons"
    >
      {activeDigit}
      {displayedIcons.map((icon) => (
        <img key={icon} src={icon} alt="" className={css.icon} data-testid="tag-preview-btn-icon" />
      ))}
      {icons.length === 0 && <p data-testid="no-tags">No tags</p>}
      {remainingTagsCount > 0 && visibleIcon_COUNT && (
        <p data-testid="hidden-icon-count">+{remainingTagsCount}</p>
      )}
    </button>
  );
}

Btn.propTypes = {
  styles: PropTypes.array,
  text: PropTypes.string,
  leftIcon_URL: PropTypes.string,
  rightIcon_URL: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  left_ICON: PropTypes.element,
  right_ICON: PropTypes.element,
  active: PropTypes.bool,
};

Btn_profileSearch.propTypes = {
  name: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Btn_profileName.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Btn_profilePreviewIcons.propTypes = {
  icons: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  visibleIcon_COUNT: PropTypes.number.isRequired,
  IS_open: PropTypes.bool.isRequired,
  activeDigit: PropTypes.element.isRequired,
};
