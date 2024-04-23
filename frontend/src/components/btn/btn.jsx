//

import { useState } from "react";
import css from "./btn.module.css";

export function Btn({
  styles,
  text,
  leftIcon_URL,
  rightIcon_URL,
  onClick,
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
      {leftIcon_URL && <img src={leftIcon_URL} alt="" className={css.icon} />}
      {left_ICON && left_ICON}
      {text && <p className={css.text}>{text}</p>}
      {rightIcon_URL && (
        <img src={rightIcon_URL} alt="" className={css.icon} style={{ height: "18px" }} />
      )}
      {right_ICON && right_ICON}
    </button>
  );
}

export function Btn_profileSearch({ name, search }) {
  return (
    <button className={css["btn-profile-search"]} data-search={search !== ""} data-testid="btn">
      <h4>{name}</h4>
      <p>
        This is a text with <span className={css.highlight}>very</span> prett search results. There
        is a lot more where that came from.
      </p>
    </button>
  );
}
export function Btn_profileName({ name }) {
  return (
    <button className={css["btn-profile-name"]}>
      <h4>{name}</h4>
    </button>
  );
}
export function Btn_profilePreviewIcons({
  icons,
  onClick,
  iconCount,
  IS_open,
  activeDigit,
  dampen,
}) {
  let displayedIcons = icons.slice(0, iconCount);
  let remainingTagsCount = icons.length - iconCount;

  // const [dance, SET_dance] = useState(false);
  const [ALLOW_iconDance, SET_iconDance] = useState(false);

  const HANLDE_dance = () => {
    if (ALLOW_iconDance) return;
    SET_iconDance(true);

    setTimeout(() => {
      SET_iconDance(false);
    }, 1000);
  };

  return (
    <button
      className={["btn-show-icons", `${dampen ? "dampen" : ""}`]
        .map((style) => css[style])
        .join(" ")}
      // className={styles ? styles : css.btn}
      data-active={IS_open}
      onClick={() => {
        onClick();
        HANLDE_dance();
      }}
      data-dance={ALLOW_iconDance}
    >
      {activeDigit}
      {displayedIcons.map((icon) => {
        return <img key={icon} src={icon} alt="" className={css.icon} />;
      })}
      {remainingTagsCount > 1 ? (
        <p>+{remainingTagsCount}</p>
      ) : (
        remainingTagsCount === 1 && <img src={icons[iconCount]} alt="" className={css.icon} />
      )}
    </button>
  );
}
