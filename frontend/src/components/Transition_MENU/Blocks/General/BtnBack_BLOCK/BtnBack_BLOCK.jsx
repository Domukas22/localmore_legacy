//
//

import css from "../../Blocks.module.css";
import { Btn } from "../../../../Btn/Btn";
import { ICON_arrow } from "../../../../icons/icons";

export function BtnBack_BLOCK({ title, onClick, aria_LABEL }) {
  return (
    <div className={css.Block}>
      <li>
        <Btn
          styles={["btn-44", "flex", "text-left-auto", "fullWidth", "text-left-auto"]}
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
