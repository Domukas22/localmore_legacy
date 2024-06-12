//
//

import css from "../../Blocks.module.css";
import { Btn } from "../../../../Btn/Btn";
import { ICON_activeDigit, ICON_arrow } from "../../../../icons/icons";

export function ActiveTagsBtn_BLOCK({ activeTag_IDs, SET_currentMenu }) {
  return (
    <div className={css.Block}>
      <li>
        <Btn
          styles={["btn-40", "fullWidth"]}
          left_ICON={
            <ICON_activeDigit
              count={activeTag_IDs?.size || 0}
              IS_active={activeTag_IDs?.size > 0 || false}
              inverse={true}
            />
          }
          right_ICON={<ICON_arrow color="dark" direction="right" />}
          text="Active tags"
          onClick={() => SET_currentMenu("active-tags")}
        />
      </li>
    </div>
  );
}
