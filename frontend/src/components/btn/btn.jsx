//

import css from "./Btn.module.css";
import { Button } from "react-aria-components";

export function Btn({
  styles,
  text,
  onClick = () => alert("No function provided"),
  FIRE_clickEvent = true,
  left_ICON,
  right_ICON,
  test_ID,
  aria_LABEL,
}) {
  return (
    <Button
      className={styles ? styles.map((style) => css[style]).join(" ") : css["btn-36"]}
      onPress={() => {
        onClick();
        if (FIRE_clickEvent) document.dispatchEvent(new Event("click")); // for the dropdowns
      }}
      aria-label={aria_LABEL}
      data-testid={test_ID}
    >
      {left_ICON && left_ICON}
      {text && <p className={css.text}>{text}</p>}
      {right_ICON && right_ICON}
    </Button>
  );
}
