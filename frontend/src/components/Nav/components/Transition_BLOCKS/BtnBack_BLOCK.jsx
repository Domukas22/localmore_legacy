//
//

import { ICON_arrow } from "../../../icons/icons";
import { Btn } from "../../../btn/btn";
import css from "../DD_content.module.css";

export function BtnBack_BLOCK({ title, onClick, aria_LABEL }) {
  return (
    <div className={css.block_WRAP}>
      <li key={""}>
        <Btn
          styles={["btn-44", "navDD_BTN"]}
          left_ICON={<ICON_arrow direction="left" />}
          text={title}
          aria_LABEL=""
          onClick={onClick}
          FIRE_clickEvent={false}
        />
      </li>
    </div>
  );
}
