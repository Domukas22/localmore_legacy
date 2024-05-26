//
//
import { Btn } from "../../../btn/btn";
import css from "../../Nav.module.css";
import { ICON_x } from "../../../icons/icons";
import { useContext } from "react";
import { SavedProfileIDs_CONTEXT } from "../../../../contexts/savedProfiles";
import { SavedProfile_BTN } from "../../../btn/btn";

export function Saved_BLOCK({ savedProfile_OBJs, REMOVE_fromSaved }) {
  return (
    <div className={css.block_WRAP}>
      <p>{savedProfile_OBJs.length} liked profiles</p>

      {savedProfile_OBJs &&
        savedProfile_OBJs.length > 0 &&
        savedProfile_OBJs.map((profile) => {
          return (
            <li className={css.savedBtn_LI} key={`Saved-${profile._id}`}>
              <SavedProfile_BTN
                name={profile.name.en}
                subname={profile.subname.en}
                image_URL={profile?.img?.desktop?.[0] + "/Big"}
                aria_LABEL=""
                onClick={() => {}}
              />
              <Btn
                styles={["btn-44", "navDD_BTN"]}
                aria_LABEL=""
                left_ICON={<ICON_x color={"dark"} />}
                onClick={() => REMOVE_fromSaved(profile._id)}
                FIRE_clickEvent={false}
                custom_DATA="remove"
              />
            </li>
          );
        })}
    </div>
  );
}
