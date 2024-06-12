//

import { useEffect, useRef, useState } from "react";
import { Btn } from "../Btn/Btn";
import { ICON_activeDigit, ICON_arrow, ICON_search, ICON_x } from "../icons/icons";
import SearchBar from "../Searchbar/Searchbar";
import css from "./Tagbox.module.css";

import Transition_MENU from "../Transition_MENU/Transition_MENU";
import { USE_windowSize } from "../../hooks/USE_windowWidth";
import {
  BtnBack_BLOCK,
  TagGroupBtns_BLOCK,
  ActiveTagsbtn_BLOCK,
  Tags_BLOCK,
  EndBtn_BLOCK,
  Potential_BLOCK,
} from "../Transition_MENU/Blocks/Blocks";
import { USE_activeDigitJump } from "../../hooks/USE_activeDigitJump";

export function Tagbox({
  tagUsages,
  tagGroups,
  all_TAGS,
  activeTag_IDs,
  UPDATE_tags,
  potentialTag_IDs,
  SET_potentialTagIDs,
  SET_isOpen = () => {},
  starting_MENU,
  result_COUNT,
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
  const active_TAGS = sorted_TAGS.filter((tag) => activeTag_IDs.has(tag._id));

  const potentialAdd_TAGS = sorted_TAGS.filter((tag) => potentialTag_IDs.toAdd_IDs.has(tag._id));
  const potentialDelete_TAGS = sorted_TAGS.filter((tag) =>
    potentialTag_IDs.toDelete_IDs.has(tag._id)
  );
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

  const target_TAGUSAGES = tagUsages.filter(
    (tagUsage) => tagUsage.tagGroup_ID === currentTagGroup_ID
  );
  const target_TAGS = sorted_TAGS.filter((tag) =>
    target_TAGUSAGES.some((tagUsage) => tagUsage.tag_ID === tag._id)
  );

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
            {/* Start */}
            <Transition_MENU current_MENU={current_MENU} classNames="menu-primary" menu_NAME="all">
              <ActiveTagsbtn_BLOCK {...{ activeTag_IDs, SET_currentMenu }} />
              <TagGroupBtns_BLOCK
                {...{
                  tagGroups,
                  tagUsages,
                  SET_currentMenu,
                  SET_currentTagGroupID,
                  SET_currentTagGroupName,
                }}
              />
              <Tags_BLOCK
                title={`Explore ${sorted_TAGS.length} tags`}
                tags={sorted_TAGS}
                {...{ activeTag_IDs, UPDATE_tags, tag_COUNTS }}
              />
            </Transition_MENU>

            {/* Active Tags */}
            <Transition_MENU
              current_MENU={current_MENU}
              classNames="menu-secondary"
              menu_NAME="active-tags"
            >
              <BtnBack_BLOCK title="All tags" onClick={() => SET_currentMenu("all")} />
              <Tags_BLOCK
                title={`${active_TAGS?.length || 0} active tags`}
                tags={active_TAGS}
                {...{ activeTag_IDs, UPDATE_tags, tag_COUNTS }}
              />
              {active_TAGS?.length > 0 && (
                <EndBtn_BLOCK text="Reset tags" onClick={() => UPDATE_tags(null, "deleteAll")} />
              )}
              {active_TAGS?.length === 0 && (
                <div>{/* So that the last block would have a border */}</div>
              )}
            </Transition_MENU>

            {/* Target Tag Group */}
            <Transition_MENU
              current_MENU={current_MENU}
              classNames="menu-secondary"
              menu_NAME="tag-group"
            >
              <BtnBack_BLOCK title="All tags" onClick={() => SET_currentMenu("all")} />

              <Tags_BLOCK
                title={currentTagGroup_NAME}
                tags={target_TAGS}
                {...{ activeTag_IDs, UPDATE_tags, tag_COUNTS }}
              />
            </Transition_MENU>
          </div>
          {width < 1100 && (
            <MobileBtn_WRAP
              activeTag_IDs={activeTag_IDs}
              UPDATE_tags={UPDATE_tags}
              SET_isOpen={SET_isOpen}
              result_COUNT={result_COUNT}
            />
          )}
        </>
      )}
      {HAS_potentialTags && (
        <div className={css.block_WRAP} data-potential-block-wrap>
          {potentialAdd_TAGS.length > 0 && (
            <Potential_BLOCK
              type="add"
              tags={potentialAdd_TAGS}
              SET_potentialTagIDs={SET_potentialTagIDs}
            />
          )}
          {potentialDelete_TAGS.length > 0 && (
            <Potential_BLOCK
              type="delete"
              tags={potentialDelete_TAGS}
              SET_potentialTagIDs={SET_potentialTagIDs}
            />
          )}
          {potentialStay_TAGS.length > 0 && (
            <Potential_BLOCK
              type="keep"
              tags={potentialStay_TAGS}
              SET_potentialTagIDs={SET_potentialTagIDs}
            />
          )}

          <div className={css.applyBtn_WRAP}>
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
  const [IS_searchOpen, SET_searchOpen] = useState(false);
  const [tagSearch, SET_tagSearch] = useState("");
  const search_REF = useRef(null);

  useEffect(() => {
    console.log(search_REF.current);
    if (search_REF.current && IS_searchOpen) {
      search_REF.current.focus();
    }
  }, [IS_searchOpen]);

  return (
    <>
      {!HAS_potentialTags && (
        <div className={css.top}>
          {!IS_searchOpen && (
            <>
              <div className={css.top_LEFT}>
                <h3>Tagbox</h3>
                <p>{activeTag_IDs.size} tags selected</p>
              </div>
              <Btn
                styles={["btn-40", "grey", "round"]}
                right_ICON={<ICON_search small={true} />}
                onClick={() => SET_searchOpen(true)}
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
            </>
          )}
          {IS_searchOpen && (
            <>
              <Btn
                styles={["btn-40", "grey", "round"]}
                right_ICON={<ICON_arrow direction="left" />}
                onClick={() => SET_searchOpen(false)}
              />
              <SearchBar
                search={tagSearch}
                SET_search={SET_tagSearch}
                placeholder="Search tags"
                search_REF={search_REF}
                // SET_isOpen={SET_searchOpen}
              />
            </>
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
function MobileBtn_WRAP({ activeTag_IDs, UPDATE_tags, SET_isOpen, result_COUNT }) {
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
            text={`See ${result_COUNT} results`}
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
