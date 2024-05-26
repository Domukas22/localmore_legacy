//
//
import { Btn } from "../../../btn/btn";
import css from "../../Nav.module.css";
import { ICON_x } from "../../../icons/icons";
import { useContext } from "react";
import { SavedProfileIDs_CONTEXT } from "../../../../contexts/savedProfiles";
import { SavedProfile_LINK } from "../../../btn/btn";

export function Saved_BLOCK({ savedProfile_OBJs, REMOVE_fromSaved, resize }) {
  return (
    <div className={css.block_WRAP} data-custom="saved">
      {savedProfile_OBJs.length > 0 && <p>{savedProfile_OBJs.length} liked profiles</p>}

      {savedProfile_OBJs &&
        savedProfile_OBJs.length > 0 &&
        savedProfile_OBJs.map((profile) => {
          return (
            <li className={css.savedBtn_LI} key={`Saved-${profile._id}`}>
              <SavedProfile_LINK
                name={profile.name.en}
                subname={profile.subname.en}
                image_URL={profile?.img?.desktop?.[0] + "/Big"}
                aria_LABEL=""
                remove={() => {
                  REMOVE_fromSaved(profile._id);
                  resize();
                }}
              />
            </li>
          );
        })}

      {savedProfile_OBJs.length === 0 && (
        <div className={css.noSavedItems_BOX}>
          <p>No saved profiles</p>
        </div>
      )}
    </div>
  );
}
