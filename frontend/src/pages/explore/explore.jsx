//
//
//
import { useState, useContext, useEffect } from "react";
import css from "./explore.module.css";

import Profile_PREVIEW from "../../components/Profile_PREVIEW/Profile_PREVIEW";
import Panorama from "../../components/panorama/panorama";

import { Lang_CONTEXT } from "../../contexts/lang";
import { profilePreview_TR } from "../../translations";
import { global_TR } from "../../translations";
import { Header } from "./components/header/Header";
import { Tagbar } from "./components/Tagbar/Tagbar";

import { Tagbox } from "../../components/Filterbox/Filterbox";
import { Btn } from "../../components/btn/btn";
import { ICON_dropDownArrow, ICON_x } from "../../components/icons/icons";
import { PotentialTags_NAV } from "./components/PotentialTags_NAV/PotentialTags_NAV";

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
  const [activeTag_IDs, SET_activeTagIDs] = useState(new Set());
  const [potentialTag_IDs, SET_potentialTagIDs] = useState({
    toDelete_IDs: new Set(),
    toAdd_IDs: new Set(),
  });

  useEffect(() => {
    SET_filteredProfiles(profiles);
  }, [profiles]);

  const UPDATE_tags = (tag, action) => {
    SET_activeTagIDs((prevactiveTag_IDs) => {
      if (action === "deleteAll") return new Set();
      const newactiveTag_IDs = new Set(prevactiveTag_IDs);
      action === "add" ? newactiveTag_IDs.add(tag._id) : newactiveTag_IDs.delete(tag._id);
      return newactiveTag_IDs;
    });
  };

  return (
    <div className={css.explore_WRAP}>
      <div className={css.left}>
        <Header window_WIDTH={window_WIDTH} profile_COUNT={profiles.length} search={search} SET_search={SET_search} />
        <Tagbar
          categories={categories}
          all_TAGS={all_TAGS}
          activeTag_IDs={activeTag_IDs}
          potentialTag_IDs={potentialTag_IDs}
          SET_potentialTagIDs={SET_potentialTagIDs}
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
                activeTag_IDs={activeTag_IDs}
                UPDATE_tags={UPDATE_tags}
                potentialTag_IDs={potentialTag_IDs}
                SET_potentialTagIDs={SET_potentialTagIDs}
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
                activeTag_IDs={activeTag_IDs}
                UPDATE_tags={UPDATE_tags}
                SET_panoramas={SET_panoramas}
                potentialTag_IDs={potentialTag_IDs}
                SET_potentialTagIDs={SET_potentialTagIDs}
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
          <Tagbox
            all_TAGS={all_TAGS}
            tagGroups={tagGroups}
            tagUsages={tagUsages}
            activeTag_IDs={activeTag_IDs}
            UPDATE_tags={UPDATE_tags}
            potentialTag_IDs={potentialTag_IDs}
            SET_potentialTagIDs={SET_potentialTagIDs}
          />
        </div>
      )}
      {window_WIDTH < 1100 && (potentialTag_IDs.toAdd_IDs.size > 0 || potentialTag_IDs.toDelete_IDs.size > 0) && (
        <PotentialTags_NAV
          {...{ potentialTag_IDs, SET_potentialTagIDs, all_TAGS, UPDATE_tags, activeTag_IDs: activeTag_IDs }}
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

// function PotentialTags_NAV({
//   potentialTag_IDs,
//   SET_potentialTagIDs,
//   all_TAGS,
//   UPDATE_tags,
//   activeTag_IDs,
// }) {
//   const [IS_potentialTagNavExpanded, SET_potentialTagNavExpanded] = useState(false);
//   const potentialStayTag_IDs = Array.from(activeTag_IDs).filter(
//     (tag_ID) => !potentialTag_IDs.toDelete_IDs.has(tag_ID)
//   );

//   const HAS_potentialTags =
//     potentialTag_IDs.toAdd_IDs.size > 0 || potentialTag_IDs.toDelete_IDs.size > 0;
//   const HAS_potentialAddTags = potentialTag_IDs.toAdd_IDs.size > 0;
//   const HAS_potentialDeleteTags = potentialTag_IDs.toDelete_IDs.size > 0;

//   function GET_potentialAddTags() {
//     return all_TAGS.filter((tag) => potentialTag_IDs.toAdd_IDs.has(tag._id));
//   }
//   function GET_potentialDeleteTags() {
//     return all_TAGS.filter((tag) => potentialTag_IDs.toDelete_IDs.has(tag._id));
//   }
//   function GET_potentialStayTags() {
//     return all_TAGS.filter((tag) => potentialStayTag_IDs.includes(tag._id));
//   }

//   return (
//     <div className={css.potentialTag_NAV}>
//       <div className={css.top}>
//         <div className={css.text_WRAP}>
//           <h3>Confirm tags</h3>
//           <p>xxx results</p>
//         </div>
//         <Btn
//           styles={["btn-40", "grey", "dropdown"]}
//           onClick={() => SET_potentialTagNavExpanded((prev) => !prev)}
//           text={IS_potentialTagNavExpanded ? "Less" : "More"}
//           right_ICON={IS_potentialTagNavExpanded ? <ICON_x /> : <ICON_dropDownArrow />}
//           test_ID="save-btn"
//           expanded={IS_potentialTagNavExpanded}
//         />
//       </div>
//       <div className={css.bottom}>
//         {!IS_potentialTagNavExpanded && (
//           <div className={css.tagLabel_WRAP} onClick={() => SET_potentialTagNavExpanded(true)}>
//             {potentialTag_IDs.toAdd_IDs.size > 0 && (
//               <div className={css.label} data-color="green">
//                 Add {potentialTag_IDs.toAdd_IDs.size || "NUM"} tags
//               </div>
//             )}
//             {potentialTag_IDs.toDelete_IDs.size > 0 && (
//               <div className={css.label} data-color="red">
//                 Delete {potentialTag_IDs.toDelete_IDs.size || "NUM"} tags
//               </div>
//             )}
//             {potentialStayTag_IDs.length > 0 && (
//               <div className={css.label} data-color="brand">
//                 Keep {potentialStayTag_IDs.length || "NUM"} tags
//               </div>
//             )}
//           </div>
//         )}

//         {HAS_potentialAddTags && IS_potentialTagNavExpanded && (
//           <div className={css.block}>
//             <p>Add {potentialTag_IDs?.toAdd_IDs?.size || "NUM"} tags</p>
//             {GET_potentialAddTags()?.map((tag) => {
//               return (
//                 <Btn
//                   key={tag._id}
//                   styles={["btn-40", "strech", "green", "text-left-auto"]}
//                   left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
//                   right_ICON={<ICON_x color="green" small={true} />}
//                   text={tag?.name?.en}
//                   onClick={() =>
//                     SET_potentialTagIDs((prev) => {
//                       const updated = { ...prev };
//                       updated.toAdd_IDs.delete(tag._id);
//                       return updated;
//                     })
//                   }
//                 />
//               );
//             })}
//           </div>
//         )}
//         {HAS_potentialDeleteTags && IS_potentialTagNavExpanded && (
//           <div className={css.block}>
//             <p>Delete {potentialTag_IDs?.toDelete_IDs?.size || "NUM"} tags</p>
//             {GET_potentialDeleteTags()?.map((tag) => {
//               return (
//                 <Btn
//                   key={tag._id}
//                   styles={["btn-40", "strech", "red", "text-left-auto"]}
//                   left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
//                   right_ICON={<ICON_x color="red" small={true} />}
//                   text={tag?.name?.en}
//                   onClick={() =>
//                     SET_potentialTagIDs((prev) => {
//                       const updated = { ...prev };
//                       updated.toDelete_IDs.delete(tag._id);
//                       return updated;
//                     })
//                   }
//                 />
//               );
//             })}
//           </div>
//         )}
//         {potentialStayTag_IDs.length > 0 && IS_potentialTagNavExpanded && (
//           <div className={css.block}>
//             <p>Keep {potentialStayTag_IDs?.length || "NUM"} tags</p>
//             {GET_potentialStayTags()?.map((tag) => {
//               return (
//                 <Btn
//                   key={tag._id}
//                   styles={["btn-40", "strech", "active", "text-left-auto"]}
//                   left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
//                   right_ICON={<ICON_x color="brand" small={true} />}
//                   text={tag?.name?.en}
//                   onClick={() =>
//                     SET_potentialTagIDs((prev) => {
//                       const updated = { ...prev };
//                       updated.toDelete_IDs.add(tag._id);
//                       return updated;
//                     })
//                   }
//                 />
//               );
//             })}
//           </div>
//         )}

//         <div className={css.btn_WRAP}>
//           <Btn
//             styles={["btn-40", "left-align"]}
//             right_ICON={<ICON_x color="dark" small={true} />}
//             text="Cancel"
//             onClick={() => SET_potentialTagIDs({ toAdd_IDs: new Set(), toDelete_IDs: new Set() })}
//           />

//           <Btn
//             styles={["btn-40", "strech", "brand", "brand-background-colors"]}
//             text="Apply"
//             onClick={() => {
//               potentialTag_IDs.toAdd_IDs.forEach((tag_ID) =>
//                 UPDATE_tags(
//                   all_TAGS.find((tag) => tag._id === tag_ID),
//                   "add"
//                 )
//               );
//               potentialTag_IDs.toDelete_IDs.forEach((tag_ID) =>
//                 UPDATE_tags(
//                   all_TAGS.find((tag) => tag._id === tag_ID),
//                   "remove"
//                 )
//               );

//               SET_potentialTagIDs({ toAdd_IDs: new Set(), toDelete_IDs: new Set() });
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
