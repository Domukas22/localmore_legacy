//

import { SearchField, Input, Button } from "react-aria-components";
import { ICON_searchSmall, ICON_x } from "../icons/icons";
import css from "./search.module.css";
import { useRef } from "react";

export default function SearchBar({ SET_search, search }) {
  const inputRef = useRef(null);
  const clear_BTN = useRef(null);

  return (
    <div className={css.search_WRAP}>
      <div className={css.searchIcon_WRAP}>
        <ICON_searchSmall />
      </div>

      <SearchField
        className={css.searchBar}
        aria-label="Heidelberg durchsuchen..."
        onChange={SET_search}
      >
        <Input
          placeholder="Search places, businesses..."
          className={css["react-aria-Input"]}
          aria-label="Heidelberg durchsuchen..."
          ref={inputRef}
        />

        <Button ref={clear_BTN} className={css.invisibleClear_BTN}></Button>
      </SearchField>

      {search !== "" && (
        <Button
          className={css.clearer_BTN}
          aria-label={`Suche "${search}" löschen`}
          onPress={() => {
            SET_search("");
            document.dispatchEvent(new Event("click")); // for the dropdowns
            clear_BTN.current.click();
          }}
        >
          <div>
            <ICON_x />
          </div>
        </Button>
      )}
    </div>
  );
}
