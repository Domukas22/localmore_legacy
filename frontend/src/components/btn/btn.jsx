//

import css from "./Btn.module.css";
import { Button } from "react-aria-components";

export function Btn({
  styles = ["btn-36"],
  text,
  onClick = () => alert("No function provided"),
  FIRE_clickEvent = true,
  left_ICON,
  right_ICON,
  test_ID,
  aria_LABEL,
  href = null,
  _ref = null,
  type = "button",
}) {
  return (
    <Button
      className={styles.map((style) => css[style]).join(" ")}
      onPress={(e) => {
        onClick(e);
        if (FIRE_clickEvent) document.dispatchEvent(new Event("click")); // for the dropdowns
      }}
      aria-label={aria_LABEL}
      data-testid={test_ID}
      ref={_ref}
      type={type}
    >
      {left_ICON && left_ICON}
      {text && <p className={css.text}>{text}</p>}
      {right_ICON && right_ICON}
    </Button>
  );
}
