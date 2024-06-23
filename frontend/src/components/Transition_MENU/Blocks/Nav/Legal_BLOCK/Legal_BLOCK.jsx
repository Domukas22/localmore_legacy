//
//

import css from "../../Blocks.module.css";
import { Link_BTN } from "../../../../Btn/Link_BTN/Link_BTN";

export function Legal_BLOCK() {
  return (
    <div className={css.Block}>
      <p>Legal</p>
      <li>
        <Link_BTN
          styles={["btn-40", "flex", "text-left-auto"]}
          text="Impressum"
          aria_LABEL=""
          left_ICON={
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-impressum-1-1181601.png?f=webp"
              style={{ opacity: "0.7" }}
            />
          }
          href="/impressum"
        />
      </li>
      <li>
        <Link_BTN
          styles={["btn-40", "flex", "text-left-auto"]}
          text="Datenschutz"
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/2592/2592317.png"></img>}
          href="/privacy"
        />
      </li>
      <li>
        <Link_BTN
          styles={["btn-40", "flex", "text-left-auto"]}
          text="Einwillingung" // Einwilligungseinstellungen
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/4315/4315445.png"></img>}
          href="/einwilligung"
        />
      </li>
      <li>
        <Link_BTN
          styles={["btn-40", "flex", "text-left-auto"]}
          text="Attributions"
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/2448/2448648.png"></img>}
          href="/attributions"
        />
      </li>
    </div>
  );
}
