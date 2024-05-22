//
//

import { useContext } from "react";
import { SavedProfileIDs_CONTEXT } from "../../../../contexts/savedProfiles";
import { Btn } from "../../../btn/btn";
import DD from "../../../dd/dd";
import { ICON_save, ICON_x } from "../../../icons/icons";
import { Saved_BLOCK } from "../Transition_BLOCKS/Saved_BLOCK";

export function Saved_DD({ all_PROFILES }) {
  return (
    <DD align="right" width={400} btnLeft_ICON={<ICON_save />}>
      <Saved_BLOCK all_PROFILES={all_PROFILES} />
    </DD>
  );
}
