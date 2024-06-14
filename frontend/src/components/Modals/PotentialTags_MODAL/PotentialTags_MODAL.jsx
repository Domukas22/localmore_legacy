//
//

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Btn } from "../../Btn/Btn";
import css from "./PotentialTags_MODAL.module.css";
import { ICON_arrow, ICON_dropDownArrow, ICON_x } from "../../icons/icons";
import { USE_showBrowserToolbar } from "../../../hooks/USE_showBrowserToolbar";
import { PotentialTag_LABEL } from "../../labels/labels";
import { USE_getPotentialTags } from "./hooks/USE_getPotentialTags";
import { PotentialTags_BLOCK } from "../../Transition_MENU/Blocks/Tags/PotentialTags_BLOCK/PotentialTags_BLOCK";
import { AnimatePresence, motion } from "framer-motion";
import { USE_isBrowserToolbarClosed } from "../../../hooks/USE_isBrowserToolbarOpen";

export function PotentialTags_MODAL({
  potentialTag_IDs,
  SET_potentialTagIDs,
  all_TAGS,
  UPDATE_tags,
  activeTag_IDs,
}) {
  const [IS_potentialTagNavExpanded, SET_potentialTagNavExpanded] = useState(false);

  const top_REF = useRef(null);
  const miniTags_REF = useRef(null);
  const potentialTags_REF = useRef(null);
  const btnWrap_REF = useRef(null);

  const [modal_HEIGHT, SET_modal_HEIGHT] = useState("auto");

  const [midlleMinHeight, SET_middleMinHeight] = useState(null);

  useEffect(() => {
    if (!midlleMinHeight && miniTags_REF.current) {
      SET_middleMinHeight(miniTags_REF.current.offsetHeight);
    }
  }, [IS_potentialTagNavExpanded]);

  useEffect(() => {
    if (!IS_potentialTagNavExpanded) {
      SET_modal_HEIGHT(() => {
        return (
          top_REF.current?.offsetHeight +
          miniTags_REF?.current.offsetHeight +
          btnWrap_REF?.current.offsetHeight +
          "px"
        );
      });
      console.log(modal_HEIGHT);
      return;
    }

    SET_modal_HEIGHT(() => "100dvh");

    console.log("100dvh");
  }, [IS_potentialTagNavExpanded]);

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

  const IS_mobibeBrowserToolbarClosed = USE_isBrowserToolbarClosed();

  return (
    <div
      className={css.PotentialTags_MODAL}
      data-open={IS_potentialTagNavExpanded}
      style={{ height: modal_HEIGHT }}
    >
      <div className={css.top} ref={top_REF}>
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
      <div
        className={css.middle}
        data-open={IS_potentialTagNavExpanded}
        style={{ minHeight: midlleMinHeight }}
      >
        {!IS_potentialTagNavExpanded && (
          <motion.div
            className={css.tagLabel_WRAP}
            onClick={() => SET_potentialTagNavExpanded(true)}
            ref={miniTags_REF}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        )}
        {IS_potentialTagNavExpanded && (
          <motion.div
            className={css.tags_WRAP}
            ref={potentialTags_REF}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PotentialTags_WRAP
              potentialAdd_TAGS={potentialAdd_TAGS}
              potentialDelete_TAGS={potentialDelete_TAGS}
              potentialStay_TAGS={potentialStay_TAGS}
              SET_potentialTagIDs={SET_potentialTagIDs}
            />
            <div className={css.applyBtn_WRAP}>
              <Btn
                right_ICON={<ICON_x small={true} />}
                styles={["btn-40", "fullWidth", "text-left-auto", "red-x-on-hover"]}
                text="Cancel tag changes"
                onClick={() =>
                  SET_potentialTagIDs({ toAdd_IDs: new Set(), toDelete_IDs: new Set() })
                }
              />
            </div>
          </motion.div>
        )}
      </div>
      <div
        className={css.btn_WRAP}
        ref={btnWrap_REF}
        data-browser-tab-padding-bottom={
          IS_mobibeBrowserToolbarClosed && IS_potentialTagNavExpanded
        }
      >
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
