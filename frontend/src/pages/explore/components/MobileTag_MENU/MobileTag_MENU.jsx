//
//

import { useEffect, useRef, useState } from "react";
import { Dialog, Modal } from "react-aria-components";
import css from "./MobileTag_MENU.module.css";
import { ICON_arrow, ICON_x, ICON_activeDigit } from "../../../../components/icons/icons";
import { Btn } from "../../../../components/btn/btn";
import { CssTransition_MENU } from "../../../../components/Nav/components/Menus/CssTransition_MENU";
import SearchBar from "../../../../components/search/Searchbar";
import { Tagbox } from "../../../../components/Tagbox/Tagbox";

export function MobileTag_MENU({
  tagGroups,
  all_TAGS,
  tagUsages,
  activeTag_IDs,
  UPDATE_tags,
  potentialTag_IDs,
  SET_potentialTagIDs,
  IS_mobileTagMenuOpen,
  SET_isMobileTagMenuOpen,
}) {
  const scroll_REF = useRef(null);

  return (
    <Modal isOpen={IS_mobileTagMenuOpen} className={css.tags_MODAL}>
      <Dialog aria-label="Menu" ref={scroll_REF} className={css.Dialog_MENU} autoFocus={false}>
        {console.log(activeTag_IDs.size)}
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
        />
      </Dialog>
    </Modal>
  );
}
