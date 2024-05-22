//

import { useState, useRef } from "react";
import css from "./btn.module.css";
import PropTypes from "prop-types";
import { Button } from "react-aria-components";
import { ICON_activeDigit } from "../icons/icons";
import { profilePreview_TR } from "../../translations";
import { USE_windowWidth } from "../../hooks/USE_windowWidth";
import DD from "../dd/dd";

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
  active,
  FIRE_clickEvent = true,
  custom_DATA,
}) {
  return (
    <Button
      className={styles ? styles.map((style) => css[style]).join(" ") : css["btn-36"]}
      data-saved={saved}
      onPress={() => {
        onClick();
        if (FIRE_clickEvent) {
          document.dispatchEvent(new Event("click")); // for the dropdowns
          console.log("click");
        }
      }}
      aria-label={aria_LABEL}
      data-testid={test_ID}
      data-active={active}
      data-custom={custom_DATA}
    >
      {leftIcon_URL && <img src={leftIcon_URL} className={css.icon} data-testid="left-icon" />}
      {left_ICON && left_ICON}
      {text && <p className={css.text}>{text}</p>}
      {rightIcon_URL && <img src={rightIcon_URL} className={css.icon} data-testid="right-icon" />}
      {right_ICON && right_ICON}
    </Button>
  );
}

export function Nav_DD({ text, left_ICON, aria_LABEL }) {}

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
      onPress={() => {
        onClick();
        document.dispatchEvent(new Event("click")); // for the dropdowns
        console.log("click");
      }}
      aria-label={aria_LABEL}
      data-testid="profile-search-btn"
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
      onPress={() => {
        onClick();
        document.dispatchEvent(new Event("click")); // for the dropdowns
        console.log("click");
      }}
      aria-label={aria_LABEL}
      data-testid="profile-name-btn"
    >
      <h4>{name ?? "Profile name"}</h4>
    </Button>
  );
}
export function ShowTags_BTN({
  onClick = () => alert("No function provided"),
  IS_open,
  matchedTags_COUNT,
  profile,
  lang,
}) {
  const [dance, setDance] = useState(false);

  const name = profile?.name?.[lang] || "Profile name not found";

  const windowWidth = USE_windowWidth();
  const visibleIcon_COUNT = windowWidth > 400 ? 3 : windowWidth > 380 ? 2 : 1;

  const icons = profile?.tags?.map((t) => (t.icon?.url ? t.icon.url : ""));
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
        document.dispatchEvent(new Event("click")); // for the dropdowns
        console.log("click");
      }}
      data-dance={dance}
      aria-label={
        IS_open
          ? profilePreview_TR?.hideTagsBtn_ARIA(name)[lang]
          : profilePreview_TR?.showTagsBtn_ARIA(name)[lang]
      }
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
export function SavedProfile_BTN({
  name,
  subname,
  image_URL,
  aria_LABEL,
  onClick = () => alert("No function provided"),
}) {
  return (
    <Button
      className={css["saved-profile-btn"]}
      onPress={onClick}
      aria-label={aria_LABEL}
      data-testid="saved-profile-btn"
    >
      <img src={image_URL} />
      <div className={css.text_WRAP}>
        <h4>{name ?? "Name"}</h4>
        <p>{subname ?? "Subname"}</p>
      </div>
    </Button>
  );
}

Btn.propTypes = {
  styles: PropTypes.array,
  text: PropTypes.string,
  leftIcon_URL: PropTypes.string,
  rightIcon_URL: PropTypes.string,
  onClick: PropTypes.func,
  left_ICON: PropTypes.element,
  right_ICON: PropTypes.element,
  saved: PropTypes.bool,
  aria_LABEL: PropTypes.string,
  test_ID: PropTypes.string,
};

ProfileSearch_BTN.propTypes = {
  name: PropTypes.string,
  search: PropTypes.string,
  aria_LABEL: PropTypes.string,
  onClick: PropTypes.func,
};

ProfileName_BTN.propTypes = {
  name: PropTypes.string,
  aria_LABEL: PropTypes.string,
  onClick: PropTypes.func,
};

ShowTags_BTN.propTypes = {
  onClick: PropTypes.func,
  IS_open: PropTypes.bool,
  matchedTags_COUNT: PropTypes.number,
  profile: PropTypes.object,
  lang: PropTypes.string,
};
