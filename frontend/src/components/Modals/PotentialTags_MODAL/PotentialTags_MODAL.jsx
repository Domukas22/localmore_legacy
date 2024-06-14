//
//

import React, { useEffect, useMemo, useState } from "react";
import { Btn } from "../../Btn/Btn";
import css from "./PotentialTags_MODAL.module.css";
import { ICON_arrow, ICON_dropDownArrow, ICON_x } from "../../icons/icons";
import { USE_showBrowserToolbar } from "../../../hooks/USE_showBrowserToolbar";
import { PotentialTag_LABEL } from "../../labels/labels";
import { USE_getPotentialTags } from "./hooks/USE_getPotentialTags";
import { PotentialTags_BLOCK } from "../../Transition_MENU/Blocks/Tags/PotentialTags_BLOCK/PotentialTags_BLOCK";

export function PotentialTags_MODAL({
  potentialTag_IDs,
  SET_potentialTagIDs,
  all_TAGS,
  UPDATE_tags,
  activeTag_IDs,
}) {
  const [IS_potentialTagNavExpanded, SET_potentialTagNavExpanded] = useState(false);

  useEffect(() => {
    if (IS_potentialTagNavExpanded) {
      document.body.style.overflow = "hidden";
      USE_showBrowserToolbar();
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [IS_potentialTagNavExpanded]);

  const { potentialAdd_TAGS, potentialDelete_TAGS, potentialStay_TAGS } = USE_getPotentialTags({
    all_TAGS,
    potentialTag_IDs,
    activeTag_IDs,
  });

  return (
    <div className={css.PotentialTags_MODAL} data-open={IS_potentialTagNavExpanded}>
      <div className={css.top}>
        <div className={css.text_WRAP}>
          <h3>Tag changes</h3>
          {/* <p>Confirm 3 tag changes</p> */}
        </div>
        <Btn
          styles={[
            "btn-40",
            "grey",
            "dropdown",
            "round",
            `${IS_potentialTagNavExpanded ? "red-x-on-hover" : ""}`,
          ]}
          onClick={() => SET_potentialTagNavExpanded((prev) => !prev)}
          text={IS_potentialTagNavExpanded ? "Less" : "More"}
          right_ICON={IS_potentialTagNavExpanded ? <ICON_x /> : <ICON_dropDownArrow />}
          test_ID="save-btn"
          expanded={IS_potentialTagNavExpanded}
        />
      </div>
      <div className={css.bottom}>
        {!IS_potentialTagNavExpanded && (
          <div className={css.tagLabel_WRAP} onClick={() => SET_potentialTagNavExpanded(true)}>
            {potentialAdd_TAGS?.map((tag) => (
              <PotentialTag_LABEL
                key={tag._id}
                name={tag.name.en}
                color="green"
                icon={<ICON_x color="green" small={true} rotate={true} />}
              />
            ))}

            {potentialDelete_TAGS?.map((tag) => (
              <PotentialTag_LABEL
                key={tag._id}
                name={tag.name.en}
                color="red"
                icon={<ICON_x color="red" small={true} rotate={true} oneLine={true} />}
              />
            ))}
            {potentialStay_TAGS?.map((tag) => (
              <PotentialTag_LABEL key={tag._id} name={tag.name.en} color="brand" />
            ))}
          </div>
        )}
        {IS_potentialTagNavExpanded && (
          <PotentialTags_WRAP
            potentialAdd_TAGS={potentialAdd_TAGS}
            potentialDelete_TAGS={potentialDelete_TAGS}
            potentialStay_TAGS={potentialStay_TAGS}
            SET_potentialTagIDs={SET_potentialTagIDs}
          />
        )}

        {IS_potentialTagNavExpanded && (
          <div className={css.applyBtn_WRAP}>
            <Btn
              right_ICON={<ICON_x small={true} />}
              styles={["btn-40", "fullWidth", "text-left-auto", "red-x-on-hover"]}
              text="Cancel tag changes"
              onClick={() => SET_potentialTagIDs({ toAdd_IDs: new Set(), toDelete_IDs: new Set() })}
            />
          </div>
        )}

        <div className={css.btn_WRAP}>
          <Btn
            styles={["btn-40", "left-align", `${IS_potentialTagNavExpanded ? "grey" : ""}`]}
            left_ICON={<ICON_arrow direction={`${IS_potentialTagNavExpanded ? "up" : "down"}`} />}
            onClick={() => SET_potentialTagNavExpanded((prev) => !prev)}
          />
          <Btn
            styles={["btn-40", "left-align", `${IS_potentialTagNavExpanded ? "grey" : ""}`]}
            text="Cancel"
            onClick={() => SET_potentialTagIDs({ toAdd_IDs: new Set(), toDelete_IDs: new Set() })}
          />

          <Btn
            styles={["btn-40", "fullWidth", "brand", "brand-background-colors"]}
            text="Apply"
            onClick={() => {
              potentialTag_IDs.toAdd_IDs.forEach((tag_ID) =>
                UPDATE_tags(
                  all_TAGS.find((tag) => tag._id === tag_ID),
                  "add"
                )
              );
              potentialTag_IDs.toDelete_IDs.forEach((tag_ID) =>
                UPDATE_tags(
                  all_TAGS.find((tag) => tag._id === tag_ID),
                  "remove"
                )
              );

              SET_potentialTagIDs({ toAdd_IDs: new Set(), toDelete_IDs: new Set() });
            }}
          />
        </div>
      </div>
    </div>
  );
}

function PotentialTags_WRAP({
  potentialAdd_TAGS,
  potentialDelete_TAGS,
  potentialStay_TAGS,
  SET_potentialTagIDs,
}) {
  return (
    <>
      {potentialAdd_TAGS.length > 0 && (
        <PotentialTags_BLOCK
          type="add"
          tags={potentialAdd_TAGS}
          SET_potentialTagIDs={SET_potentialTagIDs}
        />
      )}
      {potentialDelete_TAGS.length > 0 && (
        <PotentialTags_BLOCK
          type="delete"
          tags={potentialDelete_TAGS}
          SET_potentialTagIDs={SET_potentialTagIDs}
        />
      )}
      {potentialStay_TAGS.length > 0 && (
        <PotentialTags_BLOCK
          type="keep"
          tags={potentialStay_TAGS}
          SET_potentialTagIDs={SET_potentialTagIDs}
        />
      )}
    </>
  );
}
