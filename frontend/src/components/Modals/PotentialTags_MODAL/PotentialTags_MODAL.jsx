//
//

import React, { useEffect, useState } from "react";
import { Btn } from "../../Btn/Btn";
import css from "./PotentialTags_MODAL.module.css";
import { ICON_dropDownArrow, ICON_x } from "../../icons/icons";
import { USE_showBrowserToolbar } from "../../../hooks/USE_showBrowserToolbar";
import { Tag_LABEL } from "../../labels/labels";

export function PotentialTags_NAV({
  potentialTag_IDs,
  SET_potentialTagIDs,
  all_TAGS,
  UPDATE_tags,
  activeTag_IDs,
}) {
  const [IS_potentialTagNavExpanded, SET_potentialTagNavExpanded] = useState(false);
  const potentialStayTag_IDs = Array.from(activeTag_IDs).filter(
    (tag_ID) => !potentialTag_IDs.toDelete_IDs.has(tag_ID)
  );

  const HAS_potentialTags =
    potentialTag_IDs.toAdd_IDs.size > 0 || potentialTag_IDs.toDelete_IDs.size > 0;
  const HAS_potentialAddTags = potentialTag_IDs.toAdd_IDs.size > 0;
  const HAS_potentialDeleteTags = potentialTag_IDs.toDelete_IDs.size > 0;

  useEffect(() => {
    if (IS_potentialTagNavExpanded) {
      document.body.style.overflow = "hidden";
      USE_showBrowserToolbar();
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [IS_potentialTagNavExpanded]);

  function GET_potentialAddTags() {
    return all_TAGS.filter((tag) => potentialTag_IDs.toAdd_IDs.has(tag._id));
  }
  function GET_potentialDeleteTags() {
    return all_TAGS.filter((tag) => potentialTag_IDs.toDelete_IDs.has(tag._id));
  }
  function GET_potentialStayTags() {
    return all_TAGS.filter((tag) => potentialStayTag_IDs.includes(tag._id));
  }

  return (
    <div className={css.potentialTag_NAV} data-open={IS_potentialTagNavExpanded}>
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
            {GET_potentialAddTags()?.map((tag) => (
              <Tag_LABEL
                key={tag._id}
                name={tag.name.en}
                color="green"
                icon={<ICON_x color="green" small={true} rotate={true} />}
              />
            ))}

            {GET_potentialDeleteTags()?.map((tag) => (
              <Tag_LABEL
                key={tag._id}
                name={tag.name.en}
                color="red"
                icon={<ICON_x color="red" small={true} rotate={true} oneLine={true} />}
              />
            ))}
            {GET_potentialStayTags()?.map((tag) => (
              <Tag_LABEL key={tag._id} name={tag.name.en} color="brand" />
            ))}
          </div>
        )}

        {HAS_potentialAddTags && IS_potentialTagNavExpanded && (
          <div className={css.block}>
            <p>Add {potentialTag_IDs?.toAdd_IDs?.size || "NUM"} tags</p>
            {GET_potentialAddTags()?.map((tag) => {
              return (
                <Btn
                  key={tag._id}
                  styles={["btn-40", "strech", "green", "text-left-auto"]}
                  left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
                  right_ICON={<ICON_x color="green" small={true} />}
                  text={tag?.name?.en}
                  onClick={() =>
                    SET_potentialTagIDs((prev) => {
                      const updated = { ...prev };
                      updated.toAdd_IDs.delete(tag._id);
                      return updated;
                    })
                  }
                />
              );
            })}
          </div>
        )}
        {HAS_potentialDeleteTags && IS_potentialTagNavExpanded && (
          <div className={css.block}>
            <p>Delete {potentialTag_IDs?.toDelete_IDs?.size || "NUM"} tags</p>
            {GET_potentialDeleteTags()?.map((tag) => {
              return (
                <Btn
                  key={tag._id}
                  styles={["btn-40", "strech", "red", "text-left-auto"]}
                  left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
                  right_ICON={<ICON_x color="red" small={true} />}
                  text={tag?.name?.en}
                  onClick={() =>
                    SET_potentialTagIDs((prev) => {
                      const updated = { ...prev };
                      updated.toDelete_IDs.delete(tag._id);
                      return updated;
                    })
                  }
                />
              );
            })}
          </div>
        )}
        {potentialStayTag_IDs.length > 0 && IS_potentialTagNavExpanded && (
          <div className={css.block}>
            <p>Keep {potentialStayTag_IDs?.length || "NUM"} tags</p>
            {GET_potentialStayTags()?.map((tag) => {
              return (
                <Btn
                  key={tag._id}
                  styles={["btn-40", "strech", "active", "text-left-auto"]}
                  left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
                  right_ICON={<ICON_x color="brand" small={true} />}
                  text={tag?.name?.en}
                  onClick={() =>
                    SET_potentialTagIDs((prev) => {
                      const updated = { ...prev };
                      updated.toDelete_IDs.add(tag._id);
                      return updated;
                    })
                  }
                />
              );
            })}
          </div>
        )}

        {IS_potentialTagNavExpanded && (
          <div className={css.applyBtn_WRAP}>
            <Btn
              right_ICON={<ICON_x small={true} />}
              styles={["btn-40", "strech", "text-left-auto", "red-x-on-hover"]}
              text="Clear all tags"
              onClick={() => {
                UPDATE_tags(null, "deleteAll");
                SET_potentialTagIDs({ toAdd_IDs: new Set(), toDelete_IDs: new Set() });
              }}
            />
          </div>
        )}

        <div className={css.btn_WRAP}>
          <Btn
            styles={["btn-40", "left-align", `${IS_potentialTagNavExpanded ? "grey" : ""}`]}
            text="Cancel"
            onClick={() => SET_potentialTagIDs({ toAdd_IDs: new Set(), toDelete_IDs: new Set() })}
          />

          <Btn
            styles={["btn-40", "strech", "brand", "brand-background-colors"]}
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
