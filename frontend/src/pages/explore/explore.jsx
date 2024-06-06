//
//
//
import { useState, useContext, useEffect, useRef } from "react";
import css from "./explore.module.css";

import Profile_PREVIEW from "../../components/Profile_PREVIEW/Profile_PREVIEW";
import Panorama from "../../components/panorama/panorama";
import { SavedProfileIDs_CONTEXT } from "../../contexts/savedProfiles";

import { Lang_CONTEXT } from "../../contexts/lang";

import { profilePreview_TR } from "../../translations";
import { global_TR } from "../../translations";
import { Header } from "./components/header/Header";
import { Tagbar } from "./components/Tagbar/Tagbar";
import { CategoryBar } from "./components/CategoryBar/CategoryBar";
import { HeartConfetti } from "../../components/HeartConfetti/HeartConfetti";
import { FontSizeContext } from "../../contexts/fontSize";
import { Sidepanel } from "./components/Sidepanel/Sidepanel";
import { Btn } from "../../components/btn/btn";
import { ICON_dropDownArrow, ICON_x } from "../../components/icons/icons";

export default function Explore({
  profiles,
  tags,
  tagUsages,
  window_WIDTH,
  search,
  categories,
  SET_search,
  tagGroups,
}) {
  const [panoramas, SET_panoramas] = useState(null);
  const { lang } = useContext(Lang_CONTEXT);

  return (
    <>
      <Explore_GRID
        profiles={profiles}
        SET_panoramas={SET_panoramas}
        search={search}
        lang={lang}
        window_WIDTH={window_WIDTH}
        categories={categories}
        tags={tags}
        tagGroups={tagGroups}
        tagUsages={tagUsages}
      />
      {panoramas !== null && <Modal360 panoramas={panoramas} SET_panoramas={SET_panoramas} />}
    </>
  );
}

