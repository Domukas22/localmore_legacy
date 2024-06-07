//
//

import { useEffect, useRef, useState } from "react";
import { Dialog, Modal } from "react-aria-components";
import css from "./MobileTag_MENU.module.css";
import { ICON_arrow, ICON_x, ICON_activeDigit } from "../../../../components/icons/icons";
import { Btn } from "../../../../components/btn/btn";
import { CssTransition_MENU } from "../../../../components/Nav/components/Menus/CssTransition_MENU";
import SearchBar from "../../../../components/search/Searchbar";
import { Filterbox } from "../../../../components/Filterbox/Filterbox";

export function MobileTag_MENU({
  tagGroups,
  all_TAGS,
  tagUsages,
  active_TAGS,
  UPDATE_tags,
  potential_TAGS,
  SET_potentialTags,
  IS_mobileTagMenuOpen,
  SET_isMobileTagMenuOpen,
}) {
  const scroll_REF = useRef(null);

  return (
    <Modal isOpen={IS_mobileTagMenuOpen} className={css.tags_MODAL}>
      <Dialog aria-label="Menu" ref={scroll_REF} className={css.Dialog_MENU} autoFocus={false}>
        {/* <TagFilters
          tagGroups={tagGroups}
          all_TAGS={all_TAGS}
          tagUsages={tagUsages}
          scroll_REF={scroll_REF}
          active_TAGS={active_TAGS}
          UPDATE_tags={UPDATE_tags}
          potential_TAGS={potential_TAGS}
          SET_potentialTags={SET_potentialTags}
          SET_isMobileTagMenuOpen={SET_isMobileTagMenuOpen}
        /> */}
        <Filterbox
          all_TAGS={all_TAGS}
          tagGroups={tagGroups}
          tagUsages={tagUsages}
          active_TAGS={active_TAGS}
          UPDATE_tags={UPDATE_tags}
          potential_TAGS={potential_TAGS}
          SET_potentialTags={SET_potentialTags}
          SET_isOpen={SET_isMobileTagMenuOpen}
        />
      </Dialog>
    </Modal>
  );
}
