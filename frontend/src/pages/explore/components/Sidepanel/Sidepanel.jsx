//

import { useEffect, useRef, useState } from "react";
import { Btn } from "../../../../components/btn/btn";
import { ICON_activeDigit, ICON_arrow, ICON_x } from "../../../../components/icons/icons";
import SearchBar from "../../../../components/search/Searchbar";
import css from "./Sidepanel.module.css";
import { CssTransition_MENU } from "../../../../components/Nav/components/Menus/CssTransition_MENU";

export function Sidepanel({
  tags,
  tagUsages,
  tagGroups,
  all_TAGS,
  active_TAGS,
  UPDATE_tags,
  potential_TAGS,
  SET_potentialTags,
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
}) {
  const [search, SET_search] = useState("");
  const mainSearch_REF = useRef(null);
  const [current_MENU, SET_current_MENU] = useState("all");
  const [currentTagGroup_ID, SET_currentTagGroupID] = useState(null);
  const [currentTagGroup_NAME, SET_currentTagGroupName] = useState(null);

  const HAS_potentialTags =
    potential_TAGS.toAdd_IDs.size > 0 || potential_TAGS.toDelete_IDs.size > 0;
  const HAS_potentialAddTags = potential_TAGS.toAdd_IDs.size > 0;
  const HAS_potentialDeleteTags = potential_TAGS.toDelete_IDs.size > 0;

  const potentialStayTag_IDs = Array.from(active_TAGS).filter(
    (tag_ID) => !potential_TAGS.toDelete_IDs.has(tag_ID)
  );

  useEffect(() => {
    // scroll to top when menu changes
    if (scroll_REF.current) {
      console.log("scroll");
      scroll_REF.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [current_MENU]);

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
    <div className={css.sidepanel}>
      {!HAS_potentialTags && (
        <>
          <div className={css.top}>
            <h4>Alle Kategorien filtern</h4>
            <div className={css.bottom_WRAP}>
              <SearchBar
                SET_search={SET_search}
                search={search}
                searchBar_REF={mainSearch_REF}
                placeholder="Tag suchen..."
              />
              <Btn
                styles={["btn-40", "grey", "round"]}
                right_ICON={<ICON_arrow color="dark" direction="up" />}
                onClick={() => {}}
              />
            </div>
          </div>
          <div className={css.menu_WRAP} ref={scroll_REF}>
            <Starter_MENU
              SET_current_MENU={SET_current_MENU}
              current_MENU={current_MENU}
              tagGroups={tagGroups}
              tagUsages={tagUsages}
              sorted_TAGS={sorted_TAGS}
              active_TAGS={active_TAGS}
              UPDATE_tags={UPDATE_tags}
              tag_COUNTS={tag_COUNTS}
              SET_currentTagGroupID={SET_currentTagGroupID}
              SET_currentTagGroupName={SET_currentTagGroupName}
            />
            <ActiveTags_MENU
              current_MENU={current_MENU}
              SET_current_MENU={SET_current_MENU}
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
              SET_current_MENU={SET_current_MENU}
              current_MENU={current_MENU}
              UPDATE_tags={UPDATE_tags}
              active_TAGS={active_TAGS}
            />
          </div>
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
                right_ICON={<ICON_x color="dark" small={true} />}
                text="Cancel"
                onClick={() => SET_potentialTags({ toAdd_IDs: new Set(), toDelete_IDs: new Set() })}
              />

              <Btn
                styles={["btn-40", "strech", "brand"]}
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
        </>
      )}
    </div>
  );
}

function Starter_MENU({
  SET_current_MENU,
  current_MENU,
  tagGroups,
  tagUsages,
  sorted_TAGS,
  active_TAGS,
  UPDATE_tags,
  tag_COUNTS,
  SET_currentTagGroupID,
  SET_currentTagGroupName,
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
                />
              }
              right_ICON={<ICON_arrow color="dark" direction="right" />}
              text="Active tags"
              onClick={() => SET_current_MENU("active-tags")}
            />
          </li>
        </div>
        <div className={css.block}>
          {/* <p>Tag groups</p> */}
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
                    SET_current_MENU("tag-group");
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
function ActiveTags_MENU({
  current_MENU,
  SET_current_MENU,
  active_TAGS,
  UPDATE_tags,
  sorted_TAGS,
}) {
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
              text="Back"
              onClick={() => SET_current_MENU("all")}
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
  SET_current_MENU,
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
              onClick={() => SET_current_MENU("all")}
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
