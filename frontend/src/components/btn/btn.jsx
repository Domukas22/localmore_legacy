//

import css from "./btn.module.css";

export function Btn({ styles, text, left_ICON, right_ICON, onClick }) {
  console.log("btna");
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
