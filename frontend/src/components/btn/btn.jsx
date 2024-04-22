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
export function Btn_searchResults({ name }) {
  return (
    <button className={css["btn-text-searchResults"]} data-testid="btn">
      <h4 className="name">{name}</h4>
      <p>
        This is a text with <span className={css.highlight}>very</span> prett search results.
      </p>
    </button>
  );
}

export function Btn_showIcons({ icons, profile_ID, onClick, iconCount }) {
  let displayedIcons = icons.slice(0, iconCount);
  let remainingTagsCount = icons.length - iconCount;

  return (
    <button className={css["btn-show-icons"]} data-testid="btn" onClick={onClick}>
      {displayedIcons.map((icon) => {
        return <img key={icon + "-" + profile_ID} src={icon} alt="" className={css.icon} />;
      })}
      {remainingTagsCount > 0 && ` +${remainingTagsCount}`}
    </button>
  );
}
// export function Btn_arrow({ styles, text, left_ICON, right_ICON, onClick }) {
//   return (
//     <button
//       className={styles ? styles.map((style) => css[style]).join(" ") : css.btn}
//       data-testid="btn"
//       onClick={onClick}
//     >
//       {left_ICON && <img src={left_ICON} alt="" className={css.icon} />}
//       {text && <p className={css.text}>{text}</p>}
//       {right_ICON && (
//         <img src={right_ICON} alt="" className={css.icon} style={{ height: "18px" }} />
//       )}
//     </button>
//   );
// }
