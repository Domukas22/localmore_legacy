//
//

import { Btn } from "../../../../Btn/Btn";
import css from "../../Blocks.module.css";

export function ProfileMore_BLOCK() {
  return (
    <div className={css.Block}>
      <li>
        <Btn
          styles={["btn-44", "flex", "text-left-auto"]}
          text="Provide feedback"
          left_ICON={
            <img src="https://cdn-icons-png.freepik.com/512/4066/4066310.png?ga=GA1.1.807612306.1716024941" />
          }
          aria_LABEL=""
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
    </div>
  );
}
