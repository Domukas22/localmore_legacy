//

import css from "./btn.module.css";

export function Btn({ styles, text, left_ICON, right_ICON, onClick }) {
  return (
    <button
      className={styles ? styles.map((style) => css[style]).join(" ") : css.btn}
      data-testid="btn"
      onClick={onClick}
    >
      {left_ICON && <img src={left_ICON} alt="" className={css.icon} />}
      {text && <p className={css.text}>{text}</p>}
      {right_ICON && (
        <img src={right_ICON} alt="" className={css.icon} style={{ height: "18px" }} />
      )}
    </button>
  );
}

export function Btn_text({ name, subname }) {
  return (
    <button className={css["btn-text-onImg"]} data-testid="btn">
      <h4 className="name">{name}</h4>
      <p className="subname">{subname}</p>
    </button>
  );
}

export function Btn_showIcons({ icons, profile_ID, onClick }) {
  const MAX_TAGS_DISPLAYED = 3;

  let displayedIcons = icons.slice(0, MAX_TAGS_DISPLAYED);
  let remainingTagsCount = icons.length - MAX_TAGS_DISPLAYED;

  return (
    <button className={css["btn-show-icons"]} data-testid="btn" onClick={onClick}>
      {displayedIcons.map((icon) => {
        return <img key={icon + "-" + profile_ID} src={icon} alt="" className={css.icon} />;
      })}
      {remainingTagsCount > 0 && ` +${remainingTagsCount}`}
    </button>
  );
}
