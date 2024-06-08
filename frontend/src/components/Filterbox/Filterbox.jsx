//

import { useEffect, useRef, useState } from "react";
import { Btn } from "../btn/btn";
import { ICON_activeDigit, ICON_arrow, ICON_search, ICON_searchSmall, ICON_x } from "../icons/icons";
import SearchBar from "../search/Searchbar";
import css from "./Filterbox.module.css";
import { CssTransition_MENU } from "../Nav/components/Menus/CssTransition_MENU";
import { USE_windowSize } from "../../hooks/USE_windowWidth";

export function Tagbox({
  tags,
  tagUsages,
  tagGroups,
  all_TAGS,
  activeTag_IDs,
  UPDATE_tags,
  potentialTag_IDs,
  SET_potentialTagIDs,
  SET_isOpen = () => {},
  starting_MENU,
}) {
  const [search, SET_search] = useState("");
  const mainSearch_REF = useRef(null);
  const [current_MENU, SET_currentMenu] = useState(starting_MENU || "all");
  const [currentTagGroup_ID, SET_currentTagGroupID] = useState(null);
  const [currentTagGroup_NAME, SET_currentTagGroupName] = useState(null);
  const { width } = USE_windowSize();
  const { SHOULD_activeDitigJump } = USE_activeDigitJump(activeTag_IDs);

  const scroll_REF = useRef(null);

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

  const sorted_TAGS = [...all_TAGS];
  const potentialAdd_TAGS = sorted_TAGS.filter((tag) => potentialTag_IDs.toAdd_IDs.has(tag._id));
  const potentialDelete_TAGS = sorted_TAGS.filter((tag) => potentialTag_IDs.toDelete_IDs.has(tag._id));
  const potentialStay_TAGS = sorted_TAGS?.filter((tag) =>
    Array.from(activeTag_IDs)
      .filter((tag_ID) => !potentialTag_IDs.toDelete_IDs.has(tag_ID))
      .includes(tag._id)
  );
  const HAS_potentialTags = potentialAdd_TAGS.length > 0 || potentialDelete_TAGS.length > 0;

  const tag_COUNTS = tagUsages.reduce((acc, tagUsage) => {
    acc[tagUsage.tag_ID] = (acc[tagUsage.tag_ID] || 0) + tagUsage.count;
    return acc;
  }, {});

  return (
    <div className={css.filterbox} data-potential={HAS_potentialTags}>
      <Top
        HAS_potentialTags={HAS_potentialTags}
        activeTag_IDs={activeTag_IDs}
        current_MENU={current_MENU}
        SET_currentMenu={SET_currentMenu}
        SHOULD_activeDitigJump={SHOULD_activeDitigJump}
        width={width}
        SET_isOpen={SET_isOpen}
      />
      {!HAS_potentialTags && (
        <>
          <div className={css.menu_WRAP} ref={scroll_REF}>
            <Starter_MENU
              SET_currentMenu={SET_currentMenu}
              current_MENU={current_MENU}
              tagGroups={tagGroups}
              tagUsages={tagUsages}
              sorted_TAGS={sorted_TAGS}
              activeTag_IDs={activeTag_IDs}
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
              activeTag_IDs={activeTag_IDs}
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
              activeTag_IDs={activeTag_IDs}
            />
          </div>
          {width < 1100 && (
            <MobileBtn_WRAP activeTag_IDs={activeTag_IDs} UPDATE_tags={UPDATE_tags} SET_isOpen={SET_isOpen} />
          )}
        </>
      )}
      {HAS_potentialTags && (
        <div className={css.block_WRAP}>
          {potentialAdd_TAGS.length > 0 && (
            <PotentialBlock type="add" tags={potentialAdd_TAGS} SET_potentialTagIDs={SET_potentialTagIDs} />
          )}
          {potentialDelete_TAGS.length > 0 && (
            <PotentialBlock type="delete" tags={potentialDelete_TAGS} SET_potentialTagIDs={SET_potentialTagIDs} />
          )}
          {potentialStay_TAGS.length > 0 && (
            <PotentialBlock type="keep" tags={potentialStay_TAGS} SET_potentialTagIDs={SET_potentialTagIDs} />
          )}

          <div className={css.block} style={{ flexDirection: "row", gap: "0.6rem" }}>
            <Btn
              styles={["btn-40", "left-align"]}
              // right_ICON={<ICON_x color="dark" small={true} />}
              text="Cancel"
              onClick={() => SET_potentialTagIDs({ toAdd_IDs: new Set(), toDelete_IDs: new Set() })}
            />

            <Btn
              styles={["btn-40", "strech", "brand", "brand-background-colors"]}
              text={`Show ${3} places`}
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
                SET_currentMenu("active-tags");
                SET_potentialTagIDs({ toAdd_IDs: new Set(), toDelete_IDs: new Set() });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Top({
  HAS_potentialTags,
  activeTag_IDs,
  current_MENU,
  SET_currentMenu,
  SHOULD_activeDitigJump,
  width,
  SET_isOpen,
}) {
  return (
    <>
      {!HAS_potentialTags && (
        <div className={css.top}>
          <div className={css.top_LEFT}>
            <h3>Tagbox</h3>
            <p>{activeTag_IDs.size} tags selected</p>
          </div>
          <Btn styles={["btn-40", "grey", "round"]} right_ICON={<ICON_searchSmall />} onClick={() => {}} />

          <Btn
            styles={["btn-40", "grey", "round", `${current_MENU === "active-tags" ? "active" : ""}`]}
            left_ICON={
              <div
                className={css.circleGrowFade}
                data-animate={SHOULD_activeDitigJump}
                data-wider={activeTag_IDs.size >= 10}
              ></div>
            }
            right_ICON={
              <ICON_activeDigit
                IS_active={activeTag_IDs.size > 0 || false}
                count={activeTag_IDs?.size}
                inverse={true}
                jump={SHOULD_activeDitigJump}
              />
            }
            onClick={() => SET_currentMenu(current_MENU === "active-tags" ? "all" : "active-tags")}
          />
          {width < 1100 && (
            <Btn styles={["btn-40", "grey", "round"]} right_ICON={<ICON_x />} onClick={() => SET_isOpen(false)} />
          )}
        </div>
      )}

      {HAS_potentialTags && (
        <div className={css.top}>
          <h3>Confirm tag selection</h3>
        </div>
      )}
    </>
  );
}
function ActiveTags_MENU({ current_MENU, SET_currentMenu, activeTag_IDs, UPDATE_tags, sorted_TAGS }) {
  return (
    <CssTransition_MENU current_MENU={current_MENU} classNames="menu-secondary" menu_NAME="active-tags">
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
          <p>{activeTag_IDs.size} active tags</p>
          {sorted_TAGS.map((tag) => {
            const IS_active = activeTag_IDs.has(tag._id);
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
        {activeTag_IDs.size > 0 && (
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
function Starter_MENU({
  SET_currentMenu,
  current_MENU,
  tagGroups,
  tagUsages,
  sorted_TAGS,
  activeTag_IDs,
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
                  count={activeTag_IDs?.size || 0}
                  IS_active={activeTag_IDs?.size > 0 || false}
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
            const IS_active = activeTag_IDs.has(tag._id);
            return (
              <li key={tag._id}>
                <Btn
                  key={tag._id}
                  styles={["btn-40", "strech", `${IS_active ? "active" : ""}`, "text-left-auto"]}
                  left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
                  right_ICON={IS_active ? <ICON_x color="brand" small={true} /> : <span>{tag_COUNTS?.[tag._id]}</span>}
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
  SET_currentMenu,
  current_MENU,
  activeTag_IDs,
  UPDATE_tags,
}) {
  const target_TAGUSAGES = tagUsages.filter((tagUsage) => tagUsage.tagGroup_ID === currentTagGroup_ID);
  const target_TAGS = sorted_TAGS.filter((tag) => target_TAGUSAGES.some((tagUsage) => tagUsage.tag_ID === tag._id));

  return (
    <CssTransition_MENU current_MENU={current_MENU} classNames="menu-secondary" menu_NAME="tag-group">
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
          {target_TAGS?.map((tag) => {
            const IS_active = activeTag_IDs.has(tag._id);
            return (
              <li key={tag._id}>
                <Btn
                  key={tag._id}
                  styles={["btn-40", "strech", `${IS_active ? "active" : ""}`, "text-left-auto"]}
                  left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
                  right_ICON={IS_active ? <ICON_x color="brand" small={true} /> : <span>{tag_COUNTS?.[tag._id]}</span>}
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

function MobileBtn_WRAP({ activeTag_IDs, UPDATE_tags, SET_isOpen }) {
  return (
    <div className={css.mobileBtn_WRAP}>
      {activeTag_IDs.size > 0 && (
        <>
          <Btn
            styles={["btn-40", "grey"]}
            // right_ICON={<ICON_x color="dark" small={true} />}
            text="Clear all"
            onClick={() => UPDATE_tags(null, "deleteAll")}
          />
          <Btn
            styles={["btn-40", "brand", "strech"]}
            text={`Apply ${activeTag_IDs.size} tags`}
            onClick={() => SET_isOpen(false)}
          />
        </>
      )}
      {activeTag_IDs.size === 0 && (
        <Btn
          styles={["btn-40", "grey", "strech", "text-left-auto"]}
          text="Close Tagbox"
          right_ICON={<ICON_x color="dark" small={true} />}
          onClick={() => SET_isOpen(false)}
        />
      )}
    </div>
  );
}
function PotentialBlock({ type, tags, SET_potentialTagIDs }) {
  const x_COLOR = type === "add" ? "green" : type === "delete" ? "red" : "brand";

  return (
    <div className={css.block}>
      <p>
        {type === "add" ? "Add" : type === "delete" ? "Delete" : "Keep"} {tags?.length || "NUM"} tags
      </p>
      {tags?.map((tag) => (
        <Btn
          key={tag._id}
          styles={[
            "btn-40",
            "strech",
            type === "add" && "green",
            type === "delete" && "red",
            type === "keep" && "active",
            "text-left-auto",
          ]}
          left_ICON={<img src={tag.icon?.url || ""} />}
          right_ICON={<ICON_x color={x_COLOR} small={true} />}
          text={tag?.name?.en || ""}
          onClick={() =>
            SET_potentialTagIDs((prev) => {
              const updated = { ...prev };
              if (type === "delete") updated.toDelete_IDs.delete(tag._id);
              if (type === "add") updated.toAdd_IDs.delete(tag._id);
              if (type === "keep") updated.toDelete_IDs.add(tag._id);
              return updated;
            })
          }
        />
      ))}
    </div>
  );
}
function USE_activeDigitJump(activeTags, timeoutDelay = 500) {
  const [SHOULD_activeDitigJump, SET_activeDitigJump] = useState(false);

  useEffect(() => {
    if (activeTags.size > 0) {
      SET_activeDitigJump(true);
      const timeout = setTimeout(() => {
        SET_activeDitigJump(false);
      }, timeoutDelay);

      return () => clearTimeout(timeout);
    } else {
      SET_activeDitigJump(false);
    }
  }, [activeTags, timeoutDelay]);

  return { SHOULD_activeDitigJump };
}
