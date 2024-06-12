//
//

import { useRef } from "react";
import { Dialog, Modal } from "react-aria-components";
import css from "./Tagbox_MODAL.module.css";

import { Tagbox } from "../../Tagbox/Tagbox";

export function Tagbox_MODAL({
  tagGroups,
  all_TAGS,
  tagUsages,
  activeTag_IDs,
  UPDATE_tags,
  potentialTag_IDs,
  SET_potentialTagIDs,
  IS_mobileTagMenuOpen,
  SET_isMobileTagMenuOpen,
  result_COUNT,
}) {
  const scroll_REF = useRef(null);

  return (
    <Modal isOpen={IS_mobileTagMenuOpen} className={css.tags_MODAL}>
      <Dialog aria-label="Menu" ref={scroll_REF} className={css.Dialog_MENU} autoFocus={false}>
        <Tagbox
          all_TAGS={all_TAGS}
          tagGroups={tagGroups}
          tagUsages={tagUsages}
          activeTag_IDs={activeTag_IDs}
          UPDATE_tags={UPDATE_tags}
          potentialTag_IDs={potentialTag_IDs}
          SET_potentialTagIDs={SET_potentialTagIDs}
          SET_isOpen={SET_isMobileTagMenuOpen}
          starting_MENU={activeTag_IDs.size > 0 ? "active-tags" : "all"}
          result_COUNT={result_COUNT}
        />
      </Dialog>
    </Modal>
  );
}
