//

import { useEffect, useRef, useState } from "react";
import { Btn } from "../btn/btn";
import {
  ICON_activeDigit,
  ICON_arrow,
  ICON_search,
  ICON_searchSmall,
  ICON_x,
} from "../icons/icons";
import SearchBar from "../search/Searchbar";
import css from "./Filterbox.module.css";
import { CssTransition_MENU } from "../Nav/components/Menus/CssTransition_MENU";
import { USE_windowSize } from "../../hooks/USE_windowWidth";

export function Filterbox({
  tags,
  tagUsages,
  tagGroups,
  all_TAGS,
  active_TAGS,
  UPDATE_tags,
  potential_TAGS,
  SET_potentialTags,
  SET_isOpen = () => {},
  starting_MENU,
}) {
  const scroll_REF = useRef(null);
  return (
    <TagFilters
      tagGroups={tagGroups}
      all_TAGS={all_TAGS}
      tagUsages={tagUsages}
      scroll_REF={scroll_REF}
      active_TAGS={active_TAGS}
      UPDATE_tags={UPDATE_tags}
      potential_TAGS={potential_TAGS}
      SET_potentialTags={SET_potentialTags}
      SET_isOpen={SET_isOpen}
      starting_MENU={starting_MENU}
    />
  );
}

function TagFilters({
  tagGroups,
  all_TAGS,
  tagUsages,
  scroll_REF,
  active_TAGS,
  UPDATE_tags,
  potential_TAGS,
  SET_potentialTags,
  SET_isOpen,
  starting_MENU,
}) {
  const [search, SET_search] = useState("");
  const mainSearch_REF = useRef(null);
  const [current_MENU, SET_currentMenu] = useState(starting_MENU || "all");
  const [currentTagGroup_ID, SET_currentTagGroupID] = useState(null);
  const [currentTagGroup_NAME, SET_currentTagGroupName] = useState(null);
  const { width } = USE_windowSize();

  // const scroll_REF = useRef(null);

  useEffect(() => {
    // scroll to top when menu changes
    if (scroll_REF.current) {
      console.log("scroll");
      scroll_REF.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [current_MENU, scroll_REF]);

  const HAS_potentialTags =
    potential_TAGS.toAdd_IDs.size > 0 || potential_TAGS.toDelete_IDs.size > 0;
  const HAS_potentialAddTags = potential_TAGS.toAdd_IDs.size > 0;
  const HAS_potentialDeleteTags = potential_TAGS.toDelete_IDs.size > 0;

  const potentialStayTag_IDs = Array.from(active_TAGS).filter(
    (tag_ID) => !potential_TAGS.toDelete_IDs.has(tag_ID)
  );

  const [jump, SET_jump] = useState(false);

  useEffect(() => {
    if (active_TAGS.size > 0) {
      SET_jump(true);
      const timeout = setTimeout(() => {
        SET_jump(false);
      }, 500); // Adjust the timeout delay as needed

      return () => clearTimeout(timeout);
    } else {
      SET_jump(false);
    }
  }, [active_TAGS]);

  const tag_COUNTS = tagUsages.reduce(
    (acc, tagUsage) => {
      if (acc[tagUsage.tag_ID] !== undefined) {
        acc[tagUsage.tag_ID] += tagUsage.count;
      }
      return acc;
    },
    all_TAGS.reduce((acc, tag) => {
      acc[tag._id] = 0;
      return acc;
    }, {})
  );

  // const sorted_TAGS = all_TAGS
  //   .slice() // Create a shallow copy of all_TAGS to avoid mutating the original array
  //   .sort((a, b) => (tag_COUNTS[b._id] || 0) - (tag_COUNTS[a._id] || 0));

  // do I need to sort tags? Does it relaly make it more interesting?
  const sorted_TAGS = [...all_TAGS];

  function GET_potentialAddTags() {
    return sorted_TAGS.filter((tag) => potential_TAGS.toAdd_IDs.has(tag._id));
  }
  function GET_potentialDeleteTags() {
    return sorted_TAGS.filter((tag) => potential_TAGS.toDelete_IDs.has(tag._id));
  }
  function GET_potentialStayTags() {
    return sorted_TAGS.filter((tag) => potentialStayTag_IDs.includes(tag._id));
  }

  return (
    <div className={css.filterbox} data-potential={HAS_potentialTags}>
      {!HAS_potentialTags && (
        <>
          <div className={css.top}>
            <div className={css.top_LEFT}>
              <h4>Tagbox</h4>
              {/* <p>{all_TAGS.length} tags total</p> */}
            </div>
            <Btn
              styles={["btn-40", "grey", "round"]}
              right_ICON={<ICON_searchSmall />}
              onClick={() => {}}
            />

            <Btn
              styles={[
                "btn-40",
                "grey",
                "round",
                `${current_MENU === "active-tags" ? "active" : ""}`,
              ]}
              left_ICON={
                <div
                  className={css.circleGrowFade}
                  data-animate={jump}
                  data-wider={active_TAGS.size >= 10}
                ></div>
              }
              right_ICON={
                <ICON_activeDigit
                  IS_active={active_TAGS.size > 0 || false}
                  count={active_TAGS?.size}
                  inverse={true}
                  jump={jump}
                />
              }
              onClick={() =>
                SET_currentMenu(current_MENU === "active-tags" ? "all" : "active-tags")
              }
            />
            {width < 1100 && (
              <Btn
                styles={["btn-40", "grey", "round"]}
                right_ICON={<ICON_x />}
                onClick={() => SET_isOpen(false)}
              />
            )}
          </div>
          <div className={css.menu_WRAP} ref={scroll_REF}>
            <Starter_MENU
              SET_currentMenu={SET_currentMenu}
              current_MENU={current_MENU}
              tagGroups={tagGroups}
              tagUsages={tagUsages}
              sorted_TAGS={sorted_TAGS}
              active_TAGS={active_TAGS}
              UPDATE_tags={UPDATE_tags}
              tag_COUNTS={tag_COUNTS}
              SET_currentTagGroupID={SET_currentTagGroupID}
              SET_currentTagGroupName={SET_currentTagGroupName}
              totalTag_COUNT={all_TAGS.length}
            />
            <ActiveTags_MENU
              current_MENU={current_MENU}
              SET_currentMenu={SET_currentMenu}
              UPDATE_tags={UPDATE_tags}
              active_TAGS={active_TAGS}
              sorted_TAGS={sorted_TAGS}
            />
            <TagGroup_MENU
              currentTagGroup_ID={currentTagGroup_ID}
              tagUsages={tagUsages}
              sorted_TAGS={sorted_TAGS}
              tag_COUNTS={tag_COUNTS}
              currentTagGroup_NAME={currentTagGroup_NAME}
              SET_currentMenu={SET_currentMenu}
              current_MENU={current_MENU}
              UPDATE_tags={UPDATE_tags}
              active_TAGS={active_TAGS}
            />
          </div>
          {width < 1100 && (
            <div className={css.mobileBtn_WRAP}>
              {active_TAGS.size > 0 && (
                <>
                  <Btn
                    styles={["btn-40", "grey"]}
                    // right_ICON={<ICON_x color="dark" small={true} />}
                    text="Clear all"
                    onClick={() => UPDATE_tags(null, "deleteAll")}
                  />
                  <Btn
                    styles={["btn-40", "brand", "strech"]}
                    text={`Apply ${active_TAGS.size} tags`}
                    onClick={() => SET_isOpen(false)}
                  />
                </>
              )}
              {active_TAGS.size === 0 && (
                <Btn
                  styles={["btn-40", "grey", "strech", "text-left-auto"]}
                  text="Close Tagbox"
                  right_ICON={<ICON_x color="dark" small={true} />}
                  onClick={() => SET_isOpen(false)}
                />
              )}
            </div>
          )}
        </>
      )}
      {HAS_potentialTags && (
        <>
          <div className={css.top}>
            <h4>Confirm tag selection</h4>
          </div>
          <div className={css.block_WRAP}>
            {HAS_potentialAddTags && (
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
            {HAS_potentialDeleteTags && (
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
            {potentialStayTag_IDs.length > 0 && (
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

            <div className={css.block} style={{ flexDirection: "row", gap: "0.6rem" }}>
              <Btn
                styles={["btn-40", "left-align"]}
                // right_ICON={<ICON_x color="dark" small={true} />}
                text="Cancel"
                onClick={() => SET_potentialTags({ toAdd_IDs: new Set(), toDelete_IDs: new Set() })}
              />

              <Btn
                styles={["btn-40", "strech", "brand", "brand-background-colors"]}
                text={`Show ${3} places`}
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
                  SET_currentMenu("active-tags");
                  SET_potentialTags({ toAdd_IDs: new Set(), toDelete_IDs: new Set() });
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Starter_MENU({
  SET_currentMenu,
  current_MENU,
  tagGroups,
  tagUsages,
  sorted_TAGS,
  active_TAGS,
  UPDATE_tags,
  tag_COUNTS,
  SET_currentTagGroupID,
  SET_currentTagGroupName,
  totalTag_COUNT,
}) {
  return (
    <CssTransition_MENU current_MENU={current_MENU} classNames="menu-primary" menu_NAME="all">
      <div className={css.block_WRAP}>
        <div className={css.block}>
          <li>
            <Btn
              styles={["btn-40", "strech"]}
              left_ICON={
                <ICON_activeDigit
                  count={active_TAGS?.size || 0}
                  IS_active={active_TAGS?.size > 0 || false}
                  inverse={true}
                />
              }
              right_ICON={<ICON_arrow color="dark" direction="right" />}
              text="Active tags"
              onClick={() => SET_currentMenu("active-tags")}
            />
          </li>
        </div>
        <div className={css.block}>
          <p>Tag groups</p>
          {tagGroups.map((tagGroup) => {
            // if there isnt a single tagUsage with this tagGroup_ID, dont render the button
            if (!tagUsages.some((tagUsage) => tagUsage.tagGroup_ID === tagGroup._id)) return;

            return (
              <li key={tagGroup._id}>
                <Btn
                  key={tagGroup._id}
                  styles={["btn-40", "strech"]}
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
        <div className={css.block}>
          {/* <p>All tags</p> */}
          <p>Explore {totalTag_COUNT} tags</p>
          {sorted_TAGS?.map((tag) => {
            const IS_active = active_TAGS.has(tag._id);
            return (
              <li key={tag._id}>
                <Btn
                  key={tag._id}
                  styles={["btn-40", "strech", `${IS_active ? "active" : ""}`, "text-left-auto"]}
                  left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
                  right_ICON={
                    IS_active ? (
                      <ICON_x color="brand" small={true} />
                    ) : (
                      <span>{tag_COUNTS?.[tag._id]}</span>
                    )
                  }
                  text={tag?.name?.en}
                  onClick={() => UPDATE_tags(tag, IS_active ? "remove" : "add")}
                />
              </li>
            );
          })}
        </div>
      </div>
    </CssTransition_MENU>
  );
}
function ActiveTags_MENU({ current_MENU, SET_currentMenu, active_TAGS, UPDATE_tags, sorted_TAGS }) {
  return (
    <CssTransition_MENU
      current_MENU={current_MENU}
      classNames="menu-secondary"
      menu_NAME="active-tags"
    >
      <div className={css.block_WRAP}>
        <div className={css.block}>
          <li>
            <Btn
              styles={["btn-40", "strech", "left-align"]}
              left_ICON={<ICON_arrow color="dark" direction="left" />}
              text="All tags"
              onClick={() => SET_currentMenu("all")}
            />
          </li>
        </div>
        <div className={css.block}>
          <p>{active_TAGS.size} active tags</p>
          {sorted_TAGS.map((tag) => {
            const IS_active = active_TAGS.has(tag._id);
            if (!IS_active) return;
            return (
              <li key={tag._id}>
                <Btn
                  key={tag._id}
                  styles={["btn-40", "strech", `${IS_active ? "active" : ""}`, "text-left-auto"]}
                  left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
                  right_ICON={<ICON_x color="brand" small={true} />}
                  text={tag?.name?.en}
                  onClick={() => UPDATE_tags(tag, IS_active ? "remove" : "add")}
                />
              </li>
            );
          })}
        </div>
        {active_TAGS.size > 0 && (
          <div className={css.block}>
            <li>
              <Btn
                styles={["btn-40", "strech", "text-left-auto"]}
                right_ICON={<ICON_x small={true} />}
                text="Reset tags"
                onClick={() => UPDATE_tags(null, "deleteAll")}
              />
            </li>
          </div>
        )}
      </div>
    </CssTransition_MENU>
  );
}
function TagGroup_MENU({
  currentTagGroup_ID,
  tagUsages,
  sorted_TAGS,
  tag_COUNTS,
  currentTagGroup_NAME,
  SET_currentMenu,
  current_MENU,
  active_TAGS,
  UPDATE_tags,
}) {
  return (
    <CssTransition_MENU
      current_MENU={current_MENU}
      classNames="menu-secondary"
      menu_NAME="tag-group"
    >
      <div className={css.block_WRAP}>
        <div className={css.block}>
          <li>
            <Btn
              styles={["btn-40", "strech", "left-align"]}
              left_ICON={<ICON_arrow color="dark" direction="left" />}
              text="All tags"
              onClick={() => SET_currentMenu("all")}
            />
          </li>
        </div>
        <div className={css.block}>
          <p>{currentTagGroup_NAME || "Tag group"}</p>
          <TagGroup_TAGS
            tagGroup_ID={currentTagGroup_ID}
            tagUsages={tagUsages}
            sorted_TAGS={sorted_TAGS}
            tag_COUNTS={tag_COUNTS}
            UPDATE_tags={UPDATE_tags}
            active_TAGS={active_TAGS}
          />
        </div>
      </div>
    </CssTransition_MENU>
  );
}
function TagGroup_TAGS({
  tagGroup_ID,
  tagUsages,
  sorted_TAGS,
  tag_COUNTS,
  active_TAGS,
  UPDATE_tags,
}) {
  const target_TAGUSAGES = tagUsages.filter((tagUsage) => tagUsage.tagGroup_ID === tagGroup_ID);
  const target_TAGS = sorted_TAGS.filter((tag) =>
    target_TAGUSAGES.some((tagUsage) => tagUsage.tag_ID === tag._id)
  );

  return (
    <>
      {target_TAGS?.map((tag) => {
        const IS_active = active_TAGS.has(tag._id);
        return (
          <li key={tag._id}>
            <Btn
              key={tag._id}
              styles={["btn-40", "strech", `${IS_active ? "active" : ""}`, "text-left-auto"]}
              left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
              right_ICON={
                IS_active ? (
                  <ICON_x color="brand" small={true} />
                ) : (
                  <span>{tag_COUNTS?.[tag._id]}</span>
                )
              }
              text={tag?.name?.en}
              onClick={() => UPDATE_tags(tag, IS_active ? "remove" : "add")}
            />
          </li>
        );
      })}
    </>
  );
}
