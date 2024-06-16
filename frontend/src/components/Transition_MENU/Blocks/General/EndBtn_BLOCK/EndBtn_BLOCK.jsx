//
//

import css from "../../Blocks.module.css";
import { Btn } from "../../../../Btn/Btn";
import { ICON_x } from "../../../../icons/icons";

export function EndBtn_BLOCK({ text, onClick, width = 100 }) {
  return (
    <div className={css.Block}>
      <li>
        <Btn
          styles={[
            `${width > 900 ? "btn-40" : "btn-44"}`,
            "flex",
            "text-left-auto",
            "fullWidth",
            "red-x-on-hover",
            "text-left-auto",
          ]}
          text={text}
          right_ICON={<ICON_x small={true} />}
          aria_LABEL=""
          onClick={onClick}
        />
      </li>
    </div>
  );
}
