//

import { useState, useEffect } from "react";
import css from "./btn.module.css";
import PropTypes from "prop-types";
import { Button } from "react-aria-components";
import { ICON_activeDigit } from "../icons/icons";

export function Btn({
  styles,
  text,
  leftIcon_URL,
  rightIcon_URL,
  onClick = () => alert("No function provided"),
  left_ICON,
  right_ICON,
  saved,
  aria_LABEL,
  test_ID,
}) {
  return (
    <Button
      className={styles ? styles.map((style) => css[style]).join(" ") : css["btn-36"]}
      data-saved={saved}
      onPress={onClick}
      aria-label={aria_LABEL}
      data-testid={test_ID}
    >
      {leftIcon_URL && <img src={leftIcon_URL} className={css.icon} data-testid="left-icon" />}
      {left_ICON && left_ICON}
      {text && <p className={css.text}>{text}</p>}
      {rightIcon_URL && (
        <img
          src={rightIcon_URL}
          className={css.icon}
          // style={{ height: "18px" }}
          data-testid="right-icon"
        />
      )}
      {right_ICON && right_ICON}
    </Button>
  );
}
export function ProfileSearch_BTN({
  name,
  search,
  aria_LABEL,
  onClick = () => alert("No function provided"),
}) {
  return (
    <Button
      className={css["profile-search-btn"]}
      data-search={search !== ""}
      onPress={onClick}
      aria-label={aria_LABEL}
    >
      <h4>{name ?? "Profile name"}</h4>
      <p>
        Search for <span className={css.highlight}>{search ?? "...search..."}</span>
      </p>
    </Button>
  );
}
export function ProfileName_BTN({
  name,
  aria_LABEL,
  onClick = () => alert("No function provided"),
}) {
  return (
    <Button
      className={css["profile-name-btn"]}
      onPress={onClick}
      aria-label={aria_LABEL}
      data-testid="profile-name-btn"
    >
      <h4>{name ?? "Profile name"}</h4>
    </Button>
  );
}
export function ShowTags_BTN({
  icons,
  onClick = () => alert("No function provided"),
  IS_open,
  visibleIcon_COUNT = 1,
  matchedTags_COUNT,
  aria_LABEL,
}) {
  const [dance, setDance] = useState(false);

  const displayedIcons = icons ? icons.slice(0, visibleIcon_COUNT) : [];
  const remainingTagsCount =
    displayedIcons.length > 0 ? Math.max(0, icons.length - visibleIcon_COUNT) : 0;

  const handleDance = () => {
    if (dance) return;
    setDance(true);

    setTimeout(() => {
      setDance(false);
    }, 1000);
  };

  return (
    <Button
      className={css["show-icons-btn"]}
      data-open={IS_open}
      onPress={() => {
        onClick();
        handleDance();
      }}
      data-dance={dance}
      aria-label={aria_LABEL}
      data-testid="show-icons-btn"
    >
      {matchedTags_COUNT > 0 && <ICON_activeDigit count={matchedTags_COUNT} IS_active={true} />}
      {icons && displayedIcons.map((icon) => <img key={icon} src={icon} className={css.icon} />)}
      {!icons && <p>No tags</p>}
      {remainingTagsCount > 0 && visibleIcon_COUNT && (
        <>
          {remainingTagsCount === 1 ? (
            icons && <img src={icons[visibleIcon_COUNT]} className={css.icon} />
          ) : (
            <p>+{remainingTagsCount}</p>
          )}
        </>
      )}
    </Button>
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
  saved: PropTypes.bool,
  aria_LABEL: PropTypes.string.isRequired,
  test_ID: PropTypes.string,
};

ProfileSearch_BTN.propTypes = {
  name: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  aria_LABEL: PropTypes.string.isRequired,
};

ProfileName_BTN.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  aria_LABEL: PropTypes.string.isRequired,
};

ShowTags_BTN.propTypes = {
  icons: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  IS_open: PropTypes.bool.isRequired,
  matchedTags_COUNT: PropTypes.number.isRequired,
  aria_LABEL: PropTypes.string.isRequired,
};
