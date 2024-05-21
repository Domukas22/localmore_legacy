//
//

import DD from "../../dd/dd";
import settings_ICON from "../../../assets/icons/settings.png";
import { Settings_BLOCKS } from "./Transition_BLOCKS/Settings_BLOCKS";

export function Settings_DD({ lang, TOGGLE_lang }) {
  return (
    <DD align="right" width={280} btnLeft_ICON={<img src={settings_ICON} />}>
      <ul>
        <Settings_BLOCKS lang={lang} TOGGLE_lang={TOGGLE_lang} />
      </ul>
    </DD>
  );
}
