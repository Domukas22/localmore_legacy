//
//

import css from "../../Blocks.module.css";
import { Btn } from "../../../../Btn/Btn";

export function Legal_BLOCK() {
  return (
    <div className={css.Block}>
      <p>Legal</p>
      <li>
        <Btn
          styles={["btn-40", "flex", "text-left-auto"]}
          text="Impressum"
          aria_LABEL=""
          left_ICON={
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-impressum-1-1181601.png?f=webp"
              style={{ opacity: "0.7" }}
            ></img>
          }
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
      <li>
        <Btn
          styles={["btn-40", "flex", "text-left-auto"]}
          text="Datenschutz"
          aria_LABEL=""
          onClick={() => {}}
          FIRE_clickEvent={false}
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/2592/2592317.png"></img>}
        />
      </li>
      <li>
        <Btn
          styles={["btn-40", "flex", "text-left-auto"]}
          text="Einwillingung" // Einwilligungseinstellungen
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/4315/4315445.png"></img>}
          aria_LABEL=""
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
      <li>
        <Btn
          styles={["btn-40", "flex", "text-left-auto"]}
          text="Attributions"
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/2448/2448648.png"></img>}
          aria_LABEL=""
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
    </div>
  );
}
