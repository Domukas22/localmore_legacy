//
//

import React, { useEffect, useState } from "react";
import { Btn } from "../../../../components/btn/btn";
import css from "./PotentialTags_NAV.module.css";
import { ICON_dropDownArrow, ICON_x } from "../../../../components/icons/icons";

export function PotentialTags_NAV({
  potential_TAGS,
  SET_potentialTags,
  all_TAGS,
  UPDATE_tags,
  active_TAGS,
}) {
  const [IS_potentialTagNavExpanded, SET_potentialTagNavExpanded] = useState(false);
  const potentialStayTag_IDs = Array.from(active_TAGS).filter(
    (tag_ID) => !potential_TAGS.toDelete_IDs.has(tag_ID)
  );

  const HAS_potentialTags =
    potential_TAGS.toAdd_IDs.size > 0 || potential_TAGS.toDelete_IDs.size > 0;
  const HAS_potentialAddTags = potential_TAGS.toAdd_IDs.size > 0;
  const HAS_potentialDeleteTags = potential_TAGS.toDelete_IDs.size > 0;

  useEffect(() => {
    if (IS_potentialTagNavExpanded) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [IS_potentialTagNavExpanded]);

  function GET_potentialAddTags() {
    return all_TAGS.filter((tag) => potential_TAGS.toAdd_IDs.has(tag._id));
  }
  function GET_potentialDeleteTags() {
    return all_TAGS.filter((tag) => potential_TAGS.toDelete_IDs.has(tag._id));
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
          styles={["btn-40", "grey", "dropdown", "round"]}
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
              <Potential_TAG key={tag._id} type="add" name={tag.name.en} />
            ))}

            {GET_potentialDeleteTags()?.map((tag) => (
              <Potential_TAG key={tag._id} type="delete" name={tag.name.en} />
            ))}
            {GET_potentialStayTags()?.map((tag) => (
              <Potential_TAG key={tag._id} type="keep" name={tag.name.en} />
            ))}
          </div>
        )}

        {HAS_potentialAddTags && IS_potentialTagNavExpanded && (
          <div className={css.block}>
            <p>Add {potential_TAGS?.toAdd_IDs?.size || "NUM"} tags</p>
            {GET_potentialAddTags()?.map((tag) => {
              return (
                <Btn
                  key={tag._id}
                  styles={["btn-40", "strech", "green", "text-left-auto"]}
                  left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
                  right_ICON={<ICON_x color="green" small={true} />}
                  text={tag?.name?.en}
                  onClick={() =>
                    SET_potentialTags((prev) => {
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
            <p>Delete {potential_TAGS?.toDelete_IDs?.size || "NUM"} tags</p>
            {GET_potentialDeleteTags()?.map((tag) => {
              return (
                <Btn
                  key={tag._id}
                  styles={["btn-40", "strech", "red", "text-left-auto"]}
                  left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
                  right_ICON={<ICON_x color="red" small={true} />}
                  text={tag?.name?.en}
                  onClick={() =>
                    SET_potentialTags((prev) => {
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
                    SET_potentialTags((prev) => {
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

        <div className={css.btn_WRAP}>
          <Btn
            styles={["btn-40", "left-align", `${IS_potentialTagNavExpanded ? "grey" : ""}`]}
            text="Cancel"
            onClick={() => SET_potentialTags({ toAdd_IDs: new Set(), toDelete_IDs: new Set() })}
          />

          <Btn
            styles={["btn-40", "strech", "brand", "brand-background-colors"]}
            text="Apply"
            onClick={() => {
              potential_TAGS.toAdd_IDs.forEach((tag_ID) =>
                UPDATE_tags(
                  all_TAGS.find((tag) => tag._id === tag_ID),
                  "add"
                )
              );
              potential_TAGS.toDelete_IDs.forEach((tag_ID) =>
                UPDATE_tags(
                  all_TAGS.find((tag) => tag._id === tag_ID),
                  "remove"
                )
              );

              SET_potentialTags({ toAdd_IDs: new Set(), toDelete_IDs: new Set() });
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Potential_TAG({ type, name }) {
  switch (type) {
    case "add":
      return (
        <div className={css.label} data-color="green">
          <ICON_x color="green" small={true} rotate={true} />
          <p>{name}</p>
        </div>
      );
    case "delete":
      return (
        <div className={css.label} data-color="red">
          <ICON_x color="red" small={true} rotate={true} oneLine={true} />
          <p>{name}</p>
        </div>
      );
    case "keep":
      return (
        <div className={css.label} data-color="brand">
          <p>{name}</p>
        </div>
      );
  }
}
