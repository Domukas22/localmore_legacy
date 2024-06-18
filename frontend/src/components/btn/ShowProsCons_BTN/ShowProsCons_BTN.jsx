//
//

import { Button } from "react-aria-components";
import { ICON_proCon } from "../../icons/icons";
import css from "../Btn.module.css";

export function ShowProsCons_BTN({
  onClick = () => alert("No function provided"),
  pros_COUNT,
  cons_COUNT,
  prosConsBtn_REF,
}) {
  return (
    <Button
      className={["btn-36", "onBlur", "prosCons"].map((style) => css[style]).join(" ")}
      onPress={() => {
        onClick();
        document.dispatchEvent(new Event("click")); // for the dropdowns
      }}
      ref={prosConsBtn_REF}
    >
      {pros_COUNT > 0 && (
        <div className={css.wrap}>
          <ICON_proCon />
          <p>{pros_COUNT}</p>
        </div>
      )}
      {cons_COUNT > 0 && (
        <div className={css.wrap}>
          <ICON_proCon IS_pro={false} />
          <p>{cons_COUNT}</p>
        </div>
      )}
    </Button>
  );
}
