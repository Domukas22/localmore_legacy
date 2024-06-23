//
//
import css from "../Btn.module.css";
import { Link } from "react-aria-components";

export function Link_BTN({
  styles,
  text,
  left_ICON,
  right_ICON,
  test_ID,
  aria_LABEL,
  href = null,
}) {
  return (
    <Link
      className={styles ? styles.map((style) => css[style]).join(" ") : css["btn-36"]}
      href={href}
      aria-label={aria_LABEL}
      data-testid={test_ID}
    >
      {left_ICON && left_ICON}
      {text && <p className={css.text}>{text}</p>}
      {right_ICON && right_ICON}
    </Link>
  );
}