function Explore_GRID({
  profiles,
  SET_panoramas,
  search,
  SET_search,
  lang,
  window_WIDTH,
  categories,
  tags: all_TAGS,
  tagGroups,
  tagUsages,
}) {
  const [filtered_PROFILES, SET_filteredProfiles] = useState([...profiles]);

  const [active_TAGS, SET_activeTags] = useState(new Set());
  const [nonActive_TAGS, SET_nonActive_TAGS] = useState(new Set([all_TAGS.map((tag) => tag._id)]));
  const [potential_TAGS, SET_potentialTags] = useState({
    toDelete_IDs: new Set(),
    toAdd_IDs: new Set(),
  });

  useEffect(() => {
    SET_filteredProfiles(profiles);
  }, [profiles]);

  useEffect(() => {
    SET_nonActive_TAGS(new Set(all_TAGS.map((tag) => tag._id)));
  }, [all_TAGS]);

  // useEffect(() => {
  //   console.log(active_TAGS);
  //   console.log(nonActive_TAGS);
  // }, [nonActive_TAGS, active_TAGS]);

  const UPDATE_tags = (tag, action) => {
    SET_activeTags((prevTags) => {
      const updatedTags = new Set(prevTags);
      action === "add" ? updatedTags.add(tag._id) : updatedTags.delete(tag._id);

      // if the tag is active, remove it from the nonActive_TAGS and vise versa
      SET_nonActive_TAGS((prevTags) => {
        const updatedTags = new Set(prevTags);
        action === "add" ? updatedTags.delete(tag._id) : updatedTags.add(tag._id);
        return updatedTags;
      });

      return updatedTags;
    });
  };

  return (
    <div className={css.explore_WRAP}>
      <div className={css.left}>
        <Header
          window_WIDTH={window_WIDTH}
          profile_COUNT={profiles.length}
          search={search}
          SET_search={SET_search}
        />
        <Tagbar
          categories={categories}
          all_TAGS={all_TAGS}
          active_TAGS={active_TAGS}
          nonActive_TAGS={nonActive_TAGS}
          potential_TAGS={potential_TAGS}
          SET_potentialTags={SET_potentialTags}
          window_WIDTH={window_WIDTH}
          UPDATE_tags={UPDATE_tags}
          tagGroups={tagGroups}
          tagUsages={tagUsages}
        />
        {/* <CategoryBar categories={categories} window_WIDTH={window_WIDTH} /> */}
        <section className={css.profile_GRID}>
          {filtered_PROFILES.map((profile) => {
            return (
              <Profile_PREVIEW
                key={profile._id}
                profile={profile}
                active_TAGS={active_TAGS}
                UPDATE_tags={UPDATE_tags}
                potential_TAGS={potential_TAGS}
                SET_potentialTags={SET_potentialTags}
                SET_panoramas={SET_panoramas}
                search={search}
                lang={lang}
                tr={profilePreview_TR}
                global_TR={global_TR}
              />
            );
          })}

          {filtered_PROFILES.map((profile) => {
            return (
              <Profile_PREVIEW
                key={profile._id}
                profile={profile}
                active_TAGS={active_TAGS}
                UPDATE_tags={UPDATE_tags}
                SET_panoramas={SET_panoramas}
                potential_TAGS={potential_TAGS}
                SET_potentialTags={SET_potentialTags}
                search={search}
                lang={lang}
                tr={profilePreview_TR}
                global_TR={global_TR}
              />
            );
          })}
        </section>
      </div>
      {window_WIDTH > 1100 && (
        <div className={css.right}>
          <Sidepanel
            all_TAGS={all_TAGS}
            tagGroups={tagGroups}
            tagUsages={tagUsages}
            active_TAGS={active_TAGS}
            UPDATE_tags={UPDATE_tags}
            potential_TAGS={potential_TAGS}
            SET_potentialTags={SET_potentialTags}
          />
        </div>
      )}
      {window_WIDTH < 1100 &&
        (potential_TAGS.toAdd_IDs.size > 0 || potential_TAGS.toDelete_IDs.size > 0) && (
          <PotentialTags_NAV
            {...{ potential_TAGS, SET_potentialTags, all_TAGS, UPDATE_tags, active_TAGS }}
          />
        )}
    </div>
  );
}

function Modal360({ panoramas, SET_panoramas }) {
  return (
    <div className="modal360">
      <Panorama panoramas={panoramas} />
      <div
        className="btn_CLOSE"
        onClick={(e) => {
          e.stopPropagation();
          SET_panoramas(null);
        }}
      >
        X
      </div>
    </div>
  );
}

function PotentialTags_NAV({
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
    <div className={css.potentialTag_NAV}>
      <div className={css.top}>
        <div className={css.text_WRAP}>
          <h3>Confirm tags</h3>
          <p>xxx results</p>
        </div>
        <Btn
          styles={["btn-40", "grey", "dropdown"]}
          onClick={() => SET_potentialTagNavExpanded((prev) => !prev)}
          text={IS_potentialTagNavExpanded ? "Less" : "More"}
          right_ICON={IS_potentialTagNavExpanded ? <ICON_x /> : <ICON_dropDownArrow />}
          test_ID="save-btn"
          expanded={IS_potentialTagNavExpanded}
        />
      </div>
      <div className={css.bottom}>
        {!IS_potentialTagNavExpanded && (
          <div className={css.tagLabel_WRAP}>
            {potential_TAGS.toAdd_IDs.size > 0 && (
              <div className={css.label} data-color="green">
                Add {potential_TAGS.toAdd_IDs.size || "NUM"}
              </div>
            )}
            {potential_TAGS.toDelete_IDs.size > 0 && (
              <div className={css.label} data-color="red">
                Delete {potential_TAGS.toDelete_IDs.size || "NUM"}
              </div>
            )}
            {potentialStayTag_IDs.length > 0 && (
              <div className={css.label} data-color="brand">
                Keep {potentialStayTag_IDs.length || "NUM"}
              </div>
            )}
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
    </div>
  );
}
