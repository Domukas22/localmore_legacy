//

import css from "./btn.module.css";

export function Btn({ styles, text, leftIcon_URL, rightIcon_URL, onClick, left_ICON, right_ICON }) {
  return (
    <button
      className={styles ? styles.map((style) => css[style]).join(" ") : css.btn}
      data-testid="btn"
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

export function Btn_profilePreview({ name, subname, search }) {
  return (
    <button
      className={css["btn-profile-preview"]}
      data-searchActive={search !== undefined}
      data-testid="btn"
    >
      <h4 className="name">{name}</h4>
      {subname && <p className="subname">{subname}</p>}
      {search && (
        <p>
          This is a text with <span className={css.highlight}>very</span> prett search results.
        </p>
      )}
    </button>
  );
}
export function Btn_profilePreviewIcons({ icons, onClick, iconCount, IS_open, activeDigit }) {
  let displayedIcons = icons.slice(0, iconCount);
  let remainingTagsCount = icons.length - iconCount;

  return (
    <button className={css["btn-show-icons"]} data-active={IS_open} onClick={() => onClick()}>
      {activeDigit}
      {displayedIcons.map((icon) => {
        return <img key={icon} src={icon} alt="" className={css.icon} />;
      })}
      {remainingTagsCount > 0 && ` +${remainingTagsCount}`}
    </button>
  );
}
