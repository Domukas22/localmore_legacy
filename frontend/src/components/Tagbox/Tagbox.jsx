//

import { useEffect, useMemo, useRef, useState } from "react";
import { Btn } from "../Btn/Btn";
import { ICON_activeDigit, ICON_arrow, ICON_search, ICON_x } from "../icons/icons";
import SearchBar from "../Searchbar/Searchbar";
import css from "./Tagbox.module.css";

import Transition_MENU from "../Transition_MENU/Transition_MENU";
import { USE_windowSize } from "../../hooks/USE_windowWidth";

import { EndBtn_BLOCK } from "../Transition_MENU/Blocks/General/EndBtn_BLOCK/EndBtn_BLOCK";
import { BtnBack_BLOCK } from "../Transition_MENU/Blocks/General/BtnBack_BLOCK/BtnBack_BLOCK";

import { Tags_BLOCK } from "../Transition_MENU/Blocks/Tags/Tags_BLOCK/Tags_BLOCK";
import { PotentialTags_BLOCK } from "../Transition_MENU/Blocks/Tags/PotentialTags_BLOCK/PotentialTags_BLOCK";
import { TagGroupBtns_BLOCK } from "../Transition_MENU/Blocks/Tags/TagGroupBtns_BLOCK/TagGroupBtns_BLOCK";
import { ActiveTagsBtn_BLOCK } from "../Transition_MENU/Blocks/Tags/ActiveTagsBtn_BLOCK/ActiveTagsBtn_BLOCK";

import { USE_activeDigitJump } from "../../hooks/USE_activeDigitJump";
import { USE_isBrowserToolbarClosed } from "../../hooks/USE_isBrowserToolbarOpen";
import { USE_scrollCssMenuToTop } from "../../hooks/USE_scrollCssMenuToTop";

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
  const [tagSearch, SET_tagSearch] = useState("");
  const search_REF = useRef(null);

  const [current_MENU, SET_currentMenu] = useState(starting_MENU || "all");
  const [currentTagGroup_ID, SET_currentTagGroupID] = useState(null);
  const [currentTagGroup_NAME, SET_currentTagGroupName] = useState(null);
  const { width } = USE_windowSize();
  const { SHOULD_activeDitigJump } = USE_activeDigitJump(activeTag_IDs);

  const scroll_REF = useRef(null);

  USE_scrollCssMenuToTop({ scroll_REF, current_MENU });

  const sorted_TAGS = [...all_TAGS];
  const [searched_TAGS, SET_searchedTags] = useState([]);

  useEffect(() => {
    // if (tagSearch === "") {
    //   SET_searchedTags([]);
    //   return;
    // }

    const search = tagSearch.toLowerCase();
    const searchedTags = all_TAGS.filter((tag) => {
      const nameMatch = tag?.name?.en?.toLowerCase().includes(search.toLowerCase());
      const keywordsMatch = tag?.keywords?.en?.some((keyword) =>
        keyword.toLowerCase().includes(search.toLowerCase())
      );

      return nameMatch || keywordsMatch;
    });
    SET_searchedTags(searchedTags);
  }, [tagSearch, SET_tagSearch, all_TAGS]);

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
        tagSearch={tagSearch}
        SET_tagSearch={SET_tagSearch}
        search_REF={search_REF}
      />
      {!HAS_potentialTags && tagSearch === "" && (
        <>
          <div className={css.menu_WRAP} ref={scroll_REF}>
            {/* Start */}
            <Transition_MENU current_MENU={current_MENU} classNames="menu-primary" menu_NAME="all">
              <ActiveTagsBtn_BLOCK {...{ activeTag_IDs, SET_currentMenu, width }} />
              <TagGroupBtns_BLOCK
                {...{
                  tagGroups,
                  tagUsages,
                  SET_currentMenu,
                  SET_currentTagGroupID,
                  SET_currentTagGroupName,
                  width,
                }}
              />
              <Tags_BLOCK
                title={`Explore ${sorted_TAGS.length} tags`}
                tags={sorted_TAGS}
                {...{ activeTag_IDs, UPDATE_tags, tag_COUNTS, width }}
              />
            </Transition_MENU>

            {/* Active Tags */}
            <Transition_MENU
              current_MENU={current_MENU}
              classNames="menu-secondary"
              menu_NAME="active-tags"
            >
              <BtnBack_BLOCK
                title="All tags"
                onClick={() => SET_currentMenu("all")}
                width={width}
              />
              <Tags_BLOCK
                title={`${active_TAGS?.length || 0} active tags`}
                tags={active_TAGS}
                {...{ activeTag_IDs, UPDATE_tags, tag_COUNTS, width }}
              />
              {active_TAGS?.length > 0 && (
                <EndBtn_BLOCK
                  text="Reset tags"
                  onClick={() => UPDATE_tags(null, "deleteAll")}
                  width={width}
                />
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
              <BtnBack_BLOCK
                title="All tags"
                onClick={() => SET_currentMenu("all")}
                width={width}
              />

              <Tags_BLOCK
                title={currentTagGroup_NAME}
                tags={target_TAGS}
                {...{ activeTag_IDs, UPDATE_tags, tag_COUNTS, width }}
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
      {HAS_potentialTags && tagSearch === "" && (
        <div className={css.block_WRAP} data-potential-block-wrap>
          {potentialAdd_TAGS.length > 0 && (
            <PotentialTags_BLOCK
              type="add"
              tags={potentialAdd_TAGS}
              SET_potentialTagIDs={SET_potentialTagIDs}
              width={width}
            />
          )}
          {potentialDelete_TAGS.length > 0 && (
            <PotentialTags_BLOCK
              type="delete"
              tags={potentialDelete_TAGS}
              SET_potentialTagIDs={SET_potentialTagIDs}
              width={width}
            />
          )}
          {potentialStay_TAGS.length > 0 && (
            <PotentialTags_BLOCK
              type="keep"
              tags={potentialStay_TAGS}
              SET_potentialTagIDs={SET_potentialTagIDs}
              width={width}
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
              styles={["btn-40", "fullWidth", "brand", "brand-background-colors"]}
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

      {!HAS_potentialTags && tagSearch !== "" && (
        <Tags_BLOCK
          title={`${searched_TAGS.length} tags with "${tagSearch}"`}
          tags={searched_TAGS}
          {...{ activeTag_IDs, UPDATE_tags, tag_COUNTS, width }}
        />
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
  tagSearch,
  SET_tagSearch,
  search_REF,
}) {
  const [IS_searchOpen, SET_searchOpen] = useState(false);

  useEffect(() => {
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
  const IS_mobibeBrowserToolbarClosed = USE_isBrowserToolbarClosed();

  return (
    <div
      className={css.mobileBtn_WRAP}
      data-browser-tab-padding-bottom={IS_mobibeBrowserToolbarClosed}
    >
      {activeTag_IDs.size > 0 && (
        <>
          <Btn
            styles={["btn-40", "grey"]}
            // right_ICON={<ICON_x color="dark" small={true} />}
            text="Clear all"
            onClick={() => UPDATE_tags(null, "deleteAll")}
          />
          <Btn
            styles={["btn-40", "brand", "fullWidth"]}
            text={`See ${result_COUNT} results`}
            onClick={() => SET_isOpen(false)}
          />
        </>
      )}
      {activeTag_IDs.size === 0 && (
        <Btn
          styles={["btn-40", "grey", "fullWidth", "text-left-auto"]}
          text="Close Tagbox"
          right_ICON={<ICON_x color="dark" small={true} />}
          onClick={() => SET_isOpen(false)}
        />
      )}
    </div>
  );
}
