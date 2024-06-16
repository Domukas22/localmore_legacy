//
//

import css from "../../Blocks.module.css";
import { Btn } from "../../../../Btn/Btn";

import { AnimatePresence, motion } from "framer-motion";
import { ICON_save } from "../../../../icons/icons";
import { useState } from "react";

export function Saved_BLOCK({ savedProfile_OBJs, REMOVE_fromSaved, resize = () => {} }) {
  const [deletingItem, setDeletingItem] = useState(null);
  const SHOULD_noItemBoxBeVisible =
    (savedProfile_OBJs.length === 1 && deletingItem) || savedProfile_OBJs.length === 0;

  const handleRemove = (profileId) => {
    setDeletingItem(profileId);
    if (savedProfile_OBJs.length > 1) resize();

    setTimeout(() => {
      REMOVE_fromSaved(profileId);
      setDeletingItem(null);
      if (savedProfile_OBJs.length === 1) resize();
    }, 300); // Delay to match the fade-out duration
  };

  return (
    <div className={css.Block} data-custom="saved">
      <p>{savedProfile_OBJs.length} liked profiles</p>
      <AnimatePresence>
        {savedProfile_OBJs.map((profile) => {
          const IS_saved = savedProfile_OBJs.some((p) => p._id === profile._id);

          return (
            <motion.li
              className={css.savedBtn_LI}
              key={`Saved-${profile._id}`}
              initial={{ opacity: 1, height: "auto" }}
              animate={{
                opacity: deletingItem === profile._id ? 0 : 1,
                height: deletingItem === profile._id ? 0 : "auto",
              }}
              transition={{ opacity: { duration: 0.3 }, height: { duration: 0.3 } }}
            >
              <div className={css.SavedProfile_LINK}>
                <Btn
                  styles={["btn-36", "onImg", `${IS_saved ? "saved" : ""}`]}
                  onClick={() => {
                    handleRemove(profile._id);
                  }}
                  left_ICON={<ICON_save color={IS_saved ? "red" : "white"} />}
                  // aria_LABEL={tr?.saveBtn_ARIA(name)[lang]}
                  test_ID="save-btn"
                  FIRE_clickEvent={false}
                />
                <a
                  href="#"
                  style={{ backgroundImage: `url(${profile?.img?.desktop?.[0] + "/Big" || ""})` }}
                ></a>
                <h4>{profile?.name?.en ?? "Name"}</h4>
              </div>
            </motion.li>
          );
        })}
      </AnimatePresence>
      <AnimatePresence>
        {SHOULD_noItemBoxBeVisible && (
          <motion.div
            className={css.noSavedItems_BOX}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
