//
//

import css from "../../Blocks.module.css";
import { Btn } from "../../../../Btn/Btn";
import { ICON_arrow } from "../../../../icons/icons";

export function TagGroupBtns_BLOCK({
  tagGroups,
  tagUsages,
  SET_currentMenu,
  SET_currentTagGroupID,
  SET_currentTagGroupName,
  width = 901,
}) {
  return (
    <div className={css.Block}>
      <p>Tag groups</p>
      {tagGroups.map((tagGroup) => {
        // if there isnt a single tagUsage with this tagGroup_ID, dont render the button
        if (!tagUsages.some((tagUsage) => tagUsage.tagGroup_ID === tagGroup._id)) return;

        return (
          <li key={tagGroup._id}>
            <Btn
              key={tagGroup._id}
              styles={[`${width > 900 ? "btn-40" : "btn-44"}`, "fullWidth"]}
              left_ICON={<img src={tagGroup.icon?.url ? tagGroup.icon?.url : ""} />}
              right_ICON={<ICON_arrow color="dark" direction="right" />}
              text={tagGroup?.name?.en}
              onClick={() => {
                SET_currentMenu("tag-group");
                SET_currentTagGroupID(tagGroup._id);
                SET_currentTagGroupName(tagGroup?.name?.en);
              }}
            />
          </li>
        );
      })}
    </div>
  );
}
