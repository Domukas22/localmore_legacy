//

import { useState } from "react";
import css from "./btn.module.css";
import PropTypes from "prop-types";
import { Button } from "react-aria-components";

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
}) {
  return (
    <Button
      className={styles ? styles.map((style) => css[style]).join(" ") : css["btn-36"]}
      data-testid="btn"
      data-saved={saved}
      onPress={onClick}
      aria-label={aria_LABEL}
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
    </Button>
  );
}
// export function Btn_test({
//   text,
//   leftIcon_URL,
//   rightIcon_URL,
//   left_ICON,
//   right_ICON,
// }) {
//   return (
//     <>
//       {leftIcon_URL && (
//         <img src={leftIcon_URL} alt="" className={css.icon} data-testid="left-icon" />
//       )}
//       {left_ICON && left_ICON}
//       {text && <p className={css.text}>{text}</p>}
//       {rightIcon_URL && (
//         <img
//           src={rightIcon_URL}
//           alt=""
//           className={css.icon}
//           style={{ height: "18px" }}
//           data-testid="right-icon"
//         />
//       )}
//       {right_ICON && right_ICON}
//     </>
//   );
// }
export function Btn_profileSearch({
  name,
  search,
  aria_LABEL,
  onClick = () => alert("No function provided"),
}) {
  return (
    <Button
      className={css["btn-profile-search"]}
      data-search={search !== ""}
      data-testid="btn-profile-search"
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
export function Btn_profileName({
  name,
  aria_LABEL,
  onClick = () => alert("No function provided"),
}) {
  return (
    <Button
      className={css["btn-profile-name"]}
      onPress={onClick}
      aria-label={aria_LABEL}
      data-testid="btn-profile-name"
    >
      <h4>{name ?? "Profile name"}</h4>
    </Button>
  );
}
export function Btn_profilePreviewIcons({
  icons,
  onClick = () => alert("No function provided"),
  visibleIcon_COUNT = 1,
  IS_open,
  activeDigit,
  aria_LABEL,
}) {
  const [dance, setDance] = useState(false);

  const handleDance = () => {
    if (dance) return;
    setDance(true);

    setTimeout(() => {
      setDance(false);
    }, 1000);
  };

  const displayedIcons = icons ? icons.slice(0, visibleIcon_COUNT) : [];
  const remainingTagsCount =
    displayedIcons.length > 0 ? Math.max(0, icons.length - visibleIcon_COUNT) : 0;

  return (
    <Button
      className={css["btn-show-icons"]}
      data-open={IS_open}
      onClick={() => {
        onClick();
        handleDance();
      }}
      data-dance={dance}
      data-testid="btn-profile-preview-icons"
      aria-label={aria_LABEL}
    >
      {activeDigit}
      {icons &&
        displayedIcons.map((icon) => (
          <img
            key={icon}
            src={icon}
            alt=""
            className={css.icon}
            data-testid="tag-preview-btn-icon"
          />
        ))}
      {!icons && <p data-testid="no-tags">No tags</p>}
      {remainingTagsCount > 0 && visibleIcon_COUNT && (
        <>
          {remainingTagsCount === 1 ? (
            icons && (
              <img
                src={icons[visibleIcon_COUNT]}
                alt=""
                className={css.icon}
                data-testid="tag-preview-btn-icon"
              />
            )
          ) : (
            <p data-testid="hidden-icon-count">+{remainingTagsCount}</p>
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
};

Btn_profileSearch.propTypes = {
  name: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  aria_LABEL: PropTypes.string.isRequired,
};

Btn_profileName.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  aria_LABEL: PropTypes.string.isRequired,
};

Btn_profilePreviewIcons.propTypes = {
  icons: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  visibleIcon_COUNT: PropTypes.number.isRequired,
  IS_open: PropTypes.bool.isRequired,
  activeDigit: PropTypes.element.isRequired,
  aria_LABEL: PropTypes.string.isRequired,
};
